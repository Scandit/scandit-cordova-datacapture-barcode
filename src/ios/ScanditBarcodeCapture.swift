import ScanditBarcodeCapture
import ScanditFrameworksBarcode
import ScanditFrameworksCore
import WebKit

fileprivate struct NoOpCordovaResult: FrameworksResult {
    func success(result: Any?) {}

    func reject(code: String, message: String?, details: Any?) {}

    func reject(error: Error) {}
}

fileprivate extension FrameworksResult where Self == NoOpCordovaResult {
    static func noOp() -> Self {
        .init()
    }
}

fileprivate extension CordovaEventEmitter {
    func registerCallback(with event: FrameworksBarcodeCaptureEvent, call: CDVInvokedUrlCommand) {
        registerCallback(with: event.rawValue, call: call)
    }

    func registerCallback(with event: FrameworksBarcodeBatchEvent, call: CDVInvokedUrlCommand) {
        registerCallback(with: event.rawValue, call: call)
    }

    func registerCallback(with event: FrameworksBarcodeSelectionEvent, call: CDVInvokedUrlCommand) {
        registerCallback(with: event.rawValue, call: call)
    }

    func registerCallback(with event: FrameworksBarcodeFindEvent, call: CDVInvokedUrlCommand) {
        registerCallback(with: event.rawValue, call: call)
    }

    func unregisterCallback(with event: FrameworksBarcodeFindEvent) {
        unregisterCallback(with: event.rawValue)
    }

    func registerCallback(with event: BarcodePickEvent, call: CDVInvokedUrlCommand) {
        registerCallback(with: event.rawValue, call: call)
    }

    func unregisterCallback(with event: BarcodePickEvent) {
        unregisterCallback(with: event.rawValue)
    }

    func registerCallback(with event: BarcodePickViewListenerEvents, call: CDVInvokedUrlCommand) {
        registerCallback(with: event.rawValue, call: call)
    }

    func unregisterCallback(with event: BarcodePickViewListenerEvents) {
        unregisterCallback(with: event.rawValue)
    }

    func registerCallback(with event: BarcodePickViewUiListenerEvents, call: CDVInvokedUrlCommand) {
        registerCallback(with: event.rawValue, call: call)
    }

    func unregisterCallback(with event: BarcodePickViewUiListenerEvents) {
        unregisterCallback(with: event.rawValue)
    }

    func registerCallback(with event: BarcodePickScanningEvent, call: CDVInvokedUrlCommand) {
        registerCallback(with: event.rawValue, call: call)
    }

    func unregisterCallback(with event: BarcodePickScanningEvent) {
        unregisterCallback(with: event.rawValue)
    }

    func registerCallback(with event: FrameworksBarcodeSelectionAimedBrushProviderEvent, call: CDVInvokedUrlCommand) {
        registerCallback(with: event.rawValue, call: call)
    }

    func unregisterCallback(with event: FrameworksBarcodeSelectionAimedBrushProviderEvent) {
        unregisterCallback(with: event.rawValue)
    }

    func registerCallback(with event: FrameworksBarcodeSelectionTrackedBrushProviderEvent, call: CDVInvokedUrlCommand) {
        registerCallback(with: event.rawValue, call: call)
    }

    func unregisterCallback(with event: FrameworksBarcodeSelectionTrackedBrushProviderEvent) {
        unregisterCallback(with: event.rawValue)
    }

    func registerCallback(with event: FrameworksSparkScanFeedbackDelegateEvent, call: CDVInvokedUrlCommand) {
        registerCallback(with: event.rawValue, call: call)
    }
    
    func registerViewSpecificCallback(_ viewId: Int, with event: FrameworksSparkScanFeedbackDelegateEvent, call: CDVInvokedUrlCommand) {
        registerViewSpecificCallback(viewId, with: event.rawValue, call: call)
    }

    func unregisterCallback(with event: FrameworksSparkScanFeedbackDelegateEvent) {
        unregisterCallback(with: event.rawValue)
    }
    
    func unregisterCallback(_ viewId: Int, with event: FrameworksSparkScanFeedbackDelegateEvent) {
        unregisterViewSpecificCallback(viewId, with: event.rawValue)
    }
}

@objc(ScanditBarcodeCapture)
class ScanditBarcodeCapture: CDVPlugin {
    private let brushProviderQueue = DispatchQueue(label: "com.scandit.frameworks.cordova.brushprovider")
    var barcodeModule: BarcodeModule!
    var barcodeCaptureModule: BarcodeCaptureModule!
    var barcodeBatchModule: BarcodeBatchModule!
    var barcodeSelectionModule: BarcodeSelectionModule!
    var barcodeFindModule: BarcodeFindModule!
    var barcodePickModule: BarcodePickModule!
    var emitter: CordovaEventEmitter!
    var barcodeFindViewHandler: BarcodeFindViewHandler!
    var barcodePickViewHandler: BarcodePickViewHandler!
    var sparkScanModule: SparkScanModule!
    var barcodeCountModule: BarcodeCountModule!
    var barcodeGeneratorModule: BarcodeGeneratorModule!

    private lazy var barcodeCountViewConstraints = NativeViewConstraints(relativeTo: webView as! WKWebView)

    override func pluginInitialize() {
        super.pluginInitialize()
        barcodeModule = BarcodeModule()
        emitter = CordovaEventEmitter(commandDelegate: commandDelegate)

        barcodeCaptureModule = BarcodeCaptureModule(
            barcodeCaptureListener: FrameworksBarcodeCaptureListener(emitter: emitter)
        )
        barcodeBatchModule = BarcodeBatchModule(
            barcodeBatchListener: FrameworksBarcodeBatchListener(emitter: emitter),
            barcodeBatchBasicOverlayListener: FrameworksBarcodeBatchBasicOverlayListener(emitter: emitter),
            barcodeBatchAdvancedOverlayListener: FrameworksBarcodeBatchAdvancedOverlayListener(emitter: emitter),
            emitter: emitter
        )
        barcodeSelectionModule = BarcodeSelectionModule(
            barcodeSelectionListener: FrameworksBarcodeSelectionListener(emitter: emitter),
            aimedBrushProvider: FrameworksBarcodeSelectionAimedBrushProvider(emitter: emitter, queue: brushProviderQueue),
            trackedBrushProvider: FrameworksBarcodeSelectionTrackedBrushProvider(emitter: emitter, queue: brushProviderQueue)
        )
        barcodeFindModule = BarcodeFindModule(
            listener: FrameworksBarcodeFindListener(emitter: emitter),
            viewListener: FrameworksBarcodeFindViewUIListener(emitter: emitter),
            barcodeTransformer: FrameworksBarcodeFindTransformer(emitter: emitter)
        )
        barcodePickModule = BarcodePickModule(emitter: emitter)
        sparkScanModule = SparkScanModule(emitter: emitter)

        barcodeCountModule = BarcodeCountModule(
            barcodeCountListener: FrameworksBarcodeCountListener(emitter: emitter),
            captureListListener: FrameworksBarcodeCountCaptureListListener(emitter: emitter),
            viewListener: FrameworksBarcodeCountViewListener(emitter: emitter),
            viewUiListener: FrameworksBarcodeCountViewUIListener(emitter: emitter),
            statusProvider: FrameworksBarcodeCountStatusProvider(emitter: emitter)
        )

        barcodeGeneratorModule = BarcodeGeneratorModule()

        barcodeModule.didStart()
        barcodeCaptureModule.didStart()
        barcodeBatchModule.didStart()
        barcodeSelectionModule.didStart()
        barcodeFindModule.didStart()
        barcodePickModule.didStart()
        sparkScanModule.didStart()
        barcodeCountModule.didStart()
        barcodeGeneratorModule.didStart()

        barcodeFindViewHandler = BarcodeFindViewHandler(relativeTo: webView as! WKWebView)
        barcodePickViewHandler = BarcodePickViewHandler(relativeTo: webView as! WKWebView)
    }

    override func dispose() {
        barcodeModule.didStop()
        barcodeCaptureModule.didStop()
        barcodeCaptureModule.removeListener()
        barcodeBatchModule.didStop()
        barcodeBatchModule.removeBarcodeBatchListener()
        barcodeBatchModule.removeBasicOverlayListener()
        barcodeBatchModule.removeAdvancedOverlayListener()
        barcodeSelectionModule.didStop()
        barcodeSelectionModule.removeListener()
        barcodeFindModule.removeBarcodeFindListener(result: .noOp())
        barcodeFindModule.removeBarcodeFindViewListener(result: .noOp())
        barcodeFindModule.didStop()
        barcodePickModule.removeActionListener()
        barcodePickModule.removeScanningListener()
        barcodePickModule.removeViewListener()
        barcodePickModule.removeViewUiListener()
        barcodePickModule.didStop()
        sparkScanModule.didStop()
        barcodeCountModule.didStop()
        barcodeGeneratorModule.didStop()
        super.dispose()
    }

    @objc(getDefaults:)
    func getDefaults(command: CDVInvokedUrlCommand) {
        var defaults = barcodeModule.defaults.toEncodable() as CDVPluginResult.JSONMessage
        defaults["BarcodeCapture"] = barcodeCaptureModule.defaults.toEncodable()
        defaults["BarcodeBatch"] = barcodeBatchModule.defaults.toEncodable()
        defaults["BarcodeSelection"] = barcodeSelectionModule.defaults.toEncodable()
        defaults["BarcodeFind"] = barcodeFindModule.defaults.toEncodable()
        defaults["BarcodePick"] = barcodePickModule.defaults.toEncodable()
        defaults["SparkScan"] = sparkScanModule.defaults.toEncodable()
        defaults["BarcodeCount"] = barcodeCountModule.defaults.toEncodable()
        commandDelegate.send(.success(message: defaults), callbackId: command.callbackId)
    }

    // MARK: - Subscribe listeners

    @objc(registerBarcodeCaptureListenerForEvents:)
    func registerBarcodeCaptureListenerForEvents(command: CDVInvokedUrlCommand) {
        emitter.registerCallback(with: .barcodeScanned, call: command)
        emitter.registerCallback(with: FrameworksBarcodeCaptureEvent.sessionUpdated, call: command)
        barcodeCaptureModule.addListener()
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(unregisterBarcodeCaptureListenerForEvents:)
    func unregisterBarcodeCaptureListenerForEvents(command: CDVInvokedUrlCommand) {
        emitter.unregisterCallback(with: FrameworksBarcodeCaptureEvent.barcodeScanned.rawValue)
        emitter.unregisterCallback(with: FrameworksBarcodeCaptureEvent.sessionUpdated.rawValue)
        barcodeCaptureModule.addListener()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(subscribeBarcodeBatchListener:)
    func subscribeBarcodeBatchListener(command: CDVInvokedUrlCommand) {
        emitter.registerCallback(with: FrameworksBarcodeBatchEvent.sessionUpdated, call: command)
        barcodeBatchModule.addBarcodeBatchListener()
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(unregisterBarcodeBatchListener:)
    func unregisterBarcodeBatchListener(command: CDVInvokedUrlCommand) {
        emitter.unregisterCallback(with: FrameworksBarcodeBatchEvent.sessionUpdated.rawValue)
        barcodeBatchModule.removeBarcodeBatchListener()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(subscribeBarcodeBatchBasicOverlayListener:)
    func subscribeBarcodeBatchBasicOverlayListener(command: CDVInvokedUrlCommand) {
        emitter.registerCallback(with: FrameworksBarcodeBatchEvent.brushForTrackedBarcode, call: command)
        emitter.registerCallback(with: FrameworksBarcodeBatchEvent.didTapOnTrackedBarcode, call: command)
        barcodeBatchModule.addBasicOverlayListener()
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(unregisterBarcodeBatchBasicOverlayListener:)
    func unregisterBarcodeBatchBasicOverlayListener(command: CDVInvokedUrlCommand) {
        emitter.unregisterCallback(with: FrameworksBarcodeBatchEvent.brushForTrackedBarcode.rawValue)
        emitter.unregisterCallback(with: FrameworksBarcodeBatchEvent.didTapOnTrackedBarcode.rawValue)
        barcodeBatchModule.removeBasicOverlayListener()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(subscribeBarcodeBatchAdvancedOverlayListener:)
    func subscribeBarcodeBatchAdvancedOverlayListener(command: CDVInvokedUrlCommand) {
        emitter.registerCallback(with: .anchorForTrackedBarcode, call: command)
        emitter.registerCallback(with: .offsetForTrackedBarcode, call: command)
        emitter.registerCallback(with: .widgetForTrackedBarcode, call: command)
        emitter.registerCallback(with: .didTapViewForTrackedBarcode, call: command)
        barcodeBatchModule.addAdvancedOverlayListener()
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(unregisterBarcodeBatchAdvancedOverlayListener:)
    func unregisterBarcodeBatchAdvancedOverlayListener(command: CDVInvokedUrlCommand) {
        emitter.unregisterCallback(with: FrameworksBarcodeBatchEvent.anchorForTrackedBarcode.rawValue)
        emitter.unregisterCallback(with: FrameworksBarcodeBatchEvent.offsetForTrackedBarcode.rawValue)
        emitter.unregisterCallback(with: FrameworksBarcodeBatchEvent.widgetForTrackedBarcode.rawValue)
        emitter.unregisterCallback(with: FrameworksBarcodeBatchEvent.didTapViewForTrackedBarcode.rawValue)
        barcodeBatchModule.removeAdvancedOverlayListener()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(registerBarcodeSelectionListenerForEvents:)
    func registerBarcodeSelectionListenerForEvents(command: CDVInvokedUrlCommand) {
        emitter.registerCallback(with: .didUpdateSelection, call: command)
        emitter.registerCallback(with: FrameworksBarcodeSelectionEvent.didUpdateSession, call: command)
        barcodeSelectionModule.addListener()
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(unregisterBarcodeSelectionListenerForEvents:)
    func unregisterBarcodeSelectionListenerForEvents(command: CDVInvokedUrlCommand) {
        emitter.unregisterCallback(with: FrameworksBarcodeSelectionEvent.didUpdateSelection.rawValue)
        emitter.unregisterCallback(with: FrameworksBarcodeSelectionEvent.didUpdateSession.rawValue)
        barcodeSelectionModule.removeListener()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    // MARK: - Barcode Capture

    @objc(finishBarcodeCaptureDidUpdateSession:)
    func finishBarcodeCaptureDidUpdateSession(command: CDVInvokedUrlCommand) {
        var enabled = false
        if let payload = command.defaultArgumentAsDictionary, let value = payload["enabled"] as? Bool {
            enabled = value
        }
        barcodeCaptureModule.finishDidUpdateSession(enabled: enabled)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(finishBarcodeCaptureDidScan:)
    func finishBarcodeCaptureDidScan(command: CDVInvokedUrlCommand) {
        var enabled = false
        if let payload = command.defaultArgumentAsDictionary, let value = payload["enabled"] as? Bool {
            enabled = value
        }
        barcodeCaptureModule.finishDidScan(enabled: enabled)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(resetBarcodeCaptureSession:)
    func resetBarcodeCaptureSession(command: CDVInvokedUrlCommand) {
        barcodeCaptureModule.resetSession(frameSequenceId: nil)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(setBarcodeCaptureModeEnabledState:)
    func setBarcodeCaptureModeEnabledState(command: CDVInvokedUrlCommand) {
        var enabled = false
        if let payload = command.defaultArgumentAsDictionary, let value = payload["enabled"] as? Bool {
            enabled = value
        }
        barcodeCaptureModule.setModeEnabled(enabled: enabled)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    // MARK: - Barcode Batch

    @objc(finishBarcodeBatchDidUpdateSession:)
    func finishBarcodeBatchDidUpdateSession(command: CDVInvokedUrlCommand) {
        var enabled = false
        if let payload = command.defaultArgumentAsDictionary, let value = payload["enabled"] as? Bool {
            enabled = value
        }
        barcodeBatchModule.finishDidUpdateSession(enabled: enabled)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(resetBarcodeBatchSession:)
    func resetBarcodeBatchSession(command: CDVInvokedUrlCommand) {
        barcodeBatchModule.resetSession(frameSequenceId: nil)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(setBarcodeBatchModeEnabledState:)
    func setBarcodeBatchModeEnabledState(command: CDVInvokedUrlCommand) {
        var enabled = false
        if let payload = command.defaultArgumentAsDictionary, let value = payload["enabled"] as? Bool {
            enabled = value
        }
        barcodeBatchModule.setModeEnabled(enabled: enabled)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    // MARK: - Barcode Batch Basic Overlay

    @objc(finishBarcodeBatchBrushForTrackedBarcode:)
    func finishBarcodeBatchBrushForTrackedBarcode(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsString else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeBatchModule.setBasicOverlayBrush(with: json)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(setBrushForTrackedBarcode:)
    func setBrushForTrackedBarcode(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsString else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeBatchModule.setBasicOverlayBrush(with: json)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(clearTrackedBarcodeBrushes:)
    func clearTrackedBarcodeBrushes(command: CDVInvokedUrlCommand) {
        barcodeBatchModule.clearBasicOverlayTrackedBarcodeBrushes()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    // MARK: Barcode Batch Advanced Overlay

    @objc(setViewForTrackedBarcode:)
    func setViewForTrackedBarcode(command: CDVInvokedUrlCommand) {
        guard let json = try? ViewAndTrackedBarcodeJSON.fromCommand(command) else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        guard let id = Int(json.trackedBarcodeID),
              let trackedBarcode = barcodeBatchModule.trackedBarcode(by: id) else {
            commandDelegate.send(.failure(with: .trackedBarcodeNotFound), callbackId: command.callbackId)
            return
        }

        var view: TrackedBarcodeView?
        dispatchMainSync {
            if let viewJson = json.view {
                view = TrackedBarcodeView(json: viewJson)
                view?.didTap = { [weak self] in
                    guard let self = self else { return }
                    self.emitter.emit(name: FrameworksBarcodeBatchEvent.didTapViewForTrackedBarcode.rawValue,
                                      payload: ["trackedBarcode": trackedBarcode.jsonString])
                }
            }
        }
        guard let view = view else { return }
        barcodeBatchModule.setViewForTrackedBarcode(view: view, trackedBarcodeId: id, sessionFrameSequenceId: nil)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(setAnchorForTrackedBarcode:)
    func setAnchorForTrackedBarcode(command: CDVInvokedUrlCommand) {
        guard var json = command.defaultArgumentAsDictionary,
              let trackedBarcodeIdString = json["trackedBarcodeID"] as? String,
              let identifier = Int(trackedBarcodeIdString) else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        json["identifier"] = identifier
        json.removeValue(forKey: "trackedBarcodeID")
        barcodeBatchModule.setAnchorForTrackedBarcode(anchorParams: json)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(setOffsetForTrackedBarcode:)
    func setOffsetForTrackedBarcode(command: CDVInvokedUrlCommand) {
        guard var json = command.defaultArgumentAsDictionary,
              let trackedBarcodeIdString = json["trackedBarcodeID"] as? String,
              let identifier = Int(trackedBarcodeIdString) else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        json["identifier"] = identifier
        json.removeValue(forKey: "trackedBarcodeID")
        barcodeBatchModule.setOffsetForTrackedBarcode(offsetParams: json)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(clearTrackedBarcodeViews:)
    func clearTrackedBarcodeViews(command: CDVInvokedUrlCommand) {
        barcodeBatchModule.clearAdvancedOverlayTrackedBarcodeViews()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    // MARK: Barcode Selection

    @objc(finishBarcodeSelectionDidUpdateSession:)
    func finishBarcodeSelectionDidUpdateSession(command: CDVInvokedUrlCommand) {
        var enabled = false
        if let payload = command.defaultArgumentAsDictionary, let value = payload["enabled"] as? Bool {
            enabled = value
        }
        barcodeSelectionModule.finishDidUpdate(enabled: enabled)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(finishBarcodeSelectionDidSelect:)
    func finishBarcodeSelectionDidSelect(command: CDVInvokedUrlCommand) {
        var enabled = false
        if let payload = command.defaultArgumentAsDictionary, let value = payload["enabled"] as? Bool {
            enabled = value
        }
        barcodeSelectionModule.finishDidSelect(enabled: enabled)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(resetBarcodeSelectionSession:)
    func resetBarcodeSelectionSession(command: CDVInvokedUrlCommand) {
        barcodeSelectionModule.resetLatestSession(frameSequenceId: nil)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(resetBarcodeSelection:)
    func resetBarcodeSelection(command: CDVInvokedUrlCommand) {
        barcodeSelectionModule.resetSelection()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(unfreezeCameraInBarcodeSelection:)
    func unfreezeCameraInBarcodeSelection(command: CDVInvokedUrlCommand) {
        barcodeSelectionModule.unfreezeCamera()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(getCountForBarcodeInBarcodeSelectionSession:)
    func getCountForBarcodeInBarcodeSelectionSession(command: CDVInvokedUrlCommand) {
        guard let payload = command.defaultArgumentAsDictionary, let selectionIdentifier = payload["selectionIdentifier"] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeSelectionModule.submitBarcodeCountForIdentifier(
            selectionIdentifier: selectionIdentifier,
            result: CordovaResult(commandDelegate, command.callbackId)
        )
    }

    @objc(setBarcodeSelectionModeEnabledState:)
    func setBarcodeSelectionModeEnabledState(command: CDVInvokedUrlCommand) {
        var enabled = false
        if let payload = command.defaultArgumentAsDictionary, let value = payload["enabled"] as? Bool {
            enabled = value
        }
        barcodeSelectionModule.setModeEnabled(enabled: enabled)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(unselectBarcodes:)
    func unselectBarcodes(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let barcodesJson = argsJson["barcodesJson"] as? String
        else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeSelectionModule.unselectBarcodes(barcodesJson: barcodesJson, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(setSelectBarcodeEnabled:)
    func setSelectBarcodeEnabled(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        guard let enabled = json["enabled"] as? Bool else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let barcodeJson = json["barcodeJson"] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeSelectionModule.setSelectBarcodeEnabled(barcodesJson: barcodeJson, enabled: enabled, result: CordovaResult(commandDelegate, command.callbackId))
    }

    // MARK: Barcode Find

    @objc(createFindView:)
    func createFindView(command: CDVInvokedUrlCommand) {
        let viewJson = command.defaultArgumentAsString!
        dispatchMain {
            self.barcodeFindModule.addViewToContainer(
                container: self.barcodeFindViewHandler.webView,
                jsonString: viewJson,
                result: CordovaResult(self.commandDelegate, command.callbackId)
            )
        }
    }

    @objc(updateFindView:)
    func updateFindView(command: CDVInvokedUrlCommand) {
        let viewJson = command.defaultArgumentAsString!
        barcodeFindModule.updateBarcodeFindView(viewJson: viewJson,
                                                result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(removeFindView:)
    func removeFindView(command: CDVInvokedUrlCommand) {
        dispatchMain {
            self.barcodeFindViewHandler.barcodeFindView = nil
            self.barcodeFindModule.removeBarcodeFindView(result: CordovaResult(self.commandDelegate, command.callbackId))
        }
    }

    @objc(updateFindMode:)
    func updateFindMode(command: CDVInvokedUrlCommand) {
        let payload = command.defaultArgumentAsDictionary!
        let modeJson = payload["BarcodeFind"] as! String
        barcodeFindModule.updateBarcodeFindMode(modeJson: modeJson,
                                                result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(registerBarcodeFindListener:)
    func registerBarcodeFindListener(command: CDVInvokedUrlCommand) {
        emitter.registerCallback(with: .didPauseSearch, call: command)
        emitter.registerCallback(with: .didStartSearch, call: command)
        emitter.registerCallback(with: .didStopSearch, call: command)
        barcodeFindModule.addBarcodeFindListener(result: CordovaResultKeepCallback(commandDelegate, command.callbackId))
    }

    @objc(unregisterBarcodeFindListener:)
    func unregisterBarcodeFindListener(command: CDVInvokedUrlCommand) {
        emitter.unregisterCallback(with: .didPauseSearch)
        emitter.unregisterCallback(with: .didStartSearch)
        emitter.unregisterCallback(with: .didStopSearch)
        barcodeFindModule.removeBarcodeFindListener(result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(registerBarcodeFindViewListener:)
    func registerBarcodeFindViewListener(command: CDVInvokedUrlCommand) {
        emitter.registerCallback(with: .finishButtonTapped, call: command)
        barcodeFindModule.addBarcodeFindViewListener(result: CordovaResultKeepCallback(commandDelegate, command.callbackId))
    }

    @objc(unregisterBarcodeFindViewListener:)
    func unregisterBarcodeFindViewListener(command: CDVInvokedUrlCommand) {
        emitter.unregisterCallback(with: .finishButtonTapped)
        barcodeFindModule.removeBarcodeFindViewListener(result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(barcodeFindViewOnPause:)
    func barcodeFindViewOnPause(command: CDVInvokedUrlCommand) {
        // No iOS implementation
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(barcodeFindViewOnResume:)
    func barcodeFindViewOnResume(command: CDVInvokedUrlCommand) {
        barcodeFindModule.prepareSearching(result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(barcodeFindSetItemList:)
    func barcodeFindSetItemList(command: CDVInvokedUrlCommand) {
        let json = command.defaultArgumentAsString!
        barcodeFindModule.setItemList(barcodeFindItemsJson: json,
                                      result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(barcodeFindViewStopSearching:)
    func barcodeFindViewStopSearching(command: CDVInvokedUrlCommand) {
        barcodeFindModule.stopSearching(result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(barcodeFindViewStartSearching:)
    func barcodeFindViewStartSearching(command: CDVInvokedUrlCommand) {
        barcodeFindModule.startSearching(result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(barcodeFindViewPauseSearching:)
    func barcodeFindViewPauseSearching(command: CDVInvokedUrlCommand) {
        barcodeFindModule.pauseSearching(result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(barcodeFindModeStart:)
    func barcodeFindModeStart(command: CDVInvokedUrlCommand) {
        barcodeFindModule.startMode(result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(barcodeFindModePause:)
    func barcodeFindModePause(command: CDVInvokedUrlCommand) {
        barcodeFindModule.pauseMode(result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(barcodeFindModeStop:)
    func barcodeFindModeStop(command: CDVInvokedUrlCommand) {
        barcodeFindModule.stopMode(result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(setBarcodeFindTransformer:)
    func setBarcodeFindTransformer(command: CDVInvokedUrlCommand) {
        barcodeFindModule.setBarcodeFindTransformer(result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(submitBarcodeFindTransformerResult:)
    func submitBarcodeFindTransformerResult(command: CDVInvokedUrlCommand) {
        let transformedBarcode = command.defaultArgumentAsString!
        barcodeFindModule.submitBarcodeFindTransformerResult(
            transformedData: transformedBarcode,
            result: CordovaResult(commandDelegate, command.callbackId)
        )
    }

    @objc(updateBarcodeFindFeedback:)
    func updateBarcodeFindFeedback(command: CDVInvokedUrlCommand) {
        let feedbackJson = command.defaultArgumentAsString!
        barcodeFindModule.updateFeedback(
            feedbackJson: feedbackJson,
            result: CordovaResult(commandDelegate, command.callbackId)
        )
    }

    @objc(showFindView:)
    func showFindView(command: CDVInvokedUrlCommand) {
        dispatchMain {
            guard let barcodeFindView = self.barcodeFindViewHandler.barcodeFindView else {
                self.commandDelegate.send(.failure(with: .noViewToBeShown), callbackId: command.callbackId)
                return
            }
            barcodeFindView.isHidden = false
            self.commandDelegate.send(.success, callbackId: command.callbackId)
        }
    }

    @objc(hideFindView:)
    func hideFindView(command: CDVInvokedUrlCommand) {
        dispatchMain {
            guard let barcodeFindView = self.barcodeFindViewHandler.barcodeFindView else {
                self.commandDelegate.send(.failure(with: .noViewToBeShown), callbackId: command.callbackId)
                return
            }
            barcodeFindView.isHidden = true
            self.commandDelegate.send(.success, callbackId: command.callbackId)
        }
    }

    @objc(setBarcodeFindModeEnabledState:)
    func setBarcodeFindModeEnabledState(command: CDVInvokedUrlCommand) {
        var enabled = false
        if let payload = command.defaultArgumentAsDictionary, let value = payload["enabled"] as? Bool {
            enabled = value
        }
        barcodeFindModule.setModeEnabled(enabled: enabled)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    // MARK: Barcode Pick


    @objc(subscribeDidPickItemListener:)
    func subscribeDidPickItemListener(command: CDVInvokedUrlCommand) {
        emitter.registerCallback(with: .pick, call: command)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(subscribeDidUnpickItemListener:)
    func subscribeDidUnpickItemListener(command: CDVInvokedUrlCommand) {
        emitter.registerCallback(with: .unpick, call: command)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(subscribeProductIdentifierForItemsListener:)
    func subscribeProductIdentifierForItemsListener(command: CDVInvokedUrlCommand) {
        emitter.registerCallback(with: .onProductIdentifierForItems, call: command)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(unsubscribeListeners:)
    func unsubscribeListeners(command: CDVInvokedUrlCommand) {
        emitter.unregisterCallback(with: .pick)
        emitter.unregisterCallback(with: .unpick)
        emitter.unregisterCallback(with: .onProductIdentifierForItems)
        emitter.unregisterCallback(with: .didStartScanning)
        emitter.unregisterCallback(with: .didStopScanning)
        emitter.unregisterCallback(with: .didPauseScanning)
        emitter.unregisterCallback(with: .didFreezeScanning)

        barcodePickModule.removeActionListener()
        barcodePickModule.removeScanningListener()
        barcodePickModule.removeViewListener()
        
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(createPickView:)
    func createPickView(command: CDVInvokedUrlCommand) {
        guard let viewJson = command.defaultArgumentAsString else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        dispatchMain {
            self.barcodePickModule.addViewToContainer(
                container: self.barcodePickViewHandler.webView,
                jsonString: viewJson,
                result: CordovaResult(self.commandDelegate, command.callbackId)
            )
            self.barcodePickViewHandler.barcodePickView = self.barcodePickModule.barcodePickView
        }
    }

    @objc(removePickView:)
    func removePickView(command: CDVInvokedUrlCommand) {
        dispatchMain {
            self.barcodePickViewHandler.barcodePickView = nil
            self.barcodePickModule.removeBarcodePickView(
                result: CordovaResult(self.commandDelegate, command.callbackId)
            )
        }
    }

    @objc(updateePickView:)
    func updatePickView(command: CDVInvokedUrlCommand) {
        guard let viewJson = command.defaultArgumentAsString else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        barcodePickModule.updateView(viewJson: viewJson,
                                     result: CordovaResult(commandDelegate, command.callbackId))

    }

    @objc(setPickViewPositionAndSize:)
    func setPickViewPositionAndSize(command: CDVInvokedUrlCommand) {
        guard let jsonObject = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        dispatchMain {
            guard let viewPositionAndSizeJSON = try? ViewPositionAndSizeJSON.fromJSONObject(jsonObject as Any) else {
                self.commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
                return
            }

            self.barcodePickViewHandler.updatePositionAndSize(fromJSON: viewPositionAndSizeJSON)

            if viewPositionAndSizeJSON.shouldBeUnderWebView {
                // Make the WebView transparent, so we can see views behind
                self.webView?.isOpaque = false
                self.webView?.backgroundColor = .clear
                self.webView?.scrollView.backgroundColor = .clear
            } else {
                self.webView?.isOpaque = true
                self.webView?.backgroundColor = nil
                self.webView?.scrollView.backgroundColor = nil
            }

            self.commandDelegate.send(.success, callbackId: command.callbackId)
        }
    }

    @objc(addActionListener:)
    func addActionListener(command: CDVInvokedUrlCommand) {
        barcodePickModule.addActionListener()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(removeActionListener:)
    func removeActionListener(command: CDVInvokedUrlCommand) {
        barcodePickModule.removeActionListener()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(addScanningListener:)
    func addScanningListener(command: CDVInvokedUrlCommand) {
        barcodePickModule.addScanningListener()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(removeScanningListener:)
    func removeScanningListener(command: CDVInvokedUrlCommand) {
        barcodePickModule.removeScanningListener()
        emitter.unregisterCallback(with: .didCompleteScanningSession)
        emitter.unregisterCallback(with: .didUpdateScanningSession)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(addViewListener:)
    func addViewListener(command: CDVInvokedUrlCommand) {
        barcodePickModule.addViewListener()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(subscribeDidStartScanningListener:)
    func subscribeDidStartScanningListener(command: CDVInvokedUrlCommand) {
        emitter.registerCallback(with: .didStartScanning, call: command)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(subscribeDidFreezeScanningListener:)
    func subscribeDidFreezeScanningListener(command: CDVInvokedUrlCommand) {
        emitter.registerCallback(with: .didFreezeScanning, call: command)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(subscribeDidPauseScanningListener:)
    func subscribeDidPauseScanningListener(command: CDVInvokedUrlCommand) {
        emitter.registerCallback(with: .didPauseScanning, call: command)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(subscribeDidStopScanningListener:)
    func subscribeDidStopScanningListener(command: CDVInvokedUrlCommand) {
        emitter.registerCallback(with: .didStopScanning, call: command)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(subscribeDidCompleteScanningSessionListener:)
    func subscribeDidCompleteScanningSessionListener(command: CDVInvokedUrlCommand) {
        emitter.registerCallback(with: .didCompleteScanningSession, call: command)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(subscribeDidUpdateScanningSessionListener:)
    func subscribeDidUpdateScanningSessionListener(command: CDVInvokedUrlCommand) {
        emitter.registerCallback(with: .didUpdateScanningSession, call: command)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(registerBarcodePickViewUiListener:)
    func registerBarcodePickViewUiListener(command: CDVInvokedUrlCommand) {
        barcodePickModule.addViewUiListener()
    }

    @objc(subscribeBarcodePickViewUiListener:)
    func subscribeBarcodePickViewUiListener(command: CDVInvokedUrlCommand) {
        emitter.registerCallback(with: .didTapFinishButton, call: command)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(unsubscribeBarcodePickViewUiListener:)
    func unsubscribeBarcodePickViewUiListener(command: CDVInvokedUrlCommand) {
        barcodePickModule.removeViewUiListener()
        emitter.unregisterCallback(with: .didTapFinishButton)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(finishOnProductIdentifierForItems:)
    func finishOnProductIdentifierForItems(command: CDVInvokedUrlCommand) {
        guard let itemsJson = command.defaultArgumentAsString else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodePickModule.finishProductIdentifierForItems(barcodePickProductProviderCallbackItemsJson: itemsJson)
    }

    @objc(viewStop:)
    func viewStop(command: CDVInvokedUrlCommand) {
        barcodePickModule.viewStop()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(viewStart:)
    func viewStart(command: CDVInvokedUrlCommand) {
        barcodePickModule.viewStart()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(viewFreeze:)
    func viewFreeze(command: CDVInvokedUrlCommand) {
        barcodePickModule.viewFreeze()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(finishPickAction:)
    func finishPickAction(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        guard let actionData = json["code"] as? String, let result = json["result"] as? Bool else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        barcodePickModule.finishPickAction(data: actionData, result: result)
    }


    @objc(updateBarcodeCaptureOverlay:)
    func updateBarcodeCaptureOverlay(command: CDVInvokedUrlCommand) {
        guard let payload = command.defaultArgumentAsDictionary, let overlayJson = payload["overlayJson"] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeCaptureModule.updateOverlay(overlayJson: overlayJson,
                                           result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(updateBarcodeCaptureMode:)
    func updateBarcodeCaptureMode(command: CDVInvokedUrlCommand) {
        guard let payload = command.defaultArgumentAsDictionary, let modeJson = payload["modeJson"] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeCaptureModule.updateModeFromJson(modeJson: modeJson,
                                                result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(applyBarcodeCaptureModeSettings:)
    func applyBarcodeCaptureModeSettings(command: CDVInvokedUrlCommand) {
        guard let payload = command.defaultArgumentAsDictionary, let modeSettingsJson = payload["modeSettingsJson"] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeCaptureModule.applyModeSettings(modeSettingsJson: modeSettingsJson,
                                               result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(updateBarcodeSelectionBasicOverlay:)
    func updateBarcodeSelectionBasicOverlay(command: CDVInvokedUrlCommand) {
        guard let payload = command.defaultArgumentAsDictionary, let overlayJson = payload["overlayJson"] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeSelectionModule.updateBasicOverlay(overlayJson: overlayJson,
                                                  result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(updateBarcodeSelectionMode:)
    func updateBarcodeSelectionMode(command: CDVInvokedUrlCommand) {
        guard let payload = command.defaultArgumentAsDictionary, let modeJson = payload["modeJson"] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeSelectionModule.updateModeFromJson(modeJson: modeJson,
                                                  result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(applyBarcodeSelectionModeSettings:)
    func applyBarcodeSelectionModeSettings(command: CDVInvokedUrlCommand) {
        guard let payload = command.defaultArgumentAsDictionary, let modeSettingsJson = payload["modeSettingsJson"] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeSelectionModule.applyModeSettings(modeSettingsJson: modeSettingsJson,
                                               result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(updateBarcodeSelectionFeedback:)
    func updateBarcodeSelectionFeedback(command: CDVInvokedUrlCommand) {
        guard let payload = command.defaultArgumentAsDictionary, let feedbackJson = payload["feedbackJson"] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeSelectionModule.updateFeedback(feedbackJson: feedbackJson,
                                              result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(updateBarcodeBatchBasicOverlay:)
    func updateBarcodeBatchBasicOverlay(command: CDVInvokedUrlCommand) {
        guard let overlayJson = command.defaultArgumentAsString else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeBatchModule.updateBasicOverlay(overlayJson: overlayJson,
                                                 result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(updateBarcodeBatchAdvancedOverlay:)
    func updateBarcodeBatchAdvancedOverlay(command: CDVInvokedUrlCommand) {
        guard let overlayJson = command.defaultArgumentAsString else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeBatchModule.updateAdvancedOverlay(overlayJson: overlayJson,
                                                    result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(updateBarcodeBatchMode:)
    func updateBarcodeBatchMode(command: CDVInvokedUrlCommand) {
        guard let modeJson = command.defaultArgumentAsString else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeBatchModule.updateModeFromJson(modeJson: modeJson,
                                                 result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(applyBarcodeBatchModeSettings:)
    func applyBarcodeBatchModeSettings(command: CDVInvokedUrlCommand) {
        guard let modeSettingsJson = command.defaultArgumentAsString else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeBatchModule.applyModeSettings(modeSettingsJson: modeSettingsJson,
                                                result: CordovaResult(commandDelegate, command.callbackId))
    }


    @objc(setTextForAimToSelectAutoHint:)
    func setTextForAimToSelectAutoHint(command: CDVInvokedUrlCommand) {
        guard let payload = command.defaultArgumentAsDictionary, let text = payload["text"] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeSelectionModule.setTextForAimToSelectAutoHint(text: text,
                                                             result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(removeAimedBarcodeBrushProvider:)
    func removeAimedBarcodeBrushProvider(command: CDVInvokedUrlCommand) {
        barcodeSelectionModule.removeAimedBarcodeBrushProvider()
        self.emitter.unregisterCallback(with: FrameworksBarcodeSelectionAimedBrushProviderEvent.brushForBarcode)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(setAimedBarcodeBrushProvider:)
    func setAimedBarcodeBrushProvider(command: CDVInvokedUrlCommand) {
        barcodeSelectionModule.setAimedBrushProvider(result: CordovaResultKeepCallback(commandDelegate, command.callbackId))
        self.emitter.registerCallback(with: FrameworksBarcodeSelectionAimedBrushProviderEvent.brushForBarcode, call: command)
    }

    @objc(selectAimedBarcode:)
    func selectAimedBarcode(command: CDVInvokedUrlCommand) {
        barcodeSelectionModule.selectAimedBarcode()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(increaseCountForBarcodes:)
    func increaseCountForBarcodes(command: CDVInvokedUrlCommand) {
        guard let payload = command.defaultArgumentAsDictionary, let barcodesJson = payload["barcodesJson"] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        barcodeSelectionModule.increaseCountForBarcodes(barcodesJson: barcodesJson, result: CordovaResult(commandDelegate, command.callbackId))
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(finishBrushForAimedBarcodeCallback:)
    func finishBrushForAimedBarcodeCallback(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        let brush = json["brush"] as? String
        guard let selectionIdentifier = json["selectionIdentifier"] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        barcodeSelectionModule.finishBrushForAimedBarcode(brushJson: brush, selectionIdentifier: selectionIdentifier)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(removeTrackedBarcodeBrushProvider:)
    func removeTrackedBarcodeBrushProvider(command: CDVInvokedUrlCommand) {
        barcodeSelectionModule.removeTrackedBarcodeBrushProvider()
        self.emitter.unregisterCallback(with: FrameworksBarcodeSelectionTrackedBrushProviderEvent.brushForBarcode)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(setTrackedBarcodeBrushProvider:)
    func setTrackedBarcodeBrushProvider(command: CDVInvokedUrlCommand) {
        barcodeSelectionModule.setTrackedBrushProvider(result: CordovaResultKeepCallback(commandDelegate, command.callbackId))
        self.emitter.registerCallback(with: FrameworksBarcodeSelectionTrackedBrushProviderEvent.brushForBarcode, call: command)
    }

    @objc(finishBrushForTrackedBarcodeCallback:)
    func finishBrushForTrackedBarcodeCallback(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        let brush = json["brush"] as? String
        guard let selectionIdentifier = json["selectionIdentifier"] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        barcodeSelectionModule.finishBrushForTrackedBarcode(brushJson: brush, selectionIdentifier: selectionIdentifier)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    // Mark: Spark Scan

    @objc(updateSparkScanView:)
    func updateSparkScanView(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewJson = json["viewJson"] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = json["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        sparkScanModule.updateView(
            viewId: viewId,
            viewJson: viewJson,
            result: CordovaResult(commandDelegate, command.callbackId)
        )
    }

    @objc(createSparkScanView:)
    func createSparkScanView(command: CDVInvokedUrlCommand){
        guard let json = command.defaultArgumentAsDictionary,
              let viewJson = json["viewJson"] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        dispatchMain {
            _ = self.sparkScanModule.addViewToContainer(
                self.webView,
                jsonString: viewJson,
                result: CordovaResult(self.commandDelegate, command.callbackId)
            )
        }
    }

    @objc(disposeSparkScanView:)
    func disposeSparkScanView(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewId = json["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        
        dispatchMain {
            self.sparkScanModule.disposeView(viewId: viewId)
            self.commandDelegate.send(.success, callbackId: command.callbackId)
        }
    }

    @objc(showSparkScanView:)
    func showSparkScanView(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewId = json["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        
        dispatchMain {
            self.sparkScanModule.showView(viewId)
            self.commandDelegate.send(.success, callbackId: command.callbackId)
        }
    }

    @objc(hideSparkScanView:)
    func hideSparkScanView(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewId = json["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        
        dispatchMain {
            self.sparkScanModule.hideView(viewId)
            self.commandDelegate.send(.success, callbackId: command.callbackId)
        }
    }

    @objc(registerSparkScanViewListenerEvents:)
    func registerSparkScanViewListenerEvents(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewId = json["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        
        sparkScanModule.addSparkScanViewUiListener(viewId: viewId)

        emitter.registerViewSpecificCallback(viewId, with: FrameworksSparkScanViewUIEvent.barcodeCountButtonTapped.rawValue, call: command)
        emitter.registerViewSpecificCallback(viewId, with: FrameworksSparkScanViewUIEvent.didChangeViewState.rawValue, call: command)
        emitter.registerViewSpecificCallback(viewId, with: FrameworksSparkScanViewUIEvent.barcodeFindButtonTapped.rawValue, call: command)

        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(unregisterSparkScanViewListenerEvents:)
    func unregisterSparkScanViewListenerEvents(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewId = json["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        
        sparkScanModule.removeSparkScanViewUiListener(viewId: viewId)

        emitter.unregisterViewSpecificCallback(viewId, with: FrameworksSparkScanViewUIEvent.barcodeCountButtonTapped.rawValue)
        emitter.unregisterViewSpecificCallback(viewId, with: FrameworksSparkScanViewUIEvent.didChangeViewState.rawValue)
        emitter.unregisterViewSpecificCallback(viewId, with: FrameworksSparkScanViewUIEvent.barcodeFindButtonTapped.rawValue)

        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(stopSparkScanViewScanning:)
    func stopSparkScanViewScanning(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewId = json["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        
        sparkScanModule.stopScanning(viewId: viewId)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(startSparkScanViewScanning:)
    func startSparkScanViewScanning(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewId = json["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        
        sparkScanModule.startScanning(viewId: viewId, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(pauseSparkScanViewScanning:)
    func pauseSparkScanViewScanning(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewId = json["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        
        sparkScanModule.pauseScanning(viewId: viewId)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(prepareSparkScanViewScanning:)
    func prepareSparkScanViewScanning(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewId = json["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        sparkScanModule.prepareScanning(viewId: viewId, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(resetSparkScanSession:)
    func resetSparkScanSession(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewId = json["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        
        sparkScanModule.resetSession(viewId: viewId)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(updateSparkScanMode:)
    func updateSparkScanMode(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let sparkScanJson = json["sparkScanJson"] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = json["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        sparkScanModule.updateMode(viewId: viewId, modeJson: sparkScanJson, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(registerSparkScanListenerForEvents:)
    func registerSparkScanListenerForEvents(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewId = json["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        
        sparkScanModule.addSparkScanListener(viewId: viewId)

        emitter.registerViewSpecificCallback(viewId, with: FrameworksSparkScanEvent.didScan.rawValue, call: command)
        emitter.registerViewSpecificCallback(viewId, with: FrameworksSparkScanEvent.didUpdate.rawValue, call: command)

        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(unregisterSparkScanListenerForEvents:)
    func unregisterSparkScanListenerForEvents(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewId = json["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        
        sparkScanModule.removeSparkScanListener(viewId: viewId)

        emitter.unregisterViewSpecificCallback(viewId, with: FrameworksSparkScanEvent.didScan.rawValue)
        emitter.unregisterViewSpecificCallback(viewId, with: FrameworksSparkScanEvent.didUpdate.rawValue)

        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(finishSparkScanDidUpdateSession:)
    func finishSparkScanDidUpdateSession(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let isEnabled = json["isEnabled"] as? Bool else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = json["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        sparkScanModule.finishDidUpdateSession(viewId: viewId, enabled: isEnabled)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(finishSparkScanDidScan:)
    func finishSparkScanDidScan(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let isEnabled = json["isEnabled"] as? Bool else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = json["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        sparkScanModule.finishDidScan(viewId: viewId, enabled: isEnabled)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(setSparkScanModeEnabledState:)
    func setSparkScanModeEnabledState(command: CDVInvokedUrlCommand) {
        guard let payload = command.defaultArgumentAsDictionary,
              let value = payload["isEnabled"] as? Bool,
              let viewId = payload["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        sparkScanModule.setModeEnabled(viewId: viewId, enabled: value)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(registerSparkScanFeedbackDelegateForEvents:)
    func registerSparkScanFeedbackDelegateForEvents(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewId = json["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        emitter.registerViewSpecificCallback(viewId, with: .feedbackForBarcode, call: command)
        
        sparkScanModule.addFeedbackDelegate(viewId)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(unregisterSparkScanFeedbackDelegateForEvents:)
    func unregisterSparkScanFeedbackDelegateForEvents(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewId = json["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        
        emitter.unregisterCallback(viewId, with: .feedbackForBarcode)
        sparkScanModule.removeFeedbackDelegate(viewId)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(submitSparkScanFeedbackForBarcode:)
    func submitSparkScanFeedbackForBarcode(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let feedbackJson = json["feedbackJson"] as? String,
              let viewId = json["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        sparkScanModule.submitFeedbackForBarcode(
            viewId: viewId,
            feedbackJson: feedbackJson,
            result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(showSparkScanViewToast:)
    func showSparkScanViewToast(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let text = json["text"] as? String,
              let viewId = json["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        sparkScanModule.showToast(viewId: viewId, text: text, result: CordovaResult(commandDelegate, command.callbackId))
    }

    // MARK: Barcode Count

    @objc(updateBarcodeCountMode:)
    func updateBarcodeCountMode(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let modeJson = argsJson["barcodeCountJson"] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        barcodeCountModule.updateBarcodeCount(modeJson: modeJson, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(resetBarcodeCount:)
    func resetBarcodeCount(command: CDVInvokedUrlCommand) {
        barcodeCountModule.resetBarcodeCount()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(registerBarcodeCountListener:)
    func registerBarcodeCountListener(command: CDVInvokedUrlCommand) {
        emitter.registerCallback(with: FrameworksBarcodeCountListener.Constants.barcodeScanned, call: command)
        barcodeCountModule.addBarcodeCountListener()
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(unregisterBarcodeCountListener:)
    func unregisterBarcodeCountListener(command: CDVInvokedUrlCommand) {
        emitter.unregisterCallback(with: FrameworksBarcodeCountListener.Constants.barcodeScanned)
        barcodeCountModule.removeBarcodeCountListener()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(setBarcodeCountModeEnabledState:)
    func setBarcodeCountModeEnabledState(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let enabled = argsJson["isEnabled"] as? Bool
        else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        barcodeCountModule.setModeEnabled(enabled: enabled)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(updateBarcodeCountFeedback:)
    func updateBarcodeCountFeedback(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let feedbackJson = argsJson["feedbackJson"] as? String
        else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        barcodeCountModule.updateFeedback(feedbackJson: feedbackJson, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(finishBarcodeCountOnScan:)
    func finishBarcodeCountOnScan(command: CDVInvokedUrlCommand) {
        barcodeCountModule.finishOnScan(enabled: true)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(startBarcodeCountScanningPhase:)
    func startBarcodeCountScanningPhase(command: CDVInvokedUrlCommand) {
        barcodeCountModule.startScanningPhase()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(endBarcodeCountScanningPhase:)
    func endBarcodeCountScanningPhase(command: CDVInvokedUrlCommand) {
        barcodeCountModule.endScanningPhase()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(setBarcodeCountCaptureList:)
    func setBarcodeCountCaptureList(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let barcodesJson = argsJson["captureListJson"] as? String
        else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeCountModule.setBarcodeCountCaptureList(barcodesJson: barcodesJson)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(getBarcodeCountSpatialMap:)
    func getBarcodeCountSpatialMap(command: CDVInvokedUrlCommand) {
        barcodeCountModule.submitSpatialMap(result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(getBarcodeCountSpatialMapWithHints:)
    func getBarcodeCountSpatialMapWithHints(command: CDVInvokedUrlCommand) {
        if let hints = command.defaultArgumentAsDictionary,
           let expectedNumberOfRows = hints["expectedNumberOfRows"] as? Int,
           let expectedNumberOfColumns = hints["expectedNumberOfColumns"] as? Int {

            barcodeCountModule.submitSpatialMap(
                expectedNumberOfRows: expectedNumberOfRows,
                expectedNumberOfColumns: expectedNumberOfColumns,
                result: CordovaResult(commandDelegate, command.callbackId)
            )
        } else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
        }
    }

    @objc(resetBarcodeCountSession:)
    func resetBarcodeCountSession(command: CDVInvokedUrlCommand) {
        barcodeCountModule.resetBarcodeCountSession(frameSequenceId: nil)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(updateBarcodeCountView:)
    func updateBarcodeCountView(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewJson = argsJson["viewJson"] as? String
        else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeCountModule.updateBarcodeCountView(viewJson: viewJson, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(createBarcodeCountView:)
    func createBarcodeCountView(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewJson = argsJson["viewJson"] as? String
        else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        dispatchMain {
            self.barcodeCountViewConstraints.captureView?.removeFromSuperview()
            self.barcodeCountViewConstraints.captureView = nil

            self.barcodeCountModule.addViewFromJson(
                parent: self.viewController.view,
                viewJson: viewJson,
                result: CordovaResult(self.commandDelegate, command.callbackId)
            )

            if let barcodeCountView = self.barcodeCountModule.barcodeCountView {
                barcodeCountView.isHidden = true
                barcodeCountView.translatesAutoresizingMaskIntoConstraints = false
                self.barcodeCountViewConstraints.captureView = barcodeCountView
            }
        }
    }

    @objc(removeBarcodeCountView:)
    func rmeoveBarcodeCountView(command: CDVInvokedUrlCommand) {
        dispatchMain {
            self.barcodeCountViewConstraints.captureView = nil
            self.barcodeCountModule.removeBarcodeCountView(
                result: CordovaResult(self.commandDelegate, command.callbackId)
            )
        }
    }

    @objc(registerBarcodeCountViewUiListener:)
    func registerBarcodeCountViewUiListener(command: CDVInvokedUrlCommand) {
        emitter.registerCallback(with: FrameworksBarcodeCountViewUIListener.Constants.exitButtonTapped, call: command)
        emitter.registerCallback(with: FrameworksBarcodeCountViewUIListener.Constants.listButtonTapped, call: command)
        emitter.registerCallback(with: FrameworksBarcodeCountViewUIListener.Constants.singleScanButtonTapped, call: command)

        barcodeCountModule.addBarcodeCountViewUiListener(result: CordovaResultKeepCallback(commandDelegate, command.callbackId))
    }

    @objc(unregisterBarcodeCountViewUiListener:)
    func unregisterBarcodeCountViewUiListener(command: CDVInvokedUrlCommand) {
        emitter.unregisterCallback(with: FrameworksBarcodeCountViewUIListener.Constants.exitButtonTapped)
        emitter.unregisterCallback(with: FrameworksBarcodeCountViewUIListener.Constants.listButtonTapped)
        emitter.unregisterCallback(with: FrameworksBarcodeCountViewUIListener.Constants.singleScanButtonTapped)

        barcodeCountModule.removeBarcodeCountViewUiListener(result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(registerBarcodeCountViewListener:)
    func registerBarcodeCountViewListener(command: CDVInvokedUrlCommand) {
        emitter.registerCallback(with: BarcodeCountViewListenerEvent.brushForRecognizedBarcode.rawValue, call: command)
        emitter.registerCallback(with: BarcodeCountViewListenerEvent.brushForRecognizedBarcodeNotInList.rawValue, call: command)
        emitter.registerCallback(with: BarcodeCountViewListenerEvent.brushForAcceptedBarcode.rawValue, call: command)
        emitter.registerCallback(with: BarcodeCountViewListenerEvent.brushForRejectedBarcode.rawValue, call: command)

        emitter.registerCallback(with: BarcodeCountViewListenerEvent.didTapFilteredBarcode.rawValue, call: command)
        emitter.registerCallback(with: BarcodeCountViewListenerEvent.didTapRecognizedBarcode.rawValue, call: command)
        emitter.registerCallback(with: BarcodeCountViewListenerEvent.didTapRecognizedBarcodeNotInList.rawValue, call: command)
        emitter.registerCallback(with: BarcodeCountViewListenerEvent.didTapAcceptedBarcode.rawValue, call: command)
        emitter.registerCallback(with: BarcodeCountViewListenerEvent.didTapRejectedBarcode.rawValue, call: command)

        barcodeCountModule.addBarcodeCountViewListener(result: CordovaResultKeepCallback(commandDelegate, command.callbackId))
    }

    @objc(unregisterBarcodeCountViewListener:)
    func unregisterBarcodeCountViewListener(command: CDVInvokedUrlCommand) {
        emitter.unregisterCallback(with: BarcodeCountViewListenerEvent.brushForRecognizedBarcode.rawValue)
        emitter.unregisterCallback(with: BarcodeCountViewListenerEvent.brushForRecognizedBarcodeNotInList.rawValue)
        emitter.unregisterCallback(with: BarcodeCountViewListenerEvent.brushForAcceptedBarcode.rawValue)
        emitter.unregisterCallback(with: BarcodeCountViewListenerEvent.brushForRejectedBarcode.rawValue)

        emitter.unregisterCallback(with: BarcodeCountViewListenerEvent.didTapFilteredBarcode.rawValue)
        emitter.unregisterCallback(with: BarcodeCountViewListenerEvent.didTapRecognizedBarcode.rawValue)
        emitter.unregisterCallback(with: BarcodeCountViewListenerEvent.didTapRecognizedBarcodeNotInList.rawValue)
        emitter.unregisterCallback(with: BarcodeCountViewListenerEvent.didTapAcceptedBarcode.rawValue)
        emitter.unregisterCallback(with: BarcodeCountViewListenerEvent.didTapRejectedBarcode.rawValue)

        barcodeCountModule.removeBarcodeCountViewListener(result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(clearBarcodeCountViewHighlights:)
    func clearBarcodeCountViewHighlights(command: CDVInvokedUrlCommand) {
        barcodeCountModule.clearHighlights()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(setBarcodeCountViewPositionAndSize:)
    func setBarcodeCountViewPositionAndSize(command: CDVInvokedUrlCommand) {
        guard let viewPositionAndSizeJSON = try? ViewPositionAndSizeJSON.fromCommand(command) else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        barcodeCountViewConstraints.updatePositionAndSize(fromJSON: viewPositionAndSizeJSON)

        if viewPositionAndSizeJSON.shouldBeUnderWebView {
            // Make the WebView transparent, so we can see views behind
            webView.isOpaque = false
            webView.backgroundColor = .clear
            webView.scrollView.backgroundColor = .clear
        }

        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(showBarcodeCountView:)
    func showBarcodeCountView(command: CDVInvokedUrlCommand) {
        barcodeCountViewConstraints.captureView?.isHidden = false
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(hideBarcodeCountView:)
    func hideBarcodeCountView(command: CDVInvokedUrlCommand) {
        barcodeCountViewConstraints.captureView?.isHidden = true
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(finishBarcodeCountBrushForRecognizedBarcode:)
    func finishBarcodeCountBrushForRecognizedBarcode(command: CDVInvokedUrlCommand) {
        if let hints = command.defaultArgumentAsDictionary,
           let brushJson = hints["brushJson"] as? String,
           let trackedBarcodeId = hints["trackedBarcodeId"] as? Int {

            let brush = Brush(jsonString: brushJson)

            barcodeCountModule.finishBrushForRecognizedBarcodeEvent(brush: brush, trackedBarcodeId: trackedBarcodeId, result: CordovaResult(commandDelegate, command.callbackId))
        } else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
        }
    }

    @objc(finishBarcodeCountBrushForRecognizedBarcodeNotInList:)
    func finishBarcodeCountBrushForRecognizedBarcodeNotInList(command: CDVInvokedUrlCommand) {
        if let hints = command.defaultArgumentAsDictionary,
           let brushJson = hints["brushJson"] as? String,
           let trackedBarcodeId = hints["trackedBarcodeId"] as? Int {

            let brush = Brush(jsonString: brushJson)

            barcodeCountModule.finishBrushForRecognizedBarcodeNotInListEvent(brush: brush, trackedBarcodeId: trackedBarcodeId, result: CordovaResult(commandDelegate, command.callbackId))
        } else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
        }
    }

    @objc(finishBarcodeCountBrushForAcceptedBarcode:)
    func finishBarcodeCountBrushForAcceptedBarcode(command: CDVInvokedUrlCommand) {
        if let hints = command.defaultArgumentAsDictionary,
           let brushJson = hints["brushJson"] as? String,
           let trackedBarcodeId = hints["trackedBarcodeId"] as? Int {

            let brush = Brush(jsonString: brushJson)

            barcodeCountModule.finishBrushForAcceptedBarcodeEvent(brush: brush, trackedBarcodeId: trackedBarcodeId)

            commandDelegate.send(.success, callbackId: command.callbackId)
        } else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
        }
    }

    @objc(finishBarcodeCountBrushForRejectedBarcode:)
    func finishBarcodeCountBrushForRejectedBarcode(command: CDVInvokedUrlCommand) {
        if let hints = command.defaultArgumentAsDictionary,
           let brushJson = hints["brushJson"] as? String,
           let trackedBarcodeId = hints["trackedBarcodeId"] as? Int {

            let brush = Brush(jsonString: brushJson)

            barcodeCountModule.finishBrushForRejectedBarcodeEvent(brush: brush, trackedBarcodeId: trackedBarcodeId)

            commandDelegate.send(.success, callbackId: command.callbackId)
        } else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
        }
    }

    // Barcode Geenrator - Start

    @objc(createBarcodeGenerator:)
    func createBarcodeGenerator(command: CDVInvokedUrlCommand) {
        if let barcodeGeneratorJson = command.defaultArgumentAsString {
            barcodeGeneratorModule.createGenerator(generatorJson: barcodeGeneratorJson, result: CordovaResult(commandDelegate, command.callbackId))
        } else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
        }
    }

    @objc(generateFromBase64EncodedData:)
    func generateFromBase64EncodedData(command: CDVInvokedUrlCommand) {
        if let dataJson = command.defaultArgumentAsDictionary,
             let generatorId = dataJson["generatorId"] as? String,
             let data = dataJson["data"] as? String,
             let imageWidth = dataJson["imageWidth"] as? Int{

            barcodeGeneratorModule.generateFromBase64EncodedData(
                generatorId: generatorId,
                data: data,
                imageWidth: imageWidth,
                result: CordovaResult(commandDelegate, command.callbackId)
            )
        } else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
        }
    }

    @objc(generateFromString:)
    func generateFromString(command: CDVInvokedUrlCommand) {
        if let dataJson = command.defaultArgumentAsDictionary,
             let generatorId = dataJson["generatorId"] as? String,
             let text = dataJson["text"] as? String,
             let imageWidth = dataJson["imageWidth"] as? Int{

            barcodeGeneratorModule.generate(
                generatorId: generatorId,
                text: text,
                imageWidth: imageWidth,
                result: CordovaResult(commandDelegate, command.callbackId)
            )
        } else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
        }
    }

    @objc(disposeBarcodeGenerator:)
    func disposeBarcodeGenerator(command: CDVInvokedUrlCommand) {
        if let generatorId = command.defaultArgumentAsString {
            barcodeGeneratorModule.disposeGenerator(generatorId: generatorId, result: CordovaResult(commandDelegate, command.callbackId))
        } else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
        }
    }

    // Barcode Geenrator - End
}
