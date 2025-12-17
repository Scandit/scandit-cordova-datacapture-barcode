import { BarcodeNativeCallerProvider, BarcodeProxyType } from 'scandit-datacapture-frameworks-barcode';
import { NativeCaller } from 'scandit-datacapture-frameworks-core';
export declare class CordovaBarcodeNativeCallerProvider implements BarcodeNativeCallerProvider {
    getNativeCaller(_proxyType: BarcodeProxyType): NativeCaller;
}
