/// <amd-module name="scandit-cordova-datacapture-barcode.BarcodeTrackingAdvancedOverlayProxy" />
import { TrackedBarcode } from 'Barcode';
import { BarcodeTrackingAdvancedOverlay } from 'BarcodeTracking+Related';
import { PointWithUnit } from 'Common';
import { Anchor } from 'DataCaptureView';
import { TrackedBarcodeView } from 'TrackedBarcodeView';
export declare class BarcodeTrackingAdvancedOverlayProxy {
    private static cordovaExec;
    private overlay;
    static forOverlay(overlay: BarcodeTrackingAdvancedOverlay): BarcodeTrackingAdvancedOverlayProxy;
    setViewForTrackedBarcode(view: Promise<TrackedBarcodeView | null>, trackedBarcode: TrackedBarcode): Promise<void>;
    private setViewForTrackedBarcodeSync;
    setAnchorForTrackedBarcode(anchor: Anchor, trackedBarcode: TrackedBarcode): Promise<void>;
    setOffsetForTrackedBarcode(offset: PointWithUnit, trackedBarcode: TrackedBarcode): Promise<void>;
    clearTrackedBarcodeViews(): Promise<void>;
    private subscribeListener;
    private notifyListeners;
    private initialize;
}
