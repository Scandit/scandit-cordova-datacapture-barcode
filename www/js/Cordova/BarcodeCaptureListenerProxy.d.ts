/// <amd-module name="scandit-cordova-datacapture-barcode.BarcodeCaptureListenerProxy" />
declare type BarcodeCapture = any;
export declare class BarcodeCaptureListenerProxy {
    private static cordovaExec;
    private barcodeCapture;
    static forBarcodeCapture(barcodeCapture: BarcodeCapture): BarcodeCaptureListenerProxy;
    private initialize;
    private subscribeListener;
    private notifyListeners;
}
export {};
