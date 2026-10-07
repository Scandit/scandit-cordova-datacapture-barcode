var scanditDatacaptureFrameworksCore = cordova.require('scandit-cordova-datacapture-core.Scandit').__ScanditCore;
var scanditCordovaDatacaptureCore = cordova.require('scandit-cordova-datacapture-core.Scandit');

exports.Symbology = void 0;
(function (Symbology) {
    Symbology["EAN13UPCA"] = "ean13Upca";
    Symbology["UPCE"] = "upce";
    Symbology["EAN8"] = "ean8";
    Symbology["Code39"] = "code39";
    Symbology["Code93"] = "code93";
    Symbology["Code128"] = "code128";
    Symbology["Code11"] = "code11";
    Symbology["Code25"] = "code25";
    Symbology["Codabar"] = "codabar";
    Symbology["InterleavedTwoOfFive"] = "interleavedTwoOfFive";
    Symbology["MSIPlessey"] = "msiPlessey";
    Symbology["QR"] = "qr";
    Symbology["DataMatrix"] = "dataMatrix";
    Symbology["Aztec"] = "aztec";
    Symbology["MaxiCode"] = "maxicode";
    Symbology["DotCode"] = "dotcode";
    Symbology["KIX"] = "kix";
    Symbology["RoyalMail4state"] = "royal-mail-4state";
    Symbology["GS1Databar"] = "databar";
    Symbology["GS1DatabarExpanded"] = "databarExpanded";
    Symbology["GS1DatabarLimited"] = "databarLimited";
    Symbology["PDF417"] = "pdf417";
    Symbology["MicroPDF417"] = "microPdf417";
    Symbology["MicroQR"] = "microQr";
    Symbology["Code32"] = "code32";
    Symbology["Lapa4SC"] = "lapa4sc";
    Symbology["IATATwoOfFive"] = "iata2of5";
    Symbology["MatrixTwoOfFive"] = "matrix2of5";
    Symbology["USPSIntelligentMail"] = "uspsIntelligentMail";
    Symbology["ArUco"] = "aruco";
    Symbology["Upu4State"] = "upu-4state";
    Symbology["AustralianPost"] = "australian-post-4state";
    Symbology["FrenchPost"] = "french-post";
})(exports.Symbology || (exports.Symbology = {}));

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate$1(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __awaiter$1(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

class Range extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get minimum() {
        return this._minimum;
    }
    get maximum() {
        return this._maximum;
    }
    get step() {
        return this._step;
    }
    get isFixed() {
        return this.minimum === this.maximum || this.step <= 0;
    }
    static fromJSON(json) {
        const range = new Range();
        range._minimum = json.minimum;
        range._maximum = json.maximum;
        range._step = json.step;
        return range;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('minimum')
], Range.prototype, "_minimum", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('maximum')
], Range.prototype, "_maximum", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('step')
], Range.prototype, "_step", void 0);

class SymbologyDescription {
    static get all() {
        return this.defaults().SymbologyDescriptions;
    }
    get identifier() { return this._identifier; }
    get symbology() { return this.identifier; }
    get readableName() { return this._readableName; }
    get isAvailable() { return this._isAvailable; }
    get isColorInvertible() { return this._isColorInvertible; }
    get activeSymbolCountRange() { return this._activeSymbolCountRange; }
    get defaultSymbolCountRange() { return this._defaultSymbolCountRange; }
    get supportedExtensions() { return this._supportedExtensions; }
    static forIdentifier(identifier) {
        const identifierIndex = SymbologyDescription.all
            .findIndex(description => description.identifier === identifier);
        if (identifierIndex === -1) {
            return null;
        }
        return new SymbologyDescription(identifier);
    }
    static fromJSON(json) {
        const symbologyDescription = new SymbologyDescription();
        symbologyDescription._identifier = json.identifier;
        symbologyDescription._readableName = json.readableName;
        symbologyDescription._isAvailable = json.isAvailable;
        symbologyDescription._isColorInvertible = json.isColorInvertible;
        symbologyDescription._activeSymbolCountRange = Range['fromJSON'](json.activeSymbolCountRange);
        symbologyDescription._defaultSymbolCountRange = Range['fromJSON'](json.defaultSymbolCountRange);
        symbologyDescription._supportedExtensions = json.supportedExtensions;
        return symbologyDescription;
    }
    constructor(symbology) {
        if (!symbology) {
            return;
        }
        return SymbologyDescription.all[SymbologyDescription.all
            .findIndex(description => description.identifier === symbology.toString())];
    }
}

exports.CompositeType = void 0;
(function (CompositeType) {
    CompositeType["A"] = "A";
    CompositeType["B"] = "B";
    CompositeType["C"] = "C";
})(exports.CompositeType || (exports.CompositeType = {}));

exports.Checksum = void 0;
(function (Checksum) {
    Checksum["Mod10"] = "mod10";
    Checksum["Mod11"] = "mod11";
    Checksum["Mod16"] = "mod16";
    Checksum["Mod43"] = "mod43";
    Checksum["Mod47"] = "mod47";
    Checksum["Mod103"] = "mod103";
    Checksum["Mod10AndMod11"] = "mod1110";
    Checksum["Mod10AndMod10"] = "mod1010";
})(exports.Checksum || (exports.Checksum = {}));

class SymbologySettings extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get symbology() {
        return this._symbology;
    }
    get enabledExtensions() {
        return this.extensions;
    }
    static fromJSON(identifier, json) {
        const symbologySettings = new SymbologySettings();
        symbologySettings.extensions = json.extensions;
        symbologySettings.isEnabled = json.enabled;
        symbologySettings.isColorInvertedEnabled = json.colorInvertedEnabled;
        symbologySettings.checksums = json.checksums;
        symbologySettings.activeSymbolCounts = json.activeSymbolCounts;
        symbologySettings._symbology = identifier;
        return symbologySettings;
    }
    setExtensionEnabled(extension, enabled) {
        const included = this.extensions.includes(extension);
        if (enabled && !included) {
            this.extensions.push(extension);
        }
        else if (!enabled && included) {
            this.extensions.splice(this.extensions.indexOf(extension), 1);
        }
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('enabled')
], SymbologySettings.prototype, "isEnabled", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('colorInvertedEnabled')
], SymbologySettings.prototype, "isColorInvertedEnabled", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], SymbologySettings.prototype, "_symbology", void 0);

class Ean13UpcaClassification {
    static isUpca(barcode) {
        var _a, _b, _c;
        if (barcode.symbology !== exports.Symbology.EAN13UPCA) {
            return false;
        }
        return ((_a = barcode.data) === null || _a === void 0 ? void 0 : _a.length) === 12 || (((_b = barcode.data) === null || _b === void 0 ? void 0 : _b.length) === 13 && ((_c = barcode.data) === null || _c === void 0 ? void 0 : _c.charAt(0)) === '0');
    }
    static isEan13(barcode) {
        var _a, _b;
        if (barcode.symbology !== exports.Symbology.EAN13UPCA) {
            return false;
        }
        return ((_a = barcode.data) === null || _a === void 0 ? void 0 : _a.length) === 13 && ((_b = barcode.data) === null || _b === void 0 ? void 0 : _b.charAt(0)) !== '0';
    }
}

class ArucoDictionary {
    constructor() {
        this._preset = null;
        this._markers = null;
        this._markerSize = null;
    }
    static fromPreset(preset) {
        const arucoDictionary = new ArucoDictionary();
        arucoDictionary._preset = preset;
        return arucoDictionary;
    }
    static createWithMarkers(markerSize, markers) {
        const arucoDictionary = new ArucoDictionary();
        arucoDictionary._markerSize = markerSize;
        arucoDictionary._markers = markers;
        return arucoDictionary;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('preset')
], ArucoDictionary.prototype, "_preset", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('markers')
], ArucoDictionary.prototype, "_markers", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('markerSize')
], ArucoDictionary.prototype, "_markerSize", void 0);

exports.ArucoDictionaryPreset = void 0;
(function (ArucoDictionaryPreset) {
    ArucoDictionaryPreset["ArucoDictionaryPreset_5X5_50"] = "5X5_50";
    ArucoDictionaryPreset["ArucoDictionaryPreset_5X5_100"] = "5X5_100";
    ArucoDictionaryPreset["ArucoDictionaryPreset_5X5_250"] = "5X5_250";
    ArucoDictionaryPreset["ArucoDictionaryPreset_5X5_1000"] = "5X5_1000";
    ArucoDictionaryPreset["ArucoDictionaryPreset_5X5_1023"] = "5X5_1023";
    ArucoDictionaryPreset["ArucoDictionaryPreset_4X4_250"] = "4X4_250";
    ArucoDictionaryPreset["ArucoDictionaryPreset_6X6_250"] = "6X6_250";
})(exports.ArucoDictionaryPreset || (exports.ArucoDictionaryPreset = {}));

class ArucoMarker extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get size() {
        return this._markerSize;
    }
    get data() {
        return this._markerData;
    }
    static create(markerSize, markerData) {
        const arucoMarker = new ArucoMarker();
        arucoMarker._markerSize = markerSize || 0;
        arucoMarker._markerData = markerData || '';
        return arucoMarker;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('markerData')
], ArucoMarker.prototype, "_markerData", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('markerSize')
], ArucoMarker.prototype, "_markerSize", void 0);

function getBarcodeDefaults() {
    return scanditDatacaptureFrameworksCore.FactoryMaker.getInstance('BarcodeDefaults');
}
function parseBarcodeDefaults(jsonDefaults) {
    const barcodeDefaults = {
        SymbologySettings: Object.keys(jsonDefaults.SymbologySettings)
            .reduce((settings, identifier) => {
            const symbologySettings = SymbologySettings['fromJSON'](identifier, JSON.parse(jsonDefaults.SymbologySettings[identifier]));
            settings[identifier] = symbologySettings;
            return settings;
        }, {}),
        SymbologyDescriptions: jsonDefaults.SymbologyDescriptions.map((description) => SymbologyDescription['fromJSON'](JSON.parse(description))),
        CompositeTypeDescriptions: jsonDefaults.CompositeTypeDescriptions.map(JSON.parse),
    };
    SymbologyDescription['defaults'] = () => barcodeDefaults;
    return barcodeDefaults;
}

function getBarcodeCaptureDefaults() {
    return scanditDatacaptureFrameworksCore.FactoryMaker.getInstance('BarcodeCaptureDefaults');
}
function parseBarcodeCaptureDefaults(jsonDefaults) {
    const barcodeCaptureDefaults = {
        RecommendedCameraSettings: scanditDatacaptureFrameworksCore.CameraSettings['fromJSON'](jsonDefaults.RecommendedCameraSettings),
        BarcodeCaptureSettings: {
            codeDuplicateFilter: jsonDefaults.BarcodeCaptureSettings.codeDuplicateFilter,
            batterySaving: jsonDefaults.BarcodeCaptureSettings.batterySaving,
            scanIntention: jsonDefaults.BarcodeCaptureSettings.scanIntention,
        },
        BarcodeCaptureOverlay: {
            DefaultBrush: new scanditDatacaptureFrameworksCore.Brush(scanditDatacaptureFrameworksCore.Color['fromJSON'](jsonDefaults.BarcodeCaptureOverlay.DefaultBrush.fillColor), scanditDatacaptureFrameworksCore.Color['fromJSON'](jsonDefaults.BarcodeCaptureOverlay.DefaultBrush.strokeColor), jsonDefaults.BarcodeCaptureOverlay.DefaultBrush.strokeWidth),
        }
    };
    return barcodeCaptureDefaults;
}

function getBarcodeArDefaults() {
    return scanditDatacaptureFrameworksCore.FactoryMaker.getInstance('BarcodeArDefaults');
}

function getBarcodeSelectionDefaults() {
    return scanditDatacaptureFrameworksCore.FactoryMaker.getInstance('BarcodeSelectionDefaults');
}
function parseBarcodeSelectionDefaults(jsonDefaults) {
    const barcodeSelectionDefaults = {
        RecommendedCameraSettings: scanditDatacaptureFrameworksCore.CameraSettings['fromJSON'](jsonDefaults.RecommendedCameraSettings),
        Feedback: ({
            selection: scanditDatacaptureFrameworksCore.Feedback['fromJSON'](JSON.parse(jsonDefaults.Feedback).selection),
        }),
        BarcodeSelectionSettings: {
            codeDuplicateFilter: jsonDefaults.BarcodeSelectionSettings.codeDuplicateFilter,
            singleBarcodeAutoDetection: jsonDefaults.BarcodeSelectionSettings.singleBarcodeAutoDetection,
            selectionType: (fromJSON) => fromJSON(JSON.parse(jsonDefaults.BarcodeSelectionSettings.selectionType)),
        },
        BarcodeSelectionTapSelection: {
            defaultFreezeBehavior: jsonDefaults.BarcodeSelectionTapSelection
                .defaultFreezeBehavior,
            defaultTapBehavior: jsonDefaults.BarcodeSelectionTapSelection
                .defaultTapBehavior,
        },
        BarcodeSelectionAimerSelection: {
            defaultSelectionStrategy: (fromJSON) => fromJSON(JSON.parse(jsonDefaults.BarcodeSelectionAimerSelection.defaultSelectionStrategy)),
        },
        BarcodeSelectionBasicOverlay: {
            defaultStyle: jsonDefaults.BarcodeSelectionBasicOverlay.defaultStyle,
            styles: Object
                .keys(jsonDefaults.BarcodeSelectionBasicOverlay.styles)
                .reduce((previousValue, currentValue) => {
                return Object.assign(Object.assign({}, previousValue), { [currentValue]: {
                        DefaultTrackedBrush: {
                            fillColor: scanditDatacaptureFrameworksCore.Color['fromJSON'](jsonDefaults.BarcodeSelectionBasicOverlay.styles[currentValue]
                                .DefaultTrackedBrush.fillColor),
                            strokeColor: scanditDatacaptureFrameworksCore.Color['fromJSON'](jsonDefaults.BarcodeSelectionBasicOverlay.styles[currentValue]
                                .DefaultTrackedBrush.strokeColor),
                            strokeWidth: jsonDefaults.BarcodeSelectionBasicOverlay.styles[currentValue]
                                .DefaultTrackedBrush.strokeWidth,
                        },
                        DefaultAimedBrush: {
                            fillColor: scanditDatacaptureFrameworksCore.Color['fromJSON'](jsonDefaults.BarcodeSelectionBasicOverlay.styles[currentValue]
                                .DefaultAimedBrush.fillColor),
                            strokeColor: scanditDatacaptureFrameworksCore.Color['fromJSON'](jsonDefaults.BarcodeSelectionBasicOverlay.styles[currentValue]
                                .DefaultAimedBrush.strokeColor),
                            strokeWidth: jsonDefaults.BarcodeSelectionBasicOverlay.styles[currentValue]
                                .DefaultAimedBrush.strokeWidth,
                        },
                        DefaultSelectedBrush: {
                            fillColor: scanditDatacaptureFrameworksCore.Color['fromJSON'](jsonDefaults.BarcodeSelectionBasicOverlay.styles[currentValue]
                                .DefaultSelectedBrush.fillColor),
                            strokeColor: scanditDatacaptureFrameworksCore.Color['fromJSON'](jsonDefaults.BarcodeSelectionBasicOverlay.styles[currentValue]
                                .DefaultSelectedBrush.strokeColor),
                            strokeWidth: jsonDefaults.BarcodeSelectionBasicOverlay.styles[currentValue]
                                .DefaultSelectedBrush.strokeWidth,
                        },
                        DefaultSelectingBrush: {
                            fillColor: scanditDatacaptureFrameworksCore.Color['fromJSON'](jsonDefaults.BarcodeSelectionBasicOverlay.styles[currentValue]
                                .DefaultSelectingBrush.fillColor),
                            strokeColor: scanditDatacaptureFrameworksCore.Color['fromJSON'](jsonDefaults.BarcodeSelectionBasicOverlay.styles[currentValue]
                                .DefaultSelectingBrush.strokeColor),
                            strokeWidth: jsonDefaults.BarcodeSelectionBasicOverlay.styles[currentValue]
                                .DefaultSelectingBrush.strokeWidth,
                        },
                    } });
            }, {}),
        }
    };
    return barcodeSelectionDefaults;
}

class BarcodeFilterSettings extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get excludeEan13() {
        return this._excludeEan13;
    }
    set excludeEan13(value) {
        this._excludeEan13 = value;
    }
    get excludeUpca() {
        return this._excludeUpca;
    }
    set excludeUpca(value) {
        this._excludeUpca = value;
    }
    get excludedCodesRegex() {
        return this._excludedCodesRegex;
    }
    set excludedCodesRegex(value) {
        this._excludedCodesRegex = value;
    }
    get excludedSymbologies() {
        return this._excludedSymbologies;
    }
    set excludedSymbologies(values) {
        this._excludedSymbologies = values;
    }
    static fromJSON(json) {
        const excludeEan13 = json.excludeEan13;
        const excludeUpca = json.excludeUpca;
        const excludedCodesRegex = json.excludedCodesRegex;
        const excludedSymbologies = json.excludedSymbologies;
        const excludedSymbolCounts = json.excludedSymbolCounts;
        return new BarcodeFilterSettings(excludeEan13, excludeUpca, excludedCodesRegex, excludedSymbolCounts, excludedSymbologies);
    }
    constructor(excludeEan13, excludeUpca, excludedCodesRegex, excludedSymbolCounts, excludedSymbologies) {
        super();
        this._excludeEan13 = false;
        this._excludeUpca = false;
        this._excludedCodesRegex = '';
        this._excludedSymbolCounts = {};
        this._excludedSymbologies = [];
        this.excludeEan13 = excludeEan13;
        this.excludeUpca = excludeUpca;
        this.excludedCodesRegex = excludedCodesRegex;
        this._excludedSymbolCounts = excludedSymbolCounts;
        this.excludedSymbologies = excludedSymbologies;
    }
    getExcludedSymbolCountsForSymbology(symbology) {
        return this._excludedSymbolCounts[symbology] || [];
    }
    setExcludedSymbolCounts(excludedSymbolCounts, symbology) {
        this._excludedSymbolCounts[symbology] = excludedSymbolCounts;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('excludeEan13')
], BarcodeFilterSettings.prototype, "_excludeEan13", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('excludeUpca')
], BarcodeFilterSettings.prototype, "_excludeUpca", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('excludedCodesRegex')
], BarcodeFilterSettings.prototype, "_excludedCodesRegex", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('excludedSymbolCounts')
], BarcodeFilterSettings.prototype, "_excludedSymbolCounts", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('excludedSymbologies')
], BarcodeFilterSettings.prototype, "_excludedSymbologies", void 0);

function getBarcodeCountDefaults() {
    return scanditDatacaptureFrameworksCore.FactoryMaker.getInstance('BarcodeCountDefaults');
}
function parseBarcodeCountToolbarDefaults(jsonDefaults) {
    const barcodeCountToolbarSettingsDefault = {
        audioOnButtonText: jsonDefaults.audioOnButtonText,
        audioOffButtonText: jsonDefaults.audioOffButtonText,
        audioButtonContentDescription: jsonDefaults.audioButtonContentDescription,
        audioButtonAccessibilityHint: jsonDefaults.audioButtonAccessibilityHint,
        audioButtonAccessibilityLabel: jsonDefaults.audioButtonAccessibilityLabel,
        vibrationOnButtonText: jsonDefaults.vibrationOnButtonText,
        vibrationOffButtonText: jsonDefaults.vibrationOffButtonText,
        vibrationButtonContentDescription: jsonDefaults.vibrationButtonContentDescription,
        vibrationButtonAccessibilityHint: jsonDefaults.vibrationButtonAccessibilityHint,
        vibrationButtonAccessibilityLabel: jsonDefaults.vibrationButtonAccessibilityLabel,
        strapModeOnButtonText: jsonDefaults.strapModeOnButtonText,
        strapModeOffButtonText: jsonDefaults.strapModeOffButtonText,
        strapModeButtonContentDescription: jsonDefaults.strapModeButtonContentDescription,
        strapModeButtonAccessibilityHint: jsonDefaults.strapModeButtonAccessibilityHint,
        strapModeButtonAccessibilityLabel: jsonDefaults.strapModeButtonAccessibilityLabel,
        colorSchemeOnButtonText: jsonDefaults.colorSchemeOnButtonText,
        colorSchemeOffButtonText: jsonDefaults.colorSchemeOffButtonText,
        colorSchemeButtonContentDescription: jsonDefaults.colorSchemeButtonContentDescription,
        colorSchemeButtonAccessibilityHint: jsonDefaults.colorSchemeButtonAccessibilityHint,
        colorSchemeButtonAccessibilityLabel: jsonDefaults.colorSchemeButtonAccessibilityLabel,
    };
    return barcodeCountToolbarSettingsDefault;
}
function parseBrush(brushJson) {
    return new scanditDatacaptureFrameworksCore.Brush(scanditDatacaptureFrameworksCore.Color.fromHex(brushJson.fillColor), scanditDatacaptureFrameworksCore.Color.fromHex(brushJson.strokeColor), brushJson.strokeWidth);
}
function parseBarcodeCountDefaults(jsonDefaults) {
    const viewJsonDefaults = jsonDefaults.BarcodeCountView;
    const toolbarJsonDefaults = viewJsonDefaults.toolbarSettings;
    const barcodeCountDefaults = {
        RecommendedCameraSettings: scanditDatacaptureFrameworksCore.CameraSettings['fromJSON'](jsonDefaults.RecommendedCameraSettings),
        Feedback: {
            success: scanditDatacaptureFrameworksCore.Feedback['fromJSON'](JSON.parse(jsonDefaults.BarcodeCountFeedback).success),
            failure: scanditDatacaptureFrameworksCore.Feedback['fromJSON'](JSON.parse(jsonDefaults.BarcodeCountFeedback).failure)
        },
        BarcodeCountSettings: {
            expectOnlyUniqueBarcodes: jsonDefaults.BarcodeCountSettings.expectOnlyUniqueBarcodes,
            disableModeWhenCaptureListCompleted: jsonDefaults.BarcodeCountSettings.disableModeWhenCaptureListCompleted,
            barcodeFilterSettings: BarcodeFilterSettings['fromJSON'](jsonDefaults.BarcodeCountSettings.barcodeFilterSettings),
            mappingEnabled: jsonDefaults.BarcodeCountSettings.mappingEnabled,
        },
        BarcodeCountView: {
            style: viewJsonDefaults.style,
            shouldDisableModeOnExitButtonTapped: viewJsonDefaults.shouldDisableModeOnExitButtonTapped,
            shouldShowUserGuidanceView: viewJsonDefaults.shouldShowUserGuidanceView,
            shouldShowListButton: viewJsonDefaults.shouldShowListButton,
            shouldShowExitButton: viewJsonDefaults.shouldShowExitButton,
            shouldShowShutterButton: viewJsonDefaults.shouldShowShutterButton,
            shouldShowHints: viewJsonDefaults.shouldShowHints,
            shouldShowClearHighlightsButton: viewJsonDefaults.shouldShowClearHighlightsButton,
            shouldShowSingleScanButton: viewJsonDefaults.shouldShowSingleScanButton,
            shouldShowFloatingShutterButton: viewJsonDefaults.shouldShowFloatingShutterButton,
            shouldShowToolbar: viewJsonDefaults.shouldShowToolbar,
            defaultNotInListBrush: parseBrush(viewJsonDefaults.notInListBrush),
            defaultRecognizedBrush: parseBrush(viewJsonDefaults.recognizedBrush),
            defaultAcceptedBrush: parseBrush(viewJsonDefaults.acceptedBrush),
            defaultRejectedBrush: parseBrush(viewJsonDefaults.rejectedBrush),
            shouldShowScanAreaGuides: viewJsonDefaults.shouldShowScanAreaGuides,
            clearHighlightsButtonText: viewJsonDefaults.clearHighlightsButtonText,
            exitButtonText: viewJsonDefaults.exitButtonText,
            textForTapShutterToScanHint: viewJsonDefaults.textForTapShutterToScanHint,
            textForScanningHint: viewJsonDefaults.textForScanningHint,
            textForMoveCloserAndRescanHint: viewJsonDefaults.textForMoveCloserAndRescanHint,
            textForMoveFurtherAndRescanHint: viewJsonDefaults.textForMoveFurtherAndRescanHint,
            shouldShowListProgressBar: viewJsonDefaults.shouldShowListProgressBar,
            toolbarSettings: parseBarcodeCountToolbarDefaults(toolbarJsonDefaults),
            listButtonAccessibilityHint: viewJsonDefaults.listButtonAccessibilityHint || null,
            listButtonAccessibilityLabel: viewJsonDefaults.listButtonAccessibilityLabel || null,
            listButtonContentDescription: viewJsonDefaults.listButtonContentDescription || null,
            exitButtonAccessibilityHint: viewJsonDefaults.exitButtonAccessibilityHint || null,
            exitButtonAccessibilityLabel: viewJsonDefaults.exitButtonAccessibilityLabel || null,
            exitButtonContentDescription: viewJsonDefaults.exitButtonContentDescription || null,
            shutterButtonAccessibilityHint: viewJsonDefaults.shutterButtonAccessibilityHint || null,
            shutterButtonAccessibilityLabel: viewJsonDefaults.shutterButtonAccessibilityLabel || null,
            shutterButtonContentDescription: viewJsonDefaults.shutterButtonContentDescription || null,
            floatingShutterButtonAccessibilityHint: viewJsonDefaults.floatingShutterButtonAccessibilityHint || null,
            floatingShutterButtonAccessibilityLabel: viewJsonDefaults.floatingShutterButtonAccessibilityLabel || null,
            floatingShutterButtonContentDescription: viewJsonDefaults.floatingShutterButtonContentDescription || null,
            clearHighlightsButtonAccessibilityHint: viewJsonDefaults.clearHighlightsButtonAccessibilityHint || null,
            clearHighlightsButtonAccessibilityLabel: viewJsonDefaults.clearHighlightsButtonAccessibilityLabel || null,
            clearHighlightsButtonContentDescription: viewJsonDefaults.clearHighlightsButtonContentDescription || null,
            singleScanButtonAccessibilityHint: viewJsonDefaults.singleScanButtonAccessibilityHint || null,
            singleScanButtonAccessibilityLabel: viewJsonDefaults.singleScanButtonAccessibilityLabel || null,
            singleScanButtonContentDescription: viewJsonDefaults.singleScanButtonContentDescription || null,
            shouldShowTorchControl: viewJsonDefaults.shouldShowTorchControl,
            torchControlPosition: viewJsonDefaults.torchControlPosition,
            tapToUncountEnabled: viewJsonDefaults.tapToUncountEnabled,
            textForTapToUncountHint: viewJsonDefaults.textForTapToUncountHint,
            hardwareTriggerSupported: viewJsonDefaults.hardwareTriggerSupported,
        }
    };
    return barcodeCountDefaults;
}

function getBarcodeBatchDefaults() {
    return scanditDatacaptureFrameworksCore.FactoryMaker.getInstance('BarcodeBatchDefaults');
}
function parseBarcodeBatchDefaults(jsonDefaults) {
    const barcodeBatchDefaults = {
        RecommendedCameraSettings: scanditDatacaptureFrameworksCore.CameraSettings['fromJSON'](jsonDefaults.RecommendedCameraSettings),
        BarcodeBatchBasicOverlay: {
            defaultStyle: jsonDefaults.BarcodeBatchBasicOverlay.defaultStyle,
            styles: Object
                .keys(jsonDefaults.BarcodeBatchBasicOverlay.Brushes)
                .reduce((previousValue, currentValue) => {
                return Object.assign(Object.assign({}, previousValue), { [currentValue]: {
                        DefaultBrush: {
                            fillColor: scanditDatacaptureFrameworksCore.Color['fromJSON'](jsonDefaults.BarcodeBatchBasicOverlay.
                                Brushes[currentValue].fillColor),
                            strokeColor: scanditDatacaptureFrameworksCore.Color['fromJSON'](jsonDefaults.BarcodeBatchBasicOverlay.
                                Brushes[currentValue].strokeColor),
                            strokeWidth: jsonDefaults.BarcodeBatchBasicOverlay.
                                Brushes[currentValue].strokeWidth,
                        },
                    } });
            }, {}),
        }
    };
    return barcodeBatchDefaults;
}

function getSparkScanDefaults() {
    return scanditDatacaptureFrameworksCore.FactoryMaker.getInstance('SparkScanDefaults');
}

function getBarcodePickDefaults() {
    return scanditDatacaptureFrameworksCore.FactoryMaker.getInstance('BarcodePickDefaults');
}
function parseBarcodePickViewHighlightStyle(jsonStyles) {
    const styles = {};
    Object.entries(jsonStyles).forEach(([key, value]) => {
        styles[key] = JSON.parse(value);
    });
    return styles;
}
function parseBarcodePickDefaults(jsonDefaults) {
    const barcodePickDefaults = {
        RecommendedCameraSettings: scanditDatacaptureFrameworksCore.CameraSettings['fromJSON'](jsonDefaults.RecommendedCameraSettings),
        BarcodePickSettings: {
            arucoDictionary: jsonDefaults.BarcodePickSettings.arucoDictionary,
            cachingEnabled: jsonDefaults.BarcodePickSettings.cachingEnabled,
            hapticsEnabled: jsonDefaults.BarcodePickSettings.hapticsEnabled,
            soundEnabled: jsonDefaults.BarcodePickSettings.soundEnabled,
        },
        ViewSettings: {
            highlightStyle: JSON.parse(jsonDefaults.ViewSettings.HighlightStyle),
            initialGuidelineText: jsonDefaults.ViewSettings.initialGuidelineText,
            moveCloserGuidelineText: jsonDefaults.ViewSettings.moveCloserGuidelineText,
            showLoadingDialog: jsonDefaults.ViewSettings.showLoadingDialog,
            loadingDialogTextForPicking: jsonDefaults.ViewSettings.loadingDialogTextForPicking,
            loadingDialogTextForUnpicking: jsonDefaults.ViewSettings.loadingDialogTextForUnpicking,
            onFirstItemPickCompletedHintText: jsonDefaults.ViewSettings.onFirstItemPickCompletedHintText,
            onFirstItemToPickFoundHintText: jsonDefaults.ViewSettings.onFirstItemToPickFoundHintText,
            onFirstItemUnpickCompletedHintText: jsonDefaults.ViewSettings.onFirstItemUnpickCompletedHintText,
            onFirstUnmarkedItemPickCompletedHintText: jsonDefaults.ViewSettings.onFirstUnmarkedItemPickCompletedHintText,
            showGuidelines: jsonDefaults.ViewSettings.showGuidelines,
            showHints: jsonDefaults.ViewSettings.showHints,
            showFinishButton: jsonDefaults.ViewSettings.showFinishButton,
            showPauseButton: jsonDefaults.ViewSettings.showPauseButton,
            showZoomButton: jsonDefaults.ViewSettings.showZoomButton,
        },
        BarcodePickViewHighlightStyle: parseBarcodePickViewHighlightStyle(jsonDefaults.BarcodePickViewHighlightStyle),
        SymbologySettings: Object.keys(jsonDefaults.SymbologySettings)
            .reduce((settings, identifier) => {
            settings[identifier] = SymbologySettings['fromJSON'](identifier, JSON.parse(jsonDefaults.SymbologySettings[identifier]));
            return settings;
        }, {}),
        BarcodePickStatusIconSettings: {
            maxSize: jsonDefaults.maxSize,
            minSize: jsonDefaults.minSize,
            ratioToHighlightSize: jsonDefaults.ratioToHighlightSize,
        }
    };
    return barcodePickDefaults;
}

function getBarcodeFindDefaults() {
    return scanditDatacaptureFrameworksCore.FactoryMaker.getInstance('BarcodeFindDefaults');
}
function parseBarcodeFindDefaults(jsonDefaults) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const viewJsonDefaults = jsonDefaults.BarcodeFindView;
    const settingsJsonDefaults = jsonDefaults.BarcodeFindViewSettings;
    return {
        RecommendedCameraSettings: scanditDatacaptureFrameworksCore.CameraSettings['fromJSON'](jsonDefaults.RecommendedCameraSettings),
        Feedback: {
            found: scanditDatacaptureFrameworksCore.Feedback['fromJSON'](JSON.parse(jsonDefaults.BarcodeFindFeedback).found),
            itemListUpdated: scanditDatacaptureFrameworksCore.Feedback['fromJSON'](JSON.parse(jsonDefaults.BarcodeFindFeedback).itemListUpdated),
        },
        BarcodeFindView: {
            hardwareTriggerSupported: viewJsonDefaults.hardwareTriggerSupported,
            shouldShowCarousel: viewJsonDefaults.shouldShowCarousel,
            shouldShowFinishButton: viewJsonDefaults.shouldShowFinishButton,
            shouldShowHints: viewJsonDefaults.shouldShowHints,
            shouldShowPauseButton: viewJsonDefaults.shouldShowPauseButton,
            shouldShowProgressBar: viewJsonDefaults.shouldShowProgressBar,
            shouldShowUserGuidanceView: viewJsonDefaults.shouldShowUserGuidanceView,
            shouldShowTorchControl: viewJsonDefaults.shouldShowTorchControl,
            shouldShowZoomControl: viewJsonDefaults.shouldShowZoomControl,
            textForAllItemsFoundSuccessfullyHint: (_a = viewJsonDefaults.textForAllItemsFoundSuccessfullyHint) !== null && _a !== void 0 ? _a : null,
            textForItemListUpdatedHint: (_b = viewJsonDefaults.textForItemListUpdatedHint) !== null && _b !== void 0 ? _b : null,
            textForItemListUpdatedWhenPausedHint: (_c = viewJsonDefaults.textForItemListUpdatedWhenPausedHint) !== null && _c !== void 0 ? _c : null,
            textForCollapseCardsButton: (_d = viewJsonDefaults.textForCollapseCardsButton) !== null && _d !== void 0 ? _d : null,
            textForMoveCloserToBarcodesHint: (_e = viewJsonDefaults.textForMoveCloserToBarcodesHint) !== null && _e !== void 0 ? _e : null,
            textForPointAtBarcodesToSearchHint: (_f = viewJsonDefaults.textForPointAtBarcodesToSearchHint) !== null && _f !== void 0 ? _f : null,
            textForTapShutterToPauseScreenHint: (_g = viewJsonDefaults.textForTapShutterToPauseScreenHint) !== null && _g !== void 0 ? _g : null,
            textForTapShutterToResumeSearchHint: (_h = viewJsonDefaults.textForTapShutterToResumeSearchHint) !== null && _h !== void 0 ? _h : null,
            torchControlPosition: viewJsonDefaults.torchControlPosition,
        },
        BarcodeFindViewSettings: {
            progressBarStartColor: scanditDatacaptureFrameworksCore.Color['fromJSON'](settingsJsonDefaults.progressBarStartColor),
            progressBarFinishColor: scanditDatacaptureFrameworksCore.Color['fromJSON'](settingsJsonDefaults.progressBarFinishColor),
        }
    };
}

function parseSparkScanDefaults(jsonDefaults) {
    const sparkScanViewSettingsDefaults = JSON.parse(jsonDefaults.SparkScanView.SparkScanViewSettings);
    const toastSettingsDefaults = JSON.parse(sparkScanViewSettingsDefaults.toastSettings);
    const sparkScanDefaults = {
        Feedback: ({
            success: {
                visualFeedbackColor: scanditDatacaptureFrameworksCore.Color['fromJSON'](JSON.parse(jsonDefaults.Feedback.success).barcodeFeedback.visualFeedbackColor),
                brush: new scanditDatacaptureFrameworksCore.Brush(scanditDatacaptureFrameworksCore.Color['fromJSON'](JSON.parse(jsonDefaults.Feedback.success).barcodeFeedback.brush.fill.color), scanditDatacaptureFrameworksCore.Color['fromJSON'](JSON.parse(jsonDefaults.Feedback.success).barcodeFeedback.brush.stroke.color), JSON.parse(JSON.parse(jsonDefaults.Feedback.success).barcodeFeedback.brush.stroke.width)),
                feedbackDefault: scanditDatacaptureFrameworksCore.Feedback['fromJSON'](JSON.parse(jsonDefaults.Feedback.success).barcodeFeedback.feedback),
            },
            error: {
                visualFeedbackColor: JSON.parse(jsonDefaults.Feedback.error).barcodeFeedback.visualFeedbackColor,
                brush: new scanditDatacaptureFrameworksCore.Brush(scanditDatacaptureFrameworksCore.Color['fromJSON'](JSON.parse(jsonDefaults.Feedback.error).barcodeFeedback.brush.fill.color), scanditDatacaptureFrameworksCore.Color['fromJSON'](JSON.parse(jsonDefaults.Feedback.error).barcodeFeedback.brush.stroke.color), JSON.parse(JSON.parse(jsonDefaults.Feedback.error).barcodeFeedback.brush.stroke.width)),
                feedbackDefault: scanditDatacaptureFrameworksCore.Feedback['fromJSON'](JSON.parse(jsonDefaults.Feedback.error).barcodeFeedback.feedback),
            }
        }),
        SparkScanSettings: {
            batterySaving: jsonDefaults.SparkScanSettings.batterySaving,
            codeDuplicateFilter: jsonDefaults.SparkScanSettings.codeDuplicateFilter,
            locationSelection: (fromJSON) => {
                return fromJSON(JSON.parse(jsonDefaults.SparkScanSettings.locationSelection));
            },
            scanIntention: jsonDefaults.SparkScanSettings.scanIntention,
        },
        SparkScanView: {
            brush: new scanditDatacaptureFrameworksCore.Brush(scanditDatacaptureFrameworksCore.Color['fromJSON'](jsonDefaults.SparkScanView.brush.fillColor), scanditDatacaptureFrameworksCore.Color['fromJSON'](jsonDefaults.SparkScanView.brush.strokeColor), jsonDefaults.SparkScanView.brush.strokeWidth),
            torchControlVisible: jsonDefaults.SparkScanView.torchControlVisible,
            scanningBehaviorButtonVisible: jsonDefaults.SparkScanView.scanningBehaviorButtonVisible,
            barcodeCountButtonVisible: jsonDefaults.SparkScanView.barcodeCountButtonVisible,
            barcodeFindButtonVisible: jsonDefaults.SparkScanView.barcodeFindButtonVisible,
            targetModeButtonVisible: jsonDefaults.SparkScanView.targetModeButtonVisible,
            labelCaptureButtonVisible: jsonDefaults.SparkScanView.labelCaptureButtonVisible,
            previewSizeControlVisible: jsonDefaults.SparkScanView.previewSizeControlVisible,
            triggerButtonAnimationColor: jsonDefaults.SparkScanView.triggerButtonAnimationColor || null,
            triggerButtonExpandedColor: jsonDefaults.SparkScanView.triggerButtonExpandedColor || null,
            triggerButtonCollapsedColor: jsonDefaults.SparkScanView.triggerButtonCollapsedColor || null,
            triggerButtonTintColor: jsonDefaults.SparkScanView.triggerButtonTintColor || null,
            triggerButtonVisible: jsonDefaults.SparkScanView.triggerButtonVisible || null,
            triggerButtonImage: jsonDefaults.SparkScanView.triggerButtonImage || null,
            toolbarBackgroundColor: jsonDefaults.SparkScanView.toolbarBackgroundColor ? scanditDatacaptureFrameworksCore.Color['fromJSON'](jsonDefaults.SparkScanView.toolbarBackgroundColor) : null,
            toolbarIconActiveTintColor: jsonDefaults.SparkScanView.toolbarIconActiveTintColor ? scanditDatacaptureFrameworksCore.Color['fromJSON'](jsonDefaults.SparkScanView.toolbarIconActiveTintColor) : null,
            toolbarIconInactiveTintColor: jsonDefaults.SparkScanView.toolbarIconInactiveTintColor ? scanditDatacaptureFrameworksCore.Color['fromJSON'](jsonDefaults.SparkScanView.toolbarIconInactiveTintColor) : null,
            cameraSwitchButtonVisible: jsonDefaults.SparkScanView.cameraSwitchButtonVisible,
            SparkScanViewSettings: {
                triggerButtonCollapseTimeout: sparkScanViewSettingsDefaults.triggerButtonCollapseTimeout,
                defaultScanningMode: (fromJSON) => {
                    return fromJSON(JSON.parse(sparkScanViewSettingsDefaults.defaultScanningMode));
                },
                defaultTorchState: sparkScanViewSettingsDefaults.defaultTorchState,
                soundEnabled: sparkScanViewSettingsDefaults.soundEnabled,
                hapticEnabled: sparkScanViewSettingsDefaults.hapticEnabled,
                holdToScanEnabled: sparkScanViewSettingsDefaults.holdToScanEnabled,
                hardwareTriggerEnabled: sparkScanViewSettingsDefaults.hardwareTriggerEnabled,
                hardwareTriggerKeyCode: sparkScanViewSettingsDefaults.hardwareTriggerKeyCode,
                visualFeedbackEnabled: sparkScanViewSettingsDefaults.visualFeedbackEnabled ? sparkScanViewSettingsDefaults.visualFeedbackEnabled : false,
                toastSettings: {
                    toastEnabled: toastSettingsDefaults.toastEnabled,
                    toastBackgroundColor: toastSettingsDefaults.toastBackgroundColor ? scanditDatacaptureFrameworksCore.Color['fromJSON'](toastSettingsDefaults.toastBackgroundColor) : null,
                    toastTextColor: toastSettingsDefaults.toastTextColor ? scanditDatacaptureFrameworksCore.Color['fromJSON'](toastSettingsDefaults.toastTextColor) : null,
                    targetModeEnabledMessage: toastSettingsDefaults.targetModeEnabledMessage,
                    targetModeDisabledMessage: toastSettingsDefaults.targetModeDisabledMessage,
                    continuousModeEnabledMessage: toastSettingsDefaults.continuousModeEnabledMessage,
                    continuousModeDisabledMessage: toastSettingsDefaults.continuousModeDisabledMessage,
                    worldFacingCameraEnabledMessage: toastSettingsDefaults.worldFacingCameraEnabledMessage,
                    userFacingCameraEnabledMessage: toastSettingsDefaults.userFacingCameraEnabledMessage,
                    scanPausedMessage: toastSettingsDefaults.scanPausedMessage,
                    zoomedInMessage: toastSettingsDefaults.zoomedInMessage,
                    zoomedOutMessage: toastSettingsDefaults.zoomedOutMessage,
                    torchEnabledMessage: toastSettingsDefaults.torchEnabledMessage,
                    torchDisabledMessage: toastSettingsDefaults.torchDisabledMessage,
                },
                zoomFactorOut: sparkScanViewSettingsDefaults.zoomFactorOut,
                zoomFactorIn: sparkScanViewSettingsDefaults.zoomFactorIn,
                inactiveStateTimeout: sparkScanViewSettingsDefaults.inactiveStateTimeout,
                defaultCameraPosition: sparkScanViewSettingsDefaults.defaultCameraPosition,
                defaultMiniPreviewSize: sparkScanViewSettingsDefaults.defaultMiniPreviewSize,
            }
        },
    };
    return sparkScanDefaults;
}

function loadBarcodeDefaults(jsonDefaults) {
    const barcodeDefaults = parseBarcodeDefaults(jsonDefaults);
    scanditDatacaptureFrameworksCore.FactoryMaker.bindInstanceIfNotExists('BarcodeDefaults', barcodeDefaults);
}
function loadBarcodeCaptureDefaults(jsonDefaults) {
    const defaults = parseBarcodeCaptureDefaults(jsonDefaults);
    scanditDatacaptureFrameworksCore.FactoryMaker.bindInstanceIfNotExists('BarcodeCaptureDefaults', defaults);
}
function loadBarcodeCountDefaults(jsonDefaults) {
    const defaults = parseBarcodeCountDefaults(jsonDefaults);
    scanditDatacaptureFrameworksCore.FactoryMaker.bindInstanceIfNotExists('BarcodeCountDefaults', defaults);
}
function loadBarcodePickDefaults(jsonDefaults) {
    const defaults = parseBarcodePickDefaults(jsonDefaults);
    scanditDatacaptureFrameworksCore.FactoryMaker.bindInstanceIfNotExists('BarcodePickDefaults', defaults);
}
function loadBarcodeSelectionDefaults(jsonDefaults) {
    const defaults = parseBarcodeSelectionDefaults(jsonDefaults);
    scanditDatacaptureFrameworksCore.FactoryMaker.bindInstanceIfNotExists('BarcodeSelectionDefaults', defaults);
}
function loadBarcodeBatchDefaults(jsonDefaults) {
    const defaults = parseBarcodeBatchDefaults(jsonDefaults);
    scanditDatacaptureFrameworksCore.FactoryMaker.bindInstanceIfNotExists('BarcodeBatchDefaults', defaults);
}
function loadSparkScanDefaults(jsonDefaults) {
    const defaults = parseSparkScanDefaults(jsonDefaults);
    scanditDatacaptureFrameworksCore.FactoryMaker.bindInstanceIfNotExists('SparkScanDefaults', defaults);
}
function loadBarcodeFindDefaults(jsonDefaults) {
    const defaults = parseBarcodeFindDefaults(jsonDefaults);
    scanditDatacaptureFrameworksCore.FactoryMaker.bindInstanceIfNotExists('BarcodeFindDefaults', defaults);
}

class EncodingRange {
    get ianaName() { return this._ianaName; }
    get startIndex() { return this._startIndex; }
    get endIndex() { return this._endIndex; }
    static fromJSON(json) {
        const encodingRange = new EncodingRange();
        encodingRange._ianaName = json.ianaName;
        encodingRange._startIndex = json.startIndex;
        encodingRange._endIndex = json.endIndex;
        return encodingRange;
    }
}

class StructuredAppendData {
    get isComplete() { return this._isComplete; }
    get barcodeSetId() { return this._barcodeSetId; }
    get scannedSegmentCount() { return this._scannedSegmentCount; }
    get totalSegmentCount() { return this._totalSegmentCount; }
    get encodingRanges() { return this._encodingRanges; }
    get completeData() { return this._completeData; }
    get rawCompleteData() { return this._rawCompleteData; }
    static fromJSON(json) {
        const structuredAppendData = new StructuredAppendData();
        if (!json)
            return null;
        structuredAppendData._isComplete = json.complete;
        structuredAppendData._barcodeSetId = json.barcodeSetId;
        structuredAppendData._scannedSegmentCount = json.scannedSegmentCount;
        structuredAppendData._totalSegmentCount = json.totalSegmentCount;
        structuredAppendData._encodingRanges =
            json.completeDataEncodings.map(EncodingRange['fromJSON']);
        structuredAppendData._completeData = json.completeDataUtf8String;
        structuredAppendData._rawCompleteData = json.completeDataRaw;
        return structuredAppendData;
    }
}

class Barcode extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get symbology() { return this._symbology; }
    get data() { return this._data; }
    get rawData() { return this._rawData; }
    get compositeData() { return this._compositeData; }
    get compositeRawData() { return this._compositeRawData; }
    get addOnData() { return this._addOnData; }
    get encodingRanges() { return this._encodingRanges; }
    get location() { return this._location; }
    get isGS1DataCarrier() { return this._isGS1DataCarrier; }
    get compositeFlag() { return this._compositeFlag; }
    get isColorInverted() { return this._isColorInverted; }
    get symbolCount() { return this._symbolCount; }
    get frameID() { return this._frameID; }
    get isStructuredAppend() { return this._structuredAppendData !== null; }
    get structuredAppendData() { return this._structuredAppendData; }
    get selectionIdentifier() { return this.data + this.symbology; }
    static fromJSON(json) {
        const barcode = new Barcode();
        barcode._symbology = json.symbology;
        barcode._data = json.data;
        barcode._rawData = json.rawData;
        barcode._compositeData = json.compositeData;
        barcode._compositeRawData = json.compositeRawData;
        barcode._addOnData = json.addOnData === undefined ? null : json.addOnData;
        barcode._isGS1DataCarrier = json.isGS1DataCarrier;
        barcode._compositeFlag = json.compositeFlag;
        barcode._isColorInverted = json.isColorInverted;
        barcode._symbolCount = json.symbolCount;
        barcode._frameID = json.frameId;
        barcode._encodingRanges = json.encodingRanges.map(EncodingRange['fromJSON']);
        barcode._location = scanditDatacaptureFrameworksCore.Quadrilateral['fromJSON'](json.location);
        barcode._structuredAppendData =
            StructuredAppendData['fromJSON'](json.structuredAppendData);
        return barcode;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], Barcode.prototype, "_barcodeId", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('symbology')
], Barcode.prototype, "_symbology", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('data')
], Barcode.prototype, "_data", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('rawData')
], Barcode.prototype, "_rawData", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('compositeData')
], Barcode.prototype, "_compositeData", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('compositeRawData')
], Barcode.prototype, "_compositeRawData", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('addOnData')
], Barcode.prototype, "_addOnData", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('encodingRanges')
], Barcode.prototype, "_encodingRanges", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('location')
], Barcode.prototype, "_location", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('isGS1DataCarrier')
], Barcode.prototype, "_isGS1DataCarrier", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('compositeFlag')
], Barcode.prototype, "_compositeFlag", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('isColorInverted')
], Barcode.prototype, "_isColorInverted", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('symbolCount')
], Barcode.prototype, "_symbolCount", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('frameID')
], Barcode.prototype, "_frameID", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('structuredAppendData')
], Barcode.prototype, "_structuredAppendData", void 0);

exports.BatterySavingMode = void 0;
(function (BatterySavingMode) {
    BatterySavingMode["On"] = "on";
    BatterySavingMode["Off"] = "off";
    BatterySavingMode["Auto"] = "auto";
})(exports.BatterySavingMode || (exports.BatterySavingMode = {}));

exports.CompositeFlag = void 0;
(function (CompositeFlag) {
    CompositeFlag["None"] = "none";
    CompositeFlag["Unknown"] = "unknown";
    CompositeFlag["Linked"] = "linked";
    CompositeFlag["GS1TypeA"] = "gs1TypeA";
    CompositeFlag["GS1TypeB"] = "gs1TypeB";
    CompositeFlag["GS1TypeC"] = "gs1TypeC";
})(exports.CompositeFlag || (exports.CompositeFlag = {}));

class LocalizedOnlyBarcode {
    get location() {
        return this._location;
    }
    get frameID() {
        return this._frameID;
    }
    static fromJSON(json) {
        const localizedBarcode = new LocalizedOnlyBarcode();
        localizedBarcode._location = scanditDatacaptureFrameworksCore.Quadrilateral['fromJSON'](json.location);
        localizedBarcode._frameID = json.frameId;
        return localizedBarcode;
    }
}

class TargetBarcode extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get data() {
        return this._data;
    }
    get quantity() {
        return this._quantity;
    }
    static create(data, quantity) {
        return new TargetBarcode(data, quantity);
    }
    static fromJSON(json) {
        const data = json.data;
        const quantity = json.quantity;
        return TargetBarcode.create(data, quantity);
    }
    constructor(data, quantity) {
        super();
        this._data = data;
        this._quantity = quantity;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('data')
], TargetBarcode.prototype, "_data", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('quantity')
], TargetBarcode.prototype, "_quantity", void 0);

class TrackedBarcode {
    get barcode() { return this._barcode; }
    get location() { return this._location; }
    get identifier() { return this._identifier; }
    get sessionFrameSequenceID() {
        return this._sessionFrameSequenceID;
    }
    static fromJSON(json, sessionFrameSequenceID) {
        const trackedBarcode = new TrackedBarcode();
        // The serialization returns the identifier as a string, not a number, which it originally is.
        // This is because the identifier needs to be used as a key in a dictionary, which in JSON can only be a string.
        // We can assume that it is a number in the string that we can safely parse.
        trackedBarcode._identifier = parseInt(json.identifier.toString(), 10);
        trackedBarcode._barcode = Barcode['fromJSON'](json.barcode);
        trackedBarcode._location = scanditDatacaptureFrameworksCore.Quadrilateral['fromJSON'](json.location);
        trackedBarcode._sessionFrameSequenceID = sessionFrameSequenceID ? sessionFrameSequenceID : null;
        return trackedBarcode;
    }
}

class BarcodeSpatialGrid extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static fromJSON(json) {
        const spatialGrid = new BarcodeSpatialGrid();
        spatialGrid._rows = json.rows;
        spatialGrid._columns = json.columns;
        spatialGrid._grid = json.grid;
        return spatialGrid;
    }
    get rows() {
        return this._rows;
    }
    get columns() {
        return this._columns;
    }
    barcodeAt(row, column) {
        const barcodeJSON = this._grid[row][column]["mainBarcode"];
        if (barcodeJSON) {
            return Barcode['fromJSON'](barcodeJSON);
        }
        return null;
    }
    row(index) {
        const elementsJSON = this._grid[index];
        if (elementsJSON) {
            return ((elementsJSON.map((it) => it.mainBarcode)).map(Barcode['fromJSON']));
        }
        return [];
    }
    column(index) {
        const elementsJSON = this._grid.map(elements => elements[index]);
        if (elementsJSON) {
            return ((elementsJSON.map((it) => it.mainBarcode)).map(Barcode['fromJSON']));
        }
        return [];
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('rows')
], BarcodeSpatialGrid.prototype, "_rows", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('columns')
], BarcodeSpatialGrid.prototype, "_columns", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('grid')
], BarcodeSpatialGrid.prototype, "_grid", void 0);

class BarcodeCaptureFeedback extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor() {
        super(...arguments);
        this.success = scanditDatacaptureFrameworksCore.Feedback.defaultFeedback;
    }
    static get default() {
        return new BarcodeCaptureFeedback();
    }
}

class BarcodeCaptureSession {
    get newlyRecognizedBarcode() {
        return this._newlyRecognizedBarcode;
    }
    get newlyLocalizedBarcodes() {
        return this._newlyLocalizedBarcodes;
    }
    get frameSequenceID() {
        return this._frameSequenceID;
    }
    static fromJSON(json) {
        var _a;
        const sessionJson = JSON.parse(json.session);
        const session = new BarcodeCaptureSession();
        session._newlyRecognizedBarcode = sessionJson.newlyRecognizedBarcode != null ?
            Barcode['fromJSON'](sessionJson.newlyRecognizedBarcode) :
            null;
        session._newlyLocalizedBarcodes = sessionJson.newlyLocalizedBarcodes
            .map(LocalizedOnlyBarcode['fromJSON']);
        session._frameSequenceID = sessionJson.frameSequenceId;
        session.frameId = (_a = json.frameId) !== null && _a !== void 0 ? _a : '';
        return session;
    }
    reset() {
        return this.controller.reset();
    }
}

var BarcodeCaptureListenerEvents;
(function (BarcodeCaptureListenerEvents) {
    BarcodeCaptureListenerEvents["didUpdateSession"] = "BarcodeCaptureListener.didUpdateSession";
    BarcodeCaptureListenerEvents["didScan"] = "BarcodeCaptureListener.didScan";
})(BarcodeCaptureListenerEvents || (BarcodeCaptureListenerEvents = {}));
class BarcodeCaptureListenerController extends scanditDatacaptureFrameworksCore.BaseController {
    constructor(barcodeCapture) {
        super('BarcodeCaptureListenerProxy');
        this.isListeningForEvents = false;
        this.handleDidUpdateSessionWrapper = (ev) => {
            return this.handleDidUpdateSession(ev);
        };
        this.handleDidScanWrapper = (ev) => {
            return this.handleDidScan(ev);
        };
        this.mode = barcodeCapture;
        void this.initialize();
    }
    get modeId() {
        return this.mode['modeId'];
    }
    reset() {
        return this._proxy.$resetBarcodeCaptureSession();
    }
    setModeEnabledState(enabled) {
        return this._proxy.$setBarcodeCaptureModeEnabledState({ modeId: this.modeId, enabled });
    }
    updateBarcodeCaptureMode() {
        return this._proxy.$updateBarcodeCaptureMode({ modeJson: JSON.stringify(this.mode.toJSON()) });
    }
    applyBarcodeCaptureModeSettings(modeSettings) {
        return this._proxy.$applyBarcodeCaptureModeSettings({ modeId: this.modeId, modeSettingsJson: JSON.stringify(modeSettings.toJSON()) });
    }
    subscribeListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (this.isListeningForEvents) {
                return;
            }
            this._proxy.subscribeForEvents(Object.values(BarcodeCaptureListenerEvents));
            yield this._proxy.$$registerBarcodeCaptureListenerForEvents({ modeId: this.modeId });
            this._proxy.eventEmitter.on(BarcodeCaptureListenerEvents.didUpdateSession, this.handleDidUpdateSessionWrapper);
            this._proxy.eventEmitter.on(BarcodeCaptureListenerEvents.didScan, this.handleDidScanWrapper);
            this.isListeningForEvents = true;
        });
    }
    unsubscribeListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isListeningForEvents) {
                return;
            }
            yield this._proxy.$unregisterBarcodeCaptureListenerForEvents({ modeId: this.modeId });
            this._proxy.unsubscribeFromEvents(Object.values(BarcodeCaptureListenerEvents));
            this._proxy.eventEmitter.off(BarcodeCaptureListenerEvents.didUpdateSession, this.handleDidUpdateSessionWrapper);
            this._proxy.eventEmitter.off(BarcodeCaptureListenerEvents.didScan, this.handleDidScanWrapper);
            this.isListeningForEvents = false;
        });
    }
    dispose() {
        void this.unsubscribeListener();
        this._proxy.dispose();
    }
    initialize() {
        if (this.mode['listeners'].length > 0) {
            void this.subscribeListener();
        }
    }
    handleDidUpdateSession(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('BarcodeCaptureListenerController.subscribeListener: didUpdateSession payload is null');
                return;
            }
            if (payload.modeId !== this.modeId) {
                return;
            }
            const session = BarcodeCaptureSession['fromJSON'](payload);
            yield this.notifyListenersOfDidUpdateSession(session);
            return this._proxy.$finishBarcodeCaptureDidUpdateSession({ modeId: this.modeId, enabled: this.mode.isEnabled });
        });
    }
    handleDidScan(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('BarcodeCaptureListenerController.subscribeListener: didScan payload is null');
                return;
            }
            if (payload.modeId !== this.modeId) {
                return;
            }
            const session = BarcodeCaptureSession['fromJSON'](payload);
            yield this.notifyListenersOfDidScan(session);
            return this._proxy.$finishBarcodeCaptureDidScan({ modeId: this.modeId, enabled: this.mode.isEnabled });
        });
    }
    notifyListenersOfDidUpdateSession(session) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const mode = this.mode;
            for (const listener of mode['listeners']) {
                if (listener.didUpdateSession) {
                    yield listener.didUpdateSession(this.mode, session, () => scanditDatacaptureFrameworksCore.CameraController.getFrame(session['frameId']));
                }
            }
        });
    }
    notifyListenersOfDidScan(session) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const mode = this.mode;
            for (const listener of mode['listeners']) {
                if (listener.didScan) {
                    yield listener.didScan(this.mode, session, () => scanditDatacaptureFrameworksCore.CameraController.getFrame(session['frameId']));
                }
            }
        });
    }
}

class BarcodeCapture extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static get barcodeCaptureDefaults() {
        return getBarcodeCaptureDefaults();
    }
    get _context() {
        return this.privateContext;
    }
    set _context(newContext) {
        var _a, _b;
        if (newContext == null) {
            void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.dispose());
            this.controller = null;
            this.privateContext = null;
            return;
        }
        this.privateContext = newContext;
        (_b = this.controller) !== null && _b !== void 0 ? _b : (this.controller = new BarcodeCaptureListenerController(this));
    }
    static createRecommendedCameraSettings() {
        return new scanditDatacaptureFrameworksCore.CameraSettings(BarcodeCapture.barcodeCaptureDefaults.RecommendedCameraSettings);
    }
    constructor(settings) {
        super();
        this.type = 'barcodeCapture';
        this.modeId = Math.floor(Math.random() * 100000000);
        this._isEnabled = true;
        this._feedback = BarcodeCaptureFeedback.default;
        this.privateContext = null;
        this.parentId = null;
        this.listeners = [];
        this.hasListeners = false;
        this.controller = null;
        this.settings = settings;
    }
    get isEnabled() {
        return this._isEnabled;
    }
    set isEnabled(isEnabled) {
        var _a;
        this._isEnabled = isEnabled;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.setModeEnabledState(isEnabled));
    }
    get context() {
        return this._context;
    }
    get feedback() {
        return this._feedback;
    }
    set feedback(feedback) {
        var _a;
        this._feedback = feedback;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateBarcodeCaptureMode());
    }
    applySettings(settings) {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            this.settings = settings;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.applyBarcodeCaptureModeSettings(settings);
        });
    }
    addListener(listener) {
        var _a;
        if (this.listeners.includes(listener)) {
            return;
        }
        if (this.listeners.length === 0) {
            void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.subscribeListener());
        }
        this.listeners.push(listener);
        this.hasListeners = this.listeners.length > 0;
    }
    removeListener(listener) {
        var _a;
        if (!this.listeners.includes(listener)) {
            return;
        }
        this.listeners.splice(this.listeners.indexOf(listener), 1);
        this.hasListeners = this.listeners.length > 0;
        if (!this.hasListeners) {
            void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.unsubscribeListener());
        }
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('enabled')
], BarcodeCapture.prototype, "_isEnabled", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('feedback')
], BarcodeCapture.prototype, "_feedback", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCapture.prototype, "privateContext", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('parentId'),
    scanditDatacaptureFrameworksCore.ignoreFromSerializationIfNull
], BarcodeCapture.prototype, "parentId", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCapture.prototype, "listeners", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCapture.prototype, "controller", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCapture, "barcodeCaptureDefaults", null);

class BarcodeCaptureOverlayController extends scanditDatacaptureFrameworksCore.BaseController {
    constructor(overlay) {
        super('BarcodeCaptureOverlayProxy');
        this.overlay = overlay;
    }
    updateBarcodeCaptureOverlay(overlay) {
        const view = this.overlay['view'];
        if (view === null) {
            return Promise.resolve();
        }
        return this._proxy.$updateBarcodeCaptureOverlay({
            viewId: view.viewId,
            overlayJson: JSON.stringify(overlay.toJSON())
        });
    }
    dispose() {
        this._proxy.dispose();
    }
}

class BarcodeCaptureOverlay extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get view() {
        return this._view;
    }
    set view(newView) {
        var _a, _b;
        if (newView === null) {
            (_a = this.controller) === null || _a === void 0 ? void 0 : _a.dispose();
            this.controller = null;
            this._view = null;
            return;
        }
        this._view = newView;
        (_b = this.controller) !== null && _b !== void 0 ? _b : (this.controller = new BarcodeCaptureOverlayController(this));
    }
    static get barcodeCaptureDefaults() {
        return getBarcodeCaptureDefaults();
    }
    get brush() {
        return this._brush;
    }
    set brush(newBrush) {
        var _a;
        this._brush = newBrush;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateBarcodeCaptureOverlay(this));
    }
    get viewfinder() {
        return this._viewfinder;
    }
    set viewfinder(newViewfinder) {
        var _a;
        if (this._viewfinder) {
            this._viewfinder._onChange = undefined;
        }
        this._viewfinder = newViewfinder;
        if (newViewfinder) {
            newViewfinder._onChange = () => {
                var _a;
                void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateBarcodeCaptureOverlay(this));
            };
        }
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateBarcodeCaptureOverlay(this));
    }
    get shouldShowScanAreaGuides() {
        return this._shouldShowScanAreaGuides;
    }
    set shouldShowScanAreaGuides(shouldShow) {
        var _a;
        this._shouldShowScanAreaGuides = shouldShow;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateBarcodeCaptureOverlay(this));
    }
    constructor(mode) {
        super();
        this.type = 'barcodeCapture';
        this.controller = null;
        this._view = null;
        this._shouldShowScanAreaGuides = false;
        this._viewfinder = null;
        this._brush = BarcodeCaptureOverlay.barcodeCaptureDefaults.BarcodeCaptureOverlay.DefaultBrush;
        this.modeId = mode['modeId'];
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCaptureOverlay.prototype, "controller", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCaptureOverlay.prototype, "_view", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('shouldShowScanAreaGuides')
], BarcodeCaptureOverlay.prototype, "_shouldShowScanAreaGuides", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.serializationDefault(scanditDatacaptureFrameworksCore.NoViewfinder),
    scanditDatacaptureFrameworksCore.nameForSerialization('viewfinder')
], BarcodeCaptureOverlay.prototype, "_viewfinder", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('brush')
], BarcodeCaptureOverlay.prototype, "_brush", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCaptureOverlay, "barcodeCaptureDefaults", null);

class BarcodeCaptureSettings extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get enabledSymbologies() {
        return Object.keys(this.symbologies)
            .filter(symbology => this.symbologies[symbology].isEnabled);
    }
    get compositeTypeDescriptions() {
        return BarcodeCaptureSettings.barcodeDefaults.CompositeTypeDescriptions.reduce((descriptions, description) => {
            descriptions[description.types[0]] = description;
            return descriptions;
        }, {});
    }
    static get barcodeDefaults() {
        return getBarcodeDefaults();
    }
    static get barcodeCaptureDefaults() {
        return getBarcodeCaptureDefaults();
    }
    constructor() {
        super();
        this.locationSelection = null;
        this.enabledCompositeTypes = [];
        this.batterySaving = BarcodeCaptureSettings.barcodeCaptureDefaults.BarcodeCaptureSettings.batterySaving;
        this.scanIntention = BarcodeCaptureSettings.barcodeCaptureDefaults.BarcodeCaptureSettings.scanIntention;
        this.properties = {};
        this.symbologies = {};
        this._codeDuplicateFilter = BarcodeCaptureSettings.barcodeCaptureDefaults.BarcodeCaptureSettings.codeDuplicateFilter;
        this._arucoDictionary = null;
    }
    settingsForSymbology(symbology) {
        if (!this.symbologies[symbology]) {
            const symbologySettings = BarcodeCaptureSettings.barcodeDefaults.SymbologySettings[symbology];
            symbologySettings['_symbology'] = symbology;
            this.symbologies[symbology] = symbologySettings;
        }
        return this.symbologies[symbology];
    }
    setProperty(name, value) {
        this.properties[name] = value;
    }
    getProperty(name) {
        return this.properties[name];
    }
    enableSymbologies(symbologies) {
        symbologies.forEach(symbology => this.enableSymbology(symbology, true));
    }
    enableSymbology(symbology, enabled) {
        this.settingsForSymbology(symbology).isEnabled = enabled;
    }
    enableSymbologiesForCompositeTypes(compositeTypes) {
        compositeTypes.forEach(compositeType => {
            this.enableSymbologies(this.compositeTypeDescriptions[compositeType].symbologies);
        });
    }
    setArucoDictionary(dictionary) {
        this._arucoDictionary = dictionary;
    }
    get codeDuplicateFilter() {
        return this._codeDuplicateFilter;
    }
    set codeDuplicateFilter(value) {
        this._codeDuplicateFilter = value;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.serializationDefault(scanditDatacaptureFrameworksCore.NoneLocationSelection)
], BarcodeCaptureSettings.prototype, "locationSelection", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('codeDuplicateFilter')
], BarcodeCaptureSettings.prototype, "_codeDuplicateFilter", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('arucoDictionary')
], BarcodeCaptureSettings.prototype, "_arucoDictionary", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCaptureSettings, "barcodeDefaults", null);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCaptureSettings, "barcodeCaptureDefaults", null);

class BarcodeArFeedback extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static get barcodeArDefaults() {
        return getBarcodeArDefaults();
    }
    static get defaultFeedback() {
        const feedback = new BarcodeArFeedback();
        feedback.scanned = BarcodeArFeedback.barcodeArDefaults.Feedback.scanned;
        feedback.tapped = BarcodeArFeedback.barcodeArDefaults.Feedback.tapped;
        return feedback;
    }
    static fromJSON(json) {
        const scanned = scanditDatacaptureFrameworksCore.Feedback['fromJSON'](json.scanned);
        const tapped = scanditDatacaptureFrameworksCore.Feedback['fromJSON'](json.tapped);
        const feedback = new BarcodeArFeedback();
        feedback.scanned = scanned;
        feedback.tapped = tapped;
        return feedback;
    }
    get scanned() {
        return this._scanned;
    }
    set scanned(scanned) {
        this._scanned = scanned;
        void this.updateFeedback();
    }
    get tapped() {
        return this._tapped;
    }
    set tapped(tapped) {
        this._tapped = tapped;
        void this.updateFeedback();
    }
    constructor() {
        super();
        this._scanned = BarcodeArFeedback.barcodeArDefaults.Feedback.scanned;
        this._tapped = BarcodeArFeedback.barcodeArDefaults.Feedback.tapped;
        this.controller = null;
        this.scanned = new scanditDatacaptureFrameworksCore.Feedback(null, null);
        this.tapped = new scanditDatacaptureFrameworksCore.Feedback(null, null);
    }
    updateFeedback() {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            yield ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateFeedback(JSON.stringify(this.toJSON())));
        });
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('scanned')
], BarcodeArFeedback.prototype, "_scanned", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('tapped')
], BarcodeArFeedback.prototype, "_tapped", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeArFeedback.prototype, "controller", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeArFeedback, "barcodeArDefaults", null);

class BarcodeAr extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get controller() {
        return this._controller;
    }
    set controller(newController) {
        this._controller = newController;
        this._feedback['controller'] = this.controller;
    }
    static get barcodeArDefaults() {
        return getBarcodeArDefaults();
    }
    static createRecommendedCameraSettings() {
        return new scanditDatacaptureFrameworksCore.CameraSettings(BarcodeAr.barcodeArDefaults.RecommendedCameraSettings);
    }
    constructor(settings) {
        super();
        this.type = 'barcodeAr';
        this.privateContext = null;
        this._feedback = BarcodeArFeedback.defaultFeedback;
        this.listeners = [];
        this._controller = null;
        this._settings = settings;
    }
    applySettings(settings) {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            this._settings = settings;
            return (_a = this._controller) === null || _a === void 0 ? void 0 : _a.applyNewSettings(settings);
        });
    }
    addListener(listener) {
        this.checkAndSubscribeListeners();
        if (this.listeners.includes(listener)) {
            return;
        }
        this.listeners.push(listener);
    }
    removeListener(listener) {
        if (!this.listeners.includes(listener)) {
            return;
        }
        this.listeners.splice(this.listeners.indexOf(listener));
        this.checkAndUnsubscribeListeners();
    }
    toJSON() {
        const json = Object.assign(Object.assign({}, super.toJSON()), { hasModeListener: this.listeners.length > 0 });
        return json;
    }
    checkAndSubscribeListeners() {
        if (this.listeners.length === 0) {
            this.subscribeNativeListeners();
        }
    }
    checkAndUnsubscribeListeners() {
        if (this.listeners.length === 0) {
            this.unsubscribeNativeListeners();
        }
    }
    subscribeNativeListeners() {
        var _a;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.registerModeListener());
    }
    unsubscribeNativeListeners() {
        var _a;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.unregisterModeListener());
    }
    didChange() {
        var _a, _b;
        return (_b = (_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateMode()) !== null && _b !== void 0 ? _b : Promise.resolve();
    }
    get _context() {
        return this.privateContext;
    }
    set _context(newContext) {
        this.privateContext = newContext;
    }
    get feedback() {
        return this._feedback;
    }
    set feedback(feedback) {
        var _a;
        this._feedback = feedback;
        this._feedback['controller'] = this.controller;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateFeedback(JSON.stringify(feedback.toJSON())));
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeAr.prototype, "privateContext", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('feedback')
], BarcodeAr.prototype, "_feedback", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('settings')
], BarcodeAr.prototype, "_settings", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeAr.prototype, "listeners", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeAr.prototype, "_controller", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeAr, "barcodeArDefaults", null);

class BarcodeArCircleHighlight extends scanditDatacaptureFrameworksCore.Observable {
    static get barcodeArDefaults() {
        return getBarcodeArDefaults();
    }
    constructor(barcode, preset) {
        super();
        this._type = 'barcodeArCircleHighlight';
        this._barcode = barcode;
        this._preset = preset;
        this._brush = BarcodeArCircleHighlight.barcodeArDefaults.BarcodeArView.circleHighlightPresets[preset].brush;
        this._size = BarcodeArCircleHighlight.barcodeArDefaults.BarcodeArView.circleHighlightPresets[preset].size;
        this._icon = BarcodeArCircleHighlight.barcodeArDefaults.BarcodeArView.defaultHighlightIcon;
    }
    get barcode() {
        return this._barcode;
    }
    get brush() {
        return this._brush;
    }
    set brush(brush) {
        this._brush = brush;
        this.notifyListeners('brush', brush);
    }
    get icon() {
        return this._icon;
    }
    set icon(value) {
        this._icon = value;
        this.notifyListeners('icon', value);
    }
    get size() {
        return this._size;
    }
    set size(value) {
        this._size = value;
        this.notifyListeners('size', value);
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('type')
], BarcodeArCircleHighlight.prototype, "_type", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeArCircleHighlight.prototype, "_barcode", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('brush')
], BarcodeArCircleHighlight.prototype, "_brush", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('icon')
], BarcodeArCircleHighlight.prototype, "_icon", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('preset')
], BarcodeArCircleHighlight.prototype, "_preset", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('size')
], BarcodeArCircleHighlight.prototype, "_size", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeArCircleHighlight, "barcodeArDefaults", null);

class BarcodeArInfoAnnotation extends scanditDatacaptureFrameworksCore.Observable {
    static get barcodeArDefaults() {
        return getBarcodeArDefaults();
    }
    constructor(barcode) {
        super();
        this._type = 'barcodeArInfoAnnotation';
        this._annotationTrigger = BarcodeArInfoAnnotation.barcodeArDefaults
            .BarcodeArView.defaultInfoAnnotationTrigger;
        this._anchor = BarcodeArInfoAnnotation.barcodeArDefaults
            .BarcodeArView.defaultInfoAnnotationAnchor;
        this._backgroundColor = BarcodeArInfoAnnotation.barcodeArDefaults
            .BarcodeArView.defaultInfoAnnotationBackgroundColor;
        this._body = [];
        this._footer = null;
        this._hasTip = BarcodeArInfoAnnotation.barcodeArDefaults
            .BarcodeArView.defaultInfoAnnotationHasTip;
        this._header = null;
        this._isEntireAnnotationTappable = BarcodeArInfoAnnotation.barcodeArDefaults
            .BarcodeArView.defaultInfoAnnotationEntireAnnotationTappable;
        this._listener = null;
        this._hasListener = false;
        this._width = BarcodeArInfoAnnotation.barcodeArDefaults.BarcodeArView.defaultInfoAnnotationWidth;
        this.footerChangedListener = () => {
            this.notifyListeners('footer', this._footer);
        };
        this.headerChangedListener = () => {
            this.notifyListeners('header', this._header);
        };
        this._barcode = barcode;
    }
    get anchor() {
        return this._anchor;
    }
    set anchor(newValue) {
        this._anchor = newValue;
        this.notifyListeners('anchor', newValue);
    }
    get annotationTrigger() {
        return this._annotationTrigger;
    }
    set annotationTrigger(newValue) {
        this._annotationTrigger = newValue;
        this.notifyListeners('annotationTrigger', newValue);
    }
    get backgroundColor() {
        return this._backgroundColor;
    }
    set backgroundColor(newValue) {
        this._backgroundColor = newValue;
        this.notifyListeners('backgroundColor', newValue);
    }
    get barcode() {
        return this._barcode;
    }
    get body() {
        return this._body;
    }
    set body(newValue) {
        this._body = newValue;
        for (const body of newValue) {
            body.addListener(() => {
                this.notifyListeners('body', newValue);
            });
        }
        this.notifyListeners('body', newValue);
    }
    get footer() {
        return this._footer;
    }
    set footer(newValue) {
        var _a, _b;
        (_a = this._footer) === null || _a === void 0 ? void 0 : _a.removeListener(this.footerChangedListener);
        this._footer = newValue;
        (_b = this._footer) === null || _b === void 0 ? void 0 : _b.addListener(this.footerChangedListener);
        this.notifyListeners('footer', newValue);
    }
    get hasTip() {
        return this._hasTip;
    }
    set hasTip(newValue) {
        this._hasTip = newValue;
        this.notifyListeners('hasTip', newValue);
    }
    get header() {
        return this._header;
    }
    set header(newValue) {
        var _a, _b;
        (_a = this._header) === null || _a === void 0 ? void 0 : _a.removeListener(this.headerChangedListener);
        this._header = newValue;
        (_b = this._header) === null || _b === void 0 ? void 0 : _b.addListener(this.headerChangedListener);
        this.notifyListeners('header', newValue);
    }
    get isEntireAnnotationTappable() {
        return this._isEntireAnnotationTappable;
    }
    set isEntireAnnotationTappable(newValue) {
        this._isEntireAnnotationTappable = newValue;
        this.notifyListeners('isEntireAnnotationTappable', newValue);
    }
    get listener() {
        return this._listener;
    }
    set listener(newValue) {
        this._listener = newValue;
        this._hasListener = newValue != null;
        this.notifyListeners('listener', newValue);
    }
    get width() {
        return this._width;
    }
    set width(newValue) {
        this._width = newValue;
        this.notifyListeners('width', newValue);
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeArInfoAnnotation.prototype, "_barcode", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('type')
], BarcodeArInfoAnnotation.prototype, "_type", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('annotationTrigger')
], BarcodeArInfoAnnotation.prototype, "_annotationTrigger", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('anchor')
], BarcodeArInfoAnnotation.prototype, "_anchor", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('backgroundColor')
], BarcodeArInfoAnnotation.prototype, "_backgroundColor", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('body')
], BarcodeArInfoAnnotation.prototype, "_body", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('footer')
], BarcodeArInfoAnnotation.prototype, "_footer", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('hasTip')
], BarcodeArInfoAnnotation.prototype, "_hasTip", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('header')
], BarcodeArInfoAnnotation.prototype, "_header", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('isEntireAnnotationTappable')
], BarcodeArInfoAnnotation.prototype, "_isEntireAnnotationTappable", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeArInfoAnnotation.prototype, "_listener", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('hasListener')
], BarcodeArInfoAnnotation.prototype, "_hasListener", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('width')
], BarcodeArInfoAnnotation.prototype, "_width", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeArInfoAnnotation, "barcodeArDefaults", null);

class BarcodeArInfoAnnotationBodyComponent extends scanditDatacaptureFrameworksCore.Observable {
    constructor() {
        super(...arguments);
        this._isRightIconTappable = BarcodeArInfoAnnotationBodyComponent
            .barcodeArDefaults.BarcodeArView.defaultInfoAnnotationBodyElementRightIconTappable;
        this._isLeftIconTappable = BarcodeArInfoAnnotationBodyComponent
            .barcodeArDefaults.BarcodeArView.defaultInfoAnnotationBodyElementLeftIconTappable;
        this._rightIcon = BarcodeArInfoAnnotationBodyComponent
            .barcodeArDefaults.BarcodeArView.defaultInfoAnnotationBodyElementRightIcon;
        this._leftIcon = BarcodeArInfoAnnotationBodyComponent
            .barcodeArDefaults.BarcodeArView.defaultInfoAnnotationBodyElementLeftIcon;
        this._text = BarcodeArInfoAnnotationBodyComponent
            .barcodeArDefaults.BarcodeArView.defaultInfoAnnotationBodyElementText;
        this._textAlign = scanditDatacaptureFrameworksCore.TextAlignment.Center;
        this._textColor = BarcodeArInfoAnnotationBodyComponent
            .barcodeArDefaults.BarcodeArView.defaultInfoAnnotationBodyElementTextColor;
        this._textSize = BarcodeArInfoAnnotationBodyComponent
            .barcodeArDefaults.BarcodeArView.defaultInfoAnnotationBodyElementTextSize;
        this._fontFamily = scanditDatacaptureFrameworksCore.FontFamily.SystemDefault;
    }
    static get barcodeArDefaults() {
        return getBarcodeArDefaults();
    }
    get isRightIconTappable() {
        return this._isRightIconTappable;
    }
    set isRightIconTappable(value) {
        this._isRightIconTappable = value;
        this.notifyListeners('isRightIconTappable', value);
    }
    get isLeftIconTappable() {
        return this._isLeftIconTappable;
    }
    set isLeftIconTappable(value) {
        this._isLeftIconTappable = value;
        this.notifyListeners('isLeftIconTappable', value);
    }
    get rightIcon() {
        return this._rightIcon;
    }
    set rightIcon(value) {
        this._rightIcon = value;
        this.notifyListeners('rightIcon', value);
    }
    get leftIcon() {
        return this._leftIcon;
    }
    set leftIcon(value) {
        this._leftIcon = value;
        this.notifyListeners('leftIcon', value);
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
        this.notifyListeners('text', value);
    }
    get textAlign() {
        return this._textAlign;
    }
    set textAlign(value) {
        this._textAlign = value;
        this.notifyListeners('textAlign', value);
    }
    get textColor() {
        return this._textColor;
    }
    set textColor(value) {
        this._textColor = value;
        this.notifyListeners('textColor', value);
    }
    get textSize() {
        return this._textSize;
    }
    set textSize(value) {
        this._textSize = value;
        this.notifyListeners('textSize', value);
    }
    get fontFamily() {
        return this._fontFamily;
    }
    set fontFamily(value) {
        this._fontFamily = value;
        this.notifyListeners('fontFamily', value);
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('isRightIconTappable')
], BarcodeArInfoAnnotationBodyComponent.prototype, "_isRightIconTappable", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('isLeftIconTappable')
], BarcodeArInfoAnnotationBodyComponent.prototype, "_isLeftIconTappable", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('rightIcon')
], BarcodeArInfoAnnotationBodyComponent.prototype, "_rightIcon", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('leftIcon')
], BarcodeArInfoAnnotationBodyComponent.prototype, "_leftIcon", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('text')
], BarcodeArInfoAnnotationBodyComponent.prototype, "_text", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('textAlign')
], BarcodeArInfoAnnotationBodyComponent.prototype, "_textAlign", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('textColor')
], BarcodeArInfoAnnotationBodyComponent.prototype, "_textColor", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('textSize')
], BarcodeArInfoAnnotationBodyComponent.prototype, "_textSize", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('fontFamily')
], BarcodeArInfoAnnotationBodyComponent.prototype, "_fontFamily", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeArInfoAnnotationBodyComponent, "barcodeArDefaults", null);

class BarcodeArInfoAnnotationFooter extends scanditDatacaptureFrameworksCore.Observable {
    static get barcodeArDefaults() {
        return getBarcodeArDefaults();
    }
    constructor() {
        super();
        this._text = BarcodeArInfoAnnotationFooter.barcodeArDefaults
            .BarcodeArView.defaultInfoAnnotationFooterText;
        this._icon = BarcodeArInfoAnnotationFooter.barcodeArDefaults
            .BarcodeArView.defaultInfoAnnotationFooterIcon;
        this._textSize = BarcodeArInfoAnnotationFooter.barcodeArDefaults
            .BarcodeArView.defaultInfoAnnotationFooterTextSize;
        this._textColor = BarcodeArInfoAnnotationFooter.barcodeArDefaults
            .BarcodeArView.defaultInfoAnnotationFooterTextColor;
        this._backgroundColor = BarcodeArInfoAnnotationFooter.barcodeArDefaults
            .BarcodeArView.defaultInfoAnnotationFooterBackgroundColor;
        this._fontFamily = scanditDatacaptureFrameworksCore.FontFamily.SystemDefault;
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
        this.notifyListeners('text', value);
    }
    get icon() {
        return this._icon;
    }
    set icon(value) {
        this._icon = value;
        this.notifyListeners('icon', value);
    }
    get textSize() {
        return this._textSize;
    }
    set textSize(value) {
        this._textSize = value;
        this.notifyListeners('textSize', value);
    }
    get textColor() {
        return this._textColor;
    }
    set textColor(value) {
        this._textColor = value;
        this.notifyListeners('textColor', value);
    }
    get backgroundColor() {
        return this._backgroundColor;
    }
    set backgroundColor(value) {
        this._backgroundColor = value;
        this.notifyListeners('backgroundColor', value);
    }
    get fontFamily() {
        return this._fontFamily;
    }
    set fontFamily(value) {
        this._fontFamily = value;
        this.notifyListeners('fontFamily', value);
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('text')
], BarcodeArInfoAnnotationFooter.prototype, "_text", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('icon')
], BarcodeArInfoAnnotationFooter.prototype, "_icon", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('textSize')
], BarcodeArInfoAnnotationFooter.prototype, "_textSize", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('textColor')
], BarcodeArInfoAnnotationFooter.prototype, "_textColor", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('backgroundColor')
], BarcodeArInfoAnnotationFooter.prototype, "_backgroundColor", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('fontFamily')
], BarcodeArInfoAnnotationFooter.prototype, "_fontFamily", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeArInfoAnnotationFooter, "barcodeArDefaults", null);

class BarcodeArInfoAnnotationHeader extends scanditDatacaptureFrameworksCore.Observable {
    static get barcodeArDefaults() {
        return getBarcodeArDefaults();
    }
    constructor() {
        super();
        this._text = BarcodeArInfoAnnotationHeader.barcodeArDefaults
            .BarcodeArView.defaultInfoAnnotationHeaderText;
        this._icon = BarcodeArInfoAnnotationHeader.barcodeArDefaults
            .BarcodeArView.defaultInfoAnnotationHeaderIcon;
        this._textSize = BarcodeArInfoAnnotationHeader.barcodeArDefaults
            .BarcodeArView.defaultInfoAnnotationHeaderTextSize;
        this._textColor = BarcodeArInfoAnnotationHeader.barcodeArDefaults
            .BarcodeArView.defaultInfoAnnotationHeaderTextColor;
        this._backgroundColor = BarcodeArInfoAnnotationHeader.barcodeArDefaults
            .BarcodeArView.defaultInfoAnnotationHeaderBackgroundColor;
        this._fontFamily = scanditDatacaptureFrameworksCore.FontFamily.SystemDefault;
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
        this.notifyListeners('text', value);
    }
    get icon() {
        return this._icon;
    }
    set icon(value) {
        this._icon = value;
        this.notifyListeners('icon', value);
    }
    get textSize() {
        return this._textSize;
    }
    set textSize(value) {
        this._textSize = value;
        this.notifyListeners('textSize', value);
    }
    get textColor() {
        return this._textColor;
    }
    set textColor(value) {
        this._textColor = value;
        this.notifyListeners('textColor', value);
    }
    get backgroundColor() {
        return this._backgroundColor;
    }
    set backgroundColor(value) {
        this._backgroundColor = value;
        this.notifyListeners('backgroundColor', value);
    }
    get fontFamily() {
        return this._fontFamily;
    }
    set fontFamily(value) {
        this._fontFamily = value;
        this.notifyListeners('fontFamily', value);
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('text')
], BarcodeArInfoAnnotationHeader.prototype, "_text", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('icon')
], BarcodeArInfoAnnotationHeader.prototype, "_icon", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('textSize')
], BarcodeArInfoAnnotationHeader.prototype, "_textSize", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('textColor')
], BarcodeArInfoAnnotationHeader.prototype, "_textColor", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('backgroundColor')
], BarcodeArInfoAnnotationHeader.prototype, "_backgroundColor", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('fontFamily')
], BarcodeArInfoAnnotationHeader.prototype, "_fontFamily", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeArInfoAnnotationHeader, "barcodeArDefaults", null);

class BarcodeArPopoverAnnotation extends scanditDatacaptureFrameworksCore.Observable {
    static get barcodeArDefaults() {
        return getBarcodeArDefaults();
    }
    constructor(barcode, buttons) {
        super();
        this._type = 'barcodeArPopoverAnnotation';
        this._isEntirePopoverTappable = BarcodeArPopoverAnnotation.barcodeArDefaults
            .BarcodeArView.defaultIsEntirePopoverTappable;
        this._listener = null;
        this._hasListener = false;
        this._annotationTrigger = BarcodeArPopoverAnnotation.barcodeArDefaults
            .BarcodeArView.defaultInfoAnnotationTrigger;
        this.buttonChangedListener = (property, index) => {
            this.notifyListeners(property, index);
        };
        this._barcode = barcode;
        this._buttons = buttons;
        for (const button of buttons) {
            button.addListener(() => {
                this.buttonChangedListener('BarcodeArPopoverAnnotation.button', buttons.indexOf(button));
            });
        }
    }
    get barcode() {
        return this._barcode;
    }
    get isEntirePopoverTappable() {
        return this._isEntirePopoverTappable;
    }
    set isEntirePopoverTappable(value) {
        this._isEntirePopoverTappable = value;
        this.notifyListeners('isEntirePopoverTappable', value);
    }
    get listener() {
        return this._listener;
    }
    set listener(value) {
        this._listener = value;
        this._hasListener = value != null;
        this.notifyListeners('listener', value);
    }
    get annotationTrigger() {
        return this._annotationTrigger;
    }
    set annotationTrigger(value) {
        this._annotationTrigger = value;
        this.notifyListeners('annotationTrigger', value);
    }
    get buttons() {
        return this._buttons;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('type')
], BarcodeArPopoverAnnotation.prototype, "_type", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('isEntirePopoverTappable')
], BarcodeArPopoverAnnotation.prototype, "_isEntirePopoverTappable", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeArPopoverAnnotation.prototype, "_listener", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('hasListener')
], BarcodeArPopoverAnnotation.prototype, "_hasListener", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('annotationTrigger')
], BarcodeArPopoverAnnotation.prototype, "_annotationTrigger", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeArPopoverAnnotation.prototype, "_barcode", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('buttons')
], BarcodeArPopoverAnnotation.prototype, "_buttons", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeArPopoverAnnotation, "barcodeArDefaults", null);

class BarcodeArPopoverAnnotationButton extends scanditDatacaptureFrameworksCore.Observable {
    static get barcodeArDefaults() {
        return getBarcodeArDefaults();
    }
    constructor(icon, text) {
        super();
        this._textColor = BarcodeArPopoverAnnotationButton
            .barcodeArDefaults.BarcodeArView.defaultBarcodeArPopoverAnnotationButtonTextColor;
        this._textSize = BarcodeArPopoverAnnotationButton
            .barcodeArDefaults.BarcodeArView.defaultBarcodeArPopoverAnnotationButtonTextSize;
        this._fontFamily = scanditDatacaptureFrameworksCore.FontFamily.SystemDefault;
        this._icon = icon;
        this._text = text;
    }
    get textColor() {
        return this._textColor;
    }
    set textColor(value) {
        this._textColor = value;
        this.notifyListeners('textColor', value);
    }
    get textSize() {
        return this._textSize;
    }
    set textSize(value) {
        this._textSize = value;
        this.notifyListeners('textSize', value);
    }
    get fontFamily() {
        return this._fontFamily;
    }
    set fontFamily(value) {
        this._fontFamily = value;
        this.notifyListeners('fontFamily', value);
    }
    get icon() {
        return this._icon;
    }
    get text() {
        return this._text;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('textColor')
], BarcodeArPopoverAnnotationButton.prototype, "_textColor", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('textSize')
], BarcodeArPopoverAnnotationButton.prototype, "_textSize", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('fontFamily')
], BarcodeArPopoverAnnotationButton.prototype, "_fontFamily", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('icon')
], BarcodeArPopoverAnnotationButton.prototype, "_icon", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('text')
], BarcodeArPopoverAnnotationButton.prototype, "_text", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeArPopoverAnnotationButton, "barcodeArDefaults", null);

class BarcodeArRectangleHighlight extends scanditDatacaptureFrameworksCore.Observable {
    static get barcodeArDefaults() {
        return getBarcodeArDefaults();
    }
    constructor(barcode) {
        super();
        this._type = 'barcodeArRectangleHighlight';
        this._brush = BarcodeArRectangleHighlight
            .barcodeArDefaults.BarcodeArView.defaultRectangleHighlightBrush;
        this._icon = BarcodeArRectangleHighlight
            .barcodeArDefaults.BarcodeArView.defaultHighlightIcon;
        this._barcode = barcode;
    }
    get barcode() {
        return this._barcode;
    }
    get brush() {
        return this._brush;
    }
    set brush(brush) {
        this._brush = brush;
        this.notifyListeners('brush', brush);
    }
    get icon() {
        return this._icon;
    }
    set icon(icon) {
        this._icon = icon;
        this.notifyListeners('icon', icon);
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeArRectangleHighlight.prototype, "_barcode", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('type')
], BarcodeArRectangleHighlight.prototype, "_type", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('brush')
], BarcodeArRectangleHighlight.prototype, "_brush", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('icon')
], BarcodeArRectangleHighlight.prototype, "_icon", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeArRectangleHighlight, "barcodeArDefaults", null);

class BarcodeArSessionController extends scanditDatacaptureFrameworksCore.BaseController {
    constructor(viewId) {
        super('BarcodeArSessionProxy');
        this.viewId = viewId;
    }
    $resetBarcodeArSession() {
        return this._proxy.$resetBarcodeArSession({ viewId: this.viewId });
    }
}

class BarcodeArSession extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static fromJSON(json) {
        const sessionJson = JSON.parse(json);
        const session = new BarcodeArSession(json.viewId);
        session._addedTrackedBarcodes = sessionJson.addedTrackedBarcodes
            .map((trackedBarcodeJSON) => {
            return TrackedBarcode['fromJSON'](trackedBarcodeJSON, sessionJson.frameSequenceId);
        });
        session._removedTrackedBarcodes = sessionJson.removedTrackedBarcodes;
        session._trackedBarcodes = Object.keys(sessionJson.allTrackedBarcodes)
            .reduce((trackedBarcodes, identifier) => {
            trackedBarcodes[identifier] = TrackedBarcode['fromJSON'](sessionJson.allTrackedBarcodes[identifier], sessionJson.frameSequenceId);
            return trackedBarcodes;
        }, {});
        return session;
    }
    constructor(viewId) {
        super();
        this.sessionController = new BarcodeArSessionController(viewId);
    }
    get addedTrackedBarcodes() {
        return this._addedTrackedBarcodes;
    }
    get removedTrackedBarcodes() {
        return this._removedTrackedBarcodes;
    }
    get trackedBarcodes() {
        return this._trackedBarcodes;
    }
    reset() {
        return this.sessionController.$resetBarcodeArSession();
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('addedTrackedBarcodes')
], BarcodeArSession.prototype, "_addedTrackedBarcodes", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('removedTrackedBarcodes')
], BarcodeArSession.prototype, "_removedTrackedBarcodes", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('trackedBarcodes')
], BarcodeArSession.prototype, "_trackedBarcodes", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeArSession.prototype, "sessionController", void 0);

class BarcodeArSettings extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor() {
        super(...arguments);
        this.symbologies = {};
        this.properties = {};
    }
    static get barcodeDefaults() {
        return getBarcodeDefaults();
    }
    get enabledSymbologies() {
        return Object.keys(this.symbologies)
            .filter(symbology => this.symbologies[symbology].isEnabled);
    }
    settingsForSymbology(symbology) {
        if (!this.symbologies[symbology]) {
            const symbologySettings = BarcodeArSettings.barcodeDefaults.SymbologySettings[symbology];
            symbologySettings['_symbology'] = symbology;
            this.symbologies[symbology] = symbologySettings;
        }
        return this.symbologies[symbology];
    }
    enableSymbologies(symbologies) {
        symbologies.forEach(symbology => this.enableSymbology(symbology, true));
    }
    enableSymbology(symbology, enabled) {
        this.settingsForSymbology(symbology).isEnabled = enabled;
    }
    setProperty(name, value) {
        this.properties[name] = value;
    }
    getProperty(name) {
        return this.properties[name];
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeArSettings, "barcodeDefaults", null);

class BarcodeArStatusIconAnnotation extends scanditDatacaptureFrameworksCore.Observable {
    static get barcodeArDefaults() {
        return getBarcodeArDefaults();
    }
    constructor(barcode) {
        super();
        this._type = 'barcodeArStatusIconAnnotation';
        this._hasTip = BarcodeArStatusIconAnnotation
            .barcodeArDefaults.BarcodeArView.defaultStatusIconAnnotationHasTip;
        this._icon = BarcodeArStatusIconAnnotation
            .barcodeArDefaults.BarcodeArView.defaultStatusIconAnnotationIcon;
        this._text = BarcodeArStatusIconAnnotation
            .barcodeArDefaults.BarcodeArView.defaultStatusIconAnnotationText;
        this._textColor = BarcodeArStatusIconAnnotation
            .barcodeArDefaults.BarcodeArView.defaultStatusIconAnnotationTextColor;
        this._backgroundColor = BarcodeArStatusIconAnnotation
            .barcodeArDefaults.BarcodeArView.defaultStatusIconAnnotationBackgroundColor;
        this._annotationTrigger = BarcodeArStatusIconAnnotation
            .barcodeArDefaults.BarcodeArView.defaultStatusIconAnnotationTrigger;
        this._barcode = barcode;
    }
    get barcode() {
        return this._barcode;
    }
    get hasTip() {
        return this._hasTip;
    }
    set hasTip(value) {
        this._hasTip = value;
        this.notifyListeners('hasTip', value);
    }
    get icon() {
        return this._icon;
    }
    set icon(value) {
        this._icon = value;
        this.notifyListeners('icon', value);
    }
    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
        this.notifyListeners('text', value);
    }
    get textColor() {
        return this._textColor;
    }
    set textColor(value) {
        this._textColor = value;
        this.notifyListeners('textColor', value);
    }
    get backgroundColor() {
        return this._backgroundColor;
    }
    set backgroundColor(value) {
        this._backgroundColor = value;
        this.notifyListeners('backgroundColor', value);
    }
    get annotationTrigger() {
        return this._annotationTrigger;
    }
    set annotationTrigger(value) {
        this._annotationTrigger = value;
        this.notifyListeners('annotationTrigger', value);
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('type')
], BarcodeArStatusIconAnnotation.prototype, "_type", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('barcode')
], BarcodeArStatusIconAnnotation.prototype, "_barcode", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('hasTip')
], BarcodeArStatusIconAnnotation.prototype, "_hasTip", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('icon')
], BarcodeArStatusIconAnnotation.prototype, "_icon", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('text')
], BarcodeArStatusIconAnnotation.prototype, "_text", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('textColor')
], BarcodeArStatusIconAnnotation.prototype, "_textColor", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('backgroundColor')
], BarcodeArStatusIconAnnotation.prototype, "_backgroundColor", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('annotationTrigger')
], BarcodeArStatusIconAnnotation.prototype, "_annotationTrigger", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeArStatusIconAnnotation, "barcodeArDefaults", null);

class BarcodeArViewEventHandlers {
    constructor(view, barcodeAr, proxy) {
        this.view = view;
        this.barcodeAr = barcodeAr;
        this.proxy = proxy;
        this.highlightCache = {};
        this.annotationsCache = {};
    }
    clearCaches() {
        this.highlightCache = {};
        this.annotationsCache = {};
    }
    handleDidTapHighlightForBarcode(ev) {
        var _a, _b;
        if (!this.view.barcodeArViewUiListener) {
            return;
        }
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodeArViewController didTapHighlightForBarcode payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        const barcodeJson = JSON.parse(payload.barcode);
        const barcode = Barcode['fromJSON'](barcodeJson);
        const highlight = this.highlightCache[payload.barcodeId];
        if (!highlight) {
            return;
        }
        void ((_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.barcodeArViewUiListener) === null || _b === void 0 ? void 0 : _b.didTapHighlightForBarcode(this.barcodeAr, barcode, highlight));
    }
    handleHighlightForBarcode(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a, _b;
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('BarcodeArViewController highlightForBarcode payload is null');
                return;
            }
            if (payload.viewId !== this.view.viewId) {
                return;
            }
            const barcodeJson = JSON.parse(payload.barcode);
            const barcode = Barcode['fromJSON'](barcodeJson);
            barcode['_barcodeId'] = payload.barcodeId;
            const highlight = yield ((_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.highlightProvider) === null || _b === void 0 ? void 0 : _b.highlightForBarcode(barcode));
            if (highlight) {
                this.highlightCache[payload.barcodeId] = highlight;
                // what does this do?
                highlight.addListener(() => {
                    const highlightJson = highlight.toJSON();
                    highlightJson.barcodeId = payload.barcodeId;
                    void this.proxy.$updateBarcodeArHighlight({
                        viewId: this.view.viewId,
                        highlightJson: JSON.stringify(highlightJson),
                    });
                });
            }
            const result = {
                barcodeId: payload.barcodeId,
                highlight: highlight === null || highlight === void 0 ? void 0 : highlight.toJSON(),
            };
            yield this.proxy.$finishBarcodeArHighlightForBarcode({
                viewId: this.view.viewId,
                highlightJson: JSON.stringify(result),
            });
        });
    }
    handleAnnotationForBarcode(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a, _b;
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('BarcodeArViewController annotationForBarcode payload is null');
                return;
            }
            if (payload.viewId !== this.view.viewId) {
                return;
            }
            const barcodeJson = JSON.parse(payload.barcode);
            const barcode = Barcode['fromJSON'](barcodeJson);
            barcode['_barcodeId'] = payload.barcodeId;
            const annotation = yield ((_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.annotationProvider) === null || _b === void 0 ? void 0 : _b.annotationForBarcode(barcode));
            if (annotation) {
                this.annotationsCache[payload.barcodeId] = annotation;
                annotation.addListener((property, value) => {
                    if (property === 'BarcodeArPopoverAnnotation.button') {
                        const popover = annotation;
                        const button = popover.buttons[value];
                        const buttonJson = button.toJSON();
                        buttonJson.index = value;
                        const popoverButtonPayload = {
                            button: buttonJson,
                            barcodeId: payload.barcodeId,
                        };
                        void this.proxy.$updateBarcodeArPopoverButtonAtIndex({
                            viewId: this.view.viewId,
                            updateJson: JSON.stringify(popoverButtonPayload),
                        });
                        return;
                    }
                    const annotationJson = annotation.toJSON();
                    annotationJson.barcodeId = payload.barcodeId;
                    void this.proxy.$updateBarcodeArAnnotation({
                        viewId: this.view.viewId,
                        annotationJson: JSON.stringify(annotationJson),
                    });
                });
            }
            const result = {
                barcodeId: payload.barcodeId,
                annotation: annotation === null || annotation === void 0 ? void 0 : annotation.toJSON(),
            };
            yield this.proxy.$finishBarcodeArAnnotationForBarcode({
                viewId: this.view.viewId,
                annotationJson: JSON.stringify(result),
            });
        });
    }
    handleDidTapPopoverEvent(ev) {
        var _a, _b;
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodeArViewController didTapPopoverEvent payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        const popover = this.annotationsCache[payload.barcodeId];
        if (!popover) {
            return;
        }
        (_b = (_a = popover.listener) === null || _a === void 0 ? void 0 : _a.didTap) === null || _b === void 0 ? void 0 : _b.call(_a, popover);
    }
    handleDidTapPopoverButtonEvent(ev) {
        var _a, _b;
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodeArViewController didTapPopoverButtonEvent payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        const popover = this.annotationsCache[payload.barcodeId];
        if (!popover) {
            return;
        }
        const button = popover.buttons[payload.buttonIndex];
        (_b = (_a = popover.listener) === null || _a === void 0 ? void 0 : _a.didTapButton) === null || _b === void 0 ? void 0 : _b.call(_a, popover, button, payload.buttonIndex);
    }
    handleDidTapInfoAnnotationRightIconEvent(ev) {
        var _a, _b;
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodeArViewController didTapInfoAnnotationRightIconEvent payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        const infoAnnotation = this.annotationsCache[payload.barcodeId];
        if (infoAnnotation == null || payload.componentIndex == null) {
            return;
        }
        const component = infoAnnotation.body[payload.componentIndex];
        (_b = (_a = infoAnnotation.listener) === null || _a === void 0 ? void 0 : _a.didTapRightIcon) === null || _b === void 0 ? void 0 : _b.call(_a, infoAnnotation, component, payload.componentIndex);
    }
    handleDidTapInfoAnnotationLeftIconEvent(ev) {
        var _a, _b;
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodeArViewController didTapInfoAnnotationLeftIconEvent payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        const infoAnnotation = this.annotationsCache[payload.barcodeId];
        if (infoAnnotation == null || payload.componentIndex == null) {
            return;
        }
        const component = infoAnnotation.body[payload.componentIndex];
        (_b = (_a = infoAnnotation.listener) === null || _a === void 0 ? void 0 : _a.didTapLeftIcon) === null || _b === void 0 ? void 0 : _b.call(_a, infoAnnotation, component, payload.componentIndex);
    }
    handleDidTapInfoAnnotationEvent(ev) {
        var _a, _b;
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodeArViewController didTapInfoAnnotationEvent payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        const infoAnnotation = this.annotationsCache[payload.barcodeId];
        if (infoAnnotation == null) {
            return;
        }
        (_b = (_a = infoAnnotation.listener) === null || _a === void 0 ? void 0 : _a.didTap) === null || _b === void 0 ? void 0 : _b.call(_a, infoAnnotation);
    }
    handleDidTapInfoAnnotationHeaderEvent(ev) {
        var _a, _b;
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodeArViewController didTapInfoAnnotationHeaderEvent payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        const infoAnnotation = this.annotationsCache[payload.barcodeId];
        if (infoAnnotation == null) {
            return;
        }
        (_b = (_a = infoAnnotation.listener) === null || _a === void 0 ? void 0 : _a.didTapHeader) === null || _b === void 0 ? void 0 : _b.call(_a, infoAnnotation);
    }
    handleDidTapInfoAnnotationFooterEvent(ev) {
        var _a, _b;
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodeArViewController didTapInfoAnnotationFooterEvent payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        const infoAnnotation = this.annotationsCache[payload.barcodeId];
        if (infoAnnotation == null) {
            return;
        }
        (_b = (_a = infoAnnotation.listener) === null || _a === void 0 ? void 0 : _a.didTapFooter) === null || _b === void 0 ? void 0 : _b.call(_a, infoAnnotation);
    }
    handleDidUpdateSession(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('BarcodeArViewController didUpdateSession payload is null');
                return;
            }
            if (payload.viewId !== this.view.viewId) {
                return;
            }
            const session = BarcodeArSession['fromJSON'](payload.session);
            yield this.notifyListenersOfDidUpdateSession(session, payload.frameId);
            return this.proxy.$finishBarcodeArOnDidUpdateSession({ viewId: this.view.viewId });
        });
    }
    notifyListenersOfDidUpdateSession(session, frameId) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const mode = this.barcodeAr;
            for (const listener of mode['listeners']) {
                if (listener.didUpdateSession) {
                    yield listener.didUpdateSession(this.barcodeAr, session, () => scanditDatacaptureFrameworksCore.CameraController.getFrame(frameId));
                }
            }
        });
    }
}

var BarcodeArViewEvents;
(function (BarcodeArViewEvents) {
    BarcodeArViewEvents["didTapHighlightForBarcode"] = "BarcodeArViewUiListener.didTapHighlightForBarcode";
})(BarcodeArViewEvents || (BarcodeArViewEvents = {}));
var BarcodeArHighlightProviderEvents;
(function (BarcodeArHighlightProviderEvents) {
    BarcodeArHighlightProviderEvents["highlightForBarcode"] = "BarcodeArHighlightProvider.highlightForBarcode";
})(BarcodeArHighlightProviderEvents || (BarcodeArHighlightProviderEvents = {}));
var BarcodeArHighlightLifecycleEvents;
(function (BarcodeArHighlightLifecycleEvents) {
    BarcodeArHighlightLifecycleEvents["create"] = "BarcodeArCustomHighlight.create";
    BarcodeArHighlightLifecycleEvents["update"] = "BarcodeArCustomHighlight.update";
    BarcodeArHighlightLifecycleEvents["hide"] = "BarcodeArCustomHighlight.hide";
    BarcodeArHighlightLifecycleEvents["show"] = "BarcodeArCustomHighlight.show";
    BarcodeArHighlightLifecycleEvents["dispose"] = "BarcodeArCustomHighlight.dispose";
})(BarcodeArHighlightLifecycleEvents || (BarcodeArHighlightLifecycleEvents = {}));
var BarcodeArAnnotationLifecycleEvents;
(function (BarcodeArAnnotationLifecycleEvents) {
    BarcodeArAnnotationLifecycleEvents["create"] = "BarcodeArCustomAnnotation.create";
    BarcodeArAnnotationLifecycleEvents["update"] = "BarcodeArCustomAnnotation.update";
    BarcodeArAnnotationLifecycleEvents["hide"] = "BarcodeArCustomAnnotation.hide";
    BarcodeArAnnotationLifecycleEvents["show"] = "BarcodeArCustomAnnotation.show";
    BarcodeArAnnotationLifecycleEvents["dispose"] = "BarcodeArCustomAnnotation.dispose";
})(BarcodeArAnnotationLifecycleEvents || (BarcodeArAnnotationLifecycleEvents = {}));
var BarcodeArAnnotationProviderEvents;
(function (BarcodeArAnnotationProviderEvents) {
    BarcodeArAnnotationProviderEvents["annotationForBarcode"] = "BarcodeArAnnotationProvider.annotationForBarcode";
    BarcodeArAnnotationProviderEvents["didTapInfoAnnotationRightIconEvent"] = "BarcodeArInfoAnnotationListener.didTapInfoAnnotationRightIcon";
    BarcodeArAnnotationProviderEvents["didTapInfoAnnotationLeftIconEvent"] = "BarcodeArInfoAnnotationListener.didTapInfoAnnotationLeftIcon";
    BarcodeArAnnotationProviderEvents["didTapInfoAnnotationEvent"] = "BarcodeArInfoAnnotationListener.didTapInfoAnnotation";
    BarcodeArAnnotationProviderEvents["didTapInfoAnnotationHeaderEvent"] = "BarcodeArInfoAnnotationListener.didTapInfoAnnotationHeader";
    BarcodeArAnnotationProviderEvents["didTapInfoAnnotationFooterEvent"] = "BarcodeArInfoAnnotationListener.didTapInfoAnnotationFooter";
    BarcodeArAnnotationProviderEvents["didTapPopoverEvent"] = "BarcodeArPopoverAnnotationListener.didTapPopover";
    BarcodeArAnnotationProviderEvents["didTapPopoverButtonEvent"] = "BarcodeArPopoverAnnotationListener.didTapPopoverButton";
})(BarcodeArAnnotationProviderEvents || (BarcodeArAnnotationProviderEvents = {}));
var BarcodeArEvents;
(function (BarcodeArEvents) {
    // Listener Events
    BarcodeArEvents["didUpdateSession"] = "BarcodeArListener.didUpdateSession";
})(BarcodeArEvents || (BarcodeArEvents = {}));
class BarcodeArViewController extends scanditDatacaptureFrameworksCore.BaseController {
    static forBarcodeArView(barcodeAr, baseView) {
        const viewController = new BarcodeArViewController(baseView, barcodeAr);
        viewController.barcodeAr['controller'] = viewController;
        return viewController;
    }
    constructor(baseView, barcodeAr) {
        super('BarcodeArViewProxy');
        this.isModeListenerRegistered = false;
        this.isUiListenerRegistered = false;
        this.isAnnotationProviderRegistered = false;
        this.isHighlightProviderRegistered = false;
        this.handleDidUpdateSessionWrapper = (ev) => {
            return this.eventHandlers.handleDidUpdateSession(ev);
        };
        this.handleDidTapHighlightForBarcodeWrapper = (ev) => {
            return this.eventHandlers.handleDidTapHighlightForBarcode(ev);
        };
        this.handleAnnotationForBarcodeWrapper = (ev) => {
            return this.eventHandlers.handleAnnotationForBarcode(ev);
        };
        this.handleDidTapPopoverEventWrapper = (ev) => {
            this.eventHandlers.handleDidTapPopoverEvent(ev);
        };
        this.handleDidTapPopoverButtonEventWrapper = (ev) => {
            this.eventHandlers.handleDidTapPopoverButtonEvent(ev);
        };
        this.handleDidTapInfoAnnotationRightIconEventWrapper = (ev) => {
            this.eventHandlers.handleDidTapInfoAnnotationRightIconEvent(ev);
        };
        this.handleDidTapInfoAnnotationLeftIconEventWrapper = (ev) => {
            this.eventHandlers.handleDidTapInfoAnnotationLeftIconEvent(ev);
        };
        this.handleDidTapInfoAnnotationEventWrapper = (ev) => {
            this.eventHandlers.handleDidTapInfoAnnotationEvent(ev);
        };
        this.handleDidTapInfoAnnotationHeaderEventWrapper = (ev) => {
            this.eventHandlers.handleDidTapInfoAnnotationHeaderEvent(ev);
        };
        this.handleDidTapInfoAnnotationFooterEventWrapper = (ev) => {
            this.eventHandlers.handleDidTapInfoAnnotationFooterEvent(ev);
        };
        this.handleHighlightForBarcodeWrapper = (ev) => {
            return this.eventHandlers.handleHighlightForBarcode(ev);
        };
        this.baseView = baseView;
        this.barcodeAr = barcodeAr;
        this.eventHandlers = new BarcodeArViewEventHandlers(baseView, barcodeAr, this._proxy);
    }
    dispose() {
        this.eventHandlers.clearCaches();
        void this._proxy.$removeBarcodeArView({ viewId: this.baseView.viewId });
        this._proxy.dispose();
    }
    createNativeView() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this.createView();
            return this.initialize();
        });
    }
    registerModeListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return Promise.resolve();
            }
            if (this.isModeListenerRegistered) {
                return Promise.resolve();
            }
            this._proxy.subscribeForEvents(Object.values(BarcodeArEvents));
            this._proxy.eventEmitter.on(BarcodeArEvents.didUpdateSession, this.handleDidUpdateSessionWrapper);
            yield this._proxy.$registerBarcodeArListener({ viewId: this.baseView.viewId });
            this.isModeListenerRegistered = true;
        });
    }
    unregisterModeListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return Promise.resolve();
            }
            if (!this.isModeListenerRegistered) {
                return Promise.resolve();
            }
            this._proxy.unsubscribeFromEvents(Object.values(BarcodeArEvents));
            this._proxy.eventEmitter.off(BarcodeArEvents.didUpdateSession, this.handleDidUpdateSessionWrapper);
            yield this._proxy.$unregisterBarcodeArListener({ viewId: this.baseView.viewId });
            this.isModeListenerRegistered = false;
        });
    }
    registerUiListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return Promise.resolve();
            }
            if (this.isUiListenerRegistered) {
                return Promise.resolve();
            }
            this._proxy.subscribeForEvents(Object.values(BarcodeArViewEvents));
            this._proxy.eventEmitter.on(BarcodeArViewEvents.didTapHighlightForBarcode, this.handleDidTapHighlightForBarcodeWrapper);
            yield this._proxy.$registerBarcodeArViewUiListener({ viewId: this.baseView.viewId });
            this.isUiListenerRegistered = true;
        });
    }
    unregisterUiListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return Promise.resolve();
            }
            if (!this.isUiListenerRegistered) {
                return Promise.resolve();
            }
            this._proxy.unsubscribeFromEvents(Object.values(BarcodeArViewEvents));
            this._proxy.eventEmitter.off(BarcodeArViewEvents.didTapHighlightForBarcode, this.handleDidTapHighlightForBarcodeWrapper);
            yield this._proxy.$unregisterBarcodeArViewUiListener({ viewId: this.baseView.viewId });
            this.isUiListenerRegistered = false;
        });
    }
    registerAnnotationProvider() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return Promise.resolve();
            }
            if (this.isAnnotationProviderRegistered) {
                return Promise.resolve();
            }
            this._proxy.subscribeForEvents(Object.values(BarcodeArAnnotationProviderEvents));
            this._proxy.eventEmitter.on(BarcodeArAnnotationProviderEvents.annotationForBarcode, this.handleAnnotationForBarcodeWrapper);
            this._proxy.eventEmitter.on(BarcodeArAnnotationProviderEvents.didTapPopoverEvent, this.handleDidTapPopoverEventWrapper);
            this._proxy.eventEmitter.on(BarcodeArAnnotationProviderEvents.didTapPopoverButtonEvent, this.handleDidTapPopoverButtonEventWrapper);
            this._proxy.eventEmitter.on(BarcodeArAnnotationProviderEvents.didTapInfoAnnotationRightIconEvent, this.handleDidTapInfoAnnotationRightIconEventWrapper);
            this._proxy.eventEmitter.on(BarcodeArAnnotationProviderEvents.didTapInfoAnnotationLeftIconEvent, this.handleDidTapInfoAnnotationLeftIconEventWrapper);
            this._proxy.eventEmitter.on(BarcodeArAnnotationProviderEvents.didTapInfoAnnotationEvent, this.handleDidTapInfoAnnotationEventWrapper);
            this._proxy.eventEmitter.on(BarcodeArAnnotationProviderEvents.didTapInfoAnnotationHeaderEvent, this.handleDidTapInfoAnnotationHeaderEventWrapper);
            this._proxy.eventEmitter.on(BarcodeArAnnotationProviderEvents.didTapInfoAnnotationFooterEvent, this.handleDidTapInfoAnnotationFooterEventWrapper);
            yield this._proxy.$registerBarcodeArAnnotationProvider({ viewId: this.baseView.viewId });
            this.isAnnotationProviderRegistered = true;
        });
    }
    unregisterAnnotationProvider() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return Promise.resolve();
            }
            if (!this.isAnnotationProviderRegistered) {
                return Promise.resolve();
            }
            this._proxy.unsubscribeFromEvents(Object.values(BarcodeArAnnotationProviderEvents));
            this._proxy.eventEmitter.off(BarcodeArAnnotationProviderEvents.annotationForBarcode, this.handleAnnotationForBarcodeWrapper);
            this._proxy.eventEmitter.off(BarcodeArAnnotationProviderEvents.didTapPopoverEvent, this.handleDidTapPopoverEventWrapper);
            this._proxy.eventEmitter.off(BarcodeArAnnotationProviderEvents.didTapPopoverButtonEvent, this.handleDidTapPopoverButtonEventWrapper);
            this._proxy.eventEmitter.off(BarcodeArAnnotationProviderEvents.didTapInfoAnnotationRightIconEvent, this.handleDidTapInfoAnnotationRightIconEventWrapper);
            this._proxy.eventEmitter.off(BarcodeArAnnotationProviderEvents.didTapInfoAnnotationLeftIconEvent, this.handleDidTapInfoAnnotationLeftIconEventWrapper);
            this._proxy.eventEmitter.off(BarcodeArAnnotationProviderEvents.didTapInfoAnnotationEvent, this.handleDidTapInfoAnnotationEventWrapper);
            this._proxy.eventEmitter.off(BarcodeArAnnotationProviderEvents.didTapInfoAnnotationHeaderEvent, this.handleDidTapInfoAnnotationHeaderEventWrapper);
            this._proxy.eventEmitter.off(BarcodeArAnnotationProviderEvents.didTapInfoAnnotationFooterEvent, this.handleDidTapInfoAnnotationFooterEventWrapper);
            yield this._proxy.$unregisterBarcodeArAnnotationProvider({ viewId: this.baseView.viewId });
            this.isAnnotationProviderRegistered = false;
        });
    }
    registerHighlightProvider() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return Promise.resolve();
            }
            if (this.isHighlightProviderRegistered) {
                return Promise.resolve();
            }
            this._proxy.subscribeForEvents(Object.values(BarcodeArHighlightProviderEvents));
            this._proxy.eventEmitter.on(BarcodeArHighlightProviderEvents.highlightForBarcode, this.handleHighlightForBarcodeWrapper);
            yield this._proxy.$registerBarcodeArHighlightProvider({ viewId: this.baseView.viewId });
            this.isHighlightProviderRegistered = true;
        });
    }
    registerCustomHighlightCreateEvent(onCreate) {
        function onCreateWrapper(data) {
            const parsedData = JSON.parse(data.data);
            const barcode = Barcode['fromJSON'](JSON.parse(parsedData.barcode));
            const barcodeId = parsedData.barcodeId;
            onCreate(barcode, barcodeId);
        }
        this._proxy.eventEmitter.on(BarcodeArHighlightLifecycleEvents.create, onCreateWrapper);
        return () => {
            this._proxy.eventEmitter.off(BarcodeArHighlightLifecycleEvents.create, onCreateWrapper);
        };
    }
    registerCustomHighlightUpdateEvent(onUpdate, barcodeId) {
        function onUpdateWrapper(data) {
            const parsedData = JSON.parse(data.data);
            parsedData.updates.forEach((update) => {
                const receivedBarcodeId = update.barcodeId;
                if (barcodeId !== receivedBarcodeId) {
                    return;
                }
                const centerPosition = scanditDatacaptureFrameworksCore.Point['fromJSON'](JSON.parse(update.centerPosition));
                onUpdate(centerPosition, receivedBarcodeId);
            });
        }
        this._proxy.eventEmitter.on(BarcodeArHighlightLifecycleEvents.update, onUpdateWrapper);
        return () => {
            this._proxy.eventEmitter.off(BarcodeArHighlightLifecycleEvents.update, onUpdateWrapper);
        };
    }
    registerCustomHighlightHideEvent(onHide, barcodeId) {
        function onHideWrapper(data) {
            const parsedData = JSON.parse(data.data);
            const receivedBarcodeId = parsedData.barcodeId;
            if (barcodeId !== receivedBarcodeId) {
                return;
            }
            onHide(receivedBarcodeId);
        }
        this._proxy.eventEmitter.on(BarcodeArHighlightLifecycleEvents.hide, onHideWrapper);
        return () => {
            this._proxy.eventEmitter.off(BarcodeArHighlightLifecycleEvents.show, onHideWrapper);
        };
    }
    registerCustomHighlightShowEvent(onShow, barcodeId) {
        function onShowWrapper(data) {
            const parsedData = JSON.parse(data.data);
            const receivedBarcodeId = parsedData.barcodeId;
            if (barcodeId !== receivedBarcodeId) {
                return;
            }
            onShow(receivedBarcodeId);
        }
        this._proxy.eventEmitter.on(BarcodeArHighlightLifecycleEvents.show, onShowWrapper);
        return () => {
            this._proxy.eventEmitter.off(BarcodeArHighlightLifecycleEvents.show, onShowWrapper);
        };
    }
    registerCustomHighlightDisposeEvent(onDispose) {
        function onDisposeWrapper(data) {
            const parsedData = JSON.parse(data.data);
            const barcodeId = parsedData.barcodeId;
            onDispose(barcodeId);
        }
        this._proxy.eventEmitter.on(BarcodeArHighlightLifecycleEvents.dispose, onDisposeWrapper);
        return () => {
            this._proxy.eventEmitter.off(BarcodeArHighlightLifecycleEvents.dispose, onDisposeWrapper);
        };
    }
    subscribeForCustomHighlightEvents() {
        this._proxy.subscribeForEvents(Object.values(BarcodeArHighlightLifecycleEvents));
    }
    unsubscribeFromCustomHighlightEvents() {
        this._proxy.unsubscribeFromEvents(Object.values(BarcodeArHighlightLifecycleEvents));
    }
    onCustomHighlightClicked(barcodeId) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return;
            }
            return this._proxy.$onCustomHighlightClicked({ viewId: this.baseView.viewId, barcodeId });
        });
    }
    registerCustomAnnotationCreateEvent(onCreate) {
        function onCreateWrapper(data) {
            const parsedData = JSON.parse(data.data);
            const barcode = Barcode['fromJSON'](JSON.parse(parsedData.barcode));
            const barcodeId = parsedData.barcodeId;
            onCreate(barcode, barcodeId);
        }
        this._proxy.eventEmitter.on(BarcodeArAnnotationLifecycleEvents.create, onCreateWrapper);
        return () => {
            this._proxy.eventEmitter.off(BarcodeArAnnotationLifecycleEvents.create, onCreateWrapper);
        };
    }
    registerCustomAnnotationUpdateEvent(onUpdate, barcodeId) {
        function onUpdateWrapper(data) {
            const parsedData = JSON.parse(data.data);
            parsedData.updates.forEach((update) => {
                const receivedBarcodeId = update.barcodeId;
                if (barcodeId !== receivedBarcodeId) {
                    return;
                }
                const centerPosition = scanditDatacaptureFrameworksCore.Point['fromJSON'](JSON.parse(update.centerPosition));
                onUpdate(centerPosition, receivedBarcodeId);
            });
        }
        this._proxy.eventEmitter.on(BarcodeArAnnotationLifecycleEvents.update, onUpdateWrapper);
        return () => {
            this._proxy.eventEmitter.off(BarcodeArAnnotationLifecycleEvents.update, onUpdateWrapper);
        };
    }
    registerCustomAnnotationHideEvent(onHide, barcodeId) {
        function onHideWrapper(data) {
            const parsedData = JSON.parse(data.data);
            const receivedBarcodeId = parsedData.barcodeId;
            if (barcodeId !== receivedBarcodeId) {
                return;
            }
            onHide(receivedBarcodeId);
        }
        this._proxy.eventEmitter.on(BarcodeArAnnotationLifecycleEvents.hide, onHideWrapper);
        return () => {
            this._proxy.eventEmitter.off(BarcodeArAnnotationLifecycleEvents.show, onHideWrapper);
        };
    }
    registerCustomAnnotationShowEvent(onShow, barcodeId) {
        function onShowWrapper(data) {
            const parsedData = JSON.parse(data.data);
            const receivedBarcodeId = parsedData.barcodeId;
            if (barcodeId !== receivedBarcodeId) {
                return;
            }
            onShow(receivedBarcodeId);
        }
        this._proxy.eventEmitter.on(BarcodeArAnnotationLifecycleEvents.show, onShowWrapper);
        return () => {
            this._proxy.eventEmitter.off(BarcodeArAnnotationLifecycleEvents.show, onShowWrapper);
        };
    }
    registerCustomAnnotationDisposeEvent(onDispose) {
        function onDisposeWrapper(data) {
            const parsedData = JSON.parse(data.data);
            const barcodeId = parsedData.barcodeId;
            onDispose(barcodeId);
        }
        this._proxy.eventEmitter.on(BarcodeArAnnotationLifecycleEvents.dispose, onDisposeWrapper);
        return () => {
            this._proxy.eventEmitter.off(BarcodeArAnnotationLifecycleEvents.dispose, onDisposeWrapper);
        };
    }
    subscribeForCustomAnnotationEvents() {
        this._proxy.subscribeForEvents(Object.values(BarcodeArAnnotationLifecycleEvents));
    }
    unsubscribeFromCustomAnnotationEvents() {
        this._proxy.unsubscribeFromEvents(Object.values(BarcodeArAnnotationLifecycleEvents));
    }
    unregisterHighlightProvider() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return Promise.resolve();
            }
            if (!this.isHighlightProviderRegistered) {
                return Promise.resolve();
            }
            this._proxy.unsubscribeFromEvents(Object.values(BarcodeArHighlightProviderEvents));
            this._proxy.eventEmitter.off(BarcodeArHighlightProviderEvents.highlightForBarcode, this.handleHighlightForBarcodeWrapper);
            yield this._proxy.$unregisterBarcodeArHighlightProvider({ viewId: this.baseView.viewId });
            this.isHighlightProviderRegistered = false;
        });
    }
    start() {
        this.eventHandlers.clearCaches();
        return this._proxy.$barcodeArViewStart({ viewId: this.baseView.viewId });
    }
    stop() {
        this.eventHandlers.clearCaches();
        return this._proxy.$barcodeArViewStop({ viewId: this.baseView.viewId });
    }
    pause() {
        this.eventHandlers.clearCaches();
        return this._proxy.$barcodeArViewPause({ viewId: this.baseView.viewId });
    }
    update() {
        const barcodeArView = this.baseView.toJSON().View;
        const json = JSON.stringify(barcodeArView);
        return this._proxy.$updateBarcodeArView({ viewId: this.baseView.viewId, viewJson: json });
    }
    removeNativeView() {
        var _a;
        return (_a = this._proxy.$removeBarcodeArView({ viewId: this.baseView.viewId })) !== null && _a !== void 0 ? _a : Promise.resolve();
    }
    reset() {
        this.eventHandlers.clearCaches();
        return this._proxy.$barcodeArViewReset({ viewId: this.baseView.viewId });
    }
    // From Listener Controller methods
    updateMode() {
        if (!this.isViewCreated) {
            return Promise.resolve();
        }
        const barcodeAr = this.barcodeAr.toJSON();
        const json = JSON.stringify(barcodeAr);
        return this._proxy.$updateBarcodeArMode({ viewId: this.baseView.viewId, modeJson: json });
    }
    applyNewSettings(settings) {
        if (!this.isViewCreated) {
            return Promise.resolve();
        }
        return this._proxy.$applyBarcodeArSettings({
            viewId: this.baseView.viewId,
            settings: JSON.stringify(settings.toJSON()),
        });
    }
    resetMode() {
        if (!this.isViewCreated) {
            return Promise.resolve();
        }
        return this._proxy.$resetBarcodeAr({ viewId: this.baseView.viewId });
    }
    updateFeedback(feedbackJson) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return;
            }
            return this._proxy.$updateBarcodeArFeedback({ viewId: this.baseView.viewId, feedbackJson });
        });
    }
    initialize() {
        return __awaiter$1(this, void 0, void 0, function* () {
            // check if listeners are there to subscribe
            if (this.barcodeAr['listeners'].length > 0) {
                yield this.registerModeListener();
            }
            if (this.baseView.barcodeArViewUiListener) {
                yield this.registerUiListener();
            }
            if (this.baseView.annotationProvider) {
                yield this.registerAnnotationProvider();
            }
            if (this.baseView.highlightProvider) {
                yield this.registerHighlightProvider();
            }
        });
    }
    createView() {
        return __awaiter$1(this, void 0, void 0, function* () {
            const barcodeArView = this.baseView.toJSON();
            const viewJson = JSON.stringify(barcodeArView);
            return this._proxy.$createBarcodeArView({ viewId: this.baseView.viewId, viewJson });
        });
    }
    get isViewCreated() {
        return this.baseView.viewId !== -1;
    }
}

class BaseBarcodeArView extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static get barcodeArDefaults() {
        return getBarcodeArDefaults();
    }
    constructor(context, barcodeAr, nativeView = null, barcodeArViewSettings, cameraSettings, annotationProvider, highlightProvider, uiListener) {
        super();
        this.nativeView = null;
        this._annotationProvider = null;
        this._barcodeArViewUiListener = null;
        this._highlightProvider = null;
        this._isStarted = false;
        this._shouldShowMacroControl = false;
        this._macroModeControlPosition = BaseBarcodeArView.barcodeArDefaults.BarcodeArView.defaultCameraSwitchControlPosition;
        this._shouldShowTorchControl = false;
        this._torchControlPosition = BaseBarcodeArView.barcodeArDefaults.BarcodeArView.defaultTorchControlPosition;
        this._shouldShowZoomControl = BaseBarcodeArView.barcodeArDefaults.BarcodeArView.defaultShouldShowZoomControl;
        this._zoomControlPosition = BaseBarcodeArView.barcodeArDefaults.BarcodeArView.defaultZoomControlPosition;
        this.isViewCreated = false;
        this._viewId = -1; // -1 means the view is not created yet
        this.registerCustomHighlightCreateEvent = (...args) => this.controller.registerCustomHighlightCreateEvent(...args);
        this.registerCustomHighlightUpdateEvent = (...args) => this.controller.registerCustomHighlightUpdateEvent(...args);
        this.registerCustomHighlightHideEvent = (...args) => this.controller.registerCustomHighlightHideEvent(...args);
        this.registerCustomHighlightShowEvent = (...args) => this.controller.registerCustomHighlightShowEvent(...args);
        this.registerCustomHighlightDisposeEvent = (...args) => this.controller.registerCustomHighlightDisposeEvent(...args);
        this.subscribeForCustomHighlightEvents = (...args) => this.controller.subscribeForCustomHighlightEvents(...args);
        this.unsubscribeFromCustomHighlightEvents = (...args) => this.controller.unsubscribeFromCustomHighlightEvents(...args);
        this.onCustomHighlightClicked = (...args) => this.controller.onCustomHighlightClicked(...args);
        this.registerCustomAnnotationCreateEvent = (...args) => this.controller.registerCustomAnnotationCreateEvent(...args);
        this.registerCustomAnnotationUpdateEvent = (...args) => this.controller.registerCustomAnnotationUpdateEvent(...args);
        this.registerCustomAnnotationHideEvent = (...args) => this.controller.registerCustomAnnotationHideEvent(...args);
        this.registerCustomAnnotationShowEvent = (...args) => this.controller.registerCustomAnnotationShowEvent(...args);
        this.registerCustomAnnotationDisposeEvent = (...args) => this.controller.registerCustomAnnotationDisposeEvent(...args);
        this.subscribeForCustomAnnotationEvents = (...args) => this.controller.subscribeForCustomAnnotationEvents(...args);
        this.unsubscribeFromCustomAnnotationEvents = (...args) => this.controller.unsubscribeFromCustomAnnotationEvents(...args);
        this._dataCaptureContext = context;
        this._barcodeAr = barcodeAr;
        this._barcodeArViewSettings = barcodeArViewSettings;
        this._cameraSettings = cameraSettings;
        this._annotationProvider = annotationProvider !== null && annotationProvider !== void 0 ? annotationProvider : null;
        this._highlightProvider = highlightProvider !== null && highlightProvider !== void 0 ? highlightProvider : null;
        this._barcodeArViewUiListener = uiListener !== null && uiListener !== void 0 ? uiListener : null;
        this.nativeView = nativeView;
        this.controller = BarcodeArViewController.forBarcodeArView(this._barcodeAr, this);
        this._barcodeAr['controller'] = this.controller;
    }
    dispose() {
        this.controller.dispose();
        this.isViewCreated = false;
        this._barcodeAr['unsubscribeNativeListeners']();
    }
    createNativeView(viewId) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (this.isViewCreated) {
                return Promise.resolve();
            }
            this._viewId = viewId;
            yield this.controller.createNativeView();
            this.isViewCreated = true;
        });
    }
    removeNativeView() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this.controller.removeNativeView();
            this.isViewCreated = false;
        });
    }
    get viewId() {
        return this._viewId;
    }
    get barcodeArViewUiListener() {
        return this._barcodeArViewUiListener;
    }
    set barcodeArViewUiListener(value) {
        this._barcodeArViewUiListener = value;
        if (value) {
            void this.controller.registerUiListener();
        }
        else {
            void this.controller.unregisterUiListener();
        }
    }
    get annotationProvider() {
        return this._annotationProvider;
    }
    set annotationProvider(value) {
        this._annotationProvider = value;
        if (value != null) {
            void this.controller.registerAnnotationProvider();
        }
        else {
            void this.controller.unregisterAnnotationProvider();
        }
    }
    get highlightProvider() {
        return this._highlightProvider;
    }
    set highlightProvider(value) {
        this._highlightProvider = value;
        if (value != null) {
            void this.controller.registerHighlightProvider();
        }
        else {
            void this.controller.unregisterHighlightProvider();
        }
    }
    get context() {
        return this._dataCaptureContext;
    }
    start() {
        this._isStarted = true;
        return this.controller.start();
    }
    stop() {
        this._isStarted = false;
        return this.controller.stop();
    }
    pause() {
        // TODO: check if we need to change isStarted
        return this.controller.pause();
    }
    reset() {
        return this.controller.reset();
    }
    get shouldShowTorchControl() {
        return this._shouldShowTorchControl;
    }
    set shouldShowTorchControl(value) {
        this._shouldShowTorchControl = value;
        void this.updateNative();
    }
    get torchControlPosition() {
        return this._torchControlPosition;
    }
    set torchControlPosition(value) {
        this._torchControlPosition = value;
        void this.updateNative();
    }
    get shouldShowZoomControl() {
        return this._shouldShowZoomControl;
    }
    set shouldShowZoomControl(value) {
        this._shouldShowZoomControl = value;
        void this.updateNative();
    }
    get zoomControlPosition() {
        return this._zoomControlPosition;
    }
    set zoomControlPosition(value) {
        this._zoomControlPosition = value;
        void this.updateNative();
    }
    get shouldShowCameraSwitchControl() {
        return this._shouldShowMacroControl;
    }
    set shouldShowCameraSwitchControl(value) {
        this._shouldShowMacroControl = value;
        void this.updateNative();
    }
    get cameraSwitchControlPosition() {
        return this._macroModeControlPosition;
    }
    set cameraSwitchControlPosition(value) {
        this._macroModeControlPosition = value;
        void this.updateNative();
    }
    get shouldShowMacroModeControl() {
        return this._shouldShowMacroControl;
    }
    set shouldShowMacroModeControl(value) {
        this._shouldShowMacroControl = value;
        void this.updateNative();
    }
    get macroModeControlPosition() {
        return this._macroModeControlPosition;
    }
    set macroModeControlPosition(value) {
        this._macroModeControlPosition = value;
        void this.updateNative();
    }
    toJSON() {
        const json = {
            View: {
                viewId: this._viewId,
                barcodeArViewSettings: this._barcodeArViewSettings,
                cameraSettings: this._cameraSettings,
                shouldShowMacroControl: this._shouldShowMacroControl,
                macroModeControlPosition: this._macroModeControlPosition,
                shouldShowTorchControl: this._shouldShowTorchControl,
                torchControlPosition: this._torchControlPosition,
                shouldShowZoomControl: this._shouldShowZoomControl,
                zoomControlPosition: this._zoomControlPosition,
                annotationProvider: this._annotationProvider,
                barcodeArViewUiListener: this._barcodeArViewUiListener,
                highlightProvider: this._highlightProvider,
                isStarted: this._isStarted,
                hasUiListener: this._barcodeArViewUiListener != null,
                hasHighlightProvider: this._highlightProvider != null,
                hasAnnotationProvider: this._annotationProvider != null,
            },
            BarcodeAr: this._barcodeAr.toJSON(),
        };
        return json;
    }
    updateNative() {
        return this.controller.update();
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BaseBarcodeArView.prototype, "nativeView", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BaseBarcodeArView.prototype, "_annotationProvider", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BaseBarcodeArView.prototype, "_barcodeArViewUiListener", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BaseBarcodeArView.prototype, "_highlightProvider", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('barcodeAr')
], BaseBarcodeArView.prototype, "_barcodeAr", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('isStarted')
], BaseBarcodeArView.prototype, "_isStarted", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('viewSettings')
], BaseBarcodeArView.prototype, "_barcodeArViewSettings", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('cameraSettings')
], BaseBarcodeArView.prototype, "_cameraSettings", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('dataCaptureContext')
], BaseBarcodeArView.prototype, "_dataCaptureContext", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('shouldShowMacroControl')
], BaseBarcodeArView.prototype, "_shouldShowMacroControl", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('macroModeControlPosition')
], BaseBarcodeArView.prototype, "_macroModeControlPosition", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('shouldShowTorchControl')
], BaseBarcodeArView.prototype, "_shouldShowTorchControl", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('torchControlPosition')
], BaseBarcodeArView.prototype, "_torchControlPosition", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('shouldShowZoomControl')
], BaseBarcodeArView.prototype, "_shouldShowZoomControl", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('zoomControlPosition')
], BaseBarcodeArView.prototype, "_zoomControlPosition", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BaseBarcodeArView.prototype, "isViewCreated", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BaseBarcodeArView, "barcodeArDefaults", null);

class BarcodeArViewSettings extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static get barcodeArDefaults() {
        return getBarcodeArDefaults();
    }
    constructor() {
        super();
        this._soundEnabled = BarcodeArViewSettings
            .barcodeArDefaults.BarcodeArView.defaultSoundEnabled;
        this._hapticEnabled = BarcodeArViewSettings
            .barcodeArDefaults.BarcodeArView.defaultHapticsEnabled;
        this._defaultCameraPosition = BarcodeArViewSettings
            .barcodeArDefaults.BarcodeArView.defaultCameraPosition;
    }
    get soundEnabled() {
        return this._soundEnabled;
    }
    set soundEnabled(value) {
        this._soundEnabled = value;
    }
    get hapticEnabled() {
        return this._hapticEnabled;
    }
    set hapticEnabled(value) {
        this._hapticEnabled = value;
    }
    get defaultCameraPosition() {
        return this._defaultCameraPosition;
    }
    set defaultCameraPosition(value) {
        this._defaultCameraPosition = value;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization("soundEnabled")
], BarcodeArViewSettings.prototype, "_soundEnabled", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization("hapticEnabled")
], BarcodeArViewSettings.prototype, "_hapticEnabled", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization("defaultCameraPosition")
], BarcodeArViewSettings.prototype, "_defaultCameraPosition", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeArViewSettings, "barcodeArDefaults", null);

var BarcodeArAnnotationTrigger;
(function (BarcodeArAnnotationTrigger) {
    BarcodeArAnnotationTrigger["HighlightTap"] = "highlightTap";
    BarcodeArAnnotationTrigger["HighlightTapAndBarcodeScan"] = "highlightTapAndBarcodeScan";
})(BarcodeArAnnotationTrigger || (BarcodeArAnnotationTrigger = {}));

var BarcodeArCircleHighlightPreset;
(function (BarcodeArCircleHighlightPreset) {
    BarcodeArCircleHighlightPreset["Dot"] = "dot";
    BarcodeArCircleHighlightPreset["Icon"] = "icon";
})(BarcodeArCircleHighlightPreset || (BarcodeArCircleHighlightPreset = {}));

var BarcodeArInfoAnnotationAnchor;
(function (BarcodeArInfoAnnotationAnchor) {
    BarcodeArInfoAnnotationAnchor["Top"] = "top";
    BarcodeArInfoAnnotationAnchor["Bottom"] = "bottom";
    BarcodeArInfoAnnotationAnchor["Left"] = "left";
    BarcodeArInfoAnnotationAnchor["Right"] = "right";
})(BarcodeArInfoAnnotationAnchor || (BarcodeArInfoAnnotationAnchor = {}));

var BarcodeArInfoAnnotationWidthPreset;
(function (BarcodeArInfoAnnotationWidthPreset) {
    BarcodeArInfoAnnotationWidthPreset["Small"] = "small";
    BarcodeArInfoAnnotationWidthPreset["Medium"] = "medium";
    BarcodeArInfoAnnotationWidthPreset["Large"] = "large";
})(BarcodeArInfoAnnotationWidthPreset || (BarcodeArInfoAnnotationWidthPreset = {}));

class BarcodeSelectionFeedback extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor() {
        super(...arguments);
        this.controller = null;
        this._selection = BarcodeSelectionFeedback.barcodeSelectionDefaults.Feedback.selection;
    }
    get selection() {
        return this._selection;
    }
    set selection(selection) {
        this._selection = selection;
        void this.updateFeedback();
    }
    static get barcodeSelectionDefaults() {
        return getBarcodeSelectionDefaults();
    }
    static get default() {
        return new BarcodeSelectionFeedback();
    }
    updateFeedback() {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            yield ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateFeedback(JSON.stringify(this.toJSON())));
        });
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeSelectionFeedback.prototype, "controller", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('selection')
], BarcodeSelectionFeedback.prototype, "_selection", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeSelectionFeedback, "barcodeSelectionDefaults", null);

class BarcodeSelectionSession {
    get selectedBarcodes() {
        return this._selectedBarcodes;
    }
    get newlySelectedBarcodes() {
        return this._newlySelectedBarcodes;
    }
    get newlyUnselectedBarcodes() {
        return this._newlyUnselectedBarcodes;
    }
    get frameSequenceID() {
        return this._frameSequenceID;
    }
    static fromJSON(json) {
        var _a;
        const sessionJson = JSON.parse(json.session);
        const session = new BarcodeSelectionSession();
        session._selectedBarcodes = sessionJson.selectedBarcodes
            .map(Barcode['fromJSON']);
        session._newlySelectedBarcodes = sessionJson.newlySelectedBarcodes
            .map(Barcode['fromJSON']);
        session._newlyUnselectedBarcodes = sessionJson.newlyUnselectedBarcodes
            .map(Barcode['fromJSON']);
        session._frameSequenceID = sessionJson.frameSequenceId;
        session.frameId = (_a = json.frameId) !== null && _a !== void 0 ? _a : '';
        return session;
    }
    getCount(barcode) {
        return this.listenerController.getCount(barcode);
    }
    reset() {
        return this.listenerController.reset();
    }
}

var BarcodeSelectionListenerEvents;
(function (BarcodeSelectionListenerEvents) {
    BarcodeSelectionListenerEvents["didUpdateSelection"] = "BarcodeSelectionListener.didUpdateSelection";
    BarcodeSelectionListenerEvents["didUpdateSession"] = "BarcodeSelectionListener.didUpdateSession";
})(BarcodeSelectionListenerEvents || (BarcodeSelectionListenerEvents = {}));
class BarcodeSelectionListenerController extends scanditDatacaptureFrameworksCore.BaseController {
    constructor(barcodeSelection) {
        super('BarcodeSelectionListenerProxy');
        this.hasListeners = false;
        this.handleDidUpdateSelectionWrapper = (ev) => {
            return this.handleDidUpdateSelection(ev);
        };
        this.handleDidUpdateSessionWrapper = (ev) => {
            return this.handleDidUpdateSession(ev);
        };
        this.barcodeSelection = barcodeSelection;
        void this.initialize();
    }
    getCount(barcode) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const result = yield this._proxy.$getCountForBarcodeInBarcodeSelectionSession({ modeId: this.modeId, selectionIdentifier: barcode['selectionIdentifier'] });
            if (result == null) {
                return 0;
            }
            return Number(result.data);
        });
    }
    reset() {
        return this._proxy.$resetBarcodeSelectionSession({ modeId: this.modeId });
    }
    subscribeListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (this.hasListeners) {
                return;
            }
            this._proxy.subscribeForEvents(Object.values(BarcodeSelectionListenerEvents));
            this._proxy.eventEmitter.on(BarcodeSelectionListenerEvents.didUpdateSelection, this.handleDidUpdateSelectionWrapper);
            this._proxy.eventEmitter.on(BarcodeSelectionListenerEvents.didUpdateSession, this.handleDidUpdateSessionWrapper);
            yield this._proxy.$$registerBarcodeSelectionListenerForEvents({ modeId: this.modeId });
            this.hasListeners = true;
        });
    }
    unsubscribeListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.hasListeners) {
                return;
            }
            yield this._proxy.$unregisterBarcodeSelectionListenerForEvents({ modeId: this.modeId });
            this._proxy.unsubscribeFromEvents(Object.values(BarcodeSelectionListenerEvents));
            this._proxy.eventEmitter.off(BarcodeSelectionListenerEvents.didUpdateSelection, this.handleDidUpdateSelectionWrapper);
            this._proxy.eventEmitter.off(BarcodeSelectionListenerEvents.didUpdateSession, this.handleDidUpdateSessionWrapper);
            this.hasListeners = false;
        });
    }
    dispose() {
        void this.unsubscribeListener();
        this._proxy.dispose();
    }
    initialize() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (this.barcodeSelection['listeners'].length > 0) {
                return this.subscribeListener();
            }
        });
    }
    handleDidUpdateSession(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('BarcodeSelectionListenerController didUpdateSession payload is null');
                return;
            }
            if (payload.modeId !== this.modeId) {
                return;
            }
            const session = BarcodeSelectionSession['fromJSON'](payload);
            session['listenerController'] = this;
            yield this.notifyListenersOfDidUpdateSession(session);
            return this._proxy.$finishBarcodeSelectionDidUpdateSession({ modeId: this.modeId, enabled: this.barcodeSelection.isEnabled });
        });
    }
    handleDidUpdateSelection(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('BarcodeSelectionListenerController didUpdateSelection payload is null');
                return;
            }
            if (payload.modeId !== this.modeId) {
                return;
            }
            const session = BarcodeSelectionSession['fromJSON'](payload);
            session['listenerController'] = this;
            yield this.notifyListenersOfDidUpdateSelection(session);
            return this._proxy.$finishBarcodeSelectionDidSelect({ modeId: this.modeId, enabled: this.barcodeSelection.isEnabled });
        });
    }
    get modeId() {
        return this.barcodeSelection['modeId'];
    }
    notifyListenersOfDidUpdateSelection(session) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const mode = this.barcodeSelection;
            for (const listener of mode['listeners']) {
                if (listener.didUpdateSelection) {
                    yield listener.didUpdateSelection(this.barcodeSelection, session, () => scanditDatacaptureFrameworksCore.CameraController.getFrameOrNull(session['frameId']));
                }
            }
        });
    }
    notifyListenersOfDidUpdateSession(session) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const mode = this.barcodeSelection;
            for (const listener of mode['listeners']) {
                if (listener.didUpdateSession) {
                    yield listener.didUpdateSession(this.barcodeSelection, session, () => scanditDatacaptureFrameworksCore.CameraController.getFrameOrNull(session['frameId']));
                }
            }
        });
    }
}

class BarcodeSelectionController extends scanditDatacaptureFrameworksCore.BaseController {
    constructor(barcodeSelection) {
        super('BarcodeSelectionProxy');
        this.barcodeSelection = barcodeSelection;
    }
    unfreezeCamera() {
        return this._proxy.$unfreezeCameraInBarcodeSelection({ modeId: this.modeId });
    }
    reset() {
        return this._proxy.$resetBarcodeSelection({ modeId: this.modeId });
    }
    selectAimedBarcode() {
        return this._proxy.$selectAimedBarcode({ modeId: this.modeId });
    }
    unselectBarcodes(barcodes) {
        const barcodesJson = this.convertBarcodesToJson(barcodes);
        return this._proxy.$unselectBarcodes({ barcodesJson: JSON.stringify(barcodesJson), modeId: this.modeId });
    }
    setSelectBarcodeEnabled(barcode, enabled) {
        const barcodesJson = this.convertBarcodesToJson([barcode]);
        return this._proxy.$setSelectBarcodeEnabled({ barcodeJson: JSON.stringify(barcodesJson[0]), enabled: enabled, modeId: this.modeId });
    }
    increaseCountForBarcodes(barcodes) {
        const barcodesJson = this.convertBarcodesToJson(barcodes);
        return this._proxy.$increaseCountForBarcodes({ barcodeJson: JSON.stringify(barcodesJson), modeId: this.modeId });
    }
    setModeEnabledState(enabled) {
        return this._proxy.$setBarcodeSelectionModeEnabledState({ modeId: this.modeId, enabled: enabled });
    }
    updateBarcodeSelectionMode(barcodeSelection) {
        return this._proxy.$updateBarcodeSelectionMode({ modeJson: JSON.stringify(barcodeSelection.toJSON()), modeId: this.modeId });
    }
    applyBarcodeSelectionModeSettings(newSettings) {
        return this._proxy.$applyBarcodeSelectionModeSettings({ modeSettingsJson: JSON.stringify(newSettings.toJSON()), modeId: this.modeId });
    }
    updateFeedback(feedbackJson) {
        return this._proxy.$updateBarcodeSelectionFeedback({ feedbackJson: feedbackJson, modeId: this.modeId });
    }
    get modeId() {
        return this.barcodeSelection['modeId'];
    }
    convertBarcodesToJson(barcodes) {
        return barcodes.flat().map((barcode) => ({
            data: barcode.data,
            rawData: barcode.rawData,
            symbology: barcode.symbology,
            symbolCount: barcode.symbolCount
        }));
    }
}

class BarcodeSelection extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static get barcodeSelectionDefaults() {
        return getBarcodeSelectionDefaults();
    }
    get _context() {
        return this.privateContext;
    }
    set _context(newContext) {
        var _a, _b;
        if (newContext == null) {
            (_a = this.listenerController) === null || _a === void 0 ? void 0 : _a.dispose();
            this.listenerController = null;
            this.privateContext = null;
            return;
        }
        this.privateContext = newContext;
        (_b = this.listenerController) !== null && _b !== void 0 ? _b : (this.listenerController = new BarcodeSelectionListenerController(this));
    }
    static createRecommendedCameraSettings() {
        return new scanditDatacaptureFrameworksCore.CameraSettings(BarcodeSelection.barcodeSelectionDefaults.RecommendedCameraSettings);
    }
    constructor(settings) {
        super();
        this.type = 'barcodeSelection';
        this.modeId = Math.floor(Math.random() * 100000000);
        this.parentId = null;
        this._isEnabled = true;
        this._feedback = new BarcodeSelectionFeedback();
        this._pointOfInterest = null;
        this.privateContext = null;
        this.listeners = [];
        this.listenerController = null;
        this.settings = settings;
        this.modeController = new BarcodeSelectionController(this);
        this._feedback['controller'] = this.modeController;
    }
    get isEnabled() {
        return this._isEnabled;
    }
    set isEnabled(isEnabled) {
        this._isEnabled = isEnabled;
        void this.modeController.setModeEnabledState(isEnabled);
    }
    get context() {
        return this._context;
    }
    get feedback() {
        return this._feedback;
    }
    set feedback(feedback) {
        this._feedback = feedback;
        this.feedback['controller'] = this.modeController;
        void this.modeController.updateFeedback(JSON.stringify(this.feedback.toJSON()));
    }
    get pointOfInterest() {
        return this._pointOfInterest;
    }
    set pointOfInterest(pointOfInterest) {
        this._pointOfInterest = pointOfInterest;
        void this.modeController.updateBarcodeSelectionMode(this);
    }
    applySettings(settings) {
        this.settings = settings;
        return this.modeController.applyBarcodeSelectionModeSettings(settings);
    }
    addListener(listener) {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            if (listener == undefined) {
                return;
            }
            if (this.listeners.includes(listener)) {
                return;
            }
            if (this.listeners.length === 0) {
                yield ((_a = this.listenerController) === null || _a === void 0 ? void 0 : _a.subscribeListener());
            }
            this.listeners.push(listener);
        });
    }
    removeListener(listener) {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            if (!this.listeners.includes(listener)) {
                return;
            }
            this.listeners.splice(this.listeners.indexOf(listener), 1);
            if (this.listeners.length === 0) {
                return (_a = this.listenerController) === null || _a === void 0 ? void 0 : _a.unsubscribeListener();
            }
        });
    }
    reset() {
        return this.modeController.reset();
    }
    unfreezeCamera() {
        return this.modeController.unfreezeCamera();
    }
    selectAimedBarcode() {
        return this.modeController.selectAimedBarcode();
    }
    unselectBarcodes(barcodes) {
        return this.modeController.unselectBarcodes(barcodes);
    }
    setSelectBarcodeEnabled(barcode, enabled) {
        return this.modeController.setSelectBarcodeEnabled(barcode, enabled);
    }
    increaseCountForBarcodes(barcodes) {
        return this.modeController.increaseCountForBarcodes(barcodes);
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('parentId'),
    scanditDatacaptureFrameworksCore.ignoreFromSerializationIfNull
], BarcodeSelection.prototype, "parentId", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('enabled')
], BarcodeSelection.prototype, "_isEnabled", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('feedback')
], BarcodeSelection.prototype, "_feedback", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('pointOfInterest')
], BarcodeSelection.prototype, "_pointOfInterest", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeSelection.prototype, "privateContext", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeSelection.prototype, "listeners", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeSelection.prototype, "listenerController", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeSelection.prototype, "modeController", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeSelection, "barcodeSelectionDefaults", null);

exports.BarcodeSelectionBasicOverlayStyle = void 0;
(function (BarcodeSelectionBasicOverlayStyle) {
    BarcodeSelectionBasicOverlayStyle["Frame"] = "frame";
    BarcodeSelectionBasicOverlayStyle["Dot"] = "dot";
})(exports.BarcodeSelectionBasicOverlayStyle || (exports.BarcodeSelectionBasicOverlayStyle = {}));

exports.BarcodeSelectionFreezeBehavior = void 0;
(function (BarcodeSelectionFreezeBehavior) {
    BarcodeSelectionFreezeBehavior["Manual"] = "manual";
    BarcodeSelectionFreezeBehavior["ManualAndAutomatic"] = "manualAndAutomatic";
})(exports.BarcodeSelectionFreezeBehavior || (exports.BarcodeSelectionFreezeBehavior = {}));

var BarcodeSelectionStrategyType;
(function (BarcodeSelectionStrategyType) {
    BarcodeSelectionStrategyType["Auto"] = "autoSelectionStrategy";
    BarcodeSelectionStrategyType["Manual"] = "manualSelectionStrategy";
})(BarcodeSelectionStrategyType || (BarcodeSelectionStrategyType = {}));

exports.BarcodeSelectionTapBehavior = void 0;
(function (BarcodeSelectionTapBehavior) {
    BarcodeSelectionTapBehavior["ToggleSelection"] = "toggleSelection";
    BarcodeSelectionTapBehavior["RepeatSelection"] = "repeatSelection";
})(exports.BarcodeSelectionTapBehavior || (exports.BarcodeSelectionTapBehavior = {}));

var BarcodeSelectionTypeName;
(function (BarcodeSelectionTypeName) {
    BarcodeSelectionTypeName["Aimer"] = "aimerSelection";
    BarcodeSelectionTypeName["Tap"] = "tapSelection";
})(BarcodeSelectionTypeName || (BarcodeSelectionTypeName = {}));

var BarcodeSelectionBrushProviderEvents;
(function (BarcodeSelectionBrushProviderEvents) {
    BarcodeSelectionBrushProviderEvents["brushForAimedBarcode"] = "BarcodeSelectionAimedBrushProvider.brushForBarcode";
    BarcodeSelectionBrushProviderEvents["brushForTrackedBarcode"] = "BarcodeSelectionTrackedBrushProvider.brushForBarcode";
})(BarcodeSelectionBrushProviderEvents || (BarcodeSelectionBrushProviderEvents = {}));
class BarcodeSelectionOverlayController extends scanditDatacaptureFrameworksCore.BaseController {
    constructor(overlay) {
        super('BarcodeSelectionOverlayProxy');
        this.isAimedBrushProviderRegistered = false;
        this.isTrackedBrushProviderRegistered = false;
        this.aimedBrushProvider = null;
        this.trackedBrushProvider = null;
        this.handleBrushForAimedBarcodeWrapper = (ev) => {
            return this.handleBrushForAimedBarcode(ev);
        };
        this.handleBrushForTrackedBarcodeWrapper = (ev) => {
            return this.handleBrushForTrackedBarcode(ev);
        };
        this.overlay = overlay;
        void this.initialize();
    }
    setTextForAimToSelectAutoHint(text) {
        return __awaiter$1(this, void 0, void 0, function* () {
            return yield this._proxy.$setTextForAimToSelectAutoHint({ text });
        });
    }
    setAimedBarcodeBrushProvider(brushProvider) {
        return __awaiter$1(this, void 0, void 0, function* () {
            this.aimedBrushProvider = brushProvider;
            if (!brushProvider || this.isAimedBrushProviderRegistered) {
                this._proxy.unsubscribeFromEvents([BarcodeSelectionBrushProviderEvents.brushForAimedBarcode]);
                if (this.isAimedBrushProviderRegistered) {
                    this._proxy.eventEmitter.off(BarcodeSelectionBrushProviderEvents.brushForAimedBarcode, this.handleBrushForAimedBarcodeWrapper);
                }
                this.isAimedBrushProviderRegistered = false;
                yield this._proxy.$removeAimedBarcodeBrushProvider();
            }
            if (brushProvider === null)
                return;
            this._proxy.subscribeForEvents([BarcodeSelectionBrushProviderEvents.brushForAimedBarcode]);
            this._proxy.eventEmitter.on(BarcodeSelectionBrushProviderEvents.brushForAimedBarcode, this.handleBrushForAimedBarcodeWrapper);
            this.isAimedBrushProviderRegistered = true;
            yield this._proxy.$setAimedBarcodeBrushProvider();
        });
    }
    setTrackedBarcodeBrushProvider(brushProvider) {
        return __awaiter$1(this, void 0, void 0, function* () {
            this.trackedBrushProvider = brushProvider;
            if (!brushProvider || this.isTrackedBrushProviderRegistered) {
                this._proxy.unsubscribeFromEvents([BarcodeSelectionBrushProviderEvents.brushForTrackedBarcode]);
                if (this.isTrackedBrushProviderRegistered) {
                    this._proxy.eventEmitter.off(BarcodeSelectionBrushProviderEvents.brushForTrackedBarcode, this.handleBrushForTrackedBarcodeWrapper);
                }
                this.isTrackedBrushProviderRegistered = false;
                yield this._proxy.$removeTrackedBarcodeBrushProvider();
            }
            if (brushProvider === null)
                return;
            this._proxy.subscribeForEvents([BarcodeSelectionBrushProviderEvents.brushForTrackedBarcode]);
            this._proxy.eventEmitter.on(BarcodeSelectionBrushProviderEvents.brushForTrackedBarcode, this.handleBrushForTrackedBarcodeWrapper);
            this.isTrackedBrushProviderRegistered = true;
            yield this._proxy.$setTrackedBarcodeBrushProvider();
        });
    }
    updateBarcodeSelectionBasicOverlay(overlay) {
        return this._proxy.$updateBarcodeSelectionBasicOverlay({ overlayJson: JSON.stringify(overlay.toJSON()) });
    }
    unsubscribeProviders() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (this.aimedBrushProvider) {
                this._proxy.unsubscribeFromEvents([BarcodeSelectionBrushProviderEvents.brushForAimedBarcode]);
                if (this.isAimedBrushProviderRegistered) {
                    this._proxy.eventEmitter.off(BarcodeSelectionBrushProviderEvents.brushForAimedBarcode, this.handleBrushForAimedBarcodeWrapper);
                    this.isAimedBrushProviderRegistered = false;
                }
                this.aimedBrushProvider = null;
                yield this._proxy.$removeAimedBarcodeBrushProvider();
            }
            if (this.trackedBrushProvider) {
                this._proxy.unsubscribeFromEvents([BarcodeSelectionBrushProviderEvents.brushForTrackedBarcode]);
                if (this.isTrackedBrushProviderRegistered) {
                    this._proxy.eventEmitter.off(BarcodeSelectionBrushProviderEvents.brushForTrackedBarcode, this.handleBrushForTrackedBarcodeWrapper);
                    this.isTrackedBrushProviderRegistered = false;
                }
                this.trackedBrushProvider = null;
                yield this._proxy.$removeTrackedBarcodeBrushProvider();
            }
        });
    }
    dispose() {
        void this.unsubscribeProviders();
        this._proxy.dispose();
    }
    initialize() {
        return __awaiter$1(this, void 0, void 0, function* () {
            const aimedBrushProvider = this.overlay.aimedBrushProvider;
            const trackedBrushProvider = this.overlay.trackedBrushProvider;
            if (aimedBrushProvider) {
                yield this.setAimedBarcodeBrushProvider(aimedBrushProvider);
            }
            if (trackedBrushProvider) {
                yield this.setTrackedBarcodeBrushProvider(trackedBrushProvider);
            }
        });
    }
    handleBrushForAimedBarcode(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a, _b;
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('BarcodeSelectionOverlayController brushForAimedBarcode payload is null');
                return;
            }
            const barcode = Barcode['fromJSON'](JSON.parse(payload.barcode));
            let brush = null;
            if ((_a = this.aimedBrushProvider) === null || _a === void 0 ? void 0 : _a.brushForBarcode) {
                brush = (_b = this.aimedBrushProvider) === null || _b === void 0 ? void 0 : _b.brushForBarcode(barcode);
            }
            yield this._proxy.$finishBrushForAimedBarcodeCallback({
                brushJson: brush ? JSON.stringify(brush.toJSON()) : null,
                selectionIdentifier: barcode['selectionIdentifier']
            });
        });
    }
    handleBrushForTrackedBarcode(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a, _b;
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('BarcodeSelectionBrushProvider brushForTrackedBarcode payload is null');
                return;
            }
            const barcode = Barcode['fromJSON'](JSON.parse(payload.barcode));
            let brush = null;
            if ((_a = this.trackedBrushProvider) === null || _a === void 0 ? void 0 : _a.brushForBarcode) {
                brush = (_b = this.trackedBrushProvider) === null || _b === void 0 ? void 0 : _b.brushForBarcode(barcode);
            }
            yield this._proxy.$finishBrushForTrackedBarcodeCallback({
                brushJson: brush ? JSON.stringify(brush.toJSON()) : null,
                selectionIdentifier: barcode['selectionIdentifier']
            });
        });
    }
}

class BarcodeSelectionBasicOverlay extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get view() {
        return this._view;
    }
    set view(newView) {
        var _a, _b;
        if (newView === null) {
            void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.dispose());
            this.controller = null;
            this._view = null;
            return;
        }
        this._view = newView;
        (_b = this.controller) !== null && _b !== void 0 ? _b : (this.controller = new BarcodeSelectionOverlayController(this));
    }
    get trackedBrush() {
        return this._trackedBrush;
    }
    set trackedBrush(newBrush) {
        var _a;
        this._trackedBrush = newBrush;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateBarcodeSelectionBasicOverlay(this));
    }
    get aimedBrush() {
        return this._aimedBrush;
    }
    set aimedBrush(newBrush) {
        var _a;
        this._aimedBrush = newBrush;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateBarcodeSelectionBasicOverlay(this));
    }
    get selectedBrush() {
        return this._selectedBrush;
    }
    set selectedBrush(newBrush) {
        var _a;
        this._selectedBrush = newBrush;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateBarcodeSelectionBasicOverlay(this));
    }
    get selectingBrush() {
        return this._selectingBrush;
    }
    set selectingBrush(newBrush) {
        var _a;
        this._selectingBrush = newBrush;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateBarcodeSelectionBasicOverlay(this));
    }
    get shouldShowScanAreaGuides() {
        return this._shouldShowScanAreaGuides;
    }
    set shouldShowScanAreaGuides(shouldShow) {
        var _a;
        this._shouldShowScanAreaGuides = shouldShow;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateBarcodeSelectionBasicOverlay(this));
    }
    get shouldShowHints() {
        return this._shouldShowHints;
    }
    set shouldShowHints(shouldShow) {
        var _a;
        this._shouldShowHints = shouldShow;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateBarcodeSelectionBasicOverlay(this));
    }
    get viewfinder() {
        return this._viewfinder;
    }
    get style() {
        return this._style;
    }
    static get barcodeSelectionDefaults() {
        return getBarcodeSelectionDefaults();
    }
    constructor(mode, style) {
        super();
        this.type = 'barcodeSelectionBasic';
        this.aimedBrushProvider = null;
        this.trackedBrushProvider = null;
        this.hasAimedBrushProvider = false;
        this.hasTrackedBrushProvider = false;
        this.controller = null;
        this._view = null;
        this._shouldShowScanAreaGuides = false;
        this._shouldShowHints = true;
        this._viewfinder = new scanditDatacaptureFrameworksCore.AimerViewfinder();
        this._trackedBrush = new scanditDatacaptureFrameworksCore.Brush(BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay['styles'][BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay.defaultStyle].DefaultTrackedBrush.fillColor, BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay['styles'][BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay.defaultStyle].DefaultTrackedBrush.strokeColor, BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay['styles'][BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay.defaultStyle].DefaultTrackedBrush.strokeWidth);
        this._aimedBrush = new scanditDatacaptureFrameworksCore.Brush(BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay['styles'][BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay.defaultStyle].DefaultAimedBrush.fillColor, BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay['styles'][BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay.defaultStyle].DefaultAimedBrush.strokeColor, BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay['styles'][BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay.defaultStyle].DefaultAimedBrush.strokeWidth);
        this._selectedBrush = new scanditDatacaptureFrameworksCore.Brush(BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay['styles'][BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay.defaultStyle].DefaultSelectedBrush.fillColor, BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay['styles'][BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay.defaultStyle].DefaultSelectedBrush.strokeColor, BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay['styles'][BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay.defaultStyle].DefaultSelectedBrush.strokeWidth);
        this._selectingBrush = new scanditDatacaptureFrameworksCore.Brush(BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay['styles'][BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay.defaultStyle].DefaultSelectingBrush.fillColor, BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay['styles'][BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay.defaultStyle].DefaultSelectingBrush.strokeColor, BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay['styles'][BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay.defaultStyle].DefaultSelectingBrush.strokeWidth);
        this._style = style !== null && style !== void 0 ? style : BarcodeSelectionBasicOverlay.barcodeSelectionDefaults.BarcodeSelectionBasicOverlay.defaultStyle;
        this.modeId = mode['modeId'];
    }
    setTextForAimToSelectAutoHint(text) {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.setTextForAimToSelectAutoHint(text);
        });
    }
    setAimedBarcodeBrushProvider(brushProvider) {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            this.aimedBrushProvider = brushProvider;
            this.hasAimedBrushProvider = brushProvider !== null;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.setAimedBarcodeBrushProvider(brushProvider);
        });
    }
    setTrackedBarcodeBrushProvider(brushProvider) {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            this.trackedBrushProvider = brushProvider;
            this.hasTrackedBrushProvider = brushProvider !== null;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.setTrackedBarcodeBrushProvider(brushProvider);
        });
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeSelectionBasicOverlay.prototype, "aimedBrushProvider", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeSelectionBasicOverlay.prototype, "trackedBrushProvider", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeSelectionBasicOverlay.prototype, "controller", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeSelectionBasicOverlay.prototype, "_view", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('shouldShowScanAreaGuides')
], BarcodeSelectionBasicOverlay.prototype, "_shouldShowScanAreaGuides", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('shouldShowHints')
], BarcodeSelectionBasicOverlay.prototype, "_shouldShowHints", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('viewfinder')
], BarcodeSelectionBasicOverlay.prototype, "_viewfinder", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('style')
], BarcodeSelectionBasicOverlay.prototype, "_style", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('trackedBrush')
], BarcodeSelectionBasicOverlay.prototype, "_trackedBrush", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('aimedBrush')
], BarcodeSelectionBasicOverlay.prototype, "_aimedBrush", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('selectedBrush')
], BarcodeSelectionBasicOverlay.prototype, "_selectedBrush", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('selectingBrush')
], BarcodeSelectionBasicOverlay.prototype, "_selectingBrush", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeSelectionBasicOverlay, "barcodeSelectionDefaults", null);

class BarcodeSelectionAutoSelectionStrategy extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor() {
        super(...arguments);
        this.type = BarcodeSelectionStrategyType.Auto;
    }
    static get autoSelectionStrategy() {
        return new BarcodeSelectionAutoSelectionStrategy();
    }
}
class BarcodeSelectionManualSelectionStrategy extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor() {
        super(...arguments);
        this.type = BarcodeSelectionStrategyType.Manual;
    }
    static get manualSelectionStrategy() {
        return new BarcodeSelectionManualSelectionStrategy();
    }
}
class PrivateBarcodeSelectionStrategy {
    static fromJSON(json) {
        switch (json.type) {
            case BarcodeSelectionStrategyType.Auto:
                return BarcodeSelectionAutoSelectionStrategy.autoSelectionStrategy;
            case BarcodeSelectionStrategyType.Manual:
                return BarcodeSelectionManualSelectionStrategy.manualSelectionStrategy;
            default:
                throw new Error('Unknown selection strategy type: ' + JSON.stringify(json.type));
        }
    }
}

class BarcodeSelectionTapSelection extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor() {
        super(...arguments);
        this.freezeBehavior = BarcodeSelectionTapSelection.barcodeSelectionDefaults.BarcodeSelectionTapSelection.defaultFreezeBehavior;
        this.tapBehavior = BarcodeSelectionTapSelection.barcodeSelectionDefaults.BarcodeSelectionTapSelection.defaultTapBehavior;
        this.type = BarcodeSelectionTypeName.Tap;
    }
    static get tapSelection() {
        return new BarcodeSelectionTapSelection();
    }
    static get barcodeSelectionDefaults() {
        return getBarcodeSelectionDefaults();
    }
    static withFreezeBehaviorAndTapBehavior(freezeBehavior, tapBehavior) {
        const selection = this.tapSelection;
        selection.freezeBehavior = freezeBehavior;
        selection.tapBehavior = tapBehavior;
        return selection;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeSelectionTapSelection, "barcodeSelectionDefaults", null);
class BarcodeSelectionAimerSelection extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static get aimerSelection() {
        return new BarcodeSelectionAimerSelection();
    }
    static get barcodeSelectionDefaults() {
        return getBarcodeSelectionDefaults();
    }
    constructor() {
        super();
        this.type = BarcodeSelectionTypeName.Aimer;
        this.selectionStrategy = BarcodeSelectionAimerSelection.barcodeSelectionDefaults.BarcodeSelectionAimerSelection
            .defaultSelectionStrategy((json) => PrivateBarcodeSelectionStrategy.fromJSON(json));
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeSelectionAimerSelection, "barcodeSelectionDefaults", null);
class PrivateBarcodeSelectionType {
    static fromJSON(json) {
        switch (json.type) {
            case BarcodeSelectionTypeName.Aimer:
                return PrivateBarcodeSelectionAimerSelection.fromJSON(json);
            case BarcodeSelectionTypeName.Tap:
                return PrivateBarcodeSelectionTapSelection.fromJSON(json);
        }
    }
}
class PrivateBarcodeSelectionAimerSelection {
    static fromJSON(json) {
        const selection = BarcodeSelectionAimerSelection.aimerSelection;
        if (json.type === BarcodeSelectionTypeName.Aimer) {
            selection.selectionStrategy = PrivateBarcodeSelectionStrategy.fromJSON({ type: json.selectionStrategy });
        }
        return selection;
    }
}
class PrivateBarcodeSelectionTapSelection {
    static fromJSON(json) {
        const selection = BarcodeSelectionTapSelection.tapSelection;
        if (json.type === BarcodeSelectionTypeName.Tap) {
            selection.freezeBehavior = json.freezeBehavior;
            selection.tapBehavior = json.tapBehavior;
        }
        return selection;
    }
}

class BarcodeSelectionSettings extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static get barcodeSelectionDefaults() {
        return getBarcodeSelectionDefaults();
    }
    static get barcodeDefaults() {
        return getBarcodeDefaults();
    }
    get enabledSymbologies() {
        return Object.keys(this.symbologies)
            .filter(symbology => this.symbologies[symbology].isEnabled);
    }
    constructor() {
        super();
        this.codeDuplicateFilter = BarcodeSelectionSettings.barcodeSelectionDefaults.BarcodeSelectionSettings.codeDuplicateFilter;
        this.singleBarcodeAutoDetection = BarcodeSelectionSettings.barcodeSelectionDefaults.BarcodeSelectionSettings.singleBarcodeAutoDetection;
        this.selectionType = BarcodeSelectionSettings.barcodeSelectionDefaults.BarcodeSelectionSettings.selectionType((json) => PrivateBarcodeSelectionType.fromJSON(json));
        this.properties = {};
        this.symbologies = {};
    }
    settingsForSymbology(symbology) {
        if (!this.symbologies[symbology]) {
            const symbologySettings = BarcodeSelectionSettings.barcodeDefaults.SymbologySettings[symbology];
            symbologySettings['_symbology'] = symbology;
            this.symbologies[symbology] = symbologySettings;
        }
        return this.symbologies[symbology];
    }
    setProperty(name, value) {
        this.properties[name] = value;
    }
    getProperty(name) {
        return this.properties[name];
    }
    enableSymbologies(symbologies) {
        symbologies.forEach(symbology => this.enableSymbology(symbology, true));
    }
    enableSymbology(symbology, enabled) {
        this.settingsForSymbology(symbology).isEnabled = enabled;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('singleBarcodeAutoDetectionEnabled')
], BarcodeSelectionSettings.prototype, "singleBarcodeAutoDetection", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeSelectionSettings, "barcodeSelectionDefaults", null);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeSelectionSettings, "barcodeDefaults", null);

class BarcodeCountFeedback extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static get barcodeCountDefaults() {
        return getBarcodeCountDefaults();
    }
    static get default() {
        return new BarcodeCountFeedback(BarcodeCountFeedback.barcodeCountDefaults.Feedback.success, BarcodeCountFeedback.barcodeCountDefaults.Feedback.failure);
    }
    static get emptyFeedback() {
        return new BarcodeCountFeedback(new scanditDatacaptureFrameworksCore.Feedback(null, null), new scanditDatacaptureFrameworksCore.Feedback(null, null));
    }
    static fromJSON(json) {
        const success = scanditDatacaptureFrameworksCore.Feedback['fromJSON'](json.success);
        const failure = scanditDatacaptureFrameworksCore.Feedback['fromJSON'](json.failure);
        return new BarcodeCountFeedback(success, failure);
    }
    constructor(success, error) {
        super();
        this.controller = null;
        this._success = BarcodeCountFeedback.barcodeCountDefaults.Feedback.success;
        this._failure = BarcodeCountFeedback.barcodeCountDefaults.Feedback.failure;
        this.success = success;
        this.failure = error;
    }
    get success() {
        return this._success;
    }
    set success(success) {
        this._success = success;
        void this.updateFeedback();
    }
    get failure() {
        return this._failure;
    }
    set failure(failure) {
        this._failure = failure;
        void this.updateFeedback();
    }
    updateFeedback() {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            yield ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateFeedback(JSON.stringify(this.toJSON())));
        });
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCountFeedback.prototype, "controller", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('success')
], BarcodeCountFeedback.prototype, "_success", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('failure')
], BarcodeCountFeedback.prototype, "_failure", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCountFeedback, "barcodeCountDefaults", null);

class BarcodeCount extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static get barcodeCountDefaults() {
        return getBarcodeCountDefaults();
    }
    static createRecommendedCameraSettings() {
        return new scanditDatacaptureFrameworksCore.CameraSettings(BarcodeCount.barcodeCountDefaults.RecommendedCameraSettings);
    }
    constructor(settings) {
        super();
        this.type = 'barcodeCount';
        this._feedback = BarcodeCountFeedback.default;
        this._isEnabled = true;
        this._hasListeners = false;
        this._additionalBarcodes = [];
        this.listeners = [];
        this.privateContext = null;
        this._controller = null;
        this.settings = settings;
    }
    get isEnabled() {
        return this._isEnabled;
    }
    set isEnabled(isEnabled) {
        var _a;
        this._isEnabled = isEnabled;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.setModeEnabledState(isEnabled));
    }
    get context() {
        return this._context;
    }
    get feedback() {
        return this._feedback;
    }
    set feedback(feedback) {
        var _a;
        this._feedback = feedback;
        this._feedback['controller'] = this.controller;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateFeedback(JSON.stringify(feedback.toJSON())));
    }
    get _context() {
        return this.privateContext;
    }
    set _context(newContext) {
        this.privateContext = newContext;
    }
    get controller() {
        return this._controller;
    }
    set controller(newController) {
        this._controller = newController;
        this._feedback['controller'] = this.controller;
    }
    applySettings(settings) {
        this.settings = settings;
        return this.didChange();
    }
    addListener(listener) {
        this.checkAndSubscribeListeners();
        if (this.listeners.includes(listener)) {
            return;
        }
        this.listeners.push(listener);
        this._hasListeners = this.listeners.length > 0;
    }
    removeListener(listener) {
        if (!this.listeners.includes(listener)) {
            return;
        }
        this.listeners.splice(this.listeners.indexOf(listener));
        this.checkAndUnsubscribeListeners();
        this._hasListeners = this.listeners.length > 0;
    }
    reset() {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            yield ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.reset());
        });
    }
    startScanningPhase() {
        var _a;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.startScanningPhase());
    }
    endScanningPhase() {
        var _a;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.endScanningPhase());
    }
    setBarcodeCountCaptureList(barcodeCountCaptureList) {
        var _a;
        (_a = this.controller) === null || _a === void 0 ? void 0 : _a.setBarcodeCountCaptureList(barcodeCountCaptureList);
    }
    setAdditionalBarcodes(barcodes) {
        this._additionalBarcodes = barcodes;
        return this.didChange();
    }
    clearAdditionalBarcodes() {
        return __awaiter$1(this, void 0, void 0, function* () {
            this._additionalBarcodes = [];
            yield this.didChange();
        });
    }
    checkAndSubscribeListeners() {
        var _a;
        if (this.listeners.length === 0) {
            void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.registerModeListener());
        }
    }
    checkAndUnsubscribeListeners() {
        var _a;
        if (this.listeners.length === 0) {
            void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.unregisterModeListener());
        }
    }
    didChange() {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            yield ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateMode());
        });
    }
    unsubscribeNativeListeners() {
        var _a;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.unregisterModeListener());
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('feedback')
], BarcodeCount.prototype, "_feedback", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('isEnabled')
], BarcodeCount.prototype, "_isEnabled", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('hasListeners')
], BarcodeCount.prototype, "_hasListeners", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('additionalBarcodes')
], BarcodeCount.prototype, "_additionalBarcodes", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCount.prototype, "listeners", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCount.prototype, "privateContext", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCount.prototype, "_controller", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCount, "barcodeCountDefaults", null);

class BarcodeCountCaptureList {
    static create(listener, targetBarcodes) {
        return new BarcodeCountCaptureList(listener, targetBarcodes);
    }
    constructor(listener, targetBarcodes) {
        this.listener = listener;
        this.targetBarcodes = targetBarcodes;
    }
}

class BarcodeCountCaptureListSession extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get correctBarcodes() {
        return this._correctBarcodes;
    }
    get wrongBarcodes() {
        return this._wrongBarcodes;
    }
    get missingBarcodes() {
        return this._missingBarcodes;
    }
    get additionalBarcodes() {
        return this._additionalBarcodes;
    }
    get acceptedBarcodes() {
        return this._acceptedBarcodes;
    }
    get rejectedBarcodes() {
        return this._rejectedBarcodes;
    }
    static fromJSON(json) {
        var _a, _b, _c, _d, _e, _f;
        const correctBarcodes = (_a = json.correctBarcodes) !== null && _a !== void 0 ? _a : [];
        const wrongBarcodes = (_b = json.wrongBarcodes) !== null && _b !== void 0 ? _b : [];
        const missingBarcodes = (_c = json.missingBarcodes) !== null && _c !== void 0 ? _c : [];
        const additionalBarcodes = (_d = json.additionalBarcodes) !== null && _d !== void 0 ? _d : [];
        const acceptedBarcodes = (_e = json.acceptedBarcodes) !== null && _e !== void 0 ? _e : [];
        const rejectedBarcodes = (_f = json.rejectedBarcodes) !== null && _f !== void 0 ? _f : [];
        return new BarcodeCountCaptureListSession({
            correctBarcodes,
            wrongBarcodes,
            missingBarcodes,
            additionalBarcodes,
            acceptedBarcodes,
            rejectedBarcodes
        });
    }
    constructor({ correctBarcodes, wrongBarcodes, missingBarcodes, additionalBarcodes, acceptedBarcodes, rejectedBarcodes }) {
        super();
        this._correctBarcodes = correctBarcodes;
        this._wrongBarcodes = wrongBarcodes;
        this._missingBarcodes = missingBarcodes;
        this._additionalBarcodes = additionalBarcodes;
        this._acceptedBarcodes = acceptedBarcodes;
        this._rejectedBarcodes = rejectedBarcodes;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('correctBarcodes')
], BarcodeCountCaptureListSession.prototype, "_correctBarcodes", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('wrongBarcodes')
], BarcodeCountCaptureListSession.prototype, "_wrongBarcodes", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('missingBarcodes')
], BarcodeCountCaptureListSession.prototype, "_missingBarcodes", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('additionalBarcodes')
], BarcodeCountCaptureListSession.prototype, "_additionalBarcodes", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('acceptedBarcodes')
], BarcodeCountCaptureListSession.prototype, "_acceptedBarcodes", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('rejectedBarcodes')
], BarcodeCountCaptureListSession.prototype, "_rejectedBarcodes", void 0);

exports.BarcodeCountViewStyle = void 0;
(function (BarcodeCountViewStyle) {
    BarcodeCountViewStyle["Icon"] = "icon";
    BarcodeCountViewStyle["Dot"] = "dot";
})(exports.BarcodeCountViewStyle || (exports.BarcodeCountViewStyle = {}));

exports.BarcodeFilterHighlightType = void 0;
(function (BarcodeFilterHighlightType) {
    BarcodeFilterHighlightType["Brush"] = "brush";
})(exports.BarcodeFilterHighlightType || (exports.BarcodeFilterHighlightType = {}));

class BarcodeCountSessionController extends scanditDatacaptureFrameworksCore.BaseController {
    constructor(viewId) {
        super('BarcodeCountSessionProxy');
        this.viewId = viewId;
    }
    resetSession() {
        return this._proxy.$resetBarcodeCountSession({ viewId: this.viewId });
    }
    getSpatialMap() {
        return __awaiter$1(this, void 0, void 0, function* () {
            const result = yield this._proxy.$getBarcodeCountSpatialMap({ viewId: this.viewId });
            if (result) {
                const payload = JSON.parse(result.data);
                return BarcodeSpatialGrid['fromJSON'](payload);
            }
        });
    }
    getSpatialMapWithHints(expectedNumberOfRows, expectedNumberOfColumns) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const result = yield this._proxy.$getBarcodeCountSpatialMapWithHints({ viewId: this.viewId, expectedNumberOfRows, expectedNumberOfColumns });
            if (result) {
                const payload = JSON.parse(result.data);
                return BarcodeSpatialGrid['fromJSON'](payload);
            }
        });
    }
}

class BarcodeCountSession extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static fromJSON(json) {
        var _a;
        const sessionJson = JSON.parse(json.session);
        const session = new BarcodeCountSession(json.viewId);
        session._frameSequenceID = sessionJson.frameSequenceId;
        session._additionalBarcodes = sessionJson.additionalBarcodes;
        session._recognizedBarcodes = sessionJson.recognizedBarcodes.map(Barcode['fromJSON']);
        session.frameId = (_a = json.frameId) !== null && _a !== void 0 ? _a : '';
        return session;
    }
    constructor(viewId) {
        super();
        this.sessionController = new BarcodeCountSessionController(viewId);
    }
    get recognizedBarcodes() {
        return this._recognizedBarcodes;
    }
    get additionalBarcodes() {
        return this._additionalBarcodes;
    }
    get frameSequenceID() {
        return this._frameSequenceID;
    }
    reset() {
        return this.sessionController.resetSession();
    }
    getSpatialMap() {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            return (_a = yield this.sessionController.getSpatialMap()) !== null && _a !== void 0 ? _a : null;
        });
    }
    getSpatialMapWithHints(expectedNumberOfRows, expectedNumberOfColumns) {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            return (_a = yield this.sessionController.getSpatialMapWithHints(expectedNumberOfRows, expectedNumberOfColumns)) !== null && _a !== void 0 ? _a : null;
        });
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('recognizedBarcodes')
], BarcodeCountSession.prototype, "_recognizedBarcodes", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('additionalBarcodes')
], BarcodeCountSession.prototype, "_additionalBarcodes", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('frameSequenceID')
], BarcodeCountSession.prototype, "_frameSequenceID", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCountSession.prototype, "sessionController", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCountSession.prototype, "frameId", void 0);

class BarcodeCountSettings extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static get barcodeCountDefaults() {
        return getBarcodeCountDefaults();
    }
    static get barcodeDefaults() {
        return getBarcodeDefaults();
    }
    constructor() {
        super();
        this.symbologies = {};
        this.properties = {};
        this._filterSettings = BarcodeCountSettings.barcodeCountDefaults.BarcodeCountSettings.barcodeFilterSettings;
        this._expectsOnlyUniqueBarcodes = BarcodeCountSettings.barcodeCountDefaults.BarcodeCountSettings.expectOnlyUniqueBarcodes;
        this._mappingEnabled = BarcodeCountSettings.barcodeCountDefaults.BarcodeCountSettings.mappingEnabled;
    }
    get expectsOnlyUniqueBarcodes() {
        return this._expectsOnlyUniqueBarcodes;
    }
    set expectsOnlyUniqueBarcodes(expectsOnlyUniqueBarcodes) {
        this._expectsOnlyUniqueBarcodes = expectsOnlyUniqueBarcodes;
    }
    get mappingEnabled() {
        return this._mappingEnabled;
    }
    set mappingEnabled(mappingEnabled) {
        this._mappingEnabled = mappingEnabled;
    }
    get filterSettings() {
        return this._filterSettings;
    }
    get enabledSymbologies() {
        return Object.keys(this.symbologies)
            .filter(symbology => this.symbologies[symbology].isEnabled);
    }
    settingsForSymbology(symbology) {
        if (!this.symbologies[symbology]) {
            const symbologySettings = BarcodeCountSettings.barcodeDefaults.SymbologySettings[symbology];
            symbologySettings['_symbology'] = symbology;
            this.symbologies[symbology] = symbologySettings;
        }
        return this.symbologies[symbology];
    }
    enableSymbologies(symbologies) {
        symbologies.forEach(symbology => this.enableSymbology(symbology, true));
    }
    enableSymbology(symbology, enabled) {
        this.settingsForSymbology(symbology).isEnabled = enabled;
    }
    setProperty(name, value) {
        this.properties[name] = value;
    }
    getProperty(name) {
        return this.properties[name];
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('barcodeFilterSettings')
], BarcodeCountSettings.prototype, "_filterSettings", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('expectOnlyUniqueBarcodes')
], BarcodeCountSettings.prototype, "_expectsOnlyUniqueBarcodes", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('mappingEnabled')
], BarcodeCountSettings.prototype, "_mappingEnabled", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCountSettings, "barcodeCountDefaults", null);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCountSettings, "barcodeDefaults", null);

class BarcodeCountToolbarSettings extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor() {
        super(...arguments);
        this.audioOnButtonText = BarcodeCountToolbarSettings.barcodeCountDefaults.BarcodeCountView.toolbarSettings.audioOnButtonText;
        this.audioOffButtonText = BarcodeCountToolbarSettings.barcodeCountDefaults.BarcodeCountView.toolbarSettings.audioOffButtonText;
        this.audioButtonContentDescription = BarcodeCountToolbarSettings.barcodeCountDefaults.BarcodeCountView.toolbarSettings.audioButtonContentDescription;
        this.audioButtonAccessibilityHint = BarcodeCountToolbarSettings.barcodeCountDefaults.BarcodeCountView.toolbarSettings.audioButtonAccessibilityHint;
        this.audioButtonAccessibilityLabel = BarcodeCountToolbarSettings.barcodeCountDefaults.BarcodeCountView.toolbarSettings.audioButtonAccessibilityLabel;
        this.vibrationOnButtonText = BarcodeCountToolbarSettings.barcodeCountDefaults.BarcodeCountView.toolbarSettings.vibrationOnButtonText;
        this.vibrationOffButtonText = BarcodeCountToolbarSettings.barcodeCountDefaults.BarcodeCountView.toolbarSettings.vibrationOffButtonText;
        this.vibrationButtonContentDescription = BarcodeCountToolbarSettings.barcodeCountDefaults.BarcodeCountView.toolbarSettings.vibrationButtonContentDescription;
        this.vibrationButtonAccessibilityHint = BarcodeCountToolbarSettings.barcodeCountDefaults.BarcodeCountView.toolbarSettings.vibrationButtonAccessibilityHint;
        this.vibrationButtonAccessibilityLabel = BarcodeCountToolbarSettings.barcodeCountDefaults.BarcodeCountView.toolbarSettings.vibrationButtonAccessibilityLabel;
        this.strapModeOnButtonText = BarcodeCountToolbarSettings.barcodeCountDefaults.BarcodeCountView.toolbarSettings.strapModeOnButtonText;
        this.strapModeOffButtonText = BarcodeCountToolbarSettings.barcodeCountDefaults.BarcodeCountView.toolbarSettings.strapModeOffButtonText;
        this.strapModeButtonContentDescription = BarcodeCountToolbarSettings.barcodeCountDefaults.BarcodeCountView.toolbarSettings.strapModeButtonContentDescription;
        this.strapModeButtonAccessibilityHint = BarcodeCountToolbarSettings.barcodeCountDefaults.BarcodeCountView.toolbarSettings.strapModeButtonAccessibilityHint;
        this.strapModeButtonAccessibilityLabel = BarcodeCountToolbarSettings.barcodeCountDefaults.BarcodeCountView.toolbarSettings.strapModeButtonAccessibilityLabel;
        this.colorSchemeOnButtonText = BarcodeCountToolbarSettings.barcodeCountDefaults.BarcodeCountView.toolbarSettings.colorSchemeOnButtonText;
        this.colorSchemeOffButtonText = BarcodeCountToolbarSettings.barcodeCountDefaults.BarcodeCountView.toolbarSettings.colorSchemeOffButtonText;
        this.colorSchemeButtonContentDescription = BarcodeCountToolbarSettings.barcodeCountDefaults.BarcodeCountView.toolbarSettings.colorSchemeButtonContentDescription;
        this.colorSchemeButtonAccessibilityHint = BarcodeCountToolbarSettings.barcodeCountDefaults.BarcodeCountView.toolbarSettings.colorSchemeButtonAccessibilityHint;
        this.colorSchemeButtonAccessibilityLabel = BarcodeCountToolbarSettings.barcodeCountDefaults.BarcodeCountView.toolbarSettings.colorSchemeButtonAccessibilityLabel;
    }
    static get barcodeCountDefaults() {
        return getBarcodeCountDefaults();
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCountToolbarSettings, "barcodeCountDefaults", null);

class BarcodeCountViewEventHandlers {
    constructor(view, barcodeCount, proxy) {
        this.view = view;
        this.barcodeCount = barcodeCount;
        this.proxy = proxy;
    }
    handleSingleScanButtonTapped(ev) {
        var _a, _b;
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodeCountViewController listButtonTapped payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        (_b = (_a = this.view.uiListener) === null || _a === void 0 ? void 0 : _a.didTapSingleScanButton) === null || _b === void 0 ? void 0 : _b.call(_a, this.view.platformView);
    }
    handleListButtonTapped(ev) {
        var _a, _b;
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodeCountViewController listButtonTapped payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        (_b = (_a = this.view.uiListener) === null || _a === void 0 ? void 0 : _a.didTapListButton) === null || _b === void 0 ? void 0 : _b.call(_a, this.view.platformView);
    }
    handleExitButtonTapped(ev) {
        var _a, _b;
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodeCountViewController exitButtonTapped payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        (_b = (_a = this.view.uiListener) === null || _a === void 0 ? void 0 : _a.didTapExitButton) === null || _b === void 0 ? void 0 : _b.call(_a, this.view.platformView);
    }
    handleBrushForRecognizedBarcode(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('BarcodeCountViewController brushForRecognizedBarcode payload is null');
                return;
            }
            if (payload.viewId !== this.view.viewId) {
                return;
            }
            const trackedBarcode = TrackedBarcode['fromJSON'](JSON.parse(payload.trackedBarcode));
            let brush = this.view.recognizedBrush;
            if (this.view.listener && this.view.listener.brushForRecognizedBarcode) {
                brush = this.view.listener.brushForRecognizedBarcode(this.view.platformView, trackedBarcode);
            }
            const finishPayload = this.buildTrackedBarcodeBrushPayload(trackedBarcode, brush);
            yield this.proxy.$finishBarcodeCountBrushForRecognizedBarcode({ viewId: this.view.viewId, brushJson: finishPayload.brush, trackedBarcodeId: finishPayload.trackedBarcodeID });
        });
    }
    handleBrushForRecognizedBarcodeNotInList(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('BarcodeCountViewController brushForRecognizedBarcodeNotInList payload is null');
                return;
            }
            if (payload.viewId !== this.view.viewId) {
                return;
            }
            const trackedBarcode = TrackedBarcode['fromJSON'](JSON.parse(payload.trackedBarcode));
            let brush = this.view.notInListBrush;
            if (this.view.listener && this.view.listener.brushForRecognizedBarcodeNotInList) {
                brush = this.view.listener.brushForRecognizedBarcodeNotInList(this.view.platformView, trackedBarcode);
            }
            const finishPayload = this.buildTrackedBarcodeBrushPayload(trackedBarcode, brush);
            yield this.proxy.$finishBarcodeCountBrushForRecognizedBarcodeNotInList({ viewId: this.view.viewId, brushJson: finishPayload.brush, trackedBarcodeId: finishPayload.trackedBarcodeID });
        });
    }
    handleBrushForAcceptedBarcode(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('BarcodeCountViewController brushForAcceptedBarcode payload is null');
                return;
            }
            if (payload.viewId !== this.view.viewId) {
                return;
            }
            const trackedBarcode = TrackedBarcode['fromJSON'](JSON.parse(payload.trackedBarcode));
            let brush = this.view.acceptedBrush;
            if (this.view.listener && this.view.listener.brushForAcceptedBarcode) {
                brush = this.view.listener.brushForAcceptedBarcode(this.view.platformView, trackedBarcode);
            }
            const finishPayload = this.buildTrackedBarcodeBrushPayload(trackedBarcode, brush);
            yield this.proxy.$finishBarcodeCountBrushForAcceptedBarcode({ viewId: this.view.viewId, brushJson: finishPayload.brush, trackedBarcodeId: finishPayload.trackedBarcodeID });
        });
    }
    handleBrushForRejectedBarcode(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('BarcodeCountViewController brushForRejectedBarcode payload is null');
                return;
            }
            if (payload.viewId !== this.view.viewId) {
                return;
            }
            const trackedBarcode = TrackedBarcode['fromJSON'](JSON.parse(payload.trackedBarcode));
            let brush = this.view.rejectedBrush;
            if (this.view.listener && this.view.listener.brushForRejectedBarcode) {
                brush = this.view.listener.brushForRejectedBarcode(this.view.platformView, trackedBarcode);
            }
            const finishPayload = this.buildTrackedBarcodeBrushPayload(trackedBarcode, brush);
            yield this.proxy.$finishBarcodeCountBrushForRejectedBarcode({ viewId: this.view.viewId, brushJson: finishPayload.brush, trackedBarcodeId: finishPayload.trackedBarcodeID });
        });
    }
    handleFilteredBarcodeTapped(ev) {
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodeCountViewController filteredBarcodeTapped payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        const trackedBarcode = TrackedBarcode['fromJSON'](JSON.parse(payload.trackedBarcode));
        if (this.view.listener && this.view.listener.didTapFilteredBarcode) {
            this.view.listener.didTapFilteredBarcode(this.view.platformView, trackedBarcode);
        }
    }
    handleRecognizedBarcodeNotInListTapped(ev) {
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodeCountViewController recognizedBarcodeNotInListTapped payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        const trackedBarcode = TrackedBarcode['fromJSON'](JSON.parse(payload.trackedBarcode));
        if (this.view.listener && this.view.listener.didTapRecognizedBarcodeNotInList) {
            this.view.listener.didTapRecognizedBarcodeNotInList(this.view.platformView, trackedBarcode);
        }
    }
    handleRecognizedBarcodeTapped(ev) {
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodeCountViewController recognizedBarcodeTapped payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        const trackedBarcode = TrackedBarcode['fromJSON'](JSON.parse(payload.trackedBarcode));
        if (this.view.listener && this.view.listener.didTapRecognizedBarcode) {
            this.view.listener.didTapRecognizedBarcode(this.view.platformView, trackedBarcode);
        }
    }
    handleAcceptedBarcodeTapped(ev) {
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodeCountViewController acceptedBarcodeTapped payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        const trackedBarcode = TrackedBarcode['fromJSON'](JSON.parse(payload.trackedBarcode));
        if (this.view.listener && this.view.listener.didTapAcceptedBarcode) {
            this.view.listener.didTapAcceptedBarcode(this.view.platformView, trackedBarcode);
        }
    }
    handleRejectedBarcodeTapped(ev) {
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodeCountViewController rejectedBarcodeTapped payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        const trackedBarcode = TrackedBarcode['fromJSON'](JSON.parse(payload.trackedBarcode));
        if (this.view.listener && this.view.listener.didTapRejectedBarcode) {
            this.view.listener.didTapRejectedBarcode(this.view.platformView, trackedBarcode);
        }
    }
    handleCaptureListCompleted(ev) {
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodeCountViewController captureListCompleted payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        if (this.view.listener && this.view.listener.didCompleteCaptureList) {
            this.view.listener.didCompleteCaptureList(this.view.platformView);
        }
    }
    handleDidScan(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('BarcodeCountListenerController didScan payload is null');
                return;
            }
            if (payload.viewId !== this.view.viewId) {
                return;
            }
            const session = BarcodeCountSession['fromJSON'](payload);
            yield this.notifyListenersOfDidScanSession(session);
            yield this.proxy.$finishBarcodeCountOnScan({ viewId: this.view.viewId });
        });
    }
    handleDidUpdateSession(ev) {
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodeCountListenerController.subscribeListener: didListSessionUpdate payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        const session = BarcodeCountCaptureListSession['fromJSON'](JSON.parse(payload.session));
        this.notifyListenersOfDidListSessionUpdate(session);
    }
    setBarcodeCountCaptureList(barcodeCountCaptureList) {
        this._barcodeCountCaptureList = barcodeCountCaptureList;
        void this.proxy.$setBarcodeCountCaptureList({ viewId: this.view.viewId, captureListJson: JSON.stringify(barcodeCountCaptureList['targetBarcodes']) });
    }
    buildTrackedBarcodeBrushPayload(trackedBarcode, brush) {
        return {
            trackedBarcodeID: trackedBarcode.identifier,
            brush: brush ? JSON.stringify(brush.toJSON()) : null,
        };
    }
    notifyListenersOfDidScanSession(session) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const mode = this.barcodeCount;
            for (const listener of mode['listeners']) {
                if (listener.didScan) {
                    yield listener.didScan(this.barcodeCount, session, () => scanditDatacaptureFrameworksCore.CameraController.getFrame(session['frameId']));
                }
            }
        });
    }
    notifyListenersOfDidListSessionUpdate(session) {
        var _a;
        const barcodeCountCaptureListListener = (_a = this._barcodeCountCaptureList) === null || _a === void 0 ? void 0 : _a['listener'];
        if (barcodeCountCaptureListListener && (barcodeCountCaptureListListener === null || barcodeCountCaptureListListener === void 0 ? void 0 : barcodeCountCaptureListListener.didUpdateSession)) {
            barcodeCountCaptureListListener === null || barcodeCountCaptureListListener === void 0 ? void 0 : barcodeCountCaptureListListener.didUpdateSession(this._barcodeCountCaptureList, session);
        }
    }
}

var BarcodeCountUiListenerEvents;
(function (BarcodeCountUiListenerEvents) {
    BarcodeCountUiListenerEvents["singleScanButtonTapped"] = "BarcodeCountViewUiListener.onSingleScanButtonTapped";
    BarcodeCountUiListenerEvents["listButtonTapped"] = "BarcodeCountViewUiListener.onListButtonTapped";
    BarcodeCountUiListenerEvents["exitButtonTapped"] = "BarcodeCountViewUiListener.onExitButtonTapped";
})(BarcodeCountUiListenerEvents || (BarcodeCountUiListenerEvents = {}));
var BarcodeCountViewListenerEvents;
(function (BarcodeCountViewListenerEvents) {
    BarcodeCountViewListenerEvents["brushForRecognizedBarcode"] = "BarcodeCountViewListener.brushForRecognizedBarcode";
    BarcodeCountViewListenerEvents["brushForRecognizedBarcodeNotInList"] = "BarcodeCountViewListener.brushForRecognizedBarcodeNotInList";
    BarcodeCountViewListenerEvents["brushForAcceptedBarcode"] = "BarcodeCountViewListener.brushForAcceptedBarcode";
    BarcodeCountViewListenerEvents["brushForRejectedBarcode"] = "BarcodeCountViewListener.brushForRejectedBarcode";
    BarcodeCountViewListenerEvents["filteredBarcodeTapped"] = "BarcodeCountViewListener.didTapFilteredBarcode";
    BarcodeCountViewListenerEvents["recognizedBarcodeNotInListTapped"] = "BarcodeCountViewListener.didTapRecognizedBarcodeNotInList";
    BarcodeCountViewListenerEvents["recognizedBarcodeTapped"] = "BarcodeCountViewListener.didTapRecognizedBarcode";
    BarcodeCountViewListenerEvents["acceptedBarcodeTapped"] = "BarcodeCountViewListener.didTapAcceptedBarcode";
    BarcodeCountViewListenerEvents["rejectedBarcodeTapped"] = "BarcodeCountViewListener.didTapRejectedBarcode";
    BarcodeCountViewListenerEvents["captureListCompleted"] = "BarcodeCountViewListener.didCompleteCaptureList";
})(BarcodeCountViewListenerEvents || (BarcodeCountViewListenerEvents = {}));
var BarcodeCountModeListenerEvents;
(function (BarcodeCountModeListenerEvents) {
    BarcodeCountModeListenerEvents["didUpdateSession"] = "BarcodeCountCaptureListListener.didUpdateSession";
    BarcodeCountModeListenerEvents["didScan"] = "BarcodeCountListener.onScan";
})(BarcodeCountModeListenerEvents || (BarcodeCountModeListenerEvents = {}));
class BarcodeCountViewController extends scanditDatacaptureFrameworksCore.BaseController {
    constructor(view, barcodeCount) {
        super('BarcodeCountViewProxy');
        this.isUiListenerRegistered = false;
        this.isViewListenerRegistered = false;
        this.isModeListenerRegistered = false;
        this.handleSingleScanButtonTappedWrapper = (ev) => {
            return this.eventHandlers.handleSingleScanButtonTapped(ev);
        };
        this.handleListButtonTappedWrapper = (ev) => {
            return this.eventHandlers.handleListButtonTapped(ev);
        };
        this.handleExitButtonTappedWrapper = (ev) => {
            return this.eventHandlers.handleExitButtonTapped(ev);
        };
        this.handleBrushForRecognizedBarcodeWrapper = (ev) => {
            return this.eventHandlers.handleBrushForRecognizedBarcode(ev);
        };
        this.handleBrushForRecognizedBarcodeNotInListWrapper = (ev) => {
            return this.eventHandlers.handleBrushForRecognizedBarcodeNotInList(ev);
        };
        this.handleBrushForAcceptedBarcodeWrapper = (ev) => {
            return this.eventHandlers.handleBrushForAcceptedBarcode(ev);
        };
        this.handleBrushForRejectedBarcodeWrapper = (ev) => {
            return this.eventHandlers.handleBrushForRejectedBarcode(ev);
        };
        this.handleFilteredBarcodeTappedWrapper = (ev) => {
            this.eventHandlers.handleFilteredBarcodeTapped(ev);
        };
        this.handleRecognizedBarcodeNotInListTappedWrapper = (ev) => {
            return this.eventHandlers.handleRecognizedBarcodeNotInListTapped(ev);
        };
        this.handleRecognizedBarcodeTappedWrapper = (ev) => {
            this.eventHandlers.handleRecognizedBarcodeTapped(ev);
        };
        this.handleAcceptedBarcodeTappedWrapper = (ev) => {
            this.eventHandlers.handleAcceptedBarcodeTapped(ev);
        };
        this.handleRejectedBarcodeTappedWrapper = (ev) => {
            return this.eventHandlers.handleRejectedBarcodeTapped(ev);
        };
        this.handleCaptureListCompletedWrapper = (ev) => {
            return this.eventHandlers.handleCaptureListCompleted(ev);
        };
        this.handleDidScanWrapper = (ev) => {
            return this.eventHandlers.handleDidScan(ev);
        };
        this.handleDidUpdateSessionWrapper = (ev) => {
            this.eventHandlers.handleDidUpdateSession(ev);
        };
        this.view = view;
        this.barcodeCount = barcodeCount;
        this.eventHandlers = new BarcodeCountViewEventHandlers(this.view, this.barcodeCount, this._proxy);
    }
    registerModeListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (this.isModeListenerRegistered) {
                return;
            }
            if (!this.isViewCreated) {
                return;
            }
            this._proxy.subscribeForEvents(Object.values(BarcodeCountModeListenerEvents));
            this._proxy.eventEmitter.on(BarcodeCountModeListenerEvents.didScan, this.handleDidScanWrapper);
            this._proxy.eventEmitter.on(BarcodeCountModeListenerEvents.didUpdateSession, this.handleDidUpdateSessionWrapper);
            yield this._proxy.$$registerBarcodeCountListener({ viewId: this.view.viewId });
            this.isModeListenerRegistered = true;
        });
    }
    registerUiListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (this.isUiListenerRegistered) {
                return;
            }
            if (!this.isViewCreated) {
                return;
            }
            this._proxy.subscribeForEvents(Object.values(BarcodeCountUiListenerEvents));
            this._proxy.eventEmitter.on(BarcodeCountUiListenerEvents.singleScanButtonTapped, this.handleSingleScanButtonTappedWrapper);
            this._proxy.eventEmitter.on(BarcodeCountUiListenerEvents.listButtonTapped, this.handleListButtonTappedWrapper);
            this._proxy.eventEmitter.on(BarcodeCountUiListenerEvents.exitButtonTapped, this.handleExitButtonTappedWrapper);
            yield this._proxy.$$registerBarcodeCountViewUiListener({ viewId: this.view.viewId });
            this.isUiListenerRegistered = true;
        });
    }
    registerViewListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (this.isViewListenerRegistered) {
                return;
            }
            if (!this.isViewCreated) {
                return;
            }
            this._proxy.subscribeForEvents(Object.values(BarcodeCountViewListenerEvents));
            this._proxy.eventEmitter.on(BarcodeCountViewListenerEvents.brushForRecognizedBarcode, this.handleBrushForRecognizedBarcodeWrapper);
            this._proxy.eventEmitter.on(BarcodeCountViewListenerEvents.brushForRecognizedBarcodeNotInList, this.handleBrushForRecognizedBarcodeNotInListWrapper);
            this._proxy.eventEmitter.on(BarcodeCountViewListenerEvents.brushForAcceptedBarcode, this.handleBrushForAcceptedBarcodeWrapper);
            this._proxy.eventEmitter.on(BarcodeCountViewListenerEvents.brushForRejectedBarcode, this.handleBrushForRejectedBarcodeWrapper);
            this._proxy.eventEmitter.on(BarcodeCountViewListenerEvents.filteredBarcodeTapped, this.handleFilteredBarcodeTappedWrapper);
            this._proxy.eventEmitter.on(BarcodeCountViewListenerEvents.recognizedBarcodeNotInListTapped, this.handleRecognizedBarcodeNotInListTappedWrapper);
            this._proxy.eventEmitter.on(BarcodeCountViewListenerEvents.recognizedBarcodeTapped, this.handleRecognizedBarcodeTappedWrapper);
            this._proxy.eventEmitter.on(BarcodeCountViewListenerEvents.acceptedBarcodeTapped, this.handleAcceptedBarcodeTappedWrapper);
            this._proxy.eventEmitter.on(BarcodeCountViewListenerEvents.rejectedBarcodeTapped, this.handleRejectedBarcodeTappedWrapper);
            this._proxy.eventEmitter.on(BarcodeCountViewListenerEvents.captureListCompleted, this.handleCaptureListCompletedWrapper);
            yield this._proxy.$$registerBarcodeCountViewListener({ viewId: this.view.viewId });
            this.isViewListenerRegistered = true;
        });
    }
    update() {
        const barcodeCountView = this.view.toJSON();
        const json = barcodeCountView.View;
        return this._proxy.$updateBarcodeCountView({ viewId: this.view.viewId, viewJson: JSON.stringify(json) });
    }
    createNativeView() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this.createView();
            return this.initialize();
        });
    }
    removeNativeView() {
        var _a;
        return (_a = this._proxy.$removeBarcodeCountView({ viewId: this.view.viewId })) !== null && _a !== void 0 ? _a : Promise.resolve();
    }
    setUiListener(listener) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (listener != null) {
                yield this.registerUiListener();
            }
            else {
                yield this.unregisterUiListener();
            }
        });
    }
    setViewListener(listener) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (listener != null) {
                yield this.registerViewListener();
            }
            else {
                yield this.unregisterViewListener();
            }
        });
    }
    unregisterModeListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isModeListenerRegistered) {
                return;
            }
            this._proxy.unsubscribeFromEvents(Object.values(BarcodeCountModeListenerEvents));
            this._proxy.eventEmitter.off(BarcodeCountModeListenerEvents.didScan, this.handleDidScanWrapper);
            this._proxy.eventEmitter.off(BarcodeCountModeListenerEvents.didUpdateSession, this.handleDidUpdateSessionWrapper);
            yield this._proxy.$unregisterBarcodeCountListener({ viewId: this.view.viewId });
            this.isModeListenerRegistered = false;
        });
    }
    clearHighlights() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this._proxy.$clearBarcodeCountHighlights({ viewId: this.view.viewId });
        });
    }
    dispose() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this.unregisterModeListener();
            yield this.unregisterUiListener();
            yield this.unregisterViewListener();
            yield this._proxy.$disposeBarcodeCountView({ viewId: this.view.viewId });
            this._proxy.dispose();
        });
    }
    setPositionAndSize(top, left, width, height, shouldBeUnderWebView) {
        return this._proxy.$setBarcodeCountViewPositionAndSize({ top, left, width, height, shouldBeUnderWebView });
    }
    show() {
        if (!this.view.context) {
            throw new Error('There should be a context attached to a view that should be shown');
        }
        return this._proxy.$showBarcodeCountView({ viewId: this.view.viewId });
    }
    hide() {
        if (!this.view.context) {
            throw new Error('There should be a context attached to a view that should be shown');
        }
        return this._proxy.$hideBarcodeCountView({ viewId: this.view.viewId });
    }
    setBrushForRecognizedBarcode(trackedBarcode, brush) {
        const payload = this.buildTrackedBarcodeBrushPayload(trackedBarcode, brush);
        return this._proxy.$finishBarcodeCountBrushForRecognizedBarcode({
            viewId: this.view.viewId,
            brushJson: payload.brush,
            trackedBarcodeId: payload.trackedBarcodeID,
        });
    }
    setBrushForRecognizedBarcodeNotInList(trackedBarcode, brush) {
        const payload = this.buildTrackedBarcodeBrushPayload(trackedBarcode, brush);
        return this._proxy.$finishBarcodeCountBrushForRecognizedBarcodeNotInList({
            viewId: this.view.viewId,
            brushJson: payload.brush,
            trackedBarcodeId: payload.trackedBarcodeID,
        });
    }
    setBrushForAcceptedBarcode(trackedBarcode, brush) {
        const payload = this.buildTrackedBarcodeBrushPayload(trackedBarcode, brush);
        return this._proxy.$finishBarcodeCountBrushForAcceptedBarcode({
            viewId: this.view.viewId,
            brushJson: payload.brush,
            trackedBarcodeId: payload.trackedBarcodeID,
        });
    }
    setBrushForRejectedBarcode(trackedBarcode, brush) {
        const payload = this.buildTrackedBarcodeBrushPayload(trackedBarcode, brush);
        return this._proxy.$finishBarcodeCountBrushForRejectedBarcode({
            viewId: this.view.viewId,
            brushJson: payload.brush,
            trackedBarcodeId: payload.trackedBarcodeID,
        });
    }
    enableHardwareTrigger(hardwareTriggerKeyCode) {
        return this._proxy.$enableBarcodeCountHardwareTrigger({ viewId: this.view.viewId, hardwareTriggerKeyCode });
    }
    // From Listener Controller
    updateMode() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return;
            }
            const barcodeCount = this.barcodeCount.toJSON();
            const json = JSON.stringify(barcodeCount);
            yield this._proxy.$updateBarcodeCountMode({ viewId: this.view.viewId, barcodeCountJson: json });
        });
    }
    reset() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return;
            }
            yield this._proxy.$resetBarcodeCount({ viewId: this.view.viewId });
        });
    }
    setModeEnabledState(enabled) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return;
            }
            yield this._proxy.$setBarcodeCountModeEnabledState({ viewId: this.view.viewId, isEnabled: enabled });
        });
    }
    startScanningPhase() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this._proxy.$startBarcodeCountScanningPhase({ viewId: this.view.viewId });
        });
    }
    endScanningPhase() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this._proxy.$endBarcodeCountScanningPhase({ viewId: this.view.viewId });
        });
    }
    updateFeedback(feedbackJson) {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this._proxy.$updateBarcodeCountFeedback({ viewId: this.view.viewId, feedbackJson });
        });
    }
    setBarcodeCountCaptureList(barcodeCountCaptureList) {
        this.eventHandlers.setBarcodeCountCaptureList(barcodeCountCaptureList);
    }
    initialize() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (this.barcodeCount._hasListeners) {
                yield this.registerModeListener();
            }
            if (this.view.uiListener) {
                yield this.registerUiListener();
            }
            if (this.view.listener) {
                yield this.registerViewListener();
            }
        });
    }
    createView() {
        return __awaiter$1(this, void 0, void 0, function* () {
            const barcodeCountViewJson = this.view.toJSON();
            return this._proxy.$createBarcodeCountView({
                viewId: this.view.viewId,
                viewJson: JSON.stringify(barcodeCountViewJson),
            });
        });
    }
    unregisterViewListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewListenerRegistered) {
                return;
            }
            this._proxy.unsubscribeFromEvents(Object.values(BarcodeCountViewListenerEvents));
            this._proxy.eventEmitter.off(BarcodeCountViewListenerEvents.brushForRecognizedBarcode, this.handleBrushForRecognizedBarcodeWrapper);
            this._proxy.eventEmitter.off(BarcodeCountViewListenerEvents.brushForRecognizedBarcodeNotInList, this.handleBrushForRecognizedBarcodeNotInListWrapper);
            this._proxy.eventEmitter.off(BarcodeCountViewListenerEvents.brushForAcceptedBarcode, this.handleBrushForAcceptedBarcodeWrapper);
            this._proxy.eventEmitter.off(BarcodeCountViewListenerEvents.brushForRejectedBarcode, this.handleBrushForRejectedBarcodeWrapper);
            this._proxy.eventEmitter.off(BarcodeCountViewListenerEvents.filteredBarcodeTapped, this.handleFilteredBarcodeTappedWrapper);
            this._proxy.eventEmitter.off(BarcodeCountViewListenerEvents.recognizedBarcodeNotInListTapped, this.handleRecognizedBarcodeNotInListTappedWrapper);
            this._proxy.eventEmitter.off(BarcodeCountViewListenerEvents.recognizedBarcodeTapped, this.handleRecognizedBarcodeTappedWrapper);
            this._proxy.eventEmitter.off(BarcodeCountViewListenerEvents.acceptedBarcodeTapped, this.handleAcceptedBarcodeTappedWrapper);
            this._proxy.eventEmitter.off(BarcodeCountViewListenerEvents.rejectedBarcodeTapped, this.handleRejectedBarcodeTappedWrapper);
            this._proxy.eventEmitter.off(BarcodeCountViewListenerEvents.captureListCompleted, this.handleCaptureListCompletedWrapper);
            yield this._proxy.$unregisterBarcodeCountViewListener({ viewId: this.view.viewId });
            this.isViewListenerRegistered = false;
        });
    }
    unregisterUiListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isUiListenerRegistered) {
                return;
            }
            this._proxy.unsubscribeFromEvents(Object.values(BarcodeCountUiListenerEvents));
            this._proxy.eventEmitter.off(BarcodeCountUiListenerEvents.singleScanButtonTapped, this.handleSingleScanButtonTappedWrapper);
            this._proxy.eventEmitter.off(BarcodeCountUiListenerEvents.listButtonTapped, this.handleListButtonTappedWrapper);
            this._proxy.eventEmitter.off(BarcodeCountUiListenerEvents.exitButtonTapped, this.handleExitButtonTappedWrapper);
            yield this._proxy.$unregisterBarcodeCountViewUiListener({ viewId: this.view.viewId });
            this.isUiListenerRegistered = false;
        });
    }
    buildTrackedBarcodeBrushPayload(trackedBarcode, brush) {
        return {
            trackedBarcodeID: trackedBarcode.identifier,
            brush: brush ? JSON.stringify(brush.toJSON()) : null,
        };
    }
    get isViewCreated() {
        return this.view.viewId !== -1;
    }
}

class BarcodeCountNotInListActionSettings extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor() {
        super(...arguments);
        this._enabled = false;
        this._acceptButtonText = "";
        this._acceptButtonAccessibilityLabel = "";
        this._acceptButtonAccessibilityHint = "";
        this._acceptButtonContentDescription = "";
        this._rejectButtonText = "";
        this._rejectButtonAccessibilityLabel = "";
        this._rejectButtonAccessibilityHint = "";
        this._rejectButtonContentDescription = "";
        this._cancelButtonText = "";
        this._cancelButtonAccessibilityLabel = "";
        this._cancelButtonAccessibilityHint = "";
        this._cancelButtonContentDescription = "";
        this._barcodeAcceptedHint = "";
        this._barcodeRejectedHint = "";
    }
    static barcodeCountDefaults() {
        return getBarcodeCountDefaults();
    }
    get enabled() {
        return this._enabled;
    }
    set enabled(newValue) {
        this._enabled = newValue;
    }
    get acceptButtonText() {
        return this._acceptButtonText;
    }
    set acceptButtonText(newValue) {
        this._acceptButtonText = newValue;
    }
    get acceptButtonAccessibilityLabel() {
        return this._acceptButtonAccessibilityLabel;
    }
    set acceptButtonAccessibilityLabel(newValue) {
        this._acceptButtonAccessibilityLabel = newValue;
    }
    get acceptButtonAccessibilityHint() {
        return this._acceptButtonAccessibilityHint;
    }
    set acceptButtonAccessibilityHint(value) {
        this._acceptButtonAccessibilityHint = value;
    }
    get acceptButtonContentDescription() {
        return this._acceptButtonContentDescription;
    }
    set acceptButtonContentDescription(value) {
        this._acceptButtonContentDescription = value;
    }
    get rejectButtonText() {
        return this._rejectButtonText;
    }
    set rejectButtonText(value) {
        this._rejectButtonText = value;
    }
    get rejectButtonAccessibilityLabel() {
        return this._rejectButtonAccessibilityLabel;
    }
    set rejectButtonAccessibilityLabel(value) {
        this._rejectButtonAccessibilityLabel = value;
    }
    get rejectButtonAccessibilityHint() {
        return this._rejectButtonAccessibilityHint;
    }
    set rejectButtonAccessibilityHint(value) {
        this._rejectButtonAccessibilityHint = value;
    }
    get rejectButtonContentDescription() {
        return this._rejectButtonContentDescription;
    }
    set rejectButtonContentDescription(value) {
        this._rejectButtonContentDescription = value;
    }
    get cancelButtonText() {
        return this._cancelButtonText;
    }
    set cancelButtonText(value) {
        this._cancelButtonText = value;
    }
    get cancelButtonAccessibilityLabel() {
        return this._cancelButtonAccessibilityLabel;
    }
    set cancelButtonAccessibilityLabel(value) {
        this._cancelButtonAccessibilityLabel = value;
    }
    get cancelButtonAccessibilityHint() {
        return this._cancelButtonAccessibilityHint;
    }
    set cancelButtonAccessibilityHint(value) {
        this._cancelButtonAccessibilityHint = value;
    }
    get cancelButtonContentDescription() {
        return this._cancelButtonContentDescription;
    }
    set cancelButtonContentDescription(value) {
        this._cancelButtonContentDescription = value;
    }
    get barcodeAcceptedHint() {
        return this._barcodeAcceptedHint;
    }
    set barcodeAcceptedHint(value) {
        this._barcodeAcceptedHint = value;
    }
    get barcodeRejectedHint() {
        return this._barcodeRejectedHint;
    }
    set barcodeRejectedHint(value) {
        this._barcodeRejectedHint = value;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('enabled')
], BarcodeCountNotInListActionSettings.prototype, "_enabled", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('acceptButtonText')
], BarcodeCountNotInListActionSettings.prototype, "_acceptButtonText", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('acceptButtonAccessibilityLabel')
], BarcodeCountNotInListActionSettings.prototype, "_acceptButtonAccessibilityLabel", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('acceptButtonAccessibilityHint')
], BarcodeCountNotInListActionSettings.prototype, "_acceptButtonAccessibilityHint", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('acceptButtonContentDescription')
], BarcodeCountNotInListActionSettings.prototype, "_acceptButtonContentDescription", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('rejectButtonText')
], BarcodeCountNotInListActionSettings.prototype, "_rejectButtonText", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('rejectButtonAccessibilityLabel')
], BarcodeCountNotInListActionSettings.prototype, "_rejectButtonAccessibilityLabel", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('rejectButtonAccessibilityHint')
], BarcodeCountNotInListActionSettings.prototype, "_rejectButtonAccessibilityHint", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('rejectButtonContentDescription')
], BarcodeCountNotInListActionSettings.prototype, "_rejectButtonContentDescription", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('cancelButtonText')
], BarcodeCountNotInListActionSettings.prototype, "_cancelButtonText", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('cancelButtonAccessibilityLabel')
], BarcodeCountNotInListActionSettings.prototype, "_cancelButtonAccessibilityLabel", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('cancelButtonAccessibilityHint')
], BarcodeCountNotInListActionSettings.prototype, "_cancelButtonAccessibilityHint", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('cancelButtonContentDescription')
], BarcodeCountNotInListActionSettings.prototype, "_cancelButtonContentDescription", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('barcodeAcceptedHint')
], BarcodeCountNotInListActionSettings.prototype, "_barcodeAcceptedHint", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('barcodeRejectedHint')
], BarcodeCountNotInListActionSettings.prototype, "_barcodeRejectedHint", void 0);

class BaseBarcodeCountView {
    static get barcodeCountDefaults() {
        return getBarcodeCountDefaults();
    }
    static get defaultRecognizedBrush() {
        return BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.defaultRecognizedBrush;
    }
    static get defaultNotInListBrush() {
        return BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.defaultNotInListBrush;
    }
    static get defaultAcceptedBrush() {
        return BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.defaultAcceptedBrush;
    }
    static get defaultRejectedBrush() {
        return BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.defaultRejectedBrush;
    }
    static get hardwareTriggerSupported() {
        return BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.hardwareTriggerSupported;
    }
    static withProps(props, platformView) {
        const view = new BaseBarcodeCountView({
            context: props.context,
            barcodeCount: props.barcodeCount,
            viewStyle: props.viewStyle,
            platformView: platformView
        });
        if (props.uiListener) {
            view.uiListener = props.uiListener;
        }
        if (props.listener) {
            view.listener = props.listener;
        }
        if (props.shouldDisableModeOnExitButtonTapped !== undefined) {
            view._shouldDisableModeOnExitButtonTapped = props.shouldDisableModeOnExitButtonTapped;
        }
        if (props.shouldShowUserGuidanceView !== undefined) {
            view._shouldShowUserGuidanceView = props.shouldShowUserGuidanceView;
        }
        if (props.shouldShowListButton !== undefined) {
            view._shouldShowListButton = props.shouldShowListButton;
        }
        if (props.shouldShowExitButton !== undefined) {
            view._shouldShowExitButton = props.shouldShowExitButton;
        }
        if (props.shouldShowShutterButton !== undefined) {
            view._shouldShowShutterButton = props.shouldShowShutterButton;
        }
        if (props.shouldShowHints !== undefined) {
            view._shouldShowHints = props.shouldShowHints;
        }
        if (props.shouldShowClearHighlightsButton !== undefined) {
            view._shouldShowClearHighlightsButton = props.shouldShowClearHighlightsButton;
        }
        if (props.shouldShowSingleScanButton !== undefined) {
            view._shouldShowSingleScanButton = props.shouldShowSingleScanButton;
        }
        if (props.shouldShowFloatingShutterButton !== undefined) {
            view._shouldShowFloatingShutterButton = props.shouldShowFloatingShutterButton;
        }
        if (props.shouldShowToolbar !== undefined) {
            view._shouldShowToolbar = props.shouldShowToolbar;
        }
        if (props.shouldShowScanAreaGuides !== undefined) {
            view._shouldShowScanAreaGuides = props.shouldShowScanAreaGuides;
        }
        if (props.recognizedBrush !== undefined) {
            view._recognizedBrush = props.recognizedBrush;
        }
        if (props.notInListBrush !== undefined) {
            view._notInListBrush = props.notInListBrush;
        }
        if (props.acceptedBrush !== undefined) {
            view._acceptedBrush = props.acceptedBrush;
        }
        if (props.rejectedBrush !== undefined) {
            view._rejectedBrush = props.rejectedBrush;
        }
        if (props.filterSettings !== undefined) {
            view._filterSettings = props.filterSettings;
        }
        if (props.listButtonAccessibilityHint !== undefined) {
            view._listButtonAccessibilityHint = props.listButtonAccessibilityHint;
        }
        if (props.listButtonAccessibilityLabel !== undefined) {
            view._listButtonAccessibilityLabel = props.listButtonAccessibilityLabel;
        }
        if (props.listButtonContentDescription !== undefined) {
            view._listButtonContentDescription = props.listButtonContentDescription;
        }
        if (props.exitButtonAccessibilityHint !== undefined) {
            view._exitButtonAccessibilityHint = props.exitButtonAccessibilityHint;
        }
        if (props.exitButtonAccessibilityLabel !== undefined) {
            view._exitButtonAccessibilityLabel = props.exitButtonAccessibilityLabel;
        }
        if (props.exitButtonContentDescription !== undefined) {
            view._exitButtonContentDescription = props.exitButtonContentDescription;
        }
        if (props.shutterButtonAccessibilityHint !== undefined) {
            view._shutterButtonAccessibilityHint = props.shutterButtonAccessibilityHint;
        }
        if (props.shutterButtonAccessibilityLabel !== undefined) {
            view._shutterButtonAccessibilityLabel = props.shutterButtonAccessibilityLabel;
        }
        if (props.shutterButtonContentDescription !== undefined) {
            view._shutterButtonContentDescription = props.shutterButtonContentDescription;
        }
        if (props.floatingShutterButtonAccessibilityHint !== undefined) {
            view._floatingShutterButtonAccessibilityHint = props.floatingShutterButtonAccessibilityHint;
        }
        if (props.floatingShutterButtonAccessibilityLabel !== undefined) {
            view._floatingShutterButtonAccessibilityLabel = props.floatingShutterButtonAccessibilityLabel;
        }
        if (props.floatingShutterButtonContentDescription !== undefined) {
            view._floatingShutterButtonContentDescription = props.floatingShutterButtonContentDescription;
        }
        if (props.clearHighlightsButtonAccessibilityHint !== undefined) {
            view._clearHighlightsButtonAccessibilityHint = props.clearHighlightsButtonAccessibilityHint;
        }
        if (props.clearHighlightsButtonAccessibilityLabel !== undefined) {
            view._clearHighlightsButtonAccessibilityLabel = props.clearHighlightsButtonAccessibilityLabel;
        }
        if (props.clearHighlightsButtonContentDescription !== undefined) {
            view._clearHighlightsButtonContentDescription = props.clearHighlightsButtonContentDescription;
        }
        if (props.singleScanButtonAccessibilityHint !== undefined) {
            view._singleScanButtonAccessibilityHint = props.singleScanButtonAccessibilityHint;
        }
        if (props.singleScanButtonAccessibilityLabel !== undefined) {
            view._singleScanButtonAccessibilityLabel = props.singleScanButtonAccessibilityLabel;
        }
        if (props.singleScanButtonContentDescription !== undefined) {
            view._singleScanButtonContentDescription = props.singleScanButtonContentDescription;
        }
        if (props.clearHighlightsButtonText !== undefined) {
            view._clearHighlightsButtonText = props.clearHighlightsButtonText;
        }
        if (props.exitButtonText !== undefined) {
            view._exitButtonText = props.exitButtonText;
        }
        if (props.textForTapShutterToScanHint !== undefined) {
            view._textForTapShutterToScanHint = props.textForTapShutterToScanHint;
        }
        if (props.textForScanningHint !== undefined) {
            view._textForScanningHint = props.textForScanningHint;
        }
        if (props.textForMoveCloserAndRescanHint !== undefined) {
            view._textForMoveCloserAndRescanHint = props.textForMoveCloserAndRescanHint;
        }
        if (props.textForMoveFurtherAndRescanHint !== undefined) {
            view._textForMoveFurtherAndRescanHint = props.textForMoveFurtherAndRescanHint;
        }
        if (props.shouldShowListProgressBar !== undefined) {
            view._shouldShowListProgressBar = props.shouldShowListProgressBar;
        }
        if (props.shouldShowTorchControl !== undefined) {
            view._shouldShowTorchControl = props.shouldShowTorchControl;
        }
        if (props.torchControlPosition !== undefined) {
            view._torchControlPosition = props.torchControlPosition;
        }
        if (props.tapToUncountEnabled !== undefined) {
            view._tapToUncountEnabled = props.tapToUncountEnabled;
        }
        if (props.textForTapToUncountHint !== undefined) {
            view._textForTapToUncountHint = props.textForTapToUncountHint;
        }
        if (props.barcodeNotInListActionSettings !== undefined) {
            view._barcodeNotInListActionSettings = props.barcodeNotInListActionSettings;
        }
        if (props.hardwareTriggerEnabled !== undefined) {
            view._hardwareTriggerEnabled = props.hardwareTriggerEnabled;
        }
        return view;
    }
    constructor({ context, barcodeCount, viewStyle, platformView }) {
        this._viewId = -1;
        this._uiListener = null;
        this._listener = null;
        this._shouldDisableModeOnExitButtonTapped = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.shouldDisableModeOnExitButtonTapped;
        this._shouldShowUserGuidanceView = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.shouldShowUserGuidanceView;
        this._shouldShowListButton = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.shouldShowListButton;
        this._shouldShowExitButton = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.shouldShowExitButton;
        this._shouldShowShutterButton = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.shouldShowShutterButton;
        this._shouldShowHints = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.shouldShowHints;
        this._shouldShowClearHighlightsButton = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.shouldShowClearHighlightsButton;
        this._shouldShowSingleScanButton = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.shouldShowSingleScanButton;
        this._shouldShowFloatingShutterButton = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.shouldShowFloatingShutterButton;
        this._shouldShowToolbar = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.shouldShowToolbar;
        this._shouldShowScanAreaGuides = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.shouldShowScanAreaGuides;
        this._shouldShowListProgressBar = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.shouldShowListProgressBar;
        this._shouldShowTorchControl = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.shouldShowTorchControl;
        this._tapToUncountEnabled = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.tapToUncountEnabled;
        this._hardwareTriggerEnabled = false;
        this._recognizedBrush = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.defaultRecognizedBrush;
        this._notInListBrush = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.defaultNotInListBrush;
        this._acceptedBrush = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.defaultAcceptedBrush;
        this._rejectedBrush = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.defaultRejectedBrush;
        this._filterSettings = null;
        this._listButtonAccessibilityHint = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.listButtonAccessibilityHint;
        this._listButtonAccessibilityLabel = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.listButtonAccessibilityLabel;
        this._listButtonContentDescription = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.listButtonContentDescription;
        this._exitButtonAccessibilityHint = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.exitButtonAccessibilityHint;
        this._exitButtonAccessibilityLabel = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.exitButtonAccessibilityLabel;
        this._exitButtonContentDescription = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.exitButtonContentDescription;
        this._shutterButtonAccessibilityHint = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.shutterButtonAccessibilityHint;
        this._shutterButtonAccessibilityLabel = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.shutterButtonAccessibilityLabel;
        this._shutterButtonContentDescription = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.shutterButtonContentDescription;
        this._floatingShutterButtonAccessibilityHint = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.floatingShutterButtonAccessibilityHint;
        this._floatingShutterButtonAccessibilityLabel = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.floatingShutterButtonAccessibilityLabel;
        this._floatingShutterButtonContentDescription = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.floatingShutterButtonContentDescription;
        this._clearHighlightsButtonAccessibilityHint = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.clearHighlightsButtonAccessibilityHint;
        this._clearHighlightsButtonAccessibilityLabel = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.clearHighlightsButtonAccessibilityLabel;
        this._clearHighlightsButtonContentDescription = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.clearHighlightsButtonContentDescription;
        this._singleScanButtonAccessibilityHint = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.singleScanButtonAccessibilityHint;
        this._singleScanButtonAccessibilityLabel = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.singleScanButtonAccessibilityLabel;
        this._singleScanButtonContentDescription = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.singleScanButtonContentDescription;
        this._clearHighlightsButtonText = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.clearHighlightsButtonText;
        this._exitButtonText = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.exitButtonText;
        this._textForTapShutterToScanHint = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.textForTapShutterToScanHint;
        this._textForScanningHint = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.textForScanningHint;
        this._textForMoveCloserAndRescanHint = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.textForMoveCloserAndRescanHint;
        this._textForMoveFurtherAndRescanHint = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.textForMoveFurtherAndRescanHint;
        this._textForTapToUncountHint = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.textForTapToUncountHint;
        this._toolbarSettings = null;
        this._torchControlPosition = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.torchControlPosition;
        this._viewStyle = BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.style;
        this._barcodeNotInListActionSettings = new BarcodeCountNotInListActionSettings();
        this.isViewCreated = false;
        this._viewStyle = viewStyle;
        this._context = context;
        this._barcodeCount = barcodeCount;
        this.platformView = platformView;
        const privateBarcodeCount = barcodeCount;
        privateBarcodeCount._context = context;
        this._controller = new BarcodeCountViewController(this, barcodeCount);
        privateBarcodeCount.controller = this._controller;
    }
    get viewId() {
        return this._viewId;
    }
    get context() {
        return this._context;
    }
    get uiListener() {
        return this._uiListener;
    }
    set uiListener(listener) {
        this._uiListener = listener;
        void this._controller.setUiListener(listener);
    }
    get listener() {
        return this._listener;
    }
    set listener(listener) {
        this._listener = listener;
        void this._controller.setViewListener(listener);
    }
    get shouldDisableModeOnExitButtonTapped() {
        return this._shouldDisableModeOnExitButtonTapped;
    }
    set shouldDisableModeOnExitButtonTapped(newValue) {
        this._shouldDisableModeOnExitButtonTapped = newValue;
        void this.updateNative();
    }
    get shouldShowUserGuidanceView() {
        return this._shouldShowUserGuidanceView;
    }
    set shouldShowUserGuidanceView(newValue) {
        this._shouldShowUserGuidanceView = newValue;
        void this.updateNative();
    }
    get shouldShowListButton() {
        return this._shouldShowListButton;
    }
    set shouldShowListButton(newValue) {
        this._shouldShowListButton = newValue;
        void this.updateNative();
    }
    get shouldShowExitButton() {
        return this._shouldShowExitButton;
    }
    set shouldShowExitButton(newValue) {
        this._shouldShowExitButton = newValue;
        void this.updateNative();
    }
    get shouldShowShutterButton() {
        return this._shouldShowShutterButton;
    }
    set shouldShowShutterButton(newValue) {
        this._shouldShowShutterButton = newValue;
        void this.updateNative();
    }
    get shouldShowHints() {
        return this._shouldShowHints;
    }
    set shouldShowHints(newValue) {
        this._shouldShowHints = newValue;
        void this.updateNative();
    }
    get shouldShowClearHighlightsButton() {
        return this._shouldShowClearHighlightsButton;
    }
    set shouldShowClearHighlightsButton(newValue) {
        this._shouldShowClearHighlightsButton = newValue;
        void this.updateNative();
    }
    get shouldShowSingleScanButton() {
        return this._shouldShowSingleScanButton;
    }
    set shouldShowSingleScanButton(newValue) {
        this._shouldShowSingleScanButton = newValue;
        void this.updateNative();
    }
    get shouldShowFloatingShutterButton() {
        return this._shouldShowFloatingShutterButton;
    }
    set shouldShowFloatingShutterButton(newValue) {
        this._shouldShowFloatingShutterButton = newValue;
        void this.updateNative();
    }
    get shouldShowToolbar() {
        return this._shouldShowToolbar;
    }
    set shouldShowToolbar(newValue) {
        this._shouldShowToolbar = newValue;
        void this.updateNative();
    }
    get shouldShowScanAreaGuides() {
        return this._shouldShowScanAreaGuides;
    }
    set shouldShowScanAreaGuides(newValue) {
        this._shouldShowScanAreaGuides = newValue;
        void this.updateNative();
    }
    get recognizedBrush() {
        return this._recognizedBrush;
    }
    set recognizedBrush(newValue) {
        this._recognizedBrush = newValue;
        void this.updateNative();
    }
    get notInListBrush() {
        return this._notInListBrush;
    }
    set notInListBrush(newValue) {
        this._notInListBrush = newValue;
        void this.updateNative();
    }
    get acceptedBrush() {
        return this._acceptedBrush;
    }
    set acceptedBrush(value) {
        this._acceptedBrush = value;
        void this.updateNative();
    }
    get rejectedBrush() {
        return this._rejectedBrush;
    }
    set rejectedBrush(value) {
        this._rejectedBrush = value;
        void this.updateNative();
    }
    get filterSettings() {
        return this._filterSettings;
    }
    set filterSettings(newValue) {
        this._filterSettings = newValue;
        void this.updateNative();
    }
    get style() {
        return this._viewStyle;
    }
    get listButtonAccessibilityHint() {
        return this._listButtonAccessibilityHint;
    }
    set listButtonAccessibilityHint(newValue) {
        this._listButtonAccessibilityHint = newValue;
        void this.updateNative();
    }
    get listButtonAccessibilityLabel() {
        return this._listButtonAccessibilityLabel;
    }
    set listButtonAccessibilityLabel(newValue) {
        this._listButtonAccessibilityLabel = newValue;
        void this.updateNative();
    }
    get listButtonContentDescription() {
        return this._listButtonContentDescription;
    }
    set listButtonContentDescription(newValue) {
        this._listButtonContentDescription = newValue;
        void this.updateNative();
    }
    get exitButtonAccessibilityHint() {
        return this._exitButtonAccessibilityHint;
    }
    set exitButtonAccessibilityHint(newValue) {
        this._exitButtonAccessibilityHint = newValue;
        void this.updateNative();
    }
    get exitButtonAccessibilityLabel() {
        return this._exitButtonAccessibilityLabel;
    }
    set exitButtonAccessibilityLabel(newValue) {
        this._exitButtonAccessibilityLabel = newValue;
        void this.updateNative();
    }
    get exitButtonContentDescription() {
        return this._exitButtonContentDescription;
    }
    set exitButtonContentDescription(newValue) {
        this._exitButtonContentDescription = newValue;
        void this.updateNative();
    }
    get shutterButtonAccessibilityHint() {
        return this._shutterButtonAccessibilityHint;
    }
    set shutterButtonAccessibilityHint(newValue) {
        this._shutterButtonAccessibilityHint = newValue;
        void this.updateNative();
    }
    get shutterButtonAccessibilityLabel() {
        return this._shutterButtonAccessibilityLabel;
    }
    set shutterButtonAccessibilityLabel(newValue) {
        this._shutterButtonAccessibilityLabel = newValue;
        void this.updateNative();
    }
    get shutterButtonContentDescription() {
        return this._shutterButtonContentDescription;
    }
    set shutterButtonContentDescription(newValue) {
        this._shutterButtonContentDescription = newValue;
        void this.updateNative();
    }
    get floatingShutterButtonAccessibilityHint() {
        return this._floatingShutterButtonAccessibilityHint;
    }
    set floatingShutterButtonAccessibilityHint(newValue) {
        this._floatingShutterButtonAccessibilityHint = newValue;
        void this.updateNative();
    }
    get floatingShutterButtonAccessibilityLabel() {
        return this._floatingShutterButtonAccessibilityLabel;
    }
    set floatingShutterButtonAccessibilityLabel(newValue) {
        this._floatingShutterButtonAccessibilityLabel = newValue;
        void this.updateNative();
    }
    get floatingShutterButtonContentDescription() {
        return this._floatingShutterButtonContentDescription;
    }
    set floatingShutterButtonContentDescription(newValue) {
        this._floatingShutterButtonContentDescription = newValue;
        void this.updateNative();
    }
    get clearHighlightsButtonAccessibilityHint() {
        return this._clearHighlightsButtonAccessibilityHint;
    }
    set clearHighlightsButtonAccessibilityHint(newValue) {
        this._clearHighlightsButtonAccessibilityHint = newValue;
        void this.updateNative();
    }
    get clearHighlightsButtonAccessibilityLabel() {
        return this._clearHighlightsButtonAccessibilityLabel;
    }
    set clearHighlightsButtonAccessibilityLabel(newValue) {
        this._clearHighlightsButtonAccessibilityLabel = newValue;
        void this.updateNative();
    }
    get clearHighlightsButtonContentDescription() {
        return this._clearHighlightsButtonContentDescription;
    }
    set clearHighlightsButtonContentDescription(newValue) {
        this._clearHighlightsButtonContentDescription = newValue;
        void this.updateNative();
    }
    get singleScanButtonAccessibilityHint() {
        return this._singleScanButtonAccessibilityHint;
    }
    set singleScanButtonAccessibilityHint(newValue) {
        this._singleScanButtonAccessibilityHint = newValue;
        void this.updateNative();
    }
    get singleScanButtonAccessibilityLabel() {
        return this._singleScanButtonAccessibilityLabel;
    }
    set singleScanButtonAccessibilityLabel(newValue) {
        this._singleScanButtonAccessibilityLabel = newValue;
        void this.updateNative();
    }
    get singleScanButtonContentDescription() {
        return this._singleScanButtonContentDescription;
    }
    set singleScanButtonContentDescription(newValue) {
        this._singleScanButtonContentDescription = newValue;
        void this.updateNative();
    }
    get clearHighlightsButtonText() {
        return this._clearHighlightsButtonText;
    }
    set clearHighlightsButtonText(newValue) {
        this._clearHighlightsButtonText = newValue;
        void this.updateNative();
    }
    get exitButtonText() {
        return this._exitButtonText;
    }
    set exitButtonText(newValue) {
        this._exitButtonText = newValue;
        void this.updateNative();
    }
    get textForTapShutterToScanHint() {
        return this._textForTapShutterToScanHint;
    }
    set textForTapShutterToScanHint(newValue) {
        this._textForTapShutterToScanHint = newValue;
        void this.updateNative();
    }
    get textForScanningHint() {
        return this._textForScanningHint;
    }
    set textForScanningHint(newValue) {
        this._textForScanningHint = newValue;
        void this.updateNative();
    }
    get textForMoveCloserAndRescanHint() {
        return this._textForMoveCloserAndRescanHint;
    }
    set textForMoveCloserAndRescanHint(newValue) {
        this._textForMoveCloserAndRescanHint = newValue;
        void this.updateNative();
    }
    get textForMoveFurtherAndRescanHint() {
        return this._textForMoveFurtherAndRescanHint;
    }
    set textForMoveFurtherAndRescanHint(newValue) {
        this._textForMoveFurtherAndRescanHint = newValue;
        void this.updateNative();
    }
    get shouldShowListProgressBar() {
        return this._shouldShowListProgressBar;
    }
    set shouldShowListProgressBar(newValue) {
        this._shouldShowListProgressBar = newValue;
        void this.updateNative();
    }
    get shouldShowTorchControl() {
        return this._shouldShowTorchControl;
    }
    set shouldShowTorchControl(newValue) {
        this._shouldShowTorchControl = newValue;
        void this.updateNative();
    }
    get torchControlPosition() {
        return this._torchControlPosition;
    }
    set torchControlPosition(newValue) {
        this._torchControlPosition = newValue;
        void this.updateNative();
    }
    get tapToUncountEnabled() {
        return this._tapToUncountEnabled;
    }
    set tapToUncountEnabled(newValue) {
        this._tapToUncountEnabled = newValue;
        void this.updateNative();
    }
    get textForTapToUncountHint() {
        return this._textForTapToUncountHint;
    }
    set textForTapToUncountHint(newValue) {
        this._textForTapToUncountHint = newValue;
        void this.updateNative();
    }
    get barcodeNotInListActionSettings() {
        return this._barcodeNotInListActionSettings;
    }
    set barcodeNotInListActionSettings(value) {
        this._barcodeNotInListActionSettings = value;
        void this.updateNative();
    }
    get hardwareTriggerEnabled() {
        return this._hardwareTriggerEnabled;
    }
    set hardwareTriggerEnabled(newValue) {
        this._hardwareTriggerEnabled = newValue;
        void this.updateNative();
    }
    dispose() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this._controller.dispose();
            this.isViewCreated = false;
        });
    }
    clearHighlights() {
        return this._controller.clearHighlights();
    }
    setToolbarSettings(settings) {
        this._toolbarSettings = settings;
        void this.updateNative();
    }
    setPositionAndSize(top, left, width, height, shouldBeUnderWebView) {
        return this._controller.setPositionAndSize(top, left, width, height, shouldBeUnderWebView);
    }
    show() {
        return this._controller.show();
    }
    hide() {
        return this._controller.hide();
    }
    setBrushForRecognizedBarcode(trackedBarcode, brush) {
        return this._controller.setBrushForRecognizedBarcode(trackedBarcode, brush);
    }
    setBrushForRecognizedBarcodeNotInList(trackedBarcode, brush) {
        return this._controller.setBrushForRecognizedBarcodeNotInList(trackedBarcode, brush);
    }
    setBrushForAcceptedBarcode(trackedBarcode, brush) {
        return this._controller.setBrushForAcceptedBarcode(trackedBarcode, brush);
    }
    setBrushForRejectedBarcode(trackedBarcode, brush) {
        return this._controller.setBrushForRejectedBarcode(trackedBarcode, brush);
    }
    enableHardwareTrigger(hardwareTriggerKeyCode) {
        return this._controller.enableHardwareTrigger(hardwareTriggerKeyCode);
    }
    createNativeView(viewId) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (this.isViewCreated) {
                return Promise.resolve();
            }
            this._viewId = viewId;
            yield this._controller.createNativeView();
            this.isViewCreated = true;
        });
    }
    removeNativeView() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this._controller.removeNativeView();
            this.isViewCreated = false;
        });
    }
    toJSON() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const json = {
            View: {
                viewId: this._viewId,
                style: this.style,
                shouldDisableModeOnExitButtonTapped: this.shouldDisableModeOnExitButtonTapped,
                shouldShowUserGuidanceView: this.shouldShowUserGuidanceView,
                shouldShowListButton: this.shouldShowListButton,
                shouldShowExitButton: this.shouldShowExitButton,
                shouldShowShutterButton: this.shouldShowShutterButton,
                shouldShowHints: this.shouldShowHints,
                shouldShowClearHighlightsButton: this.shouldShowClearHighlightsButton,
                shouldShowSingleScanButton: this.shouldShowSingleScanButton,
                shouldShowFloatingShutterButton: this.shouldShowFloatingShutterButton,
                shouldShowToolbar: this.shouldShowToolbar,
                shouldShowScanAreaGuides: this.shouldShowScanAreaGuides,
                toolbarSettings: (_a = this._toolbarSettings) === null || _a === void 0 ? void 0 : _a.toJSON(),
                shouldShowTorchControl: this.shouldShowTorchControl,
                torchControlPosition: this.torchControlPosition,
                tapToUncountEnabled: this.tapToUncountEnabled,
                textForTapToUncountHint: this.textForTapToUncountHint,
                barcodeNotInListActionSettings: this.barcodeNotInListActionSettings.toJSON(),
                recognizedBrush: (_b = this.recognizedBrush) === null || _b === void 0 ? void 0 : _b.toJSON(),
                notInListBrush: (_c = this.notInListBrush) === null || _c === void 0 ? void 0 : _c.toJSON(),
                acceptedBrush: (_d = this.acceptedBrush) === null || _d === void 0 ? void 0 : _d.toJSON(),
                rejectedBrush: (_e = this.rejectedBrush) === null || _e === void 0 ? void 0 : _e.toJSON(),
                hardwareTriggerEnabled: this._hardwareTriggerEnabled,
                hasUiListener: this.uiListener !== null,
                hasListener: this.listener !== null,
            },
            BarcodeCount: this._barcodeCount.toJSON()
        };
        if (this.listButtonAccessibilityHint !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.listButtonAccessibilityHint) {
            json.View.listButtonAccessibilityHint = this.listButtonAccessibilityHint; // iOS Only
        }
        if (this.listButtonAccessibilityLabel !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.listButtonAccessibilityLabel) {
            json.View.listButtonAccessibilityHint = this.listButtonAccessibilityLabel; // iOS Only
        }
        if (this.listButtonContentDescription !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.listButtonContentDescription) {
            json.View.listButtonContentDescription = this.listButtonContentDescription; // Android Only
        }
        if (this.exitButtonAccessibilityHint !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.exitButtonAccessibilityHint) {
            json.View.exitButtonAccessibilityHint = this.exitButtonAccessibilityHint; // iOS Only
        }
        if (this.exitButtonAccessibilityLabel !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.exitButtonAccessibilityLabel) {
            json.View.exitButtonAccessibilityLabel = this.exitButtonAccessibilityLabel; // iOS Only
        }
        if (this.exitButtonContentDescription !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.exitButtonContentDescription) {
            json.View.exitButtonContentDescription = this.exitButtonContentDescription; // Android Only
        }
        if (this.shutterButtonAccessibilityHint !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.shutterButtonAccessibilityHint) {
            json.View.shutterButtonAccessibilityHint = this.shutterButtonAccessibilityHint; // iOS Only
        }
        if (this.shutterButtonAccessibilityLabel !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.shutterButtonAccessibilityLabel) {
            json.View.shutterButtonAccessibilityLabel = this.shutterButtonAccessibilityLabel; // iOS Only
        }
        if (this.shutterButtonContentDescription !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.shutterButtonContentDescription) {
            json.View.shutterButtonContentDescription = this.shutterButtonContentDescription; // Android Only
        }
        if (this.floatingShutterButtonAccessibilityHint !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.floatingShutterButtonAccessibilityHint) {
            json.View.floatingShutterButtonAccessibilityHint = this.floatingShutterButtonAccessibilityHint; // iOS Only
        }
        if (this.floatingShutterButtonAccessibilityLabel !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.floatingShutterButtonAccessibilityLabel) {
            json.View.floatingShutterButtonAccessibilityLabel = this.floatingShutterButtonAccessibilityLabel; // iOS Only
        }
        if (this.floatingShutterButtonContentDescription !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.floatingShutterButtonContentDescription) {
            json.View.floatingShutterButtonContentDescription = this.floatingShutterButtonContentDescription; // Android Only
        }
        if (this.clearHighlightsButtonAccessibilityHint !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.clearHighlightsButtonAccessibilityHint) {
            json.View.clearHighlightsButtonAccessibilityHint = this.clearHighlightsButtonAccessibilityHint; // iOS Only
        }
        if (this.clearHighlightsButtonAccessibilityLabel !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.clearHighlightsButtonAccessibilityLabel) {
            json.View.clearHighlightsButtonAccessibilityLabel = this.clearHighlightsButtonAccessibilityLabel; // iOS Only
        }
        if (this.clearHighlightsButtonContentDescription !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.clearHighlightsButtonContentDescription) {
            json.View.clearHighlightsButtonContentDescription = this.clearHighlightsButtonContentDescription; // Android Only
        }
        if (this.singleScanButtonAccessibilityHint !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.singleScanButtonAccessibilityHint) {
            json.View.singleScanButtonAccessibilityHint = this.singleScanButtonAccessibilityHint; // iOS Only
        }
        if (this.singleScanButtonAccessibilityLabel !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.singleScanButtonAccessibilityLabel) {
            json.View.singleScanButtonAccessibilityLabel = this.singleScanButtonAccessibilityLabel; // iOS Only
        }
        if (this.singleScanButtonContentDescription !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.singleScanButtonContentDescription) {
            json.View.singleScanButtonContentDescription = this.singleScanButtonContentDescription; // Android Only
        }
        if (this.clearHighlightsButtonText !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.clearHighlightsButtonText) {
            json.View.clearHighlightsButtonText = this.clearHighlightsButtonText;
        }
        if (this.exitButtonText !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.exitButtonText) {
            json.View.exitButtonText = this.exitButtonText;
        }
        if (this.textForTapShutterToScanHint !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.textForTapShutterToScanHint) {
            json.View.textForTapShutterToScanHint = this.textForTapShutterToScanHint;
        }
        if (this.textForScanningHint !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.textForScanningHint) {
            json.View.textForScanningHint = this.textForScanningHint;
        }
        if (this.textForMoveCloserAndRescanHint !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.textForMoveCloserAndRescanHint) {
            json.View.textForMoveCloserAndRescanHint = this.textForMoveCloserAndRescanHint;
        }
        if (this.textForMoveFurtherAndRescanHint !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.textForMoveFurtherAndRescanHint) {
            json.View.textForMoveFurtherAndRescanHint = this.textForMoveFurtherAndRescanHint;
        }
        if (this.shouldShowListProgressBar !== BaseBarcodeCountView.barcodeCountDefaults.BarcodeCountView.shouldShowListProgressBar) {
            json.View.shouldShowListProgressBar = this.shouldShowListProgressBar;
        }
        if (this.recognizedBrush) {
            json.View.recognizedBrush = (_f = this.recognizedBrush) === null || _f === void 0 ? void 0 : _f.toJSON();
        }
        if (this.notInListBrush) {
            json.View.notInListBrush = (_g = this.notInListBrush) === null || _g === void 0 ? void 0 : _g.toJSON();
        }
        if (this.filterSettings) {
            json.View.filterSettings = (_h = this.filterSettings) === null || _h === void 0 ? void 0 : _h.toJSON();
        }
        return json;
    }
    updateWithProps(prevProps, props) {
        // Update listeners
        if (props.uiListener !== prevProps.uiListener) {
            this.uiListener = props.uiListener || null;
        }
        if (props.listener !== prevProps.listener) {
            this.listener = props.listener || null;
        }
        // Update boolean flags
        if (props.shouldDisableModeOnExitButtonTapped !== prevProps.shouldDisableModeOnExitButtonTapped &&
            props.shouldDisableModeOnExitButtonTapped !== undefined) {
            this.shouldDisableModeOnExitButtonTapped = props.shouldDisableModeOnExitButtonTapped;
        }
        if (props.shouldShowUserGuidanceView !== prevProps.shouldShowUserGuidanceView &&
            props.shouldShowUserGuidanceView !== undefined) {
            this.shouldShowUserGuidanceView = props.shouldShowUserGuidanceView;
        }
        if (props.shouldShowListButton !== prevProps.shouldShowListButton &&
            props.shouldShowListButton !== undefined) {
            this.shouldShowListButton = props.shouldShowListButton;
        }
        if (props.shouldShowExitButton !== prevProps.shouldShowExitButton &&
            props.shouldShowExitButton !== undefined) {
            this.shouldShowExitButton = props.shouldShowExitButton;
        }
        if (props.shouldShowShutterButton !== prevProps.shouldShowShutterButton &&
            props.shouldShowShutterButton !== undefined) {
            this.shouldShowShutterButton = props.shouldShowShutterButton;
        }
        if (props.shouldShowHints !== prevProps.shouldShowHints &&
            props.shouldShowHints !== undefined) {
            this.shouldShowHints = props.shouldShowHints;
        }
        if (props.shouldShowClearHighlightsButton !== prevProps.shouldShowClearHighlightsButton &&
            props.shouldShowClearHighlightsButton !== undefined) {
            this.shouldShowClearHighlightsButton = props.shouldShowClearHighlightsButton;
        }
        if (props.shouldShowSingleScanButton !== prevProps.shouldShowSingleScanButton &&
            props.shouldShowSingleScanButton !== undefined) {
            this.shouldShowSingleScanButton = props.shouldShowSingleScanButton;
        }
        if (props.shouldShowFloatingShutterButton !== prevProps.shouldShowFloatingShutterButton &&
            props.shouldShowFloatingShutterButton !== undefined) {
            this.shouldShowFloatingShutterButton = props.shouldShowFloatingShutterButton;
        }
        if (props.shouldShowToolbar !== prevProps.shouldShowToolbar &&
            props.shouldShowToolbar !== undefined) {
            this.shouldShowToolbar = props.shouldShowToolbar;
        }
        if (props.shouldShowScanAreaGuides !== prevProps.shouldShowScanAreaGuides &&
            props.shouldShowScanAreaGuides !== undefined) {
            this.shouldShowScanAreaGuides = props.shouldShowScanAreaGuides;
        }
        if (props.shouldShowListProgressBar !== prevProps.shouldShowListProgressBar &&
            props.shouldShowListProgressBar !== undefined) {
            this.shouldShowListProgressBar = props.shouldShowListProgressBar;
        }
        if (props.shouldShowTorchControl !== prevProps.shouldShowTorchControl &&
            props.shouldShowTorchControl !== undefined) {
            this.shouldShowTorchControl = props.shouldShowTorchControl;
        }
        if (props.tapToUncountEnabled !== prevProps.tapToUncountEnabled &&
            props.tapToUncountEnabled !== undefined) {
            this.tapToUncountEnabled = props.tapToUncountEnabled;
        }
        if (props.hardwareTriggerEnabled !== prevProps.hardwareTriggerEnabled &&
            props.hardwareTriggerEnabled !== undefined) {
            this.hardwareTriggerEnabled = props.hardwareTriggerEnabled;
        }
        // Update brushes
        if (props.recognizedBrush !== prevProps.recognizedBrush &&
            props.recognizedBrush !== undefined) {
            this.recognizedBrush = props.recognizedBrush;
        }
        if (props.notInListBrush !== prevProps.notInListBrush &&
            props.notInListBrush !== undefined) {
            this.notInListBrush = props.notInListBrush;
        }
        if (props.acceptedBrush !== prevProps.acceptedBrush &&
            props.acceptedBrush !== undefined) {
            this.acceptedBrush = props.acceptedBrush;
        }
        if (props.rejectedBrush !== prevProps.rejectedBrush &&
            props.rejectedBrush !== undefined) {
            this.rejectedBrush = props.rejectedBrush;
        }
        // Update filter settings
        if (props.filterSettings !== prevProps.filterSettings &&
            props.filterSettings !== undefined) {
            this.filterSettings = props.filterSettings;
        }
        // Update accessibility hints, labels and descriptions
        if (props.listButtonAccessibilityHint !== prevProps.listButtonAccessibilityHint &&
            props.listButtonAccessibilityHint !== undefined) {
            this.listButtonAccessibilityHint = props.listButtonAccessibilityHint;
        }
        if (props.listButtonAccessibilityLabel !== prevProps.listButtonAccessibilityLabel &&
            props.listButtonAccessibilityLabel !== undefined) {
            this.listButtonAccessibilityLabel = props.listButtonAccessibilityLabel;
        }
        if (props.listButtonContentDescription !== prevProps.listButtonContentDescription &&
            props.listButtonContentDescription !== undefined) {
            this.listButtonContentDescription = props.listButtonContentDescription;
        }
        if (props.exitButtonAccessibilityHint !== prevProps.exitButtonAccessibilityHint &&
            props.exitButtonAccessibilityHint !== undefined) {
            this.exitButtonAccessibilityHint = props.exitButtonAccessibilityHint;
        }
        if (props.exitButtonAccessibilityLabel !== prevProps.exitButtonAccessibilityLabel &&
            props.exitButtonAccessibilityLabel !== undefined) {
            this.exitButtonAccessibilityLabel = props.exitButtonAccessibilityLabel;
        }
        if (props.exitButtonContentDescription !== prevProps.exitButtonContentDescription &&
            props.exitButtonContentDescription !== undefined) {
            this.exitButtonContentDescription = props.exitButtonContentDescription;
        }
        if (props.shutterButtonAccessibilityHint !== prevProps.shutterButtonAccessibilityHint &&
            props.shutterButtonAccessibilityHint !== undefined) {
            this.shutterButtonAccessibilityHint = props.shutterButtonAccessibilityHint;
        }
        if (props.shutterButtonAccessibilityLabel !== prevProps.shutterButtonAccessibilityLabel &&
            props.shutterButtonAccessibilityLabel !== undefined) {
            this.shutterButtonAccessibilityLabel = props.shutterButtonAccessibilityLabel;
        }
        if (props.shutterButtonContentDescription !== prevProps.shutterButtonContentDescription &&
            props.shutterButtonContentDescription !== undefined) {
            this.shutterButtonContentDescription = props.shutterButtonContentDescription;
        }
        if (props.floatingShutterButtonAccessibilityHint !== prevProps.floatingShutterButtonAccessibilityHint &&
            props.floatingShutterButtonAccessibilityHint !== undefined) {
            this.floatingShutterButtonAccessibilityHint = props.floatingShutterButtonAccessibilityHint;
        }
        if (props.floatingShutterButtonAccessibilityLabel !== prevProps.floatingShutterButtonAccessibilityLabel &&
            props.floatingShutterButtonAccessibilityLabel !== undefined) {
            this.floatingShutterButtonAccessibilityLabel = props.floatingShutterButtonAccessibilityLabel;
        }
        if (props.floatingShutterButtonContentDescription !== prevProps.floatingShutterButtonContentDescription &&
            props.floatingShutterButtonContentDescription !== undefined) {
            this.floatingShutterButtonContentDescription = props.floatingShutterButtonContentDescription;
        }
        if (props.clearHighlightsButtonAccessibilityHint !== prevProps.clearHighlightsButtonAccessibilityHint &&
            props.clearHighlightsButtonAccessibilityHint !== undefined) {
            this.clearHighlightsButtonAccessibilityHint = props.clearHighlightsButtonAccessibilityHint;
        }
        if (props.clearHighlightsButtonAccessibilityLabel !== prevProps.clearHighlightsButtonAccessibilityLabel &&
            props.clearHighlightsButtonAccessibilityLabel !== undefined) {
            this.clearHighlightsButtonAccessibilityLabel = props.clearHighlightsButtonAccessibilityLabel;
        }
        if (props.clearHighlightsButtonContentDescription !== prevProps.clearHighlightsButtonContentDescription &&
            props.clearHighlightsButtonContentDescription !== undefined) {
            this.clearHighlightsButtonContentDescription = props.clearHighlightsButtonContentDescription;
        }
        if (props.singleScanButtonAccessibilityHint !== prevProps.singleScanButtonAccessibilityHint &&
            props.singleScanButtonAccessibilityHint !== undefined) {
            this.singleScanButtonAccessibilityHint = props.singleScanButtonAccessibilityHint;
        }
        if (props.singleScanButtonAccessibilityLabel !== prevProps.singleScanButtonAccessibilityLabel &&
            props.singleScanButtonAccessibilityLabel !== undefined) {
            this.singleScanButtonAccessibilityLabel = props.singleScanButtonAccessibilityLabel;
        }
        if (props.singleScanButtonContentDescription !== prevProps.singleScanButtonContentDescription &&
            props.singleScanButtonContentDescription !== undefined) {
            this.singleScanButtonContentDescription = props.singleScanButtonContentDescription;
        }
        // Update text labels
        if (props.clearHighlightsButtonText !== prevProps.clearHighlightsButtonText &&
            props.clearHighlightsButtonText !== undefined) {
            this.clearHighlightsButtonText = props.clearHighlightsButtonText;
        }
        if (props.exitButtonText !== prevProps.exitButtonText &&
            props.exitButtonText !== undefined) {
            this.exitButtonText = props.exitButtonText;
        }
        if (props.textForTapShutterToScanHint !== prevProps.textForTapShutterToScanHint &&
            props.textForTapShutterToScanHint !== undefined) {
            this.textForTapShutterToScanHint = props.textForTapShutterToScanHint;
        }
        if (props.textForScanningHint !== prevProps.textForScanningHint &&
            props.textForScanningHint !== undefined) {
            this.textForScanningHint = props.textForScanningHint;
        }
        if (props.textForMoveCloserAndRescanHint !== prevProps.textForMoveCloserAndRescanHint &&
            props.textForMoveCloserAndRescanHint !== undefined) {
            this.textForMoveCloserAndRescanHint = props.textForMoveCloserAndRescanHint;
        }
        if (props.textForMoveFurtherAndRescanHint !== prevProps.textForMoveFurtherAndRescanHint &&
            props.textForMoveFurtherAndRescanHint !== undefined) {
            this.textForMoveFurtherAndRescanHint = props.textForMoveFurtherAndRescanHint;
        }
        if (props.textForTapToUncountHint !== prevProps.textForTapToUncountHint &&
            props.textForTapToUncountHint !== undefined) {
            this.textForTapToUncountHint = props.textForTapToUncountHint;
        }
        // Update other objects
        if (props.torchControlPosition !== prevProps.torchControlPosition &&
            props.torchControlPosition !== undefined) {
            this.torchControlPosition = props.torchControlPosition;
        }
        if (props.barcodeNotInListActionSettings !== prevProps.barcodeNotInListActionSettings &&
            props.barcodeNotInListActionSettings !== undefined) {
            this.barcodeNotInListActionSettings = props.barcodeNotInListActionSettings;
        }
        if (props.viewStyle !== prevProps.viewStyle) {
            this._viewStyle = props.viewStyle;
            void this.updateNative();
        }
    }
    updateNative() {
        return this._controller.update();
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BaseBarcodeCountView.prototype, "isViewCreated", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BaseBarcodeCountView, "barcodeCountDefaults", null);

class BarcodeFilterHighlightSettingsBrush extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static create(brush) {
        return new BarcodeFilterHighlightSettingsBrush(brush);
    }
    constructor(brush) {
        super();
        this._brush = null;
        this._highlightType = exports.BarcodeFilterHighlightType.Brush;
        this._brush = brush;
    }
    get highlightType() {
        return this._highlightType;
    }
    get brush() {
        return this._brush;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('highlightType')
], BarcodeFilterHighlightSettingsBrush.prototype, "_highlightType", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('brush')
], BarcodeFilterHighlightSettingsBrush.prototype, "_brush", void 0);

exports.BarcodeBatchBasicOverlayStyle = void 0;
(function (BarcodeBatchBasicOverlayStyle) {
    BarcodeBatchBasicOverlayStyle["Frame"] = "frame";
    BarcodeBatchBasicOverlayStyle["Dot"] = "dot";
})(exports.BarcodeBatchBasicOverlayStyle || (exports.BarcodeBatchBasicOverlayStyle = {}));

class BarcodeBatchSession {
    get addedTrackedBarcodes() {
        return this._addedTrackedBarcodes;
    }
    get removedTrackedBarcodes() {
        return this._removedTrackedBarcodes;
    }
    get updatedTrackedBarcodes() {
        return this._updatedTrackedBarcodes;
    }
    get trackedBarcodes() {
        return this._trackedBarcodes;
    }
    get frameSequenceID() {
        return this._frameSequenceID;
    }
    static fromJSON(json) {
        var _a;
        const sessionJson = JSON.parse(json.session);
        const session = new BarcodeBatchSession();
        session._frameSequenceID = sessionJson.frameSequenceId;
        session._addedTrackedBarcodes = sessionJson.addedTrackedBarcodes
            .map((trackedBarcodeJSON) => {
            return TrackedBarcode['fromJSON'](trackedBarcodeJSON, sessionJson.frameSequenceId);
        });
        session._removedTrackedBarcodes = sessionJson.removedTrackedBarcodes;
        session._updatedTrackedBarcodes = sessionJson.updatedTrackedBarcodes
            .map((trackedBarcodeJSON) => {
            return TrackedBarcode['fromJSON'](trackedBarcodeJSON, sessionJson.frameSequenceId);
        });
        session._trackedBarcodes = Object.keys(sessionJson.trackedBarcodes)
            .reduce((trackedBarcodes, identifier) => {
            trackedBarcodes[identifier] = TrackedBarcode['fromJSON'](sessionJson.trackedBarcodes[identifier], sessionJson.frameSequenceId);
            return trackedBarcodes;
        }, {});
        session.frameId = (_a = json.frameId) !== null && _a !== void 0 ? _a : '';
        return session;
    }
    reset() {
        return this.listenerController.resetSession();
    }
}

var BarcodeBatchListenerEvents;
(function (BarcodeBatchListenerEvents) {
    BarcodeBatchListenerEvents["didUpdateSession"] = "BarcodeBatchListener.didUpdateSession";
})(BarcodeBatchListenerEvents || (BarcodeBatchListenerEvents = {}));
class BarcodeBatchListenerController extends scanditDatacaptureFrameworksCore.BaseController {
    constructor(barcodeBatch) {
        super('BarcodeBatchListenerProxy');
        this.hasListeners = false;
        this.handleDidUpdateSessionEventWrapper = (ev) => __awaiter$1(this, void 0, void 0, function* () {
            return this.handleDidUpdateSessionEvent(ev);
        });
        this.mode = barcodeBatch;
        this._proxy.isModeEnabled = () => barcodeBatch.isEnabled;
        void this.initialize();
    }
    resetSession() {
        return this._proxy.$resetBarcodeBatchSession();
    }
    setModeEnabledState(enabled) {
        return __awaiter$1(this, void 0, void 0, function* () {
            return this._proxy.$setBarcodeBatchModeEnabledState({ modeId: this.mode['modeId'], enabled });
        });
    }
    updateBarcodeBatchMode() {
        return this._proxy.$updateBarcodeBatchMode({ modeJson: JSON.stringify(this.mode.toJSON()) });
    }
    applyBarcodeBatchModeSettings(newSettings) {
        return this._proxy.$applyBarcodeBatchModeSettings({
            modeId: this.mode['modeId'],
            modeSettingsJson: JSON.stringify(newSettings.toJSON()),
        });
    }
    subscribeListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (this.hasListeners) {
                return;
            }
            this._proxy.subscribeForEvents(Object.values(BarcodeBatchListenerEvents));
            yield this._proxy.$$registerBarcodeBatchListenerForEvents({ modeId: this.mode['modeId'] });
            this._proxy.eventEmitter.on(BarcodeBatchListenerEvents.didUpdateSession, this.handleDidUpdateSessionEventWrapper);
            this.hasListeners = true;
        });
    }
    unsubscribeListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.hasListeners) {
                return;
            }
            yield this._proxy.$unregisterBarcodeBatchListenerForEvents({ modeId: this.mode['modeId'] });
            this._proxy.unsubscribeFromEvents(Object.values(BarcodeBatchListenerEvents));
            this._proxy.eventEmitter.off(BarcodeBatchListenerEvents.didUpdateSession, this.handleDidUpdateSessionEventWrapper);
            this.hasListeners = false;
        });
    }
    dispose() {
        void this.unsubscribeListener();
        this._proxy.dispose();
    }
    initialize() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (this.mode['listeners'].length > 0) {
                yield Promise.resolve(this.subscribeListener());
            }
        });
    }
    handleDidUpdateSessionEvent(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('BarcodeBatchListenerController didUpdateSession payload is null');
                return;
            }
            if (payload.modeId !== this.mode['modeId']) {
                return;
            }
            const session = BarcodeBatchSession['fromJSON'](payload);
            yield this.notifyListenersOfDidUpdateSession(session);
            return this._proxy.$finishBarcodeBatchDidUpdateSessionCallback({
                modeId: this.mode['modeId'],
                enabled: this.mode.isEnabled,
            });
        });
    }
    notifyListenersOfDidUpdateSession(session) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const mode = this.mode;
            for (const listener of mode['listeners']) {
                if (listener.didUpdateSession) {
                    yield listener.didUpdateSession(this.mode, session, () => scanditDatacaptureFrameworksCore.CameraController.getFrame(session['frameId']));
                }
            }
        });
    }
}

class BarcodeBatch extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static get barcodeBatchDefaults() {
        return getBarcodeBatchDefaults();
    }
    static createRecommendedCameraSettings() {
        return new scanditDatacaptureFrameworksCore.CameraSettings(BarcodeBatch.barcodeBatchDefaults.RecommendedCameraSettings);
    }
    get _context() {
        return this.privateContext;
    }
    set _context(newContext) {
        var _a, _b;
        if (newContext == null) {
            void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.dispose());
            this.controller = null;
            this.privateContext = null;
            return;
        }
        this.privateContext = newContext;
        (_b = this.controller) !== null && _b !== void 0 ? _b : (this.controller = new BarcodeBatchListenerController(this));
    }
    constructor(settings) {
        super();
        this.type = 'barcodeTracking';
        this.modeId = Math.floor(Math.random() * 1000000);
        this._isEnabled = true;
        this.privateContext = null;
        this.parentId = null;
        this.listeners = [];
        this.hasListeners = false;
        this.controller = null;
        this.settings = settings;
    }
    get isEnabled() {
        return this._isEnabled;
    }
    set isEnabled(isEnabled) {
        var _a;
        this._isEnabled = isEnabled;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.setModeEnabledState(isEnabled));
    }
    get context() {
        return this._context;
    }
    applySettings(settings) {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            this.settings = settings;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.applyBarcodeBatchModeSettings(settings);
        });
    }
    addListener(listener) {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            if (this.listeners.includes(listener)) {
                return;
            }
            if (this.listeners.length === 0) {
                yield ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.subscribeListener());
            }
            this.listeners.push(listener);
            this.hasListeners = this.listeners.length > 0;
        });
    }
    removeListener(listener) {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            if (!this.listeners.includes(listener)) {
                return;
            }
            this.listeners.splice(this.listeners.indexOf(listener), 1);
            this.hasListeners = this.listeners.length > 0;
            if (!this.hasListeners) {
                return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.unsubscribeListener();
            }
        });
    }
    reset() {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.resetSession();
        });
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('enabled')
], BarcodeBatch.prototype, "_isEnabled", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeBatch.prototype, "privateContext", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('parentId'),
    scanditDatacaptureFrameworksCore.ignoreFromSerializationIfNull
], BarcodeBatch.prototype, "parentId", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeBatch.prototype, "listeners", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeBatch.prototype, "controller", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeBatch, "barcodeBatchDefaults", null);

var BarcodeBatchAdvancedOverlayListenerEvents;
(function (BarcodeBatchAdvancedOverlayListenerEvents) {
    BarcodeBatchAdvancedOverlayListenerEvents["didTapViewForTrackedBarcode"] = "BarcodeBatchAdvancedOverlayListener.didTapViewForTrackedBarcode";
    BarcodeBatchAdvancedOverlayListenerEvents["viewForTrackedBarcode"] = "BarcodeBatchAdvancedOverlayListener.viewForTrackedBarcode";
    BarcodeBatchAdvancedOverlayListenerEvents["anchorForTrackedBarcode"] = "BarcodeBatchAdvancedOverlayListener.anchorForTrackedBarcode";
    BarcodeBatchAdvancedOverlayListenerEvents["offsetForTrackedBarcode"] = "BarcodeBatchAdvancedOverlayListener.offsetForTrackedBarcode";
})(BarcodeBatchAdvancedOverlayListenerEvents || (BarcodeBatchAdvancedOverlayListenerEvents = {}));
class BarcodeBatchAdvancedOverlayController extends scanditDatacaptureFrameworksCore.BaseController {
    constructor(overlay) {
        super('BarcodeBatchAdvancedOverlayProxy');
        this.hasListeners = false;
        this.handleViewForTrackedBarcodeWrapper = (ev) => __awaiter$1(this, void 0, void 0, function* () {
            return this.handleViewForTrackedBarcode(ev);
        });
        this.handleAnchorForTrackedBarcodeWrapper = (ev) => __awaiter$1(this, void 0, void 0, function* () {
            return this.handleAnchorForTrackedBarcode(ev);
        });
        this.handleOffsetForTrackedBarcodeWrapper = (ev) => __awaiter$1(this, void 0, void 0, function* () {
            return this.handleOffsetForTrackedBarcode(ev);
        });
        this.handleDidTapViewForTrackedBarcodeWrapper = (ev) => {
            this.handleDidTapViewForTrackedBarcode(ev);
        };
        this.overlay = overlay;
        void this.initialize();
    }
    setBrushForTrackedBarcode(brush, trackedBarcode) {
        return this._proxy.$setBrushForTrackedBarcode({
            dataCaptureViewId: this.dataCaptureViewId,
            brushJson: JSON.stringify(brush.toJSON()),
            sessionFrameSequenceID: trackedBarcode['sessionFrameSequenceID'],
            trackedBarcodeIdentifier: trackedBarcode.identifier,
        });
    }
    setViewForTrackedBarcode(view, trackedBarcode) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const awitedView = yield view;
            const viewJson = this.getJSONStringForView(awitedView);
            return this._proxy.$setViewForTrackedBarcode({
                dataCaptureViewId: this.dataCaptureViewId,
                viewJson,
                trackedBarcodeIdentifier: trackedBarcode.identifier,
                sessionFrameSequenceID: trackedBarcode['sessionFrameSequenceID'],
            });
        });
    }
    updateSizeOfTrackedBarcodeView(trackedBarcodeIdentifier, width, height) {
        return __awaiter$1(this, void 0, void 0, function* () {
            return this._proxy.$updateSizeOfTrackedBarcodeView({
                dataCaptureViewId: this.dataCaptureViewId,
                trackedBarcodeIdentifier,
                width,
                height,
            });
        });
    }
    setAnchorForTrackedBarcode(anchor, trackedBarcode) {
        return this._proxy.$setAnchorForTrackedBarcode({
            dataCaptureViewId: this.dataCaptureViewId,
            anchor,
            trackedBarcodeIdentifier: trackedBarcode.identifier,
            sessionFrameSequenceID: trackedBarcode['sessionFrameSequenceID'],
        });
    }
    setOffsetForTrackedBarcode(offset, trackedBarcode) {
        return this._proxy.$setOffsetForTrackedBarcode({
            dataCaptureViewId: this.dataCaptureViewId,
            offsetJson: JSON.stringify(offset.toJSON()),
            trackedBarcodeIdentifier: trackedBarcode.identifier,
            sessionFrameSequenceID: trackedBarcode['sessionFrameSequenceID'],
        });
    }
    clearTrackedBarcodeViews() {
        return this._proxy.$clearTrackedBarcodeViews({ dataCaptureViewId: this.dataCaptureViewId });
    }
    updateBarcodeBatchAdvancedOverlay() {
        return this._proxy.$updateBarcodeBatchAdvancedOverlay({
            dataCaptureViewId: this.dataCaptureViewId,
            overlayJson: JSON.stringify(this.overlay.toJSON()),
        });
    }
    subscribeListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (this.hasListeners) {
                return;
            }
            if (this.dataCaptureViewId !== -1) {
                yield this._proxy.$$registerListenerForAdvancedOverlayEvents({ dataCaptureViewId: this.dataCaptureViewId });
            }
            this._proxy.subscribeForEvents(Object.values(BarcodeBatchAdvancedOverlayListenerEvents));
            this._proxy.eventEmitter.on(BarcodeBatchAdvancedOverlayListenerEvents.viewForTrackedBarcode, this.handleViewForTrackedBarcodeWrapper);
            this._proxy.eventEmitter.on(BarcodeBatchAdvancedOverlayListenerEvents.anchorForTrackedBarcode, this.handleAnchorForTrackedBarcodeWrapper);
            this._proxy.eventEmitter.on(BarcodeBatchAdvancedOverlayListenerEvents.offsetForTrackedBarcode, this.handleOffsetForTrackedBarcodeWrapper);
            this._proxy.eventEmitter.on(BarcodeBatchAdvancedOverlayListenerEvents.didTapViewForTrackedBarcode, this.handleDidTapViewForTrackedBarcodeWrapper);
            this.hasListeners = true;
        });
    }
    unsubscribeListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.hasListeners) {
                return;
            }
            yield this._proxy.$unregisterListenerForAdvancedOverlayEvents({ dataCaptureViewId: this.dataCaptureViewId });
            this._proxy.unsubscribeFromEvents(Object.values(BarcodeBatchAdvancedOverlayListenerEvents));
            this._proxy.eventEmitter.off(BarcodeBatchAdvancedOverlayListenerEvents.viewForTrackedBarcode, this.handleViewForTrackedBarcodeWrapper);
            this._proxy.eventEmitter.off(BarcodeBatchAdvancedOverlayListenerEvents.anchorForTrackedBarcode, this.handleAnchorForTrackedBarcodeWrapper);
            this._proxy.eventEmitter.off(BarcodeBatchAdvancedOverlayListenerEvents.offsetForTrackedBarcode, this.handleOffsetForTrackedBarcodeWrapper);
            this._proxy.eventEmitter.off(BarcodeBatchAdvancedOverlayListenerEvents.didTapViewForTrackedBarcode, this.handleDidTapViewForTrackedBarcodeWrapper);
            this.hasListeners = false;
        });
    }
    dispose() {
        void this.unsubscribeListener();
        this._proxy.eventEmitter.removeAllListeners();
        this._proxy.dispose();
    }
    getJSONStringForView(view) {
        if (view == null) {
            return null;
        }
        // If view doesn't have moduleName, just return it. If it does have moduleName, we process it further for React Native
        if (view.moduleName === undefined) {
            return view;
        }
        if (!this.isSerializeable(view.props)) {
            // react-navigation does something like this: https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
            throw new Error('Non-serializable values were found in the view passed passed to a BarcodeBatchAdvancedOverlay, which can break usage. This might happen if you have non-serializable values such as function, class instances etc. in the props for the view component that you are passing.');
        }
        const viewJSON = {
            moduleName: view.moduleName,
            initialProperties: view.props,
        };
        return JSON.stringify(viewJSON);
    }
    isSerializeable(o) {
        if (o === undefined || o === null || typeof o === 'boolean' || typeof o === 'number' || typeof o === 'string') {
            return true;
        }
        if (Object.prototype.toString.call(o) !== '[object Object]' && !Array.isArray(o)) {
            return false;
        }
        if (Array.isArray(o)) {
            for (const it of o) {
                if (!this.isSerializeable(it)) {
                    return false;
                }
            }
        }
        else {
            for (const key in o) {
                if (!this.isSerializeable(o[key])) {
                    return false;
                }
            }
        }
        return true;
    }
    handleViewForTrackedBarcode(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('BarcodeBatchAdvancedOverlayController viewForTrackedBarcode payload is null');
                return;
            }
            const trackedBarcode = TrackedBarcode['fromJSON'](JSON.parse(payload.trackedBarcode));
            if (this.overlay.listener && this.overlay.listener.viewForTrackedBarcode) {
                const view = yield this.overlay.listener.viewForTrackedBarcode(this.overlay, trackedBarcode);
                void this._proxy.$setViewForTrackedBarcode({
                    dataCaptureViewId: this.dataCaptureViewId,
                    viewJson: this.getJSONStringForView(view),
                    trackedBarcodeIdentifier: trackedBarcode.identifier,
                    sessionFrameSequenceID: trackedBarcode['sessionFrameSequenceID'],
                });
            }
        });
    }
    handleAnchorForTrackedBarcode(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('BarcodeBatchAdvancedOverlayController anchorForTrackedBarcode payload is null');
                return;
            }
            const trackedBarcode = TrackedBarcode['fromJSON'](JSON.parse(payload.trackedBarcode));
            if (this.overlay.listener && this.overlay.listener.anchorForTrackedBarcode) {
                const anchor = this.overlay.listener.anchorForTrackedBarcode(this.overlay, trackedBarcode);
                yield this.setAnchorForTrackedBarcode(anchor, trackedBarcode);
            }
        });
    }
    handleOffsetForTrackedBarcode(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('BarcodeBatchAdvancedOverlayController offsetForTrackedBarcode payload is null');
                return;
            }
            const trackedBarcode = TrackedBarcode['fromJSON'](JSON.parse(payload.trackedBarcode));
            if (this.overlay.listener && this.overlay.listener.offsetForTrackedBarcode) {
                const offset = this.overlay.listener.offsetForTrackedBarcode(this.overlay, trackedBarcode);
                yield this.setOffsetForTrackedBarcode(offset, trackedBarcode);
            }
        });
    }
    handleDidTapViewForTrackedBarcode(ev) {
        var _a, _b;
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodeBatchAdvancedOverlayController didTapViewForTrackedBarcode payload is null');
            return;
        }
        const trackedBarcode = TrackedBarcode['fromJSON'](JSON.parse(payload.trackedBarcode));
        (_b = (_a = this.overlay.listener) === null || _a === void 0 ? void 0 : _a.didTapViewForTrackedBarcode) === null || _b === void 0 ? void 0 : _b.call(_a, this.overlay, trackedBarcode);
    }
    get dataCaptureViewId() {
        var _a, _b;
        return (_b = (_a = this.overlay.view) === null || _a === void 0 ? void 0 : _a.viewId) !== null && _b !== void 0 ? _b : -1;
    }
    initialize() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (this.overlay.listener != null) {
                yield this.subscribeListener();
            }
        });
    }
}

var BarcodeBatchBasicOverlayListenerEvents;
(function (BarcodeBatchBasicOverlayListenerEvents) {
    BarcodeBatchBasicOverlayListenerEvents["brushForTrackedBarcode"] = "BarcodeBatchBasicOverlayListener.brushForTrackedBarcode";
    BarcodeBatchBasicOverlayListenerEvents["didTapTrackedBarcode"] = "BarcodeBatchBasicOverlayListener.didTapTrackedBarcode";
})(BarcodeBatchBasicOverlayListenerEvents || (BarcodeBatchBasicOverlayListenerEvents = {}));
class BarcodeBatchBasicOverlayController extends scanditDatacaptureFrameworksCore.BaseController {
    constructor(overlay) {
        super('BarcodeBatchBasicOverlayProxy');
        this.hasListeners = false;
        this.handleBrushForTrackedBarcodeWrapper = (ev) => __awaiter$1(this, void 0, void 0, function* () {
            return this.handleBrushForTrackedBarcode(ev);
        });
        this.handleDidTapTrackedBarcodeWrapper = (ev) => {
            this.handleDidTapTrackedBarcode(ev);
        };
        this.overlay = overlay;
        void this.initialize();
    }
    setBrushForTrackedBarcode(brush, trackedBarcode) {
        return __awaiter$1(this, void 0, void 0, function* () {
            return this._proxy.$setBrushForTrackedBarcode({
                dataCaptureViewId: this.dataCaptureViewId,
                brushJson: brush ? JSON.stringify(brush.toJSON()) : null,
                trackedBarcodeIdentifier: trackedBarcode.identifier,
                sessionFrameSequenceID: trackedBarcode['sessionFrameSequenceID'],
            });
        });
    }
    clearTrackedBarcodeBrushes() {
        return __awaiter$1(this, void 0, void 0, function* () {
            return this._proxy.$clearTrackedBarcodeBrushes();
        });
    }
    updateBarcodeBatchBasicOverlay() {
        return __awaiter$1(this, void 0, void 0, function* () {
            return this._proxy.$updateBarcodeBatchBasicOverlay({
                dataCaptureViewId: this.dataCaptureViewId,
                overlayJson: JSON.stringify(this.overlay.toJSON()),
            });
        });
    }
    subscribeListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (this.hasListeners) {
                return;
            }
            if (this.dataCaptureViewId !== -1) {
                yield this._proxy.$$registerListenerForBasicOverlayEvents({ dataCaptureViewId: this.dataCaptureViewId });
            }
            this._proxy.subscribeForEvents(Object.values(BarcodeBatchBasicOverlayListenerEvents));
            this._proxy.eventEmitter.on(BarcodeBatchBasicOverlayListenerEvents.brushForTrackedBarcode, this.handleBrushForTrackedBarcodeWrapper);
            this._proxy.eventEmitter.on(BarcodeBatchBasicOverlayListenerEvents.didTapTrackedBarcode, this.handleDidTapTrackedBarcodeWrapper);
            this.hasListeners = true;
        });
    }
    unsubscribeListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.hasListeners) {
                return;
            }
            if (this.dataCaptureViewId !== -1) {
                yield this._proxy.$unregisterListenerForBasicOverlayEvents({ dataCaptureViewId: this.dataCaptureViewId });
            }
            this._proxy.unsubscribeFromEvents(Object.values(BarcodeBatchBasicOverlayListenerEvents));
            this._proxy.eventEmitter.off(BarcodeBatchBasicOverlayListenerEvents.brushForTrackedBarcode, this.handleBrushForTrackedBarcodeWrapper);
            this._proxy.eventEmitter.off(BarcodeBatchBasicOverlayListenerEvents.didTapTrackedBarcode, this.handleDidTapTrackedBarcodeWrapper);
            this.hasListeners = false;
        });
    }
    dispose() {
        void this.unsubscribeListener();
        this._proxy.dispose();
    }
    get dataCaptureViewId() {
        var _a, _b;
        return (_b = (_a = this.overlay.view) === null || _a === void 0 ? void 0 : _a.viewId) !== null && _b !== void 0 ? _b : -1;
    }
    initialize() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (this.overlay.listener != null) {
                yield this.subscribeListener();
            }
        });
    }
    handleBrushForTrackedBarcode(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('BarcodeBatchBasicOverlayController brushForTrackedBarcode payload is null');
                return;
            }
            const trackedBarcode = TrackedBarcode['fromJSON'](JSON.parse(payload.trackedBarcode));
            let brush = this.overlay.brush;
            if (this.overlay.listener && this.overlay.listener.brushForTrackedBarcode) {
                brush = this.overlay.listener.brushForTrackedBarcode(this.overlay, trackedBarcode);
                yield this.setBrushForTrackedBarcode(brush, trackedBarcode);
            }
        });
    }
    handleDidTapTrackedBarcode(ev) {
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodeBatchBasicOverlayController didTapTrackedBarcode payload is null');
            return;
        }
        const trackedBarcode = TrackedBarcode['fromJSON'](JSON.parse(payload.trackedBarcode));
        if (this.overlay.listener && this.overlay.listener.didTapTrackedBarcode) {
            this.overlay.listener.didTapTrackedBarcode(this.overlay, trackedBarcode);
        }
    }
}

class BarcodeBatchBasicOverlay extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get view() {
        return this._view;
    }
    set view(newView) {
        var _a, _b;
        if (newView === null) {
            this._view = null;
            void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.dispose());
            this.controller = null;
            return;
        }
        this._view = newView;
        (_b = this.controller) !== null && _b !== void 0 ? _b : (this.controller = new BarcodeBatchBasicOverlayController(this));
    }
    get _dataCaptureViewId() {
        var _a, _b;
        return (_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.viewId) !== null && _b !== void 0 ? _b : -1;
    }
    get listener() {
        return this._listener;
    }
    set listener(newListener) {
        var _a, _b;
        this._hasListener = newListener != null;
        this._listener = newListener;
        if (this._listener != null) {
            void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.subscribeListener());
        }
        else {
            void ((_b = this.controller) === null || _b === void 0 ? void 0 : _b.unsubscribeListener());
        }
    }
    get defaultBrush() {
        return this.brush;
    }
    set defaultBrush(newBrush) {
        this.brush = newBrush;
    }
    get brush() {
        return this._brush;
    }
    set brush(newBrush) {
        var _a;
        this._brush = newBrush;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateBarcodeBatchBasicOverlay());
    }
    get shouldShowScanAreaGuides() {
        return this._shouldShowScanAreaGuides;
    }
    set shouldShowScanAreaGuides(shouldShow) {
        var _a;
        this._shouldShowScanAreaGuides = shouldShow;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateBarcodeBatchBasicOverlay());
    }
    get style() {
        return this._style;
    }
    static get barcodeBatchDefaults() {
        return getBarcodeBatchDefaults();
    }
    constructor(mode, style) {
        super();
        this.type = 'barcodeTrackingBasic';
        this._view = null;
        this._hasListener = false;
        this._listener = null;
        this._brush = (() => {
            const overlayDefaults = BarcodeBatchBasicOverlay.barcodeBatchDefaults.BarcodeBatchBasicOverlay;
            const defaultBrush = overlayDefaults.styles[overlayDefaults.defaultStyle].DefaultBrush;
            return new scanditDatacaptureFrameworksCore.Brush(defaultBrush.fillColor, defaultBrush.strokeColor, defaultBrush.strokeWidth);
        })();
        this._shouldShowScanAreaGuides = false;
        this.controller = null;
        this._style = style;
        this.modeId = mode['modeId'];
    }
    setBrushForTrackedBarcode(brush, trackedBarcode) {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.setBrushForTrackedBarcode(brush, trackedBarcode);
        });
    }
    clearTrackedBarcodeBrushes() {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.clearTrackedBarcodeBrushes();
        });
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeBatchBasicOverlay.prototype, "_view", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('style')
], BarcodeBatchBasicOverlay.prototype, "_style", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('hasListener')
], BarcodeBatchBasicOverlay.prototype, "_hasListener", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('dataCaptureViewId')
], BarcodeBatchBasicOverlay.prototype, "_dataCaptureViewId", null);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeBatchBasicOverlay.prototype, "_listener", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeBatchBasicOverlay.prototype, "defaultBrush", null);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('defaultBrush')
], BarcodeBatchBasicOverlay.prototype, "_brush", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('shouldShowScanAreaGuides')
], BarcodeBatchBasicOverlay.prototype, "_shouldShowScanAreaGuides", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeBatchBasicOverlay.prototype, "controller", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeBatchBasicOverlay, "barcodeBatchDefaults", null);

class BarcodeBatchSettings extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get enabledSymbologies() {
        return Object.keys(this.symbologies)
            .filter(symbology => this.symbologies[symbology].isEnabled);
    }
    static get barcodeDefaults() {
        return getBarcodeDefaults();
    }
    constructor() {
        super();
        this.properties = {};
        this.symbologies = {};
        this._arucoDictionary = null;
    }
    settingsForSymbology(symbology) {
        if (!this.symbologies[symbology]) {
            const symbologySettings = BarcodeBatchSettings.barcodeDefaults.SymbologySettings[symbology];
            symbologySettings['_symbology'] = symbology;
            this.symbologies[symbology] = symbologySettings;
        }
        return this.symbologies[symbology];
    }
    setProperty(name, value) {
        this.properties[name] = value;
    }
    getProperty(name) {
        return this.properties[name];
    }
    enableSymbologies(symbologies) {
        symbologies.forEach(symbology => this.enableSymbology(symbology, true));
    }
    enableSymbology(symbology, enabled) {
        this.settingsForSymbology(symbology).isEnabled = enabled;
    }
    setArucoDictionary(dictionary) {
        this._arucoDictionary = dictionary;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('arucoDictionary')
], BarcodeBatchSettings.prototype, "_arucoDictionary", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeBatchSettings, "barcodeDefaults", null);

class BaseBarcodeBatchAdvancedOverlay extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get view() {
        return this._view;
    }
    set view(newView) {
        var _a, _b;
        if (newView === null) {
            void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.dispose());
            this.controller = null;
            this._view = null;
            return;
        }
        this._view = newView;
        (_b = this.controller) !== null && _b !== void 0 ? _b : (this.controller = new BarcodeBatchAdvancedOverlayController(this));
    }
    get shouldShowScanAreaGuides() {
        return this._shouldShowScanAreaGuides;
    }
    set shouldShowScanAreaGuides(shouldShow) {
        var _a;
        this._shouldShowScanAreaGuides = shouldShow;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateBarcodeBatchAdvancedOverlay());
    }
    get _dataCaptureViewId() {
        var _a, _b;
        return (_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.viewId) !== null && _b !== void 0 ? _b : -1;
    }
    get listener() {
        return this._listener;
    }
    set listener(newListener) {
        var _a, _b;
        this._hasListener = newListener != null;
        this._listener = newListener;
        if (this._listener != null) {
            void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.subscribeListener());
        }
        else {
            void ((_b = this.controller) === null || _b === void 0 ? void 0 : _b.unsubscribeListener());
        }
    }
    constructor(mode) {
        super();
        this.type = 'barcodeTrackingAdvanced';
        this.controller = null;
        this._view = null;
        this._shouldShowScanAreaGuides = false;
        this._hasListener = false;
        this._listener = null;
        this.modeId = mode['modeId'];
    }
    setViewForTrackedBarcode(view, trackedBarcode) {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.setViewForTrackedBarcode(view, trackedBarcode);
        });
    }
    setAnchorForTrackedBarcode(anchor, trackedBarcode) {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.setAnchorForTrackedBarcode(anchor, trackedBarcode);
        });
    }
    setOffsetForTrackedBarcode(offset, trackedBarcode) {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.setOffsetForTrackedBarcode(offset, trackedBarcode);
        });
    }
    clearTrackedBarcodeViews() {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.clearTrackedBarcodeViews();
        });
    }
    updateSizeOfTrackedBarcodeView(trackedBarcodeIdentifier, width, height) {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateSizeOfTrackedBarcodeView(trackedBarcodeIdentifier, width, height);
        });
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BaseBarcodeBatchAdvancedOverlay.prototype, "controller", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BaseBarcodeBatchAdvancedOverlay.prototype, "_view", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('shouldShowScanAreaGuides')
], BaseBarcodeBatchAdvancedOverlay.prototype, "_shouldShowScanAreaGuides", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('hasListener')
], BaseBarcodeBatchAdvancedOverlay.prototype, "_hasListener", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('dataCaptureViewId')
], BaseBarcodeBatchAdvancedOverlay.prototype, "_dataCaptureViewId", null);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BaseBarcodeBatchAdvancedOverlay.prototype, "_listener", void 0);

class SparkScan extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get isEnabled() {
        return this._isEnabled;
    }
    set isEnabled(isEnabled) {
        var _a;
        this._isEnabled = isEnabled;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.setModeEnabledState(isEnabled));
    }
    get context() {
        return this._context;
    }
    get _context() {
        return this.privateContext;
    }
    set _context(newContext) {
        this.privateContext = newContext;
    }
    constructor(settings) {
        super();
        this.type = 'sparkScan';
        this._isEnabled = true;
        this.hasListeners = false;
        this.privateContext = null;
        this.listeners = [];
        this.controller = null;
        void this.applySettings(settings);
        this.hasListeners = this.hasItemDefinitions();
    }
    applySettings(settings) {
        return __awaiter$1(this, void 0, void 0, function* () {
            this.settings = settings;
            return this.didChange();
        });
    }
    addListener(listener) {
        if (this.listeners.includes(listener)) {
            return;
        }
        this.listeners.push(listener);
        this.hasListeners = this.listeners.length > 0 || this.hasItemDefinitions();
    }
    removeListener(listener) {
        if (!this.listeners.includes(listener)) {
            return;
        }
        this.listeners.splice(this.listeners.indexOf(listener));
        this.hasListeners = this.listeners.length > 0 || this.hasItemDefinitions();
    }
    didChange() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (this.controller) {
                return this.controller.updateMode();
            }
            else {
                return Promise.resolve();
            }
        });
    }
    hasItemDefinitions() {
        return this.settings.itemDefinitions !== null && this.settings.itemDefinitions.length > 0;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('isEnabled')
], SparkScan.prototype, "_isEnabled", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], SparkScan.prototype, "privateContext", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], SparkScan.prototype, "listeners", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], SparkScan.prototype, "controller", void 0);

exports.SparkScanMiniPreviewSize = void 0;
(function (SparkScanMiniPreviewSize) {
    SparkScanMiniPreviewSize["Regular"] = "regular";
    SparkScanMiniPreviewSize["Expanded"] = "expanded";
})(exports.SparkScanMiniPreviewSize || (exports.SparkScanMiniPreviewSize = {}));

exports.SparkScanPreviewBehavior = void 0;
(function (SparkScanPreviewBehavior) {
    SparkScanPreviewBehavior["Persistent"] = "accurate";
    SparkScanPreviewBehavior["Default"] = "default";
})(exports.SparkScanPreviewBehavior || (exports.SparkScanPreviewBehavior = {}));

class SparkScanToastSettings extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor() {
        super(...arguments);
        this._toastEnabled = SparkScanToastSettings.toastSettings.toastEnabled;
        this._toastBackgroundColor = SparkScanToastSettings.toastSettings.toastBackgroundColor;
        this._toastTextColor = SparkScanToastSettings.toastSettings.toastTextColor;
        this._targetModeEnabledMessage = SparkScanToastSettings.toastSettings.targetModeEnabledMessage;
        this._targetModeDisabledMessage = SparkScanToastSettings.toastSettings.targetModeDisabledMessage;
        this._continuousModeEnabledMessage = SparkScanToastSettings.toastSettings.continuousModeEnabledMessage;
        this._continuousModeDisabledMessage = SparkScanToastSettings.toastSettings.continuousModeDisabledMessage;
        this._scanPausedMessage = SparkScanToastSettings.toastSettings.scanPausedMessage;
        this._zoomedInMessage = SparkScanToastSettings.toastSettings.zoomedInMessage;
        this._zoomedOutMessage = SparkScanToastSettings.toastSettings.zoomedOutMessage;
        this._torchEnabledMessage = SparkScanToastSettings.toastSettings.torchEnabledMessage;
        this._torchDisabledMessage = SparkScanToastSettings.toastSettings.torchDisabledMessage;
        this._userFacingCameraEnabledMessage = SparkScanToastSettings.toastSettings.userFacingCameraEnabledMessage;
        this._worldFacingCameraEnabledMessage = SparkScanToastSettings.toastSettings.worldFacingCameraEnabledMessage;
    }
    set toastEnabled(isEnabled) {
        this._toastEnabled = isEnabled;
    }
    get toastEnabled() {
        return this._toastEnabled;
    }
    set toastBackgroundColor(backgroundColor) {
        this._toastBackgroundColor = backgroundColor;
    }
    get toastBackgroundColor() {
        return this._toastBackgroundColor;
    }
    set toastTextColor(textColor) {
        this._toastTextColor = textColor;
    }
    get toastTextColor() {
        return this._toastTextColor;
    }
    set targetModeEnabledMessage(message) {
        this._targetModeEnabledMessage = message;
    }
    get targetModeEnabledMessage() {
        return this._targetModeEnabledMessage;
    }
    set targetModeDisabledMessage(message) {
        this._targetModeDisabledMessage = message;
    }
    get targetModeDisabledMessage() {
        return this._targetModeDisabledMessage;
    }
    set continuousModeEnabledMessage(message) {
        this._continuousModeEnabledMessage = message;
    }
    get continuousModeEnabledMessage() {
        return this._continuousModeEnabledMessage;
    }
    set continuousModeDisabledMessage(message) {
        this._continuousModeDisabledMessage = message;
    }
    get continuousModeDisabledMessage() {
        return this._continuousModeDisabledMessage;
    }
    set scanPausedMessage(message) {
        this._scanPausedMessage = message;
    }
    get scanPausedMessage() {
        return this._scanPausedMessage;
    }
    set zoomedInMessage(message) {
        this._zoomedInMessage = message;
    }
    get zoomedInMessage() {
        return this._zoomedInMessage;
    }
    set zoomedOutMessage(message) {
        this._zoomedOutMessage = message;
    }
    get zoomedOutMessage() {
        return this._zoomedOutMessage;
    }
    set torchEnabledMessage(message) {
        this._torchEnabledMessage = message;
    }
    get torchEnabledMessage() {
        return this._torchEnabledMessage;
    }
    set torchDisabledMessage(message) {
        this._torchDisabledMessage = message;
    }
    get torchDisabledMessage() {
        return this._torchDisabledMessage;
    }
    set worldFacingCameraEnabledMessage(message) {
        this._worldFacingCameraEnabledMessage = message;
    }
    get worldFacingCameraEnabledMessage() {
        return this._worldFacingCameraEnabledMessage;
    }
    set userFacingCameraEnabledMessage(message) {
        this._userFacingCameraEnabledMessage = message;
    }
    get userFacingCameraEnabledMessage() {
        return this._userFacingCameraEnabledMessage;
    }
    static get sparkScanDefaults() {
        return getSparkScanDefaults();
    }
    static get toastSettings() {
        return SparkScanToastSettings.sparkScanDefaults.SparkScanView.SparkScanViewSettings.toastSettings;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('toastEnabled')
], SparkScanToastSettings.prototype, "_toastEnabled", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('toastBackgroundColor')
], SparkScanToastSettings.prototype, "_toastBackgroundColor", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('toastTextColor')
], SparkScanToastSettings.prototype, "_toastTextColor", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('targetModeEnabledMessage')
], SparkScanToastSettings.prototype, "_targetModeEnabledMessage", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('targetModeDisabledMessage')
], SparkScanToastSettings.prototype, "_targetModeDisabledMessage", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('continuousModeEnabledMessage')
], SparkScanToastSettings.prototype, "_continuousModeEnabledMessage", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('continuousModeDisabledMessage')
], SparkScanToastSettings.prototype, "_continuousModeDisabledMessage", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('scanPausedMessage')
], SparkScanToastSettings.prototype, "_scanPausedMessage", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('zoomedInMessage')
], SparkScanToastSettings.prototype, "_zoomedInMessage", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('zoomedOutMessage')
], SparkScanToastSettings.prototype, "_zoomedOutMessage", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('torchEnabledMessage')
], SparkScanToastSettings.prototype, "_torchEnabledMessage", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('torchDisabledMessage')
], SparkScanToastSettings.prototype, "_torchDisabledMessage", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('userFacingCameraEnabledMessage')
], SparkScanToastSettings.prototype, "_userFacingCameraEnabledMessage", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('worldFacingCameraEnabledMessage')
], SparkScanToastSettings.prototype, "_worldFacingCameraEnabledMessage", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], SparkScanToastSettings, "sparkScanDefaults", null);

exports.SparkScanScanningBehavior = void 0;
(function (SparkScanScanningBehavior) {
    SparkScanScanningBehavior["Single"] = "single";
    SparkScanScanningBehavior["Continuous"] = "continuous";
})(exports.SparkScanScanningBehavior || (exports.SparkScanScanningBehavior = {}));

class PrivateSparkScanScanningModeSettings extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get scanningBehavior() {
        return this._scanningBehavior;
    }
    get previewBehavior() {
        return this._previewBehavior;
    }
    constructor(scanScanningBehavior, scanPreviewBehavior) {
        super();
        this._scanningBehavior = scanScanningBehavior;
        this._previewBehavior = scanPreviewBehavior;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('scanningBehavior')
], PrivateSparkScanScanningModeSettings.prototype, "_scanningBehavior", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('previewBehavior')
], PrivateSparkScanScanningModeSettings.prototype, "_previewBehavior", void 0);

class SparkScanScanningModeDefault extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get scanningBehavior() {
        return this._settings.scanningBehavior;
    }
    get previewBehavior() {
        return this._settings.previewBehavior;
    }
    constructor(scanningBehavior, previewBehavior) {
        super();
        this.type = 'default';
        if (previewBehavior) {
            this._settings = new PrivateSparkScanScanningModeSettings(scanningBehavior, previewBehavior);
        }
        else {
            const previewBehavior = exports.SparkScanPreviewBehavior.Default;
            this._settings = new PrivateSparkScanScanningModeSettings(scanningBehavior, previewBehavior);
            console.warn('SparkScanScanningModeDefault(scanningBehavior: SparkScanScanningBehavior) is deprecated.');
        }
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('settings')
], SparkScanScanningModeDefault.prototype, "_settings", void 0);

class SparkScanScanningModeTarget extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get scanningBehavior() {
        return this._settings.scanningBehavior;
    }
    get previewBehavior() {
        return this._settings.previewBehavior;
    }
    constructor(scanningBehavior, previewBehavior) {
        super();
        this.type = 'target';
        if (previewBehavior) {
            this._settings = new PrivateSparkScanScanningModeSettings(scanningBehavior, previewBehavior);
        }
        else {
            const previewBehavior = exports.SparkScanPreviewBehavior.Default;
            this._settings = new PrivateSparkScanScanningModeSettings(scanningBehavior, previewBehavior);
            console.warn('SparkScanScanningModeTarget(scanningBehavior: SparkScanScanningBehavior) is deprecated.');
        }
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('settings')
], SparkScanScanningModeTarget.prototype, "_settings", void 0);

class SparkScanSession {
    constructor(newlyRecognizedBarcode, frameSequenceID, allScannedItems, newlyRecognizedItems, controller) {
        this._newlyRecognizedBarcode = newlyRecognizedBarcode;
        this._frameSequenceID = frameSequenceID;
        this._allScannedItems = allScannedItems;
        this._newlyRecognizedItems = newlyRecognizedItems;
        this._controller = controller;
    }
    get newlyRecognizedBarcode() {
        return this._newlyRecognizedBarcode;
    }
    get frameSequenceID() {
        return this._frameSequenceID;
    }
    get allScannedItems() {
        return this._allScannedItems;
    }
    get newlyRecognizedItems() {
        return this._newlyRecognizedItems;
    }
    reset() {
        return this._controller.resetSession();
    }
}

class SparkScanSettings extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get batterySaving() {
        return this._batterySaving;
    }
    set batterySaving(newValue) {
        this._batterySaving = newValue;
    }
    get locationSelection() {
        return this._locationSelection;
    }
    set locationSelection(newValue) {
        this._locationSelection = newValue;
    }
    get enabledSymbologies() {
        return Object.keys(this.symbologies)
            .filter(symbology => this.symbologies[symbology].isEnabled);
    }
    get itemDefinitions() {
        return this._itemDefinitions;
    }
    set itemDefinitions(value) {
        this._itemDefinitions = value;
    }
    static get sparkScanDefaults() {
        return getSparkScanDefaults();
    }
    static get barcodeDefaults() {
        return getBarcodeDefaults();
    }
    constructor() {
        super();
        this.codeDuplicateFilter = SparkScanSettings.sparkScanDefaults.SparkScanSettings.codeDuplicateFilter;
        this.scanIntention = SparkScanSettings.sparkScanDefaults.SparkScanSettings.scanIntention;
        this._batterySaving = SparkScanSettings.sparkScanDefaults.SparkScanSettings.batterySaving;
        this._locationSelection = SparkScanSettings.sparkScanDefaults.SparkScanSettings.locationSelection;
        this.properties = {};
        this.symbologies = {};
        this._itemDefinitions = null;
    }
    settingsForSymbology(symbology) {
        if (!this.symbologies[symbology]) {
            const symbologySettings = SparkScanSettings.barcodeDefaults.SymbologySettings[symbology];
            symbologySettings['_symbology'] = symbology;
            this.symbologies[symbology] = symbologySettings;
        }
        return this.symbologies[symbology];
    }
    setProperty(name, value) {
        this.properties[name] = value;
    }
    getProperty(name) {
        return this.properties[name];
    }
    enableSymbologies(symbologies) {
        symbologies.forEach(symbology => this.enableSymbology(symbology, true));
    }
    enableSymbology(symbology, enabled) {
        this.settingsForSymbology(symbology).isEnabled = enabled;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('batterySaving')
], SparkScanSettings.prototype, "_batterySaving", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('locationSelection')
], SparkScanSettings.prototype, "_locationSelection", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('scanItemDefinitions')
], SparkScanSettings.prototype, "_itemDefinitions", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], SparkScanSettings, "sparkScanDefaults", null);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], SparkScanSettings, "barcodeDefaults", null);

class SparkScanViewSettings extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor() {
        super(...arguments);
        this.triggerButtonCollapseTimeout = SparkScanViewSettings.viewSettingsDefaults.triggerButtonCollapseTimeout;
        this.defaultTorchState = SparkScanViewSettings.viewSettingsDefaults.defaultTorchState;
        this.defaultScanningMode = SparkScanViewSettings.viewSettingsDefaults.defaultScanningMode;
        this.holdToScanEnabled = SparkScanViewSettings.viewSettingsDefaults.holdToScanEnabled;
        this.soundEnabled = SparkScanViewSettings.viewSettingsDefaults.soundEnabled;
        this.hapticEnabled = SparkScanViewSettings.viewSettingsDefaults.hapticEnabled;
        this.hardwareTriggerEnabled = SparkScanViewSettings.viewSettingsDefaults.hardwareTriggerEnabled;
        this.hardwareTriggerKeyCode = SparkScanViewSettings.viewSettingsDefaults.hardwareTriggerKeyCode;
        this.visualFeedbackEnabled = SparkScanViewSettings.viewSettingsDefaults.visualFeedbackEnabled;
        this.toastSettings = new SparkScanToastSettings();
        this.zoomFactorOut = SparkScanViewSettings.viewSettingsDefaults.zoomFactorOut;
        this.zoomFactorIn = SparkScanViewSettings.viewSettingsDefaults.zoomFactorIn;
        this.inactiveStateTimeout = SparkScanViewSettings.viewSettingsDefaults.inactiveStateTimeout;
        this.defaultCameraPosition = SparkScanViewSettings.viewSettingsDefaults.defaultCameraPosition;
        this.defaultMiniPreviewSize = SparkScanViewSettings.viewSettingsDefaults.defaultMiniPreviewSize;
        this.smartSelectionCandidateBrush = null;
    }
    scanModeFromJSON(json) {
        const scanningBehavior = json.settings.scanningBehavior;
        const previewBehavior = json.settings.previewBehavior;
        if (json.type === 'default') {
            return new SparkScanScanningModeDefault(scanningBehavior, previewBehavior);
        }
        else {
            return new SparkScanScanningModeTarget(scanningBehavior, previewBehavior);
        }
    }
    static get sparkScanDefaults() {
        return getSparkScanDefaults();
    }
    static get viewSettingsDefaults() {
        return SparkScanViewSettings.sparkScanDefaults.SparkScanView.SparkScanViewSettings;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], SparkScanViewSettings, "sparkScanDefaults", null);

exports.SparkScanViewState = void 0;
(function (SparkScanViewState) {
    SparkScanViewState["Initial"] = "initial";
    SparkScanViewState["Idle"] = "idle";
    SparkScanViewState["Inactive"] = "inactive";
    SparkScanViewState["Active"] = "active";
    SparkScanViewState["Error"] = "error";
})(exports.SparkScanViewState || (exports.SparkScanViewState = {}));

class ScanItemIdentifier extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static fromJSON(definitionId) {
        const scanItemIdentifier = new ScanItemIdentifier();
        scanItemIdentifier.identifier = definitionId;
        return scanItemIdentifier;
    }
    constructor() {
        super();
        this.identifier = scanditDatacaptureFrameworksCore.generateIdentifier();
    }
}

class ScannedItemIdentifier {
    static fromJSON(identifier) {
        const scannedItemIdentifier = new ScannedItemIdentifier();
        scannedItemIdentifier._identifier = identifier;
        return scannedItemIdentifier;
    }
    constructor() {
        this._identifier = scanditDatacaptureFrameworksCore.generateIdentifier();
    }
}

class ScannedComponentIdentifier {
    static fromJSON(identifier) {
        const scannedComponentIdentifier = new ScannedComponentIdentifier();
        scannedComponentIdentifier._identifier = identifier;
        return scannedComponentIdentifier;
    }
    constructor() {
        this._identifier = scanditDatacaptureFrameworksCore.generateIdentifier();
    }
}

class BarcodeIdentifier extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor() {
        super();
        this.identifier = scanditDatacaptureFrameworksCore.generateIdentifier();
    }
    static fromJSON(definitionId) {
        const barcodeIdentifier = new BarcodeIdentifier();
        barcodeIdentifier.identifier = definitionId;
        return barcodeIdentifier;
    }
}

class TextIdentifier extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor() {
        super();
        this.identifier = scanditDatacaptureFrameworksCore.generateIdentifier();
    }
    static fromJSON(identifier) {
        const textIdentifier = new TextIdentifier();
        textIdentifier.identifier = identifier;
        return textIdentifier;
    }
}

class ScanItemDefinition extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor(identifier, components) {
        super();
        this._scanItemIdentifier = identifier;
        this._identifier = identifier['identifier'];
        this._components = components;
    }
    get identifier() {
        return this._scanItemIdentifier;
    }
    get components() {
        return this._components;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], ScanItemDefinition.prototype, "_scanItemIdentifier", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('identifier')
], ScanItemDefinition.prototype, "_identifier", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('components')
], ScanItemDefinition.prototype, "_components", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], ScanItemDefinition.prototype, "onScan", void 0);

class ScannedBarcode {
    constructor(identifier, definitionIdentifier, location, symbology, payloadString, addOnPayloadString, compositePayloadString, isGS1DataCarrier, compositeFlag, isColorInverted, symbolCount, frameId, isStructuredAppend) {
        this._identifier = identifier;
        this._definitionIdentifier = definitionIdentifier;
        this._location = location;
        this._symbology = symbology;
        this._payloadString = payloadString;
        this._addOnPayloadString = addOnPayloadString;
        this._compositePayloadString = compositePayloadString;
        this._isGS1DataCarrier = isGS1DataCarrier;
        this._compositeFlag = compositeFlag;
        this._isColorInverted = isColorInverted;
        this._symbolCount = symbolCount;
        this._frameId = frameId;
        this._isStructuredAppend = isStructuredAppend;
    }
    get identifier() {
        return this._identifier;
    }
    get definitionIdentifier() {
        return this._definitionIdentifier;
    }
    get location() {
        return this._location;
    }
    get symbology() {
        return this._symbology;
    }
    get payloadString() {
        return this._payloadString;
    }
    get addOnPayloadString() {
        return this._addOnPayloadString;
    }
    get compositePayloadString() {
        return this._compositePayloadString;
    }
    get isGS1DataCarrier() {
        return this._isGS1DataCarrier;
    }
    get compositeFlag() {
        return this._compositeFlag;
    }
    get isColorInverted() {
        return this._isColorInverted;
    }
    get symbolCount() {
        return this._symbolCount;
    }
    get frameId() {
        return this._frameId;
    }
    get isStructuredAppend() {
        return this._isStructuredAppend;
    }
    static fromJSON(json) {
        return new ScannedBarcode(ScannedComponentIdentifier.fromJSON(json.identifier), BarcodeIdentifier.fromJSON(json.definitionId), scanditDatacaptureFrameworksCore.Quadrilateral.fromJSON(json.location), json.symbology, json.payloadString, json.addOnPayloadString, json.compositePayloadString, json.isGS1DataCarrier, json.compositeFlag, json.isColorInverted, json.symbolCount, json.frameId, json.isStructuredAppend);
    }
}

class ScannedText {
    constructor(identifier, definitionIdentifier, location, text) {
        this._identifier = identifier;
        this._definitionIdentifier = definitionIdentifier;
        this._location = location;
        this._text = text;
    }
    get identifier() {
        return this._identifier;
    }
    get definitionIdentifier() {
        return this._definitionIdentifier;
    }
    get location() {
        return this._location;
    }
    get text() {
        return this._text;
    }
    static fromJSON(json) {
        return new ScannedText(ScannedComponentIdentifier.fromJSON(json.identifier), TextIdentifier.fromJSON(json.definitionId), scanditDatacaptureFrameworksCore.Quadrilateral.fromJSON(json.location), json.text);
    }
}

class ScannedItem {
    static fromJSON(json) {
        const identifier = json.identifier ? ScannedItemIdentifier.fromJSON(json.identifier) : null;
        const definitionIdentifier = json.definitionId ? ScanItemIdentifier.fromJSON(json.definitionId) : null;
        const components = json.components.map((componentJson) => {
            if (componentJson.type === 'barcode') {
                return ScannedBarcode.fromJSON(Object.assign(Object.assign({}, componentJson.barcode), { identifier: componentJson.identifier, definitionId: componentJson.definitionId, location: componentJson.location }));
            }
            else if (componentJson.type === 'text') {
                return ScannedText.fromJSON(Object.assign(Object.assign({}, componentJson.text), { identifier: componentJson.identifier, definitionId: componentJson.definitionId, location: componentJson.location }));
            }
            else {
                throw new Error('Invalid component JSON');
            }
        });
        return new ScannedItem(identifier, definitionIdentifier, components);
    }
    constructor(identifier, definitionIdentifier, components) {
        this._identifier = identifier;
        this._definitionIdentifier = definitionIdentifier;
        this._components = components;
    }
    get identifier() {
        return this._identifier;
    }
    get definitionIdentifier() {
        return this._definitionIdentifier;
    }
    get components() {
        return this._components;
    }
    barcodeForIdentifier(identifier) {
        const component = this._components.find(c => c.definitionIdentifier instanceof BarcodeIdentifier && c.definitionIdentifier['identifier'] === identifier['identifier']);
        return component instanceof ScannedBarcode ? component : null;
    }
    textForIdentifier(identifier) {
        const component = this._components.find(c => c.definitionIdentifier instanceof TextIdentifier && c.definitionIdentifier['identifier'] === identifier['identifier']);
        return component instanceof ScannedText ? component : null;
    }
}

exports.ScanComponentTextSemanticType = void 0;
(function (ScanComponentTextSemanticType) {
    ScanComponentTextSemanticType["Custom"] = "custom";
    ScanComponentTextSemanticType["ExpiryDate"] = "expiryDate";
    ScanComponentTextSemanticType["PackingDate"] = "packingDate";
    ScanComponentTextSemanticType["TotalPrice"] = "totalPrice";
    ScanComponentTextSemanticType["UnitPrice"] = "unitPrice";
    ScanComponentTextSemanticType["Weight"] = "weight";
})(exports.ScanComponentTextSemanticType || (exports.ScanComponentTextSemanticType = {}));

class TextDefinitionBuilder {
    constructor(identifier) {
        this.textDefinition = new TextDefinition(identifier);
    }
    setOptional(optional) {
        this.textDefinition.optional = optional;
        return this;
    }
    setSemantics(semantics) {
        this.textDefinition.semantics = semantics;
        return this;
    }
    setLocation(location) {
        this.textDefinition.location = location;
        return this;
    }
    setHiddenProperties(hiddenProperties) {
        this.textDefinition.hiddenProperties = hiddenProperties;
        return this;
    }
    setValueRegexes(valueRegexes) {
        this.textDefinition.valueRegexes = valueRegexes;
        return this;
    }
    setAnchorRegexes(anchorRegexes) {
        this.textDefinition.anchorRegexes = anchorRegexes;
        return this;
    }
    build() {
        return this.textDefinition;
    }
}

class TextDefinition extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static builder(identifier) {
        return new TextDefinitionBuilder(identifier);
    }
    constructor(identifier) {
        super();
        this.type = "text";
        this._textIdentifier = new TextIdentifier();
        this._location = null;
        this._optional = false;
        this._semantics = null;
        this._hiddenProperties = null;
        this._valueRegexes = [];
        this._anchorRegexes = [];
        this._mandatoryInstances = 1;
        this._textIdentifier = identifier;
        this._identifier = identifier['identifier'];
    }
    get identifier() {
        return this._textIdentifier;
    }
    get location() {
        return this._location;
    }
    set location(value) {
        this._location = value;
    }
    get optional() {
        return this._optional;
    }
    set optional(value) {
        this._optional = value;
        this._mandatoryInstances = value ? 0 : 1;
    }
    get semantics() {
        return this._semantics;
    }
    set semantics(value) {
        this._semantics = value;
    }
    get hiddenProperties() {
        return this._hiddenProperties || '';
    }
    set hiddenProperties(value) {
        this._hiddenProperties = value;
    }
    get valueRegexes() {
        return this._valueRegexes;
    }
    set valueRegexes(value) {
        this._valueRegexes = value;
    }
    get anchorRegexes() {
        return this._anchorRegexes;
    }
    set anchorRegexes(value) {
        this._anchorRegexes = value;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], TextDefinition.prototype, "_textIdentifier", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('identifier')
], TextDefinition.prototype, "_identifier", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('location')
], TextDefinition.prototype, "_location", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('optional')
], TextDefinition.prototype, "_optional", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('semanticType')
], TextDefinition.prototype, "_semantics", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('hiddenProperties'),
    scanditDatacaptureFrameworksCore.ignoreFromSerializationIfNull
], TextDefinition.prototype, "_hiddenProperties", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('valueRegexes')
], TextDefinition.prototype, "_valueRegexes", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('anchorRegexes')
], TextDefinition.prototype, "_anchorRegexes", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('mandatoryInstances')
], TextDefinition.prototype, "_mandatoryInstances", void 0);

class BarcodeDefinitionBuilder {
    constructor(identifier) {
        this.symbologies = new Set();
        this.optional = false;
        this.preset = null;
        this.location = null;
        this.hiddenProperties = null;
        this.valueRegexes = [];
        this.anchorRegexes = [];
        this.identifier = identifier;
    }
    setOptional(optional) {
        this.optional = optional;
        return this;
    }
    setSymbologies(symbologies) {
        this.symbologies = symbologies;
        return this;
    }
    setPreset(preset) {
        this.preset = preset;
        return this;
    }
    setLocation(location) {
        this.location = location;
        return this;
    }
    setHiddenProperties(hiddenProperties) {
        this.hiddenProperties = hiddenProperties;
        return this;
    }
    setValueRegexes(valueRegexes) {
        this.valueRegexes = valueRegexes;
        return this;
    }
    setAnchorRegexes(anchorRegexes) {
        this.anchorRegexes = anchorRegexes;
        return this;
    }
    build() {
        const definition = new BarcodeDefinition(this.identifier, this.symbologies);
        definition.optional = this.optional;
        definition.preset = this.preset;
        definition.location = this.location;
        definition.hiddenProperties = this.hiddenProperties;
        definition.valueRegexes = this.valueRegexes;
        definition.anchorRegexes = this.anchorRegexes;
        return definition;
    }
}

class BarcodeDefinition extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static builder(identifier) {
        return new BarcodeDefinitionBuilder(identifier);
    }
    get identifier() {
        return this._barcodeIdentifier;
    }
    get symbologies() {
        return new Set(this._symbologiesArray);
    }
    get optional() {
        return this._optional;
    }
    set optional(value) {
        this._optional = value;
        this._mandatoryInstances = value ? 0 : 1;
    }
    constructor(identifier, symbologies) {
        super();
        this.location = null;
        this.preset = null;
        this.hiddenProperties = null;
        this.valueRegexes = [];
        this.anchorRegexes = [];
        this.type = "barcode";
        this._optional = false;
        this._mandatoryInstances = 1;
        this._barcodeIdentifier = identifier;
        this._identifier = identifier['identifier'];
        this._symbologiesArray = Array.from(symbologies);
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerializationIfNull
], BarcodeDefinition.prototype, "hiddenProperties", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeDefinition.prototype, "_barcodeIdentifier", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('identifier')
], BarcodeDefinition.prototype, "_identifier", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('symbologies')
], BarcodeDefinition.prototype, "_symbologiesArray", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('optional')
], BarcodeDefinition.prototype, "_optional", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('mandatoryInstances')
], BarcodeDefinition.prototype, "_mandatoryInstances", void 0);

exports.ScanComponentBarcodePreset = void 0;
(function (ScanComponentBarcodePreset) {
    ScanComponentBarcodePreset["CustomBarcode"] = "customBarcode";
    ScanComponentBarcodePreset["ImeiOneBarcode"] = "imeiOneBarcode";
    ScanComponentBarcodePreset["ImeiTwoBarcode"] = "imeiTwoBarcode";
    ScanComponentBarcodePreset["PartNumberBarcode"] = "partNumberBarcode";
    ScanComponentBarcodePreset["SerialNumberBarcode"] = "serialNumberBarcode";
})(exports.ScanComponentBarcodePreset || (exports.ScanComponentBarcodePreset = {}));

class InternalSparkScanSession extends SparkScanSession {
    get frameId() {
        return this._frameId;
    }
    constructor(newlyRecognizedBarcode, frameSequenceID, allScannedItems, newlyRecognizedItems, frameId, controller) {
        super(newlyRecognizedBarcode, frameSequenceID, allScannedItems, newlyRecognizedItems, controller);
        this._frameId = frameId;
    }
    static fromJSON(controller, json) {
        var _a;
        const sessionJson = JSON.parse(json.session);
        return new InternalSparkScanSession(sessionJson.newlyRecognizedBarcode != null
            ? Barcode.fromJSON(sessionJson.newlyRecognizedBarcode)
            : null, sessionJson.frameSequenceId, (sessionJson.allItems || []).map((item) => ScannedItem.fromJSON(item)), (sessionJson.newItems || []).map((item) => ScannedItem.fromJSON(item)), (_a = json.frameId) !== null && _a !== void 0 ? _a : '', controller);
    }
}

var SparkScanViewEvents;
(function (SparkScanViewEvents) {
    SparkScanViewEvents["barcodeFindButtonTapped"] = "SparkScanViewUiListener.barcodeFindButtonTapped";
    SparkScanViewEvents["barcodeCountButtonTapped"] = "SparkScanViewUiListener.barcodeCountButtonTapped";
    SparkScanViewEvents["labelCaptureButtonTapped"] = "SparkScanViewUiListener.labelCaptureButtonTapped";
    SparkScanViewEvents["didChangeViewState"] = "SparkScanViewUiListener.didChangeViewState";
    SparkScanViewEvents["feedbackForBarcode"] = "SparkScanFeedbackDelegate.feedbackForBarcode";
    SparkScanViewEvents["didUpdateSession"] = "SparkScanListener.didUpdateSession";
    SparkScanViewEvents["didScan"] = "SparkScanListener.didScan";
})(SparkScanViewEvents || (SparkScanViewEvents = {}));
class SparkScanViewController extends scanditDatacaptureFrameworksCore.BaseController {
    static forSparkScanView(view, sparkScan) {
        const controller = new SparkScanViewController(view, sparkScan);
        void controller.initialize();
        return controller;
    }
    constructor(view, sparkScan) {
        super('SparkScanViewProxy');
        this.hasFeedbackDelegateListener = false;
        this.hasNativeViewListenerSubscriptions = false;
        this.hasNativeModeListenerSubscriptions = false;
        this.viewInstanceId = -1;
        this.handleFeedbackForBarcodeWrapper = (ev) => {
            return this.handleFeedbackForBarcode(ev);
        };
        this.didUpdateSessionListenerWrapper = (ev) => {
            return this.didUpdateSessionListener(ev);
        };
        this.didScanListenerWrapper = (ev) => {
            return this.didScanListener(ev);
        };
        this.barcodeCountButtonTappedListenerWrapper = (ev) => {
            return this.barcodeCountButtonTappedListener(ev);
        };
        this.barcodeFindButtonTappedListenerWrapper = (ev) => {
            return this.barcodeFindButtonTappedListener(ev);
        };
        this.labelCaptureButtonTappedListenerWrapper = (ev) => {
            return this.labelCaptureButtonTappedListener(ev);
        };
        this.didChangeViewStateListenerWrapper = (ev) => {
            return this.didChangeViewStateListener(ev);
        };
        this.view = view;
        this.sparkScan = sparkScan;
        this.sparkScan['controller'] = this;
    }
    dispose() {
        void this.unsubscribeModeListener();
        void this.unsubscribeViewListeners();
        void this.removeFeedbackDelegate();
        void this._proxy.$disposeSparkScanView({ viewId: this.viewInstanceId });
        this._proxy.dispose();
    }
    subscribeViewListeners() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated || this.hasNativeViewListenerSubscriptions)
                return;
            this._proxy.subscribeForEvents([
                SparkScanViewEvents.barcodeFindButtonTapped,
                SparkScanViewEvents.barcodeCountButtonTapped,
                SparkScanViewEvents.labelCaptureButtonTapped,
                SparkScanViewEvents.didChangeViewState,
            ]);
            this._proxy.eventEmitter.on(SparkScanViewEvents.barcodeFindButtonTapped, this.barcodeFindButtonTappedListenerWrapper);
            this._proxy.eventEmitter.on(SparkScanViewEvents.barcodeCountButtonTapped, this.barcodeCountButtonTappedListenerWrapper);
            this._proxy.eventEmitter.on(SparkScanViewEvents.labelCaptureButtonTapped, this.labelCaptureButtonTappedListenerWrapper);
            this._proxy.eventEmitter.on(SparkScanViewEvents.didChangeViewState, this.didChangeViewStateListenerWrapper);
            yield this._proxy.$$registerSparkScanViewListenerEvents({ viewId: this.viewInstanceId });
            this.hasNativeViewListenerSubscriptions = true;
        });
    }
    unsubscribeViewListeners() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated || !this.hasNativeViewListenerSubscriptions)
                return;
            this._proxy.eventEmitter.off(SparkScanViewEvents.barcodeFindButtonTapped, this.barcodeFindButtonTappedListenerWrapper);
            this._proxy.eventEmitter.off(SparkScanViewEvents.barcodeCountButtonTapped, this.barcodeCountButtonTappedListenerWrapper);
            this._proxy.eventEmitter.off(SparkScanViewEvents.labelCaptureButtonTapped, this.labelCaptureButtonTappedListenerWrapper);
            this._proxy.eventEmitter.off(SparkScanViewEvents.didChangeViewState, this.didChangeViewStateListenerWrapper);
            this._proxy.unsubscribeFromEvents([
                SparkScanViewEvents.barcodeFindButtonTapped,
                SparkScanViewEvents.barcodeCountButtonTapped,
                SparkScanViewEvents.labelCaptureButtonTapped,
                SparkScanViewEvents.didChangeViewState,
            ]);
            yield this._proxy.$unregisterSparkScanViewListenerEvents({ viewId: this.viewInstanceId });
            this.hasNativeViewListenerSubscriptions = false;
        });
    }
    createView() {
        return __awaiter$1(this, void 0, void 0, function* () {
            const viewJson = {
                SparkScan: this.sparkScan.toJSON(),
                SparkScanView: this.view.toJSON(),
            };
            const viewId = this.view.viewId;
            const json = JSON.stringify(viewJson);
            return this._proxy.$createSparkScanView({ viewId, viewJson: json }).then(() => __awaiter$1(this, void 0, void 0, function* () {
                this.viewInstanceId = viewId;
                return this.initialize();
            }));
        });
    }
    updateView() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return; // No updates if view not created yet
            }
            const sparkScanViewJson = this.view.toJSON();
            const json = JSON.stringify({ SparkScanView: sparkScanViewJson });
            yield this._proxy.$updateSparkScanView({ viewId: this.viewInstanceId, viewJson: json });
        });
    }
    stopScanning() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return; // No updates if view not created yet
            }
            yield this._proxy.$stopSparkScanViewScanning({ viewId: this.viewInstanceId });
        });
    }
    pauseScanning() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return; // No updates if view not created yet
            }
            yield this._proxy.$pauseSparkScanViewScanning({ viewId: this.viewInstanceId });
        });
    }
    startScanning() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return; // No updates if view not created yet
            }
            yield this._proxy.$startSparkScanViewScanning({ viewId: this.viewInstanceId });
        });
    }
    prepareScanning() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return; // No updates if view not created yet
            }
            yield this._proxy.$prepareSparkScanViewScanning({ viewId: this.viewInstanceId });
        });
    }
    onHostPause() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return; // No updates if view not created yet
            }
            yield this._proxy.$onHostPauseSparkScanView({ viewId: this.viewInstanceId });
        });
    }
    showToast(text) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return; // No updates if view not created yet
            }
            yield this._proxy.$showSparkScanViewToast({ viewId: this.viewInstanceId, text: text });
        });
    }
    showView() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return; // No updates if view not created yet
            }
            yield this._proxy.$showSparkScanView({ viewId: this.viewInstanceId });
        });
    }
    hideView() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return; // No updates if view not created yet
            }
            yield this._proxy.$hideSparkScanView({ viewId: this.viewInstanceId });
        });
    }
    addFeedbackDelegate() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated || this.hasFeedbackDelegateListener)
                return;
            this._proxy.subscribeForEvents([SparkScanViewEvents.feedbackForBarcode]);
            this._proxy.eventEmitter.on(SparkScanViewEvents.feedbackForBarcode, this.handleFeedbackForBarcodeWrapper);
            yield this._proxy.$$registerSparkScanFeedbackDelegateForEvents({ viewId: this.viewInstanceId });
            this.hasFeedbackDelegateListener = true;
        });
    }
    removeFeedbackDelegate() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated || !this.hasFeedbackDelegateListener)
                return;
            this._proxy.eventEmitter.off(SparkScanViewEvents.feedbackForBarcode, this.handleFeedbackForBarcodeWrapper);
            this._proxy.unsubscribeFromEvents([SparkScanViewEvents.feedbackForBarcode]);
            yield this._proxy.$unregisterSparkScanFeedbackDelegateForEvents({ viewId: this.viewInstanceId });
            this.hasFeedbackDelegateListener = false;
        });
    }
    resetSession() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return; // view not created yet
            }
            yield this._proxy.$resetSparkScanSession({ viewId: this.viewInstanceId });
        });
    }
    updateMode() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return; // No updates if view not created yet
            }
            const sparkScanJson = this.sparkScan.toJSON();
            const json = JSON.stringify(sparkScanJson);
            yield this._proxy.$updateSparkScanMode({ viewId: this.viewInstanceId, modeJson: json });
        });
    }
    subscribeModeListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated || this.hasNativeModeListenerSubscriptions)
                return;
            this._proxy.subscribeForEvents([SparkScanViewEvents.didUpdateSession, SparkScanViewEvents.didScan]);
            this._proxy.eventEmitter.on(SparkScanViewEvents.didUpdateSession, this.didUpdateSessionListenerWrapper);
            this._proxy.eventEmitter.on(SparkScanViewEvents.didScan, this.didScanListenerWrapper);
            yield this._proxy.$$registerSparkScanListenerForEvents({ viewId: this.viewInstanceId });
            this.hasNativeModeListenerSubscriptions = true;
        });
    }
    unsubscribeModeListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated || !this.hasNativeModeListenerSubscriptions)
                return;
            this._proxy.eventEmitter.off(SparkScanViewEvents.didUpdateSession, this.didUpdateSessionListenerWrapper);
            this._proxy.eventEmitter.off(SparkScanViewEvents.didScan, this.didScanListenerWrapper);
            this._proxy.unsubscribeFromEvents([SparkScanViewEvents.didUpdateSession, SparkScanViewEvents.didScan]);
            yield this._proxy.$unregisterSparkScanListenerForEvents({ viewId: this.viewInstanceId });
            this.hasNativeModeListenerSubscriptions = false;
        });
    }
    setModeEnabledState(enabled) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return; // view not created yet
            }
            yield this._proxy.$setSparkScanModeEnabledState({ viewId: this.viewInstanceId, isEnabled: enabled });
        });
    }
    initialize() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this.subscribeModeListener();
            if (this.view.uiListener) {
                yield this.subscribeViewListeners();
            }
            if (this.view.feedbackDelegate) {
                yield this.addFeedbackDelegate();
            }
        });
    }
    get isViewCreated() {
        return this.viewInstanceId !== -1;
    }
    handleFeedbackForBarcode(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a, _b;
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('SparkScanViewController feedbackForBarcode payload is null');
                return;
            }
            if (payload.viewId !== this.viewInstanceId) {
                return;
            }
            const barcode = Barcode['fromJSON'](JSON.parse(payload.barcode));
            const feedback = (_b = (_a = this.view.feedbackDelegate) === null || _a === void 0 ? void 0 : _a.feedbackForBarcode) === null || _b === void 0 ? void 0 : _b.call(_a, barcode);
            if (feedback instanceof Promise) {
                const actualFeedback = yield feedback;
                yield this._proxy.$submitSparkScanFeedbackForBarcode({
                    viewId: this.viewInstanceId,
                    feedbackJson: JSON.stringify(actualFeedback === null || actualFeedback === void 0 ? void 0 : actualFeedback.toJSON()),
                });
            }
            else {
                yield this._proxy.$submitSparkScanFeedbackForBarcode({
                    viewId: this.viewInstanceId,
                    feedbackJson: JSON.stringify(feedback === null || feedback === void 0 ? void 0 : feedback.toJSON()),
                });
            }
        });
    }
    didUpdateSessionListener(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('SparkScanListenerController didUpdateSession payload is null');
                return;
            }
            if (payload.viewId !== this.viewInstanceId) {
                return;
            }
            const session = InternalSparkScanSession.fromJSON(this, payload);
            yield this.notifyListenersOfDidUpdateSession(session);
            yield this._proxy.$finishSparkScanDidUpdateSession({ viewId: this.viewInstanceId, isEnabled: this.sparkScan.isEnabled });
        });
    }
    notifyListenersOfDidUpdateSession(session) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const mode = this.sparkScan;
            mode.isInListenerCallback = true;
            for (const listener of mode.listeners) {
                if (listener.didUpdateSession) {
                    yield listener.didUpdateSession(this.sparkScan, session, () => scanditDatacaptureFrameworksCore.CameraController.getFrameOrNull(session['frameId']));
                }
            }
        });
    }
    didScanListener(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('SparkScanListenerController.subscribeListener: didScan payload is null');
                return;
            }
            if (payload.viewId !== this.viewInstanceId) {
                return;
            }
            const session = InternalSparkScanSession.fromJSON(this, payload);
            yield this.notifyListenersOfDidScan(session);
            const settings = this.sparkScan.settings;
            if (session.newlyRecognizedItems && settings.itemDefinitions) {
                // If there are new recognized items, and if there are defintions for them
                for (const definition of settings.itemDefinitions || []) {
                    if (definition.onScan === undefined) {
                        continue;
                    }
                    const recognizedItems = session.newlyRecognizedItems.filter(item => item.definitionIdentifier && item.definitionIdentifier['identifier'] === definition.identifier['identifier']);
                    // For each of the recognized items, call the onScan callback
                    if (recognizedItems.length > 0) {
                        for (const recognizedItem of recognizedItems) {
                            definition.onScan(recognizedItem);
                        }
                    }
                }
            }
            return this._proxy.$finishSparkScanDidScan({ viewId: this.viewInstanceId, isEnabled: this.sparkScan.isEnabled });
        });
    }
    notifyListenersOfDidScan(session) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const mode = this.sparkScan;
            mode.isInListenerCallback = true;
            for (const listener of mode['listeners']) {
                if (listener.didScan) {
                    yield listener.didScan(this.sparkScan, session, () => scanditDatacaptureFrameworksCore.CameraController.getFrameOrNull(session.frameId));
                }
            }
        });
    }
    barcodeCountButtonTappedListener(ev) {
        var _a, _b;
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            return;
        }
        if (payload.viewId !== this.viewInstanceId) {
            return;
        }
        (_b = (_a = this.view.uiListener) === null || _a === void 0 ? void 0 : _a.didTapBarcodeCountButton) === null || _b === void 0 ? void 0 : _b.call(_a, this.view);
    }
    barcodeFindButtonTappedListener(ev) {
        var _a, _b;
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            return;
        }
        if (payload.viewId !== this.viewInstanceId) {
            return;
        }
        (_b = (_a = this.view.uiListener) === null || _a === void 0 ? void 0 : _a.didTapBarcodeFindButton) === null || _b === void 0 ? void 0 : _b.call(_a, this.view);
    }
    labelCaptureButtonTappedListener(ev) {
        var _a, _b;
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            return;
        }
        if (payload.viewId !== this.viewInstanceId) {
            return;
        }
        (_b = (_a = this.view.uiListener) === null || _a === void 0 ? void 0 : _a.didTapLabelCaptureButton) === null || _b === void 0 ? void 0 : _b.call(_a, this.view);
    }
    didChangeViewStateListener(ev) {
        var _a, _b;
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('SparkScanViewController didChangeViewState payload is null');
            return;
        }
        if (payload.viewId !== this.viewInstanceId) {
            return;
        }
        const newState = payload.state;
        (_b = (_a = this.view.uiListener) === null || _a === void 0 ? void 0 : _a.didChangeViewState) === null || _b === void 0 ? void 0 : _b.call(_a, newState);
    }
}

class BaseSparkScanView {
    get viewId() {
        return this._viewId;
    }
    get uiListener() {
        return this._uiListener;
    }
    set uiListener(listener) {
        this._uiListener = listener;
        if (listener) {
            void this._controller.subscribeViewListeners();
        }
        else {
            void this._controller.unsubscribeViewListeners();
        }
    }
    static withProps(props) {
        const view = new BaseSparkScanView({
            context: props.context,
            sparkScan: props.sparkScan,
            settings: props.sparkScanViewSettings,
        });
        if (props.shouldHandleAndroidLifecycleAutomatically !== undefined && props.shouldHandleAndroidLifecycleAutomatically !== null) {
            view.shouldHandleAndroidLifecycleAutomatically = props.shouldHandleAndroidLifecycleAutomatically;
        }
        if (props.uiListener) {
            view.uiListener = props.uiListener;
        }
        if (props.previewSizeControlVisible !== undefined && props.previewSizeControlVisible !== null) {
            view._previewSizeControlVisible = props.previewSizeControlVisible;
        }
        if (props.cameraSwitchButtonVisible !== undefined && props.cameraSwitchButtonVisible !== null) {
            view._cameraSwitchButtonVisible = props.cameraSwitchButtonVisible;
        }
        if (props.scanningBehaviorButtonVisible !== undefined && props.scanningBehaviorButtonVisible !== null) {
            view._scanningBehaviorButtonVisible = props.scanningBehaviorButtonVisible;
        }
        if (props.barcodeCountButtonVisible !== undefined && props.barcodeCountButtonVisible !== null) {
            view._barcodeCountButtonVisible = props.barcodeCountButtonVisible;
        }
        if (props.barcodeFindButtonVisible !== undefined && props.barcodeFindButtonVisible !== null) {
            view._barcodeFindButtonVisible = props.barcodeFindButtonVisible;
        }
        if (props.targetModeButtonVisible !== undefined && props.targetModeButtonVisible !== null) {
            view._targetModeButtonVisible = props.targetModeButtonVisible;
        }
        if (props.labelCaptureButtonVisible !== undefined && props.labelCaptureButtonVisible !== null) {
            view._labelCaptureButtonVisible = props.labelCaptureButtonVisible;
        }
        if (props.torchControlVisible !== undefined && props.torchControlVisible !== null) {
            view._torchControlVisible = props.torchControlVisible;
        }
        if (props.previewCloseControlVisible !== undefined && props.previewCloseControlVisible !== null) {
            view._previewCloseControlVisible = props.previewCloseControlVisible;
        }
        if (props.triggerButtonVisible !== undefined) {
            view._triggerButtonVisible = props.triggerButtonVisible;
        }
        if (props.triggerButtonImage !== undefined) {
            view._triggerButtonImage = props.triggerButtonImage;
        }
        if (props.triggerButtonTintColor !== undefined) {
            view._triggerButtonTintColor = props.triggerButtonTintColor;
        }
        if (props.triggerButtonAnimationColor !== undefined) {
            view._triggerButtonAnimationColor = props.triggerButtonAnimationColor;
        }
        if (props.triggerButtonExpandedColor !== undefined) {
            view._triggerButtonExpandedColor = props.triggerButtonExpandedColor;
        }
        if (props.triggerButtonCollapsedColor !== undefined) {
            view._triggerButtonCollapsedColor = props.triggerButtonCollapsedColor;
        }
        if (props.toolbarBackgroundColor !== undefined) {
            view._toolbarBackgroundColor = props.toolbarBackgroundColor;
        }
        if (props.toolbarIconActiveTintColor !== undefined) {
            view._toolbarIconActiveTintColor = props.toolbarIconActiveTintColor;
        }
        if (props.toolbarIconInactiveTintColor !== undefined) {
            view._toolbarIconInactiveTintColor = props.toolbarIconInactiveTintColor;
        }
        if (props.feedbackDelegate !== undefined) {
            view.feedbackDelegate = props.feedbackDelegate;
        }
        return view;
    }
    static get defaultBrush() {
        return BaseSparkScanView.sparkScanDefaults.SparkScanView.brush;
    }
    constructor({ context, sparkScan, settings }) {
        this._feedbackDelegate = null;
        this.shouldHandleAndroidLifecycleAutomatically = true;
        this._viewId = -1; // -1 means the view is not created yet
        this._uiListener = null;
        this._brush = BaseSparkScanView.defaultBrush;
        this._previewSizeControlVisible = BaseSparkScanView.sparkScanDefaults.SparkScanView.previewSizeControlVisible;
        this._cameraSwitchButtonVisible = BaseSparkScanView.sparkScanDefaults.SparkScanView.cameraSwitchButtonVisible;
        this._scanningBehaviorButtonVisible = BaseSparkScanView.sparkScanDefaults.SparkScanView.scanningBehaviorButtonVisible;
        this._barcodeCountButtonVisible = BaseSparkScanView.sparkScanDefaults.SparkScanView.barcodeCountButtonVisible;
        this._barcodeFindButtonVisible = BaseSparkScanView.sparkScanDefaults.SparkScanView.barcodeFindButtonVisible;
        this._targetModeButtonVisible = BaseSparkScanView.sparkScanDefaults.SparkScanView.targetModeButtonVisible;
        this._labelCaptureButtonVisible = BaseSparkScanView.sparkScanDefaults.SparkScanView.labelCaptureButtonVisible;
        this._toolbarBackgroundColor = BaseSparkScanView.sparkScanDefaults.SparkScanView.toolbarBackgroundColor;
        this._toolbarIconActiveTintColor = BaseSparkScanView.sparkScanDefaults.SparkScanView.toolbarIconActiveTintColor;
        this._toolbarIconInactiveTintColor = BaseSparkScanView.sparkScanDefaults.SparkScanView.toolbarIconInactiveTintColor;
        this._triggerButtonAnimationColor = BaseSparkScanView.sparkScanDefaults.SparkScanView.triggerButtonAnimationColor;
        this._triggerButtonExpandedColor = BaseSparkScanView.sparkScanDefaults.SparkScanView.triggerButtonExpandedColor;
        this._triggerButtonCollapsedColor = BaseSparkScanView.sparkScanDefaults.SparkScanView.triggerButtonCollapsedColor;
        this._triggerButtonTintColor = BaseSparkScanView.sparkScanDefaults.SparkScanView.triggerButtonTintColor;
        this._triggerButtonVisible = BaseSparkScanView.sparkScanDefaults.SparkScanView.triggerButtonVisible;
        this._triggerButtonImage = BaseSparkScanView.sparkScanDefaults.SparkScanView.triggerButtonImage;
        this._torchControlVisible = BaseSparkScanView.sparkScanDefaults.SparkScanView.torchControlVisible;
        this._previewCloseControlVisible = BaseSparkScanView.sparkScanDefaults.SparkScanView.previewSizeControlVisible;
        this._sparkScan = sparkScan;
        this.context = context;
        this._viewSettings = settings !== null && settings !== void 0 ? settings : new SparkScanViewSettings();
        this._controller = SparkScanViewController.forSparkScanView(this, sparkScan);
    }
    get previewSizeControlVisible() {
        return this._previewSizeControlVisible;
    }
    set previewSizeControlVisible(newValue) {
        this._previewSizeControlVisible = newValue;
        void this.update();
    }
    get torchControlVisible() {
        return this._torchControlVisible;
    }
    set torchControlVisible(newValue) {
        this._torchControlVisible = newValue;
        void this.update();
    }
    get previewCloseControlVisible() {
        return this._previewCloseControlVisible;
    }
    set previewCloseControlVisible(newValue) {
        this._previewCloseControlVisible = newValue;
        void this.update();
    }
    get scanningBehaviorButtonVisible() {
        return this._scanningBehaviorButtonVisible;
    }
    set scanningBehaviorButtonVisible(newValue) {
        this._scanningBehaviorButtonVisible = newValue;
        void this.update();
    }
    get barcodeCountButtonVisible() {
        return this._barcodeCountButtonVisible;
    }
    set barcodeCountButtonVisible(newValue) {
        this._barcodeCountButtonVisible = newValue;
        void this.update();
    }
    get barcodeFindButtonVisible() {
        return this._barcodeFindButtonVisible;
    }
    set barcodeFindButtonVisible(newValue) {
        this._barcodeFindButtonVisible = newValue;
        void this.update();
    }
    get targetModeButtonVisible() {
        return this._targetModeButtonVisible;
    }
    set targetModeButtonVisible(newValue) {
        this._targetModeButtonVisible = newValue;
        void this.update();
    }
    get labelCaptureButtonVisible() {
        return this._labelCaptureButtonVisible;
    }
    set labelCaptureButtonVisible(newValue) {
        this._labelCaptureButtonVisible = newValue;
        void this.update();
    }
    get toolbarBackgroundColor() {
        return this._toolbarBackgroundColor;
    }
    set toolbarBackgroundColor(newValue) {
        this._toolbarBackgroundColor = newValue;
        void this.update();
    }
    get toolbarIconActiveTintColor() {
        return this._toolbarIconActiveTintColor;
    }
    set toolbarIconActiveTintColor(newValue) {
        this._toolbarIconActiveTintColor = newValue;
        void this.update();
    }
    get toolbarIconInactiveTintColor() {
        return this._toolbarIconInactiveTintColor;
    }
    set toolbarIconInactiveTintColor(newValue) {
        this._toolbarIconInactiveTintColor = newValue;
        void this.update();
    }
    get cameraSwitchButtonVisible() {
        return this._cameraSwitchButtonVisible;
    }
    set cameraSwitchButtonVisible(newValue) {
        this._cameraSwitchButtonVisible = newValue;
        void this.update();
    }
    get triggerButtonAnimationColor() {
        return this._triggerButtonAnimationColor;
    }
    set triggerButtonAnimationColor(newValue) {
        this._triggerButtonAnimationColor = newValue;
        void this.update();
    }
    get triggerButtonExpandedColor() {
        return this._triggerButtonExpandedColor;
    }
    set triggerButtonExpandedColor(newValue) {
        this._triggerButtonExpandedColor = newValue;
        void this.update();
    }
    get triggerButtonCollapsedColor() {
        return this._triggerButtonCollapsedColor;
    }
    set triggerButtonCollapsedColor(newValue) {
        this._triggerButtonCollapsedColor = newValue;
        void this.update();
    }
    get triggerButtonTintColor() {
        return this._triggerButtonTintColor;
    }
    set triggerButtonTintColor(newValue) {
        this._triggerButtonTintColor = newValue;
        void this.update();
    }
    get triggerButtonImage() {
        return this._triggerButtonImage;
    }
    set triggerButtonImage(newValue) {
        this._triggerButtonImage = newValue;
        void this.update();
    }
    get triggerButtonVisible() {
        return this._triggerButtonVisible;
    }
    set triggerButtonVisible(newValue) {
        this._triggerButtonVisible = newValue;
        void this.update();
    }
    showToast(text) {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this._controller.showToast(text);
        });
    }
    prepareScanning() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this._controller.prepareScanning();
        });
    }
    startScanning() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this._controller.startScanning();
        });
    }
    pauseScanning() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this._controller.pauseScanning();
        });
    }
    stopScanning() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this._controller.stopScanning();
        });
    }
    onHostPause() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this._controller.onHostPause();
        });
    }
    dispose() {
        this._controller.dispose();
    }
    show() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this._show();
        });
    }
    hide() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this._hide();
        });
    }
    createNativeView(viewId) {
        return __awaiter$1(this, void 0, void 0, function* () {
            this._viewId = viewId;
            yield this._controller.createView();
        });
    }
    get feedbackDelegate() {
        return this._feedbackDelegate;
    }
    set feedbackDelegate(delegate) {
        if (this._feedbackDelegate === delegate) {
            return;
        }
        if (this._feedbackDelegate) {
            void this._controller.removeFeedbackDelegate();
        }
        this._feedbackDelegate = delegate;
        if (delegate) {
            void this._controller.addFeedbackDelegate();
        }
    }
    updateWithProps(prevProps, props) {
        if (props.shouldHandleAndroidLifecycleAutomatically !== prevProps.shouldHandleAndroidLifecycleAutomatically &&
            props.shouldHandleAndroidLifecycleAutomatically !== undefined) {
            this.shouldHandleAndroidLifecycleAutomatically = props.shouldHandleAndroidLifecycleAutomatically;
        }
        // Update UI Listener
        if (props.uiListener !== prevProps.uiListener) {
            this.uiListener = props.uiListener || null;
        }
        // Update visibility controls
        if (props.previewSizeControlVisible !== prevProps.previewSizeControlVisible &&
            props.previewSizeControlVisible !== undefined) {
            this.previewSizeControlVisible = props.previewSizeControlVisible;
        }
        if (props.scanningBehaviorButtonVisible !== prevProps.scanningBehaviorButtonVisible &&
            props.scanningBehaviorButtonVisible !== undefined) {
            this.scanningBehaviorButtonVisible = props.scanningBehaviorButtonVisible;
        }
        if (props.barcodeCountButtonVisible !== prevProps.barcodeCountButtonVisible &&
            props.barcodeCountButtonVisible !== undefined) {
            this.barcodeCountButtonVisible = props.barcodeCountButtonVisible;
        }
        if (props.barcodeFindButtonVisible !== prevProps.barcodeFindButtonVisible &&
            props.barcodeFindButtonVisible !== undefined) {
            this.barcodeFindButtonVisible = props.barcodeFindButtonVisible;
        }
        if (props.targetModeButtonVisible !== prevProps.targetModeButtonVisible &&
            props.targetModeButtonVisible !== undefined) {
            this.targetModeButtonVisible = props.targetModeButtonVisible;
        }
        if (props.cameraSwitchButtonVisible !== prevProps.cameraSwitchButtonVisible &&
            props.cameraSwitchButtonVisible !== undefined) {
            this.cameraSwitchButtonVisible = props.cameraSwitchButtonVisible;
        }
        if (props.torchControlVisible !== prevProps.torchControlVisible &&
            props.torchControlVisible !== undefined) {
            this.torchControlVisible = props.torchControlVisible;
        }
        if (props.previewCloseControlVisible !== prevProps.previewCloseControlVisible &&
            props.previewCloseControlVisible !== undefined) {
            this.previewCloseControlVisible = props.previewCloseControlVisible;
        }
        if (props.triggerButtonVisible !== prevProps.triggerButtonVisible &&
            props.triggerButtonVisible !== undefined) {
            this.triggerButtonVisible = props.triggerButtonVisible;
        }
        // Update color customizations
        if (props.toolbarBackgroundColor !== prevProps.toolbarBackgroundColor &&
            props.toolbarBackgroundColor !== undefined) {
            this.toolbarBackgroundColor = props.toolbarBackgroundColor;
        }
        if (props.toolbarIconActiveTintColor !== prevProps.toolbarIconActiveTintColor &&
            props.toolbarIconActiveTintColor !== undefined) {
            this.toolbarIconActiveTintColor = props.toolbarIconActiveTintColor;
        }
        if (props.toolbarIconInactiveTintColor !== prevProps.toolbarIconInactiveTintColor &&
            props.toolbarIconInactiveTintColor !== undefined) {
            this.toolbarIconInactiveTintColor = props.toolbarIconInactiveTintColor;
        }
        if (props.triggerButtonAnimationColor !== prevProps.triggerButtonAnimationColor &&
            props.triggerButtonAnimationColor !== undefined) {
            this.triggerButtonAnimationColor = props.triggerButtonAnimationColor;
        }
        if (props.triggerButtonExpandedColor !== prevProps.triggerButtonExpandedColor &&
            props.triggerButtonExpandedColor !== undefined) {
            this.triggerButtonExpandedColor = props.triggerButtonExpandedColor;
        }
        if (props.triggerButtonCollapsedColor !== prevProps.triggerButtonCollapsedColor &&
            props.triggerButtonCollapsedColor !== undefined) {
            this.triggerButtonCollapsedColor = props.triggerButtonCollapsedColor;
        }
        if (props.triggerButtonTintColor !== prevProps.triggerButtonTintColor &&
            props.triggerButtonTintColor !== undefined) {
            this.triggerButtonTintColor = props.triggerButtonTintColor;
        }
        // Update image customizations
        if (props.triggerButtonImage !== prevProps.triggerButtonImage &&
            props.triggerButtonImage !== undefined) {
            this.triggerButtonImage = props.triggerButtonImage;
        }
        // Update feedback delegate
        if (props.feedbackDelegate !== prevProps.feedbackDelegate &&
            props.feedbackDelegate !== undefined) {
            this.feedbackDelegate = props.feedbackDelegate;
        }
    }
    toJSON() {
        var _a;
        const json = {
            brush: this._brush.toJSON(),
            scanningBehaviorButtonVisible: this.scanningBehaviorButtonVisible,
            barcodeCountButtonVisible: this.barcodeCountButtonVisible,
            barcodeFindButtonVisible: this.barcodeFindButtonVisible,
            targetModeButtonVisible: this.targetModeButtonVisible,
            labelCaptureButtonVisible: this.labelCaptureButtonVisible,
            toolbarBackgroundColor: this.toolbarBackgroundColor,
            toolbarIconActiveTintColor: this.toolbarIconActiveTintColor,
            toolbarIconInactiveTintColor: this.toolbarIconInactiveTintColor,
            hasFeedbackDelegate: this._feedbackDelegate != null,
            cameraSwitchButtonVisible: this.cameraSwitchButtonVisible,
            triggerButtonAnimationColor: this.triggerButtonAnimationColor,
            triggerButtonExpandedColor: this.triggerButtonExpandedColor,
            triggerButtonCollapsedColor: this.triggerButtonCollapsedColor,
            triggerButtonTintColor: this.triggerButtonTintColor,
            triggerButtonVisible: this.triggerButtonVisible,
            triggerButtonImage: this.triggerButtonImage,
            torchControlVisible: this.torchControlVisible,
            previewCloseControlVisible: this.previewCloseControlVisible,
            hasUiListener: this.uiListener !== null,
            viewId: this.viewId,
            shouldHandleAndroidLifecycleAutomatically: this.shouldHandleAndroidLifecycleAutomatically,
        };
        if (this._viewSettings != null) {
            json.viewSettings = (_a = this._viewSettings) === null || _a === void 0 ? void 0 : _a.toJSON();
        }
        return json;
    }
    update() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this._controller.updateView();
        });
    }
    _show() {
        if (!this.context) {
            throw new Error('There should be a context attached to a view that should be shown');
        }
        return this._controller.showView();
    }
    _hide() {
        if (!this.context) {
            throw new Error('There should be a context attached to a view that should be shown');
        }
        return this._controller.hideView();
    }
    static get sparkScanDefaults() {
        return getSparkScanDefaults();
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BaseSparkScanView.prototype, "_viewId", void 0);

class SparkScanBarcodeFeedback extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor() {
        super();
    }
}

class SparkScanBarcodeErrorFeedback extends SparkScanBarcodeFeedback {
    get message() {
        return this._barcodeFeedback.message;
    }
    get resumeCapturingDelay() {
        return this._barcodeFeedback.resumeCapturingDelay;
    }
    get visualFeedbackColor() {
        return this._barcodeFeedback.visualFeedbackColor;
    }
    get brush() {
        return this._barcodeFeedback.brush;
    }
    get feedback() {
        return this._barcodeFeedback.feedback;
    }
    static fromMessage(message, resumeCapturingDelay) {
        return new SparkScanBarcodeErrorFeedback(message, resumeCapturingDelay, SparkScanBarcodeErrorFeedback.sparkScanDefaults.Feedback.error.visualFeedbackColor, SparkScanBarcodeErrorFeedback.sparkScanDefaults.Feedback.error.brush, SparkScanBarcodeErrorFeedback.sparkScanDefaults.Feedback.error.feedbackDefault);
    }
    constructor(message, resumeCapturingDelay, visualFeedbackColor, brush, feedback) {
        super();
        this.type = 'error';
        this._barcodeFeedback = {
            message: message,
            resumeCapturingDelay: resumeCapturingDelay,
            visualFeedbackColor: visualFeedbackColor,
            brush: brush,
            feedback: feedback
        };
    }
    static get sparkScanDefaults() {
        return getSparkScanDefaults();
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('barcodeFeedback')
], SparkScanBarcodeErrorFeedback.prototype, "_barcodeFeedback", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], SparkScanBarcodeErrorFeedback, "sparkScanDefaults", null);

class SparkScanBarcodeSuccessFeedback extends SparkScanBarcodeFeedback {
    get visualFeedbackColor() {
        return this._barcodeFeedback.visualFeedbackColor;
    }
    get brush() {
        return this._barcodeFeedback.brush;
    }
    get feedback() {
        return this._barcodeFeedback.feedback;
    }
    static fromVisualFeedbackColor(visualFeedbackColor, brush, feedback) {
        const successFeedback = new SparkScanBarcodeSuccessFeedback();
        successFeedback._barcodeFeedback = {
            visualFeedbackColor: visualFeedbackColor,
            brush: brush,
            feedback: feedback
        };
        return successFeedback;
    }
    constructor() {
        super();
        this.type = 'success';
        this._barcodeFeedback = {
            visualFeedbackColor: SparkScanBarcodeSuccessFeedback.sparkScanDefaults.Feedback.success.visualFeedbackColor,
            brush: SparkScanBarcodeSuccessFeedback.sparkScanDefaults.Feedback.success.brush,
            feedback: SparkScanBarcodeSuccessFeedback.sparkScanDefaults.Feedback.success.feedbackDefault
        };
    }
    static get sparkScanDefaults() {
        return getSparkScanDefaults();
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('barcodeFeedback')
], SparkScanBarcodeSuccessFeedback.prototype, "_barcodeFeedback", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], SparkScanBarcodeSuccessFeedback, "sparkScanDefaults", null);

class BarcodePick extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get controller() {
        return this._controller;
    }
    set controller(newController) {
        this._controller = newController;
    }
    static get barcodePickDefaults() {
        return getBarcodePickDefaults();
    }
    static createRecommendedCameraSettings() {
        return new scanditDatacaptureFrameworksCore.CameraSettings(BarcodePick.barcodePickDefaults.RecommendedCameraSettings);
    }
    constructor(dataCaptureContext, settings, productProvider) {
        super();
        this.type = 'barcodePick';
        this.listeners = [];
        this._hasScanningListeners = false;
        this.modeListeners = [];
        this._hasListeners = false;
        this.isInListenerCallback = false;
        this._controller = null;
        this.privateContext = dataCaptureContext;
        this._settings = settings;
        this._productProvider = productProvider;
    }
    addScanningListener(listener) {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this.checkAndSubscribeScanningListeners();
            if (this.listeners.includes(listener)) {
                return;
            }
            this.listeners.push(listener);
            this._hasScanningListeners = this.listeners.length > 0;
        });
    }
    removeScanningListener(listener) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.listeners.includes(listener)) {
                return;
            }
            this.listeners.splice(this.listeners.indexOf(listener));
            yield this.checkAndUnsubscribeScanningListeners();
            this._hasScanningListeners = this.listeners.length > 0;
        });
    }
    addListener(listener) {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this.checkAndSubscribeListeners();
            if (this.modeListeners.includes(listener)) {
                return;
            }
            this.modeListeners.push(listener);
            this._hasListeners = this.modeListeners.length > 0;
        });
    }
    removeListener(listener) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.modeListeners.includes(listener)) {
                return;
            }
            this.modeListeners.splice(this.modeListeners.indexOf(listener));
            yield this.checkAndUnsubscribeListeners();
            this._hasListeners = this.modeListeners.length > 0;
        });
    }
    checkAndSubscribeScanningListeners() {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            if (this.listeners.length === 0) {
                return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.subscribeScanningListener();
            }
        });
    }
    checkAndUnsubscribeScanningListeners() {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            if (this.listeners.length === 0) {
                return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.unsubscribeScanningListener();
            }
        });
    }
    checkAndSubscribeListeners() {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            if (this.modeListeners.length === 0) {
                return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.subscribePickListener();
            }
        });
    }
    checkAndUnsubscribeListeners() {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            if (this.modeListeners.length === 0) {
                return (_a = this.controller) === null || _a === void 0 ? void 0 : _a.unsubscribePickListener();
            }
        });
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePick.prototype, "privateContext", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePick.prototype, "listeners", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('hasScanningListeners')
], BarcodePick.prototype, "_hasScanningListeners", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePick.prototype, "modeListeners", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('hasListeners')
], BarcodePick.prototype, "_hasListeners", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePick.prototype, "isInListenerCallback", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('settings')
], BarcodePick.prototype, "_settings", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('ProductProvider')
], BarcodePick.prototype, "_productProvider", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePick.prototype, "_controller", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePick, "barcodePickDefaults", null);

class BarcodePickActionCallback {
    onFinish(result) {
        void this._viewController.finishPickAction(this._itemData, result);
    }
}

class BarcodePickAsyncMapperProductProvider extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor(productsToPick, callback) {
        super();
        this._productsToPickForSerialization = {};
        this._productsToPick = productsToPick;
        productsToPick.forEach((product) => {
            this._productsToPickForSerialization[product.identifier] = product.quantityToPick;
        });
        this._callback = callback;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePickAsyncMapperProductProvider.prototype, "_callback", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePickAsyncMapperProductProvider.prototype, "_productsToPick", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('products')
], BarcodePickAsyncMapperProductProvider.prototype, "_productsToPickForSerialization", void 0);

class BarcodePickProduct extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor(identifier, quantityToPick) {
        super();
        this._identifier = identifier;
        this._quantityToPick = quantityToPick;
    }
    get identifier() {
        return this._identifier;
    }
    get quantityToPick() {
        return this._quantityToPick;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('identifier')
], BarcodePickProduct.prototype, "_identifier", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('quantityToPick')
], BarcodePickProduct.prototype, "_quantityToPick", void 0);

class BarcodePickProductProviderCallback {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onData(data) {
    }
}

class BarcodePickProductProviderCallbackItem extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor(itemData, productIdentifier) {
        super();
        this._productIdentifier = null;
        this._itemData = itemData;
        this._productIdentifier = productIdentifier;
    }
    get itemData() {
        return this._itemData;
    }
    get productIdentifier() {
        return this._productIdentifier;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('itemData')
], BarcodePickProductProviderCallbackItem.prototype, "_itemData", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('productIdentifier')
], BarcodePickProductProviderCallbackItem.prototype, "_productIdentifier", void 0);

class BarcodePickSession {
    get trackedItems() {
        return this._trackedItems;
    }
    get addedItems() {
        return this._addedItems;
    }
    static fromJSON(json) {
        const session = new BarcodePickSession();
        session._trackedItems = json.trackedItems;
        session._addedItems = json.addedItems;
        return session;
    }
}

class BarcodePickScanningSession {
    get pickedItems() {
        return this._pickedItems;
    }
    get scannedItems() {
        return this._scannedItems;
    }
    static fromJSON(json) {
        const session = new BarcodePickScanningSession();
        session._pickedItems = json.pickedObjects;
        session._scannedItems = json.scannedObjects;
        return session;
    }
}

class BarcodePickSettings extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static get barcodePickDefaults() {
        return scanditDatacaptureFrameworksCore.FactoryMaker.getInstance('BarcodePickDefaults');
    }
    constructor() {
        super();
        this.symbologies = {};
        this.properties = {};
        this._soundEnabled = BarcodePickSettings.barcodePickDefaults.BarcodePickSettings.soundEnabled;
        this._hapticsEnabled = BarcodePickSettings.barcodePickDefaults.BarcodePickSettings.hapticsEnabled;
        this._cachingEnabled = BarcodePickSettings.barcodePickDefaults.BarcodePickSettings.cachingEnabled;
        this._arucoDictionary = BarcodePickSettings.barcodePickDefaults.BarcodePickSettings.arucoDictionary;
    }
    settingsForSymbology(symbology) {
        if (!this.symbologies[symbology]) {
            const symbologySettings = BarcodePickSettings.barcodePickDefaults.SymbologySettings[symbology];
            symbologySettings['_symbology'] = symbology;
            this.symbologies[symbology] = symbologySettings;
        }
        return this.symbologies[symbology];
    }
    get enabledSymbologies() {
        return Object.keys(this.symbologies)
            .filter(symbology => this.symbologies[symbology].isEnabled);
    }
    enableSymbologies(symbologies) {
        symbologies.forEach(symbology => this.enableSymbology(symbology, true));
    }
    enableSymbology(symbology, enabled) {
        this.settingsForSymbology(symbology).isEnabled = enabled;
    }
    setProperty(name, value) {
        this.properties[name] = value;
    }
    getProperty(name) {
        return this.properties[name];
    }
    get soundEnabled() {
        return this._soundEnabled;
    }
    set soundEnabled(enabled) {
        this._soundEnabled = enabled;
    }
    get hapticsEnabled() {
        return this._hapticsEnabled;
    }
    set hapticsEnabled(enabled) {
        this._hapticsEnabled = enabled;
    }
    setArucoDictionary(dictionary) {
        this._arucoDictionary = dictionary;
    }
    get cachingEnabled() {
        return this._cachingEnabled;
    }
    set cachingEnabled(enabled) {
        this._cachingEnabled = enabled;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('soundEnabled')
], BarcodePickSettings.prototype, "_soundEnabled", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('hapticEnabled')
], BarcodePickSettings.prototype, "_hapticsEnabled", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('cachingEnabled')
], BarcodePickSettings.prototype, "_cachingEnabled", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('arucoDictionary')
], BarcodePickSettings.prototype, "_arucoDictionary", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePickSettings, "barcodePickDefaults", null);

exports.BarcodePickState = void 0;
(function (BarcodePickState) {
    BarcodePickState["Ignore"] = "ignore";
    BarcodePickState["Picked"] = "picked";
    BarcodePickState["ToPick"] = "toPick";
    BarcodePickState["Unknown"] = "unknown";
})(exports.BarcodePickState || (exports.BarcodePickState = {}));

class BarcodePickViewEventHandlers {
    constructor(view, barcodePick, proxy, viewController) {
        this.view = view;
        this.barcodePick = barcodePick;
        this.proxy = proxy;
        this.viewController = viewController;
    }
    setBarcodePickMapperCallback(callback) {
        this.barcodePickMapperCallback = callback;
    }
    handleDidCompleteScanningSession(ev) {
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodePickViewEventHandlers DidCompleteScanningSession payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        const session = BarcodePickScanningSession['fromJSON'](JSON.parse(payload.session));
        this.notifyListenersOfDidCompleteScanningSession(session);
    }
    handleDidUpdateScanningSession(ev) {
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodePickViewEventHandlers DidUpdateScanningSession payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        const session = BarcodePickScanningSession['fromJSON'](JSON.parse(payload.session));
        this.notifyListenersOfDidUpdateScanningSession(session);
    }
    handleDidPick(ev) {
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodePickViewEventHandlers DidPick payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        const barcodePickActionCallback = new BarcodePickActionCallback();
        barcodePickActionCallback['_viewController'] = this.viewController;
        barcodePickActionCallback['_itemData'] = payload.itemData;
        this.view['actionListeners']
            .forEach(listener => listener.didPickItem(payload.itemData, barcodePickActionCallback));
    }
    handleDidUnpick(ev) {
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodePickViewEventHandlers DidUnpick payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        const barcodePickActionCallback = new BarcodePickActionCallback();
        barcodePickActionCallback['_viewController'] = this.viewController;
        barcodePickActionCallback['_itemData'] = payload.itemData;
        this.view['actionListeners']
            .forEach(listener => listener.didUnpickItem(payload.itemData, barcodePickActionCallback));
    }
    handleDidTapFinishButton(ev) {
        var _a, _b;
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodePickViewEventHandlers DidTapFinishButton payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        if (!this.view.uiListener) {
            return;
        }
        (_b = (_a = this.view) === null || _a === void 0 ? void 0 : _a.uiListener) === null || _b === void 0 ? void 0 : _b.didTapFinishButton(this.proxy);
    }
    handleDidStartScanning(ev) {
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodePickViewEventHandlers DidStartScanning payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        this.view['listeners']
            .forEach(listener => listener.didStartScanning(this.view));
    }
    handleDidFreezeScanning(ev) {
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodePickViewEventHandlers DidFreezeScanning payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        this.view['listeners']
            .forEach(listener => listener.didFreezeScanning(this.view));
    }
    handleDidPauseScanning(ev) {
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodePickViewEventHandlers DidPauseScanning payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        this.view['listeners']
            .forEach(listener => listener.didPauseScanning(this.view));
    }
    handleDidStopScanning(ev) {
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodePickViewEventHandlers DidStopScanning payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        this.view['listeners']
            .forEach(listener => listener.didStopScanning(this.view));
    }
    handleProductIdentifierForItems(ev) {
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodePickViewEventHandlers ProductIdentifierForItems payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        if (!this.barcodePickMapperCallback) {
            return;
        }
        this.barcodePickMapperCallback.productIdentifierForItems(payload.itemsData, {
            onData: (callbackItems) => {
                void this.finishOnProductIdentifierForItems(callbackItems);
            }
        });
    }
    handleDidUpdateSession(ev) {
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodePickViewEventHandlers DidUpdateSession payload is null');
            return;
        }
        if (payload.viewId !== this.view.viewId) {
            return;
        }
        const session = BarcodePickSession['fromJSON'](JSON.parse(payload.session));
        this.notifyListenersOfDidUpdateSession(session);
    }
    finishOnProductIdentifierForItems(data) {
        return this.proxy.$finishOnProductIdentifierForItems({ viewId: this.view.viewId, itemsJson: JSON.stringify(data) });
    }
    notifyListenersOfDidCompleteScanningSession(session) {
        const mode = this.barcodePick;
        mode['listeners'].forEach(listener => {
            if (listener.didCompleteScanningSession) {
                listener.didCompleteScanningSession(this.barcodePick, session);
            }
        });
    }
    notifyListenersOfDidUpdateScanningSession(session) {
        const mode = this.barcodePick;
        mode['listeners'].forEach(listener => {
            if (listener.didUpdateScanningSession) {
                listener.didUpdateScanningSession(this.barcodePick, session);
            }
        });
    }
    notifyListenersOfDidUpdateSession(session) {
        const mode = this.barcodePick;
        mode['modeListeners'].forEach(listener => {
            if (listener.didUpdateSession) {
                listener.didUpdateSession(this.barcodePick, session);
            }
        });
    }
}

var BarcodePickViewEvents;
(function (BarcodePickViewEvents) {
    BarcodePickViewEvents["didStartScanning"] = "BarcodePickViewListener.didStartScanning";
    BarcodePickViewEvents["didFreezeScanning"] = "BarcodePickViewListener.didFreezeScanning";
    BarcodePickViewEvents["didPauseScanning"] = "BarcodePickViewListener.didPauseScanning";
    BarcodePickViewEvents["didStopScanning"] = "BarcodePickViewListener.didStopScanning";
})(BarcodePickViewEvents || (BarcodePickViewEvents = {}));
var BarcodePickViewUiEvents;
(function (BarcodePickViewUiEvents) {
    BarcodePickViewUiEvents["didTapFinishButton"] = "BarcodePickViewUiListener.didTapFinishButton";
})(BarcodePickViewUiEvents || (BarcodePickViewUiEvents = {}));
var BarcodePickAsyncMapperProductProviderEvents;
(function (BarcodePickAsyncMapperProductProviderEvents) {
    BarcodePickAsyncMapperProductProviderEvents["onProductIdentifierForItems"] = "BarcodePickAsyncMapperProductProviderCallback.onProductIdentifierForItems";
})(BarcodePickAsyncMapperProductProviderEvents || (BarcodePickAsyncMapperProductProviderEvents = {}));
var BarcodePickScanningEvents;
(function (BarcodePickScanningEvents) {
    BarcodePickScanningEvents["didCompleteScanningSession"] = "BarcodePickScanningListener.didCompleteScanningSession";
    BarcodePickScanningEvents["didUpdateScanningSession"] = "BarcodePickScanningListener.didUpdateScanningSession";
})(BarcodePickScanningEvents || (BarcodePickScanningEvents = {}));
var BarcodePickActionEvents;
(function (BarcodePickActionEvents) {
    BarcodePickActionEvents["didPick"] = "BarcodePickActionListener.didPick";
    BarcodePickActionEvents["didUnpick"] = "BarcodePickActionListener.didUnpick";
})(BarcodePickActionEvents || (BarcodePickActionEvents = {}));
var BarcodePickListenerEvents;
(function (BarcodePickListenerEvents) {
    BarcodePickListenerEvents["didUpdateSession"] = "BarcodePickListener.didUpdateSession";
})(BarcodePickListenerEvents || (BarcodePickListenerEvents = {}));
class BarcodePickViewController extends scanditDatacaptureFrameworksCore.BaseController {
    constructor(view) {
        super('BarcodePickViewProxy');
        this.isListeningForPickListeners = false;
        this.isListeningForScanningListeners = false;
        this.isListeningForActionListeners = false;
        this.isListeningForViewListeners = false;
        this.isListeningForViewUiListeners = false;
        this.isListeningForProductListeners = false;
        this.handleDidCompleteScanningSessionWrapper = (ev) => {
            this.eventHandlers.handleDidCompleteScanningSession(ev);
        };
        this.handleDidUpdateScanningSessionWrapper = (ev) => {
            this.eventHandlers.handleDidUpdateScanningSession(ev);
        };
        this.handleDidUpdateSessionWrapper = (ev) => {
            return this.eventHandlers.handleDidUpdateSession(ev);
        };
        this.handleDidTapFinishButtonWrapper = (ev) => {
            return this.eventHandlers.handleDidTapFinishButton(ev);
        };
        this.handleDidPickWrapper = (ev) => {
            return this.eventHandlers.handleDidPick(ev);
        };
        this.handleDidUnpickWrapper = (ev) => {
            return this.eventHandlers.handleDidUnpick(ev);
        };
        this.handleDidStartScanningWrapper = (ev) => {
            return this.eventHandlers.handleDidStartScanning(ev);
        };
        this.handleDidFreezeScanningWrapper = (ev) => {
            return this.eventHandlers.handleDidFreezeScanning(ev);
        };
        this.handleDidPauseScanningWrapper = (ev) => {
            return this.eventHandlers.handleDidPauseScanning(ev);
        };
        this.handleDidStopScanningWrapper = (ev) => {
            return this.eventHandlers.handleDidStopScanning(ev);
        };
        this.handleProductIdentifierForItemsWrapper = (ev) => {
            return this.eventHandlers.handleProductIdentifierForItems(ev);
        };
        this.view = view;
        this.barcodePick = view.barcodePick;
        this.eventHandlers = new BarcodePickViewEventHandlers(this.view, this.barcodePick, this._proxy, this);
    }
    start() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return;
            }
            yield this._proxy.$pickViewStart({ viewId: this.view.viewId });
        });
    }
    stop() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return;
            }
            yield this._proxy.$pickViewStop({ viewId: this.view.viewId });
        });
    }
    freeze() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return;
            }
            yield this._proxy.$pickViewFreeze({ viewId: this.view.viewId });
        });
    }
    reset() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return;
            }
            yield this._proxy.$pickViewReset({ viewId: this.view.viewId });
        });
    }
    pause() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return Promise.resolve();
            }
            // Android: onPause is called.
            // iOS: pause is called.
            yield this._proxy.$pickViewPause({ viewId: this.view.viewId });
        });
    }
    resume() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return;
            }
            // Android: onResume is called.
            // iOS: start is called.
            yield this._proxy.$pickViewResume({ viewId: this.view.viewId });
        });
    }
    finishPickAction(itemData, result) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return;
            }
            yield this._proxy.$finishPickAction({ viewId: this.view.viewId, code: itemData, result });
        });
    }
    createNativeView() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this.create();
            return this.initialize();
        });
    }
    removeNativeView() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return;
            }
            yield this._proxy.$removePickView({ viewId: this.view.viewId });
        });
    }
    dispose() {
        void this.unsubscribeActionListeners();
        void this.unsubscribePickViewListeners();
        void this.unsubscribeScanningListener();
        void this.unsubscribePickListener();
        void this.unregisterUiListener();
        void this.unregisterProductListener();
        this._proxy.dispose();
    }
    subscribeScanningListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated || this.isListeningForScanningListeners) {
                return Promise.resolve();
            }
            this._proxy.subscribeForEvents(Object.values(BarcodePickScanningEvents));
            yield this._proxy.$$addBarcodePickScanningListener({ viewId: this.view.viewId });
            this._proxy.eventEmitter.on(BarcodePickScanningEvents.didCompleteScanningSession, this.handleDidCompleteScanningSessionWrapper);
            this._proxy.eventEmitter.on(BarcodePickScanningEvents.didUpdateScanningSession, this.handleDidUpdateScanningSessionWrapper);
            this.isListeningForScanningListeners = true;
        });
    }
    unsubscribeScanningListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated || !this.isListeningForScanningListeners) {
                return Promise.resolve();
            }
            this._proxy.unsubscribeFromEvents(Object.values(BarcodePickScanningEvents));
            this._proxy.eventEmitter.off(BarcodePickScanningEvents.didCompleteScanningSession, this.handleDidCompleteScanningSessionWrapper);
            this._proxy.eventEmitter.off(BarcodePickScanningEvents.didUpdateScanningSession, this.handleDidUpdateScanningSessionWrapper);
            yield this._proxy.$removeBarcodePickScanningListener({ viewId: this.view.viewId });
            this.isListeningForScanningListeners = false;
        });
    }
    subscribePickListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated || this.isListeningForPickListeners) {
                return Promise.resolve();
            }
            this._proxy.subscribeForEvents(Object.values(BarcodePickListenerEvents));
            yield this._proxy.$addBarcodePickListener({ viewId: this.view.viewId });
            this._proxy.eventEmitter.on(BarcodePickListenerEvents.didUpdateSession, this.handleDidUpdateSessionWrapper);
            this.isListeningForPickListeners = true;
        });
    }
    unsubscribePickListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated || !this.isListeningForPickListeners) {
                return Promise.resolve();
            }
            this._proxy.unsubscribeFromEvents(Object.values(BarcodePickListenerEvents));
            this._proxy.eventEmitter.off(BarcodePickListenerEvents.didUpdateSession, this.handleDidUpdateSessionWrapper);
            yield this._proxy.$removeBarcodePickListener({ viewId: this.view.viewId });
            this.isListeningForPickListeners = false;
        });
    }
    registerUiListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated || this.isListeningForViewUiListeners) {
                return Promise.resolve();
            }
            this._proxy.subscribeForEvents(Object.values(BarcodePickViewUiEvents));
            this._proxy.eventEmitter.on(BarcodePickViewUiEvents.didTapFinishButton, this.handleDidTapFinishButtonWrapper);
            yield this._proxy.$$registerBarcodePickViewUiListener({ viewId: this.view.viewId });
            this.isListeningForViewUiListeners = true;
        });
    }
    unregisterUiListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated || !this.isListeningForViewUiListeners) {
                return Promise.resolve();
            }
            this._proxy.unsubscribeFromEvents(Object.values(BarcodePickViewUiEvents));
            this._proxy.eventEmitter.off(BarcodePickViewUiEvents.didTapFinishButton, this.handleDidTapFinishButtonWrapper);
            yield this._proxy.$unregisterBarcodePickViewUiListener({ viewId: this.view.viewId });
            this.isListeningForViewUiListeners = false;
        });
    }
    setUiListener(listener) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (listener) {
                yield this.registerUiListener();
            }
            else {
                yield this.unregisterUiListener();
            }
        });
    }
    subscribeActionListeners() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (this.isListeningForActionListeners)
                return;
            if (!this.isViewCreated)
                return;
            this._proxy.subscribeForEvents(Object.values(BarcodePickActionEvents));
            this._proxy.eventEmitter.on(BarcodePickActionEvents.didPick, this.handleDidPickWrapper);
            this._proxy.eventEmitter.on(BarcodePickActionEvents.didUnpick, this.handleDidUnpickWrapper);
            yield this._proxy.$$addPickActionListener({ viewId: this.view.viewId });
            this.isListeningForActionListeners = true;
        });
    }
    unsubscribeActionListeners() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isListeningForActionListeners)
                return;
            if (!this.isViewCreated)
                return;
            this._proxy.unsubscribeFromEvents(Object.values(BarcodePickActionEvents));
            this._proxy.eventEmitter.off(BarcodePickActionEvents.didPick, this.handleDidPickWrapper);
            this._proxy.eventEmitter.off(BarcodePickActionEvents.didUnpick, this.handleDidUnpickWrapper);
            yield this._proxy.$removePickActionListener({ viewId: this.view.viewId });
            this.isListeningForActionListeners = false;
        });
    }
    subscribePickViewListeners() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (this.isListeningForViewListeners)
                return;
            if (!this.isViewCreated)
                return;
            this._proxy.subscribeForEvents(Object.values(BarcodePickViewEvents));
            this._proxy.eventEmitter.on(BarcodePickViewEvents.didStartScanning, this.handleDidStartScanningWrapper);
            this._proxy.eventEmitter.on(BarcodePickViewEvents.didFreezeScanning, this.handleDidFreezeScanningWrapper);
            this._proxy.eventEmitter.on(BarcodePickViewEvents.didPauseScanning, this.handleDidPauseScanningWrapper);
            this._proxy.eventEmitter.on(BarcodePickViewEvents.didStopScanning, this.handleDidStopScanningWrapper);
            yield this._proxy.$$addPickViewListener({ viewId: this.view.viewId });
            this.isListeningForViewListeners = true;
        });
    }
    unsubscribePickViewListeners() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isListeningForViewListeners)
                return;
            if (!this.isViewCreated)
                return;
            this._proxy.unsubscribeFromEvents(Object.values(BarcodePickViewEvents));
            this._proxy.eventEmitter.off(BarcodePickViewEvents.didStartScanning, this.handleDidStartScanningWrapper);
            this._proxy.eventEmitter.off(BarcodePickViewEvents.didFreezeScanning, this.handleDidFreezeScanningWrapper);
            this._proxy.eventEmitter.off(BarcodePickViewEvents.didPauseScanning, this.handleDidPauseScanningWrapper);
            this._proxy.eventEmitter.off(BarcodePickViewEvents.didStopScanning, this.handleDidStopScanningWrapper);
            yield this._proxy.$removePickViewListener({ viewId: this.view.viewId });
            this.isListeningForViewListeners = false;
        });
    }
    // Methods migrated from BarcodePickProductController
    registerProductListener(callback) {
        return __awaiter$1(this, void 0, void 0, function* () {
            this.eventHandlers.setBarcodePickMapperCallback(callback);
            if (this.isListeningForProductListeners)
                return;
            if (!this.isViewCreated)
                return;
            this._proxy.subscribeForEvents(Object.values(BarcodePickAsyncMapperProductProviderEvents));
            this._proxy.eventEmitter.on(BarcodePickAsyncMapperProductProviderEvents.onProductIdentifierForItems, this.handleProductIdentifierForItemsWrapper);
            yield this._proxy.$$registerOnProductIdentifierForItemsListener({ viewId: this.view.viewId });
            this.isListeningForProductListeners = true;
        });
    }
    unregisterProductListener() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isListeningForProductListeners)
                return;
            if (!this.isViewCreated)
                return;
            this._proxy.unsubscribeFromEvents(Object.values(BarcodePickAsyncMapperProductProviderEvents));
            this._proxy.eventEmitter.off(BarcodePickAsyncMapperProductProviderEvents.onProductIdentifierForItems, this.handleProductIdentifierForItemsWrapper);
            yield this._proxy.$unregisterOnProductIdentifierForItemsListener({ viewId: this.view.viewId });
            this.isListeningForProductListeners = false;
        });
    }
    finishOnProductIdentifierForItems(data) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated) {
                return;
            }
            yield this._proxy.$finishOnProductIdentifierForItems({
                viewId: this.view.viewId,
                itemsJson: JSON.stringify(data),
            });
        });
    }
    initialize() {
        return __awaiter$1(this, void 0, void 0, function* () {
            // check if there are listeners to subscribe
            const privateBarcodePick = this.barcodePick;
            const privateBarcodePickView = this.view;
            if (privateBarcodePick.listeners.length > 0) {
                yield this.subscribeScanningListener();
            }
            if (privateBarcodePick.modeListeners.length > 0) {
                yield this.subscribePickListener();
            }
            if (this.view.uiListener) {
                yield this.registerUiListener();
            }
            if (privateBarcodePickView.listeners.length > 0) {
                yield this.subscribePickViewListeners();
            }
            if (privateBarcodePickView.actionListeners.length > 0) {
                yield this.subscribeActionListeners();
            }
            if (privateBarcodePick._productProvider) {
                const productProvider = privateBarcodePick._productProvider;
                if (productProvider instanceof BarcodePickAsyncMapperProductProvider) {
                    const callback = productProvider['_callback'];
                    yield this.registerProductListener(callback);
                }
            }
        });
    }
    create() {
        return __awaiter$1(this, void 0, void 0, function* () {
            const barcodePickView = this.view.toJSON();
            const json = JSON.stringify(barcodePickView);
            yield this._proxy.$createPickView({ viewId: this.view.viewId, json });
        });
    }
    get isViewCreated() {
        return this.view.viewId !== -1;
    }
}

class BaseBarcodePickView extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get viewId() {
        return this._viewId;
    }
    get context() {
        return this._context;
    }
    set context(context) {
        this._context = context;
    }
    get uiListener() {
        return this._barcodePickViewUiListener;
    }
    set uiListener(value) {
        this._barcodePickViewUiListener = value;
        void this.viewController.setUiListener(value);
    }
    constructor({ context, barcodePick, settings, cameraSettings }) {
        super();
        this.actionListeners = [];
        this.listeners = [];
        this.isStarted = false;
        this._context = null;
        this.isViewCreated = false;
        this._viewId = -1; // -1 means the view is not created yet
        this._barcodePickViewUiListener = null;
        this.context = context;
        this.barcodePick = barcodePick;
        this.settings = settings;
        this.cameraSettings = cameraSettings;
        const privateBarcodePick = this.barcodePick;
        privateBarcodePick.privateContext = context;
        this.viewController = new BarcodePickViewController(this);
        privateBarcodePick.controller = this.viewController;
    }
    createNativeView(viewId) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (this.isViewCreated) {
                return Promise.resolve();
            }
            this._viewId = viewId;
            yield this.viewController.createNativeView();
            this.isViewCreated = true;
        });
    }
    removeNativeView() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this.viewController.removeNativeView();
            this.isViewCreated = false;
        });
    }
    dispose() {
        void this.viewController.dispose();
        this.isViewCreated = false;
    }
    start() {
        return __awaiter$1(this, void 0, void 0, function* () {
            this.isStarted = true;
            yield this.viewController.start();
        });
    }
    stop() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this.viewController.stop();
        });
    }
    freeze() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this.viewController.freeze();
        });
    }
    pause() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this.viewController.pause();
        });
    }
    resume() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this.viewController.resume();
        });
    }
    reset() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this.viewController.reset();
        });
    }
    addActionListener(listener) {
        this.checkAndSubscribeActionListeners();
        if (this.actionListeners.findIndex(l => l === listener) === -1) {
            this.actionListeners.push(listener);
        }
    }
    removeActionListener(listener) {
        if (this.actionListeners.findIndex(l => l === listener) === -1) {
            return;
        }
        this.actionListeners.splice(this.actionListeners.indexOf(listener), 1);
        this.checkAndUnsubscribeActionListeners();
    }
    addListener(listener) {
        this.checkAndSubscribeListeners();
        if (this.listeners.findIndex(l => l === listener) === -1) {
            this.listeners.push(listener);
        }
    }
    removeListener(listener) {
        if (this.listeners.findIndex(l => l === listener) === -1) {
            return;
        }
        this.listeners.splice(this.listeners.indexOf(listener), 1);
        this.checkAndUnsubscribeListeners();
    }
    toJSON() {
        return {
            View: {
                viewId: this._viewId,
                hasActionListeners: this.actionListeners.length > 0,
                hasViewListeners: this.listeners.length > 0,
                hasViewUiListener: this.uiListener ? true : false,
                isStarted: this.isStarted,
                viewSettings: this.settings.toJSON(),
                cameraSettings: this.cameraSettings.toJSON(),
            },
            BarcodePick: this.barcodePick.toJSON(),
        };
    }
    checkAndSubscribeActionListeners() {
        if (this.actionListeners.length === 0) {
            void this.viewController.subscribeActionListeners();
        }
    }
    checkAndUnsubscribeActionListeners() {
        if (this.actionListeners.length === 0) {
            void this.viewController.unsubscribeActionListeners();
        }
    }
    checkAndSubscribeListeners() {
        if (this.listeners.length === 0) {
            void this.viewController.subscribePickViewListeners();
        }
    }
    checkAndUnsubscribeListeners() {
        if (this.listeners.length === 0) {
            void this.viewController.unsubscribePickViewListeners();
        }
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BaseBarcodePickView.prototype, "viewController", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BaseBarcodePickView.prototype, "actionListeners", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BaseBarcodePickView.prototype, "listeners", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('isStarted')
], BaseBarcodePickView.prototype, "isStarted", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BaseBarcodePickView.prototype, "_context", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BaseBarcodePickView.prototype, "isViewCreated", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BaseBarcodePickView.prototype, "_barcodePickViewUiListener", void 0);

class BarcodePickViewSettings extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static get barcodePickDefaults() {
        return getBarcodePickDefaults();
    }
    constructor() {
        super();
        this._highlightStyle = BarcodePickViewSettings.barcodePickDefaults.ViewSettings.highlightStyle;
        this._showLoadingDialog = BarcodePickViewSettings.barcodePickDefaults.ViewSettings.showLoadingDialog;
        this._showFinishButton = BarcodePickViewSettings.barcodePickDefaults.ViewSettings.showFinishButton;
        this._showPauseButton = BarcodePickViewSettings.barcodePickDefaults.ViewSettings.showPauseButton;
        this._showZoomButton = BarcodePickViewSettings.barcodePickDefaults.ViewSettings.showZoomButton;
        this._loadingDialogTextForPicking = BarcodePickViewSettings.barcodePickDefaults.ViewSettings.loadingDialogTextForPicking;
        this._loadingDialogTextForUnpicking = BarcodePickViewSettings.barcodePickDefaults.ViewSettings.loadingDialogTextForUnpicking;
        this._showGuidelines = BarcodePickViewSettings.barcodePickDefaults.ViewSettings.showGuidelines;
        this._initialGuidelineText = BarcodePickViewSettings.barcodePickDefaults.ViewSettings.initialGuidelineText;
        this._moveCloserGuidelineText = BarcodePickViewSettings.barcodePickDefaults.ViewSettings.moveCloserGuidelineText;
        this._showHints = BarcodePickViewSettings.barcodePickDefaults.ViewSettings.showHints;
        this._onFirstItemToPickFoundHintText = BarcodePickViewSettings.barcodePickDefaults.ViewSettings.onFirstItemToPickFoundHintText;
        this._onFirstItemPickCompletedHintText = BarcodePickViewSettings.barcodePickDefaults.ViewSettings.onFirstItemPickCompletedHintText;
        this._onFirstUnmarkedItemPickCompletedHintText = BarcodePickViewSettings.barcodePickDefaults.ViewSettings.onFirstUnmarkedItemPickCompletedHintText;
        this._onFirstItemUnpickCompletedHintText = BarcodePickViewSettings.barcodePickDefaults.ViewSettings.onFirstItemUnpickCompletedHintText;
    }
    get highlightStyle() {
        return this._highlightStyle;
    }
    set highlightStyle(style) {
        this._highlightStyle = style;
    }
    get showLoadingDialog() {
        return this._showLoadingDialog;
    }
    set showLoadingDialog(style) {
        this._showLoadingDialog = style;
    }
    get showFinishButton() {
        return this._showFinishButton;
    }
    set showFinishButton(show) {
        this._showFinishButton = show;
    }
    get showPauseButton() {
        return this._showPauseButton;
    }
    set showPauseButton(show) {
        this._showPauseButton = show;
    }
    get showZoomButton() {
        return this._showZoomButton;
    }
    set showZoomButton(show) {
        this._showZoomButton = show;
    }
    get loadingDialogTextForPicking() {
        return this._loadingDialogTextForPicking;
    }
    set loadingDialogTextForPicking(text) {
        this._loadingDialogTextForPicking = text;
    }
    get loadingDialogTextForUnpicking() {
        return this._loadingDialogTextForUnpicking;
    }
    set loadingDialogTextForUnpicking(text) {
        this._loadingDialogTextForUnpicking = text;
    }
    get showGuidelines() {
        return this._showGuidelines;
    }
    set showGuidelines(show) {
        this._showGuidelines = show;
    }
    get initialGuidelineText() {
        return this._initialGuidelineText;
    }
    set initialGuidelineText(text) {
        this._initialGuidelineText = text;
    }
    get moveCloserGuidelineText() {
        return this._moveCloserGuidelineText;
    }
    set moveCloserGuidelineText(text) {
        this._moveCloserGuidelineText = text;
    }
    get showHints() {
        return this._showHints;
    }
    set showHints(show) {
        this._showHints = show;
    }
    get onFirstItemToPickFoundHintText() {
        return this._onFirstItemToPickFoundHintText;
    }
    set onFirstItemToPickFoundHintText(text) {
        this._onFirstItemToPickFoundHintText = text;
    }
    get onFirstItemPickCompletedHintText() {
        return this._onFirstItemPickCompletedHintText;
    }
    set onFirstItemPickCompletedHintText(text) {
        this._onFirstItemPickCompletedHintText = text;
    }
    get onFirstUnmarkedItemPickCompletedHintText() {
        return this._onFirstUnmarkedItemPickCompletedHintText;
    }
    set onFirstUnmarkedItemPickCompletedHintText(text) {
        this._onFirstUnmarkedItemPickCompletedHintText = text;
    }
    get onFirstItemUnpickCompletedHintText() {
        return this._onFirstItemUnpickCompletedHintText;
    }
    set onFirstItemUnpickCompletedHintText(text) {
        this._onFirstItemUnpickCompletedHintText = text;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('highlightStyle')
], BarcodePickViewSettings.prototype, "_highlightStyle", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('shouldShowLoadingDialog')
], BarcodePickViewSettings.prototype, "_showLoadingDialog", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('showFinishButton')
], BarcodePickViewSettings.prototype, "_showFinishButton", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('showPauseButton')
], BarcodePickViewSettings.prototype, "_showPauseButton", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('showZoomButton')
], BarcodePickViewSettings.prototype, "_showZoomButton", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('showLoadingDialogTextForPicking')
], BarcodePickViewSettings.prototype, "_loadingDialogTextForPicking", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('showLoadingDialogTextForUnpicking')
], BarcodePickViewSettings.prototype, "_loadingDialogTextForUnpicking", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('shouldShowGuidelines')
], BarcodePickViewSettings.prototype, "_showGuidelines", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('initialGuidelineText')
], BarcodePickViewSettings.prototype, "_initialGuidelineText", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('moveCloserGuidelineText')
], BarcodePickViewSettings.prototype, "_moveCloserGuidelineText", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('shouldShowHints')
], BarcodePickViewSettings.prototype, "_showHints", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('onFirstItemToPickFoundHintText')
], BarcodePickViewSettings.prototype, "_onFirstItemToPickFoundHintText", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('onFirstItemPickCompletedHintText')
], BarcodePickViewSettings.prototype, "_onFirstItemPickCompletedHintText", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('onFirstUnmarkedItemPickCompletedHintText')
], BarcodePickViewSettings.prototype, "_onFirstUnmarkedItemPickCompletedHintText", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('onFirstItemUnpickCompletedHintText')
], BarcodePickViewSettings.prototype, "_onFirstItemUnpickCompletedHintText", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePickViewSettings, "barcodePickDefaults", null);

class BrushForStateObject extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('barcodePickState')
], BrushForStateObject.prototype, "barcodePickState", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('brush')
], BrushForStateObject.prototype, "brush", void 0);

class BarcodePickStatusIconSettings extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor() {
        super(...arguments);
        this._ratioToHighlightSize = BarcodePickStatusIconSettings.barcodePickDefaults.BarcodePickStatusIconSettings.ratioToHighlightSize;
        this._minSize = BarcodePickStatusIconSettings.barcodePickDefaults.BarcodePickStatusIconSettings.minSize;
        this._maxSize = BarcodePickStatusIconSettings.barcodePickDefaults.BarcodePickStatusIconSettings.maxSize;
    }
    get ratioToHighlightSize() {
        return this._ratioToHighlightSize;
    }
    set ratioToHighlightSize(value) {
        this._ratioToHighlightSize = value;
    }
    get minSize() {
        return this._minSize;
    }
    set minSize(value) {
        this._minSize = value;
    }
    get maxSize() {
        return this._maxSize;
    }
    set maxSize(value) {
        this._maxSize = value;
    }
    static get barcodePickDefaults() {
        return getBarcodePickDefaults();
    }
    static fromJSON(json) {
        if (json == undefined) {
            return null;
        }
        const barcodePickStatusIconSettings = new BarcodePickStatusIconSettings();
        barcodePickStatusIconSettings._ratioToHighlightSize = json === null || json === void 0 ? void 0 : json.ratioToHighlightSize;
        barcodePickStatusIconSettings._minSize = json === null || json === void 0 ? void 0 : json.minSize;
        barcodePickStatusIconSettings._maxSize = json === null || json === void 0 ? void 0 : json.maxSize;
        return barcodePickStatusIconSettings;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('ratioToHighlightSize')
], BarcodePickStatusIconSettings.prototype, "_ratioToHighlightSize", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('minSize')
], BarcodePickStatusIconSettings.prototype, "_minSize", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('maxSize')
], BarcodePickStatusIconSettings.prototype, "_maxSize", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePickStatusIconSettings, "barcodePickDefaults", null);

class Dot extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static get barcodePickDefaults() {
        return getBarcodePickDefaults();
    }
    constructor() {
        super();
        this._type = 'dot';
        this._brushesForState = Dot.barcodePickDefaults.BarcodePickViewHighlightStyle.Dot.brushesForState;
    }
    getBrushForState(state) {
        return (this._brushesForState.filter(item => item.barcodePickState === state)[0] || {}).brush;
    }
    setBrushForState(brush, state) {
        const indexToUpdate = this._brushesForState.findIndex(item => item.barcodePickState === state);
        this._brushesForState[indexToUpdate].brush = brush;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('type')
], Dot.prototype, "_type", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('brushesForState')
], Dot.prototype, "_brushesForState", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], Dot, "barcodePickDefaults", null);

class IconForStateObject extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor(barcodePickState, icon) {
        super();
        this._barcodePickState = barcodePickState;
        this._icon = icon;
    }
    get barcodePickState() {
        return this._barcodePickState;
    }
    get icon() {
        return this._icon;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('barcodePickState')
], IconForStateObject.prototype, "_barcodePickState", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('icon')
], IconForStateObject.prototype, "_icon", void 0);

class DotWithIcons extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static get barcodePickDefaults() {
        return getBarcodePickDefaults();
    }
    constructor() {
        super();
        this._type = 'dotWithIcons';
        this._brushesForState = DotWithIcons.barcodePickDefaults.BarcodePickViewHighlightStyle.DotWithIcons.brushesForState;
        this._iconsForState = [];
    }
    getBrushForState(state) {
        return (this._brushesForState.filter(item => item.barcodePickState === state)[0] || {}).brush;
    }
    setBrushForState(brush, state) {
        const indexToUpdate = this._brushesForState.findIndex(item => item.barcodePickState === state);
        this._brushesForState[indexToUpdate].brush = brush;
    }
    setIconForState(image, state) {
        const indexToUpdate = this._iconsForState.findIndex(item => item.barcodePickState === state);
        if (indexToUpdate > -1) {
            this._iconsForState.splice(indexToUpdate, 1);
        }
        this._iconsForState.push(new IconForStateObject(state, image));
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('type')
], DotWithIcons.prototype, "_type", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('brushesForState')
], DotWithIcons.prototype, "_brushesForState", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('iconsForState')
], DotWithIcons.prototype, "_iconsForState", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], DotWithIcons, "barcodePickDefaults", null);

class Rectangular extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static get barcodePickDefaults() {
        return getBarcodePickDefaults();
    }
    constructor() {
        super();
        this._type = 'rectangular';
        this._brushesForState = Rectangular.barcodePickDefaults.BarcodePickViewHighlightStyle.Rectangular.brushesForState;
        this._minimumHighlightWidth = Rectangular.barcodePickDefaults.BarcodePickViewHighlightStyle.RectangularWithIcons.minimumHighlightWidth;
        this._minimumHighlightHeight = Rectangular.barcodePickDefaults.BarcodePickViewHighlightStyle.RectangularWithIcons.minimumHighlightHeight;
    }
    getBrushForState(state) {
        return (this._brushesForState.filter(item => item.barcodePickState === state)[0] || {}).brush;
    }
    setBrushForState(brush, state) {
        const indexToUpdate = this._brushesForState.findIndex(item => item.barcodePickState === state);
        this._brushesForState[indexToUpdate].brush = brush;
    }
    get minimumHighlightHeight() {
        return this._minimumHighlightHeight;
    }
    set minimumHighlightHeight(value) {
        this._minimumHighlightHeight = value;
    }
    get minimumHighlightWidth() {
        return this._minimumHighlightWidth;
    }
    set minimumHighlightWidth(value) {
        this._minimumHighlightWidth = value;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('type')
], Rectangular.prototype, "_type", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('brushesForState')
], Rectangular.prototype, "_brushesForState", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('minimumHighlightWidth')
], Rectangular.prototype, "_minimumHighlightWidth", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('minimumHighlightHeight')
], Rectangular.prototype, "_minimumHighlightHeight", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], Rectangular, "barcodePickDefaults", null);

class RectangularWithIcons extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static get barcodePickDefaults() {
        return getBarcodePickDefaults();
    }
    constructor() {
        super();
        this._type = 'rectangularWithIcons';
        this._brushesForState = RectangularWithIcons.barcodePickDefaults.BarcodePickViewHighlightStyle.RectangularWithIcons.brushesForState;
        this._iconsForState = [];
        this._minimumHighlightWidth = RectangularWithIcons.barcodePickDefaults.BarcodePickViewHighlightStyle.RectangularWithIcons.minimumHighlightWidth;
        this._minimumHighlightHeight = RectangularWithIcons.barcodePickDefaults.BarcodePickViewHighlightStyle.RectangularWithIcons.minimumHighlightHeight;
    }
    getBrushForState(state) {
        return (this._brushesForState.filter(item => item.barcodePickState === state)[0] || {}).brush;
    }
    setBrushForState(brush, state) {
        const indexToUpdate = this._brushesForState.findIndex(item => item.barcodePickState === state);
        this._brushesForState[indexToUpdate].brush = brush;
    }
    setIconForState(image, state) {
        const indexToUpdate = this._iconsForState.findIndex(item => item.barcodePickState === state);
        if (indexToUpdate > -1) {
            this._iconsForState.splice(indexToUpdate, 1);
        }
        this._iconsForState.push(new IconForStateObject(state, image));
    }
    get statusIconSettings() {
        return this._statusIconSettings;
    }
    set statusIconSettings(value) {
        this._statusIconSettings = value;
    }
    get minimumHighlightHeight() {
        return this._minimumHighlightHeight;
    }
    set minimumHighlightHeight(value) {
        this._minimumHighlightHeight = value;
    }
    get minimumHighlightWidth() {
        return this._minimumHighlightWidth;
    }
    set minimumHighlightWidth(value) {
        this._minimumHighlightWidth = value;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('type')
], RectangularWithIcons.prototype, "_type", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('brushesForState')
], RectangularWithIcons.prototype, "_brushesForState", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('iconsForState')
], RectangularWithIcons.prototype, "_iconsForState", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('statusIconSettings')
], RectangularWithIcons.prototype, "_statusIconSettings", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('minimumHighlightWidth')
], RectangularWithIcons.prototype, "_minimumHighlightWidth", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('minimumHighlightHeight')
], RectangularWithIcons.prototype, "_minimumHighlightHeight", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], RectangularWithIcons, "barcodePickDefaults", null);

class BarcodeFindFeedback extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor() {
        super(...arguments);
        this.controller = null;
        this._found = BarcodeFindFeedback.barcodeFindDefaults.Feedback.found;
        this._itemListUpdated = BarcodeFindFeedback.barcodeFindDefaults.Feedback.itemListUpdated;
    }
    get found() {
        return this._found;
    }
    set found(success) {
        this._found = success;
        void this.updateFeedback();
    }
    get itemListUpdated() {
        return this._itemListUpdated;
    }
    set itemListUpdated(failure) {
        this._itemListUpdated = failure;
        void this.updateFeedback();
    }
    updateFeedback() {
        var _a;
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateFeedback(JSON.stringify(this.toJSON())));
    }
    static get barcodeFindDefaults() {
        return getBarcodeFindDefaults();
    }
    static get defaultFeedback() {
        return new BarcodeFindFeedback();
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeFindFeedback.prototype, "controller", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('found')
], BarcodeFindFeedback.prototype, "_found", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('itemListUpdated')
], BarcodeFindFeedback.prototype, "_itemListUpdated", void 0);

class BarcodeFind extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static createRecommendedCameraSettings() {
        return new scanditDatacaptureFrameworksCore.CameraSettings(BarcodeFind.barcodeFindDefaults.RecommendedCameraSettings);
    }
    constructor(settings) {
        super();
        this.type = 'barcodeFind';
        this._feedback = BarcodeFindFeedback.defaultFeedback;
        this._enabled = true;
        this._isInCallback = false;
        this.itemsToFind = null;
        this._hasBarcodeTransformer = false;
        this._hasListeners = false;
        this.listeners = [];
        this._controller = null;
        this._dataCaptureContext = null;
        this.barcodeTransformer = null;
        this._settings = settings;
        this._feedback['controller'] = this._controller;
    }
    static get barcodeFindDefaults() {
        return getBarcodeFindDefaults();
    }
    get context() {
        return this._dataCaptureContext;
    }
    get isEnabled() {
        return this._enabled;
    }
    set isEnabled(value) {
        var _a;
        this._enabled = value;
        void ((_a = this._controller) === null || _a === void 0 ? void 0 : _a.setModeEnabledState(value));
    }
    get feedback() {
        return this._feedback;
    }
    set feedback(value) {
        var _a;
        this._feedback = value;
        this._feedback['controller'] = this._controller;
        void ((_a = this._controller) === null || _a === void 0 ? void 0 : _a.updateFeedback(JSON.stringify(value.toJSON())));
    }
    applySettings(settings) {
        this._settings = settings;
        return this.update();
    }
    addListener(listener) {
        this.checkAndSubscribeListeners();
        if (this.listeners.includes(listener)) {
            return;
        }
        this.listeners.push(listener);
        this._hasListeners = this.listeners.length > 0;
    }
    removeListener(listener) {
        if (!this.listeners.includes(listener)) {
            return;
        }
        this.listeners.splice(this.listeners.indexOf(listener));
        this.checkAndUnsubscribeListeners();
        this._hasListeners = this.listeners.length > 0;
    }
    setBarcodeTransformer(barcodeTransformer) {
        var _a, _b;
        this.barcodeTransformer = barcodeTransformer;
        this._hasBarcodeTransformer = this.barcodeTransformer != null;
        if (this._hasBarcodeTransformer) {
            void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.setBarcodeTransformer());
        }
        else {
            void ((_b = this.controller) === null || _b === void 0 ? void 0 : _b.unsetBarcodeTransformer());
        }
    }
    setItemList(items) {
        var _a, _b;
        this.itemsToFind = JSON.stringify(items.map(item => item.toJSON()));
        return (_b = (_a = this.controller) === null || _a === void 0 ? void 0 : _a.setItemList(items)) !== null && _b !== void 0 ? _b : Promise.resolve();
    }
    start() {
        var _a, _b;
        return (_b = (_a = this.controller) === null || _a === void 0 ? void 0 : _a.start()) !== null && _b !== void 0 ? _b : Promise.resolve();
    }
    pause() {
        var _a, _b;
        return (_b = (_a = this.controller) === null || _a === void 0 ? void 0 : _a.pause()) !== null && _b !== void 0 ? _b : Promise.resolve();
    }
    stop() {
        var _a, _b;
        return (_b = (_a = this.controller) === null || _a === void 0 ? void 0 : _a.stop()) !== null && _b !== void 0 ? _b : Promise.resolve();
    }
    checkAndSubscribeListeners() {
        var _a;
        if (this.listeners.length === 0) {
            void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.subscribeModeEvents());
        }
    }
    checkAndUnsubscribeListeners() {
        var _a;
        if (this.listeners.length > 0) {
            return;
        }
        void ((_a = this.controller) === null || _a === void 0 ? void 0 : _a.unsubscribeModeEvents());
    }
    update() {
        var _a, _b;
        return (_b = (_a = this.controller) === null || _a === void 0 ? void 0 : _a.updateMode()) !== null && _b !== void 0 ? _b : Promise.resolve();
    }
    get controller() {
        return this._controller;
    }
    set controller(newController) {
        this._controller = newController;
        this._feedback['controller'] = this._controller;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('feedback')
], BarcodeFind.prototype, "_feedback", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('enabled')
], BarcodeFind.prototype, "_enabled", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeFind.prototype, "_isInCallback", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('settings')
], BarcodeFind.prototype, "_settings", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('hasBarcodeTransformer')
], BarcodeFind.prototype, "_hasBarcodeTransformer", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('hasListeners')
], BarcodeFind.prototype, "_hasListeners", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeFind.prototype, "listeners", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeFind.prototype, "_controller", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeFind.prototype, "_dataCaptureContext", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeFind, "barcodeFindDefaults", null);

class BarcodeFindItem extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor(searchOptions, content) {
        super();
        this._searchOptions = searchOptions;
        this._content = content;
    }
    get searchOptions() {
        return this._searchOptions;
    }
    get content() {
        return this._content;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('searchOptions')
], BarcodeFindItem.prototype, "_searchOptions", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('content')
], BarcodeFindItem.prototype, "_content", void 0);

class BarcodeFindItemContent extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor(info, additionalInfo, image) {
        super();
        this._info = info;
        this._additionalInfo = additionalInfo;
        this._image = image;
    }
    get info() {
        var _a;
        return (_a = this._info) !== null && _a !== void 0 ? _a : null;
    }
    get additionalInfo() {
        var _a;
        return (_a = this._additionalInfo) !== null && _a !== void 0 ? _a : null;
    }
    get image() {
        var _a;
        return (_a = this._image) !== null && _a !== void 0 ? _a : null;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('info')
], BarcodeFindItemContent.prototype, "_info", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('additionalInfo')
], BarcodeFindItemContent.prototype, "_additionalInfo", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('image')
], BarcodeFindItemContent.prototype, "_image", void 0);

class BarcodeFindItemSearchOptions extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static withBrush(barcodeData, brush) {
        const options = new BarcodeFindItemSearchOptions(barcodeData);
        options._brush = brush;
        return options;
    }
    constructor(barcodeData) {
        super();
        this._brush = null;
        this._barcodeData = barcodeData;
    }
    get barcodeData() {
        return this._barcodeData;
    }
    get brush() {
        return this._brush;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization("barcodeData")
], BarcodeFindItemSearchOptions.prototype, "_barcodeData", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization("brush")
], BarcodeFindItemSearchOptions.prototype, "_brush", void 0);

class BarcodeFindSession {
    get trackedBarcodes() {
        return this._trackedBarcodes;
    }
    static fromJSON(json) {
        const session = new BarcodeFindSession();
        session._trackedBarcodes = json.trackedBarcodes;
        return session;
    }
}

class BarcodeFindSettings extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    constructor() {
        super();
        this._symbologies = {};
        this._properties = {};
    }
    static get barcodeDefaults() {
        return getBarcodeDefaults();
    }
    settingsForSymbology(symbology) {
        const identifier = symbology.toString();
        if (!this._symbologies[identifier]) {
            const symbologySettings = BarcodeFindSettings.barcodeDefaults.SymbologySettings[identifier];
            this._symbologies[identifier] = symbologySettings;
        }
        return this._symbologies[identifier];
    }
    enableSymbologies(symbologies) {
        symbologies.forEach(symbology => this.enableSymbology(symbology, true));
    }
    enableSymbology(symbology, enabled) {
        this.settingsForSymbology(symbology).isEnabled = enabled;
    }
    get enabledSymbologies() {
        return Object.keys(this._symbologies)
            .filter(symbology => this._symbologies[symbology].isEnabled);
    }
    setProperty(name, value) {
        this._properties[name] = value;
    }
    getProperty(name) {
        return this._properties[name];
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('symbologies')
], BarcodeFindSettings.prototype, "_symbologies", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('properties')
], BarcodeFindSettings.prototype, "_properties", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeFindSettings, "barcodeDefaults", null);

class BarcodeFindViewSettings extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static get barcodeFindViewSettingsDefaults() {
        return getBarcodeFindDefaults().BarcodeFindViewSettings;
    }
    static withHardwareTriggers(inListItemColor, notInListItemColor, soundEnabled, hapticEnabled, hardwareTriggerEnabled, hardwareTriggerKeyCode) {
        return new BarcodeFindViewSettings(inListItemColor, notInListItemColor, soundEnabled, hapticEnabled, hardwareTriggerEnabled, hardwareTriggerKeyCode);
    }
    static withProgressBarColor(inListItemColor, notInListItemColor, soundEnabled, hapticEnabled, progressBarStartColor, progressBarFinishColor) {
        return new BarcodeFindViewSettings(inListItemColor, notInListItemColor, soundEnabled, hapticEnabled, undefined, undefined, progressBarStartColor, progressBarFinishColor);
    }
    static withProgressBarColorAndHardwareTriggers(inListItemColor, notInListItemColor, soundEnabled, hapticEnabled, hardwareTriggerEnabled, hardwareTriggerKeyCode, progressBarStartColor, progressBarFinishColor) {
        return new BarcodeFindViewSettings(inListItemColor, notInListItemColor, soundEnabled, hapticEnabled, hardwareTriggerEnabled, hardwareTriggerKeyCode, progressBarStartColor, progressBarFinishColor);
    }
    constructor(inListItemColor, notInListItemColor, soundEnabled, hapticEnabled, hardwareTriggerEnabled, hardwareTriggerKeyCode, progressBarStartColor, progressBarFinishColor) {
        super();
        this._progressBarStartColor = BarcodeFindViewSettings.barcodeFindViewSettingsDefaults.progressBarStartColor;
        this._progressBarFinishColor = BarcodeFindViewSettings.barcodeFindViewSettingsDefaults.progressBarFinishColor;
        this._inListItemColor = inListItemColor;
        this._notInListItemColor = notInListItemColor;
        this._soundEnabled = soundEnabled;
        this._hapticEnabled = hapticEnabled;
        this._hardwareTriggerEnabled = hardwareTriggerEnabled || false;
        this._hardwareTriggerKeyCode = hardwareTriggerKeyCode || null;
        this._progressBarStartColor = progressBarStartColor || BarcodeFindViewSettings.barcodeFindViewSettingsDefaults.progressBarStartColor;
        this._progressBarFinishColor = progressBarFinishColor || BarcodeFindViewSettings.barcodeFindViewSettingsDefaults.progressBarFinishColor;
    }
    get inListItemColor() {
        return this._inListItemColor;
    }
    get notInListItemColor() {
        return this._notInListItemColor;
    }
    get soundEnabled() {
        return this._soundEnabled;
    }
    get hapticEnabled() {
        return this._hapticEnabled;
    }
    get hardwareTriggerEnabled() {
        return this._hardwareTriggerEnabled;
    }
    get hardwareTriggerKeyCode() {
        return this._hardwareTriggerKeyCode;
    }
    get progressBarStartColor() {
        return this._progressBarStartColor;
    }
    get progressBarFinishColor() {
        return this._progressBarFinishColor;
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('inListItemColor')
], BarcodeFindViewSettings.prototype, "_inListItemColor", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('notInListItemColor')
], BarcodeFindViewSettings.prototype, "_notInListItemColor", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('soundEnabled')
], BarcodeFindViewSettings.prototype, "_soundEnabled", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('hapticEnabled')
], BarcodeFindViewSettings.prototype, "_hapticEnabled", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('hardwareTriggerEnabled')
], BarcodeFindViewSettings.prototype, "_hardwareTriggerEnabled", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('hardwareTriggerKeyCode')
], BarcodeFindViewSettings.prototype, "_hardwareTriggerKeyCode", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('progressBarStartColor')
], BarcodeFindViewSettings.prototype, "_progressBarStartColor", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('progressBarFinishColor')
], BarcodeFindViewSettings.prototype, "_progressBarFinishColor", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeFindViewSettings, "barcodeFindViewSettingsDefaults", null);

var BarcodeFindViewEvents;
(function (BarcodeFindViewEvents) {
    BarcodeFindViewEvents["onFinishButtonTappedEventName"] = "BarcodeFindViewUiListener.onFinishButtonTapped";
})(BarcodeFindViewEvents || (BarcodeFindViewEvents = {}));
var BarcodeFindListenerEvents;
(function (BarcodeFindListenerEvents) {
    BarcodeFindListenerEvents["onSearchStartedEvent"] = "BarcodeFindListener.onSearchStarted";
    BarcodeFindListenerEvents["onSearchPausedEvent"] = "BarcodeFindListener.onSearchPaused";
    BarcodeFindListenerEvents["onSearchStoppedEvent"] = "BarcodeFindListener.onSearchStopped";
    BarcodeFindListenerEvents["didUpdateSession"] = "BarcodeFindListener.didUpdateSession";
})(BarcodeFindListenerEvents || (BarcodeFindListenerEvents = {}));
var BarcodeFindTransformerEvents;
(function (BarcodeFindTransformerEvents) {
    BarcodeFindTransformerEvents["onTransformBarcodeData"] = "BarcodeFindTransformer.transformBarcodeData";
})(BarcodeFindTransformerEvents || (BarcodeFindTransformerEvents = {}));
class BarcodeFindViewController extends scanditDatacaptureFrameworksCore.BaseController {
    static forBarcodeFindView(baseView) {
        const viewController = new BarcodeFindViewController();
        viewController.baseView = baseView;
        return viewController;
    }
    constructor() {
        super('BarcodeFindViewProxy');
        this.isListenerEnabled = false;
        this.isViewListenerRegistered = false;
        this.isModeListenerRegistered = false;
        this.isTransformerRegistered = false;
        this.handleOnFinishButtonTappedEventWrapper = (ev) => {
            this.handleOnFinishButtonTappedEvent(ev);
        };
        this.handleOnTransformBarcodeDataEventWrapper = (ev) => {
            return this.handleOnTransformBarcodeDataEvent(ev);
        };
        this.handleDidUpdateSessionWrapper = (ev) => {
            this.handleDidUpdateSession(ev);
        };
        this.handleOnSearchStartedEventWrapper = (ev) => {
            this.handleOnSearchStartedEvent(ev);
        };
        this.handleOnSearchPausedEventWrapper = (ev) => {
            this.handleOnSearchPausedEvent(ev);
        };
        this.handleOnSearchStoppedEventWrapper = (ev) => {
            this.handleOnSearchStoppedEvent(ev);
        };
    }
    setUiListener(listener) {
        if (!this.isViewCreated)
            return; // view not created yet
        if (listener && !this.isListenerEnabled) {
            this.isListenerEnabled = true;
            void this.subscribeViewEvents();
        }
        if (listener == null) {
            this.isListenerEnabled = false;
            void this.unsubscribeViewEvents();
        }
    }
    startSearching() {
        if (!this.isViewCreated)
            return Promise.resolve(); // view not created yet
        return this._proxy.$barcodeFindViewStartSearching({ viewId: this.baseView.viewId });
    }
    stopSearching() {
        if (!this.isViewCreated)
            return Promise.resolve(); // view not created yet
        return this._proxy.$barcodeFindViewStopSearching({ viewId: this.baseView.viewId });
    }
    pauseSearching() {
        if (!this.isViewCreated)
            return Promise.resolve(); // view not created yet
        return this._proxy.$barcodeFindViewPauseSearching({ viewId: this.baseView.viewId });
    }
    updateView() {
        if (!this.isViewCreated)
            return Promise.resolve(); // view not created yet
        const barcodeFindViewJson = this.baseView.toJSON();
        return this._proxy.$updateFindView({ viewId: this.baseView.viewId, barcodeFindViewJson: JSON.stringify(barcodeFindViewJson) });
    }
    showView() {
        if (!this.isViewCreated)
            return Promise.resolve(); // view not created yet
        return this._proxy.$showFindView({ viewId: this.baseView.viewId });
    }
    hideView() {
        if (!this.isViewCreated)
            return Promise.resolve(); // view not created yet
        return this._proxy.$hideFindView({ viewId: this.baseView.viewId });
    }
    createNativeView() {
        return this.create();
    }
    removeNativeView() {
        void this.stop();
        void this.unsetBarcodeTransformer();
        void this.unsubscribeViewEvents();
        void this.unsubscribeModeEvents();
        return this._proxy.$removeFindView({ viewId: this.baseView.viewId });
    }
    subscribeViewEvents() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated || this.isViewListenerRegistered)
                return;
            this._proxy.subscribeForEvents(Object.values(BarcodeFindViewEvents));
            yield this._proxy.$$registerBarcodeFindViewListener({ viewId: this.baseView.viewId });
            this._proxy.eventEmitter.on(BarcodeFindViewEvents.onFinishButtonTappedEventName, this.handleOnFinishButtonTappedEventWrapper);
            this.isViewListenerRegistered = true;
        });
    }
    unsubscribeViewEvents() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewListenerRegistered)
                return;
            yield this._proxy.$unregisterBarcodeFindViewListener({ viewId: this.baseView.viewId });
            this._proxy.unsubscribeFromEvents(Object.values(BarcodeFindViewEvents));
            this._proxy.eventEmitter.off(BarcodeFindViewEvents.onFinishButtonTappedEventName, this.handleOnFinishButtonTappedEventWrapper);
            this.isViewListenerRegistered = false;
        });
    }
    // Mode
    updateMode() {
        if (!this.isViewCreated)
            return Promise.resolve(); // view not created yet
        return this._proxy.$updateFindMode({ viewId: this.baseView.viewId, barcodeFindJson: JSON.stringify(this.baseView.barcodeFind.toJSON()) });
    }
    setItemList(items) {
        if (!this.isViewCreated)
            return Promise.resolve(); // view not created yet
        const jsonString = items.map(item => item.toJSON());
        return this._proxy.$barcodeFindSetItemList({ viewId: this.baseView.viewId, itemsJson: JSON.stringify(jsonString) });
    }
    start() {
        if (!this.isViewCreated)
            return Promise.resolve(); // view not created yet
        return this._proxy.$barcodeFindModeStart({ viewId: this.baseView.viewId });
    }
    pause() {
        if (!this.isViewCreated)
            return Promise.resolve(); // view not created yet
        return this._proxy.$barcodeFindModePause({ viewId: this.baseView.viewId });
    }
    stop() {
        if (!this.isViewCreated)
            return Promise.resolve(); // view not created yet
        return this._proxy.$barcodeFindModeStop({ viewId: this.baseView.viewId });
    }
    setModeEnabledState(isEnabled) {
        if (!this.isViewCreated)
            return Promise.resolve(); // view not created yet
        return this._proxy.$setBarcodeFindModeEnabledState({ viewId: this.baseView.viewId, enabled: isEnabled });
    }
    updateFeedback(feedbackJson) {
        if (!this.isViewCreated)
            return Promise.resolve(); // view not created yet
        return this._proxy.$updateBarcodeFindFeedback({ viewId: this.baseView.viewId, feedbackJson });
    }
    setBarcodeTransformer() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated || this.isTransformerRegistered)
                return;
            this._proxy.subscribeForEvents(Object.values(BarcodeFindTransformerEvents));
            yield this._proxy.$$setBarcodeTransformer({ viewId: this.baseView.viewId });
            this._proxy.eventEmitter.on(BarcodeFindTransformerEvents.onTransformBarcodeData, this.handleOnTransformBarcodeDataEventWrapper);
            this.isTransformerRegistered = true;
        });
    }
    unsetBarcodeTransformer() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isTransformerRegistered)
                return;
            yield this._proxy.$unsetBarcodeTransformer({ viewId: this.baseView.viewId });
            this._proxy.unsubscribeFromEvents(Object.values(BarcodeFindTransformerEvents));
            this._proxy.eventEmitter.off(BarcodeFindTransformerEvents.onTransformBarcodeData, this.handleOnTransformBarcodeDataEventWrapper);
            this.isTransformerRegistered = false;
        });
    }
    subscribeModeEvents() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isViewCreated || this.isModeListenerRegistered)
                return;
            this._proxy.subscribeForEvents(Object.values(BarcodeFindListenerEvents));
            yield this._proxy.$$registerBarcodeFindListener({ viewId: this.baseView.viewId });
            this._proxy.eventEmitter.on(BarcodeFindListenerEvents.didUpdateSession, this.handleDidUpdateSessionWrapper);
            this._proxy.eventEmitter.on(BarcodeFindListenerEvents.onSearchStartedEvent, this.handleOnSearchStartedEventWrapper);
            this._proxy.eventEmitter.on(BarcodeFindListenerEvents.onSearchPausedEvent, this.handleOnSearchPausedEventWrapper);
            this._proxy.eventEmitter.on(BarcodeFindListenerEvents.onSearchStoppedEvent, this.handleOnSearchStoppedEventWrapper);
            this.isModeListenerRegistered = true;
        });
    }
    unsubscribeModeEvents() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (!this.isModeListenerRegistered)
                return;
            yield this._proxy.$unregisterBarcodeFindListener({ viewId: this.baseView.viewId });
            this._proxy.unsubscribeFromEvents(Object.values(BarcodeFindListenerEvents));
            this._proxy.eventEmitter.off(BarcodeFindListenerEvents.didUpdateSession, this.handleDidUpdateSessionWrapper);
            this._proxy.eventEmitter.off(BarcodeFindListenerEvents.onSearchStartedEvent, this.handleOnSearchStartedEventWrapper);
            this._proxy.eventEmitter.off(BarcodeFindListenerEvents.onSearchPausedEvent, this.handleOnSearchPausedEventWrapper);
            this._proxy.eventEmitter.off(BarcodeFindListenerEvents.onSearchStoppedEvent, this.handleOnSearchStoppedEventWrapper);
            this.isModeListenerRegistered = false;
        });
    }
    dispose() {
        void this.removeNativeView();
        this._proxy.dispose();
    }
    handleOnFinishButtonTappedEvent(ev) {
        var _a, _b;
        if (!this.baseView.barcodeFindViewUiListener) {
            return;
        }
        const { foundItems: barcodeFindItems = [] } = JSON.parse(ev.data);
        (_b = (_a = this.baseView) === null || _a === void 0 ? void 0 : _a.barcodeFindViewUiListener) === null || _b === void 0 ? void 0 : _b.didTapFinishButton(barcodeFindItems);
    }
    handleOnTransformBarcodeDataEvent(ev) {
        return __awaiter$1(this, void 0, void 0, function* () {
            var _a;
            const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
            if (payload === null) {
                console.error('BarcodeFindController onTransformBarcodeData payload is null');
                return;
            }
            if (payload.viewId !== this.baseView.viewId) {
                return;
            }
            const transformed = (_a = this.baseView.barcodeFind['barcodeTransformer']) === null || _a === void 0 ? void 0 : _a.transformBarcodeData(payload.data);
            yield this._proxy.$submitBarcodeFindTransformerResult({ viewId: this.baseView.viewId, transformedBarcode: transformed !== null && transformed !== void 0 ? transformed : null });
        });
    }
    create() {
        return __awaiter$1(this, void 0, void 0, function* () {
            const barcodeFindView = this.baseView.toJSON();
            const json = JSON.stringify(barcodeFindView);
            yield this._proxy.$createFindView({ viewId: this.baseView.viewId, json });
            return this.initialize();
        });
    }
    initialize() {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (this.baseView.barcodeFindViewUiListener) {
                void this.subscribeViewEvents();
            }
            if (this.baseView.barcodeFind['listeners'].length > 0) {
                yield this.subscribeModeEvents();
            }
            if (this.baseView.barcodeFind['barcodeTransformer']) {
                yield this.setBarcodeTransformer();
            }
        });
    }
    handleDidUpdateSession(ev) {
        var _a;
        const payload = scanditDatacaptureFrameworksCore.EventDataParser.parse(ev.data);
        if (payload === null) {
            console.error('BarcodeFindController didUpdateSession payload is null');
            return;
        }
        const session = BarcodeFindSession['fromJSON'](JSON.parse(payload.session));
        for (const listener of this.baseView.barcodeFind['listeners']) {
            (_a = listener === null || listener === void 0 ? void 0 : listener.didUpdateSession) === null || _a === void 0 ? void 0 : _a.call(listener, session);
        }
    }
    handleOnSearchStartedEvent(_ev) {
        var _a;
        for (const listener of this.baseView.barcodeFind['listeners']) {
            (_a = listener === null || listener === void 0 ? void 0 : listener.didStartSearch) === null || _a === void 0 ? void 0 : _a.call(listener);
        }
    }
    handleOnSearchPausedEvent(ev) {
        var _a;
        const foundItems = this.filterFoundItemsFromEvent(ev.data);
        for (const listener of this.baseView.barcodeFind['listeners']) {
            (_a = listener === null || listener === void 0 ? void 0 : listener.didPauseSearch) === null || _a === void 0 ? void 0 : _a.call(listener, foundItems);
        }
    }
    handleOnSearchStoppedEvent(ev) {
        var _a;
        const foundItems = this.filterFoundItemsFromEvent(ev.data);
        for (const listener of this.baseView.barcodeFind['listeners']) {
            (_a = listener === null || listener === void 0 ? void 0 : listener.didStopSearch) === null || _a === void 0 ? void 0 : _a.call(listener, foundItems);
        }
    }
    filterFoundItemsFromEvent(eventBody) {
        var _a;
        const foundItemsData = JSON.parse(eventBody).foundItems;
        const itemsToFind = JSON.parse((_a = this.baseView.barcodeFind['itemsToFind']) !== null && _a !== void 0 ? _a : '[]');
        const foundItems = itemsToFind.filter((item) => foundItemsData.includes(item.searchOptions.barcodeData));
        return foundItems;
    }
    get isViewCreated() {
        return this.baseView.viewId !== -1;
    }
}

class BaseBarcodeFindView {
    get viewId() {
        return this._viewId;
    }
    get barcodeFind() {
        return this._barcodeFind;
    }
    get barcodeFindViewUiListener() {
        return this._barcodeFindViewUiListener;
    }
    set barcodeFindViewUiListener(value) {
        this._barcodeFindViewUiListener = value;
        void this.controller.setUiListener(value);
    }
    get context() {
        return this._dataCaptureContext;
    }
    constructor(props) {
        this.isViewCreated = false;
        this._startSearching = false;
        this._isInitialized = false;
        this._viewId = -1; // -1 means the view is not created yet
        this._barcodeFindViewUiListener = null;
        this._dataCaptureContext = props.context;
        this._barcodeFind = props.barcodeFind;
        this._barcodeFindViewSettings = props.viewSettings;
        this._cameraSettings = props.cameraSettings;
        this.controller = BarcodeFindViewController.forBarcodeFindView(this);
        this._barcodeFind['controller'] = this.controller;
    }
    static get barcodeFindViewDefaults() {
        return getBarcodeFindDefaults().BarcodeFindView;
    }
    stopSearching() {
        this._startSearching = false;
        return this.controller.stopSearching();
    }
    startSearching() {
        this._startSearching = true;
        return this.controller.startSearching();
    }
    pauseSearching() {
        this._startSearching = false;
        return this.controller.pauseSearching();
    }
    show() {
        return this.controller.showView();
    }
    hide() {
        return this.controller.hideView();
    }
    static get hardwareTriggerSupported() {
        return BaseBarcodeFindView.barcodeFindViewDefaults.hardwareTriggerSupported;
    }
    createNativeView(viewId) {
        return __awaiter$1(this, void 0, void 0, function* () {
            if (this.isViewCreated) {
                return;
            }
            this._viewId = viewId;
            yield this.controller.createNativeView();
        });
    }
    removeNativeView() {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this.controller.removeNativeView();
            this.isViewCreated = false;
        });
    }
    get shouldShowUserGuidanceView() {
        return BaseBarcodeFindView.barcodeFindViewDefaults.shouldShowUserGuidanceView;
    }
    set shouldShowUserGuidanceView(value) {
        BaseBarcodeFindView.barcodeFindViewDefaults.shouldShowUserGuidanceView = value;
        void this.update();
    }
    get shouldShowHints() {
        return BaseBarcodeFindView.barcodeFindViewDefaults.shouldShowHints;
    }
    set shouldShowHints(value) {
        BaseBarcodeFindView.barcodeFindViewDefaults.shouldShowHints = value;
        void this.update();
    }
    get shouldShowCarousel() {
        return BaseBarcodeFindView.barcodeFindViewDefaults.shouldShowCarousel;
    }
    set shouldShowCarousel(value) {
        BaseBarcodeFindView.barcodeFindViewDefaults.shouldShowCarousel = value;
        void this.update();
    }
    get shouldShowPauseButton() {
        return BaseBarcodeFindView.barcodeFindViewDefaults.shouldShowPauseButton;
    }
    set shouldShowPauseButton(value) {
        BaseBarcodeFindView.barcodeFindViewDefaults.shouldShowPauseButton = value;
        void this.update();
    }
    get shouldShowFinishButton() {
        return BaseBarcodeFindView.barcodeFindViewDefaults.shouldShowFinishButton;
    }
    set shouldShowFinishButton(value) {
        BaseBarcodeFindView.barcodeFindViewDefaults.shouldShowFinishButton = value;
        void this.update();
    }
    get shouldShowProgressBar() {
        return BaseBarcodeFindView.barcodeFindViewDefaults.shouldShowProgressBar;
    }
    set shouldShowProgressBar(value) {
        BaseBarcodeFindView.barcodeFindViewDefaults.shouldShowProgressBar = value;
        void this.update();
    }
    get shouldShowTorchControl() {
        return BaseBarcodeFindView.barcodeFindViewDefaults.shouldShowTorchControl;
    }
    set shouldShowTorchControl(value) {
        BaseBarcodeFindView.barcodeFindViewDefaults.shouldShowTorchControl = value;
        void this.update();
    }
    get shouldShowZoomControl() {
        return BaseBarcodeFindView.barcodeFindViewDefaults.shouldShowZoomControl;
    }
    set shouldShowZoomControl(value) {
        BaseBarcodeFindView.barcodeFindViewDefaults.shouldShowZoomControl = value;
        void this.update();
    }
    get torchControlPosition() {
        return BaseBarcodeFindView.barcodeFindViewDefaults.torchControlPosition;
    }
    set torchControlPosition(value) {
        BaseBarcodeFindView.barcodeFindViewDefaults.torchControlPosition = value;
        void this.update();
    }
    get textForCollapseCardsButton() {
        return BaseBarcodeFindView.barcodeFindViewDefaults.textForCollapseCardsButton;
    }
    set textForCollapseCardsButton(value) {
        BaseBarcodeFindView.barcodeFindViewDefaults.textForCollapseCardsButton = value;
        void this.update();
    }
    get textForAllItemsFoundSuccessfullyHint() {
        return BaseBarcodeFindView.barcodeFindViewDefaults.textForAllItemsFoundSuccessfullyHint;
    }
    set textForAllItemsFoundSuccessfullyHint(value) {
        BaseBarcodeFindView.barcodeFindViewDefaults.textForAllItemsFoundSuccessfullyHint = value;
        void this.update();
    }
    get textForItemListUpdatedHint() {
        return BaseBarcodeFindView.barcodeFindViewDefaults.textForItemListUpdatedHint;
    }
    set textForItemListUpdatedHint(value) {
        BaseBarcodeFindView.barcodeFindViewDefaults.textForItemListUpdatedHint = value;
        void this.update();
    }
    get textForItemListUpdatedWhenPausedHint() {
        return BaseBarcodeFindView.barcodeFindViewDefaults.textForItemListUpdatedWhenPausedHint;
    }
    set textForItemListUpdatedWhenPausedHint(value) {
        BaseBarcodeFindView.barcodeFindViewDefaults.textForItemListUpdatedWhenPausedHint = value;
        void this.update();
    }
    get textForPointAtBarcodesToSearchHint() {
        return BaseBarcodeFindView.barcodeFindViewDefaults.textForPointAtBarcodesToSearchHint;
    }
    set textForPointAtBarcodesToSearchHint(value) {
        BaseBarcodeFindView.barcodeFindViewDefaults.textForPointAtBarcodesToSearchHint = value;
        void this.update();
    }
    get textForMoveCloserToBarcodesHint() {
        return BaseBarcodeFindView.barcodeFindViewDefaults.textForMoveCloserToBarcodesHint;
    }
    set textForMoveCloserToBarcodesHint(value) {
        BaseBarcodeFindView.barcodeFindViewDefaults.textForMoveCloserToBarcodesHint = value;
        void this.update();
    }
    get textForTapShutterToPauseScreenHint() {
        return BaseBarcodeFindView.barcodeFindViewDefaults.textForTapShutterToPauseScreenHint;
    }
    set textForTapShutterToPauseScreenHint(value) {
        BaseBarcodeFindView.barcodeFindViewDefaults.textForTapShutterToPauseScreenHint = value;
        void this.update();
    }
    get textForTapShutterToResumeSearchHint() {
        return BaseBarcodeFindView.barcodeFindViewDefaults.textForTapShutterToResumeSearchHint;
    }
    set textForTapShutterToResumeSearchHint(value) {
        BaseBarcodeFindView.barcodeFindViewDefaults.textForTapShutterToResumeSearchHint = value;
        void this.update();
    }
    dispose() {
        this.controller.dispose();
        this.isViewCreated = false;
    }
    toJSON() {
        var _a, _b, _c;
        const json = {
            View: {
                shouldShowUserGuidanceView: this.shouldShowUserGuidanceView,
                shouldShowHints: this.shouldShowHints,
                shouldShowCarousel: this.shouldShowCarousel,
                shouldShowPauseButton: this.shouldShowPauseButton,
                shouldShowFinishButton: this.shouldShowFinishButton,
                shouldShowProgressBar: this.shouldShowProgressBar,
                shouldShowTorchControl: this.shouldShowTorchControl,
                torchControlPosition: (_a = this.torchControlPosition) === null || _a === void 0 ? void 0 : _a.toString(),
                textForCollapseCardsButton: this.textForCollapseCardsButton,
                textForAllItemsFoundSuccessfullyHint: this.textForAllItemsFoundSuccessfullyHint,
                textForItemListUpdatedHint: this.textForItemListUpdatedHint,
                textForItemListUpdatedWhenPausedHint: this.textForItemListUpdatedWhenPausedHint,
                textForPointAtBarcodesToSearchHint: this.textForPointAtBarcodesToSearchHint,
                textForMoveCloserToBarcodesHint: this.textForMoveCloserToBarcodesHint,
                textForTapShutterToPauseScreenHint: this.textForTapShutterToPauseScreenHint,
                textForTapShutterToResumeSearchHint: this.textForTapShutterToResumeSearchHint,
                startSearching: this._startSearching,
                viewSettings: undefined,
                CameraSettings: undefined,
                viewId: this._viewId,
                hasListener: this.barcodeFindViewUiListener != null
            },
            BarcodeFind: this._barcodeFind.toJSON()
        };
        if (this._barcodeFindViewSettings != null) {
            json.View.viewSettings = (_b = this._barcodeFindViewSettings) === null || _b === void 0 ? void 0 : _b.toJSON();
        }
        if (this._cameraSettings != null) {
            json.View.cameraSettings = (_c = this._cameraSettings) === null || _c === void 0 ? void 0 : _c.toJSON();
        }
        return json;
    }
    update() {
        if (!this._isInitialized) {
            return Promise.resolve();
        }
        return this.controller.updateView();
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BaseBarcodeFindView.prototype, "isViewCreated", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BaseBarcodeFindView.prototype, "_viewId", void 0);

class BarcodeGeneratorCreationOptions {
    constructor(backgroundColor = null, foregroundColor = null, errorCorrectionLevel = null, versionNumber = null, minimumErrorCorrectionPercent = null, layers = null) {
        this.backgroundColor = backgroundColor;
        this.foregroundColor = foregroundColor;
        this.errorCorrectionLevel = errorCorrectionLevel;
        this.versionNumber = versionNumber;
        this.minimumErrorCorrectionPercent = minimumErrorCorrectionPercent;
        this.layers = layers;
    }
}

class BarcodeGeneratorBuilder {
    constructor(type, dataCaptureContext) {
        this.options = new BarcodeGeneratorCreationOptions();
        this.type = type;
        this.dataCaptureContext = dataCaptureContext;
    }
    withBackgroundColor(color) {
        this.options.backgroundColor = color;
        return this;
    }
    withForegroundColor(color) {
        this.options.foregroundColor = color;
        return this;
    }
    build() {
        return BarcodeGenerator.create(this.type, this.options, this.dataCaptureContext);
    }
}

class Code39BarcodeGeneratorBuilder extends BarcodeGeneratorBuilder {
    constructor(dataCaptureContext) {
        super('code39Generator', dataCaptureContext);
    }
}

class Code128BarcodeGeneratorBuilder extends BarcodeGeneratorBuilder {
    constructor(dataCaptureContext) {
        super('code128Generator', dataCaptureContext);
    }
}

class Ean13BarcodeGeneratorBuilder extends BarcodeGeneratorBuilder {
    constructor(dataCaptureContext) {
        super('ean13Generator', dataCaptureContext);
    }
}

class UpcaBarcodeGeneratorBuilder extends BarcodeGeneratorBuilder {
    constructor(dataCaptureContext) {
        super('upcaGenerator', dataCaptureContext);
    }
}

class InterleavedTwoOfFiveBarcodeGeneratorBuilder extends BarcodeGeneratorBuilder {
    constructor(dataCaptureContext) {
        super('interleavedTwoOfFiveGenerator', dataCaptureContext);
    }
}

class QrCodeBarcodeGeneratorBuilder extends BarcodeGeneratorBuilder {
    constructor(dataCaptureContext) {
        super('qrCodeGenerator', dataCaptureContext);
    }
    withErrorCorrectionLevel(errorCorrectionLevel) {
        this.options.errorCorrectionLevel = errorCorrectionLevel;
        return this;
    }
    withVersionNumber(versionNumber) {
        this.options.versionNumber = versionNumber;
        return this;
    }
}

class DataMatrixBarcodeGeneratorBuilder extends BarcodeGeneratorBuilder {
    constructor(dataCaptureContext) {
        super('dataMatrixGenerator', dataCaptureContext);
    }
}

class BarcodeGeneratorController extends scanditDatacaptureFrameworksCore.BaseController {
    constructor(generator) {
        super('BarcodeGeneratorProxy');
        this.generator = generator;
    }
    initialize() {
        return __awaiter$1(this, void 0, void 0, function* () {
            // We call update because it returns a promise, this guarantees, that by the time
            // we need the deserialized context, it will be set in the native layer.
            yield this.generator['dataCaptureContext']['update']();
            yield this.create();
        });
    }
    create() {
        return this._proxy.$executeNativeBarcodeGenerator({
            methodName: 'createBarcodeGenerator',
            barcodeGeneratorJson: JSON.stringify(this.generator.toJSON())
        });
    }
    generateFromBase64EncodedData(data, imageWidth) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const result = yield this._proxy.$executeNativeBarcodeGenerator({
                methodName: 'generateFromBase64EncodedData',
                generatorId: this.generator.id,
                data: data,
                imageWidth: imageWidth
            });
            if (result == null) {
                return '';
            }
            return result.data;
        });
    }
    generate(text, imageWidth) {
        return __awaiter$1(this, void 0, void 0, function* () {
            const result = yield this._proxy.$executeNativeBarcodeGenerator({
                methodName: 'generateFromString',
                generatorId: this.generator.id,
                text: text,
                imageWidth: imageWidth
            });
            if (result == null) {
                return '';
            }
            return result.data;
        });
    }
    dispose() {
        return this._proxy.$executeNativeBarcodeGenerator({
            methodName: 'disposeBarcodeGenerator',
            generatorId: this.generator.id
        });
    }
}

class AztecBarcodeGeneratorBuilder extends BarcodeGeneratorBuilder {
    constructor(dataCaptureContext) {
        super('aztecGenerator', dataCaptureContext);
    }
    withMinimumErrorCorrectionPercent(minimumErrorCorrectionPercent) {
        this.options.minimumErrorCorrectionPercent = minimumErrorCorrectionPercent;
        return this;
    }
    withLayers(layers) {
        this.options.layers = layers;
        return this;
    }
}

class BarcodeGenerator extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    get id() {
        return this._id;
    }
    static create(type, options, dataCaptureContext) {
        const generator = new BarcodeGenerator(dataCaptureContext, type, options.backgroundColor, options.backgroundColor, options.errorCorrectionLevel, options.versionNumber);
        void generator.initialize();
        return generator;
    }
    static code39BarcodeGeneratorBuilder(dataCaptureContext) {
        return new Code39BarcodeGeneratorBuilder(dataCaptureContext);
    }
    static code128BarcodeGeneratorBuilder(dataCaptureContext) {
        return new Code128BarcodeGeneratorBuilder(dataCaptureContext);
    }
    static ean13BarcodeGeneratorBuilder(dataCaptureContext) {
        return new Ean13BarcodeGeneratorBuilder(dataCaptureContext);
    }
    static upcaBarcodeGeneratorBuilder(dataCaptureContext) {
        return new UpcaBarcodeGeneratorBuilder(dataCaptureContext);
    }
    static interleavedTwoOfFiveBarcodeGeneratorBuilder(dataCaptureContext) {
        return new InterleavedTwoOfFiveBarcodeGeneratorBuilder(dataCaptureContext);
    }
    static qrCodeBarcodeGeneratorBuilder(dataCaptureContext) {
        return new QrCodeBarcodeGeneratorBuilder(dataCaptureContext);
    }
    static dataMatrixBarcodeGeneratorBuilder(dataCaptureContext) {
        return new DataMatrixBarcodeGeneratorBuilder(dataCaptureContext);
    }
    static aztecBarcodeGeneratorBuilder(dataCaptureContext) {
        return new AztecBarcodeGeneratorBuilder(dataCaptureContext);
    }
    constructor(dataCaptureContext, type, backgroundColor, foregroundColor, errorCorrectionLevel, versionNumber) {
        super();
        this._id = `${Date.now()}`;
        this.errorCorrectionLevel = null;
        this.initializationPromise = undefined;
        this.dataCaptureContext = dataCaptureContext;
        this.type = type;
        this.backgroundColor = backgroundColor;
        this.foregroundColor = foregroundColor;
        this.errorCorrectionLevel = errorCorrectionLevel;
        this.versionNumber = versionNumber;
    }
    generate(text, imageWidth) {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this.initializationPromise;
            return this.controller.generate(text, imageWidth);
        });
    }
    generateFromBase64EncodedData(data, imageWidth) {
        return __awaiter$1(this, void 0, void 0, function* () {
            yield this.initializationPromise;
            return this.controller.generateFromBase64EncodedData(data, imageWidth);
        });
    }
    dispose() {
        void this.controller.dispose();
    }
    initialize() {
        return __awaiter$1(this, void 0, void 0, function* () {
            this.controller = new BarcodeGeneratorController(this);
            this.initializationPromise = this.controller.initialize();
            return this.initializationPromise;
        });
    }
}
__decorate$1([
    scanditDatacaptureFrameworksCore.nameForSerialization('id')
], BarcodeGenerator.prototype, "_id", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeGenerator.prototype, "dataCaptureContext", void 0);
__decorate$1([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeGenerator.prototype, "controller", void 0);

exports.QrCodeErrorCorrectionLevel = void 0;
(function (QrCodeErrorCorrectionLevel) {
    QrCodeErrorCorrectionLevel["Low"] = "low";
    QrCodeErrorCorrectionLevel["Medium"] = "medium";
    QrCodeErrorCorrectionLevel["Quartile"] = "quartile";
    QrCodeErrorCorrectionLevel["High"] = "high";
})(exports.QrCodeErrorCorrectionLevel || (exports.QrCodeErrorCorrectionLevel = {}));

const BARCODE_PROXY_TYPE_NAMES = [
    'BarcodeCaptureListenerProxy',
    'BarcodeCaptureOverlayProxy',
    'BarcodeBatchListenerProxy',
    'BarcodeBatchBasicOverlayProxy',
    'BarcodeBatchAdvancedOverlayProxy',
    'BarcodeSelectionListenerProxy',
    'BarcodeSelectionOverlayProxy',
    'BarcodeSelectionProxy',
    'BarcodeCountSessionProxy',
    'BarcodeCountViewProxy',
    'BarcodePickViewProxy',
    'BarcodeFindViewProxy',
    'SparkScanViewProxy',
    'BarcodeGeneratorProxy',
    'BarcodeArSessionProxy',
    'BarcodeArViewProxy',
];

function registerBarcodeProxies(provider) {
    scanditDatacaptureFrameworksCore.registerProxies(BARCODE_PROXY_TYPE_NAMES, provider);
}

class CordovaBarcodeNativeCallerProvider {
    getNativeCaller(_proxyType) {
        return scanditCordovaDatacaptureCore.createCordovaNativeCaller(Cordova.exec, Cordova.pluginName);
    }
}

function initBarcodeProxies() {
    registerBarcodeProxies(new CordovaBarcodeNativeCallerProvider());
}

// tslint:disable-next-line:variable-name
const Cordova = {
    pluginName: 'ScanditBarcodeCapture',
    defaults: {},
    exec: (success, error, functionName, args) => scanditCordovaDatacaptureCore.cordovaExec(success, error, Cordova.pluginName, functionName, args),
};
function getDefaults() {
    return new Promise((resolve, reject) => {
        Cordova.exec((defaultsJSON) => {
            loadBarcodeDefaults(defaultsJSON);
            loadBarcodeCaptureDefaults(defaultsJSON.BarcodeCapture);
            loadBarcodeSelectionDefaults(defaultsJSON.BarcodeSelection);
            loadBarcodeBatchDefaults(defaultsJSON.BarcodeBatch);
            loadBarcodePickDefaults(defaultsJSON.BarcodePick);
            loadSparkScanDefaults(defaultsJSON.SparkScan);
            loadBarcodeFindDefaults(defaultsJSON.BarcodeFind);
            loadBarcodeCountDefaults(defaultsJSON.BarcodeCount);
            initBarcodeProxies();
            resolve();
        }, reject, 'getDefaults', null);
    });
}
function initializeBarcodeCordova() {
    scanditCordovaDatacaptureCore.initializePlugin(Cordova.pluginName, getDefaults);
}

class BarcodeFindView {
    constructor(props) {
        this.htmlElement = null;
        this.htmlElementState = new scanditDatacaptureFrameworksCore.HTMLElementState();
        this.domObserver = new MutationObserver(this.elementDidChange.bind(this));
        this.scrollListener = this.elementDidChange.bind(this);
        this.orientationChangeListener = (() => {
            this.elementDidChange();
            // SDC-1784 -> workaround because at the moment of this callback the element doesn't have the updated size.
            setTimeout(this.elementDidChange.bind(this), 100);
            setTimeout(this.elementDidChange.bind(this), 300);
            setTimeout(this.elementDidChange.bind(this), 1000);
        });
        this.baseBarcodeFindView = new BaseBarcodeFindView(props);
    }
    get barcodeFindViewUiListener() {
        return this.baseBarcodeFindView.barcodeFindViewUiListener;
    }
    set barcodeFindViewUiListener(value) {
        this.baseBarcodeFindView.barcodeFindViewUiListener = value;
    }
    static get hardwareTriggerSupported() {
        return BaseBarcodeFindView.hardwareTriggerSupported;
    }
    get shouldShowUserGuidanceView() {
        return this.baseBarcodeFindView.shouldShowUserGuidanceView;
    }
    set shouldShowUserGuidanceView(value) {
        this.baseBarcodeFindView.shouldShowUserGuidanceView = value;
    }
    get shouldShowHints() {
        return this.baseBarcodeFindView.shouldShowHints;
    }
    set shouldShowHints(value) {
        this.baseBarcodeFindView.shouldShowHints = value;
    }
    get shouldShowCarousel() {
        return this.baseBarcodeFindView.shouldShowCarousel;
    }
    set shouldShowCarousel(value) {
        this.baseBarcodeFindView.shouldShowCarousel = value;
    }
    get shouldShowPauseButton() {
        return this.baseBarcodeFindView.shouldShowPauseButton;
    }
    set shouldShowPauseButton(value) {
        this.baseBarcodeFindView.shouldShowPauseButton = value;
    }
    get shouldShowFinishButton() {
        return this.baseBarcodeFindView.shouldShowFinishButton;
    }
    set shouldShowFinishButton(value) {
        this.baseBarcodeFindView.shouldShowFinishButton = value;
    }
    get shouldShowProgressBar() {
        return this.baseBarcodeFindView.shouldShowProgressBar;
    }
    set shouldShowProgressBar(value) {
        this.baseBarcodeFindView.shouldShowProgressBar = value;
    }
    get shouldShowTorchControl() {
        return this.baseBarcodeFindView.shouldShowTorchControl;
    }
    set shouldShowTorchControl(value) {
        this.baseBarcodeFindView.shouldShowTorchControl = value;
    }
    get shouldShowZoomControl() {
        return this.baseBarcodeFindView.shouldShowZoomControl;
    }
    set shouldShowZoomControl(value) {
        this.baseBarcodeFindView.shouldShowZoomControl = value;
    }
    get torchControlPosition() {
        return this.baseBarcodeFindView.torchControlPosition;
    }
    set torchControlPosition(value) {
        this.baseBarcodeFindView.torchControlPosition = value;
    }
    get textForCollapseCardsButton() {
        return this.baseBarcodeFindView.textForCollapseCardsButton;
    }
    set textForCollapseCardsButton(value) {
        this.baseBarcodeFindView.textForCollapseCardsButton = value;
    }
    get textForAllItemsFoundSuccessfullyHint() {
        return this.baseBarcodeFindView.textForAllItemsFoundSuccessfullyHint;
    }
    set textForAllItemsFoundSuccessfullyHint(value) {
        this.baseBarcodeFindView.textForAllItemsFoundSuccessfullyHint = value;
    }
    get textForItemListUpdatedHint() {
        return this.baseBarcodeFindView.textForItemListUpdatedHint;
    }
    set textForItemListUpdatedHint(value) {
        this.baseBarcodeFindView.textForItemListUpdatedHint = value;
    }
    get textForItemListUpdatedWhenPausedHint() {
        return this.baseBarcodeFindView.textForItemListUpdatedWhenPausedHint;
    }
    set textForItemListUpdatedWhenPausedHint(value) {
        this.baseBarcodeFindView.textForItemListUpdatedWhenPausedHint = value;
    }
    get textForPointAtBarcodesToSearchHint() {
        return this.baseBarcodeFindView.textForPointAtBarcodesToSearchHint;
    }
    set textForPointAtBarcodesToSearchHint(value) {
        this.baseBarcodeFindView.textForPointAtBarcodesToSearchHint = value;
    }
    get textForMoveCloserToBarcodesHint() {
        return this.baseBarcodeFindView.textForMoveCloserToBarcodesHint;
    }
    set textForMoveCloserToBarcodesHint(value) {
        this.baseBarcodeFindView.textForMoveCloserToBarcodesHint = value;
    }
    get textForTapShutterToPauseScreenHint() {
        return this.baseBarcodeFindView.textForTapShutterToPauseScreenHint;
    }
    set textForTapShutterToPauseScreenHint(value) {
        this.baseBarcodeFindView.textForTapShutterToPauseScreenHint = value;
    }
    get textForTapShutterToResumeSearchHint() {
        return this.baseBarcodeFindView.textForTapShutterToResumeSearchHint;
    }
    set textForTapShutterToResumeSearchHint(value) {
        this.baseBarcodeFindView.textForTapShutterToResumeSearchHint = value;
    }
    stopSearching() {
        return this.baseBarcodeFindView.stopSearching();
    }
    startSearching() {
        return this.baseBarcodeFindView.startSearching();
    }
    pauseSearching() {
        return this.baseBarcodeFindView.pauseSearching();
    }
    connectToElement(element) {
        const viewId = (Date.now() / 1000) | 0;
        this.baseBarcodeFindView.createNativeView(viewId).then(() => {
            this.htmlElement = element;
            this.htmlElementState = new scanditDatacaptureFrameworksCore.HTMLElementState();
            // Initial update
            this.elementDidChange();
            this.subscribeToChangesOnHTMLElement();
        });
    }
    detachFromElement() {
        this.baseBarcodeFindView.removeNativeView().then(() => {
            this.unsubscribeFromChangesOnHTMLElement();
            this.htmlElement = null;
            this.elementDidChange();
        });
    }
    show() {
        if (this.htmlElement) {
            throw new Error("Views should only be manually shown if they're manually sized using setFrame");
        }
        return this._show();
    }
    hide() {
        if (this.htmlElement) {
            throw new Error("Views should only be manually hidden if they're manually sized using setFrame");
        }
        return this._hide();
    }
    subscribeToChangesOnHTMLElement() {
        this.domObserver.observe(document, { attributes: true, childList: true, subtree: true });
        window.addEventListener('scroll', this.scrollListener);
        window.addEventListener('orientationchange', this.orientationChangeListener);
    }
    unsubscribeFromChangesOnHTMLElement() {
        this.domObserver.disconnect();
        window.removeEventListener('scroll', this.scrollListener);
        window.removeEventListener('orientationchange', this.orientationChangeListener);
    }
    elementDidChange() {
        if (!this.htmlElement) {
            this.htmlElementState = new scanditDatacaptureFrameworksCore.HTMLElementState();
            return;
        }
        const newState = new scanditDatacaptureFrameworksCore.HTMLElementState();
        const boundingRect = this.htmlElement.getBoundingClientRect();
        newState.position = new scanditDatacaptureFrameworksCore.HtmlElementPosition(boundingRect.top, boundingRect.left);
        newState.size = new scanditDatacaptureFrameworksCore.HtmlElementSize(boundingRect.width, boundingRect.height);
        newState.shouldBeUnderContent = parseInt(this.htmlElement.style.zIndex || '1', 10) < 0
            || parseInt(getComputedStyle(this.htmlElement).zIndex || '1', 10) < 0;
        const isDisplayed = getComputedStyle(this.htmlElement).display !== 'none'
            && this.htmlElement.style.display !== 'none';
        const isInDOM = document.body.contains(this.htmlElement);
        newState.isShown = isDisplayed && isInDOM && !this.htmlElement.hidden;
        this.htmlElementState = newState;
    }
    _show() {
        return this.baseBarcodeFindView.show();
    }
    _hide() {
        return this.baseBarcodeFindView.hide();
    }
    toJSON() {
        return this.baseBarcodeFindView.toJSON();
    }
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

class BarcodePickView extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static get cordovaExec() {
        return Cordova.exec;
    }
    constructor(props) {
        super();
        this.viewId = Math.floor(Math.random() * 1000000);
        this.htmlElement = null;
        this._htmlElementState = new scanditDatacaptureFrameworksCore.HTMLElementState();
        this.domObserver = new MutationObserver(this.elementDidChange.bind(this));
        this.scrollListener = this.elementDidChange.bind(this);
        this.orientationChangeListener = () => {
            this.elementDidChange();
            // SDC-1784 -> workaround because at the moment of this callback the element doesn't have the updated size.
            setTimeout(this.elementDidChange.bind(this), 100);
            setTimeout(this.elementDidChange.bind(this), 300);
            setTimeout(this.elementDidChange.bind(this), 1000);
        };
        this.baseBarcodePickView = new BaseBarcodePickView({
            context: props.context,
            barcodePick: props.barcodePick,
            settings: props.settings,
            cameraSettings: props.cameraSettings,
        });
    }
    get uiListener() {
        return this.baseBarcodePickView.uiListener;
    }
    set uiListener(value) {
        this.baseBarcodePickView.uiListener = value;
    }
    set htmlElementState(newState) {
        const didChangeShown = this._htmlElementState.isShown !== newState.isShown;
        const didChangePositionOrSize = this._htmlElementState.didChangeComparedTo(newState);
        this._htmlElementState = newState;
        if (didChangePositionOrSize) {
            this.updatePositionAndSize();
        }
        if (didChangeShown) {
            if (this._htmlElementState.isShown) {
                this.start();
            }
        }
    }
    get htmlElementState() {
        return this._htmlElementState;
    }
    connectToElement(element) {
        this.baseBarcodePickView.createNativeView(this.viewId).then(() => {
            this.htmlElement = element;
            this.htmlElementState = new scanditDatacaptureFrameworksCore.HTMLElementState();
            // Initial update
            this.elementDidChange();
            this.subscribeToChangesOnHTMLElement();
        });
    }
    detachFromElement() {
        this.baseBarcodePickView.removeNativeView().then(() => {
            this.unsubscribeFromChangesOnHTMLElement();
            this.htmlElement = null;
            this.elementDidChange();
        });
    }
    subscribeToChangesOnHTMLElement() {
        this.domObserver.observe(document, { attributes: true, childList: true, subtree: true });
        window.addEventListener('scroll', this.scrollListener);
        window.addEventListener('orientationchange', this.orientationChangeListener);
    }
    unsubscribeFromChangesOnHTMLElement() {
        this.domObserver.disconnect();
        window.removeEventListener('scroll', this.scrollListener);
        window.removeEventListener('orientationchange', this.orientationChangeListener);
    }
    elementDidChange() {
        if (!this.htmlElement) {
            this.htmlElementState = new scanditDatacaptureFrameworksCore.HTMLElementState();
            return;
        }
        const newState = new scanditDatacaptureFrameworksCore.HTMLElementState();
        const boundingRect = this.htmlElement.getBoundingClientRect();
        newState.position = new scanditDatacaptureFrameworksCore.HtmlElementPosition(boundingRect.top, boundingRect.left);
        newState.size = new scanditDatacaptureFrameworksCore.HtmlElementSize(boundingRect.width, boundingRect.height);
        newState.shouldBeUnderContent =
            parseInt(this.htmlElement.style.zIndex || '1', 10) < 0 ||
                parseInt(getComputedStyle(this.htmlElement).zIndex || '1', 10) < 0;
        const isDisplayed = getComputedStyle(this.htmlElement).display !== 'none' && this.htmlElement.style.display !== 'none';
        const isInDOM = document.body.contains(this.htmlElement);
        newState.isShown = isDisplayed && isInDOM && !this.htmlElement.hidden;
        this.htmlElementState = newState;
    }
    updatePositionAndSize() {
        if (!this.htmlElementState || !this.htmlElementState.isValid) {
            return;
        }
        this.setPositionAndSize(this.htmlElementState.position.top, this.htmlElementState.position.left, this.htmlElementState.size.width, this.htmlElementState.size.height, this.htmlElementState.shouldBeUnderContent);
    }
    setPositionAndSize(top, left, width, height, shouldBeUnderWebView) {
        return new Promise((resolve, reject) => {
            BarcodePickView.cordovaExec(resolve, reject, 'setPickViewPositionAndSize', [
                { top: top, left: left, width: width, height: height, shouldBeUnderWebView: shouldBeUnderWebView },
            ]);
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.baseBarcodePickView.start();
        });
    }
    freeze() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.baseBarcodePickView.freeze();
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.baseBarcodePickView.stop();
        });
    }
    pause() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.baseBarcodePickView.pause();
        });
    }
    resume() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.baseBarcodePickView.resume();
        });
    }
    reset() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.baseBarcodePickView.reset();
        });
    }
    addListener(listener) {
        this.baseBarcodePickView.addListener(listener);
    }
    removeListener(listener) {
        this.baseBarcodePickView.removeListener(listener);
    }
    addActionListener(listener) {
        this.baseBarcodePickView.addActionListener(listener);
    }
    removeActionListener(listener) {
        this.baseBarcodePickView.removeActionListener(listener);
    }
    release() {
        this.baseBarcodePickView.dispose();
    }
}
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePickView.prototype, "baseBarcodePickView", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePickView.prototype, "htmlElement", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePickView.prototype, "_htmlElementState", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePickView.prototype, "domObserver", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePickView.prototype, "scrollListener", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodePickView.prototype, "orientationChangeListener", void 0);

class TrackedBarcodeView extends scanditDatacaptureFrameworksCore.DefaultSerializeable {
    static withHTMLElement(element, options) {
        return this.getEncodedImageData(element).then(data => new TrackedBarcodeView(data, options));
    }
    static withBase64EncodedData(data, options) {
        return Promise.resolve(new TrackedBarcodeView(data, options));
    }
    static getEncodedImageData(element) {
        return this.getBase64DataForSVG(this.getSVGDataForElement(element));
    }
    static getSize(element) {
        const isInDOM = document.body.contains(element);
        if (!isInDOM) {
            document.body.appendChild(element);
        }
        const size = element.getBoundingClientRect();
        if (!isInDOM) {
            document.body.removeChild(element);
        }
        return new scanditDatacaptureFrameworksCore.Size(size.width, size.height);
    }
    static getSVGDataForElement(element) {
        const size = this.getSize(element);
        const data = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}px" height="${size.height}px">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">
            ${element.outerHTML}
          </div>
        </foreignObject>
      </svg>`);
        return { data, size };
    }
    static getCanvasWithSize(size) {
        const canvas = document.createElement('canvas');
        canvas.width = size.width;
        canvas.height = size.height;
        return canvas;
    }
    static getBase64DataForSVG(svgData) {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                const canvas = this.getCanvasWithSize(svgData.size);
                canvas.getContext('2d').drawImage(image, 0, 0);
                resolve(canvas.toDataURL('image/png', 1));
            };
            image.onerror = reject;
            image.src = 'data:image/svg+xml,' + svgData.data;
        });
    }
    constructor(encodedData, options) {
        super();
        if (options == null) {
            options = { scale: 1 };
        }
        this.data = encodedData;
        this.options = options;
    }
}

class BarcodeBatchAdvancedOverlay {
    get type() {
        return this.baseBarcodeBatchOverlay.type;
    }
    get shouldShowScanAreaGuides() {
        return this.baseBarcodeBatchOverlay.shouldShowScanAreaGuides;
    }
    set shouldShowScanAreaGuides(shouldShow) {
        this.baseBarcodeBatchOverlay.shouldShowScanAreaGuides = shouldShow;
    }
    get listener() {
        return this.baseBarcodeBatchOverlay.listener;
    }
    set listener(listener) {
        this.baseBarcodeBatchOverlay.listener = listener;
    }
    constructor(mode) {
        this.baseBarcodeBatchOverlay = new BaseBarcodeBatchAdvancedOverlay(mode);
    }
    setViewForTrackedBarcode(view, trackedBarcode) {
        return this.baseBarcodeBatchOverlay.setViewForTrackedBarcode(view, trackedBarcode);
    }
    setAnchorForTrackedBarcode(anchor, trackedBarcode) {
        return this.baseBarcodeBatchOverlay.setAnchorForTrackedBarcode(anchor, trackedBarcode);
    }
    setOffsetForTrackedBarcode(offset, trackedBarcode) {
        return this.baseBarcodeBatchOverlay.setOffsetForTrackedBarcode(offset, trackedBarcode);
    }
    clearTrackedBarcodeViews() {
        return this.baseBarcodeBatchOverlay.clearTrackedBarcodeViews();
    }
    set view(newView) {
        this.baseBarcodeBatchOverlay.view = newView;
    }
    get view() {
        return this.baseBarcodeBatchOverlay.view;
    }
    toJSON() {
        return this.baseBarcodeBatchOverlay.toJSON();
    }
}

class SparkScanView {
    get uiListener() {
        return this.baseSparkScanView.uiListener;
    }
    set uiListener(newValue) {
        this.baseSparkScanView.uiListener = newValue;
    }
    static forContext(context, sparkScan, settings) {
        const view = new SparkScanView({ context, sparkScan, settings });
        return view;
    }
    static get defaultBrush() {
        return BaseSparkScanView.defaultBrush;
    }
    constructor({ context, sparkScan, settings }) {
        this.baseSparkScanView = new BaseSparkScanView({ context: context, sparkScan: sparkScan, settings: settings });
        const viewId = (Date.now() / 1000) | 0;
        this.baseSparkScanView.createNativeView(viewId);
    }
    get previewSizeControlVisible() {
        return this.baseSparkScanView.previewSizeControlVisible;
    }
    set previewSizeControlVisible(newValue) {
        this.baseSparkScanView.previewSizeControlVisible = newValue;
    }
    get scanningBehaviorButtonVisible() {
        return this.baseSparkScanView.scanningBehaviorButtonVisible;
    }
    set scanningBehaviorButtonVisible(newValue) {
        this.baseSparkScanView.scanningBehaviorButtonVisible = newValue;
    }
    get barcodeCountButtonVisible() {
        return this.baseSparkScanView.barcodeCountButtonVisible;
    }
    set barcodeCountButtonVisible(newValue) {
        this.baseSparkScanView.barcodeCountButtonVisible = newValue;
    }
    get barcodeFindButtonVisible() {
        return this.baseSparkScanView.barcodeFindButtonVisible;
    }
    set barcodeFindButtonVisible(newValue) {
        this.baseSparkScanView.barcodeFindButtonVisible = newValue;
    }
    get targetModeButtonVisible() {
        return this.baseSparkScanView.targetModeButtonVisible;
    }
    set targetModeButtonVisible(newValue) {
        this.baseSparkScanView.targetModeButtonVisible = newValue;
    }
    get labelCaptureButtonVisible() {
        return this.baseSparkScanView.labelCaptureButtonVisible;
    }
    set labelCaptureButtonVisible(newValue) {
        this.baseSparkScanView.labelCaptureButtonVisible = newValue;
    }
    get toolbarBackgroundColor() {
        return this.baseSparkScanView.toolbarBackgroundColor;
    }
    set toolbarBackgroundColor(newValue) {
        this.baseSparkScanView.toolbarBackgroundColor = newValue;
    }
    get toolbarIconActiveTintColor() {
        return this.baseSparkScanView.toolbarIconActiveTintColor;
    }
    set toolbarIconActiveTintColor(newValue) {
        this.baseSparkScanView.toolbarIconActiveTintColor = newValue;
    }
    get toolbarIconInactiveTintColor() {
        return this.baseSparkScanView.toolbarIconInactiveTintColor;
    }
    set toolbarIconInactiveTintColor(newValue) {
        this.baseSparkScanView.toolbarIconInactiveTintColor = newValue;
    }
    get cameraSwitchButtonVisible() {
        return this.baseSparkScanView.cameraSwitchButtonVisible;
    }
    set cameraSwitchButtonVisible(newValue) {
        this.baseSparkScanView.cameraSwitchButtonVisible = newValue;
    }
    get torchControlVisible() {
        return this.baseSparkScanView.torchControlVisible;
    }
    set torchControlVisible(newValue) {
        this.baseSparkScanView.torchControlVisible = newValue;
    }
    get previewCloseControlVisible() {
        return this.baseSparkScanView.previewCloseControlVisible;
    }
    set previewCloseControlVisible(newValue) {
        this.baseSparkScanView.previewCloseControlVisible = newValue;
    }
    get triggerButtonAnimationColor() {
        return this.baseSparkScanView.triggerButtonAnimationColor;
    }
    set triggerButtonAnimationColor(newValue) {
        this.baseSparkScanView.triggerButtonAnimationColor = newValue;
    }
    get triggerButtonExpandedColor() {
        return this.baseSparkScanView.triggerButtonExpandedColor;
    }
    set triggerButtonExpandedColor(newValue) {
        this.baseSparkScanView.triggerButtonExpandedColor = newValue;
    }
    get triggerButtonCollapsedColor() {
        return this.baseSparkScanView.triggerButtonCollapsedColor;
    }
    set triggerButtonCollapsedColor(newValue) {
        this.baseSparkScanView.triggerButtonCollapsedColor = newValue;
    }
    get triggerButtonTintColor() {
        return this.baseSparkScanView.triggerButtonTintColor;
    }
    set triggerButtonTintColor(newValue) {
        this.baseSparkScanView.triggerButtonTintColor = newValue;
    }
    get triggerButtonVisible() {
        return this.baseSparkScanView.triggerButtonVisible;
    }
    set triggerButtonVisible(newValue) {
        this.baseSparkScanView.triggerButtonVisible = newValue;
    }
    get triggerButtonImage() {
        return this.baseSparkScanView.triggerButtonImage;
    }
    set triggerButtonImage(newValue) {
        this.baseSparkScanView.triggerButtonImage = newValue;
    }
    prepareScanning() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.baseSparkScanView.prepareScanning();
        });
    }
    startScanning() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.baseSparkScanView.startScanning();
        });
    }
    pauseScanning() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.baseSparkScanView.pauseScanning();
        });
    }
    stopScanning() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.baseSparkScanView.stopScanning();
        });
    }
    dispose() {
        this.baseSparkScanView.dispose();
    }
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.baseSparkScanView.show();
        });
    }
    hide() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.baseSparkScanView.hide();
        });
    }
    get feedbackDelegate() {
        return this.baseSparkScanView.feedbackDelegate;
    }
    set feedbackDelegate(delegate) {
        this.baseSparkScanView.feedbackDelegate = delegate;
    }
    showToast(text) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.baseSparkScanView.showToast(text);
        });
    }
    toJSON() {
        return this.baseSparkScanView.toJSON();
    }
}

const BarcodeCountDefaults = {
    get BarcodeCountView() {
        const defaults = getBarcodeCountDefaults();
        return defaults.BarcodeCountView;
    }
};
class BarcodeCountView {
    static get defaultRecognizedBrush() {
        return BaseBarcodeCountView.defaultRecognizedBrush;
    }
    static get defaultNotInListBrush() {
        return BaseBarcodeCountView.defaultNotInListBrush;
    }
    static get defaultAcceptedBrush() {
        return BaseBarcodeCountView.defaultAcceptedBrush;
    }
    static get defaultRejectedBrush() {
        return BaseBarcodeCountView.defaultRejectedBrush;
    }
    static get hardwareTriggerSupported() {
        return BaseBarcodeCountView.hardwareTriggerSupported;
    }
    get uiListener() {
        return this.baseBarcodeCountView.uiListener;
    }
    set uiListener(listener) {
        this.baseBarcodeCountView.uiListener = listener;
    }
    get listener() {
        return this.baseBarcodeCountView.listener;
    }
    set listener(listener) {
        this.baseBarcodeCountView.listener = listener;
    }
    get shouldShowUserGuidanceView() {
        return this.baseBarcodeCountView.shouldShowUserGuidanceView;
    }
    set shouldShowUserGuidanceView(newValue) {
        this.baseBarcodeCountView.shouldShowUserGuidanceView = newValue;
    }
    get shouldShowListButton() {
        return this.baseBarcodeCountView.shouldShowListButton;
    }
    set shouldShowListButton(newValue) {
        this.baseBarcodeCountView.shouldShowListButton = newValue;
    }
    get shouldDisableModeOnExitButtonTapped() {
        return this.baseBarcodeCountView.shouldDisableModeOnExitButtonTapped;
    }
    set shouldDisableModeOnExitButtonTapped(newValue) {
        this.baseBarcodeCountView.shouldDisableModeOnExitButtonTapped = newValue;
    }
    get shouldShowExitButton() {
        return this.baseBarcodeCountView.shouldShowExitButton;
    }
    set shouldShowExitButton(newValue) {
        this.baseBarcodeCountView.shouldShowExitButton = newValue;
    }
    get shouldShowShutterButton() {
        return this.baseBarcodeCountView.shouldShowShutterButton;
    }
    set shouldShowShutterButton(newValue) {
        this.baseBarcodeCountView.shouldShowShutterButton = newValue;
    }
    get shouldShowHints() {
        return this.baseBarcodeCountView.shouldShowHints;
    }
    set shouldShowHints(newValue) {
        this.baseBarcodeCountView.shouldShowHints = newValue;
    }
    get shouldShowClearHighlightsButton() {
        return this.baseBarcodeCountView.shouldShowClearHighlightsButton;
    }
    set shouldShowClearHighlightsButton(newValue) {
        this.baseBarcodeCountView.shouldShowClearHighlightsButton = newValue;
    }
    get shouldShowSingleScanButton() {
        return this.baseBarcodeCountView.shouldShowSingleScanButton;
    }
    set shouldShowSingleScanButton(newValue) {
        this.baseBarcodeCountView.shouldShowSingleScanButton = newValue;
    }
    get shouldShowFloatingShutterButton() {
        return this.baseBarcodeCountView.shouldShowFloatingShutterButton;
    }
    set shouldShowFloatingShutterButton(newValue) {
        this.baseBarcodeCountView.shouldShowFloatingShutterButton = newValue;
    }
    get shouldShowToolbar() {
        return this.baseBarcodeCountView.shouldShowToolbar;
    }
    set shouldShowToolbar(newValue) {
        this.baseBarcodeCountView.shouldShowToolbar = newValue;
    }
    get shouldShowScanAreaGuides() {
        return this.baseBarcodeCountView.shouldShowScanAreaGuides;
    }
    set shouldShowScanAreaGuides(newValue) {
        this.baseBarcodeCountView.shouldShowScanAreaGuides = newValue;
    }
    get recognizedBrush() {
        return this.baseBarcodeCountView.recognizedBrush;
    }
    set recognizedBrush(newValue) {
        this.baseBarcodeCountView.recognizedBrush = newValue;
    }
    get notInListBrush() {
        return this.baseBarcodeCountView.notInListBrush;
    }
    set notInListBrush(newValue) {
        this.baseBarcodeCountView.notInListBrush = newValue;
    }
    get acceptedBrush() {
        return this.baseBarcodeCountView.acceptedBrush;
    }
    set acceptedBrush(newValue) {
        this.baseBarcodeCountView.acceptedBrush = newValue;
    }
    get rejectedBrush() {
        return this.baseBarcodeCountView.rejectedBrush;
    }
    set rejectedBrush(newValue) {
        this.baseBarcodeCountView.rejectedBrush = newValue;
    }
    get filterSettings() {
        return this.baseBarcodeCountView.filterSettings;
    }
    set filterSettings(newValue) {
        this.baseBarcodeCountView.filterSettings = newValue;
    }
    get style() {
        return this.baseBarcodeCountView.style;
    }
    get listButtonAccessibilityHint() {
        return this.baseBarcodeCountView.listButtonAccessibilityHint;
    }
    set listButtonAccessibilityHint(newValue) {
        this.baseBarcodeCountView.listButtonAccessibilityHint = newValue;
    }
    get listButtonAccessibilityLabel() {
        return this.baseBarcodeCountView.listButtonAccessibilityLabel;
    }
    set listButtonAccessibilityLabel(newValue) {
        this.baseBarcodeCountView.listButtonAccessibilityLabel = newValue;
    }
    get listButtonContentDescription() {
        return this.baseBarcodeCountView.listButtonContentDescription;
    }
    set listButtonContentDescription(newValue) {
        this.baseBarcodeCountView.listButtonContentDescription = newValue;
    }
    get exitButtonAccessibilityHint() {
        return this.baseBarcodeCountView.exitButtonAccessibilityHint;
    }
    set exitButtonAccessibilityHint(newValue) {
        this.baseBarcodeCountView.exitButtonAccessibilityHint = newValue;
    }
    get exitButtonAccessibilityLabel() {
        return this.baseBarcodeCountView.exitButtonAccessibilityLabel;
    }
    set exitButtonAccessibilityLabel(newValue) {
        this.baseBarcodeCountView.exitButtonAccessibilityLabel = newValue;
    }
    get exitButtonContentDescription() {
        return this.baseBarcodeCountView.exitButtonContentDescription;
    }
    set exitButtonContentDescription(newValue) {
        this.baseBarcodeCountView.exitButtonContentDescription = newValue;
    }
    get shutterButtonAccessibilityHint() {
        return this.baseBarcodeCountView.shutterButtonAccessibilityHint;
    }
    set shutterButtonAccessibilityHint(newValue) {
        this.baseBarcodeCountView.shutterButtonAccessibilityHint = newValue;
    }
    get shutterButtonAccessibilityLabel() {
        return this.baseBarcodeCountView.shutterButtonAccessibilityLabel;
    }
    set shutterButtonAccessibilityLabel(newValue) {
        this.baseBarcodeCountView.shutterButtonAccessibilityLabel = newValue;
    }
    get shutterButtonContentDescription() {
        return this.baseBarcodeCountView.shutterButtonContentDescription;
    }
    set shutterButtonContentDescription(newValue) {
        this.baseBarcodeCountView.shutterButtonContentDescription = newValue;
    }
    get floatingShutterButtonAccessibilityHint() {
        return this.baseBarcodeCountView.floatingShutterButtonAccessibilityHint;
    }
    set floatingShutterButtonAccessibilityHint(newValue) {
        this.baseBarcodeCountView.floatingShutterButtonAccessibilityHint = newValue;
    }
    get floatingShutterButtonAccessibilityLabel() {
        return this.baseBarcodeCountView.floatingShutterButtonAccessibilityLabel;
    }
    set floatingShutterButtonAccessibilityLabel(newValue) {
        this.baseBarcodeCountView.floatingShutterButtonAccessibilityLabel = newValue;
    }
    get floatingShutterButtonContentDescription() {
        return this.baseBarcodeCountView.floatingShutterButtonContentDescription;
    }
    set floatingShutterButtonContentDescription(newValue) {
        this.baseBarcodeCountView.floatingShutterButtonContentDescription = newValue;
    }
    get clearHighlightsButtonAccessibilityHint() {
        return this.baseBarcodeCountView.clearHighlightsButtonAccessibilityHint;
    }
    set clearHighlightsButtonAccessibilityHint(newValue) {
        this.baseBarcodeCountView.clearHighlightsButtonAccessibilityHint = newValue;
    }
    get clearHighlightsButtonAccessibilityLabel() {
        return this.baseBarcodeCountView.clearHighlightsButtonAccessibilityLabel;
    }
    set clearHighlightsButtonAccessibilityLabel(newValue) {
        this.baseBarcodeCountView.clearHighlightsButtonAccessibilityLabel = newValue;
    }
    get clearHighlightsButtonContentDescription() {
        return this.baseBarcodeCountView.clearHighlightsButtonContentDescription;
    }
    set clearHighlightsButtonContentDescription(newValue) {
        this.baseBarcodeCountView.clearHighlightsButtonContentDescription = newValue;
    }
    get singleScanButtonAccessibilityHint() {
        return this.baseBarcodeCountView.singleScanButtonAccessibilityHint;
    }
    set singleScanButtonAccessibilityHint(newValue) {
        this.baseBarcodeCountView.singleScanButtonAccessibilityHint = newValue;
    }
    get singleScanButtonAccessibilityLabel() {
        return this.baseBarcodeCountView.singleScanButtonAccessibilityLabel;
    }
    set singleScanButtonAccessibilityLabel(newValue) {
        this.baseBarcodeCountView.singleScanButtonAccessibilityLabel = newValue;
    }
    get singleScanButtonContentDescription() {
        return this.baseBarcodeCountView.singleScanButtonContentDescription;
    }
    set singleScanButtonContentDescription(newValue) {
        this.baseBarcodeCountView.singleScanButtonContentDescription = newValue;
    }
    get clearHighlightsButtonText() {
        return this.baseBarcodeCountView.clearHighlightsButtonText;
    }
    set clearHighlightsButtonText(newValue) {
        this.baseBarcodeCountView.clearHighlightsButtonText = newValue;
    }
    get exitButtonText() {
        return this.baseBarcodeCountView.exitButtonText;
    }
    set exitButtonText(newValue) {
        this.baseBarcodeCountView.exitButtonText = newValue;
    }
    get textForTapShutterToScanHint() {
        return this.baseBarcodeCountView.textForTapShutterToScanHint;
    }
    set textForTapShutterToScanHint(newValue) {
        this.baseBarcodeCountView.textForTapShutterToScanHint = newValue;
    }
    get textForScanningHint() {
        return this.baseBarcodeCountView.textForScanningHint;
    }
    set textForScanningHint(newValue) {
        this.baseBarcodeCountView.textForScanningHint = newValue;
    }
    get textForMoveCloserAndRescanHint() {
        return this.baseBarcodeCountView.textForMoveCloserAndRescanHint;
    }
    set textForMoveCloserAndRescanHint(newValue) {
        this.baseBarcodeCountView.textForMoveCloserAndRescanHint = newValue;
    }
    get textForMoveFurtherAndRescanHint() {
        return this.baseBarcodeCountView.textForMoveFurtherAndRescanHint;
    }
    set textForMoveFurtherAndRescanHint(newValue) {
        this.baseBarcodeCountView.textForMoveFurtherAndRescanHint = newValue;
    }
    get shouldShowListProgressBar() {
        return this.baseBarcodeCountView.shouldShowListProgressBar;
    }
    set shouldShowListProgressBar(newValue) {
        this.baseBarcodeCountView.shouldShowListProgressBar = newValue;
    }
    get shouldShowTorchControl() {
        return this.baseBarcodeCountView.shouldShowTorchControl;
    }
    set shouldShowTorchControl(newValue) {
        this.baseBarcodeCountView.shouldShowTorchControl = newValue;
    }
    get torchControlPosition() {
        return this.baseBarcodeCountView.torchControlPosition;
    }
    set torchControlPosition(newValue) {
        this.baseBarcodeCountView.torchControlPosition = newValue;
    }
    get textForTapToUncountHint() {
        return this.baseBarcodeCountView.textForTapToUncountHint;
    }
    set textForTapToUncountHint(newValue) {
        this.baseBarcodeCountView.textForTapToUncountHint = newValue;
    }
    get tapToUncountEnabled() {
        return this.baseBarcodeCountView.tapToUncountEnabled;
    }
    set tapToUncountEnabled(newValue) {
        this.baseBarcodeCountView.tapToUncountEnabled = newValue;
    }
    get barcodeNotInListActionSettings() {
        return this.baseBarcodeCountView.barcodeNotInListActionSettings;
    }
    set barcodeNotInListActionSettings(newValue) {
        this.baseBarcodeCountView.barcodeNotInListActionSettings = newValue;
    }
    get hardwareTriggerEnabled() {
        return this.baseBarcodeCountView.hardwareTriggerEnabled;
    }
    set hardwareTriggerEnabled(newValue) {
        this.baseBarcodeCountView.hardwareTriggerEnabled = newValue;
    }
    set htmlElementState(newState) {
        const didChangeShown = this._htmlElementState.isShown !== newState.isShown;
        const didChangePositionOrSize = this._htmlElementState.didChangeComparedTo(newState);
        this._htmlElementState = newState;
        if (didChangePositionOrSize) {
            this.updatePositionAndSize();
        }
        if (didChangeShown) {
            if (this._htmlElementState.isShown) {
                this._show();
            }
            else {
                this._hide();
            }
        }
    }
    get htmlElementState() {
        return this._htmlElementState;
    }
    static forContextWithMode(context, barcodeCount) {
        const style = BarcodeCountDefaults.BarcodeCountView.style;
        const view = new BarcodeCountView({ context, barcodeCount, style });
        return view;
    }
    static forContextWithModeAndStyle(context, barcodeCount, style) {
        const view = new BarcodeCountView({ context, barcodeCount, style });
        return view;
    }
    constructor({ context, barcodeCount, style }) {
        this.viewId = Math.floor(Math.random() * 1000000);
        this.htmlElement = null;
        this._htmlElementState = new scanditDatacaptureFrameworksCore.HTMLElementState();
        this.scrollListener = this.elementDidChange.bind(this);
        this.domObserver = new MutationObserver(this.elementDidChange.bind(this));
        this.orientationChangeListener = (() => {
            this.elementDidChange();
            // SDC-1784 -> workaround because at the moment of this callback the element doesn't have the updated size.
            setTimeout(this.elementDidChange.bind(this), 100);
            setTimeout(this.elementDidChange.bind(this), 300);
            setTimeout(this.elementDidChange.bind(this), 1000);
        });
        this.baseBarcodeCountView = new BaseBarcodeCountView({
            context,
            barcodeCount,
            viewStyle: style,
            platformView: this,
        });
    }
    clearHighlights() {
        return this.baseBarcodeCountView.clearHighlights();
    }
    setToolbarSettings(settings) {
        this.baseBarcodeCountView.setToolbarSettings(settings);
    }
    connectToElement(element) {
        this.baseBarcodeCountView.createNativeView(this.viewId).then(() => {
            this.htmlElement = element;
            this.htmlElementState = new scanditDatacaptureFrameworksCore.HTMLElementState();
            // Initial update
            this.elementDidChange();
            this.subscribeToChangesOnHTMLElement();
        });
    }
    detachFromElement() {
        this.baseBarcodeCountView.removeNativeView().then(() => {
            this.unsubscribeFromChangesOnHTMLElement();
            this.htmlElement = null;
            this.elementDidChange();
        });
    }
    setFrame(frame, isUnderContent = false) {
        return this.baseBarcodeCountView.setPositionAndSize(frame.origin.y, frame.origin.x, frame.size.width, frame.size.height, isUnderContent);
    }
    show() {
        if (this.htmlElement) {
            throw new Error("Views should only be manually shown if they're manually sized using setFrame");
        }
        return this._show();
    }
    hide() {
        if (this.htmlElement) {
            throw new Error("Views should only be manually hidden if they're manually sized using setFrame");
        }
        return this._hide();
    }
    setBrushForRecognizedBarcode(trackedBarcode, brush) {
        return this.baseBarcodeCountView.setBrushForRecognizedBarcode(trackedBarcode, brush);
    }
    setBrushForRecognizedBarcodeNotInList(trackedBarcode, brush) {
        return this.baseBarcodeCountView.setBrushForRecognizedBarcodeNotInList(trackedBarcode, brush);
    }
    setBrushForAcceptedBarcode(trackedBarcode, brush) {
        return this.baseBarcodeCountView.setBrushForAcceptedBarcode(trackedBarcode, brush);
    }
    setBrushForRejectedBarcode(trackedBarcode, brush) {
        return this.baseBarcodeCountView.setBrushForRejectedBarcode(trackedBarcode, brush);
    }
    enableHardwareTrigger(hardwareTriggerKeyCode) {
        return this.baseBarcodeCountView.enableHardwareTrigger(hardwareTriggerKeyCode);
    }
    subscribeToChangesOnHTMLElement() {
        this.domObserver.observe(document, { attributes: true, childList: true, subtree: true });
        window.addEventListener('scroll', this.scrollListener);
        window.addEventListener('orientationchange', this.orientationChangeListener);
    }
    unsubscribeFromChangesOnHTMLElement() {
        this.domObserver.disconnect();
        window.removeEventListener('scroll', this.scrollListener);
        window.removeEventListener('orientationchange', this.orientationChangeListener);
    }
    elementDidChange() {
        if (!this.htmlElement) {
            this.htmlElementState = new scanditDatacaptureFrameworksCore.HTMLElementState();
            return;
        }
        const newState = new scanditDatacaptureFrameworksCore.HTMLElementState();
        const boundingRect = this.htmlElement.getBoundingClientRect();
        newState.position = new scanditDatacaptureFrameworksCore.HtmlElementPosition(boundingRect.top, boundingRect.left);
        newState.size = new scanditDatacaptureFrameworksCore.HtmlElementSize(boundingRect.width, boundingRect.height);
        newState.shouldBeUnderContent = parseInt(this.htmlElement.style.zIndex || '1', 10) < 0
            || parseInt(getComputedStyle(this.htmlElement).zIndex || '1', 10) < 0;
        const isDisplayed = getComputedStyle(this.htmlElement).display !== 'none'
            && this.htmlElement.style.display !== 'none';
        const isInDOM = document.body.contains(this.htmlElement);
        newState.isShown = isDisplayed && isInDOM && !this.htmlElement.hidden;
        this.htmlElementState = newState;
    }
    updatePositionAndSize() {
        if (!this.htmlElementState || !this.htmlElementState.isValid) {
            return;
        }
        this.baseBarcodeCountView.setPositionAndSize(this.htmlElementState.position.top, this.htmlElementState.position.left, this.htmlElementState.size.width, this.htmlElementState.size.height, this.htmlElementState.shouldBeUnderContent);
    }
    _show() {
        return this.baseBarcodeCountView.show();
    }
    _hide() {
        return this.baseBarcodeCountView.hide();
    }
    toJSON() {
        return this.baseBarcodeCountView.toJSON();
    }
}
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCountView.prototype, "htmlElement", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCountView.prototype, "_htmlElementState", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCountView.prototype, "scrollListener", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCountView.prototype, "domObserver", void 0);
__decorate([
    scanditDatacaptureFrameworksCore.ignoreFromSerialization
], BarcodeCountView.prototype, "orientationChangeListener", void 0);

initializeBarcodeCordova();

exports.ArucoDictionary = ArucoDictionary;
exports.ArucoMarker = ArucoMarker;
exports.Barcode = Barcode;
exports.BarcodeBatch = BarcodeBatch;
exports.BarcodeBatchAdvancedOverlay = BarcodeBatchAdvancedOverlay;
exports.BarcodeBatchBasicOverlay = BarcodeBatchBasicOverlay;
exports.BarcodeBatchSession = BarcodeBatchSession;
exports.BarcodeBatchSettings = BarcodeBatchSettings;
exports.BarcodeCapture = BarcodeCapture;
exports.BarcodeCaptureFeedback = BarcodeCaptureFeedback;
exports.BarcodeCaptureOverlay = BarcodeCaptureOverlay;
exports.BarcodeCaptureSession = BarcodeCaptureSession;
exports.BarcodeCaptureSettings = BarcodeCaptureSettings;
exports.BarcodeCount = BarcodeCount;
exports.BarcodeCountCaptureList = BarcodeCountCaptureList;
exports.BarcodeCountCaptureListSession = BarcodeCountCaptureListSession;
exports.BarcodeCountFeedback = BarcodeCountFeedback;
exports.BarcodeCountNotInListActionSettings = BarcodeCountNotInListActionSettings;
exports.BarcodeCountSession = BarcodeCountSession;
exports.BarcodeCountSettings = BarcodeCountSettings;
exports.BarcodeCountToolbarSettings = BarcodeCountToolbarSettings;
exports.BarcodeCountView = BarcodeCountView;
exports.BarcodeDefinition = BarcodeDefinition;
exports.BarcodeDefinitionBuilder = BarcodeDefinitionBuilder;
exports.BarcodeFilterHighlightSettingsBrush = BarcodeFilterHighlightSettingsBrush;
exports.BarcodeFilterSettings = BarcodeFilterSettings;
exports.BarcodeFind = BarcodeFind;
exports.BarcodeFindFeedback = BarcodeFindFeedback;
exports.BarcodeFindItem = BarcodeFindItem;
exports.BarcodeFindItemContent = BarcodeFindItemContent;
exports.BarcodeFindItemSearchOptions = BarcodeFindItemSearchOptions;
exports.BarcodeFindSession = BarcodeFindSession;
exports.BarcodeFindSettings = BarcodeFindSettings;
exports.BarcodeFindView = BarcodeFindView;
exports.BarcodeFindViewSettings = BarcodeFindViewSettings;
exports.BarcodeGenerator = BarcodeGenerator;
exports.BarcodeGeneratorBuilder = BarcodeGeneratorBuilder;
exports.BarcodeIdentifier = BarcodeIdentifier;
exports.BarcodePick = BarcodePick;
exports.BarcodePickActionCallback = BarcodePickActionCallback;
exports.BarcodePickAsyncMapperProductProvider = BarcodePickAsyncMapperProductProvider;
exports.BarcodePickProduct = BarcodePickProduct;
exports.BarcodePickProductProviderCallback = BarcodePickProductProviderCallback;
exports.BarcodePickProductProviderCallbackItem = BarcodePickProductProviderCallbackItem;
exports.BarcodePickScanningSession = BarcodePickScanningSession;
exports.BarcodePickSession = BarcodePickSession;
exports.BarcodePickSettings = BarcodePickSettings;
exports.BarcodePickStatusIconSettings = BarcodePickStatusIconSettings;
exports.BarcodePickView = BarcodePickView;
exports.BarcodePickViewSettings = BarcodePickViewSettings;
exports.BarcodeSelection = BarcodeSelection;
exports.BarcodeSelectionAimerSelection = BarcodeSelectionAimerSelection;
exports.BarcodeSelectionAutoSelectionStrategy = BarcodeSelectionAutoSelectionStrategy;
exports.BarcodeSelectionBasicOverlay = BarcodeSelectionBasicOverlay;
exports.BarcodeSelectionFeedback = BarcodeSelectionFeedback;
exports.BarcodeSelectionManualSelectionStrategy = BarcodeSelectionManualSelectionStrategy;
exports.BarcodeSelectionSession = BarcodeSelectionSession;
exports.BarcodeSelectionSettings = BarcodeSelectionSettings;
exports.BarcodeSelectionTapSelection = BarcodeSelectionTapSelection;
exports.BarcodeSpatialGrid = BarcodeSpatialGrid;
exports.Code128BarcodeGeneratorBuilder = Code128BarcodeGeneratorBuilder;
exports.Code39BarcodeGeneratorBuilder = Code39BarcodeGeneratorBuilder;
exports.DataMatrixBarcodeGeneratorBuilder = DataMatrixBarcodeGeneratorBuilder;
exports.Dot = Dot;
exports.DotWithIcons = DotWithIcons;
exports.Ean13BarcodeGeneratorBuilder = Ean13BarcodeGeneratorBuilder;
exports.Ean13UpcaClassification = Ean13UpcaClassification;
exports.EncodingRange = EncodingRange;
exports.InterleavedTwoOfFiveBarcodeGeneratorBuilder = InterleavedTwoOfFiveBarcodeGeneratorBuilder;
exports.LocalizedOnlyBarcode = LocalizedOnlyBarcode;
exports.QrCodeBarcodeGeneratorBuilder = QrCodeBarcodeGeneratorBuilder;
exports.Range = Range;
exports.Rectangular = Rectangular;
exports.RectangularWithIcons = RectangularWithIcons;
exports.ScanItemDefinition = ScanItemDefinition;
exports.ScanItemIdentifier = ScanItemIdentifier;
exports.ScannedBarcode = ScannedBarcode;
exports.ScannedComponentIdentifier = ScannedComponentIdentifier;
exports.ScannedItem = ScannedItem;
exports.ScannedItemIdentifier = ScannedItemIdentifier;
exports.ScannedText = ScannedText;
exports.SparkScan = SparkScan;
exports.SparkScanBarcodeErrorFeedback = SparkScanBarcodeErrorFeedback;
exports.SparkScanBarcodeFeedback = SparkScanBarcodeFeedback;
exports.SparkScanBarcodeSuccessFeedback = SparkScanBarcodeSuccessFeedback;
exports.SparkScanScanningModeDefault = SparkScanScanningModeDefault;
exports.SparkScanScanningModeTarget = SparkScanScanningModeTarget;
exports.SparkScanSession = SparkScanSession;
exports.SparkScanSettings = SparkScanSettings;
exports.SparkScanToastSettings = SparkScanToastSettings;
exports.SparkScanView = SparkScanView;
exports.SparkScanViewSettings = SparkScanViewSettings;
exports.StructuredAppendData = StructuredAppendData;
exports.SymbologyDescription = SymbologyDescription;
exports.SymbologySettings = SymbologySettings;
exports.TargetBarcode = TargetBarcode;
exports.TextDefinition = TextDefinition;
exports.TextDefinitionBuilder = TextDefinitionBuilder;
exports.TextIdentifier = TextIdentifier;
exports.TrackedBarcode = TrackedBarcode;
exports.TrackedBarcodeView = TrackedBarcodeView;
exports.UpcaBarcodeGeneratorBuilder = UpcaBarcodeGeneratorBuilder;
