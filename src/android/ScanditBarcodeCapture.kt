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
import com.scandit.datacapture.frameworks.barcode.count.listeners.FrameworksBarcodeCountCaptureListListener
import com.scandit.datacapture.frameworks.barcode.count.listeners.FrameworksBarcodeCountListener
import com.scandit.datacapture.frameworks.barcode.count.listeners.FrameworksBarcodeCountStatusProvider
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
    private val barcodeCaptureModule = BarcodeCaptureModule(
        FrameworksBarcodeCaptureListener(eventEmitter)
    )
    private val barcodeBatchModule = BarcodeBatchModule(
        FrameworksBarcodeBatchListener(eventEmitter),
        FrameworksBarcodeBatchBasicOverlayListener(eventEmitter),
        FrameworksBarcodeBatchAdvancedOverlayListener(eventEmitter)
    )
    private val barcodeSelectionModule = BarcodeSelectionModule(
        FrameworksBarcodeSelectionListener(eventEmitter),
        FrameworksBarcodeSelectionAimedBrushProvider(eventEmitter),
        FrameworksBarcodeSelectionTrackedBrushProvider(eventEmitter)
    )

    private val barcodeFindModule = BarcodeFindModule(
        FrameworksBarcodeFindListener(eventEmitter),
        FrameworksBarcodeFindViewUiListener(eventEmitter),
        FrameworksBarcodeFindTransformer(eventEmitter)
    )
    private val barcodeFindViewHandler: BarcodeFindViewHandler = BarcodeFindViewHandler()

    private val barcodePickModule = BarcodePickModule(
        eventEmitter,
        FrameworksBarcodePickActionListener(eventEmitter),
        FrameworksBarcodePickScanningListener(eventEmitter),
        FrameworksBarcodePickViewListener(eventEmitter),
        FrameworksBarcodePickViewUiListener(eventEmitter)
    )
    private val barcodePickViewHandler: BarcodePickViewHandler = BarcodePickViewHandler()

    private val sparkScanModule: SparkScanModule = SparkScanModule.create(eventEmitter)

    private val barcodeCountModule = BarcodeCountModule(
        FrameworksBarcodeCountListener(eventEmitter),
        FrameworksBarcodeCountCaptureListListener(eventEmitter),
        FrameworksBarcodeCountViewListener(eventEmitter),
        FrameworksBarcodeCountViewUiListener(eventEmitter),
        FrameworksBarcodeCountStatusProvider(eventEmitter)
    )

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
        barcodeCaptureModule.setModeEnabled(false)

        lastBarcodeBatchEnabledState = barcodeBatchModule.isModeEnabled()
        barcodeBatchModule.setModeEnabled(false)

        lastBarcodeSelectionEnabledState = barcodeSelectionModule.isModeEnabled()
        barcodeSelectionModule.setModeEnabled(false)

        lastBarcodeFindEnabledState = barcodeFindModule.isModeEnabled()
        barcodeFindModule.setModeEnabled(false)

        lastSparkScanEnabledState = sparkScanModule.isModeEnabled()
        sparkScanModule.setTopMostViewModeEnabled(false)

        lastBarcodeCountEnabledState = barcodeCountModule.isModeEnabled()
        barcodeCountModule.setModeEnabled(false)
    }

    override fun onStart() {
        barcodeCaptureModule.setModeEnabled(lastBarcodeCaptureEnabledState)
        barcodeBatchModule.setModeEnabled(lastBarcodeBatchEnabledState)
        barcodeSelectionModule.setModeEnabled(lastBarcodeSelectionEnabledState)
        barcodeFindModule.setModeEnabled(lastBarcodeFindEnabledState)
        barcodeCountModule.setModeEnabled(lastBarcodeCountEnabledState)
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
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.registerCallback(
            FrameworksBarcodeCaptureListener.ON_SESSION_UPDATED_EVENT_NAME,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodeCaptureListener.ON_BARCODE_SCANNED_EVENT_NAME,
            callbackContext
        )
        barcodeCaptureModule.addListener()
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun unregisterBarcodeCaptureListenerForEvents(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.unregisterCallback(
            FrameworksBarcodeCaptureListener.ON_SESSION_UPDATED_EVENT_NAME
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodeCaptureListener.ON_BARCODE_SCANNED_EVENT_NAME
        )
        barcodeCaptureModule.removeListener()
        callbackContext.success()
    }

    @PluginMethod
    fun subscribeBarcodeBatchListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.registerCallback(
            FrameworksBarcodeBatchListener.ON_SESSION_UPDATED_EVENT_NAME,
            callbackContext
        )
        barcodeBatchModule.addBarcodeBatchListener()
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun unregisterBarcodeBatchListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.unregisterCallback(
            FrameworksBarcodeBatchListener.ON_SESSION_UPDATED_EVENT_NAME
        )

        barcodeBatchModule.removeBarcodeBatchListener()
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
        barcodeCaptureModule.finishDidUpdateSession(args.optBoolean("enabled", true))
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun finishBarcodeCaptureDidScan(args: JSONArray, callbackContext: CallbackContext) {
        barcodeCaptureModule.finishDidScan(args.optBoolean("enabled", true))
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun finishBarcodeSelectionDidSelect(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeSelectionModule.finishDidSelect(args.optBoolean("enabled", true))
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun finishBarcodeSelectionDidUpdateSession(args: JSONArray, callbackContext: CallbackContext) {
        barcodeSelectionModule.finishDidUpdateSession(args.optBoolean("enabled", true))
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun finishBarcodeBatchDidUpdateSession(args: JSONArray, callbackContext: CallbackContext) {
        barcodeBatchModule.finishDidUpdateSession(args.optBoolean("enabled", true))
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun subscribeBarcodeBatchBasicOverlayListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.registerCallback(
            FrameworksBarcodeBatchBasicOverlayListener.EVENT_ON_TRACKED_BARCODE_TAPPED,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodeBatchBasicOverlayListener.EVENT_SET_BRUSH_FOR_TRACKED_BARCODE,
            callbackContext
        )
        barcodeBatchModule.addBasicOverlayListener()
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun unregisterBarcodeBatchBasicOverlayListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.unregisterCallback(
            FrameworksBarcodeBatchBasicOverlayListener.EVENT_ON_TRACKED_BARCODE_TAPPED
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodeBatchBasicOverlayListener.EVENT_SET_BRUSH_FOR_TRACKED_BARCODE
        )
        barcodeBatchModule.removeBasicOverlayListener()
        callbackContext.success()
    }

    @PluginMethod
    fun setBrushForTrackedBarcode(args: JSONArray, callbackContext: CallbackContext) {
        try {
            val payload = args.getJSONObject(0)
            barcodeBatchModule.setBasicOverlayBrushForTrackedBarcode(
                payload.toString()
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
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeBatchModule.clearBasicOverlayTrackedBarcodeBrushes()
        callbackContext.success()
    }

    @PluginMethod
    fun subscribeBarcodeBatchAdvancedOverlayListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
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
        barcodeBatchModule.addAdvancedOverlayListener()
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun unregisterBarcodeBatchAdvancedOverlayListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
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
        barcodeBatchModule.removeAdvancedOverlayListener()
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
                hashMapOf(
                    "offset" to payload.getString("offset"),
                    "identifier" to payload.getInt("trackedBarcodeID"),
                    "sessionFrameSequenceID" to if (payload.has("sessionFrameSequenceID")) {
                        payload.getLong("sessionFrameSequenceID")
                    } else {
                        null
                    }
                )
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
            val payload = hashMapOf<String, Any?>(
                "anchor" to argument.getString("anchor"),
                "identifier" to argument.getInt("trackedBarcodeID"),
                "sessionFrameSequenceID" to if (argument.has("sessionFrameSequenceID")) {
                    argument.getLong("sessionFrameSequenceID")
                } else {
                    null
                }
            )
            barcodeBatchModule.setAnchorForTrackedBarcode(payload)

            callbackContext.success()
        } catch (e: JSONException) {
            callbackContext.error(JsonParseError(e.message).toString())
        } catch (e: RuntimeException) {
            callbackContext.error(JsonParseError(e.message).toString())
        }
    }

    @PluginMethod
    fun clearTrackedBarcodeViews(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeBatchModule.clearAdvancedOverlayTrackedBarcodeViews()
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
        barcodeCaptureModule.resetSession(null)
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
        val viewJson = args.defaultArgumentAsString
        val container = barcodeFindViewHandler.prepareContainer()

        val result = barcodeFindModule.getView(container, viewJson)
        if (result.isFailure) {
            callbackContext.error(
                result.exceptionOrNull()?.message
                    ?: "Unable to create the BarcodeFindView from the given json=$viewJson"
            )
            return
        }

        barcodeFindViewHandler.addBarcodeFindViewContainer(container)
        barcodeFindViewHandler.render()
        callbackContext.success()
    }

    @PluginMethod
    fun updateFindView(args: JSONArray, callbackContext: CallbackContext) {
        val viewJson = args.toString()
        barcodeFindModule.updateBarcodeFindView(viewJson, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun removeFindView(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeFindModule.viewDisposed()
        barcodeFindViewHandler.disposeCurrentView()
        callbackContext.success()
    }

    @PluginMethod
    fun updateFindMode(args: JSONArray, callbackContext: CallbackContext) {
        barcodeFindModule.updateBarcodeFindMode(
            args.defaultArgumentAsString,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun setBarcodeFindTransformer(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeFindModule.setBarcodeFindTransformer(CordovaResult(callbackContext))
    }

    @PluginMethod
    fun submitBarcodeFindTransformerResult(args: JSONArray, callbackContext: CallbackContext) {
        val transformedBarcode = args.defaultArgumentAsString
        barcodeFindModule.submitBarcodeFindTransformerResult(
            transformedBarcode,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun updateBarcodeFindFeedback(args: JSONArray, callbackContext: CallbackContext) {
        val feedbackJson = args.defaultArgumentAsString
        barcodeFindModule.updateFeedback(
            feedbackJson,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun registerBarcodeFindListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.registerCallback(
            FrameworksBarcodeFindListener.ON_SEARCH_PAUSED_EVENT_NAME,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodeFindListener.ON_SEARCH_STARTED_EVENT_NAME,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodeFindListener.ON_SEARCH_STOPPED_EVENT_NAME,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodeFindListener.ON_SESSION_UPDATED_EVENT_NAME,
            callbackContext
        )

        barcodeFindModule.addBarcodeFindListener(CordovaResultKeepCallback(callbackContext))
    }

    @SuppressLint("ImplicitSamInstance")
    @PluginMethod
    fun unregisterBarcodeFindListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.unregisterCallback(
            FrameworksBarcodeFindListener.ON_SEARCH_PAUSED_EVENT_NAME
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodeFindListener.ON_SEARCH_STARTED_EVENT_NAME
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodeFindListener.ON_SEARCH_STOPPED_EVENT_NAME
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodeFindListener.ON_SESSION_UPDATED_EVENT_NAME
        )

        barcodeFindModule.removeBarcodeFindListener(CordovaResult(callbackContext))
    }

    @PluginMethod
    fun registerBarcodeFindViewListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.registerCallback(
            FrameworksBarcodeFindViewUiListener.ON_FINISH_BUTTON_TAPPED_EVENT_NAME,
            callbackContext
        )

        barcodeFindModule.addBarcodeFindViewListener(CordovaResultKeepCallback(callbackContext))
    }

    @SuppressLint("ImplicitSamInstance")
    @PluginMethod
    fun unregisterBarcodeFindViewListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.unregisterCallback(
            FrameworksBarcodeFindViewUiListener.ON_FINISH_BUTTON_TAPPED_EVENT_NAME
        )

        barcodeFindModule.removeBarcodeFindViewListener(CordovaResult(callbackContext))
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
        barcodeFindModule.setItemList(args.defaultArgumentAsString, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun barcodeFindViewStopSearching(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeFindModule.viewStopSearching(CordovaResult(callbackContext))
    }

    @PluginMethod
    fun barcodeFindViewStartSearching(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeFindModule.viewStartSearching(CordovaResult(callbackContext))
    }

    @PluginMethod
    fun barcodeFindViewPauseSearching(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeFindModule.viewPauseSearching(CordovaResult(callbackContext))
    }

    @PluginMethod
    fun barcodeFindModeStart(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeFindModule.modeStart(CordovaResult(callbackContext))
    }

    @PluginMethod
    fun barcodeFindModePause(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeFindModule.modePause(CordovaResult(callbackContext))
    }

    @PluginMethod
    fun barcodeFindModeStop(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeFindModule.modeStop(CordovaResult(callbackContext))
    }

    @PluginMethod
    fun showFindView(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeFindViewHandler.setVisible()
        callbackContext.success()
    }

    @PluginMethod
    fun hideFindView(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeFindViewHandler.setInvisible()
        callbackContext.success()
    }

    @PluginMethod
    fun createPickView(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val viewJson = argsJson.getString("json")
        val container = barcodePickViewHandler.prepareContainer()

        barcodePickModule.addViewToContainer(container, viewJson, CordovaResult(callbackContext))

        barcodePickViewHandler.addBarcodePickViewContainer(container)
        barcodePickViewHandler.render()
    }

    @PluginMethod
    fun removePickView(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodePickViewHandler.disposeCurrentView()
        barcodePickModule.viewDisposed()
        callbackContext.success()
    }

    @PluginMethod
    fun pickViewStart(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodePickModule.viewStart()
        callbackContext.success()
    }

    @PluginMethod
    fun pickViewStop(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodePickModule.viewStop()
        callbackContext.success()
    }

    @PluginMethod
    fun pickViewFreeze(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodePickModule.viewFreeze(CordovaResult(callbackContext))
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
        val viewJson = args.toString()
        barcodePickModule.updateView(viewJson, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun addPickActionListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.registerCallback(
            FrameworksBarcodePickActionListener.DID_PICK_EVENT_NAME,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodePickActionListener.DID_UNPICK_EVENT_NAME,
            callbackContext
        )
        barcodePickModule.addActionListener()
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun removePickActionListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.unregisterCallback(FrameworksBarcodePickActionListener.DID_PICK_EVENT_NAME)
        eventEmitter.unregisterCallback(FrameworksBarcodePickActionListener.DID_UNPICK_EVENT_NAME)
        barcodePickModule.removeActionListener()
        callbackContext.success()
    }

    @PluginMethod
    fun finishPickAction(args: JSONArray, callbackContext: CallbackContext) {
        val itemDataJson = args.optString("code", "")
        val result = args.optBoolean("result", false)

        barcodePickModule.finishPickAction(itemData = itemDataJson, result)
        callbackContext.success()
    }

    @SuppressLint("ImplicitSamInstance")
    @PluginMethod
    fun unsubscribeListeners(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodePickModule.removeActionListener()
        barcodePickModule.removeScanningListener(CordovaResult(callbackContext))
        barcodePickModule.removeViewListener(CordovaResult(callbackContext))
        barcodePickModule.removeViewUiListener(CordovaResult(callbackContext))

        eventEmitter.unregisterCallback(FrameworksBarcodePickActionListener.DID_PICK_EVENT_NAME)
        eventEmitter.unregisterCallback(FrameworksBarcodePickActionListener.DID_UNPICK_EVENT_NAME)

        eventEmitter.unregisterCallback(FrameworksBarcodePickScanningListener.ON_COMPLETE_SCANNING)
        eventEmitter.unregisterCallback(FrameworksBarcodePickScanningListener.ON_UPDATE_SCANNING)

        eventEmitter.unregisterCallback(
            FrameworksBarcodePickViewListener.DID_START_SCANNING_EVENT
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodePickViewListener.DID_STOP_SCANNING_EVENT
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodePickViewListener.DID_PAUSE_SCANNING_EVENT
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodePickViewListener.DID_FREEZE_SCANNING_EVENT
        )

        eventEmitter.unregisterCallback(
            FrameworksBarcodePickViewUiListener.DID_TAP_FINISH_BUTTON_EVENT
        )
    }

    @PluginMethod
    fun registerOnProductIdentifierForItemsListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.registerCallback(
            FrameworksBarcodePickAsyncMapperProductProviderCallback
                .ON_PRODUCT_IDENTIFIERS_FOR_ITEMS_EVENT_NAME,
            callbackContext
        )
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun unregisterOnProductIdentifierForItemsListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.unregisterCallback(
            FrameworksBarcodePickAsyncMapperProductProviderCallback
                .ON_PRODUCT_IDENTIFIERS_FOR_ITEMS_EVENT_NAME
        )
        callbackContext.success()
    }

    @PluginMethod
    fun addBarcodePickScanningListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.registerCallback(
            FrameworksBarcodePickScanningListener
                .ON_COMPLETE_SCANNING,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodePickScanningListener
                .ON_UPDATE_SCANNING,
            callbackContext
        )
        barcodePickModule.addScanningListener(CordovaResultKeepCallback(callbackContext))
    }

    @SuppressLint("ImplicitSamInstance")
    @PluginMethod
    fun removeBarcodePickScanningListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.unregisterCallback(
            FrameworksBarcodePickScanningListener
                .ON_COMPLETE_SCANNING
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodePickScanningListener
                .ON_UPDATE_SCANNING
        )
        barcodePickModule.removeScanningListener(CordovaResult(callbackContext))
    }

    @PluginMethod
    fun addPickViewListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.registerCallback(
            FrameworksBarcodePickViewListener
                .DID_START_SCANNING_EVENT,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodePickViewListener
                .DID_FREEZE_SCANNING_EVENT,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodePickViewListener
                .DID_PAUSE_SCANNING_EVENT,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodePickViewListener
                .DID_STOP_SCANNING_EVENT,
            callbackContext
        )
        barcodePickModule.addViewListener(CordovaResultKeepCallback(callbackContext))
    }

    @PluginMethod
    fun removePickViewListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.unregisterCallback(FrameworksBarcodePickViewListener.DID_START_SCANNING_EVENT)
        eventEmitter.unregisterCallback(FrameworksBarcodePickViewListener.DID_STOP_SCANNING_EVENT)
        eventEmitter.unregisterCallback(FrameworksBarcodePickViewListener.DID_PAUSE_SCANNING_EVENT)
        eventEmitter.unregisterCallback(FrameworksBarcodePickViewListener.DID_FREEZE_SCANNING_EVENT)
        barcodePickModule.removeViewListener(CordovaResult(callbackContext))
    }

    @PluginMethod
    fun registerBarcodePickViewUiListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.registerCallback(
            FrameworksBarcodePickViewUiListener
                .DID_TAP_FINISH_BUTTON_EVENT,
            callbackContext
        )
        barcodePickModule.addViewUiListener(CordovaResultKeepCallback(callbackContext))
    }

    @SuppressLint("ImplicitSamInstance")
    @PluginMethod
    fun unregisterBarcodePickViewUiListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.unregisterCallback(
            FrameworksBarcodePickViewUiListener
                .DID_TAP_FINISH_BUTTON_EVENT
        )
        barcodePickModule.removeViewUiListener(CordovaResult(callbackContext))
    }

    @PluginMethod
    fun finishOnProductIdentifierForItems(args: JSONArray, callbackContext: CallbackContext) {
        barcodePickModule.finishOnProductIdentifierForItems(
            args.optString("itemsJson", "")
        )
        callbackContext.success()
    }

    @PluginMethod
    fun updateBarcodeCaptureOverlay(args: JSONArray, callbackContext: CallbackContext) {
        barcodeCaptureModule.updateOverlay(
            args.optString("overlayJson", ""),
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun updateBarcodeCaptureMode(args: JSONArray, callbackContext: CallbackContext) {
        barcodeCaptureModule.updateModeFromJson(
            args.optString("modeJson", ""),
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun applyBarcodeCaptureModeSettings(args: JSONArray, callbackContext: CallbackContext) {
        barcodeCaptureModule.applyModeSettings(
            args.optString("modeSettingsJson", ""),
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
        barcodeCaptureModule.setModeEnabled(args.optBoolean("enabled", false))
        callbackContext.success()
    }

    @PluginMethod
    fun setBarcodeSelectionModeEnabledState(args: JSONArray, callbackContext: CallbackContext) {
        barcodeSelectionModule.setModeEnabled(args.optBoolean("enabled", false))
        callbackContext.success()
    }

    @PluginMethod
    fun setBarcodeBatchModeEnabledState(args: JSONArray, callbackContext: CallbackContext) {
        barcodeBatchModule.setModeEnabled(args.optBoolean("enabled", false))
        callbackContext.success()
    }

    @PluginMethod
    fun setBarcodeFindModeEnabledState(args: JSONArray, callbackContext: CallbackContext) {
        barcodeFindModule.setModeEnabled(args.optBoolean(0, false))
        callbackContext.success()
    }

    @PluginMethod
    fun updateBarcodeBatchAdvancedOverlay(args: JSONArray, callbackContext: CallbackContext) {
        barcodeBatchModule.updateAdvancedOverlay(
            args.defaultArgumentAsString,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun updateBarcodeBatchBasicOverlay(args: JSONArray, callbackContext: CallbackContext) {
        barcodeBatchModule.updateBasicOverlay(
            args.defaultArgumentAsString,
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
        barcodeBatchModule.applyModeSettings(
            args.defaultArgumentAsString,
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
        // Noop
        callbackContext.success()
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
        barcodeCountModule.updateBarcodeCount(
            modeJson,
        )
        callbackContext.success()
    }

    @PluginMethod
    fun resetBarcodeCount(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeCountModule.resetBarcodeCount()
        callbackContext.success()
    }

    @PluginMethod
    fun registerBarcodeCountListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.registerCallback(
            FrameworksBarcodeCountListener.ON_BARCODE_SCANNED_EVENT_NAME,
            callbackContext
        )

        barcodeCountModule.addBarcodeCountListener()
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun unregisterBarcodeCountListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.unregisterCallback(
            FrameworksBarcodeCountListener.ON_BARCODE_SCANNED_EVENT_NAME
        )

        barcodeCountModule.removeBarcodeCountListener()
        callbackContext.success()
    }

    @PluginMethod
    fun setBarcodeCountModeEnabledState(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val isEnabled = argsJson.getBoolean("isEnabled")
        barcodeCountModule.setModeEnabled(isEnabled)
        callbackContext.success()
    }

    @PluginMethod
    fun updateBarcodeCountFeedback(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val feedbackJson = argsJson.getString("feedbackJson")
        if (feedbackJson.isBlank()) {
            callbackContext.error("No feedbackJson was provided for the function.")
            return
        }
        barcodeCountModule.updateFeedback(feedbackJson, CordovaResult(callbackContext))
    }

    @PluginMethod
    fun finishBarcodeCountOnScan(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeCountModule.finishOnScan(true)
        callbackContext.success()
    }

    @PluginMethod
    fun startBarcodeCountScanningPhase(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeCountModule.startScanningPhase()
        callbackContext.success()
    }

    @PluginMethod
    fun endBarcodeCountScanningPhase(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeCountModule.endScanningPhase()
        callbackContext.success()
    }

    @PluginMethod
    fun setBarcodeCountCaptureList(args: JSONArray, callbackContext: CallbackContext) {
        val barcodes = JSONArray(args.defaultArgumentAsString)
        barcodeCountModule.setBarcodeCountCaptureList(barcodes)
        callbackContext.success()
    }

    @PluginMethod
    fun getBarcodeCountSpatialMap(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeCountModule.submitSpatialMap(CordovaResult(callbackContext))
    }

    @PluginMethod
    fun getBarcodeCountSpatialMapWithHints(args: JSONArray, callbackContext: CallbackContext) {
        val hints = args.getJSONObject(0)
        val expectedNumberOfRows = hints.getInt("expectedNumberOfRows")
        val expectedNumberOfColumns = hints.getInt("expectedNumberOfColumns")
        barcodeCountModule.submitSpatialMap(
            expectedNumberOfRows,
            expectedNumberOfColumns,
            CordovaResult(callbackContext)
        )
    }

    @PluginMethod
    fun resetBarcodeCountSession(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeCountModule.resetBarcodeCountSession(null)
        callbackContext.success()
    }

    @PluginMethod
    fun updateBarcodeCountView(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val viewJson = argsJson.getString("viewJson")
        barcodeCountModule.updateBarcodeCountView(viewJson)
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
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeCountViewHandler.disposeCurrentView()
        barcodeCountModule.viewDisposed()
        callbackContext.success()
    }

    @PluginMethod
    fun registerBarcodeCountViewUiListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.registerCallback(
            FrameworksBarcodeCountViewUiListener.ON_EXIT_BUTTON_TAPPED_EVENT_NAME,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodeCountViewUiListener.ON_LIST_BUTTON_TAPPED_EVENT_NAME,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodeCountViewUiListener.ON_SINGLE_SCAN_BUTTON_TAPPED_EVENT_NAME,
            callbackContext
        )
        barcodeCountModule.addBarcodeCountViewUiListener()
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun unregisterBarcodeCountViewUiListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.unregisterCallback(
            FrameworksBarcodeCountViewUiListener.ON_EXIT_BUTTON_TAPPED_EVENT_NAME,
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodeCountViewUiListener.ON_LIST_BUTTON_TAPPED_EVENT_NAME,
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodeCountViewUiListener.ON_SINGLE_SCAN_BUTTON_TAPPED_EVENT_NAME,
        )
        barcodeCountModule.removeBarcodeCountViewUiListener()
        callbackContext.success()
    }

    @PluginMethod
    fun registerBarcodeCountViewListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.registerCallback(
            FrameworksBarcodeCountViewListener.BRUSH_FOR_RECOGNIZED_BARCODE_EVENT,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodeCountViewListener.BRUSH_FOR_RECOGNIZED_BARCODE_NOT_IN_LIST_EVENT,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodeCountViewListener.BRUSH_FOR_ACCEPTED_BARCODE,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodeCountViewListener.BRUSH_FOR_REJECTED_BARCODE,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodeCountViewListener.DID_TAP_FILTERED_BARCODE,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodeCountViewListener.DID_COMPLETE_CAPTURE_LIST,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodeCountViewListener.DID_TAP_RECOGNIZED_BARCODE,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodeCountViewListener.DID_TAP_RECOGNIZED_BARCODE_NOT_IN_LIST,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodeCountViewListener.DID_TAP_ACCEPTED_BARCODE,
            callbackContext
        )
        eventEmitter.registerCallback(
            FrameworksBarcodeCountViewListener.DID_TAP_REJECTED_BARCODE,
            callbackContext
        )
        barcodeCountModule.addBarcodeCountViewListener()
        callbackContext.successAndKeepCallback()
    }

    @PluginMethod
    fun unregisterBarcodeCountViewListener(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        eventEmitter.unregisterCallback(
            FrameworksBarcodeCountViewListener.BRUSH_FOR_RECOGNIZED_BARCODE_EVENT,
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodeCountViewListener.BRUSH_FOR_RECOGNIZED_BARCODE_NOT_IN_LIST_EVENT,
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodeCountViewListener.BRUSH_FOR_ACCEPTED_BARCODE,
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodeCountViewListener.BRUSH_FOR_REJECTED_BARCODE,
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodeCountViewListener.DID_TAP_FILTERED_BARCODE,
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodeCountViewListener.DID_COMPLETE_CAPTURE_LIST,
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodeCountViewListener.DID_TAP_RECOGNIZED_BARCODE,
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodeCountViewListener.DID_TAP_RECOGNIZED_BARCODE_NOT_IN_LIST,
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodeCountViewListener.DID_TAP_ACCEPTED_BARCODE,
        )
        eventEmitter.unregisterCallback(
            FrameworksBarcodeCountViewListener.DID_TAP_REJECTED_BARCODE,
        )
        barcodeCountModule.removeBarcodeCountViewListener()
        callbackContext.success()
    }

    @PluginMethod
    fun clearBarcodeCountViewHighlights(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeCountModule.clearHighlights()
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
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeCountViewHandler.setVisible()
        callbackContext.success()
    }

    @PluginMethod
    fun hideBarcodeCountView(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        barcodeCountViewHandler.setInvisible()
        callbackContext.success()
    }

    @PluginMethod
    fun finishBarcodeCountBrushForRecognizedBarcode(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val payload = args.getJSONObject(0)
        val brushJson = payload.getOrNull("brushJson")
        val brush = if (brushJson.isNullOrBlank()) null else BrushDeserializer.fromJson(brushJson)
        val trackedBarcodeId = payload.optInt("trackedBarcodeId", -1)
        barcodeCountModule.finishBrushForRecognizedBarcodeEvent(brush, trackedBarcodeId)
        callbackContext.success()
    }

    @PluginMethod
    fun finishBarcodeCountBrushForRecognizedBarcodeNotInList(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val payload = args.getJSONObject(0)
        val brushJson = payload.getOrNull("brushJson")
        val brush = if (brushJson.isNullOrBlank()) null else BrushDeserializer.fromJson(brushJson)
        val trackedBarcodeId = payload.optInt("trackedBarcodeId", -1)
        barcodeCountModule.finishBrushForRecognizedBarcodeNotInListEvent(brush, trackedBarcodeId)
        callbackContext.success()
    }

    @PluginMethod
    fun finishBarcodeCountBrushForAcceptedBarcode(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val payload = args.getJSONObject(0)
        val brushJson = payload.getOrNull("brushJson")
        val brush = if (brushJson.isNullOrBlank()) null else BrushDeserializer.fromJson(brushJson)
        val trackedBarcodeId = payload.optInt("trackedBarcodeId", -1)
        barcodeCountModule.finishBrushForAcceptedBarcodeEvent(brush, trackedBarcodeId)
        callbackContext.success()
    }

    @PluginMethod
    fun finishBarcodeCountBrushForRejectedBarcode(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val payload = args.getJSONObject(0)
        val brushJson = payload.getOrNull("brushJson")
        val brush = if (brushJson.isNullOrBlank()) null else BrushDeserializer.fromJson(brushJson)
        val trackedBarcodeId = payload.optInt("trackedBarcodeId", -1)
        barcodeCountModule.finishBrushForRejectedBarcodeEvent(brush, trackedBarcodeId)
        callbackContext.success()
    }

    @PluginMethod
    fun enablenableHardwareTrigger(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val hardwareTriggerKeyCode = argsJson.optInt("hardwareTriggerKeyCode", Int.MAX_VALUE)
            .takeIf {
                it != Int.MAX_VALUE
            }

        barcodeCountModule.enableHardwareTrigger(
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
}
