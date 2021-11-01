"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarcodeSelectionSettings = void 0;
const BarcodeSelection_Related_1 = require("scandit-cordova-datacapture-barcode.BarcodeSelection+Related");
const Cordova_1 = require("scandit-cordova-datacapture-barcode.Cordova");
const Serializeable_1 = require("scandit-cordova-datacapture-core.Serializeable");
class BarcodeSelectionSettings extends Serializeable_1.DefaultSerializeable {
    constructor() {
        super();
        this.codeDuplicateFilter = Cordova_1.Cordova.defaults.BarcodeSelection.BarcodeSelectionSettings.codeDuplicateFilter;
        this.singleBarcodeAutoDetection = Cordova_1.Cordova.defaults.BarcodeSelection.BarcodeSelectionSettings.singleBarcodeAutoDetection;
        this.selectionType = Cordova_1.Cordova.defaults.BarcodeSelection.BarcodeSelectionSettings.selectionType(BarcodeSelection_Related_1.PrivateBarcodeSelectionType.fromJSON);
        this.properties = {};
        this.symbologies = {};
    }
    get enabledSymbologies() {
        return Object.keys(this.symbologies)
            .filter(symbology => this.symbologies[symbology].isEnabled);
    }
    settingsForSymbology(symbology) {
        if (!this.symbologies[symbology]) {
            const symbologySettings = Cordova_1.Cordova.defaults.SymbologySettings[symbology];
            symbologySettings._symbology = symbology;
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
exports.BarcodeSelectionSettings = BarcodeSelectionSettings;
