import { SparkScanViewProxy } from "scandit-datacapture-frameworks-barcode";
import { BaseNativeProxy } from "scandit-datacapture-frameworks-core";
export declare class NativeSparkScanViewProxy extends BaseNativeProxy implements SparkScanViewProxy {
    private static get cordovaExec();
    updateSparkScanView(viewJson: string): Promise<void>;
    createSparkScanView(viewJson: string): Promise<void>;
    subscribeListeners(): void;
    prepareScanning(): Promise<void>;
    disposeSparkScanView(): Promise<void>;
    showSparkScanView(): Promise<void>;
    hideSparkScanView(): Promise<void>;
    emitSparkScanViewFeedback(feedbackJson: string): Promise<void>;
    registerSparkScanViewListenerEvents(): void;
    unregisterListenerForViewEvents(): Promise<void>;
    stopSparkScanViewScanning(): Promise<void>;
    startSparkScanViewScanning(): Promise<void>;
    pauseSparkScanViewScanning(): Promise<void>;
    prepareSparkScanViewScanning(): Promise<void>;
    private notifyListeners;
    registerDelegateForEvents(): void;
    unregisteDelegateForEvents(): void;
    submitFeedbackForBarcode(feedbackJson: string): void;
    showToast(text: string): Promise<void>;
    private onFeedbackForBarcodeHandler;
}
