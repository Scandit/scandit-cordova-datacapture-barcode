import { AdvancedNativeProxy } from 'scandit-datacapture-frameworks-core';
import { BarcodeCountViewProxy } from 'scandit-datacapture-frameworks-barcode';
export declare class NativeBarcodeCountViewProxy extends AdvancedNativeProxy implements Partial<BarcodeCountViewProxy> {
    private static get cordovaExec();
    enableHardwareTrigger(hardwareTriggerKeyCode: number | null): Promise<void>;
}
