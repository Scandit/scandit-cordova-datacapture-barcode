import { BarcodeBatchBasicOverlayProxy } from 'scandit-datacapture-frameworks-barcode';
import { BaseNativeProxy } from 'scandit-datacapture-frameworks-core';
export declare class NativeBarcodeBatchBasicOverlayProxy extends BaseNativeProxy implements BarcodeBatchBasicOverlayProxy {
    private static get cordovaExec();
    setBrushForTrackedBarcode(brushJson: string | null, trackedBarcodeIdentifier: number, sessionFrameSequenceID: number): Promise<void>;
    clearTrackedBarcodeBrushes(): Promise<void>;
    registerListenerForBasicOverlayEvents(): void;
    updateBarcodeBatchBasicOverlay(overlayJson: string): Promise<void>;
    unregisterListenerForBasicOverlayEvents(): Promise<void>;
    private notifyListeners;
}
