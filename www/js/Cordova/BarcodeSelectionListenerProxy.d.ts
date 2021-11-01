/// <amd-module name="scandit-cordova-datacapture-barcode.BarcodeSelectionListenerProxy" />
import { Barcode } from 'Barcode';
declare type BarcodeSelection = any;
export declare class BarcodeSelectionListenerProxy {
    private static cordovaExec;
    private barcodeSelection;
    static forBarcodeSelection(barcodeSelection: BarcodeSelection): BarcodeSelectionListenerProxy;
    getCount(barcode: Barcode): Promise<number>;
    reset(): Promise<void>;
    private initialize;
    private subscribeListener;
    private notifyListeners;
}
export {};
