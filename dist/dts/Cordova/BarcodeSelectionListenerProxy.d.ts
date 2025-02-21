import { BarcodeSelectionListenerProxy } from 'scandit-datacapture-frameworks-barcode';
import { BaseNativeProxy, NativeCallResult } from 'scandit-datacapture-frameworks-core';
export declare class NativeBarcodeSelectionListenerProxy extends BaseNativeProxy implements BarcodeSelectionListenerProxy {
    private static get cordovaExec();
    isModeEnabled: () => boolean;
    getCount(selectionIdentifier: string): Promise<NativeCallResult>;
    resetSession(): Promise<void>;
    registerListenerForEvents(): void;
    finishDidUpdateSelectionCallback(isEnabled: boolean): void;
    finishDidUpdateSessionCallback(isEnabled: boolean): void;
    unregisterListenerForEvents(): void;
    private notifyListeners;
}
