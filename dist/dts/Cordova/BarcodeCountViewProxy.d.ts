import { BaseNativeProxy } from 'scandit-datacapture-frameworks-core';
import { BarcodeCountViewProxy } from 'scandit-datacapture-frameworks-barcode';
import { BarcodeCountView } from '../BarcodeCountView';
export declare class NativeBarcodeCountViewProxy extends BaseNativeProxy implements BarcodeCountViewProxy {
    private static get cordovaExec();
    createView(_nativeView: BarcodeCountView, viewJson: string): Promise<void>;
    removeView(): Promise<void>;
    updateView(viewJson: string): Promise<void>;
    clearHighlights(): Promise<void>;
    finishBrushForRecognizedBarcodeCallback(_nativeView: BarcodeCountView, brushJson: string | null, trackedBarcodeIdentifier: number): Promise<void>;
    finishBrushForRecognizedBarcodeNotInListCallback(_nativeView: BarcodeCountView, brushJson: string | null, trackedBarcodeIdentifier: number): Promise<void>;
    finishBrushForAcceptedBarcodeCallback(_nativeView: BarcodeCountView, brushJson: string | null, trackedBarcodeIdentifier: number): Promise<void>;
    finishBrushForRejectedBarcodeCallback(_nativeView: BarcodeCountView, brushJson: string | null, trackedBarcodeIdentifier: number): Promise<void>;
    show(): Promise<void>;
    hide(): Promise<void>;
    registerBarcodeCountViewListener(): Promise<void>;
    registerBarcodeCountViewUiListener(): Promise<void>;
    unregisterBarcodeCountViewListener(): Promise<void>;
    unregisterBarcodeCountViewUiListener(): Promise<void>;
    setPositionAndSize(top: number, left: number, width: number, height: number, shouldBeUnderWebView: boolean): Promise<void>;
    subscribeListeners(): Promise<void>;
    unsubscribeListeners(): Promise<void>;
    enableHardwareTrigger(hardwareTriggerKeyCode: number | null): Promise<void>;
    private notifyListeners;
}
