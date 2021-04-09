/// <amd-module name="scandit-cordova-datacapture-barcode.BarcodeTrackingListenerProxy" />
declare type BarcodeTracking = any;
export declare class BarcodeTrackingListenerProxy {
    private static cordovaExec;
    private barcodeTracking;
    static forBarcodeTracking(barcodeTracking: BarcodeTracking): BarcodeTrackingListenerProxy;
    private initialize;
    private subscribeListener;
    private notifyListeners;
}
export {};
