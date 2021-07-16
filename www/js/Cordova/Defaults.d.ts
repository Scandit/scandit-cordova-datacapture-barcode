/// <amd-module name="scandit-cordova-datacapture-barcode.Defaults" />
import { PrivateCompositeTypeDescription, SymbologyDescription, SymbologySettings } from 'Barcode';
import { CameraSettings } from 'Camera+Related';
import { Color } from 'Common';
import { CameraSettingsDefaultsJSON } from 'CoreDefaults';
import { LocationSelection } from 'LocationSelection';
declare type SparkCaptureFeedback = any;
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
    SparkCapture: {
        feedback: SparkCaptureFeedback;
        SparkCaptureSettings: {
            codeDuplicateFilter: number;
            locationSelection: LocationSelection;
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
    SparkCapture: {
        feedback: string;
        SparkCaptureSettings: {
            codeDuplicateFilter: number;
            locationSelection: string;
        };
    };
}
export declare const defaultsFromJSON: (json: DefaultsJSON) => Defaults;
export {};
