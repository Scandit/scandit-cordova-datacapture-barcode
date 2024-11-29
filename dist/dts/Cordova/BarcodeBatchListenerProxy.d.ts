import { BarcodeBatchListenerProxy } from 'scandit-datacapture-frameworks-barcode';
import { BaseNativeProxy } from 'scandit-datacapture-frameworks-core';
export declare class NativeBarcodeBatchListenerProxy extends BaseNativeProxy implements BarcodeBatchListenerProxy {
    private static get cordovaExec();
    isModeEnabled: () => boolean;
    resetSession(): Promise<void>;
    registerListenerForEvents(): void;
    unregisterListenerForEvents(): void;
    setModeEnabledState(enabled: boolean): void;
    updateBarcodeBatchMode(modeJson: string): Promise<void>;
    applyBarcodeBatchModeSettings(newSettingsJson: string): Promise<void>;
    finishDidUpdateSessionCallback(enabled: boolean): void;
    private notifyListeners;
}
