import { BarcodeCount, BarcodeCountNotInListActionSettings, TrackedBarcode } from 'scandit-datacapture-frameworks-barcode';
import { Anchor } from 'scandit-datacapture-frameworks-core';
import { BarcodeCountViewListener, BarcodeCountViewUiListener, BarcodeCountToolbarSettings } from 'scandit-datacapture-frameworks-barcode';
import { Brush } from 'scandit-datacapture-frameworks-core';
import { BarcodeFilterHighlightSettings, BarcodeCountViewStyle } from 'scandit-datacapture-frameworks-barcode';
import { DataCaptureContext } from 'scandit-datacapture-frameworks-core';
import { Rect } from 'scandit-datacapture-frameworks-core';
export declare class BarcodeCountView {
    static get defaultRecognizedBrush(): Brush;
    static get defaultNotInListBrush(): Brush;
    static get defaultAcceptedBrush(): Brush;
    static get defaultRejectedBrush(): Brush;
    static get hardwareTriggerSupported(): boolean;
    get uiListener(): BarcodeCountViewUiListener | null;
    set uiListener(listener: BarcodeCountViewUiListener | null);
    get listener(): BarcodeCountViewListener | null;
    set listener(listener: BarcodeCountViewListener | null);
    get shouldShowUserGuidanceView(): boolean;
    set shouldShowUserGuidanceView(newValue: boolean);
    get shouldShowListButton(): boolean;
    set shouldShowListButton(newValue: boolean);
    get shouldDisableModeOnExitButtonTapped(): boolean;
    set shouldDisableModeOnExitButtonTapped(newValue: boolean);
    get shouldShowExitButton(): boolean;
    set shouldShowExitButton(newValue: boolean);
    get shouldShowShutterButton(): boolean;
    set shouldShowShutterButton(newValue: boolean);
    get shouldShowHints(): boolean;
    set shouldShowHints(newValue: boolean);
    get shouldShowClearHighlightsButton(): boolean;
    set shouldShowClearHighlightsButton(newValue: boolean);
    get shouldShowSingleScanButton(): boolean;
    set shouldShowSingleScanButton(newValue: boolean);
    get shouldShowFloatingShutterButton(): boolean;
    set shouldShowFloatingShutterButton(newValue: boolean);
    get shouldShowToolbar(): boolean;
    set shouldShowToolbar(newValue: boolean);
    get shouldShowScanAreaGuides(): boolean;
    set shouldShowScanAreaGuides(newValue: boolean);
    get recognizedBrush(): Brush | null;
    set recognizedBrush(newValue: Brush | null);
    get notInListBrush(): Brush | null;
    set notInListBrush(newValue: Brush | null);
    get acceptedBrush(): Brush | null;
    set acceptedBrush(newValue: Brush | null);
    get rejectedBrush(): Brush | null;
    set rejectedBrush(newValue: Brush | null);
    get filterSettings(): BarcodeFilterHighlightSettings | null;
    set filterSettings(newValue: BarcodeFilterHighlightSettings | null);
    get style(): BarcodeCountViewStyle;
    get listButtonAccessibilityHint(): string;
    set listButtonAccessibilityHint(newValue: string);
    get listButtonAccessibilityLabel(): string;
    set listButtonAccessibilityLabel(newValue: string);
    get listButtonContentDescription(): string;
    set listButtonContentDescription(newValue: string);
    get exitButtonAccessibilityHint(): string;
    set exitButtonAccessibilityHint(newValue: string);
    get exitButtonAccessibilityLabel(): string;
    set exitButtonAccessibilityLabel(newValue: string);
    get exitButtonContentDescription(): string;
    set exitButtonContentDescription(newValue: string);
    get shutterButtonAccessibilityHint(): string;
    set shutterButtonAccessibilityHint(newValue: string);
    get shutterButtonAccessibilityLabel(): string;
    set shutterButtonAccessibilityLabel(newValue: string);
    get shutterButtonContentDescription(): string;
    set shutterButtonContentDescription(newValue: string);
    get floatingShutterButtonAccessibilityHint(): string;
    set floatingShutterButtonAccessibilityHint(newValue: string);
    get floatingShutterButtonAccessibilityLabel(): string;
    set floatingShutterButtonAccessibilityLabel(newValue: string);
    get floatingShutterButtonContentDescription(): string;
    set floatingShutterButtonContentDescription(newValue: string);
    get clearHighlightsButtonAccessibilityHint(): string;
    set clearHighlightsButtonAccessibilityHint(newValue: string);
    get clearHighlightsButtonAccessibilityLabel(): string;
    set clearHighlightsButtonAccessibilityLabel(newValue: string);
    get clearHighlightsButtonContentDescription(): string;
    set clearHighlightsButtonContentDescription(newValue: string);
    get singleScanButtonAccessibilityHint(): string;
    set singleScanButtonAccessibilityHint(newValue: string);
    get singleScanButtonAccessibilityLabel(): string;
    set singleScanButtonAccessibilityLabel(newValue: string);
    get singleScanButtonContentDescription(): string;
    set singleScanButtonContentDescription(newValue: string);
    get clearHighlightsButtonText(): string;
    set clearHighlightsButtonText(newValue: string);
    get exitButtonText(): string;
    set exitButtonText(newValue: string);
    get textForTapShutterToScanHint(): string;
    set textForTapShutterToScanHint(newValue: string);
    get textForScanningHint(): string;
    set textForScanningHint(newValue: string);
    get textForMoveCloserAndRescanHint(): string;
    set textForMoveCloserAndRescanHint(newValue: string);
    get textForMoveFurtherAndRescanHint(): string;
    set textForMoveFurtherAndRescanHint(newValue: string);
    get shouldShowListProgressBar(): boolean;
    set shouldShowListProgressBar(newValue: boolean);
    get shouldShowTorchControl(): boolean;
    set shouldShowTorchControl(newValue: boolean);
    get torchControlPosition(): Anchor;
    set torchControlPosition(newValue: Anchor);
    get textForTapToUncountHint(): string;
    set textForTapToUncountHint(newValue: string);
    get tapToUncountEnabled(): boolean;
    set tapToUncountEnabled(newValue: boolean);
    get barcodeNotInListActionSettings(): BarcodeCountNotInListActionSettings;
    set barcodeNotInListActionSettings(newValue: BarcodeCountNotInListActionSettings);
    get hardwareTriggerEnabled(): boolean;
    set hardwareTriggerEnabled(newValue: boolean);
    private baseBarcodeCountView;
    private htmlElement;
    private _htmlElementState;
    private set htmlElementState(value);
    private get htmlElementState();
    private scrollListener;
    private domObserver;
    static forContextWithMode(context: DataCaptureContext, barcodeCount: BarcodeCount): BarcodeCountView;
    static forContextWithModeAndStyle(context: DataCaptureContext, barcodeCount: BarcodeCount, style: BarcodeCountViewStyle): BarcodeCountView;
    constructor({ context, barcodeCount, style }: {
        context: DataCaptureContext;
        barcodeCount: BarcodeCount;
        style: BarcodeCountViewStyle;
    });
    private orientationChangeListener;
    clearHighlights(): Promise<void>;
    setToolbarSettings(settings: BarcodeCountToolbarSettings): void;
    connectToElement(element: HTMLElement): void;
    detachFromElement(): void;
    setFrame(frame: Rect, isUnderContent?: boolean): Promise<void>;
    show(): Promise<void>;
    hide(): Promise<void>;
    setBrushForRecognizedBarcode(trackedBarcode: TrackedBarcode, brush: Brush | null): Promise<void>;
    setBrushForRecognizedBarcodeNotInList(trackedBarcode: TrackedBarcode, brush: Brush | null): Promise<void>;
    setBrushForAcceptedBarcode(trackedBarcode: TrackedBarcode, brush: Brush | null): Promise<void>;
    setBrushForRejectedBarcode(trackedBarcode: TrackedBarcode, brush: Brush | null): Promise<void>;
    enableHardwareTrigger(hardwareTriggerKeyCode: number | null): Promise<void>;
    private subscribeToChangesOnHTMLElement;
    private unsubscribeFromChangesOnHTMLElement;
    private elementDidChange;
    private updatePositionAndSize;
    private _show;
    private _hide;
    private toJSON;
}
