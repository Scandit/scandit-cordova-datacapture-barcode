/// <amd-module name="scandit-cordova-datacapture-barcode.BarcodeTrackingBasicOverlayProxy" />
import { TrackedBarcode } from 'Barcode';
import { BarcodeTrackingBasicOverlay } from 'BarcodeTracking+Related';
import { Brush } from 'Viewfinder';
export declare class BarcodeTrackingBasicOverlayProxy {
    private static cordovaExec;
    private overlay;
    static forOverlay(overlay: BarcodeTrackingBasicOverlay): BarcodeTrackingBasicOverlayProxy;
    setBrushForTrackedBarcode(brush: Brush, trackedBarcode: TrackedBarcode): Promise<void>;
    clearTrackedBarcodeBrushes(): Promise<void>;
    private subscribeListener;
    private notifyListeners;
    private initialize;
}
