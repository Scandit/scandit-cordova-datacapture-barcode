declare module Scandit {

interface PrivateBarcodeCapture extends PrivateDataCaptureMode {
    _context: DataCaptureContext | null;
    didChange: () => Promise<void>;
}
export class BarcodeCapture implements DataCaptureMode {
    isEnabled: boolean;
    readonly context: DataCaptureContext | null;
    feedback: BarcodeCaptureFeedback;
    static readonly recommendedCameraSettings: CameraSettings;
    private type;
    private _isEnabled;
    private _feedback;
    private settings;
    private _context;
    private listeners;
    private listenerProxy;
    private isInListenerCallback;
    static forContext(context: DataCaptureContext | null, settings: BarcodeCaptureSettings): BarcodeCapture;
    applySettings(settings: BarcodeCaptureSettings): Promise<void>;
    addListener(listener: BarcodeCaptureListener): void;
    removeListener(listener: BarcodeCaptureListener): void;
    private didChange;
}


export class BarcodeCaptureSession {
    private _newlyRecognizedBarcodes;
    private _newlyLocalizedBarcodes;
    private _frameSequenceID;
    readonly newlyRecognizedBarcodes: Barcode[];
    readonly newlyLocalizedBarcodes: LocalizedOnlyBarcode[];
    readonly frameSequenceID: number;
    private static fromJSON;
}
export interface BarcodeCaptureSessionJSON {
    newlyRecognizedBarcodes: BarcodeJSON[];
    newlyLocalizedBarcodes: LocalizedOnlyBarcodeJSON[];
    frameSequenceId: number;
}
interface PrivateBarcodeCaptureSession {
    fromJSON(json: BarcodeCaptureSessionJSON): BarcodeCaptureSession;
}
export interface BarcodeCaptureListener {
    didScan?(barcodeCapture: BarcodeCapture, session: BarcodeCaptureSession): void;
    didUpdateSession?(barcodeCapture: BarcodeCapture, session: BarcodeCaptureSession): void;
}
export class BarcodeCaptureFeedback {
    success: Feedback;
    static readonly default: BarcodeCaptureFeedback;
}
export class BarcodeCaptureOverlay implements DataCaptureOverlay {
    private type;
    private barcodeCapture;
    private _shouldShowScanAreaGuides;
    private _viewfinder;
    static readonly defaultBrush: Brush;
    private _brush;
    brush: Brush;
    viewfinder: Viewfinder | null;
    shouldShowScanAreaGuides: boolean;
    static withBarcodeCapture(barcodeCapture: BarcodeCapture): BarcodeCaptureOverlay;
    static withBarcodeCaptureForView(barcodeCapture: BarcodeCapture, view: DataCaptureView | null): BarcodeCaptureOverlay;
    private constructor();
}


export enum Symbology {
    EAN13UPCA = "ean13Upca",
    UPCE = "upce",
    EAN8 = "ean8",
    Code39 = "code39",
    Code93 = "code93",
    Code128 = "code128",
    Code11 = "code11",
    Code25 = "code25",
    Codabar = "codabar",
    InterleavedTwoOfFive = "interleavedTwoOfFive",
    MSIPlessey = "msiPlessey",
    QR = "qr",
    DataMatrix = "dataMatrix",
    Aztec = "aztec",
    MaxiCode = "maxicode",
    DotCode = "dotcode",
    KIX = "kix",
    RM4SCC = "rm4scc",
    GS1Databar = "databar",
    GS1DatabarExpanded = "databarExpanded",
    GS1DatabarLimited = "databarLimited",
    PDF417 = "pdf417",
    MicroPDF417 = "microPdf417",
    MicroQR = "microQr",
    Code32 = "code32",
    Lapa4SC = "lapa4sc",
    IATATwoOfFive = "iata2of5",
    MatrixTwoOfFive = "matrix2of5",
    USPSIntelligentMail = "uspsIntelligentMail"
}
export enum CompositeType {
    A = "A",
    B = "B",
    C = "C"
}
interface PrivateCompositeTypeDescription {
    types: CompositeType[];
    symbologies: Symbology[];
}
interface PrivateSymbologyDescription {
    defaults: () => {
        SymbologyDescriptions: SymbologyDescription[];
    };
    fromJSON(json: SymbologyDescriptionJSON): SymbologyDescription;
}
export class SymbologyDescription {
    private static defaults;
    static readonly all: SymbologyDescription[];
    private _identifier;
    readonly identifier: string;
    readonly symbology: Symbology;
    private _readableName;
    readonly readableName: string;
    private _isAvailable;
    readonly isAvailable: boolean;
    private _isColorInvertible;
    readonly isColorInvertible: boolean;
    private _activeSymbolCountRange;
    readonly activeSymbolCountRange: Range;
    private _defaultSymbolCountRange;
    readonly defaultSymbolCountRange: Range;
    private _supportedExtensions;
    readonly supportedExtensions: string[];
    private static fromJSON;
    static forIdentifier(identifier: string): SymbologyDescription | null;
    constructor(symbology: Symbology);
    constructor();
}
interface PrivateSymbologySettings {
    fromJSON: (json: any) => SymbologySettings;
    _symbology: Symbology;
}
export class SymbologySettings {
    private _symbology;
    private extensions;
    isEnabled: boolean;
    isColorInvertedEnabled: boolean;
    checksums: Checksum[];
    activeSymbolCounts: number[];
    readonly symbology: Symbology;
    readonly enabledExtensions: string[];
    private static fromJSON;
    setExtensionEnabled(extension: string, enabled: boolean): void;
}
export enum Checksum {
    Mod10 = "mod10",
    Mod11 = "mod11",
    Mod16 = "mod16",
    Mod43 = "mod43",
    Mod47 = "mod47",
    Mod103 = "mod103",
    Mod10AndMod11 = "mod1110",
    Mod10AndMod10 = "mod1010"
}
interface EncodingRangeJSON {
    ianaName: string;
    startIndex: number;
    endIndex: number;
}
export class EncodingRange {
    private _ianaName;
    readonly ianaName: string;
    private _startIndex;
    readonly startIndex: number;
    private _endIndex;
    readonly endIndex: number;
    private static fromJSON;
}
export enum CompositeFlag {
    None = "none",
    Unknown = "unknown",
    Linked = "linked",
    GS1TypeA = "gs1TypeA",
    GS1TypeB = "gs1TypeB",
    GS1TypeC = "gs1TypeC"
}
interface PrivateRange {
    _minimum: number;
    _maximum: number;
    _step: number;
}
export class Range {
    private _minimum;
    private _maximum;
    private _step;
    readonly minimum: number;
    readonly maximum: number;
    readonly step: number;
    readonly isFixed: boolean;
    private static fromJSON;
}
export class Barcode {
    private _symbology;
    readonly symbology: Symbology;
    private _data;
    readonly data: string | null;
    private _rawData;
    readonly rawData: string;
    private _compositeData;
    readonly compositeData: string | null;
    private _compositeRawData;
    readonly compositeRawData: string;
    private _addOnData;
    readonly addOnData: string | null;
    private _encodingRanges;
    readonly encodingRanges: EncodingRange[];
    private _location;
    readonly location: Quadrilateral;
    private _isGS1DataCarrier;
    readonly isGS1DataCarrier: boolean;
    private _compositeFlag;
    readonly compositeFlag: CompositeFlag;
    private _isColorInverted;
    readonly isColorInverted: boolean;
    private _symbolCount;
    readonly symbolCount: number;
    private _frameID;
    readonly frameID: number;
    private static fromJSON;
}
export interface BarcodeJSON {
    symbology: string;
    data: string | null;
    rawData: string;
    addOnData: string | null;
    compositeData: string | null;
    compositeRawData: string;
    isGS1DataCarrier: boolean;
    compositeFlag: string;
    isColorInverted: boolean;
    symbolCount: number;
    frameId: number;
    encodingRanges: EncodingRangeJSON[];
    location: QuadrilateralJSON;
}
interface PrivateBarcode {
    fromJSON(json: BarcodeJSON): Barcode;
}
export class LocalizedOnlyBarcode {
    private _location;
    private _frameID;
    readonly location: Quadrilateral;
    readonly frameID: number;
    private static fromJSON;
}
export interface LocalizedOnlyBarcodeJSON {
    location: QuadrilateralJSON;
    frameId: number;
}
interface PrivateLocalizedOnlyBarcode {
    fromJSON(json: LocalizedOnlyBarcodeJSON): LocalizedOnlyBarcode;
}
export interface TrackedBarcodeJSON {
    deltaTime: number;
    identifier: number;
    shouldAnimateFromPreviousToNextState: boolean;
    barcode: BarcodeJSON;
    predictedLocation: QuadrilateralJSON;
    location: QuadrilateralJSON;
}
interface PrivateTrackedBarcode {
    sessionFrameSequenceID: string | null;
    fromJSON(json: TrackedBarcodeJSON): TrackedBarcode;
}
export class TrackedBarcode {
    private _deltaTime;
    readonly deltaTime: number;
    private _barcode;
    readonly barcode: Barcode;
    private _predictedLocation;
    readonly predictedLocation: Quadrilateral;
    private _location;
    readonly location: Quadrilateral;
    private _identifier;
    readonly identifier: number;
    private sessionFrameSequenceID;
    private _shouldAnimateFromPreviousToNextState;
    readonly shouldAnimateFromPreviousToNextState: boolean;
    private static fromJSON;
}


export class BarcodeCaptureSettings {
    codeDuplicateFilter: number;
    locationSelection: LocationSelection | null;
    enabledCompositeTypes: CompositeType[];
    private properties;
    private symbologies;
    private readonly compositeTypeDescriptions;
    readonly enabledSymbologies: Symbology[];
    constructor();
    settingsForSymbology(symbology: Symbology): SymbologySettings;
    setProperty(name: string, value: any): void;
    getProperty(name: string): any;
    enableSymbologies(symbologies: Symbology[]): void;
    enableSymbology(symbology: Symbology, enabled: boolean): void;
    enableSymbologiesForCompositeTypes(compositeTypes: CompositeType[]): void;
}


interface PrivateBarcodeTracking extends PrivateDataCaptureMode {
    _context: DataCaptureContext | null;
    didChange: () => Promise<void>;
}
export class BarcodeTracking implements DataCaptureMode {
    isEnabled: boolean;
    readonly context: DataCaptureContext | null;
    static readonly recommendedCameraSettings: CameraSettings;
    private type;
    private _isEnabled;
    private settings;
    private _context;
    private listeners;
    private listenerProxy;
    private isInListenerCallback;
    static forContext(context: DataCaptureContext | null, settings: BarcodeTrackingSettings): BarcodeTracking;
    applySettings(settings: BarcodeTrackingSettings): Promise<void>;
    addListener(listener: BarcodeTrackingListener): void;
    removeListener(listener: BarcodeTrackingListener): void;
    private didChange;
}


export interface BarcodeTrackingSessionJSON {
    addedTrackedBarcodes: TrackedBarcodeJSON[];
    removedTrackedBarcodes: string[];
    updatedTrackedBarcodes: TrackedBarcodeJSON[];
    trackedBarcodes: {
        [key: string]: TrackedBarcodeJSON;
    };
    frameSequenceId: number;
}
interface PrivateBarcodeTrackingSession {
    fromJSON(json: BarcodeTrackingSessionJSON): BarcodeTrackingSession;
}
export class BarcodeTrackingSession {
    private _addedTrackedBarcodes;
    private _removedTrackedBarcodes;
    private _updatedTrackedBarcodes;
    private _trackedBarcodes;
    private _frameSequenceID;
    readonly addedTrackedBarcodes: TrackedBarcode[];
    readonly removedTrackedBarcodes: string[];
    readonly updatedTrackedBarcodes: TrackedBarcode[];
    readonly trackedBarcodes: {
        [key: string]: TrackedBarcode;
    };
    readonly frameSequenceID: number;
    private static fromJSON;
}
export interface BarcodeTrackingListener {
    didUpdateSession?(barcodeTracking: BarcodeTracking, session: BarcodeTrackingSession): void;
}
export interface BarcodeTrackingBasicOverlayListener {
    brushForTrackedBarcode?(overlay: BarcodeTrackingBasicOverlay, trackedBarcode: TrackedBarcode): Brush | null;
    didTapTrackedBarcode?(overlay: BarcodeTrackingBasicOverlay, trackedBarcode: TrackedBarcode): void;
}
interface PrivateBarcodeTrackingBasicOverlay {
    toJSON(): object;
}
export class BarcodeTrackingBasicOverlay implements DataCaptureOverlay {
    private type;
    private barcodeTracking;
    static readonly defaultBrush: Brush;
    private _defaultBrush;
    defaultBrush: Brush | null;
    brush: Brush | null;
    private _shouldShowScanAreaGuides;
    listener: BarcodeTrackingBasicOverlayListener | null;
    private _proxy;
    private readonly proxy;
    shouldShowScanAreaGuides: boolean;
    static withBarcodeTracking(barcodeTracking: BarcodeTracking): BarcodeTrackingBasicOverlay;
    static withBarcodeTrackingForView(barcodeTracking: BarcodeTracking, view: DataCaptureView | null): BarcodeTrackingBasicOverlay;
    private constructor();
    setBrushForTrackedBarcode(brush: Brush, trackedBarcode: TrackedBarcode): Promise<void>;
    clearTrackedBarcodeBrushes(): Promise<void>;
    private initialize;
}
export interface BarcodeTrackingAdvancedOverlayListener {
    viewForTrackedBarcode?(overlay: BarcodeTrackingAdvancedOverlay, trackedBarcode: TrackedBarcode): Promise<TrackedBarcodeView | null>;
    anchorForTrackedBarcode?(overlay: BarcodeTrackingAdvancedOverlay, trackedBarcode: TrackedBarcode): Anchor;
    offsetForTrackedBarcode?(overlay: BarcodeTrackingAdvancedOverlay, trackedBarcode: TrackedBarcode): PointWithUnit;
    didTapViewForTrackedBarcode?(overlay: BarcodeTrackingAdvancedOverlay, trackedBarcode: TrackedBarcode): void;
}
interface PrivateBarcodeTrackingAdvancedOverlay {
    toJSON(): object;
}
export class BarcodeTrackingAdvancedOverlay implements DataCaptureOverlay {
    private type;
    private _shouldShowScanAreaGuides;
    shouldShowScanAreaGuides: boolean;
    private barcodeTracking;
    listener: BarcodeTrackingAdvancedOverlayListener | null;
    private _proxy;
    private readonly proxy;
    static withBarcodeTrackingForView(barcodeTracking: BarcodeTracking, view: DataCaptureView | null): BarcodeTrackingAdvancedOverlay;
    private constructor();
    setViewForTrackedBarcode(view: Promise<TrackedBarcodeView | null>, trackedBarcode: TrackedBarcode): Promise<void>;
    setAnchorForTrackedBarcode(anchor: Anchor, trackedBarcode: TrackedBarcode): Promise<void>;
    setOffsetForTrackedBarcode(offset: PointWithUnit, trackedBarcode: TrackedBarcode): Promise<void>;
    clearTrackedBarcodeViews(): Promise<void>;
    private initialize;
}


export enum BarcodeTrackingScenario {
    A = "A",
    B = "B"
}
export class BarcodeTrackingSettings {
    private scenario;
    private properties;
    private symbologies;
    readonly enabledSymbologies: Symbology[];
    static forScenario(scenario: BarcodeTrackingScenario): BarcodeTrackingSettings;
    constructor();
    settingsForSymbology(symbology: Symbology): SymbologySettings;
    setProperty(name: string, value: any): void;
    getProperty(name: string): any;
    enableSymbologies(symbologies: Symbology[]): void;
    enableSymbology(symbology: Symbology, enabled: boolean): void;
}


interface PrivateTrackedBarcodeView {
    data: string;
    toJSON(): string;
    getEncodedImageData(element: HTMLElement): string;
}
export interface TrackedBarcodeViewOptions {
    size?: Size;
    scale?: number;
}
export class TrackedBarcodeView {
    private data;
    private options;
    static withHTMLElement(element: HTMLElement, options: TrackedBarcodeViewOptions | null): Promise<TrackedBarcodeView>;
    static withBase64EncodedData(data: string, options: TrackedBarcodeViewOptions | null): Promise<TrackedBarcodeView>;
    private static getEncodedImageData;
    private static getSize;
    private static getSVGDataForElement;
    private static getCanvasWithSize;
    private static getBase64DataForSVG;
    private constructor();
}


export class SparkCaptureSettings {
    codeDuplicateFilter: number;
    locationSelection: LocationSelection | null;
    private properties;
    private symbologies;
    readonly enabledSymbologies: Symbology[];
    constructor();
    settingsForSymbology(symbology: Symbology): SymbologySettings;
    setProperty(name: string, value: any): void;
    getProperty(name: string): any;
    enableSymbologies(symbologies: Symbology[]): void;
    enableSymbology(symbology: Symbology, enabled: boolean): void;
}


export class SparkCaptureSession {
    private _newlyRecognizedBarcodes;
    private _frameSequenceID;
    readonly newlyRecognizedBarcodes: Barcode[];
    readonly frameSequenceID: number;
    private static fromJSON;
}
export interface SparkCaptureSessionJSON {
    newlyRecognizedBarcodes: BarcodeJSON[];
    frameSequenceId: number;
}
interface PrivateSparkCaptureSession {
    fromJSON(json: SparkCaptureSessionJSON): SparkCaptureSession;
}
export interface SparkCaptureListener {
    didScan?(sparkCapture: SparkCapture, session: SparkCaptureSession): void;
    didUpdateSession?(sparkCapture: SparkCapture, session: SparkCaptureSession): void;
}
export class SparkCaptureFeedback {
    success: Feedback;
    static readonly default: SparkCaptureFeedback;
}


interface PrivateSparkCapture extends PrivateDataCaptureMode {
    _context: DataCaptureContext | null;
    didChange: () => Promise<void>;
}
export class SparkCapture implements DataCaptureMode {
    isEnabled: boolean;
    readonly context: DataCaptureContext | null;
    feedback: SparkCaptureFeedback;
    private type;
    private _isEnabled;
    private _feedback;
    private settings;
    private _context;
    private listeners;
    private listenerProxy;
    private isInListenerCallback;
    static forContext(context: DataCaptureContext | null, settings: SparkCaptureSettings): SparkCapture;
    applySettings(settings: SparkCaptureSettings): Promise<void>;
    addListener(listener: SparkCaptureListener): void;
    removeListener(listener: SparkCaptureListener): void;
    private didChange;
}

}
