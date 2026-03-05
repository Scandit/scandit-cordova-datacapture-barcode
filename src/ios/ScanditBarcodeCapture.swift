import ScanditBarcodeCapture
import ScanditFrameworksBarcode
import ScanditFrameworksCore
import WebKit

@objc(ScanditBarcodeCapture)
class ScanditBarcodeCapture: CDVPlugin {
    var barcodeModule: BarcodeModule!
    var barcodeCaptureModule: BarcodeCaptureModule!
    var barcodeBatchModule: BarcodeBatchModule!
    var barcodeSelectionModule: BarcodeSelectionModule!
    var barcodeArModule: BarcodeArModule!
    var barcodeFindModule: BarcodeFindModule!
    var barcodePickModule: BarcodePickModule!
    var emitter: CordovaEventEmitter!
    var barcodeArViewHandler: BarcodeArViewHandler!
    var barcodeFindViewHandler: BarcodeFindViewHandler!
    var barcodePickViewHandler: BarcodePickViewHandler!
    var sparkScanModule: SparkScanModule!
    var barcodeCountModule: BarcodeCountModule!
    var barcodeGeneratorModule: BarcodeGeneratorModule!
    var barcodeCountViewHandler: BarcodeCountViewHandler!

    override func pluginInitialize() {
        super.pluginInitialize()

        barcodeModule = BarcodeModule()
        DefaultServiceLocator.shared.register(module: barcodeModule)

        emitter = CordovaEventEmitter(commandDelegate: commandDelegate)

        barcodeCaptureModule = BarcodeCaptureModule(emitter: emitter)
        DefaultServiceLocator.shared.register(module: barcodeCaptureModule)

        barcodeBatchModule = BarcodeBatchModule(emitter: emitter, viewFromJsonResolver: nil)
        DefaultServiceLocator.shared.register(module: barcodeBatchModule)

        barcodeSelectionModule = BarcodeSelectionModule(
            emitter: emitter,
            aimedBrushProvider: FrameworksBarcodeSelectionAimedBrushProvider(
                emitter: emitter
            ),
            trackedBrushProvider: FrameworksBarcodeSelectionTrackedBrushProvider(
                emitter: emitter
            )
        )
        DefaultServiceLocator.shared.register(module: barcodeSelectionModule)

        barcodeArModule = BarcodeArModule(emitter: emitter)
        DefaultServiceLocator.shared.register(module: barcodeArModule)

        barcodeFindModule = BarcodeFindModule(emitter: emitter)
        DefaultServiceLocator.shared.register(module: barcodeFindModule)

        barcodePickModule = BarcodePickModule(emitter: emitter)
        DefaultServiceLocator.shared.register(module: barcodePickModule)

        sparkScanModule = SparkScanModule(emitter: emitter)
        DefaultServiceLocator.shared.register(module: sparkScanModule)

        barcodeCountModule = BarcodeCountModule(emitter: emitter)
        DefaultServiceLocator.shared.register(module: barcodeCountModule)

        barcodeGeneratorModule = BarcodeGeneratorModule()
        DefaultServiceLocator.shared.register(module: barcodeGeneratorModule)

        barcodeModule.didStart()
        barcodeCaptureModule.didStart()
        barcodeBatchModule.didStart()
        barcodeSelectionModule.didStart()
        barcodeArModule.didStart()
        barcodeFindModule.didStart()
        barcodePickModule.didStart()
        sparkScanModule.didStart()
        barcodeCountModule.didStart()
        barcodeGeneratorModule.didStart()

        guard let wkWebView = webView as? WKWebView else {
            fatalError("WebView must be a WKWebView")
        }
        barcodeArViewHandler = BarcodeArViewHandler(relativeTo: wkWebView)
        barcodeFindViewHandler = BarcodeFindViewHandler(relativeTo: wkWebView)
        barcodePickViewHandler = BarcodePickViewHandler(relativeTo: wkWebView)
        barcodeCountViewHandler = BarcodeCountViewHandler(relativeTo: wkWebView)
    }

    override func dispose() {
        barcodeModule.didStop()
        barcodeCaptureModule.didStop()
        barcodeBatchModule.didStop()
        barcodeSelectionModule.didStop()
        barcodeArModule.didStop()
        barcodeFindModule.didStop()
        barcodePickModule.didStop()
        sparkScanModule.didStop()
        barcodeCountModule.didStop()
        barcodeGeneratorModule.didStop()
        super.dispose()
    }

    @objc(getDefaults:)
    func getDefaults(command: CDVInvokedUrlCommand) {
        dispatchMain {
            let defaults = self.barcodeModule.getDefaults() as CDVPluginResult.JSONMessage
            self.commandDelegate.send(.success(message: defaults), callbackId: command.callbackId)
        }
    }

    // MARK: Barcode Ar

    @objc(createBarcodeArView:)
    func createBarcodeArView(command: CDVInvokedUrlCommand) {
        guard let args = JSONArgs(command, commandDelegate),
            let viewJson: String = args["viewJson"]
        else {
            return
        }
        let containerView = barcodeArViewHandler.createContainerView()
        dispatchMain {
            self.barcodeArModule.addViewToContainer(
                container: containerView,
                jsonString: viewJson,
                result: CordovaResult(self.commandDelegate, emitter: self.emitter, command: command)
            )
            self.webView.addSubview(containerView)
            self.barcodeArViewHandler.barcodeArView = self.barcodeArModule.getTopMostView()
        }
    }

    @objc(setArViewPositionAndSize:)
    func setArViewPositionAndSize(command: CDVInvokedUrlCommand) {
        guard let jsonObject = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        dispatchMain {
            guard let viewPositionAndSizeJSON = try? ViewPositionAndSizeJSON.fromJSONObject(jsonObject as Any) else {
                self.commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
                return
            }

            self.barcodeArViewHandler.updatePositionAndSize(fromJSON: viewPositionAndSizeJSON)

            if viewPositionAndSizeJSON.shouldBeUnderWebView {
                // Make the WebView transparent, so we can see views behind
                self.webView.isOpaque = false
                self.webView.backgroundColor = .clear
            } else {
                self.webView.isOpaque = true
                self.webView.backgroundColor = nil
            }

            self.commandDelegate.send(.success, callbackId: command.callbackId)
        }
    }

    @objc(removeBarcodeArView:)
    func removeBarcodeArView(command: CDVInvokedUrlCommand) {
        guard let args = JSONArgs(command, commandDelegate),
            let viewId: Int = args["viewId"]
        else {
            return
        }
        self.barcodeArViewHandler.barcodeArView = nil
        self.barcodeArViewHandler.containerView?.removeFromSuperview()
        self.barcodeArViewHandler.containerView = nil

        barcodeArModule.removeView(
            viewId: viewId,
            result: CordovaResult(commandDelegate, emitter: emitter, command: command)
        )
    }

    // MARK: Barcode Find

    @objc(createFindView:)
    func createFindView(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        guard let viewJson = argsJson["json"] as? String,
            let viewId = argsJson["viewId"] as? Int
        else {
            commandDelegate.send(.failure(with: .wrongOrNoArgumentPassed), callbackId: command.callbackId)
            return
        }
        dispatchMain {
            self.barcodeFindModule.addViewToContainer(
                container: self.barcodeFindViewHandler.container,
                jsonString: viewJson,
                result: CordovaResult(self.commandDelegate, emitter: self.emitter, command: command)
            )
            self.barcodeFindViewHandler.barcodeFindView = self.barcodeFindModule.getViewById(viewId)
        }
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
            // Dispose the current view in the handler first (removes from view hierarchy synchronously)
            self.barcodeFindViewHandler.disposeCurrentView()
            // Then dispose in the module
            self.barcodeFindModule.removeBarcodeFindView(
                viewId,
                result: CordovaResult(self.commandDelegate, emitter: self.emitter, command: command)
            )
        }
    }

    @objc(setFindViewPositionAndSize:)
    func setFindViewPositionAndSize(command: CDVInvokedUrlCommand) {
        dispatchMain {
            guard let argsJson = command.defaultArgumentAsDictionary else {
                self.commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
                return
            }

            guard let viewPositionAndSizeJSON = try? ViewPositionAndSizeJSON.fromJSONObject(argsJson) else {
                self.commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
                return
            }

            self.barcodeFindViewHandler.updatePositionAndSize(fromJSON: viewPositionAndSizeJSON)

            if viewPositionAndSizeJSON.shouldBeUnderWebView {
                // Make the WebView transparent, so we can see views behind
                self.webView?.isOpaque = false
                self.webView?.backgroundColor = .clear
            }

            self.commandDelegate.send(.success, callbackId: command.callbackId)
        }
    }

    // MARK: Barcode Pick

    @objc(registerOnProductIdentifierForItemsListener:)
    func registerOnProductIdentifierForItemsListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
            let viewId = argsJson["viewId"] as? Int
        else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }
        emitter.registerViewSpecificCallback(
            viewId,
            with: BarcodePickEvent.onProductIdentifierForItems.rawValue,
            call: command
        )
        commandDelegate.send(.keepCallback, callbackId: command.callbackId)
    }

    @objc(unregisterOnProductIdentifierForItemsListener:)
    func unregisterOnProductIdentifierForItemsListener(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
            let viewId = argsJson["viewId"] as? Int
        else {
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
                result: CordovaResult(self.commandDelegate, emitter: self.emitter, command: command)
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
                result: CordovaResult(self.commandDelegate, emitter: self.emitter, command: command)
            )
        }
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
                if let wkWebView = self.webView as? WKWebView {
                    wkWebView.clearScrollViewBackgroundColor()
                }
            } else {
                self.webView?.isOpaque = true
                self.webView?.backgroundColor = nil
                if let wkWebView = self.webView as? WKWebView {
                    wkWebView.restoreDefaultBackgroundColor()
                }
            }

            self.commandDelegate.send(.success, callbackId: command.callbackId)
        }
    }

    // MARK: Spark Scan

    @objc(createSparkScanView:)
    func createSparkScanView(command: CDVInvokedUrlCommand) {
        guard let json = command.defaultArgumentAsDictionary,
            let viewJson = json["viewJson"] as? String
        else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        dispatchMain {
            self.sparkScanModule.addViewToContainer(
                self.webView,
                jsonString: viewJson,
                result: CordovaResult(self.commandDelegate, emitter: self.emitter, command: command)
            )
        }
    }

    // MARK: Barcode Count

    @objc(createBarcodeCountView:)
    func createBarcodeCountView(command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary,
            let viewJson = argsJson["viewJson"] as? String
        else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        dispatchMain {
            // Clean up any existing view first
            self.barcodeCountViewHandler.disposeCurrentView()

            self.barcodeCountModule.addViewFromJson(
                parent: self.webView,
                viewJson: viewJson,
                result: CordovaResult(self.commandDelegate, emitter: self.emitter, command: command)
            )

            if let newView = self.barcodeCountModule.getTopMostView() {
                self.barcodeCountViewHandler.currentBarcodeCountView = newView
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
            // Dispose the view using the handler
            self.barcodeCountViewHandler.disposeCurrentView()

            self.barcodeCountModule.removeBarcodeCountView(
                viewId: viewId,
                result: CordovaResult(self.commandDelegate, emitter: self.emitter, command: command)
            )
        }
    }

    @objc(setBarcodeCountViewPositionAndSize:)
    func setBarcodeCountViewPositionAndSize(command: CDVInvokedUrlCommand) {
        guard let viewPositionAndSizeJSON = try? ViewPositionAndSizeJSON.fromCommand(command) else {
            commandDelegate.send(.failure(with: .invalidJSON), callbackId: command.callbackId)
            return
        }

        barcodeCountViewHandler.updatePositionAndSize(fromJSON: viewPositionAndSizeJSON)

        if viewPositionAndSizeJSON.shouldBeUnderWebView {
            // Make the WebView transparent, so we can see views behind
            webView.isOpaque = false
            webView.backgroundColor = .clear
            if let wkWebView = webView as? WKWebView {
                wkWebView.clearScrollViewBackgroundColor()
            }
        }

        commandDelegate.send(.success, callbackId: command.callbackId)
    }

    @objc(executeBarcode:)
    func executeBarcode(_ command: CDVInvokedUrlCommand) {
        guard let argsJson = command.defaultArgumentAsDictionary else {
            commandDelegate.send(
                .failure(with: "Invalid argument received in executeBarcode"),
                callbackId: command.callbackId
            )
            return
        }
        guard let moduleName = argsJson["moduleName"] as? String else {
            commandDelegate.send(.failure(with: "Missing moduleName parameter"), callbackId: command.callbackId)
            return
        }

        let coreModuleName = String(describing: CoreModule.self)
        guard let coreModule = DefaultServiceLocator.shared.resolve(clazzName: coreModuleName) as? CoreModule else {
            commandDelegate.send(
                .failure(with: "Unable to retrieve the CoreModule from the locator."),
                callbackId: command.callbackId
            )
            return
        }

        guard let targetModule = DefaultServiceLocator.shared.resolve(clazzName: moduleName) else {
            commandDelegate.send(
                .failure(with: "Unable to retrieve the \(moduleName) from the locator."),
                callbackId: command.callbackId
            )
            return
        }

        let result = CordovaResult(commandDelegate, emitter: emitter, command: command)
        let handled = coreModule.execute(
            CordovaMethodCall(command: command),
            result: result,
            module: targetModule
        )

        if !handled {
            let methodName = argsJson["methodName"] as? String ?? "unknown"
            commandDelegate.send(.failure(with: "Unknown Core method: \(methodName)"), callbackId: command.callbackId)
        }
    }
}
