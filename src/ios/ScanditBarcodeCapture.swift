import ScanditBarcodeCapture
import ScanditFrameworksBarcode
import ScanditFrameworksCore
import WebKit

private struct NoOpCordovaResult: FrameworksResult {
    func success(result _: Any?) {}

    func reject(code _: String, message _: String?, details _: Any?) {}

    func reject(error _: Error) {}
}

private extension FrameworksResult where Self == NoOpCordovaResult {
    static func noOp() -> Self {
        .init()
    }
}

private extension CordovaEventEmitter {
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
    var barcodeCountViewConstraints: NativeViewConstraints!

    override func pluginInitialize() {
        super.pluginInitialize()
        barcodeModule = BarcodeModule()
        emitter = CordovaEventEmitter(commandDelegate: commandDelegate)

        barcodeCaptureModule = BarcodeCaptureModule(emitter: emitter)
        barcodeBatchModule = BarcodeBatchModule(emitter: emitter)
        barcodeSelectionModule = BarcodeSelectionModule(
            barcodeSelectionListener: FrameworksBarcodeSelectionListener(emitter: emitter),
            aimedBrushProvider: FrameworksBarcodeSelectionAimedBrushProvider(emitter: emitter, queue: brushProviderQueue),
            trackedBrushProvider: FrameworksBarcodeSelectionTrackedBrushProvider(emitter: emitter, queue: brushProviderQueue)
        )
        barcodeFindModule = BarcodeFindModule(emitter: emitter)
        barcodePickModule = BarcodePickModule(emitter: emitter)
        sparkScanModule = SparkScanModule(emitter: emitter)

        barcodeCountModule = BarcodeCountModule(emitter: emitter)

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
        barcodeCountViewConstraints = NativeViewConstraints(relativeTo: webView as! WKWebView)
    }

    override func dispose() {
        barcodeModule.didStop()
        barcodeCaptureModule.didStop()
        barcodeBatchModule.didStop()
        barcodeSelectionModule.didStop()
        barcodeSelectionModule.removeListener()
        barcodeFindModule.didStop()
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
        guard let json = command.defaultArgumentAsDictionary, let modeId = json["modeId"] as? Int else {
            commandDelegate.send(.failure(with: "Invalid arguments. Please provide a modeId in the form of an int."), callbackId: command.callbackId)
            return
        }
        emitter.registerCallback(with: .barcodeScanned, call: command)
        emitter.registerCallback(with: FrameworksBarcodeCaptureEvent.sessionUpdated, call: command)
        barcodeCaptureModule.addListener(modeId: modeId)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(unregisterBarcodeCaptureListenerForEvents:)
    func unregisterBarcodeCaptureListenerForEvents(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary, let modeId = json["modeId"] as? Int else {
            commandDelegate.send(.failure(with: "Invalid arguments. Please provide a modeId in the form of an int."), callbackId: command.callbackId)
            return
        }
        emitter.unregisterCallback(with: FrameworksBarcodeCaptureEvent.barcodeScanned.rawValue)
        emitter.unregisterCallback(with: FrameworksBarcodeCaptureEvent.sessionUpdated.rawValue)
        barcodeCaptureModule.removeListener(modeId: modeId)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(registerBarcodeBatchListenerForEvents:)
    func registerBarcodeBatchListenerForEvents(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary, let modeId = json["modeId"] as? Int else {
            commandDelegate.send(.failure(with: "Invalid arguments. Please provide a modeId in the form of a int."), callbackId: command.callbackId)
            return
        }
        emitter.registerModeSpecificCallback(modeId, with: FrameworksBarcodeBatchEvent.sessionUpdated.rawValue, call: command)
        barcodeBatchModule.addBarcodeBatchListener(modeId)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(unregisterBarcodeBatchListenerForEvents:)
    func unregisterBarcodeBatchListenerForEvents(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary, let modeId = json["modeId"] as? Int else {
            commandDelegate.send(.failure(with: "Invalid arguments. Please provide a modeId in the form of a int."), callbackId: command.callbackId)
            return
        }
        emitter.unregisterModeSpecificCallback(modeId, with: FrameworksBarcodeBatchEvent.sessionUpdated.rawValue)
        barcodeBatchModule.removeBarcodeBatchListener(modeId)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(registerListenerForBasicOverlayEvents:)
    func registerListenerForBasicOverlayEvents(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary, let dataCaptureViewId = json["dataCaptureViewId"] as? Int else {
            commandDelegate.send(.failure(with: "Invalid arguments. Please provide a dataCaptureViewId in the form of a int."), callbackId: command.callbackId)
            return
        }
        emitter.registerCallback(with: FrameworksBarcodeBatchEvent.brushForTrackedBarcode, call: command)
        emitter.registerCallback(with: FrameworksBarcodeBatchEvent.didTapOnTrackedBarcode, call: command)
        barcodeBatchModule.addBasicOverlayListener(dataCaptureViewId)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(unregisterListenerForBasicOverlayEvents:)
    func unregisterListenerForBasicOverlayEvents(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary, let dataCaptureViewId = json["dataCaptureViewId"] as? Int else {
            commandDelegate.send(.failure(with: "Invalid arguments. Please provide a dataCaptureViewId in the form of a int."), callbackId: command.callbackId)
            return
        }
        emitter.unregisterCallback(with: FrameworksBarcodeBatchEvent.brushForTrackedBarcode.rawValue)
        emitter.unregisterCallback(with: FrameworksBarcodeBatchEvent.didTapOnTrackedBarcode.rawValue)
        barcodeBatchModule.removeBasicOverlayListener(dataCaptureViewId)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(registerListenerForAdvancedOverlayEvents:)
    func registerListenerForAdvancedOverlayEvents(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary, let dataCaptureViewId = json["dataCaptureViewId"] as? Int else {
            commandDelegate.send(.failure(with: "Invalid arguments. Please provide a dataCaptureViewId in the form of a int."), callbackId: command.callbackId)
            return
        }
        emitter.registerCallback(with: .anchorForTrackedBarcode, call: command)
        emitter.registerCallback(with: .offsetForTrackedBarcode, call: command)
        emitter.registerCallback(with: .widgetForTrackedBarcode, call: command)
        emitter.registerCallback(with: .didTapViewForTrackedBarcode, call: command)
        barcodeBatchModule.addAdvancedOverlayListener(dataCaptureViewId)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(unregisterListenerForAdvancedOverlayEvents:)
    func unregisterListenerForAdvancedOverlayEvents(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary, let dataCaptureViewId = json["dataCaptureViewId"] as? Int else {
            commandDelegate.send(.failure(with: "Invalid arguments. Please provide a dataCaptureViewId in the form of a int."), callbackId: command.callbackId)
            return
        }
        emitter.unregisterCallback(with: FrameworksBarcodeBatchEvent.anchorForTrackedBarcode.rawValue)
        emitter.unregisterCallback(with: FrameworksBarcodeBatchEvent.offsetForTrackedBarcode.rawValue)
        emitter.unregisterCallback(with: FrameworksBarcodeBatchEvent.widgetForTrackedBarcode.rawValue)
        emitter.unregisterCallback(with: FrameworksBarcodeBatchEvent.didTapViewForTrackedBarcode.rawValue)
        barcodeBatchModule.removeAdvancedOverlayListener(dataCaptureViewId)
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
        guard let json = command.defaultArgumentAsDictionary, let modeId = json["modeId"] as? Int else {
            commandDelegate.send(.failure(with: "Invalid arguments. Please provide a modeId in the form of an int."), callbackId: command.callbackId)
            return
        }
        let enabled = json["enabled"] as? Bool ?? false
        barcodeCaptureModule.finishDidUpdateSession(modeId: modeId, enabled: enabled)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(finishBarcodeCaptureDidScan:)
    func finishBarcodeCaptureDidScan(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary, let modeId = json["modeId"] as? Int else {
            commandDelegate.send(.failure(with: "Invalid arguments. Please provide a modeId in the form of an int."), callbackId: command.callbackId)
            return
        }
        let enabled = json["enabled"] as? Bool ?? false
        barcodeCaptureModule.finishDidScan(modeId: modeId, enabled: enabled)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(resetBarcodeCaptureSession:)
    func resetBarcodeCaptureSession(command: CDVInvokedUrlCommand) {
        barcodeCaptureModule.resetSession()
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(setBarcodeCaptureModeEnabledState:)
    func setBarcodeCaptureModeEnabledState(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary, let modeId = json["modeId"] as? Int else {
            commandDelegate.send(.failure(with: "Invalid arguments. Please provide a modeId in the form of an int."), callbackId: command.callbackId)
            return
        }
        let enabled = json["enabled"] as? Bool ?? false
        barcodeCaptureModule.setModeEnabled(modeId: modeId, enabled: enabled)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    // MARK: - Barcode Batch

    @objc(finishBarcodeBatchDidUpdateSessionCallback:)
    func finishBarcodeBatchDidUpdateSessionCallback(command: CDVInvokedUrlCommand) {
        var enabled = false
        guard let json = command.defaultArgumentAsDictionary, let modeId = json["modeId"] as? Int else {
            commandDelegate.send(.failure(with: "Invalid arguments. Please provide a modeId in the form of a string."), callbackId: command.callbackId)
            return
        }

        if let value = json["enabled"] as? Bool {
            enabled = value
        }
        barcodeBatchModule.finishDidUpdateSession(modeId: modeId, enabled: enabled)
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
        guard let json = command.defaultArgumentAsDictionary, let modeId = json["modeId"] as? Int else {
            commandDelegate.send(.failure(with: "Invalid arguments. Please provide a modeId in the form of a int."), callbackId: command.callbackId)
            return
        }
        if let value = json["enabled"] as? Bool {
            enabled = value
        }
        barcodeBatchModule.setModeEnabled(modeId, enabled: enabled)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    // MARK: - Barcode Batch Basic Overlay

    @objc(setBrushForTrackedBarcode:)
    func setBrushForTrackedBarcode(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let dataCaptureViewId = json["dataCaptureViewId"] as? Int,
              let brushJson = json["brushJson"] as? String,
              let trackedBarcodeId = json["trackedBarcodeIdentifier"] as? Int else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeBatchModule.setBasicOverlayBrush(dataCaptureViewId, brushJson: brushJson, trackedBarcodeId: trackedBarcodeId)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(clearTrackedBarcodeBrushes:)
    func clearTrackedBarcodeBrushes(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary, let dataCaptureViewId = json["dataCaptureViewId"] as? Int else {
            commandDelegate.send(.failure(with: "Invalid arguments. Please provide a dataCaptureViewId in the form of a int."), callbackId: command.callbackId)
            return
        }
        barcodeBatchModule.clearBasicOverlayTrackedBarcodeBrushes(dataCaptureViewId)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    // MARK: Barcode Batch Advanced Overlay

    @objc(setViewForTrackedBarcode:)
    func setViewForTrackedBarcode(command: CDVInvokedUrlCommand) {
        guard let json = try? ViewAndTrackedBarcodeJSON.fromCommand(command) else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        guard let dataCaptureViewId = json.dataCaptureViewId else {
            commandDelegate.send(.failure(with: "Invalid arguments. Please provide a dataCaptureViewId in the form of a int."), callbackId: command.callbackId)
            return
        }

        guard let id = json.trackedBarcodeIdentifier,
              let trackedBarcode = barcodeBatchModule.trackedBarcode(by: id) else {
            commandDelegate.send(.failure(with: .trackedBarcodeNotFound), callbackId: command.callbackId)
            return
        }

        var view: TrackedBarcodeView?
        dispatchMainSync {
            if let viewJson = json.viewJson {
                view = TrackedBarcodeView(json: viewJson)
                view?.didTap = { [weak self] in
                    guard let self = self else { return }
                    self.emitter.emit(name: FrameworksBarcodeBatchEvent.didTapViewForTrackedBarcode.rawValue,
                                      payload: ["trackedBarcode": trackedBarcode.jsonString])
                }
            }
        }
        guard let view = view else { return }
        barcodeBatchModule.setViewForTrackedBarcode(view: view, trackedBarcodeId: id, sessionFrameSequenceId: nil, dataCaptureViewId: dataCaptureViewId)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(updateSizeOfTrackedBarcodeView:)
    func updateSizeOfTrackedBarcodeView(command: CDVInvokedUrlCommand) {
        // https://scandit.atlassian.net/browse/SDC-26621
    }

    @objc(setAnchorForTrackedBarcode:)
    func setAnchorForTrackedBarcode(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let dataCaptureViewId = json["dataCaptureViewId"] as? Int,
              let anchorJson = json["anchor"] as? String,
              let trackedBarcodeId = json["trackedBarcodeIdentifier"] as? Int else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeBatchModule.setAnchorForTrackedBarcode(anchorJson: anchorJson, trackedBarcodeId: trackedBarcodeId, dataCaptureViewId: dataCaptureViewId)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(setOffsetForTrackedBarcode:)
    func setOffsetForTrackedBarcode(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let dataCaptureViewId = json["dataCaptureViewId"] as? Int,
              let offsetJson = json["offsetJson"] as? String,
              let trackedBarcodeId = json["trackedBarcodeIdentifier"] as? Int else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeBatchModule.setOffsetForTrackedBarcode(offsetJson: offsetJson, trackedBarcodeId: trackedBarcodeId, dataCaptureViewId: dataCaptureViewId)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(clearTrackedBarcodeViews:)
    func clearTrackedBarcodeViews(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary, let dataCaptureViewId = json["dataCaptureViewId"] as? Int else {
            commandDelegate.send(.failure(with: "Invalid arguments. Please provide a dataCaptureViewId in the form of a int."), callbackId: command.callbackId)
            return
        }
        barcodeBatchModule.clearAdvancedOverlayTrackedBarcodeViews(dataCaptureViewId)
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
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewJson = argsJson["json"] as? String else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
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
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        guard let viewJson = argsJson["barcodeFindViewJson"] as? String else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        barcodeFindModule.updateBarcodeFindView(viewId, viewJson: viewJson,
                                                result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(removeFindView:)
    func removeFindView(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        dispatchMain {
            self.barcodeFindViewHandler.barcodeFindView = nil
            self.barcodeFindModule.removeBarcodeFindView(viewId, result: CordovaResult(self.commandDelegate, command.callbackId))
        }
    }

    @objc(updateFindMode:)
    func updateFindMode(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        guard let modeJson = argsJson["barcodeFindJson"] as? String else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        barcodeFindModule.updateBarcodeFindMode(viewId, modeJson: modeJson,
                                                result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(registerBarcodeFindListener:)
    func registerBarcodeFindListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        emitter.registerViewSpecificCallback(viewId, with: FrameworksBarcodeFindEvent.didPauseSearch.rawValue, call: command)
        emitter.registerViewSpecificCallback(viewId, with: FrameworksBarcodeFindEvent.didStartSearch.rawValue, call: command)
        emitter.registerViewSpecificCallback(viewId, with: FrameworksBarcodeFindEvent.didStopSearch.rawValue, call: command)
        emitter.registerViewSpecificCallback(viewId, with: FrameworksBarcodeFindEvent.didUpdateSession.rawValue, call: command)
        barcodeFindModule.addBarcodeFindListener(viewId, result: CordovaResultKeepCallback(commandDelegate, command.callbackId))
    }

    @objc(unregisterBarcodeFindListener:)
    func unregisterBarcodeFindListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        emitter.unregisterViewSpecificCallback(viewId, with: FrameworksBarcodeFindEvent.didPauseSearch.rawValue)
        emitter.unregisterViewSpecificCallback(viewId, with: FrameworksBarcodeFindEvent.didStartSearch.rawValue)
        emitter.unregisterViewSpecificCallback(viewId, with: FrameworksBarcodeFindEvent.didStopSearch.rawValue)
        emitter.unregisterViewSpecificCallback(viewId, with: FrameworksBarcodeFindEvent.didUpdateSession.rawValue)
        barcodeFindModule.removeBarcodeFindListener(viewId, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(registerBarcodeFindViewListener:)
    func registerBarcodeFindViewListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        emitter.registerViewSpecificCallback(viewId, with: FrameworksBarcodeFindEvent.finishButtonTapped.rawValue, call: command)
        barcodeFindModule.addBarcodeFindViewListener(viewId, result: CordovaResultKeepCallback(commandDelegate, command.callbackId))
    }

    @objc(unregisterBarcodeFindViewListener:)
    func unregisterBarcodeFindViewListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        emitter.unregisterViewSpecificCallback(viewId, with: FrameworksBarcodeFindEvent.finishButtonTapped.rawValue)
        barcodeFindModule.removeBarcodeFindViewListener(viewId, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(barcodeFindViewOnPause:)
    func barcodeFindViewOnPause(command: CDVInvokedUrlCommand) {
        // No iOS implementation
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(barcodeFindViewOnResume:)
    func barcodeFindViewOnResume(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        barcodeFindModule.prepareSearching(viewId, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(barcodeFindSetItemList:)
    func barcodeFindSetItemList(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        guard let json = argsJson["itemsJson"] as? String else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        barcodeFindModule.setItemList(viewId, barcodeFindItemsJson: json,
                                      result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(barcodeFindViewStopSearching:)
    func barcodeFindViewStopSearching(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        barcodeFindModule.stopSearching(viewId, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(barcodeFindViewStartSearching:)
    func barcodeFindViewStartSearching(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        barcodeFindModule.startSearching(viewId, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(barcodeFindViewPauseSearching:)
    func barcodeFindViewPauseSearching(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        barcodeFindModule.pauseSearching(viewId, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(barcodeFindModeStart:)
    func barcodeFindModeStart(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        barcodeFindModule.startMode(viewId, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(barcodeFindModePause:)
    func barcodeFindModePause(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        barcodeFindModule.pauseMode(viewId, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(barcodeFindModeStop:)
    func barcodeFindModeStop(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        barcodeFindModule.stopMode(viewId, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(setBarcodeTransformer:)
    func setBarcodeTransformer(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        emitter.registerViewSpecificCallback(viewId, with: FrameworksBarcodeFindEvent.transformBarcodeData.rawValue, call: command)
        barcodeFindModule.setBarcodeFindTransformer(viewId, result: CordovaResultKeepCallback(commandDelegate, command.callbackId))
    }

    @objc(unsetBarcodeTransformer:)
    func unsetBarcodeTransformer(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        emitter.unregisterViewSpecificCallback(viewId, with: FrameworksBarcodeFindEvent.transformBarcodeData.rawValue)
        barcodeFindModule.setBarcodeFindTransformer(viewId, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(submitBarcodeFindTransformerResult:)
    func submitBarcodeFindTransformerResult(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        guard let transformedBarcode = argsJson["transformedBarcode"] as? String else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        barcodeFindModule.submitBarcodeFindTransformerResult(
            viewId,
            transformedData: transformedBarcode,
            result: CordovaResult(commandDelegate, command.callbackId)
        )
    }

    @objc(updateBarcodeFindFeedback:)
    func updateBarcodeFindFeedback(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        guard let feedbackJson = argsJson["feedbackJson"] as? String else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        barcodeFindModule.updateFeedback(
            viewId,
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
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        var enabled = false
        if let value = argsJson["enabled"] as? Bool {
            enabled = value
        }
        barcodeFindModule.setModeEnabled(viewId, enabled: enabled)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    // MARK: Barcode Pick

    @objc(registerOnProductIdentifierForItemsListener:)
    func registerOnProductIdentifierForItemsListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        emitter.registerViewSpecificCallback(viewId, with: BarcodePickEvent.onProductIdentifierForItems.rawValue, call: command)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(unregisterOnProductIdentifierForItemsListener:)
    func unregisterOnProductIdentifierForItemsListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        emitter.unregisterViewSpecificCallback(viewId, with: BarcodePickEvent.onProductIdentifierForItems.rawValue)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(createPickView:)
    func createPickView(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewJson = argsJson["json"] as? String
        else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        dispatchMain {
            self.barcodePickModule.addViewToContainer(
                container: self.barcodePickViewHandler.webView,
                jsonString: viewJson,
                result: CordovaResult(self.commandDelegate, command.callbackId)
            )
            self.barcodePickViewHandler.barcodePickView = self.barcodePickModule.getTopMostView()
        }
    }

    @objc(removePickView:)
    func removePickView(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewId = argsJson["viewId"] as? Int
        else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        dispatchMain {
            self.barcodePickViewHandler.barcodePickView = nil
            self.barcodePickModule.removeView(
                viewId: viewId,
                result: CordovaResult(self.commandDelegate, command.callbackId)
            )
        }
    }

    @objc(updatePickView:)
    func updatePickView(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewId = argsJson["viewId"] as? Int,
              let viewJson = argsJson["json"] as? String
        else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        barcodePickModule.updateView(viewId: viewId,
                                     viewJson: viewJson,
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

    @objc(addPickActionListener:)
    func addPickActionListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        emitter.registerViewSpecificCallback(viewId, with: BarcodePickEvent.pick.rawValue, call: command)
        emitter.registerViewSpecificCallback(viewId, with: BarcodePickEvent.unpick.rawValue, call: command)
        barcodePickModule.addActionListener(viewId: viewId, result: CordovaResultKeepCallback(commandDelegate, command.callbackId))
    }

    @objc(removePickActionListener:)
    func removePickActionListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodePickModule.removeActionListener(viewId: viewId, result: CordovaResult(commandDelegate, command.callbackId))
        emitter.unregisterViewSpecificCallback(viewId, with: BarcodePickEvent.pick.rawValue)
        emitter.unregisterViewSpecificCallback(viewId, with: BarcodePickEvent.unpick.rawValue)
    }

    @objc(addBarcodePickScanningListener:)
    func addBarcodePickScanningListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        emitter.registerViewSpecificCallback(viewId, with: BarcodePickScanningEvent.didCompleteScanningSession.rawValue, call: command)
        emitter.registerViewSpecificCallback(viewId, with: BarcodePickScanningEvent.didUpdateScanningSession.rawValue, call: command)
        barcodePickModule.addScanningListener(viewId: viewId, result: CordovaResultKeepCallback(commandDelegate, command.callbackId))
    }

    @objc(removeBarcodePickScanningListener:)
    func removeBarcodePickScanningListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodePickModule.removeScanningListener(viewId: viewId, result: CordovaResult(commandDelegate, command.callbackId))
        emitter.unregisterViewSpecificCallback(viewId, with: BarcodePickScanningEvent.didCompleteScanningSession.rawValue)
        emitter.unregisterViewSpecificCallback(viewId, with: BarcodePickScanningEvent.didUpdateScanningSession.rawValue)
    }

    @objc(addPickViewListener:)
    func addPickViewListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        emitter.registerViewSpecificCallback(viewId, with: BarcodePickViewListenerEvents.didStartScanning.rawValue, call: command)
        emitter.registerViewSpecificCallback(viewId, with: BarcodePickViewListenerEvents.didFreezeScanning.rawValue, call: command)
        emitter.registerViewSpecificCallback(viewId, with: BarcodePickViewListenerEvents.didPauseScanning.rawValue, call: command)
        emitter.registerViewSpecificCallback(viewId, with: BarcodePickViewListenerEvents.didStopScanning.rawValue, call: command)
        barcodePickModule.addViewListener(viewId: viewId, result: CordovaResultKeepCallback(commandDelegate, command.callbackId))
    }

    @objc(removePickViewListener:)
    func removePickViewListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodePickModule.removeViewListener(viewId: viewId, result: CordovaResult(commandDelegate, command.callbackId))
        emitter.unregisterViewSpecificCallback(viewId, with: BarcodePickViewListenerEvents.didStartScanning.rawValue)
        emitter.unregisterViewSpecificCallback(viewId, with: BarcodePickViewListenerEvents.didFreezeScanning.rawValue)
        emitter.unregisterViewSpecificCallback(viewId, with: BarcodePickViewListenerEvents.didPauseScanning.rawValue)
        emitter.unregisterViewSpecificCallback(viewId, with: BarcodePickViewListenerEvents.didStopScanning.rawValue)
    }

    @objc(registerBarcodePickViewUiListener:)
    func registerBarcodePickViewUiListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        emitter.registerViewSpecificCallback(viewId, with: BarcodePickViewUiListenerEvents.didTapFinishButton.rawValue, call: command)
        barcodePickModule.addViewUiListener(viewId: viewId, result: CordovaResultKeepCallback(commandDelegate, command.callbackId))
    }

    @objc(unregisterBarcodePickViewUiListener:)
    func unregisterBarcodePickViewUiListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodePickModule.removeViewUiListener(viewId: viewId, result: CordovaResult(commandDelegate, command.callbackId))
        emitter.unregisterViewSpecificCallback(viewId, with: BarcodePickViewUiListenerEvents.didTapFinishButton.rawValue)
    }

    @objc(finishOnProductIdentifierForItems:)
    func finishOnProductIdentifierForItems(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewId = argsJson["viewId"] as? Int,
              let itemsJson = argsJson["itemsJson"] as? String
        else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodePickModule.finishProductIdentifierForItems(viewId: viewId,
                                                          barcodePickProductProviderCallbackItemsJson: itemsJson,
                                                          result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(pickViewStop:)
    func pickViewStop(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodePickModule.viewStop(viewId: viewId, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(pickViewStart:)
    func pickViewStart(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodePickModule.viewStart(viewId: viewId, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(pickViewFreeze:)
    func pickViewFreeze(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodePickModule.viewFreeze(viewId: viewId, result: CordovaResult(commandDelegate, command.callbackId))
    }


    @objc(pickViewPause:)
    func pickViewPause(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodePickModule.viewPause(viewId: viewId, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(pickViewResume:)
    func pickViewResume(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodePickModule.viewResume(viewId: viewId, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(finishPickAction:)
    func finishPickAction(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        guard let viewId = json["viewId"] as? Int,
              let actionData = json["code"] as? String,
              let result = json["result"] as? Bool else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        barcodePickModule.finishPickAction(viewId: viewId,
                                           data: actionData,
                                           actionResult: result,
                                           result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(addBarcodePickListener:)
    func addBarcodePickListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        emitter.registerViewSpecificCallback(viewId, with: FrameworksSparkScanEvent.didScan.rawValue, call: command)
        barcodePickModule.addBarcodePickListener(viewId: viewId, result: CordovaResultKeepCallback(commandDelegate, command.callbackId))
    }

    @objc(removeBarcodePickListener:)
    func removeBarcodePickListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodePickModule.removeBarcodePickListener(viewId: viewId, result: CordovaResult(commandDelegate, command.callbackId))
        emitter.unregisterViewSpecificCallback(viewId, with: FrameworksSparkScanEvent.didScan.rawValue)
    }

    @objc(updateBarcodeCaptureOverlay:)
    func updateBarcodeCaptureOverlay(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewId = json["viewId"] as? Int,
              let overlayJson = json["overlayJson"] as? String else {
            commandDelegate.send(.failure(with: "Invalid arguments. Please provide viewId as int and overlayJson as a string."), callbackId: command.callbackId)
            return
        }
        barcodeCaptureModule.updateOverlay(viewId, overlayJson: overlayJson, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(updateBarcodeCaptureMode:)
    func updateBarcodeCaptureMode(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary, let modeJson = json["modeJson"] as? String else {
            commandDelegate.send(.failure(with: "Invalid arguments. Please provide modeJson as a string."), callbackId: command.callbackId)
            return
        }
        barcodeCaptureModule.updateModeFromJson(modeJson: modeJson, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(applyBarcodeCaptureModeSettings:)
    func applyBarcodeCaptureModeSettings(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary, let modeId = json["modeId"] as? Int, let modeSettingsJson = json["modeSettingsJson"] as? String else {
            commandDelegate.send(.failure(with: "Invalid arguments. Please provide modeId as int and modeSettingsJson as a string."), callbackId: command.callbackId)
            return
        }
        barcodeCaptureModule.applyModeSettings(modeId: modeId, modeSettingsJson: modeSettingsJson, result: CordovaResult(commandDelegate, command.callbackId))
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
        guard let json = command.defaultArgumentAsDictionary,
              let dataCaptureViewId = json["dataCaptureViewId"] as? Int,
              let overlayJson = json["overlayJson"] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeBatchModule.updateBasicOverlay(dataCaptureViewId, overlayJson: overlayJson,
                                              result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(updateBarcodeBatchAdvancedOverlay:)
    func updateBarcodeBatchAdvancedOverlay(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let dataCaptureViewId = json["dataCaptureViewId"] as? Int,
              let overlayJson = json["overlayJson"] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeBatchModule.updateAdvancedOverlay(dataCaptureViewId, overlayJson: overlayJson,
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
        guard let json = command.defaultArgumentAsDictionary, let modeId = json["modeId"] as? Int else {
            commandDelegate.send(.failure(with: "Invalid arguments. Please provide a modeId in the form of a string."), callbackId: command.callbackId)
            return
        }
        guard let modeSettingsJson = json["modeSettingsJson"] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeBatchModule.applyModeSettings(modeId, modeSettingsJson: modeSettingsJson,
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
        emitter.unregisterCallback(with: FrameworksBarcodeSelectionAimedBrushProviderEvent.brushForBarcode)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(setAimedBarcodeBrushProvider:)
    func setAimedBarcodeBrushProvider(command: CDVInvokedUrlCommand) {
        barcodeSelectionModule.setAimedBrushProvider(result: CordovaResultKeepCallback(commandDelegate, command.callbackId))
        emitter.registerCallback(with: FrameworksBarcodeSelectionAimedBrushProviderEvent.brushForBarcode, call: command)
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
        emitter.unregisterCallback(with: FrameworksBarcodeSelectionTrackedBrushProviderEvent.brushForBarcode)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(setTrackedBarcodeBrushProvider:)
    func setTrackedBarcodeBrushProvider(command: CDVInvokedUrlCommand) {
        barcodeSelectionModule.setTrackedBrushProvider(result: CordovaResultKeepCallback(commandDelegate, command.callbackId))
        emitter.registerCallback(with: FrameworksBarcodeSelectionTrackedBrushProviderEvent.brushForBarcode, call: command)
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

    // MARK: Spark Scan

    @objc(updateSparkScanView:)
    func updateSparkScanView(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewJson = json["viewJson"] as? String
        else {
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
    func createSparkScanView(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewJson = json["viewJson"] as? String
        else {
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
              let viewId = json["viewId"] as? Int
        else {
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
              let viewId = json["viewId"] as? Int
        else {
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
              let viewId = json["viewId"] as? Int
        else {
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
              let viewId = json["viewId"] as? Int
        else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        sparkScanModule.addSparkScanViewUiListener(viewId: viewId)

        emitter.registerViewSpecificCallback(viewId, with: FrameworksSparkScanViewUIEvent.barcodeCountButtonTapped.rawValue, call: command)
        emitter.registerViewSpecificCallback(viewId, with: FrameworksSparkScanViewUIEvent.didChangeViewState.rawValue, call: command)
        emitter.registerViewSpecificCallback(viewId, with: FrameworksSparkScanViewUIEvent.barcodeFindButtonTapped.rawValue, call: command)
        emitter.registerViewSpecificCallback(viewId, with: FrameworksSparkScanViewUIEvent.labelCaptureButtonTapped.rawValue, call: command)

        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(unregisterSparkScanViewListenerEvents:)
    func unregisterSparkScanViewListenerEvents(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewId = json["viewId"] as? Int
        else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        sparkScanModule.removeSparkScanViewUiListener(viewId: viewId)

        emitter.unregisterViewSpecificCallback(viewId, with: FrameworksSparkScanViewUIEvent.barcodeCountButtonTapped.rawValue)
        emitter.unregisterViewSpecificCallback(viewId, with: FrameworksSparkScanViewUIEvent.didChangeViewState.rawValue)
        emitter.unregisterViewSpecificCallback(viewId, with: FrameworksSparkScanViewUIEvent.barcodeFindButtonTapped.rawValue)
        emitter.unregisterViewSpecificCallback(viewId, with: FrameworksSparkScanViewUIEvent.labelCaptureButtonTapped.rawValue)

        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(stopSparkScanViewScanning:)
    func stopSparkScanViewScanning(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewId = json["viewId"] as? Int
        else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        sparkScanModule.stopScanning(viewId: viewId)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(startSparkScanViewScanning:)
    func startSparkScanViewScanning(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewId = json["viewId"] as? Int
        else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        sparkScanModule.startScanning(viewId: viewId, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(pauseSparkScanViewScanning:)
    func pauseSparkScanViewScanning(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewId = json["viewId"] as? Int
        else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        sparkScanModule.pauseScanning(viewId: viewId)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(prepareSparkScanViewScanning:)
    func prepareSparkScanViewScanning(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewId = json["viewId"] as? Int
        else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        sparkScanModule.prepareScanning(viewId: viewId, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(resetSparkScanSession:)
    func resetSparkScanSession(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewId = json["viewId"] as? Int
        else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        sparkScanModule.resetSession(viewId: viewId)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(updateSparkScanMode:)
    func updateSparkScanMode(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let sparkScanJson = json["sparkScanJson"] as? String
        else {
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
              let viewId = json["viewId"] as? Int
        else {
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
              let viewId = json["viewId"] as? Int
        else {
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
              let isEnabled = json["isEnabled"] as? Bool
        else {
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
              let isEnabled = json["isEnabled"] as? Bool
        else {
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
              let viewId = payload["viewId"] as? Int
        else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        sparkScanModule.setModeEnabled(viewId: viewId, enabled: value)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(registerSparkScanFeedbackDelegateForEvents:)
    func registerSparkScanFeedbackDelegateForEvents(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let viewId = json["viewId"] as? Int
        else {
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
              let viewId = json["viewId"] as? Int
        else {
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
              let viewId = json["viewId"] as? Int
        else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        sparkScanModule.submitFeedbackForBarcode(
            viewId: viewId,
            feedbackJson: feedbackJson,
            result: CordovaResult(commandDelegate, command.callbackId)
        )
    }

    @objc(showSparkScanViewToast:)
    func showSparkScanViewToast(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
              let text = json["text"] as? String,
              let viewId = json["viewId"] as? Int
        else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        sparkScanModule.showToast(viewId: viewId, text: text, result: CordovaResult(commandDelegate, command.callbackId))
    }

    // MARK: Barcode Count

    @objc(updateBarcodeCountMode:)
    func updateBarcodeCountMode(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        guard let modeJson = argsJson["barcodeCountJson"] as? String else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        barcodeCountModule.updateBarcodeCount(viewId: viewId, modeJson: modeJson, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(resetBarcodeCount:)
    func resetBarcodeCount(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        barcodeCountModule.resetBarcodeCount(viewId: viewId)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(registerBarcodeCountListener:)
    func registerBarcodeCountListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        emitter.registerViewSpecificCallback(viewId, with: FrameworksBarcodeCountListener.Constants.barcodeScanned, call: command)
        barcodeCountModule.addBarcodeCountListener(viewId: viewId)
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(unregisterBarcodeCountListener:)
    func unregisterBarcodeCountListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        emitter.unregisterViewSpecificCallback(viewId, with: FrameworksBarcodeCountListener.Constants.barcodeScanned)
        barcodeCountModule.removeBarcodeCountListener(viewId: viewId)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(setBarcodeCountModeEnabledState:)
    func setBarcodeCountModeEnabledState(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let enabled = argsJson["isEnabled"] as? Bool,
              let viewId = argsJson["viewId"] as? Int
        else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        barcodeCountModule.setModeEnabled(viewId: viewId, enabled: enabled)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(updateBarcodeCountFeedback:)
    func updateBarcodeCountFeedback(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let feedbackJson = argsJson["feedbackJson"] as? String,
              let viewId = argsJson["viewId"] as? Int
        else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        barcodeCountModule.updateFeedback(viewId: viewId, feedbackJson: feedbackJson, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(finishBarcodeCountOnScan:)
    func finishBarcodeCountOnScan(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        barcodeCountModule.finishOnScan(viewId: viewId, enabled: true)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(startBarcodeCountScanningPhase:)
    func startBarcodeCountScanningPhase(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        barcodeCountModule.startScanningPhase(viewId: viewId)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(endBarcodeCountScanningPhase:)
    func endBarcodeCountScanningPhase(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        barcodeCountModule.endScanningPhase(viewId: viewId)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(setBarcodeCountCaptureList:)
    func setBarcodeCountCaptureList(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let barcodesJson = argsJson["captureListJson"] as? String,
              let viewId = argsJson["viewId"] as? Int
        else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeCountModule.setBarcodeCountCaptureList(viewId: viewId, barcodesJson: barcodesJson)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(getBarcodeCountSpatialMap:)
    func getBarcodeCountSpatialMap(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        barcodeCountModule.submitSpatialMap(viewId: viewId, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(getBarcodeCountSpatialMapWithHints:)
    func getBarcodeCountSpatialMapWithHints(command: CDVInvokedUrlCommand) {
        if let argsJson = command.defaultArgumentAsDictionary,
           let expectedNumberOfRows = argsJson["expectedNumberOfRows"] as? Int,
           let expectedNumberOfColumns = argsJson["expectedNumberOfColumns"] as? Int,
           let viewId = argsJson["viewId"] as? Int
        {
            barcodeCountModule.submitSpatialMap(
                viewId: viewId,
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
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        barcodeCountModule.resetBarcodeCountSession(viewId: viewId, frameSequenceId: nil)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(updateBarcodeCountView:)
    func updateBarcodeCountView(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
              let viewJson = argsJson["viewJson"] as? String,
              let viewId = argsJson["viewId"] as? Int
        else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        barcodeCountModule.updateBarcodeCountView(viewId: viewId, viewJson: viewJson, result: CordovaResult(commandDelegate, command.callbackId))
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

            if let newView = self.barcodeCountModule.getTopMostView() {
                newView.translatesAutoresizingMaskIntoConstraints = false
                self.barcodeCountViewConstraints.captureView = newView
            }
        }
    }

    @objc(removeBarcodeCountView:)
    func removeBarcodeCountView(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        dispatchMain {
            self.barcodeCountViewConstraints.captureView = nil
            self.barcodeCountModule.removeBarcodeCountView(
                viewId: viewId, result: CordovaResult(self.commandDelegate, command.callbackId)
            )
        }

        if let previousView = barcodeCountModule.getTopMostView() {
            previousView.translatesAutoresizingMaskIntoConstraints = false
            barcodeCountViewConstraints.captureView = previousView
        }
    }

    @objc(registerBarcodeCountViewUiListener:)
    func registerBarcodeCountViewUiListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        emitter.registerViewSpecificCallback(viewId, with: FrameworksBarcodeCountViewUIListener.Constants.exitButtonTapped, call: command)
        emitter.registerViewSpecificCallback(viewId, with: FrameworksBarcodeCountViewUIListener.Constants.listButtonTapped, call: command)
        emitter.registerViewSpecificCallback(viewId, with: FrameworksBarcodeCountViewUIListener.Constants.singleScanButtonTapped, call: command)

        barcodeCountModule.addBarcodeCountViewUiListener(viewId: viewId, result: CordovaResultKeepCallback(commandDelegate, command.callbackId))
    }

    @objc(unregisterBarcodeCountViewUiListener:)
    func unregisterBarcodeCountViewUiListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        emitter.unregisterViewSpecificCallback(viewId, with: FrameworksBarcodeCountViewUIListener.Constants.exitButtonTapped)
        emitter.unregisterViewSpecificCallback(viewId, with: FrameworksBarcodeCountViewUIListener.Constants.listButtonTapped)
        emitter.unregisterViewSpecificCallback(viewId, with: FrameworksBarcodeCountViewUIListener.Constants.singleScanButtonTapped)

        barcodeCountModule.removeBarcodeCountViewUiListener(viewId: viewId, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(registerBarcodeCountViewListener:)
    func registerBarcodeCountViewListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        emitter.registerViewSpecificCallback(viewId, with: BarcodeCountViewListenerEvent.brushForRecognizedBarcode.rawValue, call: command)
        emitter.registerViewSpecificCallback(viewId, with: BarcodeCountViewListenerEvent.brushForRecognizedBarcodeNotInList.rawValue, call: command)
        emitter.registerViewSpecificCallback(viewId, with: BarcodeCountViewListenerEvent.brushForAcceptedBarcode.rawValue, call: command)
        emitter.registerViewSpecificCallback(viewId, with: BarcodeCountViewListenerEvent.brushForRejectedBarcode.rawValue, call: command)

        emitter.registerViewSpecificCallback(viewId, with: BarcodeCountViewListenerEvent.didTapFilteredBarcode.rawValue, call: command)
        emitter.registerViewSpecificCallback(viewId, with: BarcodeCountViewListenerEvent.didTapRecognizedBarcode.rawValue, call: command)
        emitter.registerViewSpecificCallback(viewId, with: BarcodeCountViewListenerEvent.didTapRecognizedBarcodeNotInList.rawValue, call: command)
        emitter.registerViewSpecificCallback(viewId, with: BarcodeCountViewListenerEvent.didTapAcceptedBarcode.rawValue, call: command)
        emitter.registerViewSpecificCallback(viewId, with: BarcodeCountViewListenerEvent.didTapRejectedBarcode.rawValue, call: command)

        barcodeCountModule.addBarcodeCountViewListener(viewId: viewId, result: CordovaResultKeepCallback(commandDelegate, command.callbackId))
    }

    @objc(unregisterBarcodeCountViewListener:)
    func unregisterBarcodeCountViewListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        emitter.unregisterViewSpecificCallback(viewId, with: BarcodeCountViewListenerEvent.brushForRecognizedBarcode.rawValue)
        emitter.unregisterViewSpecificCallback(viewId, with: BarcodeCountViewListenerEvent.brushForRecognizedBarcodeNotInList.rawValue)
        emitter.unregisterViewSpecificCallback(viewId, with: BarcodeCountViewListenerEvent.brushForAcceptedBarcode.rawValue)
        emitter.unregisterViewSpecificCallback(viewId, with: BarcodeCountViewListenerEvent.brushForRejectedBarcode.rawValue)

        emitter.unregisterViewSpecificCallback(viewId, with: BarcodeCountViewListenerEvent.didTapFilteredBarcode.rawValue)
        emitter.unregisterViewSpecificCallback(viewId, with: BarcodeCountViewListenerEvent.didTapRecognizedBarcode.rawValue)
        emitter.unregisterViewSpecificCallback(viewId, with: BarcodeCountViewListenerEvent.didTapRecognizedBarcodeNotInList.rawValue)
        emitter.unregisterViewSpecificCallback(viewId, with: BarcodeCountViewListenerEvent.didTapAcceptedBarcode.rawValue)
        emitter.unregisterViewSpecificCallback(viewId, with: BarcodeCountViewListenerEvent.didTapRejectedBarcode.rawValue)

        barcodeCountModule.removeBarcodeCountViewListener(viewId: viewId, result: CordovaResult(commandDelegate, command.callbackId))
    }

    @objc(clearBarcodeCountViewHighlights:)
    func clearBarcodeCountViewHighlights(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }

        barcodeCountModule.clearHighlights(viewId: viewId)
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
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        barcodeCountModule.showView(viewId)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(hideBarcodeCountView:)
    func hideBarcodeCountView(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewId = argsJson["viewId"] as? Int else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        barcodeCountModule.hideView(viewId)
        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(finishBarcodeCountBrushForRecognizedBarcode:)
    func finishBarcodeCountBrushForRecognizedBarcode(command: CDVInvokedUrlCommand) {
        if let argsJson = command.defaultArgumentAsDictionary,
           let brushJson = argsJson["brushJson"] as? String,
           let trackedBarcodeId = argsJson["trackedBarcodeId"] as? Int,
           let viewId = argsJson["viewId"] as? Int
        {
            let brush = Brush(jsonString: brushJson)

            barcodeCountModule.finishBrushForRecognizedBarcodeEvent(viewId: viewId, brush: brush, trackedBarcodeId: trackedBarcodeId, result: CordovaResult(commandDelegate, command.callbackId))
        } else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
        }
    }

    @objc(finishBarcodeCountBrushForRecognizedBarcodeNotInList:)
    func finishBarcodeCountBrushForRecognizedBarcodeNotInList(command: CDVInvokedUrlCommand) {
        if let argsJson = command.defaultArgumentAsDictionary,
           let brushJson = argsJson["brushJson"] as? String,
           let trackedBarcodeId = argsJson["trackedBarcodeId"] as? Int,
           let viewId = argsJson["viewId"] as? Int
        {
            let brush = Brush(jsonString: brushJson)

            barcodeCountModule.finishBrushForRecognizedBarcodeNotInListEvent(viewId: viewId, brush: brush, trackedBarcodeId: trackedBarcodeId, result: CordovaResult(commandDelegate, command.callbackId))
        } else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
        }
    }

    @objc(finishBarcodeCountBrushForAcceptedBarcode:)
    func finishBarcodeCountBrushForAcceptedBarcode(command: CDVInvokedUrlCommand) {
        if let argsJson = command.defaultArgumentAsDictionary,
           let brushJson = argsJson["brushJson"] as? String,
           let trackedBarcodeId = argsJson["trackedBarcodeId"] as? Int,
           let viewId = argsJson["viewId"] as? Int
        {
            let brush = Brush(jsonString: brushJson)

            barcodeCountModule.finishBrushForAcceptedBarcodeEvent(viewId: viewId, brush: brush, trackedBarcodeId: trackedBarcodeId)

            commandDelegate.send(.success, callbackId: command.callbackId)
        } else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
        }
    }

    @objc(finishBarcodeCountBrushForRejectedBarcode:)
    func finishBarcodeCountBrushForRejectedBarcode(command: CDVInvokedUrlCommand) {
        if let argsJson = command.defaultArgumentAsDictionary,
           let brushJson = argsJson["brushJson"] as? String,
           let trackedBarcodeId = argsJson["trackedBarcodeId"] as? Int,
           let viewId = argsJson["viewId"] as? Int
        {
            let brush = Brush(jsonString: brushJson)

            barcodeCountModule.finishBrushForRejectedBarcodeEvent(viewId: viewId, brush: brush, trackedBarcodeId: trackedBarcodeId)

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
           let imageWidth = dataJson["imageWidth"] as? Int
        {
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
           let imageWidth = dataJson["imageWidth"] as? Int
        {
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
