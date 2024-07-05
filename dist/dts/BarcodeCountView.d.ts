import { BarcodeCount } from 'scandit-datacapture-frameworks-barcode';
import { DefaultSerializeable } from 'scandit-datacapture-frameworks-core';
import { BarcodeCountViewListener, BarcodeCountViewUiListener, BarcodeCountToolbarSettings } from 'scandit-datacapture-frameworks-barcode';
import { Brush } from 'scandit-datacapture-frameworks-core';
import { BarcodeFilterHighlightSettings, BarcodeCountViewStyle } from 'scandit-datacapture-frameworks-barcode';
import { DataCaptureContext } from 'scandit-datacapture-frameworks-core';
import { Rect } from 'scandit-datacapture-frameworks-core';
export declare class BarcodeCountView extends DefaultSerializeable {
    get uiListener(): BarcodeCountViewUiListener | null;
    set uiListener(listener: BarcodeCountViewUiListener | null);
    get listener(): BarcodeCountViewListener | null;
    set listener(listener: BarcodeCountViewListener | null);
    get shouldShowUserGuidanceView(): boolean;
    set shouldShowUserGuidanceView(newValue: boolean);
    get shouldShowListButton(): boolean;
    set shouldShowListButton(newValue: boolean);
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
    static get defaultRecognizedBrush(): Brush;
    static get defaultUnrecognizedBrush(): Brush;
    static get defaultNotInListBrush(): Brush;
    get recognizedBrush(): Brush | null;
    set recognizedBrush(newValue: Brush | null);
    get unrecognizedBrush(): Brush | null;
    set unrecognizedBrush(newValue: Brush | null);
    get notInListBrush(): Brush | null;
    set notInListBrush(newValue: Brush | null);
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
    get shouldShowListProgressBar(): boolean;
    set shouldShowListProgressBar(newValue: boolean);
    get textForMoveFurtherAndRescanHint(): string;
    set textForMoveFurtherAndRescanHint(newValue: string);
    get textForUnrecognizedBarcodesDetectedHint(): string;
    set textForUnrecognizedBarcodesDetectedHint(newValue: string);
    private _barcodeCount;
    private _context;
    private viewProxy;
    private _uiListener;
    private _listener;
    private _shouldShowUserGuidanceView;
    private _shouldShowListButton;
    private _shouldShowExitButton;
    private _shouldShowShutterButton;
    private _shouldShowHints;
    private _shouldShowClearHighlightsButton;
    private _shouldShowSingleScanButton;
    private _shouldShowFloatingShutterButton;
    private _shouldShowToolbar;
    private _shouldShowScanAreaGuides;
    private _recognizedBrush;
    private _unrecognizedBrush;
    private _notInListBrush;
    private _filterSettings;
    private _style;
    private _listButtonAccessibilityHint;
    private _listButtonAccessibilityLabel;
    private _listButtonContentDescription;
    private _exitButtonAccessibilityHint;
    private _exitButtonAccessibilityLabel;
    private _exitButtonContentDescription;
    private _shutterButtonAccessibilityHint;
    private _shutterButtonAccessibilityLabel;
    private _shutterButtonContentDescription;
    private _floatingShutterButtonAccessibilityHint;
    private _floatingShutterButtonAccessibilityLabel;
    private _floatingShutterButtonContentDescription;
    private _clearHighlightsButtonAccessibilityHint;
    private _clearHighlightsButtonAccessibilityLabel;
    private _clearHighlightsButtonContentDescription;
    private _singleScanButtonAccessibilityHint;
    private _singleScanButtonAccessibilityLabel;
    private _singleScanButtonContentDescription;
    private _clearHighlightsButtonText;
    private _exitButtonText;
    private _textForTapShutterToScanHint;
    private _textForScanningHint;
    private _textForMoveCloserAndRescanHint;
    private _shouldShowListProgressBar;
    private _textForMoveFurtherAndRescanHint;
    private _textForUnrecognizedBarcodesDetectedHint;
    private _toolbarSettings;
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
    private updateNative;
    connectToElement(element: HTMLElement): void;
    detachFromElement(): void;
    setFrame(frame: Rect, isUnderContent?: boolean): Promise<void>;
    show(): Promise<void>;
    hide(): Promise<void>;
    private subscribeToChangesOnHTMLElement;
    private unsubscribeFromChangesOnHTMLElement;
    private elementDidChange;
    private updatePositionAndSize;
    private _show;
    private _hide;
}
