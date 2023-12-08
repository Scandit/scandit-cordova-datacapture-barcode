"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CordovaFunction = exports.Cordova = void 0;
/// <amd-module name="scandit-cordova-datacapture-barcode.Cordova"/>
// ^ needed because Cordova can't resolve "../xx" style dependencies
const Barcode_1 = require("scandit-cordova-datacapture-barcode.Barcode");
const CommonCordova_1 = require("scandit-cordova-datacapture-core.CommonCordova");
const Defaults_1 = require("scandit-cordova-datacapture-barcode.Defaults");
// tslint:disable-next-line:variable-name
exports.Cordova = {
    pluginName: 'ScanditBarcodeCapture',
    defaults: {},
    exec: (success, error, functionName, args) => (0, CommonCordova_1.cordovaExec)(success, error, exports.Cordova.pluginName, functionName, args),
};
const getDefaults = new Promise((resolve, reject) => {
    exports.Cordova.exec((defaultsJSON) => {
        exports.Cordova.defaults = (0, Defaults_1.defaultsFromJSON)(defaultsJSON);
        resolve();
    }, reject, 'getDefaults', null);
});
(0, CommonCordova_1.initializePlugin)(exports.Cordova.pluginName, getDefaults);
// To circumvent a circular dependency
Barcode_1.SymbologyDescription.defaults = () => exports.Cordova.defaults;
var CordovaFunction;
(function (CordovaFunction) {
    CordovaFunction["SubscribeBarcodeCaptureListener"] = "subscribeBarcodeCaptureListener";
    CordovaFunction["FinishBarcodeCaptureDidScan"] = "finishBarcodeCaptureDidScan";
    CordovaFunction["FinishBarcodeCaptureDidUpdateSession"] = "finishBarcodeCaptureDidUpdateSession";
    CordovaFunction["SubscribeBarcodeTrackingListener"] = "subscribeBarcodeTrackingListener";
    CordovaFunction["SubscribeBarcodeTrackingBasicOverlayListener"] = "subscribeBarcodeTrackingBasicOverlayListener";
    CordovaFunction["SetBrushForTrackedBarcode"] = "setBrushForTrackedBarcode";
    CordovaFunction["ClearTrackedBarcodeBrushes"] = "clearTrackedBarcodeBrushes";
    CordovaFunction["SubscribeBarcodeTrackingAdvancedOverlayListener"] = "subscribeBarcodeTrackingAdvancedOverlayListener";
    CordovaFunction["SetViewForTrackedBarcode"] = "setViewForTrackedBarcode";
    CordovaFunction["SetAnchorForTrackedBarcode"] = "setAnchorForTrackedBarcode";
    CordovaFunction["SetOffsetForTrackedBarcode"] = "setOffsetForTrackedBarcode";
    CordovaFunction["ClearTrackedBarcodeViews"] = "clearTrackedBarcodeViews";
    CordovaFunction["FinishBarcodeTrackingDidUpdateSession"] = "finishBarcodeTrackingDidUpdateSession";
    CordovaFunction["FinishBarcodeTrackingBrushForTrackedBarcode"] = "finishBarcodeTrackingBrushForTrackedBarcode";
    CordovaFunction["SubscribeBarcodeSelectionListener"] = "subscribeBarcodeSelectionListener";
    CordovaFunction["GetCountForBarcodeInBarcodeSelectionSession"] = "getCountForBarcodeInBarcodeSelectionSession";
    CordovaFunction["ResetBarcodeCaptureSession"] = "resetBarcodeCaptureSession";
    CordovaFunction["ResetBarcodeTrackingSession"] = "resetBarcodeTrackingSession";
    CordovaFunction["ResetBarcodeSelectionSession"] = "resetBarcodeSelectionSession";
    CordovaFunction["ResetBarcodeSelection"] = "resetBarcodeSelection";
    CordovaFunction["UnfreezeCameraInBarcodeSelection"] = "unfreezeCameraInBarcodeSelection";
    CordovaFunction["FinishBarcodeSelectionDidUpdateSelection"] = "finishBarcodeSelectionDidUpdateSelection";
    CordovaFunction["FinishBarcodeSelectionDidUpdateSession"] = "finishBarcodeSelectionDidUpdateSession";
})(CordovaFunction = exports.CordovaFunction || (exports.CordovaFunction = {}));
