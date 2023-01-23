declare module Scandit {

interface PrivateBarcodeCapture extends PrivateDataCaptureMode {
    _context: DataCaptureContext | null;
    didChange: () => Promise<void>;
}
export class BarcodeCapture implements DataCaptureMode {
    get isEnabled(): boolean;
    set isEnabled(isEnabled: boolean);
    get context(): DataCaptureContext | null;
    get feedback(): BarcodeCaptureFeedback;
    set feedback(feedback: BarcodeCaptureFeedback);
    static get recommendedCameraSettings(): CameraSettings;
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
    private listenerProxy;
    get newlyRecognizedBarcodes(): Barcode[];
    get newlyLocalizedBarcodes(): LocalizedOnlyBarcode[];
    get frameSequenceID(): number;
    private static fromJSON;
    reset(): Promise<void>;
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
    static get default(): BarcodeCaptureFeedback;
}
export enum BarcodeCaptureOverlayStyle {
    Frame = "frame",
    Legacy = "legacy"
}
export class BarcodeCaptureOverlay implements DataCaptureOverlay {
    private type;
    private barcodeCapture;
    private _shouldShowScanAreaGuides;
    private _viewfinder;
    static get defaultBrush(): Brush;
    private _brush;
    private _style;
    get brush(): Brush;
    set brush(newBrush: Brush);
    get viewfinder(): Viewfinder | null;
    set viewfinder(newViewfinder: Viewfinder | null);
    get shouldShowScanAreaGuides(): boolean;
    set shouldShowScanAreaGuides(shouldShow: boolean);
    get style(): BarcodeCaptureOverlayStyle;
    static withBarcodeCapture(barcodeCapture: BarcodeCapture): BarcodeCaptureOverlay;
    static withBarcodeCaptureForView(barcodeCapture: BarcodeCapture, view: DataCaptureView | null): BarcodeCaptureOverlay;
    static withBarcodeCaptureForViewWithStyle(barcodeCapture: BarcodeCapture, view: DataCaptureView | null, style: BarcodeCaptureOverlayStyle): BarcodeCaptureOverlay;
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
    static get all(): SymbologyDescription[];
    private _identifier;
    get identifier(): string;
    get symbology(): Symbology;
    private _readableName;
    get readableName(): string;
    private _isAvailable;
    get isAvailable(): boolean;
    private _isColorInvertible;
    get isColorInvertible(): boolean;
    private _activeSymbolCountRange;
    get activeSymbolCountRange(): Range;
    private _defaultSymbolCountRange;
    get defaultSymbolCountRange(): Range;
    private _supportedExtensions;
    get supportedExtensions(): string[];
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
    get symbology(): Symbology;
    get enabledExtensions(): string[];
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
    get ianaName(): string;
    private _startIndex;
    get startIndex(): number;
    private _endIndex;
    get endIndex(): number;
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
    get minimum(): number;
    get maximum(): number;
    get step(): number;
    get isFixed(): boolean;
    private static fromJSON;
}
export class Barcode {
    private _symbology;
    get symbology(): Symbology;
    private _data;
    get data(): string | null;
    private _rawData;
    get rawData(): string;
    private _compositeData;
    get compositeData(): string | null;
    private _compositeRawData;
    get compositeRawData(): string;
    private _addOnData;
    get addOnData(): string | null;
    private _encodingRanges;
    get encodingRanges(): EncodingRange[];
    private _location;
    get location(): Quadrilateral;
    private _isGS1DataCarrier;
    get isGS1DataCarrier(): boolean;
    private _compositeFlag;
    get compositeFlag(): CompositeFlag;
    private _isColorInverted;
    get isColorInverted(): boolean;
    private _symbolCount;
    get symbolCount(): number;
    private _frameID;
    get frameID(): number;
    private get selectionIdentifier();
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
    readonly selectionIdentifier: string;
    fromJSON(json: BarcodeJSON): Barcode;
}
export class LocalizedOnlyBarcode {
    private _location;
    private _frameID;
    get location(): Quadrilateral;
    get frameID(): number;
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
    get deltaTime(): number;
    private _barcode;
    get barcode(): Barcode;
    private _predictedLocation;
    get predictedLocation(): Quadrilateral;
    private _location;
    get location(): Quadrilateral;
    private _identifier;
    get identifier(): number;
    private sessionFrameSequenceID;
    private _shouldAnimateFromPreviousToNextState;
    get shouldAnimateFromPreviousToNextState(): boolean;
    private static fromJSON;
}


export class BarcodeCaptureSettings {
    codeDuplicateFilter: number;
    locationSelection: LocationSelection | null;
    enabledCompositeTypes: CompositeType[];
    private properties;
    private symbologies;
    private get compositeTypeDescriptions();
    get enabledSymbologies(): Symbology[];
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
    get isEnabled(): boolean;
    set isEnabled(isEnabled: boolean);
    get context(): DataCaptureContext | null;
    static get recommendedCameraSettings(): CameraSettings;
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
    reset(): Promise<void>;
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
    private listenerProxy;
    get addedTrackedBarcodes(): TrackedBarcode[];
    get removedTrackedBarcodes(): string[];
    get updatedTrackedBarcodes(): TrackedBarcode[];
    get trackedBarcodes(): {
        [key: string]: TrackedBarcode;
    };
    get frameSequenceID(): number;
    private static fromJSON;
    reset(): Promise<void>;
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
export enum BarcodeTrackingBasicOverlayStyle {
    Frame = "frame",
    Dot = "dot",
    Legacy = "legacy"
}
export class BarcodeTrackingBasicOverlay implements DataCaptureOverlay {
    private type;
    private barcodeTracking;
    static get defaultBrush(): Brush;
    private _defaultBrush;
    get defaultBrush(): Brush | null;
    set defaultBrush(newBrush: Brush | null);
    get brush(): Brush | null;
    set brush(newBrush: Brush | null);
    private _shouldShowScanAreaGuides;
    listener: BarcodeTrackingBasicOverlayListener | null;
    private _proxy;
    private get proxy();
    get shouldShowScanAreaGuides(): boolean;
    set shouldShowScanAreaGuides(shouldShow: boolean);
    private _style;
    get style(): BarcodeTrackingBasicOverlayStyle;
    static withBarcodeTracking(barcodeTracking: BarcodeTracking): BarcodeTrackingBasicOverlay;
    static withBarcodeTrackingForView(barcodeTracking: BarcodeTracking, view: DataCaptureView | null): BarcodeTrackingBasicOverlay;
    static withBarcodeTrackingForViewWithStyle(barcodeTracking: BarcodeTracking, view: DataCaptureView | null, style: BarcodeTrackingBasicOverlayStyle): BarcodeTrackingBasicOverlay;
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
    get shouldShowScanAreaGuides(): boolean;
    set shouldShowScanAreaGuides(shouldShow: boolean);
    private barcodeTracking;
    listener: BarcodeTrackingAdvancedOverlayListener | null;
    private _proxy;
    private get proxy();
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
    get enabledSymbologies(): Symbology[];
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


interface PrivateBarcodeSelection extends PrivateDataCaptureMode {
    _context: DataCaptureContext | null;
    didChange: () => Promise<void>;
}
export class BarcodeSelection implements DataCaptureMode {
    get isEnabled(): boolean;
    set isEnabled(isEnabled: boolean);
    get context(): DataCaptureContext | null;
    get feedback(): BarcodeSelectionFeedback;
    set feedback(feedback: BarcodeSelectionFeedback);
    get pointOfInterest(): PointWithUnit | null;
    set pointOfInterest(pointOfInterest: PointWithUnit | null);
    static get recommendedCameraSettings(): CameraSettings;
    private type;
    private _isEnabled;
    private _feedback;
    private _pointOfInterest;
    private settings;
    private _context;
    private listeners;
    private listenerProxy;
    private modeProxy;
    private isInListenerCallback;
    static forContext(context: DataCaptureContext | null, settings: BarcodeSelectionSettings): BarcodeSelection;
    applySettings(settings: BarcodeSelectionSettings): Promise<void>;
    addListener(listener: BarcodeSelectionListener): void;
    removeListener(listener: BarcodeSelectionListener): void;
    reset(): Promise<void>;
    unfreezeCamera(): Promise<void>;
    private didChange;
}


export class BarcodeSelectionSettings {
    codeDuplicateFilter: number;
    singleBarcodeAutoDetection: boolean;
    selectionType: BarcodeSelectionType;
    private properties;
    private symbologies;
    get enabledSymbologies(): Symbology[];
    constructor();
    settingsForSymbology(symbology: Symbology): SymbologySettings;
    setProperty(name: string, value: any): void;
    getProperty(name: string): any;
    enableSymbologies(symbologies: Symbology[]): void;
    enableSymbology(symbology: Symbology, enabled: boolean): void;
}


interface BarcodeSelectionListenerProxy {
    getCount(barcode: Barcode): Promise<number>;
    reset(): Promise<void>;
}
export class BarcodeSelectionFeedback {
    selection: Feedback;
    static get default(): BarcodeSelectionFeedback;
}
export interface BarcodeSelectionStrategy {
}
class PrivateBarcodeSelectionStrategy {
    static fromJSON(json: {
        type: string;
    }): BarcodeSelectionStrategy;
}
export class BarcodeSelectionAutoSelectionStrategy implements BarcodeSelectionStrategy {
    private type;
    static get autoSelectionStrategy(): BarcodeSelectionAutoSelectionStrategy;
}
export class BarcodeSelectionManualSelectionStrategy implements BarcodeSelectionStrategy {
    private type;
    static get manualSelectionStrategy(): BarcodeSelectionManualSelectionStrategy;
}
export enum BarcodeSelectionFreezeBehavior {
    Manual = "manual",
    ManualAndAutomatic = "manualAndAutomatic"
}
export enum BarcodeSelectionTapBehavior {
    ToggleSelection = "toggleSelection",
    RepeatSelection = "repeatSelection"
}
export interface BarcodeSelectionType {
}
class PrivateBarcodeSelectionType {
    static fromJSON(json: {
        type: string;
    }): BarcodeSelectionType;
}
export class BarcodeSelectionAimerSelection implements BarcodeSelectionType {
    private type;
    selectionStrategy: BarcodeSelectionStrategy;
    static get aimerSelection(): BarcodeSelectionAimerSelection;
    private constructor();
}
export class BarcodeSelectionTapSelection implements BarcodeSelectionType {
    private type;
    freezeBehavior: BarcodeSelectionFreezeBehavior;
    tapBehavior: BarcodeSelectionTapBehavior;
    static get tapSelection(): BarcodeSelectionTapSelection;
    static withFreezeBehaviorAndTapBehavior(freezeBehavior: BarcodeSelectionFreezeBehavior, tapBehavior: BarcodeSelectionTapBehavior): BarcodeSelectionTapSelection;
}
export class BarcodeSelectionSession {
    private _selectedBarcodes;
    private _newlySelectedBarcodes;
    private _newlyUnselectedBarcodes;
    private _frameSequenceID;
    private listenerProxy;
    get selectedBarcodes(): Barcode[];
    get newlySelectedBarcodes(): Barcode[];
    get newlyUnselectedBarcodes(): Barcode[];
    get frameSequenceID(): number;
    private static fromJSON;
    getCount(barcode: Barcode): Promise<number>;
    reset(): Promise<void>;
}
export interface BarcodeSelectionSessionJSON {
    selectedBarcodes: BarcodeJSON[];
    newlySelectedBarcodes: BarcodeJSON[];
    newlyUnselectedBarcodes: BarcodeJSON[];
    frameSequenceId: number;
}
interface PrivateBarcodeSelectionSession {
    listenerProxy: BarcodeSelectionListenerProxy;
    fromJSON(json: BarcodeSelectionSessionJSON): BarcodeSelectionSession;
}
export interface BarcodeSelectionListener {
    didUpdateSelection?(barcodeSelection: BarcodeSelection, session: BarcodeSelectionSession): void;
    didUpdateSession?(barcodeSelection: BarcodeSelection, session: BarcodeSelectionSession): void;
}
interface PrivateBarcodeSelectionBasicOverlay {
    toJSON(): object;
}
export enum BarcodeSelectionBasicOverlayStyle {
    Frame = "frame",
    Dot = "dot"
}
export class BarcodeSelectionBasicOverlay implements DataCaptureOverlay {
    private type;
    private barcodeSelection;
    private _trackedBrush;
    private _aimedBrush;
    private _selectedBrush;
    private _selectingBrush;
    get trackedBrush(): Brush;
    set trackedBrush(newBrush: Brush);
    get aimedBrush(): Brush;
    set aimedBrush(newBrush: Brush);
    get selectedBrush(): Brush;
    set selectedBrush(newBrush: Brush);
    get selectingBrush(): Brush;
    set selectingBrush(newBrush: Brush);
    private _style;
    get style(): BarcodeSelectionBasicOverlayStyle;
    private _shouldShowScanAreaGuides;
    private _shouldShowHints;
    private _viewfinder;
    get viewfinder(): Viewfinder;
    get shouldShowScanAreaGuides(): boolean;
    set shouldShowScanAreaGuides(shouldShow: boolean);
    get shouldShowHints(): boolean;
    set shouldShowHints(shouldShow: boolean);
    static withBarcodeSelection(barcodeSelection: BarcodeSelection): BarcodeSelectionBasicOverlay;
    static withBarcodeSelectionForView(barcodeSelection: BarcodeSelection, view: DataCaptureView | null): BarcodeSelectionBasicOverlay;
    static withBarcodeSelectionForViewWithStyle(barcodeSelection: BarcodeSelection, view: DataCaptureView | null, style: BarcodeSelectionBasicOverlayStyle): BarcodeSelectionBasicOverlay;
    private constructor();
}

}
