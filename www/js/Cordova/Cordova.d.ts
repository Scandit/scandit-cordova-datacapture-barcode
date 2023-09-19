/// <amd-module name="scandit-cordova-datacapture-barcode.Cordova" />
import { Defaults } from './Defaults';
export declare const Cordova: {
    pluginName: string;
    defaults: Defaults;
    exec: (success: Function | null, error: Function | null, functionName: string, args: [any] | null) => void;
};
export declare enum CordovaFunction {
    SubscribeBarcodeCaptureListener = "subscribeBarcodeCaptureListener",
    FinishBarcodeCaptureDidScan = "finishBarcodeCaptureDidScan",
    FinishBarcodeCaptureDidUpdateSession = "finishBarcodeCaptureDidUpdateSession",
    SubscribeBarcodeTrackingListener = "subscribeBarcodeTrackingListener",
    SubscribeBarcodeTrackingBasicOverlayListener = "subscribeBarcodeTrackingBasicOverlayListener",
    SetBrushForTrackedBarcode = "setBrushForTrackedBarcode",
    ClearTrackedBarcodeBrushes = "clearTrackedBarcodeBrushes",
    SubscribeBarcodeTrackingAdvancedOverlayListener = "subscribeBarcodeTrackingAdvancedOverlayListener",
    SetViewForTrackedBarcode = "setViewForTrackedBarcode",
    SetAnchorForTrackedBarcode = "setAnchorForTrackedBarcode",
    SetOffsetForTrackedBarcode = "setOffsetForTrackedBarcode",
    ClearTrackedBarcodeViews = "clearTrackedBarcodeViews",
    FinishBarcodeTrackingDidUpdateSession = "finishBarcodeTrackingDidUpdateSession",
    FinishBarcodeTrackingBrushForTrackedBarcode = "finishBarcodeTrackingBrushForTrackedBarcode",
    SubscribeBarcodeSelectionListener = "subscribeBarcodeSelectionListener",
    GetCountForBarcodeInBarcodeSelectionSession = "getCountForBarcodeInBarcodeSelectionSession",
    ResetBarcodeCaptureSession = "resetBarcodeCaptureSession",
    ResetBarcodeTrackingSession = "resetBarcodeTrackingSession",
    ResetBarcodeSelectionSession = "resetBarcodeSelectionSession",
    ResetBarcodeSelection = "resetBarcodeSelection",
    UnfreezeCameraInBarcodeSelection = "unfreezeCameraInBarcodeSelection",
    FinishBarcodeSelectionDidUpdateSelection = "finishBarcodeSelectionDidUpdateSelection",
    FinishBarcodeSelectionDidUpdateSession = "finishBarcodeSelectionDidUpdateSession"
}
