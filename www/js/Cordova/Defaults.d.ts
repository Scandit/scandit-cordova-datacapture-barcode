/// <amd-module name="scandit-cordova-datacapture-barcode.Defaults" />
import { PrivateCompositeTypeDescription, SymbologyDescription, SymbologySettings } from 'Barcode';
import { CameraSettings } from 'Camera+Related';
import { Color } from 'Common';
import { CameraSettingsDefaultsJSON } from 'CoreDefaults';
export interface Defaults {
    SymbologySettings: {
        [key: string]: SymbologySettings;
    };
    SymbologyDescriptions: SymbologyDescription[];
    CompositeTypeDescriptions: PrivateCompositeTypeDescription[];
    BarcodeCapture: {
        BarcodeCaptureOverlay: {
            DefaultBrush: {
                fillColor: Color;
                strokeColor: Color;
                strokeWidth: number;
            };
        };
        BarcodeCaptureSettings: {
            codeDuplicateFilter: number;
        };
        RecommendedCameraSettings: CameraSettings;
    };
    BarcodeTracking: {
        RecommendedCameraSettings: CameraSettings;
        BarcodeTrackingBasicOverlay: {
            DefaultBrush: {
                fillColor: Color;
                strokeColor: Color;
                strokeWidth: number;
            };
        };
    };
}
export interface DefaultsJSON {
    SymbologySettings: {
        [key: string]: string;
    };
    SymbologyDescriptions: string[];
    CompositeTypeDescriptions: string[];
    BarcodeCapture: {
        BarcodeCaptureOverlay: {
            DefaultBrush: {
                fillColor: string;
                strokeColor: string;
                strokeWidth: number;
            };
        };
        BarcodeCaptureSettings: {
            codeDuplicateFilter: number;
        };
        RecommendedCameraSettings: CameraSettingsDefaultsJSON;
    };
    BarcodeTracking: {
        RecommendedCameraSettings: CameraSettingsDefaultsJSON;
        BarcodeTrackingBasicOverlay: {
            DefaultBrush: {
                fillColor: string;
                strokeColor: string;
                strokeWidth: number;
            };
        };
    };
}
export declare const defaultsFromJSON: (json: DefaultsJSON) => Defaults;
