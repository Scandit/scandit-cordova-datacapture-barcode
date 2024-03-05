"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultsFromJSON = void 0;
/// <amd-module name="scandit-cordova-datacapture-barcode.Defaults"/>
// ^ needed because Cordova can't resolve "../xx" style dependencies
const Barcode_1 = require("scandit-cordova-datacapture-barcode.Barcode");
const Camera_Related_1 = require("scandit-cordova-datacapture-core.Camera+Related");
const Common_1 = require("scandit-cordova-datacapture-core.Common");
const Feedback_1 = require("scandit-cordova-datacapture-core.Feedback");
const defaultsFromJSON = (json) => {
    return {
        SymbologySettings: Object.keys(json.SymbologySettings)
            .reduce((settings, identifier) => {
            settings[identifier] = Barcode_1.SymbologySettings
                .fromJSON(JSON.parse(json.SymbologySettings[identifier]));
            return settings;
        }, {}),
        SymbologyDescriptions: json.SymbologyDescriptions.map(description => Barcode_1.SymbologyDescription.fromJSON(JSON.parse(description))),
        CompositeTypeDescriptions: json.CompositeTypeDescriptions.map(description => JSON.parse(description)),
        BarcodeCapture: {
            BarcodeCaptureOverlay: {
                defaultStyle: json.BarcodeCapture.BarcodeCaptureOverlay.defaultStyle,
                DefaultBrush: {
                    fillColor: Common_1.Color
                        .fromJSON(json.BarcodeCapture.BarcodeCaptureOverlay.DefaultBrush.fillColor),
                    strokeColor: Common_1.Color
                        .fromJSON(json.BarcodeCapture.BarcodeCaptureOverlay.DefaultBrush.strokeColor),
                    strokeWidth: json.BarcodeCapture.BarcodeCaptureOverlay.DefaultBrush.strokeWidth,
                },
                Brushes: Object
                    .keys(json.BarcodeCapture.BarcodeCaptureOverlay.Brushes)
                    .reduce((previousValue, currentValue) => {
                    return Object.assign(Object.assign({}, previousValue), { [currentValue]: {
                            DefaultBrush: {
                                fillColor: Common_1.Color
                                    .fromJSON(json.BarcodeCapture.BarcodeCaptureOverlay.Brushes[currentValue].fillColor),
                                strokeColor: Common_1.Color
                                    .fromJSON(json.BarcodeCapture.BarcodeCaptureOverlay.Brushes[currentValue].strokeColor),
                                strokeWidth: json.BarcodeCapture.BarcodeCaptureOverlay.Brushes[currentValue].strokeWidth,
                            },
                        } });
                }, {}),
            },
            BarcodeCaptureSettings: {
                codeDuplicateFilter: json.BarcodeCapture.BarcodeCaptureSettings.codeDuplicateFilter,
            },
            RecommendedCameraSettings: Camera_Related_1.CameraSettings
                .fromJSON(json.BarcodeCapture.RecommendedCameraSettings),
        },
        BarcodeTracking: {
            RecommendedCameraSettings: Camera_Related_1.CameraSettings
                .fromJSON(json.BarcodeTracking.RecommendedCameraSettings),
            BarcodeTrackingBasicOverlay: {
                defaultStyle: json.BarcodeTracking.BarcodeTrackingBasicOverlay.defaultStyle,
                Brushes: Object
                    .keys(json.BarcodeTracking.BarcodeTrackingBasicOverlay.Brushes)
                    .reduce((previousValue, currentValue) => {
                    return Object.assign(Object.assign({}, previousValue), { [currentValue]: {
                            DefaultBrush: {
                                fillColor: Common_1.Color
                                    .fromJSON(json.BarcodeTracking.BarcodeTrackingBasicOverlay.
                                    Brushes[currentValue].fillColor),
                                strokeColor: Common_1.Color
                                    .fromJSON(json.BarcodeTracking.BarcodeTrackingBasicOverlay.
                                    Brushes[currentValue].strokeColor),
                                strokeWidth: json.BarcodeTracking.BarcodeTrackingBasicOverlay.
                                    Brushes[currentValue].strokeWidth,
                            },
                        } });
                }, {}),
            },
        },
        BarcodeSelection: {
            RecommendedCameraSettings: Camera_Related_1.CameraSettings
                .fromJSON(json.BarcodeSelection.RecommendedCameraSettings),
            Feedback: ({
                selection: Feedback_1.Feedback
                    .fromJSON(JSON.parse(json.BarcodeSelection.Feedback).selection),
            }),
            BarcodeSelectionSettings: {
                codeDuplicateFilter: json.BarcodeSelection.BarcodeSelectionSettings.codeDuplicateFilter,
                singleBarcodeAutoDetection: json.BarcodeSelection.BarcodeSelectionSettings.singleBarcodeAutoDetection,
                selectionType: fromJSON => fromJSON(JSON.parse(json.BarcodeSelection.BarcodeSelectionSettings.selectionType)),
            },
            BarcodeSelectionTapSelection: {
                defaultFreezeBehavior: json.BarcodeSelection.BarcodeSelectionTapSelection
                    .defaultFreezeBehavior,
                defaultTapBehavior: json.BarcodeSelection.BarcodeSelectionTapSelection
                    .defaultTapBehavior,
            },
            BarcodeSelectionAimerSelection: {
                defaultSelectionStrategy: fromJSON => fromJSON(JSON.parse(json.BarcodeSelection.BarcodeSelectionAimerSelection.defaultSelectionStrategy)),
            },
            BarcodeSelectionBasicOverlay: {
                defaultStyle: json.BarcodeSelection
                    .BarcodeSelectionBasicOverlay.defaultStyle,
                styles: Object
                    .keys(json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles)
                    .reduce((previousValue, currentValue) => {
                    return Object.assign(Object.assign({}, previousValue), { [currentValue]: {
                            DefaultTrackedBrush: {
                                fillColor: Common_1.Color
                                    .fromJSON(json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultTrackedBrush.fillColor),
                                strokeColor: Common_1.Color
                                    .fromJSON(json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultTrackedBrush.strokeColor),
                                strokeWidth: json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultTrackedBrush.strokeWidth,
                            },
                            DefaultAimedBrush: {
                                fillColor: Common_1.Color
                                    .fromJSON(json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultAimedBrush.fillColor),
                                strokeColor: Common_1.Color
                                    .fromJSON(json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultAimedBrush.strokeColor),
                                strokeWidth: json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultAimedBrush.strokeWidth,
                            },
                            DefaultSelectedBrush: {
                                fillColor: Common_1.Color
                                    .fromJSON(json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultSelectedBrush.fillColor),
                                strokeColor: Common_1.Color
                                    .fromJSON(json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultSelectedBrush.strokeColor),
                                strokeWidth: json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultSelectedBrush.strokeWidth,
                            },
                            DefaultSelectingBrush: {
                                fillColor: Common_1.Color
                                    .fromJSON(json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultSelectingBrush.fillColor),
                                strokeColor: Common_1.Color
                                    .fromJSON(json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultSelectingBrush.strokeColor),
                                strokeWidth: json.BarcodeSelection.BarcodeSelectionBasicOverlay.styles[currentValue]
                                    .DefaultSelectingBrush.strokeWidth,
                            },
                        } });
                }, {}),
            },
        },
    };
};
exports.defaultsFromJSON = defaultsFromJSON;
