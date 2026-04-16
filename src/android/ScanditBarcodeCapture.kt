/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2019- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.barcode

import android.annotation.SuppressLint
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.util.Base64
import android.view.ViewGroup
import com.scandit.datacapture.cordova.barcode.data.SerializableAdvancedOverlayViewActionData
import com.scandit.datacapture.cordova.barcode.handlers.BarcodeCountViewHandler
import com.scandit.datacapture.cordova.barcode.handlers.BarcodeFindViewHandler
import com.scandit.datacapture.cordova.barcode.handlers.BarcodePickViewHandler
import com.scandit.datacapture.cordova.core.ScanditCaptureCore
import com.scandit.datacapture.cordova.core.data.ResizeAndMoveInfo
import com.scandit.datacapture.cordova.core.errors.JsonParseError
import com.scandit.datacapture.cordova.core.utils.CordovaEventEmitter
import com.scandit.datacapture.cordova.core.utils.CordovaResult
import com.scandit.datacapture.cordova.core.utils.CordovaResultKeepCallback
import com.scandit.datacapture.cordova.core.utils.PermissionRequest
import com.scandit.datacapture.cordova.core.utils.PluginMethod
import com.scandit.datacapture.cordova.core.utils.defaultArgumentAsString
import com.scandit.datacapture.cordova.core.utils.optBoolean
import com.scandit.datacapture.cordova.core.utils.optString
import com.scandit.datacapture.cordova.core.utils.successAndKeepCallback
import com.scandit.datacapture.core.ui.style.BrushDeserializer
import com.scandit.datacapture.frameworks.barcode.BarcodeModule
import com.scandit.datacapture.frameworks.barcode.batch.BarcodeBatchModule
import com.scandit.datacapture.frameworks.barcode.batch.listeners.FrameworksBarcodeBatchAdvancedOverlayListener
import com.scandit.datacapture.frameworks.barcode.batch.listeners.FrameworksBarcodeBatchBasicOverlayListener
import com.scandit.datacapture.frameworks.barcode.batch.listeners.FrameworksBarcodeBatchListener
import com.scandit.datacapture.frameworks.barcode.capture.BarcodeCaptureModule
import com.scandit.datacapture.frameworks.barcode.capture.listeners.FrameworksBarcodeCaptureListener
import com.scandit.datacapture.frameworks.barcode.count.BarcodeCountModule
import com.scandit.datacapture.frameworks.barcode.count.listeners.FrameworksBarcodeCountListener
import com.scandit.datacapture.frameworks.barcode.count.listeners.FrameworksBarcodeCountViewListener
import com.scandit.datacapture.frameworks.barcode.count.listeners.FrameworksBarcodeCountViewUiListener
import com.scandit.datacapture.frameworks.barcode.find.BarcodeFindModule
import com.scandit.datacapture.frameworks.barcode.find.listeners.FrameworksBarcodeFindListener
import com.scandit.datacapture.frameworks.barcode.find.listeners.FrameworksBarcodeFindViewUiListener
import com.scandit.datacapture.frameworks.barcode.find.transformer.FrameworksBarcodeFindTransformer
import com.scandit.datacapture.frameworks.barcode.generator.BarcodeGeneratorModule
import com.scandit.datacapture.frameworks.barcode.pick.BarcodePickModule
import com.scandit.datacapture.frameworks.barcode.pick.listeners.FrameworksBarcodePickActionListener
import com.scandit.datacapture.frameworks.barcode.pick.listeners.FrameworksBarcodePickAsyncMapperProductProviderCallback
import com.scandit.datacapture.frameworks.barcode.pick.listeners.FrameworksBarcodePickListener
import com.scandit.datacapture.frameworks.barcode.pick.listeners.FrameworksBarcodePickScanningListener
import com.scandit.datacapture.frameworks.barcode.pick.listeners.FrameworksBarcodePickViewListener
import com.scandit.datacapture.frameworks.barcode.pick.listeners.FrameworksBarcodePickViewUiListener
import com.scandit.datacapture.frameworks.barcode.selection.BarcodeSelectionModule
import com.scandit.datacapture.frameworks.barcode.selection.listeners.FrameworksBarcodeSelectionAimedBrushProvider
import com.scandit.datacapture.frameworks.barcode.selection.listeners.FrameworksBarcodeSelectionListener
import com.scandit.datacapture.frameworks.barcode.selection.listeners.FrameworksBarcodeSelectionTrackedBrushProvider
import com.scandit.datacapture.frameworks.barcode.spark.SparkScanModule
import com.scandit.datacapture.frameworks.barcode.spark.delegates.FrameworksSparkScanFeedbackDelegate
import com.scandit.datacapture.frameworks.barcode.spark.listeners.FrameworksSparkScanListener
import com.scandit.datacapture.frameworks.barcode.spark.listeners.FrameworksSparkScanViewUiListener
import com.scandit.datacapture.frameworks.core.errors.ParameterNullError
import com.scandit.datacapture.frameworks.core.extensions.getOrNull
import com.scandit.datacapture.frameworks.core.utils.DefaultMainThread
import com.scandit.datacapture.frameworks.core.utils.MainThread
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaPlugin
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject
import java.lang.reflect.Method

class ScanditBarcodeCapture :
    CordovaPlugin() {

    private val eventEmitter = CordovaEventEmitter()

    private val mainThread: MainThread = DefaultMainThread.getInstance()

    private val permissionRequest = PermissionRequest.getInstance()

    private val barcodeModule = BarcodeModule()
    private val barcodeCaptureModule = BarcodeCaptureModule.create(eventEmitter)
    private val barcodeBatchModule = BarcodeBatchModule.create(eventEmitter)
    private val barcodeSelectionModule = BarcodeSelectionModule(
        FrameworksBarcodeSelectionListener(eventEmitter),
        FrameworksBarcodeSelectionAimedBrushProvider(eventEmitter),
        FrameworksBarcodeSelectionTrackedBrushProvider(eventEmitter)
    )

    private val barcodeFindModule = BarcodeFindModule.create(eventEmitter)
    private val barcodeFindViewHandler: BarcodeFindViewHandler = BarcodeFindViewHandler()

    private val barcodePickModule: BarcodePickModule = BarcodePickModule.create(eventEmitter)
    private val barcodePickViewHandler: BarcodePickViewHandler = BarcodePickViewHandler()

    private val sparkScanModule: SparkScanModule = SparkScanModule.create(eventEmitter)

    private val barcodeCountModule = BarcodeCountModule.create(eventEmitter)

    private val barcodeGeneratorModule = BarcodeGeneratorModule()

    private val barcodeCountViewHandler: BarcodeCountViewHandler = BarcodeCountViewHandler()

    private lateinit var exposedFunctionsToJs: Map<String, Method>

    private var lastBarcodeCaptureEnabledState: Boolean = false
    private var lastBarcodeBatchEnabledState: Boolean = false
    private var lastBarcodeSelectionEnabledState: Boolean = false
    private var lastBarcodeFindEnabledState: Boolean = false
    private var lastSparkScanEnabledState: Boolean = false
    private var lastBarcodeCountEnabledState: Boolean = false

    override fun pluginInitialize() {
        barcodeFindViewHandler.attachWebView(webView.view, cordova.activity)
        barcodePickViewHandler.attachWebView(webView.view, cordova.activity)
        super.pluginInitialize()

        ScanditCaptureCore.addPlugin(serviceName)
        barcodeModule.onCreate(cordova.context)
        barcodeCaptureModule.onCreate(cordova.context)
        barcodeBatchModule.onCreate(cordova.context)
        barcodeSelectionModule.onCreate(cordova.context)
        barcodeFindModule.onCreate(cordova.context)
        barcodePickModule.onCreate(cordova.context)
        sparkScanModule.onCreate(cordova.context)
        barcodeCountModule.onCreate(cordova.context)
        barcodeGeneratorModule.onCreate(cordova.context)

        // Init functions exposed to JS
        exposedFunctionsToJs =
            this.javaClass.methods.filter { it.getAnnotation(PluginMethod::class.java) != null }
                .associateBy { it.name }
    }

    override fun onStop() {
        lastBarcodeCaptureEnabledState = barcodeCaptureModule.isModeEnabled()
        barcodeCaptureModule.setTopMostModeEnabled(false)

        lastBarcodeBatchEnabledState = barcodeBatchModule.isModeEnabled()
        barcodeBatchModule.setTopMostModeEnabled(false)

        lastBarcodeSelectionEnabledState = barcodeSelectionModule.isModeEnabled()
        barcodeSelectionModule.setModeEnabled(false)

        lastBarcodeFindEnabledState = barcodeFindModule.isModeEnabled()
        barcodeFindModule.setTopMostModeEnabled(false)

        lastSparkScanEnabledState = sparkScanModule.isModeEnabled()
        sparkScanModule.setTopMostViewModeEnabled(false)

        lastBarcodeCountEnabledState = barcodeCountModule.isModeEnabled()
        barcodeCountModule.setTopMostModeEnabled(false)
    }

    override fun onStart() {
        barcodeCaptureModule.setTopMostModeEnabled(lastBarcodeCaptureEnabledState)
        barcodeBatchModule.setTopMostModeEnabled(lastBarcodeBatchEnabledState)
        barcodeSelectionModule.setModeEnabled(lastBarcodeSelectionEnabledState)
        barcodeFindModule.setTopMostModeEnabled(lastBarcodeFindEnabledState)
        barcodeCountModule.setTopMostModeEnabled(lastBarcodeCountEnabledState)
        sparkScanModule.setTopMostViewModeEnabled(lastSparkScanEnabledState)
    }

    override fun onReset() {
        destroy()
        pluginInitialize()
    }

    override fun onDestroy() {
        destroy()
        super.onDestroy()
    }

    private fun destroy() {
        barcodeModule.onDestroy()
        barcodeCaptureModule.onDestroy()
        barcodeBatchModule.onDestroy()
        barcodeSelectionModule.onDestroy()
        barcodeFindModule.onDestroy()
        barcodePickModule.onDestroy()
        barcodeCountModule.onDestroy()
        barcodeGeneratorModule.onDestroy()

        barcodeFindViewHandler.disposeAll()
    }

    override fun execute(
        action: String,
        args: JSONArray,
        callbackContext: CallbackContext
    ): Boolean {
        return if (exposedFunctionsToJs.contains(action)) {
            exposedFunctionsToJs[action]?.invoke(this, args, callbackContext)
            true
        } else {
            false
        }
    }

    @PluginMethod
    fun getDefaults(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val default = JSONObject(
            barcodeModule.getDefaults() +
                mapOf("BarcodeCapture" to barcodeCaptureModule.getDefaults()) +
                mapOf("BarcodeBatch" to barcodeBatchModule.getDefaults()) +
                mapOf("BarcodeSelection" to barcodeSelectionModule.getDefaults()) +
                mapOf("BarcodeFind" to barcodeFindModule.getDefaults()) +
                mapOf("BarcodePick" to barcodePickModule.getDefaults()) +
                mapOf("SparkScan" to sparkScanModule.getDefaults()) +
                mapOf("BarcodeCount" to barcodeCountModule.getDefaults())
        )

        callbackContext.success(default)
    }

    @PluginMethod
    fun registerBarcodeCaptureListenerForEvents(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val modeId = argsJson.getInt("modeId")
        eventEmitter.registerModeSpecificCallback(
            modeId,
            FrameworksBarcodeCaptureListener.ON_SESSION_UPDATED_EVENT_NAME,
            callbackContext
        )
        eventEmitter.registerModeSpecificCallback(
            modeId,
            FrameworksBarcodeCaptureListener.ON_BARCODE_SCANNED_EVENT_NAME,
            callbackContext
        )
        barcodeCaptureModule.addListener(modeId)
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun unregisterBarcodeCaptureListenerForEvents(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val modeId = argsJson.getInt("modeId")
        eventEmitter.unregisterModeSpecificCallback(
            modeId,
            FrameworksBarcodeCaptureListener.ON_SESSION_UPDATED_EVENT_NAME
        )
        eventEmitter.unregisterModeSpecificCallback(
            modeId,
            FrameworksBarcodeCaptureListener.ON_BARCODE_SCANNED_EVENT_NAME
        )
        barcodeCaptureModule.removeListener(modeId)
        callbackContext.success()
    }

    @PluginMethod
    fun registerBarcodeBatchListenerForEvents(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val modeId = argsJson.getInt("modeId")

        eventEmitter.registerModeSpecificCallback(
            modeId,
            FrameworksBarcodeBatchListener.ON_SESSION_UPDATED_EVENT_NAME,
            callbackContext
        )
        barcodeBatchModule.addBarcodeBatchListener(modeId)
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun unregisterBarcodeBatchListenerForEvents(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val modeId = argsJson.getInt("modeId")

        eventEmitter.unregisterModeSpecificCallback(
            modeId,
            FrameworksBarcodeBatchListener.ON_SESSION_UPDATED_EVENT_NAME
        )

        barcodeBatchModule.removeBarcodeBatchListener(modeId)
        callbackContext.success()
    }

    @PluginMethod
    fun registerBarcodeSelectionListenerForEvents(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.registerCallback(
            FrameworksBarcodeSelectionListener.ON_SESSION_UPDATE_EVENT_NAME,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodeSelectionListener.ON_SELECTION_UPDATE_EVENT_NAME,
            callbackContext
        )
        barcodeSelectionModule.addListener()
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun unregisterBarcodeSelectionListenerForEvents(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.unregisterCallback(
            FrameworksBarcodeSelectionListener.ON_SESSION_UPDATE_EVENT_NAME
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodeSelectionListener.ON_SELECTION_UPDATE_EVENT_NAME
        )
        barcodeSelectionModule.removeListener()
        callbackContext.success()
    }

    @PluginMethod
    fun finishBarcodeCaptureDidUpdateSession(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val modeId = argsJson.getInt("modeId")
        val enabled = argsJson.optBoolean("enabled", true)
        barcodeCaptureModule.finishDidUpdateSession(modeId, enabled)
        callbackContext.success()
    }

    @PluginMethod
    fun finishBarcodeCaptureDidScan(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val modeId = argsJson.getInt("modeId")
        val enabled = argsJson.optBoolean("enabled", true)
        barcodeCaptureModule.finishDidScan(modeId, enabled)
        callbackContext.success()
    }

    @PluginMethod
    fun finishBarcodeSelectionDidSelect(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeSelectionModule.finishDidSelect(args.optBoolean("enabled", true))
        callbackContext.success()
    }

    @PluginMethod
    fun finishBarcodeSelectionDidUpdateSession(args: JSONArray, callbackContext: CallbackContext) {
        barcodeSelectionModule.finishDidUpdateSession(args.optBoolean("enabled", true))
        callbackContext.success()
    }

    @PluginMethod
    fun finishBarcodeBatchDidUpdateSessionCallback(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val modeId = argsJson.getInt("modeId")
        val enabled = argsJson.optBoolean("enabled", true)
        barcodeBatchModule.finishDidUpdateSession(modeId, enabled)
        callbackContext.success()
    }

    @PluginMethod
    fun registerListenerForBasicOverlayEvents(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val dataCaptureViewId = argsJson.getInt("dataCaptureViewId")

        eventEmitter.registerCallback(
            FrameworksBarcodeBatchBasicOverlayListener.EVENT_ON_TRACKED_BARCODE_TAPPED,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodeBatchBasicOverlayListener.EVENT_SET_BRUSH_FOR_TRACKED_BARCODE,
            callbackContext
        )
        barcodeBatchModule.addBasicOverlayListener(dataCaptureViewId)
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun unregisterListenerForBasicOverlayEvents(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val dataCaptureViewId = argsJson.getInt("dataCaptureViewId")

        eventEmitter.unregisterCallback(
            FrameworksBarcodeBatchBasicOverlayListener.EVENT_ON_TRACKED_BARCODE_TAPPED
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodeBatchBasicOverlayListener.EVENT_SET_BRUSH_FOR_TRACKED_BARCODE
        )
        barcodeBatchModule.removeBasicOverlayListener(dataCaptureViewId)
        callbackContext.success()
    }

    @PluginMethod
    fun setBrushForTrackedBarcode(args: JSONArray, callbackContext: CallbackContext) {
        try {
            val argsJson = args.getJSONObject(0)
            val dataCaptureViewId = argsJson.getInt("dataCaptureViewId")
            val brushJson = argsJson.getString("brushJson")
            val trackedBarcodeIdentifier = argsJson.getInt("trackedBarcodeIdentifier")
            val sessionFrameSequenceId = argsJson.optLong("sessionFrameSequenceID", -1L)
            barcodeBatchModule.setBasicOverlayBrushForTrackedBarcode(
                dataCaptureViewId,
                brushJson,
                trackedBarcodeIdentifier,
                sessionFrameSequenceId
            )

            callbackContext.success()
        } catch (e: JSONException) {
            callbackContext.error(JsonParseError(e.message).toString())
        } catch (e: RuntimeException) {
            callbackContext.error(JsonParseError(e.message).toString())
        }
    }

    @PluginMethod
    fun clearTrackedBarcodeBrushes(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val dataCaptureViewId = argsJson.getInt("dataCaptureViewId")
        barcodeBatchModule.clearBasicOverlayTrackedBarcodeBrushes(dataCaptureViewId)
        callbackContext.success()
    }

    @PluginMethod
    fun registerListenerForAdvancedOverlayEvents(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val dataCaptureViewId = argsJson.getInt("dataCaptureViewId")

        eventEmitter.registerCallback(
            FrameworksBarcodeBatchAdvancedOverlayListener.EVENT_ANCHOR_FOR_TRACKED_BARCODE,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodeBatchAdvancedOverlayListener.EVENT_OFFSET_FOR_TRACKED_BARCODE,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodeBatchAdvancedOverlayListener.EVENT_WIDGET_FOR_TRACKED_BARCODE,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodeBatchAdvancedOverlayListener.EVENT_DID_TAP_VIEW_FOR_TRACKED_BARCODE,
            callbackContext
        )
        barcodeBatchModule.addAdvancedOverlayListener(dataCaptureViewId)
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun unregisterListenerForAdvancedOverlayEvents(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val dataCaptureViewId = argsJson.getInt("dataCaptureViewId")

        eventEmitter.unregisterCallback(
            FrameworksBarcodeBatchAdvancedOverlayListener.EVENT_ANCHOR_FOR_TRACKED_BARCODE
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodeBatchAdvancedOverlayListener.EVENT_OFFSET_FOR_TRACKED_BARCODE
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodeBatchAdvancedOverlayListener.EVENT_WIDGET_FOR_TRACKED_BARCODE
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodeBatchAdvancedOverlayListener.EVENT_DID_TAP_VIEW_FOR_TRACKED_BARCODE
        )
        barcodeBatchModule.removeAdvancedOverlayListener(dataCaptureViewId)
        callbackContext.success()
    }

    @PluginMethod
    fun setViewForTrackedBarcode(args: JSONArray, callbackContext: CallbackContext) {
        try {
            val data = SerializableAdvancedOverlayViewActionData(
                args.getJSONObject(0)
            )

            val image = getBitmapFromBase64String(data.view?.data)
            mainThread.runOnMainThread {
                val view = barcodeBatchModule.getTrackedBarcodeViewFromBitmap(
                    data.trackedBarcodeId,
                    image
                ) ?: return@runOnMainThread

                view.layoutParams = ViewGroup.MarginLayoutParams(
                    data.view?.options?.width ?: ViewGroup.LayoutParams.WRAP_CONTENT,
                    data.view?.options?.height ?: ViewGroup.LayoutParams.WRAP_CONTENT
                )

                barcodeBatchModule.setViewForTrackedBarcode(
                    data.dataCaptureViewId,
                    view,
                    data.trackedBarcodeId,
                    data.sessionFrameSequenceId
                )
            }

            callbackContext.success()
        } catch (e: JSONException) {
            println(e)
            callbackContext.error(JsonParseError(e.message).toString())
        } catch (e: RuntimeException) {
            callbackContext.error(JsonParseError(e.message).toString())
        }
    }

    @PluginMethod
    fun updateSizeOfTrackedBarcodeView(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        @Suppress("UNUSED_PARAMETER") callbackContext: CallbackContext
    ) {
        // https://scandit.atlassian.net/browse/SDC-26621
    }

    private fun getBitmapFromBase64String(string: String?): Bitmap? {
        string ?: return null

        val index = string.indexOf(",")
        return try {
            val trimmedString = string.removeRange(0, index)
            val bytes = Base64.decode(trimmedString, Base64.DEFAULT)
            BitmapFactory.decodeByteArray(bytes, 0, bytes.size)
        } catch (e: Exception) {
            println(e)
            null
        }
    }

    @PluginMethod
    fun setOffsetForTrackedBarcode(args: JSONArray, callbackContext: CallbackContext) {
        try {
            val payload = args.getJSONObject(0)
            barcodeBatchModule.setOffsetForTrackedBarcode(
                payload.getString("offsetJson"),
                payload.getInt("trackedBarcodeIdentifier"),
                if (payload.has("sessionFrameSequenceID")) {
                    payload.getLong("sessionFrameSequenceID")
                } else {
                    null
                },
                payload.getInt("dataCaptureViewId")
            )

            callbackContext.success()
        } catch (e: JSONException) {
            callbackContext.error(JsonParseError(e.message).toString())
        } catch (e: RuntimeException) {
            callbackContext.error(JsonParseError(e.message).toString())
        }
    }

    @PluginMethod
    fun setAnchorForTrackedBarcode(args: JSONArray, callbackContext: CallbackContext) {
        try {
            val argument = args.getJSONObject(0)
            barcodeBatchModule.setAnchorForTrackedBarcode(
                argument.getString("anchor"),
                argument.getInt("trackedBarcodeIdentifier"),
                if (argument.has("sessionFrameSequenceID")) {
                    argument.getLong("sessionFrameSequenceID")
                } else {
                    null
                },
                argument.getInt("dataCaptureViewId")
            )

            callbackContext.success()
        } catch (e: JSONException) {
            callbackContext.error(JsonParseError(e.message).toString())
        } catch (e: RuntimeException) {
            callbackContext.error(JsonParseError(e.message).toString())
        }
    }

    @PluginMethod
    fun clearTrackedBarcodeViews(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val dataCaptureViewId = argsJson.getInt("dataCaptureViewId")
        barcodeBatchModule.clearAdvancedOverlayTrackedBarcodeViews(dataCaptureViewId)
        callbackContext.success()
    }

    @PluginMethod
    fun getCountForBarcodeInBarcodeSelectionSession(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val selectionIdentifier = args.optString("selectionIdentifier", "")
        if (selectionIdentifier.isBlank()) {
            callbackContext.error("selectionIdentifier cannot be empty.")
            return
        }
        barcodeSelectionModule.submitBarcodeCountForIdentifier(
            selectionIdentifier,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun resetBarcodeCaptureSession(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeCaptureModule.resetSession()
        callbackContext.success()
    }

    @PluginMethod
    fun resetBarcodeBatchSession(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeBatchModule.resetSession(null)
        callbackContext.success()
    }

    @PluginMethod
    fun resetBarcodeSelectionSession(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeSelectionModule.resetLatestSession(null)
        callbackContext.success()
    }

    @PluginMethod
    fun resetBarcodeSelection(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeSelectionModule.resetSelection()
        callbackContext.success()
    }

    @PluginMethod
    fun unfreezeCameraInBarcodeSelection(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeSelectionModule.unfreezeCamera()
        callbackContext.success()
    }

    @PluginMethod
    fun selectAimedBarcode(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeSelectionModule.selectAimedBarcode()
        callbackContext.success()
    }

    @PluginMethod
    fun increaseCountForBarcodes(args: JSONArray, callbackContext: CallbackContext) {
        val barcodesJson = args.optString("barcodesJson", "")
        if (barcodesJson.isBlank()) {
            callbackContext.error("barcodesJson cannot be empty")
            return
        }
        barcodeSelectionModule.increaseCountForBarcodes(
            barcodesJson,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun unselectBarcodes(args: JSONArray, callbackContext: CallbackContext) {
        val barcodesJson = args.optString("barcodesJson", "")
        if (barcodesJson.isBlank()) {
            callbackContext.error("barcodesJson cannot be empty")
            return
        }
        barcodeSelectionModule.unselectBarcodes(
            barcodesJson,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun setSelectBarcodeEnabled(args: JSONArray, callbackContext: CallbackContext) {
        val argument = args.getJSONObject(0)
        val enabled = argument.optBoolean("enabled", false)
        val barcodeJson = argument["barcodeJson"].toString()
        barcodeSelectionModule.setSelectBarcodeEnabled(
            barcodeJson,
            enabled,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun createFindView(args: JSONArray, callbackContext: CallbackContext) {
        val argument = args.getJSONObject(0)
        val viewId = argument.getInt("viewId")
        val viewJson = argument.getString("json") ?: return callbackContext.error(
            "incorrect or no json passed for createFindView"
        )
        val container = barcodeFindViewHandler.prepareContainer()

        container.post {
            barcodeFindModule.addViewToContainer(
                container,
                viewJson,
                CordovaResult(callbackContext)
            )
            barcodeFindViewHandler.addBarcodeFindViewContainer(viewId, container)
        }
    }

    @PluginMethod
    fun updateFindView(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        val viewJson = argsJson.getString("barcodeFindViewJson")
        barcodeFindModule.updateBarcodeFindView(viewId, viewJson, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun removeFindView(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        barcodeFindModule.viewDisposed(viewId)
        barcodeFindViewHandler.disposeContainer(viewId)
        callbackContext.success()
    }

    @PluginMethod
    fun updateFindMode(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        val barcodeFindJson = argsJson.getString("barcodeFindJson")
        barcodeFindModule.updateBarcodeFindMode(
            viewId,
            barcodeFindJson,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun setBarcodeTransformer(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodeFindTransformer.ON_TRANSFORM_BARCODE_DATA,
            callbackContext
        )
        barcodeFindModule.setBarcodeFindTransformer(
            viewId,
            CordovaResultKeepCallback(callbackContext)
        )
    }

    @PluginMethod
    fun unsetBarcodeTransformer(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodeFindTransformer.ON_TRANSFORM_BARCODE_DATA
        )
        barcodeFindModule.unsetBarcodeFindTransformer(viewId, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun submitBarcodeFindTransformerResult(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        val transformedBarcode = argsJson.getString("transformedBarcode")
        barcodeFindModule.submitBarcodeFindTransformerResult(
            viewId,
            transformedBarcode,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun updateBarcodeFindFeedback(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        val feedbackJson = argsJson.getString("feedbackJson")
        barcodeFindModule.updateFeedback(
            viewId,
            feedbackJson,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun registerBarcodeFindListener(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodeFindListener.ON_SEARCH_PAUSED_EVENT_NAME,
            callbackContext
        )
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodeFindListener.ON_SEARCH_STARTED_EVENT_NAME,
            callbackContext
        )
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodeFindListener.ON_SEARCH_STOPPED_EVENT_NAME,
            callbackContext
        )
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodeFindListener.ON_SESSION_UPDATED_EVENT_NAME,
            callbackContext
        )

        barcodeFindModule.addBarcodeFindListener(viewId, CordovaResultKeepCallback(callbackContext))
    }

    @SuppressLint("ImplicitSamInstance")
    @PluginMethod
    fun unregisterBarcodeFindListener(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")

        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodeFindListener.ON_SEARCH_PAUSED_EVENT_NAME
        )
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodeFindListener.ON_SEARCH_STARTED_EVENT_NAME
        )
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodeFindListener.ON_SEARCH_STOPPED_EVENT_NAME
        )
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodeFindListener.ON_SESSION_UPDATED_EVENT_NAME
        )

        barcodeFindModule.removeBarcodeFindListener(viewId, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun registerBarcodeFindViewListener(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")

        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodeFindViewUiListener.ON_FINISH_BUTTON_TAPPED_EVENT_NAME,
            callbackContext
        )

        barcodeFindModule.addBarcodeFindViewListener(
            viewId,
            CordovaResultKeepCallback(callbackContext)
        )
    }

    @SuppressLint("ImplicitSamInstance")
    @PluginMethod
    fun unregisterBarcodeFindViewListener(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")

        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodeFindViewUiListener.ON_FINISH_BUTTON_TAPPED_EVENT_NAME
        )

        barcodeFindModule.removeBarcodeFindViewListener(viewId, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun barcodeFindViewOnPause(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        // No need for this
        callbackContext.success()
    }

    @PluginMethod
    fun barcodeFindViewOnResume(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        // No need for this
        callbackContext.success()
    }

    @PluginMethod
    fun barcodeFindSetItemList(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        val itemsJson = argsJson.getString("itemsJson")
        barcodeFindModule.setItemList(viewId, itemsJson, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun barcodeFindViewStopSearching(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        barcodeFindModule.viewStopSearching(viewId, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun barcodeFindViewStartSearching(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        barcodeFindModule.viewStartSearching(viewId, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun barcodeFindViewPauseSearching(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")

        barcodeFindModule.viewPauseSearching(viewId, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun barcodeFindModeStart(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")

        barcodeFindModule.modeStart(viewId, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun barcodeFindModePause(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")

        barcodeFindModule.modePause(viewId, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun barcodeFindModeStop(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")

        barcodeFindModule.modeStop(viewId, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun showFindView(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")

        barcodeFindModule.showView(viewId)
        barcodeFindViewHandler.setVisible(viewId)
        callbackContext.success()
    }

    @PluginMethod
    fun hideFindView(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")

        barcodeFindModule.hideView(viewId)
        barcodeFindViewHandler.setInvisible(viewId)
        callbackContext.success()
    }

    @PluginMethod
    fun createPickView(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val viewJson = argsJson.getString("json")
        val container = barcodePickViewHandler.prepareContainer()

        container.post {
            barcodePickModule.addViewToContainer(
                container,
                viewJson,
                CordovaResult(callbackContext)
            )
            barcodePickViewHandler.addBarcodePickViewContainer(container)
            barcodePickViewHandler.render()
        }
    }

    @PluginMethod
    fun removePickView(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        barcodePickViewHandler.disposeCurrentView()
        barcodePickModule.releasePickView(viewId, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun pickViewStart(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        barcodePickModule.startPickView(viewId, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun pickViewStop(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        barcodePickModule.stopPickView(viewId, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun pickViewFreeze(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        barcodePickModule.freezePickView(viewId, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun pickViewPause(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        barcodePickModule.pausePickView(viewId, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun pickViewResume(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        barcodePickModule.resumePickView(viewId, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun setPickViewPositionAndSize(args: JSONArray, callbackContext: CallbackContext) {
        val positionJson = args.getJSONObject(0) ?: return callbackContext.error(
            "No position was given for setting the view"
        )
        barcodePickViewHandler.setResizeAndMoveInfo(ResizeAndMoveInfo(positionJson))
        callbackContext.success()
    }

    @PluginMethod
    fun updatePickView(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val viewJson = argsJson.toString()
        val viewId = argsJson.getInt("viewId")
        barcodePickModule.updateView(viewId, viewJson, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun addPickActionListener(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodePickActionListener.DID_PICK_EVENT_NAME,
            callbackContext
        )
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodePickActionListener.DID_UNPICK_EVENT_NAME,
            callbackContext
        )
        barcodePickModule.addActionListener(viewId, CordovaResultKeepCallback(callbackContext))
    }

    @PluginMethod
    fun removePickActionListener(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodePickActionListener.DID_PICK_EVENT_NAME
        )
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodePickActionListener.DID_UNPICK_EVENT_NAME
        )
        barcodePickModule.removeActionListener(
            viewId,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun finishPickAction(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val response = hashMapOf<String, Any?>(
            "viewId" to argsJson.getInt("viewId"),
            "itemData" to argsJson.optString("code", ""),
            "result" to argsJson.optBoolean("result", false)
        )
        barcodePickModule.finishPickAction(
            response,
            CordovaResult(callbackContext)
        )
    }

    @SuppressLint("ImplicitSamInstance")
    @PluginMethod
    fun unsubscribeListeners(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        barcodePickModule.removeActionListener(viewId, CordovaResult(callbackContext))
        barcodePickModule.removeScanningListener(viewId, CordovaResult(callbackContext))
        barcodePickModule.removeViewListener(viewId, CordovaResult(callbackContext))
        barcodePickModule.removeViewUiListener(viewId, CordovaResult(callbackContext))
        barcodePickModule.removeBarcodePickListener(viewId, CordovaResult(callbackContext))

        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodePickActionListener.DID_PICK_EVENT_NAME
        )
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodePickActionListener.DID_UNPICK_EVENT_NAME
        )

        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodePickScanningListener.ON_COMPLETE_SCANNING
        )
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodePickScanningListener.ON_UPDATE_SCANNING
        )

        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodePickViewListener.DID_START_SCANNING_EVENT
        )
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodePickViewListener.DID_STOP_SCANNING_EVENT
        )
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodePickViewListener.DID_PAUSE_SCANNING_EVENT
        )
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodePickViewListener.DID_FREEZE_SCANNING_EVENT
        )
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodePickViewUiListener.DID_TAP_FINISH_BUTTON_EVENT
        )
    }

    @PluginMethod
    fun registerOnProductIdentifierForItemsListener(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodePickAsyncMapperProductProviderCallback
                .ON_PRODUCT_IDENTIFIERS_FOR_ITEMS_EVENT_NAME,
            callbackContext
        )
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun unregisterOnProductIdentifierForItemsListener(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodePickAsyncMapperProductProviderCallback
                .ON_PRODUCT_IDENTIFIERS_FOR_ITEMS_EVENT_NAME
        )
        callbackContext.success()
    }

    @PluginMethod
    fun addBarcodePickScanningListener(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodePickScanningListener
                .ON_COMPLETE_SCANNING,
            callbackContext
        )
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodePickScanningListener
                .ON_UPDATE_SCANNING,
            callbackContext
        )
        barcodePickModule.addScanningListener(viewId, CordovaResultKeepCallback(callbackContext))
    }

    @SuppressLint("ImplicitSamInstance")
    @PluginMethod
    fun removeBarcodePickScanningListener(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodePickScanningListener
                .ON_COMPLETE_SCANNING
        )
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodePickScanningListener
                .ON_UPDATE_SCANNING
        )
        barcodePickModule.removeScanningListener(viewId, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun addPickViewListener(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodePickViewListener
                .DID_START_SCANNING_EVENT,
            callbackContext
        )
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodePickViewListener
                .DID_FREEZE_SCANNING_EVENT,
            callbackContext
        )
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodePickViewListener
                .DID_PAUSE_SCANNING_EVENT,
            callbackContext
        )
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodePickViewListener
                .DID_STOP_SCANNING_EVENT,
            callbackContext
        )
        barcodePickModule.addViewListener(viewId, CordovaResultKeepCallback(callbackContext))
    }

    @PluginMethod
    fun removePickViewListener(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodePickViewListener.DID_START_SCANNING_EVENT
        )

        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodePickViewListener.DID_STOP_SCANNING_EVENT
        )

        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodePickViewListener.DID_PAUSE_SCANNING_EVENT
        )

        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodePickViewListener.DID_FREEZE_SCANNING_EVENT
        )

        barcodePickModule.removeViewListener(viewId, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun registerBarcodePickViewUiListener(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodePickViewUiListener
                .DID_TAP_FINISH_BUTTON_EVENT,
            callbackContext
        )
        barcodePickModule.addViewUiListener(viewId, CordovaResultKeepCallback(callbackContext))
    }

    @SuppressLint("ImplicitSamInstance")
    @PluginMethod
    fun unregisterBarcodePickViewUiListener(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodePickViewUiListener
                .DID_TAP_FINISH_BUTTON_EVENT
        )
        barcodePickModule.removeViewUiListener(viewId, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun finishOnProductIdentifierForItems(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val response = hashMapOf<String, Any?>(
            "viewId" to argsJson.getInt("viewId"),
            "data" to argsJson.optString("itemsJson", "")
        )
        barcodePickModule.finishOnProductIdentifierForItems(
            response,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun updateBarcodeCaptureOverlay(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        val overlayJson = argsJson.getString("overlayJson")
        barcodeCaptureModule.updateOverlay(viewId, overlayJson, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun updateBarcodeCaptureMode(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val modeJson = argsJson.getString("modeJson")
        barcodeCaptureModule.updateModeFromJson(modeJson, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun applyBarcodeCaptureModeSettings(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val modeId = argsJson.getInt("modeId")
        val modeSettingsJson = argsJson.getString("modeSettingsJson")
        barcodeCaptureModule.applyModeSettings(
            modeId,
            modeSettingsJson,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun updateBarcodeSelectionBasicOverlay(args: JSONArray, callbackContext: CallbackContext) {
        val overlayJson = args.optString("overlayJson", "")
        if (overlayJson.isBlank()) {
            callbackContext.error("overlayJson cannot be empty")
            return
        }
        barcodeSelectionModule.updateBasicOverlay(
            overlayJson,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun updateBarcodeSelectionMode(args: JSONArray, callbackContext: CallbackContext) {
        val modeJson = args.optString("modeJson", "")
        if (modeJson.isBlank()) {
            callbackContext.error("modeJson cannot be empty.")
            return
        }
        barcodeSelectionModule.updateModeFromJson(
            modeJson,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun applyBarcodeSelectionModeSettings(args: JSONArray, callbackContext: CallbackContext) {
        val modeSettingsJson = args.optString("modeSettingsJson", "")
        if (modeSettingsJson.isBlank()) {
            callbackContext.error("modeSettingsJson cannot be empty.")
            return
        }
        barcodeSelectionModule.applyModeSettings(
            modeSettingsJson,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun updateBarcodeSelectionFeedback(args: JSONArray, callbackContext: CallbackContext) {
        val feedbackJson = args.optString("feedbackJson", "")
        if (feedbackJson.isBlank()) {
            callbackContext.error("feedbackJson cannot be empty.")
            return
        }
        barcodeSelectionModule.updateFeedback(
            feedbackJson,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun setTextForAimToSelectAutoHint(args: JSONArray, callbackContext: CallbackContext) {
        val text = args.optString("text", "")
        barcodeSelectionModule.setTextForAimToSelectAutoHint(
            text,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun removeAimedBarcodeBrushProvider(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.unregisterCallback(
            FrameworksBarcodeSelectionAimedBrushProvider.BRUSH_FOR_AIMED_BARCODE_EVENT_NAME
        )
        barcodeSelectionModule.removeAimedBarcodeBrushProvider()
        callbackContext.success()
    }

    @PluginMethod
    fun setAimedBarcodeBrushProvider(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.registerCallback(
            FrameworksBarcodeSelectionAimedBrushProvider.BRUSH_FOR_AIMED_BARCODE_EVENT_NAME,
            callbackContext
        )
        barcodeSelectionModule.setAimedBarcodeBrushProvider(
            CordovaResultKeepCallback(callbackContext)
        )
    }

    @PluginMethod
    fun finishBrushForAimedBarcodeCallback(args: JSONArray, callbackContext: CallbackContext) {
        val payload = args.getJSONObject(0)
        barcodeSelectionModule.finishBrushForAimedBarcode(
            payload["brush"] as? String?,
            payload["selectionIdentifier"].toString()
        )
        callbackContext.success()
    }

    @PluginMethod
    fun removeTrackedBarcodeBrushProvider(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.unregisterCallback(
            FrameworksBarcodeSelectionTrackedBrushProvider.BRUSH_FOR_TRACKED_BARCODE_EVENT_NAME
        )
        barcodeSelectionModule.removeTrackedBarcodeBrushProvider()
        callbackContext.success()
    }

    @PluginMethod
    fun setTrackedBarcodeBrushProvider(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.registerCallback(
            FrameworksBarcodeSelectionTrackedBrushProvider.BRUSH_FOR_TRACKED_BARCODE_EVENT_NAME,
            callbackContext
        )
        barcodeSelectionModule.setTrackedBarcodeBrushProvider(
            CordovaResultKeepCallback(callbackContext)
        )
    }

    @PluginMethod
    fun finishBrushForTrackedBarcodeCallback(args: JSONArray, callbackContext: CallbackContext) {
        val payload = args.getJSONObject(0)
        barcodeSelectionModule.finishBrushForTrackedBarcode(
            payload["brush"] as? String?,
            payload["selectionIdentifier"].toString()
        )
        callbackContext.success()
    }

    @PluginMethod
    fun setBarcodeCaptureModeEnabledState(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val modeId = argsJson.getInt("modeId")
        val enabled = argsJson.optBoolean("enabled", false)
        barcodeCaptureModule.setModeEnabled(modeId, enabled)
        callbackContext.success()
    }

    @PluginMethod
    fun setBarcodeSelectionModeEnabledState(args: JSONArray, callbackContext: CallbackContext) {
        barcodeSelectionModule.setModeEnabled(args.optBoolean("enabled", false))
        callbackContext.success()
    }

    @PluginMethod
    fun setBarcodeBatchModeEnabledState(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val modeId = argsJson.getInt("modeId")
        val enabled = argsJson.optBoolean("enabled", false)
        barcodeBatchModule.setModeEnabled(modeId, enabled)
        callbackContext.success()
    }

    @PluginMethod
    fun setBarcodeFindModeEnabledState(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        val enabled = argsJson.getBoolean("enabled")
        barcodeFindModule.setModeEnabled(viewId, enabled)
        callbackContext.success()
    }

    @PluginMethod
    fun updateBarcodeBatchAdvancedOverlay(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val dataCaptureViewId = argsJson.getInt("dataCaptureViewId")
        val overlayJson = argsJson.getString("overlayJson")

        barcodeBatchModule.updateAdvancedOverlay(
            dataCaptureViewId,
            overlayJson,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun updateBarcodeBatchBasicOverlay(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val dataCaptureViewId = argsJson.getInt("dataCaptureViewId")
        val overlayJson = argsJson.getString("overlayJson")

        barcodeBatchModule.updateBasicOverlay(
            dataCaptureViewId,
            overlayJson,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun updateBarcodeBatchMode(args: JSONArray, callbackContext: CallbackContext) {
        barcodeBatchModule.updateModeFromJson(
            args.defaultArgumentAsString,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun applyBarcodeBatchModeSettings(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val modeId = argsJson.getInt("modeId")
        val modeSettingsJson = argsJson.getString("modeSettingsJson")
        barcodeBatchModule.applyModeSettings(
            modeId,
            modeSettingsJson,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun updateSparkScanView(args: JSONArray, callbackContext: CallbackContext) {
        try {
            val argsJson = args.getJSONObject(0)
            val viewJson = argsJson.getString("viewJson")
            val viewId = argsJson.getInt("viewId")
            sparkScanModule.updateView(viewId, viewJson, CordovaResult(callbackContext))
        } catch (e: JSONException) {
            callbackContext.error(ParameterNullError("viewJson").toString())
        }
    }

    @PluginMethod
    fun createSparkScanView(args: JSONArray, callbackContext: CallbackContext) {
        val container = webView.view ?: return callbackContext.error(
            "No container set for SparkScanView"
        )
        val argsJson = args.getJSONObject(0)

        val viewJson = argsJson.optString("viewJson", "")
        if (viewJson.isBlank()) {
            callbackContext.error("Invalid viewJson parameter passed")
            return
        }

        try {
            mainThread.runOnMainThread {
                sparkScanModule.addViewToContainer(
                    container,
                    viewJson,
                    CordovaResult(callbackContext)
                )
            }

            // check camera permissions because sparkScanView handles the camera internally
            permissionRequest.checkOrRequestCameraPermission(this)
        } catch (e: JSONException) {
            callbackContext.error("Failed to parse SparkScan view JSON: ${e.message}")
        }
    }

    @PluginMethod
    fun disposeSparkScanView(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        mainThread.runOnMainThread {
            sparkScanModule.disposeView(argsJson.getInt("viewId"))
        }
        callbackContext.success()
    }

    @PluginMethod
    fun showSparkScanView(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        mainThread.runOnMainThread {
            sparkScanModule.showView(argsJson.getInt("viewId"), CordovaResult(callbackContext))
        }
    }

    @PluginMethod
    fun hideSparkScanView(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        mainThread.runOnMainThread {
            sparkScanModule.hideView(argsJson.getInt("viewId"), CordovaResult(callbackContext))
        }
    }

    @PluginMethod
    fun registerSparkScanViewListenerEvents(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")

        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksSparkScanViewUiListener.EVENT_BARCODE_COUNT_BUTTON_TAP,
            callbackContext
        )

        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksSparkScanViewUiListener.EVENT_VIEW_STATE_CHANGED,
            callbackContext
        )

        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksSparkScanViewUiListener.EVENT_BARCODE_FIND_BUTTON_TAP,
            callbackContext
        )

        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksSparkScanViewUiListener.EVENT_LABEL_CAPTURE_BUTTON_TAP,
            callbackContext
        )

        sparkScanModule.addSparkScanViewUiListener(viewId)

        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun unregisterSparkScanViewListenerEvents(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")

        sparkScanModule.removeSparkScanViewUiListener(viewId)

        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksSparkScanViewUiListener.EVENT_BARCODE_COUNT_BUTTON_TAP
        )

        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksSparkScanViewUiListener.EVENT_VIEW_STATE_CHANGED
        )

        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksSparkScanViewUiListener.EVENT_BARCODE_FIND_BUTTON_TAP
        )

        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksSparkScanViewUiListener.EVENT_LABEL_CAPTURE_BUTTON_TAP
        )
        callbackContext.success()
    }

    @PluginMethod
    fun stopSparkScanViewScanning(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        sparkScanModule.stopScanning(argsJson.getInt("viewId"), CordovaResult(callbackContext))
    }

    @PluginMethod
    fun startSparkScanViewScanning(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        sparkScanModule.startScanning(argsJson.getInt("viewId"), CordovaResult(callbackContext))
    }

    @PluginMethod
    fun pauseSparkScanViewScanning(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        sparkScanModule.pauseScanning(argsJson.getInt("viewId"), CordovaResult(callbackContext))
    }

    @PluginMethod
    fun prepareSparkScanViewScanning(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        // Noop
        callbackContext.success()
    }

    @PluginMethod
    fun resetSparkScanSession(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        sparkScanModule.resetSession(argsJson.getInt("viewId"))
        callbackContext.success()
    }

    @PluginMethod
    fun updateSparkScanMode(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val modeJson = argsJson.getString("modeJson")
        val viewId = argsJson.getInt("viewId")
        sparkScanModule.updateMode(viewId, modeJson, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun registerSparkScanListenerForEvents(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksSparkScanListener.ON_BARCODE_SCANNED_EVENT_NAME,
            callbackContext
        )

        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksSparkScanListener.ON_SESSION_UPDATED_EVENT_NAME,
            callbackContext
        )

        callbackContext.successAndKeepCallback()

        sparkScanModule.addSparkScanListener(viewId)
    }

    @PluginMethod
    fun unregisterSparkScanListenerForEvents(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")

        sparkScanModule.removeSparkScanListener(viewId)

        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksSparkScanListener.ON_BARCODE_SCANNED_EVENT_NAME
        )

        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksSparkScanListener.ON_SESSION_UPDATED_EVENT_NAME
        )

        callbackContext.success()
    }

    @PluginMethod
    fun registerSparkScanFeedbackDelegateForEvents(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksSparkScanFeedbackDelegate.ON_GET_FEEDBACK_FOR_BARCODE,
            callbackContext
        )
        sparkScanModule.addFeedbackDelegate(viewId, CordovaResultKeepCallback(callbackContext))
    }

    @PluginMethod
    fun unregisterSparkScanFeedbackDelegateForEvents(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksSparkScanFeedbackDelegate.ON_GET_FEEDBACK_FOR_BARCODE
        )
        sparkScanModule.removeFeedbackDelegate(viewId, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun finishSparkScanDidUpdateSession(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)

        sparkScanModule.finishDidUpdateSessionCallback(
            argsJson.getInt("viewId"),
            argsJson.optBoolean("isEnabled", false)
        )
        callbackContext.success()
    }

    @PluginMethod
    fun finishSparkScanDidScan(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        sparkScanModule.finishDidScanCallback(
            argsJson.getInt("viewId"),
            argsJson.optBoolean("isEnabled", false)
        )
        callbackContext.success()
    }

    @PluginMethod
    fun setSparkScanModeEnabledState(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        sparkScanModule.setModeEnabled(
            argsJson.getInt("viewId"),
            argsJson.optBoolean("isEnabled", false)
        )
        callbackContext.success()
    }

    @PluginMethod
    fun submitSparkScanFeedbackForBarcode(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val feedbackJson = argsJson.getString("feedbackJson")
        val viewId = argsJson.getInt("viewId")

        sparkScanModule.submitFeedbackForBarcode(
            viewId,
            feedbackJson,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun showSparkScanViewToast(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val text = argsJson.getString("text")
        val viewId = argsJson.getInt("viewId")

        sparkScanModule.showToast(
            viewId,
            text,
            CordovaResult(callbackContext)
        )
    }

    // Barcode Count - Start

    @PluginMethod
    fun updateBarcodeCountMode(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val modeJson = argsJson.getString("barcodeCountJson")
        val viewId = argsJson.getInt("viewId")
        barcodeCountModule.updateBarcodeCount(
            viewId,
            modeJson,
        )
        callbackContext.success()
    }

    @PluginMethod
    fun resetBarcodeCount(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        barcodeCountModule.resetBarcodeCount(viewId)
        callbackContext.success()
    }

    @PluginMethod
    fun registerBarcodeCountListener(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountListener.ON_BARCODE_SCANNED_EVENT_NAME,
            callbackContext
        )

        barcodeCountModule.addBarcodeCountListener(viewId)
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun unregisterBarcodeCountListener(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountListener.ON_BARCODE_SCANNED_EVENT_NAME
        )

        barcodeCountModule.removeBarcodeCountListener(viewId)
        callbackContext.success()
    }

    @PluginMethod
    fun setBarcodeCountModeEnabledState(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val isEnabled = argsJson.getBoolean("isEnabled")
        val viewId = argsJson.getInt("viewId")
        barcodeCountModule.setModeEnabled(viewId, isEnabled)
        callbackContext.success()
    }

    @PluginMethod
    fun updateBarcodeCountFeedback(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        val feedbackJson = argsJson.getString("feedbackJson")
        if (feedbackJson.isBlank()) {
            callbackContext.error("No feedbackJson was provided for the function.")
            return
        }
        barcodeCountModule.updateFeedback(viewId, feedbackJson, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun finishBarcodeCountOnScan(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        barcodeCountModule.finishOnScan(viewId, true)
        callbackContext.success()
    }

    @PluginMethod
    fun startBarcodeCountScanningPhase(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        barcodeCountModule.startScanningPhase(viewId)
        callbackContext.success()
    }

    @PluginMethod
    fun endBarcodeCountScanningPhase(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        barcodeCountModule.endScanningPhase(viewId)
        callbackContext.success()
    }

    @PluginMethod
    fun setBarcodeCountCaptureList(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        val barcodes = argsJson.getJSONArray("captureListJson")
        barcodeCountModule.setBarcodeCountCaptureList(viewId, barcodes)
        callbackContext.success()
    }

    @PluginMethod
    fun getBarcodeCountSpatialMap(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        barcodeCountModule.submitSpatialMap(viewId, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun getBarcodeCountSpatialMapWithHints(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        val expectedNumberOfRows = argsJson.getInt("expectedNumberOfRows")
        val expectedNumberOfColumns = argsJson.getInt("expectedNumberOfColumns")
        barcodeCountModule.submitSpatialMap(
            viewId,
            expectedNumberOfRows,
            expectedNumberOfColumns,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun resetBarcodeCountSession(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        barcodeCountModule.resetBarcodeCountSession(viewId, null)
        callbackContext.success()
    }

    @PluginMethod
    fun updateBarcodeCountView(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val viewJson = argsJson.getString("viewJson")
        val viewId = argsJson.getInt("viewId")
        barcodeCountModule.updateBarcodeCountView(viewId, viewJson)
        callbackContext.success()
    }

    @PluginMethod
    fun createBarcodeCountView(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val viewJson = argsJson.getString("viewJson")
        val barcodeCountView = barcodeCountModule.getViewFromJson(viewJson)
        if (barcodeCountView == null) {
            callbackContext.error(
                "Unable to create the BarcodeCountView from the given json=$viewJson"
            )
            return
        }

        barcodeCountViewHandler.attachBarcodeCountView(
            barcodeCountView,
            cordova.activity
        )
        barcodeCountViewHandler.render()
        callbackContext.success()
    }

    @PluginMethod
    fun removeBarcodeCountView(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        barcodeCountViewHandler.disposeCurrentView()
        barcodeCountModule.viewDisposed(viewId)
        callbackContext.success()
    }

    @PluginMethod
    fun registerBarcodeCountViewUiListener(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewUiListener.ON_EXIT_BUTTON_TAPPED_EVENT_NAME,
            callbackContext
        )
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewUiListener.ON_LIST_BUTTON_TAPPED_EVENT_NAME,
            callbackContext
        )
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewUiListener.ON_SINGLE_SCAN_BUTTON_TAPPED_EVENT_NAME,
            callbackContext
        )
        barcodeCountModule.addBarcodeCountViewUiListener(viewId)
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun unregisterBarcodeCountViewUiListener(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewUiListener.ON_EXIT_BUTTON_TAPPED_EVENT_NAME,
        )
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewUiListener.ON_LIST_BUTTON_TAPPED_EVENT_NAME,
        )
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewUiListener.ON_SINGLE_SCAN_BUTTON_TAPPED_EVENT_NAME,
        )
        barcodeCountModule.removeBarcodeCountViewUiListener(viewId)
        callbackContext.success()
    }

    @PluginMethod
    fun registerBarcodeCountViewListener(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewListener.BRUSH_FOR_RECOGNIZED_BARCODE_EVENT,
            callbackContext
        )
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewListener.BRUSH_FOR_RECOGNIZED_BARCODE_NOT_IN_LIST_EVENT,
            callbackContext
        )
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewListener.BRUSH_FOR_ACCEPTED_BARCODE,
            callbackContext
        )
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewListener.BRUSH_FOR_REJECTED_BARCODE,
            callbackContext
        )
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewListener.DID_TAP_FILTERED_BARCODE,
            callbackContext
        )
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewListener.DID_COMPLETE_CAPTURE_LIST,
            callbackContext
        )
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewListener.DID_TAP_RECOGNIZED_BARCODE,
            callbackContext
        )
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewListener.DID_TAP_RECOGNIZED_BARCODE_NOT_IN_LIST,
            callbackContext
        )
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewListener.DID_TAP_ACCEPTED_BARCODE,
            callbackContext
        )
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewListener.DID_TAP_REJECTED_BARCODE,
            callbackContext
        )
        barcodeCountModule.addBarcodeCountViewListener(viewId)
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun unregisterBarcodeCountViewListener(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")

        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewListener.BRUSH_FOR_RECOGNIZED_BARCODE_EVENT,
        )
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewListener.BRUSH_FOR_RECOGNIZED_BARCODE_NOT_IN_LIST_EVENT,
        )
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewListener.BRUSH_FOR_ACCEPTED_BARCODE,
        )
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewListener.BRUSH_FOR_REJECTED_BARCODE,
        )
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewListener.DID_TAP_FILTERED_BARCODE,
        )
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewListener.DID_COMPLETE_CAPTURE_LIST,
        )
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewListener.DID_TAP_RECOGNIZED_BARCODE,
        )
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewListener.DID_TAP_RECOGNIZED_BARCODE_NOT_IN_LIST,
        )
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewListener.DID_TAP_ACCEPTED_BARCODE,
        )
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodeCountViewListener.DID_TAP_REJECTED_BARCODE,
        )
        barcodeCountModule.removeBarcodeCountViewListener(viewId)
        callbackContext.success()
    }

    @PluginMethod
    fun clearBarcodeCountViewHighlights(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")

        barcodeCountModule.clearHighlights(viewId)
        callbackContext.success()
    }

    @PluginMethod
    fun setBarcodeCountViewPositionAndSize(args: JSONArray, callbackContext: CallbackContext) {
        val positionJson = args.getJSONObject(0) ?: return callbackContext.error(
            "No position was given for setting the view"
        )
        barcodeCountViewHandler.setResizeAndMoveInfo(ResizeAndMoveInfo(positionJson))
        callbackContext.success()
    }

    @PluginMethod
    fun showBarcodeCountView(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        barcodeCountModule.showView(viewId)
        callbackContext.success()
    }

    @PluginMethod
    fun hideBarcodeCountView(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        barcodeCountModule.hideView(viewId)
        callbackContext.success()
    }

    @PluginMethod
    fun finishBarcodeCountBrushForRecognizedBarcode(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val payload = args.getJSONObject(0)
        val viewId = payload.getInt("viewId")
        val brushJson = payload.getOrNull("brushJson")
        val brush = if (brushJson.isNullOrBlank()) null else BrushDeserializer.fromJson(brushJson)
        val trackedBarcodeId = payload.optInt("trackedBarcodeId", -1)
        barcodeCountModule.finishBrushForRecognizedBarcodeEvent(viewId, brush, trackedBarcodeId)
        callbackContext.success()
    }

    @PluginMethod
    fun finishBarcodeCountBrushForRecognizedBarcodeNotInList(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val payload = args.getJSONObject(0)
        val viewId = payload.getInt("viewId")
        val brushJson = payload.getOrNull("brushJson")
        val brush = if (brushJson.isNullOrBlank()) null else BrushDeserializer.fromJson(brushJson)
        val trackedBarcodeId = payload.optInt("trackedBarcodeId", -1)
        barcodeCountModule.finishBrushForRecognizedBarcodeNotInListEvent(
            viewId,
            brush,
            trackedBarcodeId
        )
        callbackContext.success()
    }

    @PluginMethod
    fun finishBarcodeCountBrushForAcceptedBarcode(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val payload = args.getJSONObject(0)
        val viewId = payload.getInt("viewId")
        val brushJson = payload.getOrNull("brushJson")
        val brush = if (brushJson.isNullOrBlank()) null else BrushDeserializer.fromJson(brushJson)
        val trackedBarcodeId = payload.optInt("trackedBarcodeId", -1)
        barcodeCountModule.finishBrushForAcceptedBarcodeEvent(viewId, brush, trackedBarcodeId)
        callbackContext.success()
    }

    @PluginMethod
    fun finishBarcodeCountBrushForRejectedBarcode(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val payload = args.getJSONObject(0)
        val viewId = payload.getInt("viewId")
        val brushJson = payload.getOrNull("brushJson")
        val brush = if (brushJson.isNullOrBlank()) null else BrushDeserializer.fromJson(brushJson)
        val trackedBarcodeId = payload.optInt("trackedBarcodeId", -1)
        barcodeCountModule.finishBrushForRejectedBarcodeEvent(viewId, brush, trackedBarcodeId)
        callbackContext.success()
    }

    @PluginMethod
    fun enableHardwareTrigger(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        val hardwareTriggerKeyCode = argsJson.optInt("hardwareTriggerKeyCode", Int.MAX_VALUE)
            .takeIf {
                it != Int.MAX_VALUE
            }

        barcodeCountModule.enableHardwareTrigger(
            viewId,
            hardwareTriggerKeyCode,
            CordovaResult(callbackContext)
        )
    }

    // Barcode Count - End

    // Barcode Generator - Start

    @PluginMethod
    fun createBarcodeGenerator(args: JSONArray, callbackContext: CallbackContext) {
        val barcodeGeneratorJson = args.optString(0)

        if (barcodeGeneratorJson.isNullOrBlank()) {
            callbackContext.error("No barcodeGeneratorJson was provided for the function.")
            return
        }
        barcodeGeneratorModule.createGenerator(barcodeGeneratorJson, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun generateFromBase64EncodedData(args: JSONArray, callbackContext: CallbackContext) {
        val dataJson = args.getJSONObject(0)

        val generatorId = dataJson.getString("generatorId") ?: run {
            callbackContext.error("No generatorId was provided for the function.")
            return
        }
        val data = dataJson.getString("data") ?: run {
            callbackContext.error("No data was provided for the function.")
            return
        }
        val imageWidth = dataJson.optInt("imageWidth", -1)

        barcodeGeneratorModule.generateFromBase64EncodedData(
            generatorId,
            data,
            imageWidth,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun generateFromString(args: JSONArray, callbackContext: CallbackContext) {
        val dataJson = args.getJSONObject(0)

        val generatorId = dataJson.getString("generatorId") ?: run {
            callbackContext.error("No generatorId was provided for the function.")
            return
        }
        val text = dataJson.getString("text") ?: run {
            callbackContext.error("No text was provided for the function.")
            return
        }
        val imageWidth = dataJson.optInt("imageWidth", -1)

        barcodeGeneratorModule.generate(
            generatorId,
            text,
            imageWidth,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun disposeBarcodeGenerator(args: JSONArray, callbackContext: CallbackContext) {
        val generatorId = args.optString(0)

        if (generatorId.isNullOrBlank()) {
            callbackContext.error("No generatorId was provided for the function.")
            return
        }

        barcodeGeneratorModule.disposeGenerator(generatorId, CordovaResult(callbackContext))
    }

    // Barcode Generator - End

    @PluginMethod
    fun addBarcodePickListener(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.registerViewSpecificCallback(
            viewId,
            FrameworksBarcodePickListener.DID_UPDATE_SESSION,
            callbackContext
        )

        barcodePickModule.addBarcodePickListener(viewId, CordovaResultKeepCallback(callbackContext))
    }

    @PluginMethod
    fun removeBarcodePickListener(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        eventEmitter.unregisterViewSpecificCallback(
            viewId,
            FrameworksBarcodePickListener.DID_UPDATE_SESSION
        )

        barcodePickModule.removeBarcodePickListener(viewId, CordovaResult(callbackContext))
    }
}
