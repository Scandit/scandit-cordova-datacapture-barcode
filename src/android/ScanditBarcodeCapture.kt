/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2019- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.barcode

import android.content.pm.PackageManager
import com.scandit.datacapture.cordova.barcode.handlers.BarcodeArViewHandler
import com.scandit.datacapture.cordova.barcode.handlers.BarcodeCountViewHandler
import com.scandit.datacapture.cordova.barcode.handlers.BarcodeFindViewHandler
import com.scandit.datacapture.cordova.barcode.handlers.BarcodePickViewHandler
import com.scandit.datacapture.cordova.core.ScanditCaptureCore
import com.scandit.datacapture.cordova.core.data.ResizeAndMoveInfo
import com.scandit.datacapture.cordova.core.utils.CordovaEventEmitter
import com.scandit.datacapture.cordova.core.utils.CordovaMethodCall
import com.scandit.datacapture.cordova.core.utils.CordovaResult
import com.scandit.datacapture.cordova.core.utils.PermissionRequest
import com.scandit.datacapture.cordova.core.utils.PluginMethod
import com.scandit.datacapture.frameworks.barcode.BarcodeModule
import com.scandit.datacapture.frameworks.barcode.ar.BarcodeArModule
import com.scandit.datacapture.frameworks.barcode.batch.BarcodeBatchModule
import com.scandit.datacapture.frameworks.barcode.capture.BarcodeCaptureModule
import com.scandit.datacapture.frameworks.barcode.count.BarcodeCountModule
import com.scandit.datacapture.frameworks.barcode.find.BarcodeFindModule
import com.scandit.datacapture.frameworks.barcode.generator.BarcodeGeneratorModule
import com.scandit.datacapture.frameworks.barcode.pick.BarcodePickModule
import com.scandit.datacapture.frameworks.barcode.selection.BarcodeSelectionModule
import com.scandit.datacapture.frameworks.barcode.selection.listeners.FrameworksBarcodeSelectionAimedBrushProvider
import com.scandit.datacapture.frameworks.barcode.selection.listeners.FrameworksBarcodeSelectionTrackedBrushProvider
import com.scandit.datacapture.frameworks.barcode.spark.SparkScanModule
import com.scandit.datacapture.frameworks.core.CoreModule
import com.scandit.datacapture.frameworks.core.errors.ParameterNullError
import com.scandit.datacapture.frameworks.core.listeners.registry.RegistryEmitter
import com.scandit.datacapture.frameworks.core.locator.DefaultServiceLocator
import com.scandit.datacapture.frameworks.core.utils.DefaultMainThread
import com.scandit.datacapture.frameworks.core.utils.MainThread
import org.apache.cordova.CallbackContext
import org.apache.cordova.CordovaPlugin
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject

class ScanditBarcodeCapture :
    CordovaPlugin() {

    private val emitter = CordovaEventEmitter()

    private val registryEmitter = RegistryEmitter(emitter)

    private val mainThread: MainThread = DefaultMainThread.getInstance()

    private val permissionRequest = PermissionRequest.getInstance()

    // Cordova tracks concurrent permission requests from one plugin independently,
    // so several views can be waiting on the same decision.
    private val pendingBarcodeArViews = mutableListOf<PendingBarcodeArView>()

    private class PendingBarcodeArView(
        val viewId: Int,
        val viewJson: String,
        val callbackContext: CallbackContext
    )

    private val barcodeModule = BarcodeModule()
    private val barcodeCaptureModule = BarcodeCaptureModule.create(registryEmitter)
    private val barcodeBatchModule = BarcodeBatchModule.create(registryEmitter)
    private val barcodeSelectionModule = BarcodeSelectionModule(
        registryEmitter,
        FrameworksBarcodeSelectionAimedBrushProvider(registryEmitter),
        FrameworksBarcodeSelectionTrackedBrushProvider(registryEmitter)
    )

    private val barcodeArModule = BarcodeArModule.create(emitter)
    private val barcodeArViewHandler: BarcodeArViewHandler = BarcodeArViewHandler()
    private val barcodeFindModule = BarcodeFindModule.create(emitter)
    private val barcodeFindViewHandler: BarcodeFindViewHandler = BarcodeFindViewHandler()

    private val barcodePickModule: BarcodePickModule = BarcodePickModule.create(emitter)
    private val barcodePickViewHandler: BarcodePickViewHandler = BarcodePickViewHandler()

    private val sparkScanModule: SparkScanModule = SparkScanModule.create(emitter)

    private val barcodeCountModule = BarcodeCountModule.create(registryEmitter)

    private val barcodeGeneratorModule = BarcodeGeneratorModule()

    private val barcodeCountViewHandler: BarcodeCountViewHandler = BarcodeCountViewHandler()

    private var lastBarcodeCaptureEnabledState: Boolean = false
    private var lastBarcodeBatchEnabledState: Boolean = false
    private var lastBarcodeSelectionEnabledState: Boolean = false

    private var lastBarcodeFindEnabledState: Boolean = false
    private var lastSparkScanEnabledState: Boolean = false
    private var lastBarcodeCountEnabledState: Boolean = false

    private val serviceLocator = DefaultServiceLocator.getInstance()

    override fun pluginInitialize() {
        barcodeFindViewHandler.attachWebView(webView.view, cordova.activity)
        barcodePickViewHandler.attachWebView(webView.view, cordova.activity)
        barcodeArViewHandler.attachWebView(webView.view, cordova.activity)
        barcodeCountViewHandler.attachWebView(webView.view, cordova.activity)
        super.pluginInitialize()

        ScanditCaptureCore.addPlugin(serviceName)

        serviceLocator.register(barcodeModule)
        serviceLocator.register(barcodeCaptureModule)
        serviceLocator.register(barcodeBatchModule)
        serviceLocator.register(barcodeSelectionModule)
        serviceLocator.register(barcodeCountModule)
        serviceLocator.register(barcodeFindModule)
        serviceLocator.register(barcodePickModule)
        serviceLocator.register(sparkScanModule)
        serviceLocator.register(barcodeGeneratorModule)
        serviceLocator.register(barcodeArModule)

        barcodeModule.onCreate(cordova.context)
        barcodeCaptureModule.onCreate(cordova.context)
        barcodeBatchModule.onCreate(cordova.context)
        barcodeSelectionModule.onCreate(cordova.context)
        barcodeArModule.onCreate(cordova.context)
        barcodeFindModule.onCreate(cordova.context)
        barcodePickModule.onCreate(cordova.context)
        sparkScanModule.onCreate(cordova.context)
        barcodeCountModule.onCreate(cordova.context)
        barcodeGeneratorModule.onCreate(cordova.context)
    }

    override fun onStop() {
        lastBarcodeCaptureEnabledState = barcodeCaptureModule.isModeEnabled()
        barcodeCaptureModule.setTopMostModeEnabled(false)

        lastBarcodeBatchEnabledState = barcodeBatchModule.isModeEnabled()
        barcodeBatchModule.setTopMostModeEnabled(false)

        lastBarcodeSelectionEnabledState = barcodeSelectionModule.isTopMostModeEnabled()
        barcodeSelectionModule.setTopMostModeEnabled(false)

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
        barcodeSelectionModule.setTopMostModeEnabled(lastBarcodeSelectionEnabledState)
        barcodeFindModule.setTopMostModeEnabled(lastBarcodeFindEnabledState)
        barcodeCountModule.setTopMostModeEnabled(lastBarcodeCountEnabledState)
        sparkScanModule.setTopMostViewModeEnabled(lastSparkScanEnabledState)
    }

    override fun onResume(multitasking: Boolean) {
        settlePendingBarcodeArViews()
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
        // Nothing will attach these now, so fail them rather than hang the JS call.
        drainPendingBarcodeArViews().forEach {
            it.callbackContext.error(
                "BarcodeArView creation was cancelled before the camera permission resolved."
            )
        }

        barcodeModule.onDestroy()
        barcodeCaptureModule.onDestroy()
        barcodeBatchModule.onDestroy()
        barcodeSelectionModule.onDestroy()
        barcodeArModule.onDestroy()
        barcodeFindModule.onDestroy()
        barcodePickModule.onDestroy()
        barcodeCountModule.onDestroy()
        barcodeGeneratorModule.onDestroy()

        barcodeFindViewHandler.disposeAll()
        barcodeArViewHandler.disposeAll()
        barcodeCountViewHandler.disposeAll()
        barcodePickViewHandler.disposeAll()
    }

    override fun execute(
        action: String,
        args: JSONArray,
        callbackContext: CallbackContext
    ): Boolean = when (action) {
        "getDynamicDefaults" -> getDynamicDefaults(args, callbackContext)
        "createFindView" -> createFindView(args, callbackContext)
        "removeFindView" -> removeFindView(args, callbackContext)
        "createPickView" -> createPickView(args, callbackContext)
        "removePickView" -> removePickView(args, callbackContext)
        "setPickViewPositionAndSize" -> setPickViewPositionAndSize(args, callbackContext)
        "createBarcodeArView" -> createBarcodeArView(args, callbackContext)
        "setArViewPositionAndSize" -> setArViewPositionAndSize(args, callbackContext)
        "removeBarcodeArView" -> removeBarcodeArView(args, callbackContext)
        "createSparkScanView" -> createSparkScanView(args, callbackContext)
        "createBarcodeCountView" -> createBarcodeCountView(args, callbackContext)
        "removeBarcodeCountView" -> removeBarcodeCountView(args, callbackContext)
        "setBarcodeCountViewPositionAndSize" -> setBarcodeCountViewPositionAndSize(
            args,
            callbackContext
        )
        "setFindViewPositionAndSize" -> setFindViewPositionAndSize(
            args,
            callbackContext
        )
        "executeBarcode" -> executeBarcode(args, callbackContext)
        else -> false
    }.let { true }

    @PluginMethod
    fun getDynamicDefaults(
        @Suppress("UNUSED_PARAMETER") args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val dynamicDefaults = JSONObject(barcodeModule.getDynamicDefaults())

        callbackContext.success(dynamicDefaults)
    }

    @PluginMethod
    fun createFindView(args: JSONArray, callbackContext: CallbackContext) {
        val argument = args.getJSONObject(0)
        val viewId = argument.getInt("viewId")
        val viewJson = argument.getString("json") ?: return callbackContext.error(
            "incorrect or no json passed for createFindView"
        )
        val container = barcodeFindViewHandler.prepareContainer()

        mainThread.runOnMainThread {
            barcodeFindModule.addViewToContainer(
                container,
                viewJson,
                CordovaResult(callbackContext, emitter)
            )
            barcodeFindViewHandler.addBarcodeFindViewContainer(viewId, container)
        }
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
    fun setFindViewPositionAndSize(
        args: JSONArray,
        callbackContext: CallbackContext
    ) {
        val positionJson = args.getJSONObject(0) ?: return callbackContext.error(
            "No position was given for setting the view"
        )
        barcodeFindViewHandler.setResizeAndMoveInfo(ResizeAndMoveInfo(positionJson))
        callbackContext.success()
    }

    @PluginMethod
    fun createPickView(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val viewJson = argsJson.getString("json")
        val container = barcodePickViewHandler.prepareContainer()

        mainThread.runOnMainThread {
            barcodePickModule.addViewToContainer(
                container,
                viewJson,
                CordovaResult(callbackContext, emitter)
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
        barcodePickModule.pickViewRelease(viewId, CordovaResult(callbackContext, emitter))
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
    fun createBarcodeArView(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val viewJson = argsJson.getString("viewJson")
        val viewId = argsJson.getInt("viewId")

        // BarcodeArView starts the camera itself and bypasses the core permission
        // gate, so creating it before the grant leaves a black preview that nothing
        // retries (SDC-32054 requested the permission without awaiting it).
        if (permissionRequest.checkCameraPermission(this)) {
            attachBarcodeArView(viewId, viewJson, callbackContext)
            return
        }

        // Add and request under one lock: a resume landing in between would fail an
        // entry whose request had not been issued yet.
        val requestIssued = synchronized(pendingBarcodeArViews) {
            pendingBarcodeArViews.add(PendingBarcodeArView(viewId, viewJson, callbackContext))
            permissionRequest.checkOrRequestCameraPermission(this)
        }

        // Permission arrived between the check and the request, so no result will come.
        if (requestIssued.not()) {
            attachPendingBarcodeArViews()
        }
    }

    @Deprecated("Deprecated in Java")
    override fun onRequestPermissionResult(
        requestCode: Int,
        permissions: Array<out String>?,
        grantResults: IntArray?
    ) {
        if (requestCode != PermissionRequest.CODE_CAMERA_PERMISSIONS) return

        val grantResult = grantResults?.firstOrNull()
        if (permissions.isNullOrEmpty() || grantResult == null) {
            // An empty result is no decision, so leave the views parked unless the
            // permission arrived meanwhile; onResume settles the rest.
            if (permissionRequest.checkCameraPermission(this)) {
                attachPendingBarcodeArViews()
            }
            return
        }

        if (grantResult == PackageManager.PERMISSION_GRANTED) {
            attachPendingBarcodeArViews()
        } else {
            // A view attached without the permission could only show black.
            drainPendingBarcodeArViews().forEach {
                it.callbackContext.error(
                    "BarcodeArView creation failed: the camera permission was denied."
                )
            }
        }
    }

    // Cordova delivers at most one result per request, so a view parked on an empty
    // result has nothing left to call it back. Resume is where permission is final.
    private fun settlePendingBarcodeArViews() {
        if (permissionRequest.checkCameraPermission(this)) {
            attachPendingBarcodeArViews()
            return
        }

        drainPendingBarcodeArViews().forEach {
            it.callbackContext.error(
                "BarcodeArView creation failed: the camera permission was not granted."
            )
        }
    }

    private fun attachPendingBarcodeArViews() {
        drainPendingBarcodeArViews().forEach {
            attachBarcodeArView(it.viewId, it.viewJson, it.callbackContext)
        }
    }

    private fun drainPendingBarcodeArViews(): List<PendingBarcodeArView> =
        synchronized(pendingBarcodeArViews) {
            val drained = pendingBarcodeArViews.toList()
            pendingBarcodeArViews.clear()
            drained
        }

    private fun attachBarcodeArView(
        viewId: Int,
        viewJson: String,
        callbackContext: CallbackContext
    ) {
        val container = barcodeArViewHandler.prepareContainer()

        mainThread.runOnMainThread {
            barcodeArModule.addViewToContainer(
                container,
                viewJson,
                CordovaResult(callbackContext, emitter)
            )
            barcodeArViewHandler.addBarcodeArViewContainer(viewId, container)
        }
    }

    @PluginMethod
    fun setArViewPositionAndSize(args: JSONArray, callbackContext: CallbackContext) {
        val positionJson = args.getJSONObject(0) ?: return callbackContext.error(
            "No position was given for setting the view"
        )
        barcodeArViewHandler.setResizeAndMoveInfo(ResizeAndMoveInfo(positionJson))
        callbackContext.success()
    }

    @PluginMethod
    fun removeBarcodeArView(args: JSONArray, callbackContext: CallbackContext) {
        val argsJson = args.getJSONObject(0)
        val viewId = argsJson.getInt("viewId")
        barcodeArModule.viewDisposed(viewId)
        barcodeArViewHandler.disposeContainer(viewId)
        callbackContext.success()
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
                    CordovaResult(callbackContext, emitter)
                )
            }

            // check camera permissions because sparkScanView handles the camera internally
            permissionRequest.checkOrRequestCameraPermission(this)
        } catch (e: JSONException) {
            callbackContext.error("Failed to parse SparkScan view JSON: ${e.message}")
        }
    }

    // Barcode Count - Start

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
    fun setBarcodeCountViewPositionAndSize(args: JSONArray, callbackContext: CallbackContext) {
        val positionJson = args.getJSONObject(0) ?: return callbackContext.error(
            "No position was given for setting the view"
        )
        barcodeCountViewHandler.setResizeAndMoveInfo(ResizeAndMoveInfo(positionJson))
        callbackContext.success()
    }

    // Barcode Count - End

    @PluginMethod
    fun executeBarcode(args: JSONArray, callbackContext: CallbackContext) {
        this.cordova.threadPool.execute {
            val argsJson = args.getJSONObject(0)
            val moduleName = argsJson.getString("moduleName") ?: return@execute run {
                callbackContext.error(ParameterNullError("moduleName").message)
            }
            val coreModule = serviceLocator.resolve(
                CoreModule::class.java.simpleName
            ) as? CoreModule ?: return@execute run {
                callbackContext.error("Unable to retrieve the CoreModule from the locator.")
            }

            val targetModule =
                serviceLocator.resolve(moduleName) ?: return@execute run {
                    callbackContext.error("Unable to retrieve the $moduleName from the locator.")
                }

            val result = coreModule.execute(
                CordovaMethodCall(args),
                CordovaResult(callbackContext, emitter),
                targetModule
            )

            if (!result) {
                val methodName = argsJson.getString("methodName") ?: "unknown"
                callbackContext.error("Unknown method: $methodName")
            }
        }
    }
}
