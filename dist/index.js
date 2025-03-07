var barcode = cordova.require('scandit-cordova-datacapture-barcode.Barcode');
var scanditCordovaDatacaptureCore = cordova.require('scandit-cordova-datacapture-core.Core');
var scanditDatacaptureFrameworksCore = cordova.require('scandit-cordova-datacapture-core.Core');

class NativeBarcodeCaptureListenerProxy extends scanditDatacaptureFrameworksCore.BaseNativeProxy {
    constructor() {
        super(...arguments);
        this.isModeEnabled = () => false;
    }
    static get cordovaExec() {
        return Cordova.exec;
    }
    resetSession() {
        return new Promise((resolve, reject) => {
            NativeBarcodeCaptureListenerProxy.cordovaExec(resolve, reject, CordovaFunction.ResetBarcodeCaptureSession, null);
        });
    }
    registerListenerForEvents() {
        NativeBarcodeCaptureListenerProxy.cordovaExec(this.notifyListeners.bind(this), null, CordovaFunction.SubscribeBarcodeCaptureListener, null);
    }
    setModeEnabledState(enabled) {
        NativeBarcodeCaptureListenerProxy.cordovaExec(null, null, CordovaFunction.SetBarcodeCaptureModeEnabledState, [{ 'enabled': enabled }]);
    }
    unregisterListenerForEvents() {
        NativeBarcodeCaptureListenerProxy.cordovaExec(null, null, CordovaFunction.UnsubscribeBarcodeCaptureListener, null);
    }
    finishDidUpdateSessionCallback(isFinished) {
        NativeBarcodeCaptureListenerProxy.cordovaExec(null, null, CordovaFunction.FinishBarcodeCaptureDidUpdateSession, [{ 'enabled': isFinished }]);
    }
    finishDidScanCallback(isFinished) {
        NativeBarcodeCaptureListenerProxy.cordovaExec(null, null, CordovaFunction.FinishBarcodeCaptureDidScan, [{ 'enabled': isFinished }]);
    }
    updateBarcodeCaptureMode(modeJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeCaptureListenerProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateBarcodeCaptureMode, [modeJson]);
        });
    }
    applyBarcodeCaptureModeSettings(newSettingsJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeCaptureListenerProxy.cordovaExec(resolve, reject, CordovaFunction.ApplyBarcodeCaptureModeSettings, [newSettingsJson]);
        });
    }
    updateBarcodeCaptureOverlay(overlayJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeCaptureListenerProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateBarcodeCaptureOverlay, [overlayJson]);
        });
    }
    emitInCallback(enabled) {
        this.eventEmitter.emit(barcode.BarcodeCaptureListenerEvents.inCallback, enabled);
    }
    notifyListeners(event) {
        const done = () => {
            this.emitInCallback(false);
            return { enabled: this.isModeEnabled() };
        };
        this.emitInCallback(true);
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        this.eventEmitter.emit(event.name, event.data);
        return done();
    }
}

class NativeBarcodeSelectionListenerProxy extends scanditDatacaptureFrameworksCore.BaseNativeProxy {
    static get cordovaExec() {
        return Cordova.exec;
    }
    getCount(selectionIdentifier) {
        return new Promise((resolve, reject) => {
            NativeBarcodeSelectionListenerProxy.cordovaExec(resolve, reject, CordovaFunction.GetCountForBarcodeInBarcodeSelectionSession, [selectionIdentifier]);
        });
    }
    resetSession() {
        return new Promise((resolve, reject) => {
            NativeBarcodeSelectionListenerProxy.cordovaExec(resolve, reject, CordovaFunction.ResetBarcodeSelectionSession, null);
        });
    }
    registerListenerForEvents() {
        NativeBarcodeSelectionListenerProxy.cordovaExec(this.notifyListeners.bind(this), null, CordovaFunction.SubscribeBarcodeSelectionListener, null);
    }
    finishDidUpdateSelectionCallback(isEnabled) {
        NativeBarcodeSelectionListenerProxy.cordovaExec(null, null, CordovaFunction.FinishBarcodeSelectionDidUpdateSelection, [{ 'enabled': isEnabled }]);
    }
    finishDidUpdateSessionCallback(isEnabled) {
        NativeBarcodeSelectionListenerProxy.cordovaExec(null, null, CordovaFunction.FinishBarcodeSelectionDidUpdateSession, [{ 'enabled': isEnabled }]);
    }
    unregisterListenerForEvents() {
        NativeBarcodeSelectionListenerProxy.cordovaExec(null, null, CordovaFunction.UnsubscribeBarcodeSelectionListener, null);
    }
    notifyListeners(event) {
        const done = () => {
            this.eventEmitter.emit(barcode.BarcodeSelectionListenerEvents.inCallback, false);
            return { enabled: this.isModeEnabled() };
        };
        this.eventEmitter.emit(barcode.BarcodeSelectionListenerEvents.inCallback, true);
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        this.eventEmitter.emit(event.name, event.data);
        return done();
    }
}

class NativeBarcodeSelectionProxy extends scanditDatacaptureFrameworksCore.BaseNativeProxy {
    static get cordovaExec() {
        return Cordova.exec;
    }
    unfreezeCamera() {
        return new Promise((resolve, reject) => {
            NativeBarcodeSelectionProxy.cordovaExec(resolve, reject, CordovaFunction.UnfreezeCameraInBarcodeSelection, null);
        });
    }
    resetMode() {
        return new Promise((resolve, reject) => {
            NativeBarcodeSelectionProxy.cordovaExec(resolve, reject, CordovaFunction.ResetBarcodeSelection, null);
        });
    }
    selectAimedBarcode() {
        return new Promise((resolve, reject) => {
            NativeBarcodeSelectionProxy.cordovaExec(resolve, reject, CordovaFunction.SelectAimedBarcode, null);
        });
    }
    unselectBarcodes(barcodesStr) {
        return new Promise((resolve, reject) => {
            NativeBarcodeSelectionProxy.cordovaExec(resolve, reject, CordovaFunction.UnselectBarcodes, [barcodesStr]);
        });
    }
    setSelectBarcodeEnabled(barcodeStr, enabled) {
        return new Promise((resolve, reject) => {
            NativeBarcodeSelectionProxy.cordovaExec(resolve, reject, CordovaFunction.SetSelectBarcodeEnabled, [[{ barcode: barcodeStr, enabled }]]);
        });
    }
    increaseCountForBarcodes(barcodeStr) {
        return new Promise((resolve, reject) => {
            NativeBarcodeSelectionProxy.cordovaExec(resolve, reject, CordovaFunction.IncreaseCountForBarcodes, [barcodeStr]);
        });
    }
    setModeEnabledState(enabled) {
        NativeBarcodeSelectionProxy.cordovaExec(null, null, CordovaFunction.SetBarcodeSelectionModeEnabledState, [{ 'enabled': enabled }]);
    }
    updateBarcodeSelectionMode(modeJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeSelectionProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateBarcodeSelectionMode, [modeJson]);
        });
    }
    applyBarcodeSelectionModeSettings(newSettingsJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeSelectionProxy.cordovaExec(resolve, reject, CordovaFunction.ApplyBarcodeSelectionModeSettings, [newSettingsJson]);
        });
    }
    updateFeedback(feedbackJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeSelectionProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateBarcodeSelectionFeedback, [feedbackJson]);
        });
    }
}

class NativeBarcodeSelectionOverlayProxy extends scanditDatacaptureFrameworksCore.BaseNativeProxy {
    static get cordovaExec() {
        return Cordova.exec;
    }
    setTextForAimToSelectAutoHint(text) {
        return new Promise((resolve, reject) => {
            NativeBarcodeSelectionOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.SetTextForAimToSelectAutoHint, [{ 'text': text }]);
        });
    }
    removeAimedBarcodeBrushProvider() {
        return new Promise((resolve, reject) => {
            NativeBarcodeSelectionOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.RemoveAimedBarcodeBrushProvider, null);
        });
    }
    setAimedBarcodeBrushProvider() {
        return new Promise((resolve, reject) => {
            NativeBarcodeSelectionOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.SetAimedBarcodeBrushProvider, null);
        });
    }
    finishBrushForAimedBarcodeCallback(brushStr, selectionIdentifier) {
        NativeBarcodeSelectionOverlayProxy.cordovaExec(null, null, CordovaFunction.FinishBrushForAimedBarcodeCallback, [{ 'brush': brushStr, 'selectionIdentifier': selectionIdentifier }]);
    }
    removeTrackedBarcodeBrushProvider() {
        return new Promise((resolve, reject) => {
            NativeBarcodeSelectionOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.RemoveTrackedBarcodeBrushProvider, null);
        });
    }
    setTrackedBarcodeBrushProvider() {
        return new Promise((resolve, reject) => {
            NativeBarcodeSelectionOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.SetTrackedBarcodeBrushProvider, null);
        });
    }
    finishBrushForTrackedBarcodeCallback(brushStr, selectionIdentifier) {
        NativeBarcodeSelectionOverlayProxy.cordovaExec(null, null, CordovaFunction.FinishBrushForTrackedBarcodeCallback, [{ 'brush': brushStr, 'selectionIdentifier': selectionIdentifier }]);
    }
    updateBarcodeSelectionBasicOverlay(overlayJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeSelectionOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateBarcodeSelectionBasicOverlay, [overlayJson]);
        });
    }
    subscribeBrushForTrackedBarcode() {
        // setTrackedBarcodeBrushProvider is also subscribing for events on Cordova
    }
    subscribeBrushForAimedBarcode() {
        // setAimedBarcodeBrushProvider is also subscribing for events on Cordova
    }
    notifyListeners(event) {
        const done = () => {
            this.eventEmitter.emit(barcode.BarcodeSelectionBrushProviderEvents.inCallback, false);
            return { enabled: this.isModeEnabled() };
        };
        this.eventEmitter.emit(barcode.BarcodeSelectionBrushProviderEvents.inCallback, true);
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        this.eventEmitter.emit(event.name, event.data);
        return done();
    }
}

class NativeBarcodeBatchListenerProxy extends scanditDatacaptureFrameworksCore.BaseNativeProxy {
    constructor() {
        super(...arguments);
        this.isModeEnabled = () => false;
    }
    static get cordovaExec() {
        return Cordova.exec;
    }
    resetSession() {
        return new Promise((resolve, reject) => {
            NativeBarcodeBatchListenerProxy.cordovaExec(resolve, reject, CordovaFunction.ResetBarcodeBatchSession, null);
        });
    }
    registerListenerForEvents() {
        NativeBarcodeBatchListenerProxy.cordovaExec(this.notifyListeners.bind(this), null, CordovaFunction.SubscribeBarcodeBatchListener, null);
    }
    unregisterListenerForEvents() {
        NativeBarcodeBatchListenerProxy.cordovaExec(this.notifyListeners.bind(this), null, CordovaFunction.UnregisterBarcodeBatchListener, null);
    }
    setModeEnabledState(enabled) {
        NativeBarcodeBatchListenerProxy.cordovaExec(null, null, CordovaFunction.SetBarcodeBatchModeEnabledState, [{ 'enabled': enabled }]);
    }
    updateBarcodeBatchMode(modeJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeBatchListenerProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateBarcodeBatchMode, [modeJson]);
        });
    }
    applyBarcodeBatchModeSettings(newSettingsJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeBatchListenerProxy.cordovaExec(resolve, reject, CordovaFunction.ApplyBarcodeBatchModeSettings, [newSettingsJson]);
        });
    }
    finishDidUpdateSessionCallback(enabled) {
        NativeBarcodeBatchListenerProxy.cordovaExec(null, null, CordovaFunction.FinishBarcodeBatchDidUpdateSession, [{ 'enabled': enabled }]);
    }
    notifyListeners(event) {
        const done = () => {
            this.eventEmitter.emit(barcode.BarcodeBatchListenerEvents.inCallback, false);
            return { enabled: this.isModeEnabled() };
        };
        this.eventEmitter.emit(barcode.BarcodeBatchListenerEvents.inCallback, true);
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        this.eventEmitter.emit(event.name, event.data);
        return done();
    }
}

class NativeBarcodeBatchBasicOverlayProxy extends scanditDatacaptureFrameworksCore.BaseNativeProxy {
    static get cordovaExec() {
        return Cordova.exec;
    }
    setBrushForTrackedBarcode(brushJson, trackedBarcodeIdentifier, sessionFrameSequenceID) {
        return new Promise((resolve, reject) => {
            NativeBarcodeBatchBasicOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.SetBrushForTrackedBarcode, [{
                    brush: brushJson,
                    sessionFrameSequenceID: sessionFrameSequenceID,
                    trackedBarcodeID: trackedBarcodeIdentifier,
                }]);
        });
    }
    clearTrackedBarcodeBrushes() {
        return new Promise((resolve, reject) => {
            NativeBarcodeBatchBasicOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.ClearTrackedBarcodeBrushes, null);
        });
    }
    registerListenerForBasicOverlayEvents() {
        NativeBarcodeBatchBasicOverlayProxy.cordovaExec(this.notifyListeners.bind(this), null, CordovaFunction.SubscribeBarcodeBatchBasicOverlayListener, null);
    }
    updateBarcodeBatchBasicOverlay(overlayJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeBatchBasicOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateBarcodeBatchBasicOverlay, [overlayJson]);
        });
    }
    unregisterListenerForBasicOverlayEvents() {
        return new Promise((resolve, reject) => {
            NativeBarcodeBatchBasicOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.UnregisterBarcodeBatchBasicOverlayListener, null);
        });
    }
    notifyListeners(event) {
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return null;
        }
        this.eventEmitter.emit(event.name, event.data);
        return null;
    }
}

class NativeBarcodeBatchAdvancedOverlayProxy extends scanditDatacaptureFrameworksCore.BaseNativeProxy {
    static get cordovaExec() {
        return Cordova.exec;
    }
    setBrushForTrackedBarcode(_brushJson, _sessionFrameSequenceID, _trackedBarcodeIdentifier) {
        return Promise.resolve();
    }
    setViewForTrackedBarcode(viewJson, trackedBarcodeIdentifier, sessionFrameSequenceID) {
        return new Promise((resolve, reject) => {
            NativeBarcodeBatchAdvancedOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.SetViewForTrackedBarcode, [{
                    view: viewJson,
                    sessionFrameSequenceID: sessionFrameSequenceID === null || sessionFrameSequenceID === void 0 ? void 0 : sessionFrameSequenceID.toString(),
                    trackedBarcodeID: trackedBarcodeIdentifier.toString(),
                }]);
        });
    }
    setAnchorForTrackedBarcode(anchor, trackedBarcodeIdentifier, sessionFrameSequenceID) {
        return new Promise((resolve, reject) => {
            NativeBarcodeBatchAdvancedOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.SetAnchorForTrackedBarcode, [{
                    anchor,
                    sessionFrameSequenceID: sessionFrameSequenceID === null || sessionFrameSequenceID === void 0 ? void 0 : sessionFrameSequenceID.toString(),
                    trackedBarcodeID: trackedBarcodeIdentifier.toString(),
                }]);
        });
    }
    setOffsetForTrackedBarcode(offsetJson, trackedBarcodeIdentifier, sessionFrameSequenceID) {
        return new Promise((resolve, reject) => {
            NativeBarcodeBatchAdvancedOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.SetOffsetForTrackedBarcode, [{
                    offset: offsetJson,
                    sessionFrameSequenceID: sessionFrameSequenceID === null || sessionFrameSequenceID === void 0 ? void 0 : sessionFrameSequenceID.toString(),
                    trackedBarcodeID: trackedBarcodeIdentifier.toString(),
                }]);
        });
    }
    clearTrackedBarcodeViews() {
        return new Promise((resolve, reject) => {
            NativeBarcodeBatchAdvancedOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.ClearTrackedBarcodeViews, null);
        });
    }
    registerListenerForAdvancedOverlayEvents() {
        NativeBarcodeBatchAdvancedOverlayProxy.cordovaExec(this.notifyListeners.bind(this), null, CordovaFunction.SubscribeBarcodeBatchAdvancedOverlayListener, null);
    }
    updateBarcodeBatchAdvancedOverlay(overlayJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeBatchAdvancedOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateBarcodeBatchAdvancedOverlay, [overlayJson]);
        });
    }
    unregisterListenerForAdvancedOverlayEvents() {
        return new Promise((resolve, reject) => {
            NativeBarcodeBatchAdvancedOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.UnregisterBarcodeBatchAdvancedOverlayListener, null);
        });
    }
    getJSONStringForView(view) {
        return view ? view.toJSON() : null;
    }
    notifyListeners(event) {
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return null;
        }
        this.eventEmitter.emit(event.name, event.data);
        return null;
    }
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

class NativeBarcodePickProductProxy extends scanditDatacaptureFrameworksCore.BaseNativeProxy {
    static get cordovaExec() {
        return Cordova.exec;
    }
    subscribeProductIdentifierForItemsListener() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((_, reject) => {
                NativeBarcodePickProductProxy.cordovaExec(this.productIdentifierForItemsListenerHandler.bind(this), reject, CordovaFunction.SubscribeProductIdentifierForItemsListener, null);
            });
        });
    }
    unsubscribeListeners() {
        return new Promise((resolve, reject) => {
            NativeBarcodePickProductProxy.cordovaExec(resolve, reject, CordovaFunction.UnsubscribeProductIdentifierForItemsListener, null);
        });
    }
    finishOnProductIdentifierForItems(jsonData) {
        return new Promise((resolve, reject) => {
            NativeBarcodePickProductProxy.cordovaExec(resolve, reject, CordovaFunction.FinishOnProductIdentifierForItems, [jsonData]);
        });
    }
    productIdentifierForItemsListenerHandler(event) {
        this.eventEmitter.emit(barcode.BarcodePickEvents.OnProductIdentifierForItems, event.data);
    }
}

class NativeBarcodePickViewProxy extends scanditDatacaptureFrameworksCore.BaseNativeProxy {
    static get cordovaExec() {
        return Cordova.exec;
    }
    registerFrameworkEvents() {
        this.addViewListener();
        this.subscribeDidPickItemListener();
        this.subscribeDidUnpickItemListener();
    }
    addViewListener() {
        this.subscribeDidStartScanningListener();
        this.subscribeDidFreezeScanningListener();
        this.subscribeDidPauseScanningListener();
        this.subscribeDidStopScanningListener();
        return new Promise((resolve, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(resolve, reject, CordovaFunction.AddViewListener, null);
        });
    }
    unregisterFrameworkEvents() {
        this.unsubscribeListeners();
    }
    initialize(_view) {
        return Promise.resolve();
    }
    findNodeHandle(_view) {
        // This is only needed on React Native
        return null;
    }
    createView(_, json) {
        return new Promise((resolve, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(resolve, reject, CordovaFunction.CreatePickView, [json]);
        });
    }
    removeView() {
        return new Promise((resolve, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(resolve, reject, CordovaFunction.RemovePickView, null);
        });
    }
    viewStart() {
        return new Promise((resolve, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(resolve, reject, CordovaFunction.PickViewStart, null);
        });
    }
    viewPause() {
        // NOOP because lifecycle is handled automatically on the android module
        return Promise.resolve();
    }
    viewFreeze() {
        return new Promise((resolve, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(resolve, reject, CordovaFunction.PickViewFreeze, null);
        });
    }
    viewStop() {
        return new Promise((resolve, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(resolve, reject, CordovaFunction.PickViewFreeze, null);
        });
    }
    viewResume() {
        // NOOP because lifecycle is handled automatically on the android module
        return Promise.resolve();
    }
    updateView(json) {
        return new Promise((resolve, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(resolve, reject, CordovaFunction.UpdatePickView, [json]);
        });
    }
    setPositionAndSize(top, left, width, height, shouldBeUnderWebView) {
        return new Promise((resolve, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(resolve, reject, CordovaFunction.SetPositionAndSize, [{ top: top, left: left, width: width, height: height, shouldBeUnderWebView: shouldBeUnderWebView }]);
        });
    }
    subscribeDidPickItemListener() {
        return new Promise((_, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(this.didPickItemListenerHandler.bind(this), reject, CordovaFunction.SubscribeDidPickItemListener, null);
        });
    }
    subscribeDidUnpickItemListener() {
        return new Promise((_, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(this.didUnpickItemListenerHandler.bind(this), reject, CordovaFunction.SubscribeDidUnpickItemListener, null);
        });
    }
    addActionListener() {
        return new Promise((resolve, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(resolve, reject, CordovaFunction.AddActionListener, null);
        });
    }
    subscribeBarcodePickViewUiListener() {
        this.registerBarcodePickViewUiListener();
        return new Promise((_, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(this.viewUiListenerHandler.bind(this), reject, CordovaFunction.SubscribeBarcodePickViewUiListener, null);
        });
    }
    registerBarcodePickViewUiListener() {
        return new Promise((resolve, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(resolve, reject, CordovaFunction.RegisterBarcodePickViewUiListener, null);
        });
    }
    unsubscribeBarcodePickViewUiListener() {
        return new Promise((resolve, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(resolve, reject, CordovaFunction.UnsubscribeBarcodePickViewUiListener, null);
        });
    }
    subscribeDidStartScanningListener() {
        return new Promise((_, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(this.didStartScanningListenerHandler.bind(this), reject, CordovaFunction.SubscribeDidStartScanningListener, null);
        });
    }
    subscribeDidFreezeScanningListener() {
        return new Promise((_, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(this.didFreezeScanningListenerHandler.bind(this), reject, CordovaFunction.SubscribeDidFreezeScanningListener, null);
        });
    }
    subscribeDidPauseScanningListener() {
        return new Promise((_, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(this.didPauseScanningListenerHandler.bind(this), reject, CordovaFunction.SubscribeDidPauseScanningListener, null);
        });
    }
    subscribeDidStopScanningListener() {
        return new Promise((_, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(this.didStopScanningListenerHandler.bind(this), reject, CordovaFunction.SubscribeDidStopScanningListener, null);
        });
    }
    finishPickAction(code, result) {
        return new Promise((resolve, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(resolve, reject, CordovaFunction.FinishPickAction, [{ code: code, result: result }]);
        });
    }
    unsubscribeListeners() {
        return new Promise((resolve, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(resolve, reject, CordovaFunction.UnsubscribeListeners, null);
        });
    }
    didPickItemListenerHandler(event) {
        this.eventEmitter.emit(barcode.BarcodePickEvents.DidPick, event.data);
    }
    didUnpickItemListenerHandler(event) {
        this.eventEmitter.emit(barcode.BarcodePickEvents.DidUnpick, event.data);
    }
    viewUiListenerHandler(event) {
        this.eventEmitter.emit(barcode.BarcodePickViewUiListenerEvents.DidTapFinishButton, event.data);
    }
    didStartScanningListenerHandler(event) {
        this.eventEmitter.emit(barcode.BarcodePickViewListenerEvents.DidStartScanning, event.data);
    }
    didFreezeScanningListenerHandler(event) {
        this.eventEmitter.emit(barcode.BarcodePickViewListenerEvents.DidFreezeScanning, event.data);
    }
    didPauseScanningListenerHandler(event) {
        this.eventEmitter.emit(barcode.BarcodePickViewListenerEvents.DidPauseScanning, event.data);
    }
    didStopScanningListenerHandler(event) {
        this.eventEmitter.emit(barcode.BarcodePickViewListenerEvents.DidStopScanning, event.data);
    }
}

class NativeSparkScanListenerProxy extends scanditDatacaptureFrameworksCore.BaseNativeProxy {
    static get cordovaExec() {
        return Cordova.exec;
    }
    resetSession() {
        return new Promise((resolve, reject) => {
            NativeSparkScanListenerProxy.cordovaExec(resolve, reject, CordovaFunction.ResetSparkScanSession, null);
        });
    }
    updateMode(sparkScanJson) {
        return new Promise((resolve, reject) => {
            NativeSparkScanListenerProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateSparkScanMode, [sparkScanJson]);
        });
    }
    registerListenerForEvents() {
        NativeSparkScanListenerProxy.cordovaExec(this.notifyListeners.bind(this), null, CordovaFunction.RegisterSparkScanListenerForEvents, null);
    }
    unregisterListenerForEvents() {
        return new Promise((resolve, reject) => {
            NativeSparkScanListenerProxy.cordovaExec(resolve, reject, CordovaFunction.UnregisterSparkScanListenerForEvents, null);
        });
    }
    subscribeDidUpdateSessionListener() {
    }
    subscribeDidScanListener() {
    }
    finishDidUpdateSessionCallback(enabled) {
        return new Promise((resolve, reject) => {
            NativeSparkScanListenerProxy.cordovaExec(resolve, reject, CordovaFunction.FinishSparkScanDidUpdateSessionCallback, [{ 'enabled': enabled }]);
        });
    }
    finishDidScanCallback(enabled) {
        return new Promise((resolve, reject) => {
            NativeSparkScanListenerProxy.cordovaExec(resolve, reject, CordovaFunction.FinishSparkScanDidScanCallback, [{ 'enabled': enabled }]);
        });
    }
    setModeEnabledState(enabled) {
        return new Promise((resolve, reject) => {
            NativeSparkScanListenerProxy.cordovaExec(resolve, reject, CordovaFunction.SetSparkScanModeEnabledState, [enabled]);
        });
    }
    notifyListeners(event) {
        const done = () => {
            return {};
        };
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a 'message',
            // which could happen e.g. in case of 'ok' results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        this.eventEmitter.emit(event.name, event.data);
        return done();
    }
}

class NativeSparkScanViewProxy extends scanditDatacaptureFrameworksCore.BaseNativeProxy {
    static get cordovaExec() {
        return Cordova.exec;
    }
    updateSparkScanView(_viewId, viewJson) {
        return new Promise((resolve, reject) => {
            NativeSparkScanViewProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateSparkScanView, [viewJson]);
        });
    }
    createSparkScanView(viewJson) {
        return new Promise((resolve, reject) => {
            NativeSparkScanViewProxy.cordovaExec(resolve, reject, CordovaFunction.CreateSparkScanView, [viewJson]);
        });
    }
    prepareScanning() {
        return new Promise((resolve, reject) => {
            NativeSparkScanViewProxy.cordovaExec(resolve, reject, CordovaFunction.PrepareSparkScanViewScanning, null);
        });
    }
    disposeSparkScanView() {
        return new Promise((resolve, reject) => {
            NativeSparkScanViewProxy.cordovaExec(resolve, reject, CordovaFunction.DisposeSparkScanView, null);
        });
    }
    showSparkScanView() {
        return new Promise((resolve, reject) => {
            NativeSparkScanViewProxy.cordovaExec(resolve, reject, CordovaFunction.ShowSparkScanView, null);
        });
    }
    hideSparkScanView() {
        return new Promise((resolve, reject) => {
            NativeSparkScanViewProxy.cordovaExec(resolve, reject, CordovaFunction.HideSparkScanView, null);
        });
    }
    registerSparkScanViewListenerEvents() {
        NativeSparkScanViewProxy.cordovaExec(this.notifyListeners.bind(this), null, CordovaFunction.RegisterSparkScanViewListenerEvents, null);
    }
    unregisterSparkScanViewListenerEvents() {
        return new Promise((resolve, reject) => {
            NativeSparkScanViewProxy.cordovaExec(resolve, reject, CordovaFunction.UnregisterSparkScanViewListenerEvents, null);
        });
    }
    stopSparkScanViewScanning() {
        return new Promise((resolve, reject) => {
            NativeSparkScanViewProxy.cordovaExec(resolve, reject, CordovaFunction.StopSparkScanViewScanning, null);
        });
    }
    startSparkScanViewScanning() {
        return new Promise((resolve, reject) => {
            NativeSparkScanViewProxy.cordovaExec(resolve, reject, CordovaFunction.StartSparkScanViewScanning, null);
        });
    }
    pauseSparkScanViewScanning() {
        return new Promise((resolve, reject) => {
            NativeSparkScanViewProxy.cordovaExec(resolve, reject, CordovaFunction.PauseSparkScanViewScanning, null);
        });
    }
    prepareSparkScanViewScanning() {
        return new Promise((resolve, reject) => {
            NativeSparkScanViewProxy.cordovaExec(resolve, reject, CordovaFunction.PrepareSparkScanViewScanning, null);
        });
    }
    notifyListeners(event) {
        const done = () => {
            return {};
        };
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a 'message',
            // which could happen e.g. in case of 'ok' results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        event = Object.assign(Object.assign(Object.assign({}, event), event.argument), { argument: undefined });
        switch (event.name) {
            case barcode.SparkScanViewEvents.barcodeCountButtonTapped:
                this.eventEmitter.emit(barcode.SparkScanViewEvents.barcodeCountButtonTapped);
                break;
            case barcode.SparkScanViewEvents.barcodeFindButtonTapped:
                this.eventEmitter.emit(barcode.SparkScanViewEvents.barcodeFindButtonTapped);
                break;
            case barcode.SparkScanViewEvents.didChangeViewState:
                this.eventEmitter.emit(barcode.SparkScanViewEvents.didChangeViewState, event.state);
                break;
        }
        return done();
    }
    registerDelegateForEvents() {
        NativeSparkScanViewProxy.cordovaExec(this.onFeedbackForBarcodeHandler.bind(this), null, CordovaFunction.AddSparkScanFeedbackDelegate, null);
        return Promise.resolve();
    }
    unregisterDelegateForEvents() {
        return new Promise((resolve, reject) => {
            NativeSparkScanViewProxy.cordovaExec(resolve, reject, CordovaFunction.RemoveSparkScanFeedbackDelegate, null);
        });
    }
    submitFeedbackForBarcode(feedbackJson) {
        return new Promise((resolve, reject) => {
            NativeSparkScanViewProxy.cordovaExec(resolve, reject, CordovaFunction.SubmitSparkScanFeedbackForBarcode, [feedbackJson]);
        });
    }
    showToast(text) {
        return new Promise((resolve, reject) => {
            NativeSparkScanViewProxy.cordovaExec(resolve, reject, CordovaFunction.ShowToast, [text]);
        });
    }
    onFeedbackForBarcodeHandler(event) {
        const done = () => {
            return {};
        };
        if (event.name !== barcode.SparkScanFeedbackDelegateEvents.feedbackForBarcode) {
            return done();
        }
        this.eventEmitter.emit(event.name, event.data);
        return done();
    }
}

class NativeBarcodePickListenerProxy extends scanditDatacaptureFrameworksCore.BaseNativeProxy {
    static get cordovaExec() {
        return Cordova.exec;
    }
    subscribeBarcodePickListeners() {
        this.subscribeDidCompleteScanningSessionListener();
        this.subscribeDidUpdateScanningSessionListener();
        return new Promise((resolve, reject) => {
            NativeBarcodePickListenerProxy.cordovaExec(resolve, reject, CordovaFunction.AddScanningListener, null);
        });
    }
    unsubscribeBarcodePickListeners() {
        return new Promise((resolve, reject) => {
            NativeBarcodePickListenerProxy.cordovaExec(resolve, reject, CordovaFunction.RemoveScanningListener, null);
        });
    }
    subscribeDidCompleteScanningSessionListener() {
        return new Promise((_, reject) => {
            NativeBarcodePickListenerProxy.cordovaExec(this.didCompleteScanningSessionListenerHandler.bind(this), reject, CordovaFunction.SubscribeDidCompleteScanningSessionListener, null);
        });
    }
    subscribeDidUpdateScanningSessionListener() {
        return new Promise((_, reject) => {
            NativeBarcodePickListenerProxy.cordovaExec(this.didUpdateScanningSessionListenerHandler.bind(this), reject, CordovaFunction.SubscribeDidUpdateScanningSessionListener, null);
        });
    }
    didCompleteScanningSessionListenerHandler(event) {
        this.eventEmitter.emit(barcode.BarcodePickListenerEvents.DidCompleteScanningSession, event.data);
    }
    didUpdateScanningSessionListenerHandler(event) {
        this.eventEmitter.emit(barcode.BarcodePickListenerEvents.DidUpdateScanningSession, event.data);
    }
}

class NativeBarcodeFindListenerProxy extends scanditDatacaptureFrameworksCore.BaseNativeProxy {
    constructor() {
        super(...arguments);
        this.isModeEnabled = () => false;
    }
    static get cordovaExec() {
        return Cordova.exec;
    }
    setItemList(itemsJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeFindListenerProxy.cordovaExec(resolve, reject, CordovaFunction.BarcodeFindSetItemList, [itemsJson]);
        });
    }
    updateFindMode(barcodeFindJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeFindListenerProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateFindMode, [barcodeFindJson]);
        });
    }
    barcodeFindModeStart() {
        return new Promise((resolve, reject) => {
            NativeBarcodeFindListenerProxy.cordovaExec(resolve, reject, CordovaFunction.BarcodeFindModeStart, [null]);
        });
    }
    barcodeFindModePause() {
        return new Promise((resolve, reject) => {
            NativeBarcodeFindListenerProxy.cordovaExec(resolve, reject, CordovaFunction.BarcodeFindModePause, [null]);
        });
    }
    barcodeFindModeStop() {
        return new Promise((resolve, reject) => {
            NativeBarcodeFindListenerProxy.cordovaExec(resolve, reject, CordovaFunction.BarcodeFindModeStop, [null]);
        });
    }
    setModeEnabledState(isEnabled) {
        new Promise((resolve, reject) => {
            NativeBarcodeFindListenerProxy.cordovaExec(resolve, reject, CordovaFunction.SetBarcodeFindModeEnabledState, [isEnabled]);
        });
    }
    setBarcodeTransformer() {
        return new Promise((resolve, reject) => {
            NativeBarcodeFindListenerProxy.cordovaExec(resolve, reject, CordovaFunction.setBarcodeFindTransformer, [null]);
        });
    }
    submitBarcodeFindTransformerResult(transformedBarcode) {
        return new Promise((resolve, reject) => {
            NativeBarcodeFindListenerProxy.cordovaExec(resolve, reject, CordovaFunction.SubmitBarcodeFindTransformerResult, [transformedBarcode]);
        });
    }
    subscribeBarcodeFindListener() {
        return new Promise((_resolve, reject) => {
            NativeBarcodeFindListenerProxy.cordovaExec(this.notifyListeners.bind(this), reject, CordovaFunction.RegisterBarcodeFindListener, null);
        });
    }
    unsubscribeBarcodeFindListener() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                NativeBarcodeFindListenerProxy.cordovaExec(resolve, reject, CordovaFunction.UnregisterBarcodeFindListener, null);
            });
        });
    }
    updateFeedback(feedbackJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeFindListenerProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateBarcodeFindFeedback, [feedbackJson]);
        });
    }
    notifyListeners(event) {
        const done = () => {
            this.eventEmitter.emit(barcode.BarcodeFindListenerEvents.inCallback, false);
            return { enabled: this.isModeEnabled() };
        };
        this.eventEmitter.emit(barcode.BarcodeFindListenerEvents.inCallback, true);
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        this.eventEmitter.emit(event.name, event.data);
    }
}

class NativeBarcodeFindViewProxy extends scanditDatacaptureFrameworksCore.BaseNativeProxy {
    static get cordovaExec() {
        return Cordova.exec;
    }
    showView() {
        return new Promise((resolve, reject) => {
            NativeBarcodeFindViewProxy.cordovaExec(resolve, reject, CordovaFunction.ShowFindView, [null]);
        });
    }
    hideView() {
        return new Promise((resolve, reject) => {
            NativeBarcodeFindViewProxy.cordovaExec(resolve, reject, CordovaFunction.HideFindView, [null]);
        });
    }
    onPause() {
        return new Promise((resolve, reject) => {
            NativeBarcodeFindViewProxy.cordovaExec(resolve, reject, CordovaFunction.BarcodeFindModePause, [null]);
        });
    }
    onResume() {
        return new Promise((resolve, reject) => {
            NativeBarcodeFindViewProxy.cordovaExec(resolve, reject, CordovaFunction.BarcodeFindViewOnResume, [null]);
        });
    }
    startSearching() {
        return new Promise((resolve, reject) => {
            NativeBarcodeFindViewProxy.cordovaExec(resolve, reject, CordovaFunction.BarcodeFindViewStartSearching, [null]);
        });
    }
    stopSearching() {
        return new Promise((resolve, reject) => {
            NativeBarcodeFindViewProxy.cordovaExec(resolve, reject, CordovaFunction.BarcodeFindViewStopSearching, [null]);
        });
    }
    pauseSearching() {
        return new Promise((resolve, reject) => {
            NativeBarcodeFindViewProxy.cordovaExec(resolve, reject, CordovaFunction.BarcodeFindViewPauseSearching, [null]);
        });
    }
    findNodeHandle(_view) {
        // This is used on RN only to retrieve the view id
        return null;
    }
    createView(_id, barcodeFindViewJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeFindViewProxy.cordovaExec(resolve, reject, CordovaFunction.CreateFindView, [barcodeFindViewJson]);
        });
    }
    removeView() {
        return new Promise((resolve, reject) => {
            NativeBarcodeFindViewProxy.cordovaExec(resolve, reject, CordovaFunction.RemoveFindView, [null]);
        });
    }
    updateView(barcodeFindViewJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeFindViewProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateFindView, [barcodeFindViewJson]);
        });
    }
    subscribeBarcodeFindViewListener() {
        return new Promise((_resolve, reject) => {
            NativeBarcodeFindViewProxy.cordovaExec(this.notifyListeners.bind(this), reject, CordovaFunction.RegisterBarcodeFindViewListener, null);
        });
    }
    unsubscribeBarcodeFindViewListener() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                NativeBarcodeFindViewProxy.cordovaExec(resolve, reject, CordovaFunction.UnregisterBarcodeFindViewListener, null);
            });
        });
    }
    notifyListeners(event) {
        const done = () => {
            return {};
        };
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a 'message',
            // which could happen e.g. in case of 'ok' results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        this.eventEmitter.emit(event.name, event.data);
    }
}

class NativeBarcodeCountListenerProxy extends scanditDatacaptureFrameworksCore.BaseNativeProxy {
    static get cordovaExec() {
        return Cordova.exec;
    }
    updateMode(barcodeCountJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeCountListenerProxy.cordovaExec(resolve, reject, CordovaFunction.BarcodeCountUpdateMode, [barcodeCountJson]);
        });
    }
    resetBarcodeCount() {
        return new Promise((resolve, reject) => {
            NativeBarcodeCountListenerProxy.cordovaExec(resolve, reject, CordovaFunction.ResetBarcodeCount, null);
        });
    }
    registerBarcodeCountListener() {
        return new Promise((_, reject) => {
            NativeBarcodeCountListenerProxy.cordovaExec(this.notifyListeners.bind(this), reject, CordovaFunction.RegisterBarcodeCountListener, null);
        });
    }
    setModeEnabledState(enabled) {
        NativeBarcodeCountListenerProxy.cordovaExec(null, null, CordovaFunction.SetBarcodeCountModeEnabledState, [enabled]);
    }
    updateFeedback(feedbackJson) {
        NativeBarcodeCountListenerProxy.cordovaExec(null, null, CordovaFunction.UpdateBarcodeCountFeedback, [feedbackJson]);
    }
    unregisterBarcodeCountListener() {
        return new Promise((resolve, reject) => {
            NativeBarcodeCountListenerProxy.cordovaExec(resolve, reject, CordovaFunction.UnregisterBarcodeCountListener, null);
        });
    }
    subscribeDidScan() {
        return __awaiter(this, void 0, void 0, function* () {
            // Nothing to do here
        });
    }
    subscribeDidListSessionUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            // Nothing to do here
        });
    }
    finishOnScan() {
        NativeBarcodeCountListenerProxy.cordovaExec(null, null, CordovaFunction.FinishBarcodeCountListenerOnScan, null);
    }
    startScanningPhase() {
        NativeBarcodeCountListenerProxy.cordovaExec(null, null, CordovaFunction.StartScanningPhase, null);
    }
    endScanningPhase() {
        NativeBarcodeCountListenerProxy.cordovaExec(null, null, CordovaFunction.EndScanningPhase, null);
    }
    setBarcodeCountCaptureList(captureListStr) {
        NativeBarcodeCountListenerProxy.cordovaExec(null, null, CordovaFunction.SetBarcodeCountCaptureList, [captureListStr]);
    }
    notifyListeners(event) {
        const done = () => {
            this.emitInCallback(false);
            return { enabled: this.isModeEnabled() };
        };
        this.emitInCallback(true);
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        this.eventEmitter.emit(event.name, event.data);
        return done();
    }
    emitInCallback(enabled) {
        this.eventEmitter.emit(barcode.BarcodeCountListenerEvents.inCallback, enabled);
    }
}

class NativeBarcodeCountSessionProxy {
    static get cordovaExec() {
        return Cordova.exec;
    }
    getSpatialMap() {
        return new Promise((resolve, reject) => {
            NativeBarcodeCountSessionProxy.cordovaExec(resolve, reject, CordovaFunction.GetSpatialMap, null);
        });
    }
    getSpatialMapWithHints(expectedNumberOfRows, expectedNumberOfColumns) {
        return new Promise((resolve, reject) => {
            NativeBarcodeCountSessionProxy.cordovaExec(resolve, reject, CordovaFunction.GetSpatialMapWithHints, [{ expectedNumberOfRows: expectedNumberOfRows, expectedNumberOfColumns: expectedNumberOfColumns }]);
        });
    }
    resetSession() {
        return new Promise((resolve, reject) => {
            NativeBarcodeCountSessionProxy.cordovaExec(resolve, reject, CordovaFunction.ResetBarcodeCountSession, null);
        });
    }
}

class NativeBarcodeGeneratorProxy extends scanditDatacaptureFrameworksCore.BaseNativeProxy {
    static get cordovaExec() {
        return Cordova.exec;
    }
    create(barcodeGeneratorJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeGeneratorProxy.cordovaExec(resolve, reject, CordovaFunction.CreateBarcodeGenerator, [barcodeGeneratorJson]);
        });
    }
    dispose(generatorId) {
        return new Promise((resolve, reject) => {
            NativeBarcodeGeneratorProxy.cordovaExec(resolve, reject, CordovaFunction.DisposeBarcodeGenerator, [generatorId]);
        });
    }
    generateFromBase64EncodedData(generatorId, data, imageWidth) {
        return new Promise((resolve, reject) => {
            NativeBarcodeGeneratorProxy.cordovaExec(resolve, reject, CordovaFunction.GenerateFromBase64EncodedData, [{ 'generatorId': generatorId, 'data': data, 'imageWidth': imageWidth }]);
        });
    }
    generate(generatorId, text, imageWidth) {
        return new Promise((resolve, reject) => {
            NativeBarcodeGeneratorProxy.cordovaExec(resolve, reject, CordovaFunction.GenerateFromString, [{ 'generatorId': generatorId, 'text': text, 'imageWidth': imageWidth }]);
        });
    }
}

class NativeBarcodeCountViewProxy extends scanditDatacaptureFrameworksCore.BaseNativeProxy {
    static get cordovaExec() {
        return Cordova.exec;
    }
    createView(_nativeView, viewJson) {
        const json = JSON.parse(viewJson);
        return new Promise((resolve, reject) => {
            NativeBarcodeCountViewProxy.cordovaExec(resolve, reject, CordovaFunction.CreateBarcodeCountView, [json]);
        });
    }
    removeView() {
        return new Promise((resolve, reject) => {
            NativeBarcodeCountViewProxy.cordovaExec(resolve, reject, CordovaFunction.RemoveBarcodeCountView, null);
        });
    }
    updateView(viewJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeCountViewProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateBarcodeCountView, [viewJson]);
        });
    }
    clearHighlights() {
        return new Promise((resolve, reject) => {
            NativeBarcodeCountViewProxy.cordovaExec(resolve, reject, CordovaFunction.ClearBarcodeCountViewHighlights, null);
        });
    }
    finishBrushForRecognizedBarcodeCallback(_nativeView, brushJson, trackedBarcodeIdentifier) {
        const payload = {
            brush: brushJson,
            trackedBarcodeId: trackedBarcodeIdentifier
        };
        return new Promise((resolve, reject) => {
            NativeBarcodeCountViewProxy.cordovaExec(resolve, reject, CordovaFunction.FinishBarcodeCountViewListenerBrushForRecognizedBarcode, [payload]);
        });
    }
    finishBrushForRecognizedBarcodeNotInListCallback(_nativeView, brushJson, trackedBarcodeIdentifier) {
        const payload = {
            brush: brushJson,
            trackedBarcodeId: trackedBarcodeIdentifier
        };
        return new Promise((resolve, reject) => {
            NativeBarcodeCountViewProxy.cordovaExec(resolve, reject, CordovaFunction.FinishBarcodeCountViewListenerBrushForRecognizedBarcodeNotInList, [payload]);
        });
    }
    finishBrushForAcceptedBarcodeCallback(_nativeView, brushJson, trackedBarcodeIdentifier) {
        const payload = {
            brush: brushJson,
            trackedBarcodeId: trackedBarcodeIdentifier
        };
        return new Promise((resolve, reject) => {
            NativeBarcodeCountViewProxy.cordovaExec(resolve, reject, CordovaFunction.FinishBarcodeCountViewListenerOnBrushAcceptedBarcode, [payload]);
        });
    }
    finishBrushForRejectedBarcodeCallback(_nativeView, brushJson, trackedBarcodeIdentifier) {
        const payload = {
            brush: brushJson,
            trackedBarcodeId: trackedBarcodeIdentifier
        };
        return new Promise((resolve, reject) => {
            NativeBarcodeCountViewProxy.cordovaExec(resolve, reject, CordovaFunction.FinishBarcodeCountViewListenerOnBrushRejectedBarcode, [payload]);
        });
    }
    show() {
        return new Promise((resolve, reject) => {
            NativeBarcodeCountViewProxy.cordovaExec(resolve, reject, CordovaFunction.ShowBarcodeCountView, null);
        });
    }
    hide() {
        return new Promise((resolve, reject) => {
            NativeBarcodeCountViewProxy.cordovaExec(resolve, reject, CordovaFunction.HideBarcodeCountView, null);
        });
    }
    registerBarcodeCountViewListener() {
        NativeBarcodeCountViewProxy.cordovaExec(this.notifyListeners.bind(this), null, CordovaFunction.RegisterBarcodeCountViewListener, null);
        return Promise.resolve();
    }
    registerBarcodeCountViewUiListener() {
        NativeBarcodeCountViewProxy.cordovaExec(this.notifyListeners.bind(this), null, CordovaFunction.RegisterBarcodeCountViewUiListener, null);
        return Promise.resolve();
    }
    unregisterBarcodeCountViewListener() {
        NativeBarcodeCountViewProxy.cordovaExec(null, null, CordovaFunction.UnregisterBarcodeCountViewListener, null);
        return Promise.resolve();
    }
    unregisterBarcodeCountViewUiListener() {
        NativeBarcodeCountViewProxy.cordovaExec(null, null, CordovaFunction.UnregisterBarcodeCountViewUiListener, null);
        return Promise.resolve();
    }
    setPositionAndSize(top, left, width, height, shouldBeUnderWebView) {
        return new Promise((resolve, reject) => {
            NativeBarcodeCountViewProxy.cordovaExec(resolve, reject, CordovaFunction.SetBarcodeCountViewPositionAndSize, [{ top: top, left: left, width: width, height: height, shouldBeUnderWebView: shouldBeUnderWebView }]);
        });
    }
    // This is being performed on the registerBarcodeCountViewUiListener and registerBarcodeCountViewListener
    subscribeListeners() {
        return Promise.resolve(undefined);
    }
    // This is being performed on the unregisterBarcodeCountViewUiListener and unregisterBarcodeCountViewListener
    unsubscribeListeners() {
        return Promise.resolve(undefined);
    }
    enableHardwareTrigger(hardwareTriggerKeyCode) {
        // Hardware trigger is only supported on iOS
        if (window.cordova.platformId === 'ios') {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            NativeBarcodeCountViewProxy.cordovaExec(resolve, reject, CordovaFunction.BarcodeCountViewEnableHardwareTrigger, [hardwareTriggerKeyCode]);
        });
    }
    notifyListeners(event) {
        const done = () => {
            return {};
        };
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        this.eventEmitter.emit(event.name, event.data);
        return done();
    }
}

function initBarcodeProxies() {
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodeCaptureListenerProxy', () => new NativeBarcodeCaptureListenerProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodeSelectionListenerProxy', () => new NativeBarcodeSelectionListenerProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodeSelectionProxy', () => new NativeBarcodeSelectionProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodeSelectionOverlayProxy', () => new NativeBarcodeSelectionOverlayProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodeBatchListenerProxy', () => new NativeBarcodeBatchListenerProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodeBatchBasicOverlayProxy', () => new NativeBarcodeBatchBasicOverlayProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodeBatchAdvancedOverlayProxy', () => new NativeBarcodeBatchAdvancedOverlayProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodePickProductProxy', () => new NativeBarcodePickProductProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodePickViewProxy', () => new NativeBarcodePickViewProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('SparkScanListenerProxy', () => new NativeSparkScanListenerProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('SparkScanViewProxy', () => new NativeSparkScanViewProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodePickListenerProxy', () => new NativeBarcodePickListenerProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodeFindProxy', () => new NativeBarcodeFindListenerProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodeFindViewProxy', () => new NativeBarcodeFindViewProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodeCountListenerProxy', () => new NativeBarcodeCountListenerProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodeCountViewProxy', () => new NativeBarcodeCountViewProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodeCountSessionProxy', () => new NativeBarcodeCountSessionProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodeGeneratorProxy', () => new NativeBarcodeGeneratorProxy());
}

// tslint:disable-next-line:variable-name
const Cordova = {
    pluginName: 'ScanditBarcodeCapture',
    defaults: {},
    exec: (success, error, functionName, args) => scanditCordovaDatacaptureCore.cordovaExec(success, error, Cordova.pluginName, functionName, args),
};
function getDefaults() {
    return new Promise((resolve, reject) => {
        Cordova.exec((defaultsJSON) => {
            barcode.loadBarcodeDefaults(defaultsJSON);
            barcode.loadBarcodeCaptureDefaults(defaultsJSON.BarcodeCapture);
            barcode.loadBarcodeSelectionDefaults(defaultsJSON.BarcodeSelection);
            barcode.loadBarcodeBatchDefaults(defaultsJSON.BarcodeBatch);
            barcode.loadBarcodePickDefaults(defaultsJSON.BarcodePick);
            barcode.loadSparkScanDefaults(defaultsJSON.SparkScan);
            barcode.loadBarcodeFindDefaults(defaultsJSON.BarcodeFind);
            barcode.loadBarcodeCountDefaults(defaultsJSON.BarcodeCount);
            initBarcodeProxies();
            resolve();
        }, reject, 'getDefaults', null);
    });
}
function initializeBarcodeCordova() {
    scanditCordovaDatacaptureCore.initializePlugin(Cordova.pluginName, getDefaults);
}
var CordovaFunction;
(function (CordovaFunction) {
    CordovaFunction["SubscribeBarcodeCaptureListener"] = "subscribeBarcodeCaptureListener";
    CordovaFunction["UnsubscribeBarcodeCaptureListener"] = "unsubscribeBarcodeCaptureListener";
    CordovaFunction["FinishBarcodeCaptureDidScan"] = "finishBarcodeCaptureDidScan";
    CordovaFunction["FinishBarcodeCaptureDidUpdateSession"] = "finishBarcodeCaptureDidUpdateSession";
    CordovaFunction["SetBarcodeCaptureModeEnabledState"] = "setBarcodeCaptureModeEnabledState";
    CordovaFunction["SetBarcodeSelectionModeEnabledState"] = "setBarcodeSelectionModeEnabledState";
    CordovaFunction["SubscribeBarcodeSelectionListener"] = "subscribeBarcodeSelectionListener";
    CordovaFunction["UnsubscribeBarcodeSelectionListener"] = "unsubscribeBarcodeSelectionListener";
    CordovaFunction["GetCountForBarcodeInBarcodeSelectionSession"] = "getCountForBarcodeInBarcodeSelectionSession";
    CordovaFunction["ResetBarcodeCaptureSession"] = "resetBarcodeCaptureSession";
    CordovaFunction["ResetBarcodeSelectionSession"] = "resetBarcodeSelectionSession";
    CordovaFunction["ResetBarcodeSelection"] = "resetBarcodeSelection";
    CordovaFunction["UnfreezeCameraInBarcodeSelection"] = "unfreezeCameraInBarcodeSelection";
    CordovaFunction["SelectAimedBarcode"] = "selectAimedBarcode";
    CordovaFunction["IncreaseCountForBarcodes"] = "increaseCountForBarcodes";
    CordovaFunction["UnselectBarcodes"] = "unselectBarcodes";
    CordovaFunction["SetSelectBarcodeEnabled"] = "setSelectBarcodeEnabled";
    CordovaFunction["FinishBarcodeSelectionDidUpdateSelection"] = "finishBarcodeSelectionDidUpdateSelection";
    CordovaFunction["FinishBarcodeSelectionDidUpdateSession"] = "finishBarcodeSelectionDidUpdateSession";
    CordovaFunction["UpdateBarcodeSelectionBasicOverlay"] = "updateBarcodeSelectionBasicOverlay";
    CordovaFunction["UpdateBarcodeSelectionMode"] = "updateBarcodeSelectionMode";
    CordovaFunction["ApplyBarcodeSelectionModeSettings"] = "applyBarcodeSelectionModeSettings";
    CordovaFunction["UpdateBarcodeSelectionFeedback"] = "updateBarcodeSelectionFeedback";
    CordovaFunction["UpdateBarcodeCaptureOverlay"] = "updateBarcodeCaptureOverlay";
    CordovaFunction["UpdateBarcodeCaptureMode"] = "updateBarcodeCaptureMode";
    CordovaFunction["ApplyBarcodeCaptureModeSettings"] = "applyBarcodeCaptureModeSettings";
    CordovaFunction["SetTextForAimToSelectAutoHint"] = "setTextForAimToSelectAutoHint";
    CordovaFunction["RemoveAimedBarcodeBrushProvider"] = "removeAimedBarcodeBrushProvider";
    CordovaFunction["SetAimedBarcodeBrushProvider"] = "setAimedBarcodeBrushProvider";
    CordovaFunction["FinishBrushForAimedBarcodeCallback"] = "finishBrushForAimedBarcodeCallback";
    CordovaFunction["RemoveTrackedBarcodeBrushProvider"] = "removeTrackedBarcodeBrushProvider";
    CordovaFunction["SetTrackedBarcodeBrushProvider"] = "setTrackedBarcodeBrushProvider";
    CordovaFunction["FinishBrushForTrackedBarcodeCallback"] = "finishBrushForTrackedBarcodeCallback";
    CordovaFunction["SetViewForTrackedBarcode"] = "setViewForTrackedBarcode";
    CordovaFunction["SetAnchorForTrackedBarcode"] = "setAnchorForTrackedBarcode";
    CordovaFunction["SetOffsetForTrackedBarcode"] = "setOffsetForTrackedBarcode";
    CordovaFunction["ClearTrackedBarcodeViews"] = "clearTrackedBarcodeViews";
    CordovaFunction["SetBrushForTrackedBarcode"] = "setBrushForTrackedBarcode";
    CordovaFunction["ClearTrackedBarcodeBrushes"] = "clearTrackedBarcodeBrushes";
    CordovaFunction["SetBarcodeBatchModeEnabledState"] = "setBarcodeBatchModeEnabledState";
    CordovaFunction["SubscribeBarcodeBatchListener"] = "subscribeBarcodeBatchListener";
    CordovaFunction["UnregisterBarcodeBatchListener"] = "unregisterBarcodeBatchListener";
    CordovaFunction["SubscribeBarcodeBatchAdvancedOverlayListener"] = "subscribeBarcodeBatchAdvancedOverlayListener";
    CordovaFunction["SubscribeBarcodeBatchBasicOverlayListener"] = "subscribeBarcodeBatchBasicOverlayListener";
    CordovaFunction["ResetBarcodeBatchSession"] = "resetBarcodeBatchSession";
    CordovaFunction["UpdateBarcodeBatchAdvancedOverlay"] = "updateBarcodeBatchAdvancedOverlay";
    CordovaFunction["UpdateBarcodeBatchBasicOverlay"] = "updateBarcodeBatchBasicOverlay";
    CordovaFunction["UpdateBarcodeBatchMode"] = "updateBarcodeBatchMode";
    CordovaFunction["ApplyBarcodeBatchModeSettings"] = "applyBarcodeBatchModeSettings";
    CordovaFunction["FinishBarcodeBatchDidUpdateSession"] = "finishBarcodeBatchDidUpdateSession";
    CordovaFunction["FinishBarcodeBatchBrushForTrackedBarcode"] = "finishBarcodeBatchBrushForTrackedBarcode";
    CordovaFunction["UnregisterBarcodeBatchAdvancedOverlayListener"] = "unregisterBarcodeBatchAdvancedOverlayListener";
    CordovaFunction["UnregisterBarcodeBatchBasicOverlayListener"] = "unregisterBarcodeBatchBasicOverlayListener";
    CordovaFunction["CreatePickView"] = "createPickView";
    CordovaFunction["RemovePickView"] = "removePickView";
    CordovaFunction["PickViewStart"] = "viewStart";
    CordovaFunction["PickViewStop"] = "viewStop";
    CordovaFunction["PickViewFreeze"] = "viewFreeze";
    CordovaFunction["SetPositionAndSize"] = "setPickViewPositionAndSize";
    CordovaFunction["UpdatePickView"] = "updatePickView";
    CordovaFunction["SubscribeDidPickItemListener"] = "subscribeDidPickItemListener";
    CordovaFunction["SubscribeDidUnpickItemListener"] = "subscribeDidUnpickItemListener";
    CordovaFunction["AddActionListener"] = "addActionListener";
    CordovaFunction["AddViewListener"] = "addViewListener";
    CordovaFunction["RegisterBarcodePickViewUiListener"] = "registerBarcodePickViewUiListener";
    CordovaFunction["SubscribeBarcodePickViewUiListener"] = "subscribeBarcodePickViewUiListener";
    CordovaFunction["UnsubscribeBarcodePickViewUiListener"] = "unsubscribeBarcodePickViewUiListener";
    CordovaFunction["SubscribeDidStartScanningListener"] = "subscribeDidStartScanningListener";
    CordovaFunction["SubscribeDidFreezeScanningListener"] = "subscribeDidFreezeScanningListener";
    CordovaFunction["SubscribeDidPauseScanningListener"] = "subscribeDidPauseScanningListener";
    CordovaFunction["SubscribeDidStopScanningListener"] = "subscribeDidStopScanningListener";
    CordovaFunction["FinishPickAction"] = "finishPickAction";
    CordovaFunction["UnsubscribeListeners"] = "unsubscribeListeners";
    CordovaFunction["AddScanningListener"] = "addScanningListener";
    CordovaFunction["RemoveScanningListener"] = "removeScanningListener";
    CordovaFunction["SubscribeDidCompleteScanningSessionListener"] = "subscribeDidCompleteScanningSessionListener";
    CordovaFunction["SubscribeDidUpdateScanningSessionListener"] = "subscribeDidUpdateScanningSessionListener";
    CordovaFunction["SubscribeProductIdentifierForItemsListener"] = "subscribeProductIdentifierForItemsListener";
    CordovaFunction["UnsubscribeProductIdentifierForItemsListener"] = "unsubscribeProductIdentifierForItemsListener";
    CordovaFunction["FinishOnProductIdentifierForItems"] = "finishOnProductIdentifierForItems";
    CordovaFunction["UnregisterSparkScanViewListenerEvents"] = "unregisterSparkScanViewListenerEvents";
    CordovaFunction["RegisterSparkScanViewListenerEvents"] = "registerSparkScanViewListenerEvents";
    CordovaFunction["PrepareSparkScanViewScanning"] = "prepareSparkScanViewScanning";
    CordovaFunction["StartSparkScanViewScanning"] = "startSparkScanViewScanning";
    CordovaFunction["PauseSparkScanViewScanning"] = "pauseSparkScanViewScanning";
    CordovaFunction["StopSparkScanViewScanning"] = "stopSparkScanViewScanning";
    CordovaFunction["EmitSparkScanViewFeedback"] = "emitSparkScanViewFeedback";
    CordovaFunction["FinishSparkScanDidUpdateSessionCallback"] = "finishSparkScanDidUpdateSessionCallback";
    CordovaFunction["FinishSparkScanDidScanCallback"] = "finishSparkScanDidScanCallback";
    CordovaFunction["RegisterSparkScanListenerForEvents"] = "registerSparkScanListenerForEvents";
    CordovaFunction["UnregisterSparkScanListenerForEvents"] = "unregisterSparkScanListenerForEvents";
    CordovaFunction["SetSparkScanModeEnabledState"] = "setSparkScanModeEnabledState";
    CordovaFunction["ResetSparkScanSession"] = "resetSparkScanSession";
    CordovaFunction["CreateSparkScanView"] = "createSparkScanView";
    CordovaFunction["DisposeSparkScanView"] = "disposeSparkScanView";
    CordovaFunction["UpdateSparkScanView"] = "updateSparkScanView";
    CordovaFunction["UpdateSparkScanMode"] = "updateSparkScanMode";
    CordovaFunction["ShowSparkScanView"] = "showSparkScanView";
    CordovaFunction["HideSparkScanView"] = "hideSparkScanView";
    CordovaFunction["AddSparkScanFeedbackDelegate"] = "addSparkScanFeedbackDelegate";
    CordovaFunction["RemoveSparkScanFeedbackDelegate"] = "removeSparkScanFeedbackDelegate";
    CordovaFunction["SubmitSparkScanFeedbackForBarcode"] = "submitSparkScanFeedbackForBarcode";
    CordovaFunction["ShowToast"] = "showToast";
    CordovaFunction["BarcodeFindSetItemList"] = "barcodeFindSetItemList";
    CordovaFunction["UpdateFindMode"] = "updateFindMode";
    CordovaFunction["BarcodeFindModeStart"] = "barcodeFindModeStart";
    CordovaFunction["BarcodeFindModePause"] = "barcodeFindModePause";
    CordovaFunction["BarcodeFindModeStop"] = "barcodeFindModeStop";
    CordovaFunction["SetBarcodeFindModeEnabledState"] = "setBarcodeFindModeEnabledState";
    CordovaFunction["setBarcodeFindTransformer"] = "setBarcodeFindTransformer";
    CordovaFunction["SubmitBarcodeFindTransformerResult"] = "submitBarcodeFindTransformerResult";
    CordovaFunction["RegisterBarcodeFindListener"] = "registerBarcodeFindListener";
    CordovaFunction["UnregisterBarcodeFindListener"] = "unregisterBarcodeFindListener";
    CordovaFunction["ShowFindView"] = "showFindView";
    CordovaFunction["HideFindView"] = "hideFindView";
    CordovaFunction["BarcodeFindViewOnResume"] = "barcodeFindViewOnResume";
    CordovaFunction["BarcodeFindViewStartSearching"] = "barcodeFindViewStartSearching";
    CordovaFunction["BarcodeFindViewPauseSearching"] = "barcodeFindViewPauseSearching";
    CordovaFunction["BarcodeFindViewStopSearching"] = "barcodeFindViewStopSearching";
    CordovaFunction["CreateFindView"] = "createFindView";
    CordovaFunction["RemoveFindView"] = "removeFindView";
    CordovaFunction["UpdateFindView"] = "updateFindView";
    CordovaFunction["RegisterBarcodeFindViewListener"] = "registerBarcodeFindViewListener";
    CordovaFunction["UnregisterBarcodeFindViewListener"] = "unregisterBarcodeFindViewListener";
    CordovaFunction["UpdateBarcodeFindFeedback"] = "updateBarcodeFindFeedback";
    CordovaFunction["BarcodeCountUpdateMode"] = "updateMode";
    CordovaFunction["ResetBarcodeCount"] = "resetBarcodeCount";
    CordovaFunction["RegisterBarcodeCountListener"] = "registerBarcodeCountListener";
    CordovaFunction["SetBarcodeCountModeEnabledState"] = "setBarcodeCountModeEnabledState";
    CordovaFunction["UpdateBarcodeCountFeedback"] = "updateBarcodeCountFeedback";
    CordovaFunction["UnregisterBarcodeCountListener"] = "unregisterBarcodeCountListener";
    CordovaFunction["FinishBarcodeCountListenerOnScan"] = "finishBarcodeCountListenerOnScan";
    CordovaFunction["StartScanningPhase"] = "startScanningPhase";
    CordovaFunction["EndScanningPhase"] = "endScanningPhase";
    CordovaFunction["SetBarcodeCountCaptureList"] = "setBarcodeCountCaptureList";
    CordovaFunction["GetSpatialMap"] = "getSpatialMap";
    CordovaFunction["GetSpatialMapWithHints"] = "getSpatialMapWithHints";
    CordovaFunction["ResetBarcodeCountSession"] = "resetBarcodeCountSession";
    CordovaFunction["UpdateBarcodeCountView"] = "updateBarcodeCountView";
    CordovaFunction["CreateBarcodeCountView"] = "createBarcodeCountView";
    CordovaFunction["RemoveBarcodeCountView"] = "removeBarcodeCountView";
    CordovaFunction["RegisterBarcodeCountViewUiListener"] = "registerBarcodeCountViewUiListener";
    CordovaFunction["UnregisterBarcodeCountViewUiListener"] = "unregisterBarcodeCountViewUiListener";
    CordovaFunction["RegisterBarcodeCountViewListener"] = "registerBarcodeCountViewListener";
    CordovaFunction["UnregisterBarcodeCountViewListener"] = "unregisterBarcodeCountViewListener";
    CordovaFunction["ClearBarcodeCountViewHighlights"] = "clearBarcodeCountViewHighlights";
    CordovaFunction["SetBarcodeCountViewPositionAndSize"] = "setBarcodeCountViewPositionAndSize";
    CordovaFunction["ShowBarcodeCountView"] = "showBarcodeCountView";
    CordovaFunction["HideBarcodeCountView"] = "hideBarcodeCountView";
    CordovaFunction["FinishBarcodeCountViewListenerBrushForRecognizedBarcode"] = "finishBarcodeCountViewListenerBrushForRecognizedBarcode";
    CordovaFunction["FinishBarcodeCountViewListenerBrushForRecognizedBarcodeNotInList"] = "finishBarcodeCountViewListenerBrushForRecognizedBarcodeNotInList";
    CordovaFunction["FinishBarcodeCountViewListenerOnBrushForUnrecognizedBarcode"] = "finishBarcodeCountViewListenerOnBrushForUnrecognizedBarcode";
    CordovaFunction["FinishBarcodeCountViewListenerOnBrushAcceptedBarcode"] = "finishBarcodeCountViewListenerOnBrushAcceptedBarcode";
    CordovaFunction["FinishBarcodeCountViewListenerOnBrushRejectedBarcode"] = "finishBarcodeCountViewListenerOnBrushRejectedBarcode";
    CordovaFunction["CreateBarcodeGenerator"] = "createBarcodeGenerator";
    CordovaFunction["DisposeBarcodeGenerator"] = "disposeBarcodeGenerator";
    CordovaFunction["GenerateFromBase64EncodedData"] = "generateFromBase64EncodedData";
    CordovaFunction["GenerateFromString"] = "generateFromString";
    CordovaFunction["BarcodeCountViewEnableHardwareTrigger"] = "barcodeCountViewEnableHardwareTrigger";
})(CordovaFunction || (CordovaFunction = {}));

class BarcodeFindView {
    static forMode(dataCaptureContext, barcodeFind) {
        return new BarcodeFindView(dataCaptureContext, barcodeFind);
    }
    static forModeWithViewSettings(dataCaptureContext, barcodeFind, viewSettings) {
        return new BarcodeFindView(dataCaptureContext, barcodeFind, viewSettings);
    }
    static forModeWithViewSettingsAndCameraSettings(dataCaptureContext, barcodeFind, viewSettings, cameraSettings) {
        return new BarcodeFindView(dataCaptureContext, barcodeFind, viewSettings, cameraSettings);
    }
    constructor(dataCaptureContext, barcodeFind, barcodeFindViewSettings, cameraSettings) {
        this.htmlElement = null;
        this.htmlElementState = new scanditDatacaptureFrameworksCore.HTMLElementState();
        this.domObserver = new MutationObserver(this.elementDidChange.bind(this));
        this.scrollListener = this.elementDidChange.bind(this);
        this.orientationChangeListener = (() => {
            this.elementDidChange();
            // SDC-1784 -> workaround because at the moment of this callback the element doesn't have the updated size.
            setTimeout(this.elementDidChange.bind(this), 100);
            setTimeout(this.elementDidChange.bind(this), 300);
            setTimeout(this.elementDidChange.bind(this), 1000);
        });
        this.baseBarcodeFindView = new barcode.BaseBarcodeFindView(dataCaptureContext, barcodeFind, barcodeFindViewSettings, cameraSettings, false);
        this.baseBarcodeFindView.initialize(this);
    }
    get barcodeFindViewUiListener() {
        return this.baseBarcodeFindView.barcodeFindViewUiListener;
    }
    set barcodeFindViewUiListener(value) {
        this.baseBarcodeFindView.barcodeFindViewUiListener = value;
    }
    static get hardwareTriggerSupported() {
        return barcode.BaseBarcodeFindView.hardwareTriggerSupported;
    }
    get shouldShowUserGuidanceView() {
        return this.baseBarcodeFindView.shouldShowUserGuidanceView;
    }
    set shouldShowUserGuidanceView(value) {
        this.baseBarcodeFindView.shouldShowUserGuidanceView = value;
    }
    get shouldShowHints() {
        return this.baseBarcodeFindView.shouldShowHints;
    }
    set shouldShowHints(value) {
        this.baseBarcodeFindView.shouldShowHints = value;
    }
    get shouldShowCarousel() {
        return this.baseBarcodeFindView.shouldShowCarousel;
    }
    set shouldShowCarousel(value) {
        this.baseBarcodeFindView.shouldShowCarousel = value;
    }
    get shouldShowPauseButton() {
        return this.baseBarcodeFindView.shouldShowPauseButton;
    }
    set shouldShowPauseButton(value) {
        this.baseBarcodeFindView.shouldShowPauseButton = value;
    }
    get shouldShowFinishButton() {
        return this.baseBarcodeFindView.shouldShowFinishButton;
    }
    set shouldShowFinishButton(value) {
        this.baseBarcodeFindView.shouldShowFinishButton = value;
    }
    get shouldShowProgressBar() {
        return this.baseBarcodeFindView.shouldShowProgressBar;
    }
    set shouldShowProgressBar(value) {
        this.baseBarcodeFindView.shouldShowProgressBar = value;
    }
    get shouldShowTorchControl() {
        return this.baseBarcodeFindView.shouldShowTorchControl;
    }
    set shouldShowTorchControl(value) {
        this.baseBarcodeFindView.shouldShowTorchControl = value;
    }
    get shouldShowZoomControl() {
        return this.baseBarcodeFindView.shouldShowZoomControl;
    }
    set shouldShowZoomControl(value) {
        this.baseBarcodeFindView.shouldShowZoomControl = value;
    }
    get torchControlPosition() {
        return this.baseBarcodeFindView.torchControlPosition;
    }
    set torchControlPosition(value) {
        this.baseBarcodeFindView.torchControlPosition = value;
    }
    get textForCollapseCardsButton() {
        return this.baseBarcodeFindView.textForCollapseCardsButton;
    }
    set textForCollapseCardsButton(value) {
        this.baseBarcodeFindView.textForCollapseCardsButton = value;
    }
    get textForAllItemsFoundSuccessfullyHint() {
        return this.baseBarcodeFindView.textForAllItemsFoundSuccessfullyHint;
    }
    set textForAllItemsFoundSuccessfullyHint(value) {
        this.baseBarcodeFindView.textForAllItemsFoundSuccessfullyHint = value;
    }
    get textForItemListUpdatedHint() {
        return this.baseBarcodeFindView.textForItemListUpdatedHint;
    }
    set textForItemListUpdatedHint(value) {
        this.baseBarcodeFindView.textForItemListUpdatedHint = value;
    }
    get textForItemListUpdatedWhenPausedHint() {
        return this.baseBarcodeFindView.textForItemListUpdatedWhenPausedHint;
    }
    set textForItemListUpdatedWhenPausedHint(value) {
        this.baseBarcodeFindView.textForItemListUpdatedWhenPausedHint = value;
    }
    get textForPointAtBarcodesToSearchHint() {
        return this.baseBarcodeFindView.textForPointAtBarcodesToSearchHint;
    }
    set textForPointAtBarcodesToSearchHint(value) {
        this.baseBarcodeFindView.textForPointAtBarcodesToSearchHint = value;
    }
    get textForMoveCloserToBarcodesHint() {
        return this.baseBarcodeFindView.textForMoveCloserToBarcodesHint;
    }
    set textForMoveCloserToBarcodesHint(value) {
        this.baseBarcodeFindView.textForMoveCloserToBarcodesHint = value;
    }
    get textForTapShutterToPauseScreenHint() {
        return this.baseBarcodeFindView.textForTapShutterToPauseScreenHint;
    }
    set textForTapShutterToPauseScreenHint(value) {
        this.baseBarcodeFindView.textForTapShutterToPauseScreenHint = value;
    }
    get textForTapShutterToResumeSearchHint() {
        return this.baseBarcodeFindView.textForTapShutterToResumeSearchHint;
    }
    set textForTapShutterToResumeSearchHint(value) {
        this.baseBarcodeFindView.textForTapShutterToResumeSearchHint = value;
    }
    stopSearching() {
        return this.baseBarcodeFindView.stopSearching();
    }
    startSearching() {
        return this.baseBarcodeFindView.startSearching();
    }
    pauseSearching() {
        return this.baseBarcodeFindView.pauseSearching();
    }
    connectToElement(element) {
        this.baseBarcodeFindView.createNativeView().then(() => {
            this.htmlElement = element;
            this.htmlElementState = new scanditDatacaptureFrameworksCore.HTMLElementState();
            // Initial update
            this.elementDidChange();
            this.subscribeToChangesOnHTMLElement();
        });
    }
    detachFromElement() {
        this.baseBarcodeFindView.removeNativeView().then(() => {
            this.unsubscribeFromChangesOnHTMLElement();
            this.htmlElement = null;
            this.elementDidChange();
        });
    }
    show() {
        if (this.htmlElement) {
            throw new Error("Views should only be manually shown if they're manually sized using setFrame");
        }
        return this._show();
    }
    hide() {
        if (this.htmlElement) {
            throw new Error("Views should only be manually hidden if they're manually sized using setFrame");
        }
        return this._hide();
    }
    subscribeToChangesOnHTMLElement() {
        this.domObserver.observe(document, { attributes: true, childList: true, subtree: true });
        window.addEventListener('scroll', this.scrollListener);
        window.addEventListener('orientationchange', this.orientationChangeListener);
    }
    unsubscribeFromChangesOnHTMLElement() {
        this.domObserver.disconnect();
        window.removeEventListener('scroll', this.scrollListener);
        window.removeEventListener('orientationchange', this.orientationChangeListener);
    }
    elementDidChange() {
        if (!this.htmlElement) {
            this.htmlElementState = new scanditDatacaptureFrameworksCore.HTMLElementState();
            return;
        }
        const newState = new scanditDatacaptureFrameworksCore.HTMLElementState();
        const boundingRect = this.htmlElement.getBoundingClientRect();
        newState.position = new scanditDatacaptureFrameworksCore.HtmlElementPosition(boundingRect.top, boundingRect.left);
        newState.size = new scanditDatacaptureFrameworksCore.HtmlElementSize(boundingRect.width, boundingRect.height);
        newState.shouldBeUnderContent = parseInt(this.htmlElement.style.zIndex || '1', 10) < 0
            || parseInt(getComputedStyle(this.htmlElement).zIndex || '1', 10) < 0;
        const isDisplayed = getComputedStyle(this.htmlElement).display !== 'none'
            && this.htmlElement.style.display !== 'none';
        const isInDOM = document.body.contains(this.htmlElement);
        newState.isShown = isDisplayed && isInDOM && !this.htmlElement.hidden;
        this.htmlElementState = newState;
    }
    _show() {
        return this.baseBarcodeFindView.show();
    }
    _hide() {
        return this.baseBarcodeFindView.hide();
    }
    toJSON() {
        return this.baseBarcodeFindView.toJSON();
    }
}

class BarcodePickView extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor(props) {
        super();
        this.htmlElement = null;
        this._htmlElementState = new scanditDatacaptureFrameworksCore.HTMLElementState();
        this.domObserver = new MutationObserver(this.elementDidChange.bind(this));
        this.scrollListener = this.elementDidChange.bind(this);
        this.orientationChangeListener = (() => {
            this.elementDidChange();
            // SDC-1784 -> workaround because at the moment of this callback the element doesn't have the updated size.
            setTimeout(this.elementDidChange.bind(this), 100);
            setTimeout(this.elementDidChange.bind(this), 300);
            setTimeout(this.elementDidChange.bind(this), 1000);
        });
        this.baseBarcodePickView = new barcode.BaseBarcodePickView({
            context: props.context,
            barcodePick: props.barcodePick,
            settings: props.settings,
            cameraSettings: props.cameraSettings,
            autoCreateNativeView: false
        });
        this.viewProxy = scanditDatacaptureFrameworksCore.FactoryMaker.getInstance('BarcodePickViewProxy');
        this.baseBarcodePickView.initialize(this);
    }
    get uiListener() {
        return this.baseBarcodePickView.uiListener;
    }
    set uiListener(value) {
        this.baseBarcodePickView.uiListener = value;
    }
    set htmlElementState(newState) {
        const didChangeShown = this._htmlElementState.isShown !== newState.isShown;
        const didChangePositionOrSize = this._htmlElementState.didChangeComparedTo(newState);
        this._htmlElementState = newState;
        if (didChangePositionOrSize) {
            this.updatePositionAndSize();
        }
        if (didChangeShown) {
            if (this._htmlElementState.isShown) {
                this.start();
            }
        }
    }
    get htmlElementState() {
        return this._htmlElementState;
    }
    connectToElement(element) {
        this.baseBarcodePickView.createNativeView().then(() => {
            this.htmlElement = element;
            this.htmlElementState = new scanditDatacaptureFrameworksCore.HTMLElementState();
            // Initial update
            this.elementDidChange();
            this.subscribeToChangesOnHTMLElement();
        });
    }
    detachFromElement() {
        this.baseBarcodePickView.removeNativeView().then(() => {
            this.unsubscribeFromChangesOnHTMLElement();
            this.htmlElement = null;
            this.elementDidChange();
        });
    }
    subscribeToChangesOnHTMLElement() {
        this.domObserver.observe(document, { attributes: true, childList: true, subtree: true });
        window.addEventListener('scroll', this.scrollListener);
        window.addEventListener('orientationchange', this.orientationChangeListener);
    }
    unsubscribeFromChangesOnHTMLElement() {
        this.domObserver.disconnect();
        window.removeEventListener('scroll', this.scrollListener);
        window.removeEventListener('orientationchange', this.orientationChangeListener);
    }
    elementDidChange() {
        if (!this.htmlElement) {
            this.htmlElementState = new scanditDatacaptureFrameworksCore.HTMLElementState();
            return;
        }
        const newState = new scanditDatacaptureFrameworksCore.HTMLElementState();
        const boundingRect = this.htmlElement.getBoundingClientRect();
        newState.position = new scanditDatacaptureFrameworksCore.HtmlElementPosition(boundingRect.top, boundingRect.left);
        newState.size = new scanditDatacaptureFrameworksCore.HtmlElementSize(boundingRect.width, boundingRect.height);
        newState.shouldBeUnderContent = parseInt(this.htmlElement.style.zIndex || '1', 10) < 0
            || parseInt(getComputedStyle(this.htmlElement).zIndex || '1', 10) < 0;
        const isDisplayed = getComputedStyle(this.htmlElement).display !== 'none'
            && this.htmlElement.style.display !== 'none';
        const isInDOM = document.body.contains(this.htmlElement);
        newState.isShown = isDisplayed && isInDOM && !this.htmlElement.hidden;
        this.htmlElementState = newState;
    }
    updatePositionAndSize() {
        if (!this.htmlElementState || !this.htmlElementState.isValid) {
            return;
        }
        this.viewProxy.setPositionAndSize(this.htmlElementState.position.top, this.htmlElementState.position.left, this.htmlElementState.size.width, this.htmlElementState.size.height, this.htmlElementState.shouldBeUnderContent);
    }
    start() {
        this.baseBarcodePickView.start();
    }
    freeze() {
        this.baseBarcodePickView.freeze();
    }
    stop() {
        this.baseBarcodePickView.stop();
    }
    addListener(listener) {
        this.baseBarcodePickView.addListener(listener);
    }
    removeListener(listener) {
        this.baseBarcodePickView.removeListener(listener);
    }
    addActionListener(listener) {
        this.baseBarcodePickView.addActionListener(listener);
    }
    removeActionListener(listener) {
        this.baseBarcodePickView.removeActionListener(listener);
    }
    release() {
        this.baseBarcodePickView.dispose();
    }
}
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePickView.prototype, "baseBarcodePickView", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePickView.prototype, "viewProxy", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePickView.prototype, "htmlElement", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePickView.prototype, "_htmlElementState", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePickView.prototype, "domObserver", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePickView.prototype, "scrollListener", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePickView.prototype, "orientationChangeListener", void 0);

class TrackedBarcodeView extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static withHTMLElement(element, options) {
        return this.getEncodedImageData(element).then(data => new TrackedBarcodeView(data, options));
    }
    static withBase64EncodedData(data, options) {
        return Promise.resolve(new TrackedBarcodeView(data, options));
    }
    static getEncodedImageData(element) {
        return this.getBase64DataForSVG(this.getSVGDataForElement(element));
    }
    static getSize(element) {
        const isInDOM = document.body.contains(element);
        if (!isInDOM) {
            document.body.appendChild(element);
        }
        const size = element.getBoundingClientRect();
        if (!isInDOM) {
            document.body.removeChild(element);
        }
        return new scanditDatacaptureFrameworksCore.Size(size.width, size.height);
    }
    static getSVGDataForElement(element) {
        const size = this.getSize(element);
        const data = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}px" height="${size.height}px">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">
            ${element.outerHTML}
          </div>
        </foreignObject>
      </svg>`);
        return { data, size };
    }
    static getCanvasWithSize(size) {
        const canvas = document.createElement('canvas');
        canvas.width = size.width;
        canvas.height = size.height;
        return canvas;
    }
    static getBase64DataForSVG(svgData) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                const canvas = this.getCanvasWithSize(svgData.size);
                canvas.getContext('2d').drawImage(image, 0, 0);
                resolve(canvas.toDataURL('image/png', 1));
            };
            image.onerror = reject;
            image.src = 'data:image/svg+xml,' + svgData.data;
        });
    }
    constructor(encodedData, options) {
        super();
        if (options == null) {
            options = { scale: 1 };
        }
        this.data = encodedData;
        this.options = options;
    }
}

class BarcodeBatchAdvancedOverlay {
    get type() {
        return this.baseBarcodeBatchOverlay.type;
    }
    get shouldShowScanAreaGuides() {
        return this.baseBarcodeBatchOverlay.shouldShowScanAreaGuides;
    }
    set shouldShowScanAreaGuides(shouldShow) {
        this.baseBarcodeBatchOverlay.shouldShowScanAreaGuides = shouldShow;
    }
    get listener() {
        return this.baseBarcodeBatchOverlay.listener;
    }
    set listener(listener) {
        this.baseBarcodeBatchOverlay.listener = listener;
    }
    static withBarcodeBatchForView(barcodeBatch, view) {
        const overlay = new BarcodeBatchAdvancedOverlay();
        overlay.baseBarcodeBatchOverlay.initialize(barcodeBatch, view);
        return overlay;
    }
    constructor() {
        this.baseBarcodeBatchOverlay = new barcode.BaseBarcodeBatchAdvancedOverlay();
    }
    setViewForTrackedBarcode(view, trackedBarcode) {
        return this.baseBarcodeBatchOverlay.setViewForTrackedBarcode(view, trackedBarcode);
    }
    setAnchorForTrackedBarcode(anchor, trackedBarcode) {
        return this.baseBarcodeBatchOverlay.setAnchorForTrackedBarcode(anchor, trackedBarcode);
    }
    setOffsetForTrackedBarcode(offset, trackedBarcode) {
        return this.baseBarcodeBatchOverlay.setOffsetForTrackedBarcode(offset, trackedBarcode);
    }
    clearTrackedBarcodeViews() {
        return this.baseBarcodeBatchOverlay.clearTrackedBarcodeViews();
    }
    toJSON() {
        return this.baseBarcodeBatchOverlay.toJSON();
    }
}

class SparkScanView {
    get uiListener() {
        return this.baseSparkScanView.uiListener;
    }
    set uiListener(newValue) {
        this.baseSparkScanView.uiListener = newValue;
    }
    static forContext(context, sparkScan, settings) {
        const view = new SparkScanView({ context, sparkScan, settings });
        return view;
    }
    static get defaultBrush() {
        return barcode.BaseSparkScanView.defaultBrush;
    }
    constructor({ context, sparkScan, settings }) {
        this.baseSparkScanView = barcode.BaseSparkScanView.forContext(context, sparkScan, settings);
    }
    get previewSizeControlVisible() {
        return this.baseSparkScanView.previewSizeControlVisible;
    }
    set previewSizeControlVisible(newValue) {
        this.baseSparkScanView.previewSizeControlVisible = newValue;
    }
    get torchButtonVisible() {
        return this.baseSparkScanView.torchButtonVisible;
    }
    set torchButtonVisible(newValue) {
        this.baseSparkScanView.torchButtonVisible = newValue;
    }
    get scanningBehaviorButtonVisible() {
        return this.baseSparkScanView.scanningBehaviorButtonVisible;
    }
    set scanningBehaviorButtonVisible(newValue) {
        this.baseSparkScanView.scanningBehaviorButtonVisible = newValue;
    }
    get barcodeCountButtonVisible() {
        return this.baseSparkScanView.barcodeCountButtonVisible;
    }
    set barcodeCountButtonVisible(newValue) {
        this.baseSparkScanView.barcodeCountButtonVisible = newValue;
    }
    get barcodeFindButtonVisible() {
        return this.baseSparkScanView.barcodeFindButtonVisible;
    }
    set barcodeFindButtonVisible(newValue) {
        this.baseSparkScanView.barcodeFindButtonVisible = newValue;
    }
    get targetModeButtonVisible() {
        return this.baseSparkScanView.targetModeButtonVisible;
    }
    set targetModeButtonVisible(newValue) {
        this.baseSparkScanView.targetModeButtonVisible = newValue;
    }
    /**
     * @deprecated The trigger button no longer displays text.
     */
    get stopCapturingText() {
        return this.baseSparkScanView.stopCapturingText;
    }
    /**
     * @deprecated The trigger button no longer displays text.
     */
    set stopCapturingText(newValue) {
        this.baseSparkScanView.stopCapturingText = newValue;
    }
    /**
     * @deprecated The trigger button no longer displays text.
     */
    get startCapturingText() {
        return this.baseSparkScanView.startCapturingText;
    }
    /**
     * @deprecated The trigger button no longer displays text.
     */
    set startCapturingText(newValue) {
        this.baseSparkScanView.startCapturingText = newValue;
    }
    /**
     * @deprecated The trigger button no longer displays text.
     */
    get resumeCapturingText() {
        return this.baseSparkScanView.resumeCapturingText;
    }
    /**
     * @deprecated The trigger button no longer displays text.
     */
    set resumeCapturingText(newValue) {
        this.baseSparkScanView.resumeCapturingText = newValue;
    }
    /**
     * @deprecated The trigger button no longer displays text.
     */
    get scanningCapturingText() {
        return this.baseSparkScanView.scanningCapturingText;
    }
    /**
     * @deprecated The trigger button no longer displays text.
     */
    set scanningCapturingText(newValue) {
        this.baseSparkScanView.scanningCapturingText = newValue;
    }
    /**
     * @deprecated This property is not relevant anymore.
     */
    get captureButtonActiveBackgroundColor() {
        return this.baseSparkScanView.captureButtonActiveBackgroundColor;
    }
    /**
     * @deprecated This property is not relevant anymore.
     */
    set captureButtonActiveBackgroundColor(newValue) {
        this.baseSparkScanView.captureButtonActiveBackgroundColor = newValue;
    }
    /**
     * @deprecated use triggerButtonCollapsedColor and triggerButtonExpandedColor instead.
     */
    get captureButtonBackgroundColor() {
        return this.baseSparkScanView.captureButtonBackgroundColor;
    }
    /**
     * @deprecated use triggerButtonCollapsedColor and triggerButtonExpandedColor instead.
     */
    set captureButtonBackgroundColor(newValue) {
        this.baseSparkScanView.captureButtonBackgroundColor = newValue;
    }
    /**
     * @deprecated use triggerButtonTintColor instead.
     */
    get captureButtonTintColor() {
        return this.baseSparkScanView.captureButtonTintColor;
    }
    /**
     * @deprecated use triggerButtonTintColor instead.
     */
    set captureButtonTintColor(newValue) {
        this.baseSparkScanView.captureButtonTintColor = newValue;
    }
    get toolbarBackgroundColor() {
        return this.baseSparkScanView.toolbarBackgroundColor;
    }
    set toolbarBackgroundColor(newValue) {
        this.baseSparkScanView.toolbarBackgroundColor = newValue;
    }
    get toolbarIconActiveTintColor() {
        return this.baseSparkScanView.toolbarIconActiveTintColor;
    }
    set toolbarIconActiveTintColor(newValue) {
        this.baseSparkScanView.toolbarIconActiveTintColor = newValue;
    }
    get toolbarIconInactiveTintColor() {
        return this.baseSparkScanView.toolbarIconInactiveTintColor;
    }
    set toolbarIconInactiveTintColor(newValue) {
        this.baseSparkScanView.toolbarIconInactiveTintColor = newValue;
    }
    get cameraSwitchButtonVisible() {
        return this.baseSparkScanView.cameraSwitchButtonVisible;
    }
    set cameraSwitchButtonVisible(newValue) {
        this.baseSparkScanView.cameraSwitchButtonVisible = newValue;
    }
    get torchControlVisible() {
        return this.baseSparkScanView.torchControlVisible;
    }
    set torchControlVisible(newValue) {
        this.baseSparkScanView.torchControlVisible = newValue;
    }
    get previewCloseControlVisible() {
        return this.baseSparkScanView.previewCloseControlVisible;
    }
    set previewCloseControlVisible(newValue) {
        this.baseSparkScanView.previewCloseControlVisible = newValue;
    }
    get triggerButtonAnimationColor() {
        return this.baseSparkScanView.triggerButtonAnimationColor;
    }
    set triggerButtonAnimationColor(newValue) {
        this.baseSparkScanView.triggerButtonAnimationColor = newValue;
    }
    get triggerButtonExpandedColor() {
        return this.baseSparkScanView.triggerButtonExpandedColor;
    }
    set triggerButtonExpandedColor(newValue) {
        this.baseSparkScanView.triggerButtonExpandedColor = newValue;
    }
    get triggerButtonCollapsedColor() {
        return this.baseSparkScanView.triggerButtonCollapsedColor;
    }
    set triggerButtonCollapsedColor(newValue) {
        this.baseSparkScanView.triggerButtonCollapsedColor = newValue;
    }
    get triggerButtonTintColor() {
        return this.baseSparkScanView.triggerButtonTintColor;
    }
    set triggerButtonTintColor(newValue) {
        this.baseSparkScanView.triggerButtonTintColor = newValue;
    }
    get triggerButtonVisible() {
        return this.baseSparkScanView.triggerButtonVisible;
    }
    set triggerButtonVisible(newValue) {
        this.baseSparkScanView.triggerButtonVisible = newValue;
    }
    get triggerButtonImage() {
        return this.baseSparkScanView.triggerButtonImage;
    }
    set triggerButtonImage(newValue) {
        this.baseSparkScanView.triggerButtonImage = newValue;
    }
    prepareScanning() {
        this.baseSparkScanView.prepareScanning();
    }
    startScanning() {
        this.baseSparkScanView.startScanning();
    }
    pauseScanning() {
        this.baseSparkScanView.pauseScanning();
    }
    stopScanning() {
        this.baseSparkScanView.stopScanning();
    }
    dispose() {
        this.baseSparkScanView.dispose();
    }
    show() {
        return this.baseSparkScanView.show();
    }
    hide() {
        return this.baseSparkScanView.hide();
    }
    get feedbackDelegate() {
        return this.baseSparkScanView.feedbackDelegate;
    }
    set feedbackDelegate(delegate) {
        this.baseSparkScanView.feedbackDelegate = delegate;
    }
    showToast(text) {
        return this.baseSparkScanView.showToast(text);
    }
    toJSON() {
        return this.baseSparkScanView.toJSON();
    }
}

const BarcodeCountDefaults = {
    get BarcodeCountView() {
        const defaults = barcode.getBarcodeCountDefaults();
        return defaults.BarcodeCountView;
    }
};
class BarcodeCountView {
    static get defaultRecognizedBrush() {
        return barcode.BaseBarcodeCountView.defaultRecognizedBrush;
    }
    static get defaultNotInListBrush() {
        return barcode.BaseBarcodeCountView.defaultNotInListBrush;
    }
    static get defaultAcceptedBrush() {
        return barcode.BaseBarcodeCountView.defaultAcceptedBrush;
    }
    static get defaultRejectedBrush() {
        return barcode.BaseBarcodeCountView.defaultRejectedBrush;
    }
    static get hardwareTriggerSupported() {
        return barcode.BaseBarcodeCountView.hardwareTriggerSupported;
    }
    get uiListener() {
        return this.baseBarcodeCountView.uiListener;
    }
    set uiListener(listener) {
        this.baseBarcodeCountView.uiListener = listener;
    }
    get listener() {
        return this.baseBarcodeCountView.listener;
    }
    set listener(listener) {
        this.baseBarcodeCountView.listener = listener;
    }
    get shouldShowUserGuidanceView() {
        return this.baseBarcodeCountView.shouldShowUserGuidanceView;
    }
    set shouldShowUserGuidanceView(newValue) {
        this.baseBarcodeCountView.shouldShowUserGuidanceView = newValue;
    }
    get shouldShowListButton() {
        return this.baseBarcodeCountView.shouldShowListButton;
    }
    set shouldShowListButton(newValue) {
        this.baseBarcodeCountView.shouldShowListButton = newValue;
    }
    get shouldDisableModeOnExitButtonTapped() {
        return this.baseBarcodeCountView.shouldDisableModeOnExitButtonTapped;
    }
    set shouldDisableModeOnExitButtonTapped(newValue) {
        this.baseBarcodeCountView.shouldDisableModeOnExitButtonTapped = newValue;
    }
    get shouldShowExitButton() {
        return this.baseBarcodeCountView.shouldShowExitButton;
    }
    set shouldShowExitButton(newValue) {
        this.baseBarcodeCountView.shouldShowExitButton = newValue;
    }
    get shouldShowShutterButton() {
        return this.baseBarcodeCountView.shouldShowShutterButton;
    }
    set shouldShowShutterButton(newValue) {
        this.baseBarcodeCountView.shouldShowShutterButton = newValue;
    }
    get shouldShowHints() {
        return this.baseBarcodeCountView.shouldShowHints;
    }
    set shouldShowHints(newValue) {
        this.baseBarcodeCountView.shouldShowHints = newValue;
    }
    get shouldShowClearHighlightsButton() {
        return this.baseBarcodeCountView.shouldShowClearHighlightsButton;
    }
    set shouldShowClearHighlightsButton(newValue) {
        this.baseBarcodeCountView.shouldShowClearHighlightsButton = newValue;
    }
    get shouldShowSingleScanButton() {
        return this.baseBarcodeCountView.shouldShowSingleScanButton;
    }
    set shouldShowSingleScanButton(newValue) {
        this.baseBarcodeCountView.shouldShowSingleScanButton = newValue;
    }
    get shouldShowFloatingShutterButton() {
        return this.baseBarcodeCountView.shouldShowFloatingShutterButton;
    }
    set shouldShowFloatingShutterButton(newValue) {
        this.baseBarcodeCountView.shouldShowFloatingShutterButton = newValue;
    }
    get shouldShowToolbar() {
        return this.baseBarcodeCountView.shouldShowToolbar;
    }
    set shouldShowToolbar(newValue) {
        this.baseBarcodeCountView.shouldShowToolbar = newValue;
    }
    get shouldShowScanAreaGuides() {
        return this.baseBarcodeCountView.shouldShowScanAreaGuides;
    }
    set shouldShowScanAreaGuides(newValue) {
        this.baseBarcodeCountView.shouldShowScanAreaGuides = newValue;
    }
    get recognizedBrush() {
        return this.baseBarcodeCountView.recognizedBrush;
    }
    set recognizedBrush(newValue) {
        this.baseBarcodeCountView.recognizedBrush = newValue;
    }
    get notInListBrush() {
        return this.baseBarcodeCountView.notInListBrush;
    }
    set notInListBrush(newValue) {
        this.baseBarcodeCountView.notInListBrush = newValue;
    }
    get acceptedBrush() {
        return this.baseBarcodeCountView.acceptedBrush;
    }
    set acceptedBrush(newValue) {
        this.baseBarcodeCountView.acceptedBrush = newValue;
    }
    get rejectedBrush() {
        return this.baseBarcodeCountView.rejectedBrush;
    }
    set rejectedBrush(newValue) {
        this.baseBarcodeCountView.rejectedBrush = newValue;
    }
    get filterSettings() {
        return this.baseBarcodeCountView.filterSettings;
    }
    set filterSettings(newValue) {
        this.baseBarcodeCountView.filterSettings = newValue;
    }
    get style() {
        return this.baseBarcodeCountView.style;
    }
    get listButtonAccessibilityHint() {
        return this.baseBarcodeCountView.listButtonAccessibilityHint;
    }
    set listButtonAccessibilityHint(newValue) {
        this.baseBarcodeCountView.listButtonAccessibilityHint = newValue;
    }
    get listButtonAccessibilityLabel() {
        return this.baseBarcodeCountView.listButtonAccessibilityLabel;
    }
    set listButtonAccessibilityLabel(newValue) {
        this.baseBarcodeCountView.listButtonAccessibilityLabel = newValue;
    }
    get listButtonContentDescription() {
        return this.baseBarcodeCountView.listButtonContentDescription;
    }
    set listButtonContentDescription(newValue) {
        this.baseBarcodeCountView.listButtonContentDescription = newValue;
    }
    get exitButtonAccessibilityHint() {
        return this.baseBarcodeCountView.exitButtonAccessibilityHint;
    }
    set exitButtonAccessibilityHint(newValue) {
        this.baseBarcodeCountView.exitButtonAccessibilityHint = newValue;
    }
    get exitButtonAccessibilityLabel() {
        return this.baseBarcodeCountView.exitButtonAccessibilityLabel;
    }
    set exitButtonAccessibilityLabel(newValue) {
        this.baseBarcodeCountView.exitButtonAccessibilityLabel = newValue;
    }
    get exitButtonContentDescription() {
        return this.baseBarcodeCountView.exitButtonContentDescription;
    }
    set exitButtonContentDescription(newValue) {
        this.baseBarcodeCountView.exitButtonContentDescription = newValue;
    }
    get shutterButtonAccessibilityHint() {
        return this.baseBarcodeCountView.shutterButtonAccessibilityHint;
    }
    set shutterButtonAccessibilityHint(newValue) {
        this.baseBarcodeCountView.shutterButtonAccessibilityHint = newValue;
    }
    get shutterButtonAccessibilityLabel() {
        return this.baseBarcodeCountView.shutterButtonAccessibilityLabel;
    }
    set shutterButtonAccessibilityLabel(newValue) {
        this.baseBarcodeCountView.shutterButtonAccessibilityLabel = newValue;
    }
    get shutterButtonContentDescription() {
        return this.baseBarcodeCountView.shutterButtonContentDescription;
    }
    set shutterButtonContentDescription(newValue) {
        this.baseBarcodeCountView.shutterButtonContentDescription = newValue;
    }
    get floatingShutterButtonAccessibilityHint() {
        return this.baseBarcodeCountView.floatingShutterButtonAccessibilityHint;
    }
    set floatingShutterButtonAccessibilityHint(newValue) {
        this.baseBarcodeCountView.floatingShutterButtonAccessibilityHint = newValue;
    }
    get floatingShutterButtonAccessibilityLabel() {
        return this.baseBarcodeCountView.floatingShutterButtonAccessibilityLabel;
    }
    set floatingShutterButtonAccessibilityLabel(newValue) {
        this.baseBarcodeCountView.floatingShutterButtonAccessibilityLabel = newValue;
    }
    get floatingShutterButtonContentDescription() {
        return this.baseBarcodeCountView.floatingShutterButtonContentDescription;
    }
    set floatingShutterButtonContentDescription(newValue) {
        this.baseBarcodeCountView.floatingShutterButtonContentDescription = newValue;
    }
    get clearHighlightsButtonAccessibilityHint() {
        return this.baseBarcodeCountView.clearHighlightsButtonAccessibilityHint;
    }
    set clearHighlightsButtonAccessibilityHint(newValue) {
        this.baseBarcodeCountView.clearHighlightsButtonAccessibilityHint = newValue;
    }
    get clearHighlightsButtonAccessibilityLabel() {
        return this.baseBarcodeCountView.clearHighlightsButtonAccessibilityLabel;
    }
    set clearHighlightsButtonAccessibilityLabel(newValue) {
        this.baseBarcodeCountView.clearHighlightsButtonAccessibilityLabel = newValue;
    }
    get clearHighlightsButtonContentDescription() {
        return this.baseBarcodeCountView.clearHighlightsButtonContentDescription;
    }
    set clearHighlightsButtonContentDescription(newValue) {
        this.baseBarcodeCountView.clearHighlightsButtonContentDescription = newValue;
    }
    get singleScanButtonAccessibilityHint() {
        return this.baseBarcodeCountView.singleScanButtonAccessibilityHint;
    }
    set singleScanButtonAccessibilityHint(newValue) {
        this.baseBarcodeCountView.singleScanButtonAccessibilityHint = newValue;
    }
    get singleScanButtonAccessibilityLabel() {
        return this.baseBarcodeCountView.singleScanButtonAccessibilityLabel;
    }
    set singleScanButtonAccessibilityLabel(newValue) {
        this.baseBarcodeCountView.singleScanButtonAccessibilityLabel = newValue;
    }
    get singleScanButtonContentDescription() {
        return this.baseBarcodeCountView.singleScanButtonContentDescription;
    }
    set singleScanButtonContentDescription(newValue) {
        this.baseBarcodeCountView.singleScanButtonContentDescription = newValue;
    }
    get clearHighlightsButtonText() {
        return this.baseBarcodeCountView.clearHighlightsButtonText;
    }
    set clearHighlightsButtonText(newValue) {
        this.baseBarcodeCountView.clearHighlightsButtonText = newValue;
    }
    get exitButtonText() {
        return this.baseBarcodeCountView.exitButtonText;
    }
    set exitButtonText(newValue) {
        this.baseBarcodeCountView.exitButtonText = newValue;
    }
    get textForTapShutterToScanHint() {
        return this.baseBarcodeCountView.textForTapShutterToScanHint;
    }
    set textForTapShutterToScanHint(newValue) {
        this.baseBarcodeCountView.textForTapShutterToScanHint = newValue;
    }
    get textForScanningHint() {
        return this.baseBarcodeCountView.textForScanningHint;
    }
    set textForScanningHint(newValue) {
        this.baseBarcodeCountView.textForScanningHint = newValue;
    }
    get textForMoveCloserAndRescanHint() {
        return this.baseBarcodeCountView.textForMoveCloserAndRescanHint;
    }
    set textForMoveCloserAndRescanHint(newValue) {
        this.baseBarcodeCountView.textForMoveCloserAndRescanHint = newValue;
    }
    get textForMoveFurtherAndRescanHint() {
        return this.baseBarcodeCountView.textForMoveFurtherAndRescanHint;
    }
    set textForMoveFurtherAndRescanHint(newValue) {
        this.baseBarcodeCountView.textForMoveFurtherAndRescanHint = newValue;
    }
    get shouldShowListProgressBar() {
        return this.baseBarcodeCountView.shouldShowListProgressBar;
    }
    set shouldShowListProgressBar(newValue) {
        this.baseBarcodeCountView.shouldShowListProgressBar = newValue;
    }
    get shouldShowTorchControl() {
        return this.baseBarcodeCountView.shouldShowTorchControl;
    }
    set shouldShowTorchControl(newValue) {
        this.baseBarcodeCountView.shouldShowTorchControl = newValue;
    }
    get torchControlPosition() {
        return this.baseBarcodeCountView.torchControlPosition;
    }
    set torchControlPosition(newValue) {
        this.baseBarcodeCountView.torchControlPosition = newValue;
    }
    get textForTapToUncountHint() {
        return this.baseBarcodeCountView.textForTapToUncountHint;
    }
    set textForTapToUncountHint(newValue) {
        this.baseBarcodeCountView.textForTapToUncountHint = newValue;
    }
    get tapToUncountEnabled() {
        return this.baseBarcodeCountView.tapToUncountEnabled;
    }
    set tapToUncountEnabled(newValue) {
        this.baseBarcodeCountView.tapToUncountEnabled = newValue;
    }
    get barcodeNotInListActionSettings() {
        return this.baseBarcodeCountView.barcodeNotInListActionSettings;
    }
    set barcodeNotInListActionSettings(newValue) {
        this.baseBarcodeCountView.barcodeNotInListActionSettings = newValue;
    }
    get hardwareTriggerEnabled() {
        return this.baseBarcodeCountView.hardwareTriggerEnabled;
    }
    set hardwareTriggerEnabled(newValue) {
        this.baseBarcodeCountView.hardwareTriggerEnabled = newValue;
    }
    set htmlElementState(newState) {
        const didChangeShown = this._htmlElementState.isShown !== newState.isShown;
        const didChangePositionOrSize = this._htmlElementState.didChangeComparedTo(newState);
        this._htmlElementState = newState;
        if (didChangePositionOrSize) {
            this.updatePositionAndSize();
        }
        if (didChangeShown) {
            if (this._htmlElementState.isShown) {
                this._show();
            }
            else {
                this._hide();
            }
        }
    }
    get htmlElementState() {
        return this._htmlElementState;
    }
    static forContextWithMode(context, barcodeCount) {
        const style = BarcodeCountDefaults.BarcodeCountView.style;
        const view = new BarcodeCountView({ context, barcodeCount, style });
        return view;
    }
    static forContextWithModeAndStyle(context, barcodeCount, style) {
        const view = new BarcodeCountView({ context, barcodeCount, style });
        return view;
    }
    constructor({ context, barcodeCount, style }) {
        this.htmlElement = null;
        this._htmlElementState = new scanditDatacaptureFrameworksCore.HTMLElementState();
        this.scrollListener = this.elementDidChange.bind(this);
        this.domObserver = new MutationObserver(this.elementDidChange.bind(this));
        this.orientationChangeListener = (() => {
            this.elementDidChange();
            // SDC-1784 -> workaround because at the moment of this callback the element doesn't have the updated size.
            setTimeout(this.elementDidChange.bind(this), 100);
            setTimeout(this.elementDidChange.bind(this), 300);
            setTimeout(this.elementDidChange.bind(this), 1000);
        });
        this.baseBarcodeCountView = new barcode.BaseBarcodeCountView({
            context,
            barcodeCount,
            style,
            nativeView: this,
            autoCreateNativeView: false
        });
    }
    clearHighlights() {
        return this.baseBarcodeCountView.clearHighlights();
    }
    setToolbarSettings(settings) {
        this.baseBarcodeCountView.setToolbarSettings(settings);
    }
    connectToElement(element) {
        this.baseBarcodeCountView.createNativeView().then(() => {
            this.htmlElement = element;
            this.htmlElementState = new scanditDatacaptureFrameworksCore.HTMLElementState();
            // Initial update
            this.elementDidChange();
            this.subscribeToChangesOnHTMLElement();
        });
    }
    detachFromElement() {
        this.baseBarcodeCountView.removeNativeView().then(() => {
            this.unsubscribeFromChangesOnHTMLElement();
            this.htmlElement = null;
            this.elementDidChange();
        });
    }
    setFrame(frame, isUnderContent = false) {
        return this.baseBarcodeCountView.setPositionAndSize(frame.origin.y, frame.origin.x, frame.size.width, frame.size.height, isUnderContent);
    }
    show() {
        if (this.htmlElement) {
            throw new Error("Views should only be manually shown if they're manually sized using setFrame");
        }
        return this._show();
    }
    hide() {
        if (this.htmlElement) {
            throw new Error("Views should only be manually hidden if they're manually sized using setFrame");
        }
        return this._hide();
    }
    setBrushForRecognizedBarcode(trackedBarcode, brush) {
        return this.baseBarcodeCountView.setBrushForRecognizedBarcode(trackedBarcode, brush);
    }
    setBrushForRecognizedBarcodeNotInList(trackedBarcode, brush) {
        return this.baseBarcodeCountView.setBrushForRecognizedBarcodeNotInList(trackedBarcode, brush);
    }
    setBrushForAcceptedBarcode(trackedBarcode, brush) {
        return this.baseBarcodeCountView.setBrushForAcceptedBarcode(trackedBarcode, brush);
    }
    setBrushForRejectedBarcode(trackedBarcode, brush) {
        return this.baseBarcodeCountView.setBrushForRejectedBarcode(trackedBarcode, brush);
    }
    enableHardwareTrigger(hardwareTriggerKeyCode) {
        return this.baseBarcodeCountView.enableHardwareTrigger(hardwareTriggerKeyCode);
    }
    subscribeToChangesOnHTMLElement() {
        this.domObserver.observe(document, { attributes: true, childList: true, subtree: true });
        window.addEventListener('scroll', this.scrollListener);
        window.addEventListener('orientationchange', this.orientationChangeListener);
    }
    unsubscribeFromChangesOnHTMLElement() {
        this.domObserver.disconnect();
        window.removeEventListener('scroll', this.scrollListener);
        window.removeEventListener('orientationchange', this.orientationChangeListener);
    }
    elementDidChange() {
        if (!this.htmlElement) {
            this.htmlElementState = new scanditDatacaptureFrameworksCore.HTMLElementState();
            return;
        }
        const newState = new scanditDatacaptureFrameworksCore.HTMLElementState();
        const boundingRect = this.htmlElement.getBoundingClientRect();
        newState.position = new scanditDatacaptureFrameworksCore.HtmlElementPosition(boundingRect.top, boundingRect.left);
        newState.size = new scanditDatacaptureFrameworksCore.HtmlElementSize(boundingRect.width, boundingRect.height);
        newState.shouldBeUnderContent = parseInt(this.htmlElement.style.zIndex || '1', 10) < 0
            || parseInt(getComputedStyle(this.htmlElement).zIndex || '1', 10) < 0;
        const isDisplayed = getComputedStyle(this.htmlElement).display !== 'none'
            && this.htmlElement.style.display !== 'none';
        const isInDOM = document.body.contains(this.htmlElement);
        newState.isShown = isDisplayed && isInDOM && !this.htmlElement.hidden;
        this.htmlElementState = newState;
    }
    updatePositionAndSize() {
        if (!this.htmlElementState || !this.htmlElementState.isValid) {
            return;
        }
        this.baseBarcodeCountView.setPositionAndSize(this.htmlElementState.position.top, this.htmlElementState.position.left, this.htmlElementState.size.width, this.htmlElementState.size.height, this.htmlElementState.shouldBeUnderContent);
    }
    _show() {
        return this.baseBarcodeCountView.show();
    }
    _hide() {
        return this.baseBarcodeCountView.hide();
    }
    toJSON() {
        return this.baseBarcodeCountView.toJSON();
    }
}
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCountView.prototype, "htmlElement", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCountView.prototype, "_htmlElementState", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCountView.prototype, "scrollListener", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCountView.prototype, "domObserver", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCountView.prototype, "orientationChangeListener", void 0);

initializeBarcodeCordova();

exports.ArucoDictionary = barcode.ArucoDictionary;
Object.defineProperty(exports, "ArucoDictionaryPreset", {
    enumerable: true,
    get: function () { return barcode.ArucoDictionaryPreset; }
});
exports.ArucoMarker = barcode.ArucoMarker;
exports.Barcode = barcode.Barcode;
exports.BarcodeBatch = barcode.BarcodeBatch;
exports.BarcodeBatchBasicOverlay = barcode.BarcodeBatchBasicOverlay;
Object.defineProperty(exports, "BarcodeBatchBasicOverlayStyle", {
    enumerable: true,
    get: function () { return barcode.BarcodeBatchBasicOverlayStyle; }
});
Object.defineProperty(exports, "BarcodeBatchScenario", {
    enumerable: true,
    get: function () { return barcode.BarcodeBatchScenario; }
});
exports.BarcodeBatchSession = barcode.BarcodeBatchSession;
exports.BarcodeBatchSettings = barcode.BarcodeBatchSettings;
exports.BarcodeCapture = barcode.BarcodeCapture;
exports.BarcodeCaptureFeedback = barcode.BarcodeCaptureFeedback;
exports.BarcodeCaptureOverlay = barcode.BarcodeCaptureOverlay;
Object.defineProperty(exports, "BarcodeCaptureOverlayStyle", {
    enumerable: true,
    get: function () { return barcode.BarcodeCaptureOverlayStyle; }
});
exports.BarcodeCaptureSession = barcode.BarcodeCaptureSession;
exports.BarcodeCaptureSettings = barcode.BarcodeCaptureSettings;
exports.BarcodeCount = barcode.BarcodeCount;
exports.BarcodeCountCaptureList = barcode.BarcodeCountCaptureList;
exports.BarcodeCountCaptureListSession = barcode.BarcodeCountCaptureListSession;
exports.BarcodeCountFeedback = barcode.BarcodeCountFeedback;
exports.BarcodeCountNotInListActionSettings = barcode.BarcodeCountNotInListActionSettings;
exports.BarcodeCountSession = barcode.BarcodeCountSession;
exports.BarcodeCountSettings = barcode.BarcodeCountSettings;
exports.BarcodeCountToolbarSettings = barcode.BarcodeCountToolbarSettings;
Object.defineProperty(exports, "BarcodeCountViewStyle", {
    enumerable: true,
    get: function () { return barcode.BarcodeCountViewStyle; }
});
exports.BarcodeFilterHighlightSettingsBrush = barcode.BarcodeFilterHighlightSettingsBrush;
Object.defineProperty(exports, "BarcodeFilterHighlightType", {
    enumerable: true,
    get: function () { return barcode.BarcodeFilterHighlightType; }
});
exports.BarcodeFilterSettings = barcode.BarcodeFilterSettings;
exports.BarcodeFind = barcode.BarcodeFind;
exports.BarcodeFindFeedback = barcode.BarcodeFindFeedback;
exports.BarcodeFindItem = barcode.BarcodeFindItem;
exports.BarcodeFindItemContent = barcode.BarcodeFindItemContent;
exports.BarcodeFindItemSearchOptions = barcode.BarcodeFindItemSearchOptions;
exports.BarcodeFindSettings = barcode.BarcodeFindSettings;
exports.BarcodeFindViewSettings = barcode.BarcodeFindViewSettings;
exports.BarcodeGenerator = barcode.BarcodeGenerator;
exports.BarcodeGeneratorBuilder = barcode.BarcodeGeneratorBuilder;
exports.BarcodePick = barcode.BarcodePick;
exports.BarcodePickActionCallback = barcode.BarcodePickActionCallback;
exports.BarcodePickAsyncMapperProductProvider = barcode.BarcodePickAsyncMapperProductProvider;
Object.defineProperty(exports, "BarcodePickIconStyle", {
    enumerable: true,
    get: function () { return barcode.BarcodePickIconStyle; }
});
exports.BarcodePickProduct = barcode.BarcodePickProduct;
exports.BarcodePickProductProviderCallback = barcode.BarcodePickProductProviderCallback;
exports.BarcodePickProductProviderCallbackItem = barcode.BarcodePickProductProviderCallbackItem;
exports.BarcodePickScanningSession = barcode.BarcodePickScanningSession;
exports.BarcodePickSettings = barcode.BarcodePickSettings;
Object.defineProperty(exports, "BarcodePickState", {
    enumerable: true,
    get: function () { return barcode.BarcodePickState; }
});
exports.BarcodePickStatusIconSettings = barcode.BarcodePickStatusIconSettings;
exports.BarcodePickViewSettings = barcode.BarcodePickViewSettings;
exports.BarcodeSelection = barcode.BarcodeSelection;
exports.BarcodeSelectionAimerSelection = barcode.BarcodeSelectionAimerSelection;
exports.BarcodeSelectionAutoSelectionStrategy = barcode.BarcodeSelectionAutoSelectionStrategy;
exports.BarcodeSelectionBasicOverlay = barcode.BarcodeSelectionBasicOverlay;
Object.defineProperty(exports, "BarcodeSelectionBasicOverlayStyle", {
    enumerable: true,
    get: function () { return barcode.BarcodeSelectionBasicOverlayStyle; }
});
exports.BarcodeSelectionFeedback = barcode.BarcodeSelectionFeedback;
Object.defineProperty(exports, "BarcodeSelectionFreezeBehavior", {
    enumerable: true,
    get: function () { return barcode.BarcodeSelectionFreezeBehavior; }
});
exports.BarcodeSelectionManualSelectionStrategy = barcode.BarcodeSelectionManualSelectionStrategy;
exports.BarcodeSelectionSession = barcode.BarcodeSelectionSession;
exports.BarcodeSelectionSettings = barcode.BarcodeSelectionSettings;
Object.defineProperty(exports, "BarcodeSelectionTapBehavior", {
    enumerable: true,
    get: function () { return barcode.BarcodeSelectionTapBehavior; }
});
exports.BarcodeSelectionTapSelection = barcode.BarcodeSelectionTapSelection;
exports.BarcodeSpatialGrid = barcode.BarcodeSpatialGrid;
Object.defineProperty(exports, "BatterySavingMode", {
    enumerable: true,
    get: function () { return barcode.BatterySavingMode; }
});
Object.defineProperty(exports, "Checksum", {
    enumerable: true,
    get: function () { return barcode.Checksum; }
});
exports.Code128BarcodeGeneratorBuilder = barcode.Code128BarcodeGeneratorBuilder;
exports.Code39BarcodeGeneratorBuilder = barcode.Code39BarcodeGeneratorBuilder;
Object.defineProperty(exports, "CompositeFlag", {
    enumerable: true,
    get: function () { return barcode.CompositeFlag; }
});
Object.defineProperty(exports, "CompositeType", {
    enumerable: true,
    get: function () { return barcode.CompositeType; }
});
exports.DataMatrixBarcodeGeneratorBuilder = barcode.DataMatrixBarcodeGeneratorBuilder;
exports.Dot = barcode.Dot;
exports.DotWithIcons = barcode.DotWithIcons;
exports.Ean13BarcodeGeneratorBuilder = barcode.Ean13BarcodeGeneratorBuilder;
exports.Ean13UpcaClassification = barcode.Ean13UpcaClassification;
exports.EncodingRange = barcode.EncodingRange;
exports.InterleavedTwoOfFiveBarcodeGeneratorBuilder = barcode.InterleavedTwoOfFiveBarcodeGeneratorBuilder;
exports.LocalizedOnlyBarcode = barcode.LocalizedOnlyBarcode;
exports.QrCodeBarcodeGeneratorBuilder = barcode.QrCodeBarcodeGeneratorBuilder;
Object.defineProperty(exports, "QrCodeErrorCorrectionLevel", {
    enumerable: true,
    get: function () { return barcode.QrCodeErrorCorrectionLevel; }
});
exports.Range = barcode.Range;
exports.Rectangular = barcode.Rectangular;
exports.RectangularWithIcons = barcode.RectangularWithIcons;
exports.SparkScan = barcode.SparkScan;
exports.SparkScanBarcodeErrorFeedback = barcode.SparkScanBarcodeErrorFeedback;
exports.SparkScanBarcodeFeedback = barcode.SparkScanBarcodeFeedback;
exports.SparkScanBarcodeSuccessFeedback = barcode.SparkScanBarcodeSuccessFeedback;
Object.defineProperty(exports, "SparkScanMiniPreviewSize", {
    enumerable: true,
    get: function () { return barcode.SparkScanMiniPreviewSize; }
});
Object.defineProperty(exports, "SparkScanPreviewBehavior", {
    enumerable: true,
    get: function () { return barcode.SparkScanPreviewBehavior; }
});
Object.defineProperty(exports, "SparkScanScanningBehavior", {
    enumerable: true,
    get: function () { return barcode.SparkScanScanningBehavior; }
});
exports.SparkScanScanningModeDefault = barcode.SparkScanScanningModeDefault;
exports.SparkScanScanningModeTarget = barcode.SparkScanScanningModeTarget;
exports.SparkScanSession = barcode.SparkScanSession;
exports.SparkScanSettings = barcode.SparkScanSettings;
exports.SparkScanToastSettings = barcode.SparkScanToastSettings;
exports.SparkScanViewSettings = barcode.SparkScanViewSettings;
Object.defineProperty(exports, "SparkScanViewState", {
    enumerable: true,
    get: function () { return barcode.SparkScanViewState; }
});
exports.StructuredAppendData = barcode.StructuredAppendData;
Object.defineProperty(exports, "Symbology", {
    enumerable: true,
    get: function () { return barcode.Symbology; }
});
exports.SymbologyDescription = barcode.SymbologyDescription;
exports.SymbologySettings = barcode.SymbologySettings;
exports.TargetBarcode = barcode.TargetBarcode;
exports.TrackedBarcode = barcode.TrackedBarcode;
exports.UpcaBarcodeGeneratorBuilder = barcode.UpcaBarcodeGeneratorBuilder;
exports.BarcodeBatchAdvancedOverlay = BarcodeBatchAdvancedOverlay;
exports.BarcodeCountView = BarcodeCountView;
exports.BarcodeFindView = BarcodeFindView;
exports.BarcodePickView = BarcodePickView;
exports.SparkScanView = SparkScanView;
exports.TrackedBarcodeView = TrackedBarcodeView;
