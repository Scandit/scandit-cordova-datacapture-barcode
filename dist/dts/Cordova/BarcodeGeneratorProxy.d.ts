import { BarcodeGeneratorProxy } from 'scandit-datacapture-frameworks-barcode';
import { BaseNativeProxy, NativeCallResult } from 'scandit-datacapture-frameworks-core';
export declare class NativeBarcodeGeneratorProxy extends BaseNativeProxy implements BarcodeGeneratorProxy {
    private static get cordovaExec();
    create(barcodeGeneratorJson: string): Promise<void>;
    dispose(generatorId: string): Promise<void>;
    generateFromBase64EncodedData(generatorId: string, data: string, imageWidth: number): Promise<NativeCallResult>;
    generate(generatorId: string, text: string, imageWidth: number): Promise<NativeCallResult>;
}
