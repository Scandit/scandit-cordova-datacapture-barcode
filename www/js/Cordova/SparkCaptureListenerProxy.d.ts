/// <amd-module name="scandit-cordova-datacapture-barcode.SparkCaptureListenerProxy" />
declare type SparkCapture = any;
export declare class SparkCaptureListenerProxy {
    private static cordovaExec;
    private sparkCapture;
    static forSparkCapture(sparkCapture: SparkCapture): SparkCaptureListenerProxy;
    private initialize;
    private subscribeListener;
    private notifyListeners;
}
export {};
