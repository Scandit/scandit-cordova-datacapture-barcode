"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <amd-module name="scandit-cordova-datacapture-barcode.Defaults"/>
// ^ needed because Cordova can't resolve "../xx" style dependencies
const Barcode_1 = require("scandit-cordova-datacapture-barcode.Barcode");
const Camera_Related_1 = require("scandit-cordova-datacapture-core.Camera+Related");
const Common_1 = require("scandit-cordova-datacapture-core.Common");
const Feedback_1 = require("scandit-cordova-datacapture-core.Feedback");
const LocationSelection_1 = require("scandit-cordova-datacapture-core.LocationSelection");
exports.defaultsFromJSON = (json) => {
    // SparkCapture is currently only available on iOS. To avoid polluting the code with handling null values for the
    // related defaults, we define them here. The values do not really matter, as SparkCapture is not supported if
    // `json.SparkCapture` was not defined.
    if (!json.SparkCapture) {
        json.SparkCapture = {
            feedback: JSON.stringify({ success: Feedback_1.Feedback.defaultFeedback.toJSON() }),
            SparkCaptureSettings: {
                codeDuplicateFilter: 0,
                locationSelection: JSON.stringify(new LocationSelection_1.RadiusLocationSelection(new Common_1.NumberWithUnit(10, Common_1.MeasureUnit.DIP)).toJSON()),
            },
        };
    }
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
                DefaultBrush: {
                    fillColor: Common_1.Color
                        .fromJSON(json.BarcodeCapture.BarcodeCaptureOverlay.DefaultBrush.fillColor),
                    strokeColor: Common_1.Color
                        .fromJSON(json.BarcodeCapture.BarcodeCaptureOverlay.DefaultBrush.strokeColor),
                    strokeWidth: json.BarcodeCapture.BarcodeCaptureOverlay.DefaultBrush.strokeWidth,
                },
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
                DefaultBrush: {
                    fillColor: Common_1.Color
                        .fromJSON(json.BarcodeTracking.BarcodeTrackingBasicOverlay.DefaultBrush.fillColor),
                    strokeColor: Common_1.Color
                        .fromJSON(json.BarcodeTracking.BarcodeTrackingBasicOverlay.DefaultBrush.strokeColor),
                    strokeWidth: json.BarcodeTracking.BarcodeTrackingBasicOverlay.DefaultBrush.strokeWidth,
                },
            },
        },
        SparkCapture: {
            feedback: ({
                success: Feedback_1.Feedback
                    .fromJSON(JSON.parse(json.SparkCapture.feedback).success)
            }),
            SparkCaptureSettings: {
                codeDuplicateFilter: json.SparkCapture.SparkCaptureSettings.codeDuplicateFilter,
                locationSelection: LocationSelection_1.PrivateLocationSelection
                    .fromJSON(JSON.parse(json.SparkCapture.SparkCaptureSettings.locationSelection)),
            },
        },
    };
};
