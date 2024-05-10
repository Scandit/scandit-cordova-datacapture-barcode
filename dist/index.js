var barcode = require('scandit-cordova-datacapture-barcode.Barcode');
var scanditCordovaDatacaptureCore = require('scandit-cordova-datacapture-core.Core');
var scanditDatacaptureFrameworksCore = require('scandit-cordova-datacapture-core.Core');

var BarcodeCaptureListenerEvent;
(function (BarcodeCaptureListenerEvent) {
    BarcodeCaptureListenerEvent["DidScan"] = "BarcodeCaptureListener.didScan";
    BarcodeCaptureListenerEvent["DidUpdateSession"] = "BarcodeCaptureListener.didUpdateSession";
})(BarcodeCaptureListenerEvent || (BarcodeCaptureListenerEvent = {}));
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
        switch (event.name) {
            case BarcodeCaptureListenerEvent.DidScan:
                this.eventEmitter.emit(barcode.BarcodeCaptureListenerEvents.didScan, JSON.stringify(event.argument));
                break;
            case BarcodeCaptureListenerEvent.DidUpdateSession:
                this.eventEmitter.emit(barcode.BarcodeCaptureListenerEvents.didUpdateSession, JSON.stringify(event.argument));
                break;
        }
        return done();
    }
}

var BarcodeSelectionListenerEvent;
(function (BarcodeSelectionListenerEvent) {
    BarcodeSelectionListenerEvent["DidUpdateSelection"] = "BarcodeSelectionListener.didUpdateSelection";
    BarcodeSelectionListenerEvent["DidUpdateSession"] = "BarcodeSelectionListener.didUpdateSession";
})(BarcodeSelectionListenerEvent || (BarcodeSelectionListenerEvent = {}));
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
        switch (event.name) {
            case BarcodeSelectionListenerEvent.DidUpdateSelection:
                this.eventEmitter.emit(barcode.BarcodeSelectionListenerEvents.didUpdateSelection, JSON.stringify(event.argument));
                break;
            case BarcodeSelectionListenerEvent.DidUpdateSession:
                this.eventEmitter.emit(barcode.BarcodeSelectionListenerEvents.didUpdateSession, JSON.stringify(event.argument));
                break;
        }
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
        switch (event.name) {
            case barcode.BarcodeSelectionBrushProviderEvents.brushForAimedBarcode:
                this.eventEmitter.emit(barcode.BarcodeSelectionBrushProviderEvents.brushForAimedBarcode, JSON.stringify(event.argument));
                break;
            case barcode.BarcodeSelectionBrushProviderEvents.brushForTrackedBarcode:
                this.eventEmitter.emit(barcode.BarcodeSelectionBrushProviderEvents.brushForAimedBarcode, JSON.stringify(event.argument));
                break;
        }
        return done();
    }
}

var BarcodeTrackingListenerEvent;
(function (BarcodeTrackingListenerEvent) {
    BarcodeTrackingListenerEvent["DidUpdateSession"] = "BarcodeTrackingListener.didUpdateSession";
})(BarcodeTrackingListenerEvent || (BarcodeTrackingListenerEvent = {}));
class NativeBarcodeTrackingListenerProxy extends scanditDatacaptureFrameworksCore.BaseNativeProxy {
    constructor() {
        super(...arguments);
        this.isModeEnabled = () => false;
    }
    static get cordovaExec() {
        return Cordova.exec;
    }
    resetSession() {
        return new Promise((resolve, reject) => {
            NativeBarcodeTrackingListenerProxy.cordovaExec(resolve, reject, CordovaFunction.ResetBarcodeTrackingSession, null);
        });
    }
    registerListenerForEvents() {
        NativeBarcodeTrackingListenerProxy.cordovaExec(this.notifyListeners.bind(this), null, CordovaFunction.SubscribeBarcodeTrackingListener, null);
    }
    unregisterListenerForEvents() {
        NativeBarcodeTrackingListenerProxy.cordovaExec(this.notifyListeners.bind(this), null, CordovaFunction.UnregisterBarcodeTrackingListener, null);
    }
    setModeEnabledState(enabled) {
        NativeBarcodeTrackingListenerProxy.cordovaExec(null, null, CordovaFunction.SetBarcodeTrackingModeEnabledState, [{ 'enabled': enabled }]);
    }
    updateBarcodeTrackingMode(modeJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeTrackingListenerProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateBarcodeTrackingMode, [modeJson]);
        });
    }
    applyBarcodeTrackingModeSettings(newSettingsJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeTrackingListenerProxy.cordovaExec(resolve, reject, CordovaFunction.ApplyBarcodeTrackingModeSettings, [newSettingsJson]);
        });
    }
    finishDidUpdateSessionCallback(enabled) {
        NativeBarcodeTrackingListenerProxy.cordovaExec(null, null, CordovaFunction.FinishBarcodeTrackingDidUpdateSession, [{ 'enabled': enabled }]);
    }
    notifyListeners(event) {
        const done = () => {
            this.eventEmitter.emit(barcode.BarcodeTrackingListenerEvents.inCallback, false);
            return { enabled: this.isModeEnabled() };
        };
        this.eventEmitter.emit(barcode.BarcodeTrackingListenerEvents.inCallback, true);
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        switch (event.name) {
            case BarcodeTrackingListenerEvent.DidUpdateSession:
                this.eventEmitter.emit(barcode.BarcodeTrackingListenerEvents.didUpdateSession, JSON.stringify(event.argument));
                break;
        }
        return done();
    }
}

var BarcodeTrackingBasicOverlayListenerEvent;
(function (BarcodeTrackingBasicOverlayListenerEvent) {
    BarcodeTrackingBasicOverlayListenerEvent["BrushForTrackedBarcode"] = "BarcodeTrackingBasicOverlayListener.brushForTrackedBarcode";
    BarcodeTrackingBasicOverlayListenerEvent["DidTapTrackedBarcode"] = "BarcodeTrackingBasicOverlayListener.didTapTrackedBarcode";
})(BarcodeTrackingBasicOverlayListenerEvent || (BarcodeTrackingBasicOverlayListenerEvent = {}));
class NativeBarcodeTrackingBasicOverlayProxy extends scanditDatacaptureFrameworksCore.BaseNativeProxy {
    static get cordovaExec() {
        return Cordova.exec;
    }
    setBrushForTrackedBarcode(brushJson, trackedBarcodeIdentifier, sessionFrameSequenceID) {
        return new Promise((resolve, reject) => {
            NativeBarcodeTrackingBasicOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.SetBrushForTrackedBarcode, [{
                    brush: brushJson,
                    sessionFrameSequenceID: sessionFrameSequenceID,
                    trackedBarcodeID: trackedBarcodeIdentifier,
                }]);
        });
    }
    clearTrackedBarcodeBrushes() {
        return new Promise((resolve, reject) => {
            NativeBarcodeTrackingBasicOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.ClearTrackedBarcodeBrushes, null);
        });
    }
    registerListenerForBasicOverlayEvents() {
        NativeBarcodeTrackingBasicOverlayProxy.cordovaExec(this.notifyListeners.bind(this), null, CordovaFunction.SubscribeBarcodeTrackingBasicOverlayListener, null);
    }
    updateBarcodeTrackingBasicOverlay(overlayJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeTrackingBasicOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateBarcodeTrackingBasicOverlay, [overlayJson]);
        });
    }
    unregisterListenerForBasicOverlayEvents() {
        return new Promise((resolve, reject) => {
            NativeBarcodeTrackingBasicOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.UnregisterBarcodeTrackingBasicOverlayListener, null);
        });
    }
    notifyListeners(event) {
        if (!event) {
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return null;
        }
        switch (event.name) {
            case BarcodeTrackingBasicOverlayListenerEvent.BrushForTrackedBarcode:
                this.eventEmitter.emit(barcode.BarcodeTrackingBasicOverlayListenerEvents.brushForTrackedBarcode, JSON.stringify(event.argument));
                break;
            case BarcodeTrackingBasicOverlayListenerEvent.DidTapTrackedBarcode:
                this.eventEmitter.emit(barcode.BarcodeTrackingBasicOverlayListenerEvents.didTapTrackedBarcode, JSON.stringify(event.argument));
                break;
        }
        return null;
    }
}

var BarcodeTrackingAdvancedOverlayListenerEvent;
(function (BarcodeTrackingAdvancedOverlayListenerEvent) {
    BarcodeTrackingAdvancedOverlayListenerEvent["ViewForTrackedBarcode"] = "BarcodeTrackingAdvancedOverlayListener.viewForTrackedBarcode";
    BarcodeTrackingAdvancedOverlayListenerEvent["AnchorForTrackedBarcode"] = "BarcodeTrackingAdvancedOverlayListener.anchorForTrackedBarcode";
    BarcodeTrackingAdvancedOverlayListenerEvent["OffsetForTrackedBarcode"] = "BarcodeTrackingAdvancedOverlayListener.offsetForTrackedBarcode";
    BarcodeTrackingAdvancedOverlayListenerEvent["DidTapViewForTrackedBarcode"] = "BarcodeTrackingAdvancedOverlayListener.didTapViewForTrackedBarcode";
})(BarcodeTrackingAdvancedOverlayListenerEvent || (BarcodeTrackingAdvancedOverlayListenerEvent = {}));
class NativeBarcodeTrackingAdvancedOverlayProxy extends scanditDatacaptureFrameworksCore.BaseNativeProxy {
    static get cordovaExec() {
        return Cordova.exec;
    }
    setBrushForTrackedBarcode(_brushJson, _sessionFrameSequenceID, _trackedBarcodeIdentifier) {
        return Promise.resolve();
    }
    setViewForTrackedBarcode(viewJson, trackedBarcodeIdentifier, sessionFrameSequenceID) {
        return new Promise((resolve, reject) => {
            NativeBarcodeTrackingAdvancedOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.SetViewForTrackedBarcode, [{
                    view: viewJson,
                    sessionFrameSequenceID: sessionFrameSequenceID === null || sessionFrameSequenceID === void 0 ? void 0 : sessionFrameSequenceID.toString(),
                    trackedBarcodeID: trackedBarcodeIdentifier.toString(),
                }]);
        });
    }
    setAnchorForTrackedBarcode(anchor, trackedBarcodeIdentifier, sessionFrameSequenceID) {
        return new Promise((resolve, reject) => {
            NativeBarcodeTrackingAdvancedOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.SetAnchorForTrackedBarcode, [{
                    anchor,
                    sessionFrameSequenceID: sessionFrameSequenceID === null || sessionFrameSequenceID === void 0 ? void 0 : sessionFrameSequenceID.toString(),
                    trackedBarcodeID: trackedBarcodeIdentifier.toString(),
                }]);
        });
    }
    setOffsetForTrackedBarcode(offsetJson, trackedBarcodeIdentifier, sessionFrameSequenceID) {
        return new Promise((resolve, reject) => {
            NativeBarcodeTrackingAdvancedOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.SetOffsetForTrackedBarcode, [{
                    offset: offsetJson,
                    sessionFrameSequenceID: sessionFrameSequenceID === null || sessionFrameSequenceID === void 0 ? void 0 : sessionFrameSequenceID.toString(),
                    trackedBarcodeID: trackedBarcodeIdentifier.toString(),
                }]);
        });
    }
    clearTrackedBarcodeViews() {
        return new Promise((resolve, reject) => {
            NativeBarcodeTrackingAdvancedOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.ClearTrackedBarcodeViews, null);
        });
    }
    registerListenerForAdvancedOverlayEvents() {
        NativeBarcodeTrackingAdvancedOverlayProxy.cordovaExec(this.notifyListeners.bind(this), null, CordovaFunction.SubscribeBarcodeTrackingAdvancedOverlayListener, null);
    }
    updateBarcodeTrackingAdvancedOverlay(overlayJson) {
        return new Promise((resolve, reject) => {
            NativeBarcodeTrackingAdvancedOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateBarcodeTrackingAdvancedOverlay, [overlayJson]);
        });
    }
    unregisterListenerForAdvancedOverlayEvents() {
        return new Promise((resolve, reject) => {
            NativeBarcodeTrackingAdvancedOverlayProxy.cordovaExec(resolve, reject, CordovaFunction.UnregisterBarcodeTrackingAdvancedOverlayListener, null);
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
        switch (event.name) {
            case BarcodeTrackingAdvancedOverlayListenerEvent.ViewForTrackedBarcode:
                this.eventEmitter.emit(barcode.BarcodeTrackingAdvancedOverlayListenerEvents.viewForTrackedBarcode, JSON.stringify(event.argument));
                break;
            case BarcodeTrackingAdvancedOverlayListenerEvent.AnchorForTrackedBarcode:
                this.eventEmitter.emit(barcode.BarcodeTrackingAdvancedOverlayListenerEvents.anchorForTrackedBarcode, JSON.stringify(event.argument));
                break;
            case BarcodeTrackingAdvancedOverlayListenerEvent.OffsetForTrackedBarcode:
                this.eventEmitter.emit(barcode.BarcodeTrackingAdvancedOverlayListenerEvents.offsetForTrackedBarcode, JSON.stringify(event.argument));
                break;
            case BarcodeTrackingAdvancedOverlayListenerEvent.DidTapViewForTrackedBarcode:
                this.eventEmitter.emit(barcode.BarcodeTrackingAdvancedOverlayListenerEvents.didTapViewForTrackedBarcode, JSON.stringify(event.argument));
                break;
        }
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
        this.eventEmitter.emit(barcode.BarcodePickEvents.OnProductIdentifierForItems, JSON.stringify(event));
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
    viewStart() {
        return new Promise((resolve, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(resolve, reject, CordovaFunction.PickViewStart, null);
        });
    }
    viewPause() {
        return new Promise((resolve, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(resolve, reject, CordovaFunction.PickViewPause, null);
        });
    }
    viewFreeze() {
        return new Promise((resolve, reject) => {
            NativeBarcodePickViewProxy.cordovaExec(resolve, reject, CordovaFunction.PickViewFreeze, null);
        });
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
        this.eventEmitter.emit(barcode.BarcodePickEvents.DidPick, JSON.stringify(event.argument));
    }
    didUnpickItemListenerHandler(event) {
        this.eventEmitter.emit(barcode.BarcodePickEvents.DidUnpick, JSON.stringify(event.argument));
    }
    viewUiListenerHandler(event) {
        this.eventEmitter.emit(barcode.BarcodePickViewUiListenerEvents.DidTapFinishButton, JSON.stringify(event.argument));
    }
    didStartScanningListenerHandler(event) {
        this.eventEmitter.emit(barcode.BarcodePickViewListenerEvents.DidStartScanning, JSON.stringify(event.argument));
    }
    didFreezeScanningListenerHandler(event) {
        this.eventEmitter.emit(barcode.BarcodePickViewListenerEvents.DidFreezeScanning, JSON.stringify(event.argument));
    }
    didPauseScanningListenerHandler(event) {
        this.eventEmitter.emit(barcode.BarcodePickViewListenerEvents.DidPauseScanning, JSON.stringify(event.argument));
    }
    didStopScanningListenerHandler(event) {
        this.eventEmitter.emit(barcode.BarcodePickViewListenerEvents.DidStopScanning, JSON.stringify(event.argument));
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
        new Promise((resolve, reject) => {
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
        new Promise((resolve, reject) => {
            NativeSparkScanListenerProxy.cordovaExec(resolve, reject, CordovaFunction.SetSparkScanModeEnabledState, [enabled]);
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
        switch (event.name) {
            case barcode.SparkScanListenerEvents.didScan:
                this.eventEmitter.emit(barcode.SparkScanListenerEvents.didScan, JSON.stringify(event.argument));
                break;
            case barcode.SparkScanListenerEvents.didUpdateSession:
                this.eventEmitter.emit(barcode.SparkScanListenerEvents.didUpdateSession, JSON.stringify(event.argument));
                break;
        }
        return done();
    }
}

class NativeSparkScanViewProxy extends scanditDatacaptureFrameworksCore.BaseNativeProxy {
    static get cordovaExec() {
        return Cordova.exec;
    }
    updateSparkScanView(viewJson) {
        return new Promise((resolve, reject) => {
            NativeSparkScanViewProxy.cordovaExec(resolve, reject, CordovaFunction.UpdateSparkScanView, [viewJson]);
        });
    }
    createSparkScanView(viewJson) {
        return new Promise((resolve, reject) => {
            NativeSparkScanViewProxy.cordovaExec(resolve, reject, CordovaFunction.CreateSparkScanView, [viewJson]);
        });
    }
    subscribeListeners() {
        throw new Error("Method not implemented.");
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
    emitSparkScanViewFeedback(feedbackJson) {
        return new Promise((resolve, reject) => {
            NativeSparkScanViewProxy.cordovaExec(resolve, reject, CordovaFunction.EmitSparkScanViewFeedback, [feedbackJson]);
        });
    }
    registerSparkScanViewListenerEvents() {
        NativeSparkScanViewProxy.cordovaExec(this.notifyListeners.bind(this), null, CordovaFunction.RegisterSparkScanViewListenerEvents, null);
    }
    unregisterListenerForViewEvents() {
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
            // The event could be undefined/null in case the plugin result did not pass a "message",
            // which could happen e.g. in case of "ok" results, which could signal e.g. successful
            // listener subscriptions.
            return done();
        }
        event = Object.assign(Object.assign(Object.assign({}, event), event.argument), { argument: undefined });
        switch (event.name) {
            case barcode.SparkScanViewEvents.barcodeCountButtonTapped:
                this.eventEmitter.emit(barcode.SparkScanViewEvents.barcodeCountButtonTapped);
                break;
            case barcode.SparkScanViewEvents.fastFindButtonTapped:
                this.eventEmitter.emit(barcode.SparkScanViewEvents.fastFindButtonTapped);
                break;
        }
        return done();
    }
    registerDelegateForEvents() {
        NativeSparkScanViewProxy.cordovaExec(this.onFeedbackForBarcodeHandler.bind(this), null, CordovaFunction.AddSparkScanFeedbackDelegate, null);
    }
    unregisteDelegateForEvents() {
        NativeSparkScanViewProxy.cordovaExec(null, null, CordovaFunction.RemoveSparkScanFeedbackDelegate, null);
    }
    submitFeedbackForBarcode(feedbackJson) {
        NativeSparkScanViewProxy.cordovaExec(null, null, CordovaFunction.SubmitSparkScanFeedbackForBarcode, [feedbackJson]);
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
        this.eventEmitter.emit(barcode.SparkScanFeedbackDelegateEvents.feedbackForBarcode, event.argument.barcode);
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
        this.eventEmitter.emit(barcode.BarcodePickListenerEvents.DidCompleteScanningSession, JSON.stringify(event.argument));
    }
    didUpdateScanningSessionListenerHandler(event) {
        this.eventEmitter.emit(barcode.BarcodePickListenerEvents.DidUpdateScanningSession, JSON.stringify(event.argument));
    }
}

function initBarcodeProxies() {
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodeCaptureListenerProxy', () => new NativeBarcodeCaptureListenerProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodeSelectionListenerProxy', () => new NativeBarcodeSelectionListenerProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodeSelectionProxy', () => new NativeBarcodeSelectionProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodeSelectionOverlayProxy', () => new NativeBarcodeSelectionOverlayProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodeTrackingListenerProxy', () => new NativeBarcodeTrackingListenerProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodeTrackingBasicOverlayProxy', () => new NativeBarcodeTrackingBasicOverlayProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodeTrackingAdvancedOverlayProxy', () => new NativeBarcodeTrackingAdvancedOverlayProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodePickProductProxy', () => new NativeBarcodePickProductProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodePickViewProxy', () => new NativeBarcodePickViewProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('SparkScanListenerProxy', () => new NativeSparkScanListenerProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('SparkScanViewProxy', () => new NativeSparkScanViewProxy());
    scanditDatacaptureFrameworksCore.FactoryMaker.bindLazyInstance('BarcodePickListenerProxy', () => new NativeBarcodePickListenerProxy());
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
            barcode.loadBarcodeTrackingDefaults(defaultsJSON.BarcodeTracking);
            barcode.loadBarcodePickDefaults(defaultsJSON.BarcodePick);
            barcode.loadSparkScanDefaults(defaultsJSON.SparkScan);
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
    CordovaFunction["SetBarcodeTrackingModeEnabledState"] = "setBarcodeTrackingModeEnabledState";
    CordovaFunction["SubscribeBarcodeTrackingListener"] = "subscribeBarcodeTrackingListener";
    CordovaFunction["UnregisterBarcodeTrackingListener"] = "unregisterBarcodeTrackingListener";
    CordovaFunction["SubscribeBarcodeTrackingAdvancedOverlayListener"] = "subscribeBarcodeTrackingAdvancedOverlayListener";
    CordovaFunction["SubscribeBarcodeTrackingBasicOverlayListener"] = "subscribeBarcodeTrackingBasicOverlayListener";
    CordovaFunction["ResetBarcodeTrackingSession"] = "resetBarcodeTrackingSession";
    CordovaFunction["UpdateBarcodeTrackingAdvancedOverlay"] = "updateBarcodeTrackingAdvancedOverlay";
    CordovaFunction["UpdateBarcodeTrackingBasicOverlay"] = "updateBarcodeTrackingBasicOverlay";
    CordovaFunction["UpdateBarcodeTrackingMode"] = "updateBarcodeTrackingMode";
    CordovaFunction["ApplyBarcodeTrackingModeSettings"] = "applyBarcodeTrackingModeSettings";
    CordovaFunction["FinishBarcodeTrackingDidUpdateSession"] = "finishBarcodeTrackingDidUpdateSession";
    CordovaFunction["FinishBarcodeTrackingBrushForTrackedBarcode"] = "finishBarcodeTrackingBrushForTrackedBarcode";
    CordovaFunction["UnregisterBarcodeTrackingAdvancedOverlayListener"] = "unregisterBarcodeTrackingAdvancedOverlayListener";
    CordovaFunction["UnregisterBarcodeTrackingBasicOverlayListener"] = "unregisterBarcodeTrackingBasicOverlayListener";
    CordovaFunction["CreatePickView"] = "createPickView";
    CordovaFunction["PickViewStart"] = "viewStart";
    CordovaFunction["PickViewPause"] = "viewPause";
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
})(CordovaFunction || (CordovaFunction = {}));

class BarcodePickView extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor(props) {
        super();
        this.htmlElement = null;
        this._htmlElementState = new scanditCordovaDatacaptureCore.HTMLElementState();
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
            cameraSettings: props.cameraSettings
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
            else {
                this.pause();
            }
        }
    }
    get htmlElementState() {
        return this._htmlElementState;
    }
    connectToElement(element) {
        this.htmlElement = element;
        this.htmlElementState = new scanditCordovaDatacaptureCore.HTMLElementState();
        // Initial update
        this.elementDidChange();
        this.subscribeToChangesOnHTMLElement();
    }
    detachFromElement() {
        this.unsubscribeFromChangesOnHTMLElement();
        this.htmlElement = null;
        this.elementDidChange();
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
            this.htmlElementState = new scanditCordovaDatacaptureCore.HTMLElementState();
            return;
        }
        const newState = new scanditCordovaDatacaptureCore.HTMLElementState();
        const boundingRect = this.htmlElement.getBoundingClientRect();
        newState.position = { top: boundingRect.top, left: boundingRect.left };
        newState.size = { width: boundingRect.width, height: boundingRect.height };
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
    pause() {
        this.baseBarcodePickView.pause();
    }
    freeze() {
        this.baseBarcodePickView.freeze();
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

class BarcodeTrackingAdvancedOverlay {
    get type() {
        return this.baseBarcodeTrackingOverlay.type;
    }
    get shouldShowScanAreaGuides() {
        return this.baseBarcodeTrackingOverlay.shouldShowScanAreaGuides;
    }
    set shouldShowScanAreaGuides(shouldShow) {
        this.baseBarcodeTrackingOverlay.shouldShowScanAreaGuides = shouldShow;
    }
    get listener() {
        return this.baseBarcodeTrackingOverlay.listener;
    }
    set listener(listener) {
        this.baseBarcodeTrackingOverlay.listener = listener;
    }
    static withBarcodeTrackingForView(barcodeTracking, view) {
        const overlay = new BarcodeTrackingAdvancedOverlay();
        overlay.baseBarcodeTrackingOverlay.initialize(barcodeTracking, view);
        return overlay;
    }
    constructor() {
        this.baseBarcodeTrackingOverlay = new barcode.BaseBarcodeTrackingAdvancedOverlay();
    }
    setViewForTrackedBarcode(view, trackedBarcode) {
        return this.baseBarcodeTrackingOverlay.setViewForTrackedBarcode(view, trackedBarcode);
    }
    setAnchorForTrackedBarcode(anchor, trackedBarcode) {
        return this.baseBarcodeTrackingOverlay.setAnchorForTrackedBarcode(anchor, trackedBarcode);
    }
    setOffsetForTrackedBarcode(offset, trackedBarcode) {
        return this.baseBarcodeTrackingOverlay.setOffsetForTrackedBarcode(offset, trackedBarcode);
    }
    clearTrackedBarcodeViews() {
        return this.baseBarcodeTrackingOverlay.clearTrackedBarcodeViews();
    }
    toJSON() {
        return this.baseBarcodeTrackingOverlay.toJSON();
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
    get shouldShowScanAreaGuides() {
        return this.baseSparkScanView.shouldShowScanAreaGuides;
    }
    set shouldShowScanAreaGuides(newValue) {
        this.baseSparkScanView.shouldShowScanAreaGuides = newValue;
    }
    get brush() {
        return this.baseSparkScanView.brush;
    }
    set brush(newValue) {
        this.baseSparkScanView.brush = newValue;
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
    get handModeButtonVisible() {
        return this.baseSparkScanView.handModeButtonVisible;
    }
    set handModeButtonVisible(newValue) {
        this.baseSparkScanView.handModeButtonVisible = newValue;
    }
    get barcodeCountButtonVisible() {
        return this.baseSparkScanView.barcodeCountButtonVisible;
    }
    set barcodeCountButtonVisible(newValue) {
        this.baseSparkScanView.barcodeCountButtonVisible = newValue;
    }
    get fastFindButtonVisible() {
        return this.baseSparkScanView.fastFindButtonVisible;
    }
    set fastFindButtonVisible(newValue) {
        this.baseSparkScanView.fastFindButtonVisible = newValue;
    }
    get targetModeButtonVisible() {
        return this.baseSparkScanView.targetModeButtonVisible;
    }
    set targetModeButtonVisible(newValue) {
        this.baseSparkScanView.targetModeButtonVisible = newValue;
    }
    get soundModeButtonVisible() {
        return this.baseSparkScanView.soundModeButtonVisible;
    }
    set soundModeButtonVisible(newValue) {
        this.baseSparkScanView.soundModeButtonVisible = newValue;
    }
    get hapticModeButtonVisible() {
        return this.baseSparkScanView.hapticModeButtonVisible;
    }
    set hapticModeButtonVisible(newValue) {
        this.baseSparkScanView.hapticModeButtonVisible = newValue;
    }
    get stopCapturingText() {
        return this.baseSparkScanView.stopCapturingText;
    }
    set stopCapturingText(newValue) {
        this.baseSparkScanView.stopCapturingText = newValue;
    }
    get startCapturingText() {
        return this.baseSparkScanView.startCapturingText;
    }
    set startCapturingText(newValue) {
        this.baseSparkScanView.startCapturingText = newValue;
    }
    get resumeCapturingText() {
        return this.baseSparkScanView.resumeCapturingText;
    }
    set resumeCapturingText(newValue) {
        this.baseSparkScanView.resumeCapturingText = newValue;
    }
    get scanningCapturingText() {
        return this.baseSparkScanView.scanningCapturingText;
    }
    set scanningCapturingText(newValue) {
        this.baseSparkScanView.scanningCapturingText = newValue;
    }
    get captureButtonActiveBackgroundColor() {
        return this.baseSparkScanView.captureButtonActiveBackgroundColor;
    }
    set captureButtonActiveBackgroundColor(newValue) {
        this.baseSparkScanView.captureButtonActiveBackgroundColor = newValue;
    }
    get captureButtonBackgroundColor() {
        return this.baseSparkScanView.captureButtonBackgroundColor;
    }
    set captureButtonBackgroundColor(newValue) {
        this.baseSparkScanView.captureButtonBackgroundColor = newValue;
    }
    get captureButtonTintColor() {
        return this.baseSparkScanView.captureButtonTintColor;
    }
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
    get targetModeHintText() {
        return this.baseSparkScanView.targetModeHintText;
    }
    set targetModeHintText(newValue) {
        this.baseSparkScanView.targetModeHintText = newValue;
    }
    get shouldShowTargetModeHint() {
        return this.baseSparkScanView.shouldShowTargetModeHint;
    }
    set shouldShowTargetModeHint(newValue) {
        this.baseSparkScanView.shouldShowTargetModeHint = newValue;
    }
    emitFeedback(feedback) {
        this.baseSparkScanView.emitFeedback(feedback);
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

initializeBarcodeCordova();

exports.ArucoDictionary = barcode.ArucoDictionary;
Object.defineProperty(exports, 'ArucoDictionaryPreset', {
    enumerable: true,
    get: function () { return barcode.ArucoDictionaryPreset; }
});
exports.ArucoMarker = barcode.ArucoMarker;
exports.Barcode = barcode.Barcode;
exports.BarcodeCapture = barcode.BarcodeCapture;
exports.BarcodeCaptureFeedback = barcode.BarcodeCaptureFeedback;
exports.BarcodeCaptureOverlay = barcode.BarcodeCaptureOverlay;
Object.defineProperty(exports, 'BarcodeCaptureOverlayStyle', {
    enumerable: true,
    get: function () { return barcode.BarcodeCaptureOverlayStyle; }
});
exports.BarcodeCaptureSession = barcode.BarcodeCaptureSession;
exports.BarcodeCaptureSettings = barcode.BarcodeCaptureSettings;
exports.BarcodePick = barcode.BarcodePick;
exports.BarcodePickActionCallback = barcode.BarcodePickActionCallback;
exports.BarcodePickAsyncMapperProductProvider = barcode.BarcodePickAsyncMapperProductProvider;
Object.defineProperty(exports, 'BarcodePickIconStyle', {
    enumerable: true,
    get: function () { return barcode.BarcodePickIconStyle; }
});
exports.BarcodePickProduct = barcode.BarcodePickProduct;
exports.BarcodePickProductProviderCallback = barcode.BarcodePickProductProviderCallback;
exports.BarcodePickProductProviderCallbackItem = barcode.BarcodePickProductProviderCallbackItem;
exports.BarcodePickScanningSession = barcode.BarcodePickScanningSession;
exports.BarcodePickSettings = barcode.BarcodePickSettings;
Object.defineProperty(exports, 'BarcodePickState', {
    enumerable: true,
    get: function () { return barcode.BarcodePickState; }
});
exports.BarcodePickViewSettings = barcode.BarcodePickViewSettings;
exports.BarcodeSelection = barcode.BarcodeSelection;
exports.BarcodeSelectionAimerSelection = barcode.BarcodeSelectionAimerSelection;
exports.BarcodeSelectionAutoSelectionStrategy = barcode.BarcodeSelectionAutoSelectionStrategy;
exports.BarcodeSelectionBasicOverlay = barcode.BarcodeSelectionBasicOverlay;
Object.defineProperty(exports, 'BarcodeSelectionBasicOverlayStyle', {
    enumerable: true,
    get: function () { return barcode.BarcodeSelectionBasicOverlayStyle; }
});
exports.BarcodeSelectionFeedback = barcode.BarcodeSelectionFeedback;
Object.defineProperty(exports, 'BarcodeSelectionFreezeBehavior', {
    enumerable: true,
    get: function () { return barcode.BarcodeSelectionFreezeBehavior; }
});
exports.BarcodeSelectionManualSelectionStrategy = barcode.BarcodeSelectionManualSelectionStrategy;
exports.BarcodeSelectionSession = barcode.BarcodeSelectionSession;
exports.BarcodeSelectionSettings = barcode.BarcodeSelectionSettings;
Object.defineProperty(exports, 'BarcodeSelectionTapBehavior', {
    enumerable: true,
    get: function () { return barcode.BarcodeSelectionTapBehavior; }
});
exports.BarcodeSelectionTapSelection = barcode.BarcodeSelectionTapSelection;
exports.BarcodeTracking = barcode.BarcodeTracking;
exports.BarcodeTrackingBasicOverlay = barcode.BarcodeTrackingBasicOverlay;
Object.defineProperty(exports, 'BarcodeTrackingBasicOverlayStyle', {
    enumerable: true,
    get: function () { return barcode.BarcodeTrackingBasicOverlayStyle; }
});
Object.defineProperty(exports, 'BarcodeTrackingScenario', {
    enumerable: true,
    get: function () { return barcode.BarcodeTrackingScenario; }
});
exports.BarcodeTrackingSession = barcode.BarcodeTrackingSession;
exports.BarcodeTrackingSettings = barcode.BarcodeTrackingSettings;
Object.defineProperty(exports, 'BatterySavingMode', {
    enumerable: true,
    get: function () { return barcode.BatterySavingMode; }
});
Object.defineProperty(exports, 'Checksum', {
    enumerable: true,
    get: function () { return barcode.Checksum; }
});
Object.defineProperty(exports, 'CompositeFlag', {
    enumerable: true,
    get: function () { return barcode.CompositeFlag; }
});
Object.defineProperty(exports, 'CompositeType', {
    enumerable: true,
    get: function () { return barcode.CompositeType; }
});
exports.Dot = barcode.Dot;
exports.DotWithIcons = barcode.DotWithIcons;
exports.Ean13UpcaClassification = barcode.Ean13UpcaClassification;
exports.EncodingRange = barcode.EncodingRange;
exports.LocalizedOnlyBarcode = barcode.LocalizedOnlyBarcode;
exports.Range = barcode.Range;
exports.Rectangular = barcode.Rectangular;
exports.RectangularWithIcons = barcode.RectangularWithIcons;
exports.SparkScan = barcode.SparkScan;
exports.SparkScanBarcodeErrorFeedback = barcode.SparkScanBarcodeErrorFeedback;
exports.SparkScanBarcodeFeedback = barcode.SparkScanBarcodeFeedback;
exports.SparkScanBarcodeSuccessFeedback = barcode.SparkScanBarcodeSuccessFeedback;
exports.SparkScanFeedback = barcode.SparkScanFeedback;
Object.defineProperty(exports, 'SparkScanPreviewBehavior', {
    enumerable: true,
    get: function () { return barcode.SparkScanPreviewBehavior; }
});
Object.defineProperty(exports, 'SparkScanScanningBehavior', {
    enumerable: true,
    get: function () { return barcode.SparkScanScanningBehavior; }
});
exports.SparkScanScanningModeDefault = barcode.SparkScanScanningModeDefault;
exports.SparkScanScanningModeTarget = barcode.SparkScanScanningModeTarget;
Object.defineProperty(exports, 'SparkScanScanningPrecision', {
    enumerable: true,
    get: function () { return barcode.SparkScanScanningPrecision; }
});
exports.SparkScanSession = barcode.SparkScanSession;
exports.SparkScanSettings = barcode.SparkScanSettings;
exports.SparkScanToastSettings = barcode.SparkScanToastSettings;
exports.SparkScanViewErrorFeedback = barcode.SparkScanViewErrorFeedback;
exports.SparkScanViewFeedback = barcode.SparkScanViewFeedback;
Object.defineProperty(exports, 'SparkScanViewHandMode', {
    enumerable: true,
    get: function () { return barcode.SparkScanViewHandMode; }
});
exports.SparkScanViewSettings = barcode.SparkScanViewSettings;
exports.SparkScanViewSuccessFeedback = barcode.SparkScanViewSuccessFeedback;
exports.StructuredAppendData = barcode.StructuredAppendData;
Object.defineProperty(exports, 'Symbology', {
    enumerable: true,
    get: function () { return barcode.Symbology; }
});
exports.SymbologyDescription = barcode.SymbologyDescription;
exports.SymbologySettings = barcode.SymbologySettings;
exports.TrackedBarcode = barcode.TrackedBarcode;
exports.BarcodePickView = BarcodePickView;
exports.BarcodeTrackingAdvancedOverlay = BarcodeTrackingAdvancedOverlay;
exports.SparkScanView = SparkScanView;
exports.TrackedBarcodeView = TrackedBarcodeView;
