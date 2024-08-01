export interface BlockingModeListenerResult {
    enabled: boolean;
}
export declare const Cordova: {
    pluginName: string;
    defaults: {};
    exec: (success: Function | null, error: Function | null, functionName: string, args: [
        any
    ] | null) => void;
};
export declare function initializeBarcodeCordova(): void;
export declare enum CordovaFunction {
    SubscribeBarcodeCaptureListener = "subscribeBarcodeCaptureListener",
    UnsubscribeBarcodeCaptureListener = "unsubscribeBarcodeCaptureListener",
    FinishBarcodeCaptureDidScan = "finishBarcodeCaptureDidScan",
    FinishBarcodeCaptureDidUpdateSession = "finishBarcodeCaptureDidUpdateSession",
    SetBarcodeCaptureModeEnabledState = "setBarcodeCaptureModeEnabledState",
    SetBarcodeSelectionModeEnabledState = "setBarcodeSelectionModeEnabledState",
    SubscribeBarcodeSelectionListener = "subscribeBarcodeSelectionListener",
    UnsubscribeBarcodeSelectionListener = "unsubscribeBarcodeSelectionListener",
    GetCountForBarcodeInBarcodeSelectionSession = "getCountForBarcodeInBarcodeSelectionSession",
    ResetBarcodeCaptureSession = "resetBarcodeCaptureSession",
    ResetBarcodeSelectionSession = "resetBarcodeSelectionSession",
    ResetBarcodeSelection = "resetBarcodeSelection",
    UnfreezeCameraInBarcodeSelection = "unfreezeCameraInBarcodeSelection",
    SelectAimedBarcode = "selectAimedBarcode",
    IncreaseCountForBarcodes = "increaseCountForBarcodes",
    UnselectBarcodes = "unselectBarcodes",
    SetSelectBarcodeEnabled = "setSelectBarcodeEnabled",
    FinishBarcodeSelectionDidUpdateSelection = "finishBarcodeSelectionDidUpdateSelection",
    FinishBarcodeSelectionDidUpdateSession = "finishBarcodeSelectionDidUpdateSession",
    UpdateBarcodeSelectionBasicOverlay = "updateBarcodeSelectionBasicOverlay",
    UpdateBarcodeSelectionMode = "updateBarcodeSelectionMode",
    ApplyBarcodeSelectionModeSettings = "applyBarcodeSelectionModeSettings",
    UpdateBarcodeCaptureOverlay = "updateBarcodeCaptureOverlay",
    UpdateBarcodeCaptureMode = "updateBarcodeCaptureMode",
    ApplyBarcodeCaptureModeSettings = "applyBarcodeCaptureModeSettings",
    SetTextForAimToSelectAutoHint = "setTextForAimToSelectAutoHint",
    RemoveAimedBarcodeBrushProvider = "removeAimedBarcodeBrushProvider",
    SetAimedBarcodeBrushProvider = "setAimedBarcodeBrushProvider",
    FinishBrushForAimedBarcodeCallback = "finishBrushForAimedBarcodeCallback",
    RemoveTrackedBarcodeBrushProvider = "removeTrackedBarcodeBrushProvider",
    SetTrackedBarcodeBrushProvider = "setTrackedBarcodeBrushProvider",
    FinishBrushForTrackedBarcodeCallback = "finishBrushForTrackedBarcodeCallback",
    SetViewForTrackedBarcode = "setViewForTrackedBarcode",
    SetAnchorForTrackedBarcode = "setAnchorForTrackedBarcode",
    SetOffsetForTrackedBarcode = "setOffsetForTrackedBarcode",
    ClearTrackedBarcodeViews = "clearTrackedBarcodeViews",
    SetBrushForTrackedBarcode = "setBrushForTrackedBarcode",
    ClearTrackedBarcodeBrushes = "clearTrackedBarcodeBrushes",
    SetBarcodeTrackingModeEnabledState = "setBarcodeTrackingModeEnabledState",
    SubscribeBarcodeTrackingListener = "subscribeBarcodeTrackingListener",
    UnregisterBarcodeTrackingListener = "unregisterBarcodeTrackingListener",
    SubscribeBarcodeTrackingAdvancedOverlayListener = "subscribeBarcodeTrackingAdvancedOverlayListener",
    SubscribeBarcodeTrackingBasicOverlayListener = "subscribeBarcodeTrackingBasicOverlayListener",
    ResetBarcodeTrackingSession = "resetBarcodeTrackingSession",
    UpdateBarcodeTrackingAdvancedOverlay = "updateBarcodeTrackingAdvancedOverlay",
    UpdateBarcodeTrackingBasicOverlay = "updateBarcodeTrackingBasicOverlay",
    UpdateBarcodeTrackingMode = "updateBarcodeTrackingMode",
    ApplyBarcodeTrackingModeSettings = "applyBarcodeTrackingModeSettings",
    FinishBarcodeTrackingDidUpdateSession = "finishBarcodeTrackingDidUpdateSession",
    FinishBarcodeTrackingBrushForTrackedBarcode = "finishBarcodeTrackingBrushForTrackedBarcode",
    UnregisterBarcodeTrackingAdvancedOverlayListener = "unregisterBarcodeTrackingAdvancedOverlayListener",
    UnregisterBarcodeTrackingBasicOverlayListener = "unregisterBarcodeTrackingBasicOverlayListener",
    CreatePickView = "createPickView",
    PickViewStart = "viewStart",
    PickViewStop = "viewStop",
    PickViewFreeze = "viewFreeze",
    SetPositionAndSize = "setPickViewPositionAndSize",
    UpdatePickView = "updatePickView",
    SubscribeDidPickItemListener = "subscribeDidPickItemListener",
    SubscribeDidUnpickItemListener = "subscribeDidUnpickItemListener",
    AddActionListener = "addActionListener",
    AddViewListener = "addViewListener",
    RegisterBarcodePickViewUiListener = "registerBarcodePickViewUiListener",
    SubscribeBarcodePickViewUiListener = "subscribeBarcodePickViewUiListener",
    UnsubscribeBarcodePickViewUiListener = "unsubscribeBarcodePickViewUiListener",
    SubscribeDidStartScanningListener = "subscribeDidStartScanningListener",
    SubscribeDidFreezeScanningListener = "subscribeDidFreezeScanningListener",
    SubscribeDidPauseScanningListener = "subscribeDidPauseScanningListener",
    SubscribeDidStopScanningListener = "subscribeDidStopScanningListener",
    FinishPickAction = "finishPickAction",
    UnsubscribeListeners = "unsubscribeListeners",
    AddScanningListener = "addScanningListener",
    RemoveScanningListener = "removeScanningListener",
    SubscribeDidCompleteScanningSessionListener = "subscribeDidCompleteScanningSessionListener",
    SubscribeDidUpdateScanningSessionListener = "subscribeDidUpdateScanningSessionListener",
    SubscribeProductIdentifierForItemsListener = "subscribeProductIdentifierForItemsListener",
    UnsubscribeProductIdentifierForItemsListener = "unsubscribeProductIdentifierForItemsListener",
    FinishOnProductIdentifierForItems = "finishOnProductIdentifierForItems",
    UnregisterSparkScanViewListenerEvents = "unregisterSparkScanViewListenerEvents",
    RegisterSparkScanViewListenerEvents = "registerSparkScanViewListenerEvents",
    PrepareSparkScanViewScanning = "prepareSparkScanViewScanning",
    StartSparkScanViewScanning = "startSparkScanViewScanning",
    PauseSparkScanViewScanning = "pauseSparkScanViewScanning",
    StopSparkScanViewScanning = "stopSparkScanViewScanning",
    EmitSparkScanViewFeedback = "emitSparkScanViewFeedback",
    FinishSparkScanDidUpdateSessionCallback = "finishSparkScanDidUpdateSessionCallback",
    FinishSparkScanDidScanCallback = "finishSparkScanDidScanCallback",
    RegisterSparkScanListenerForEvents = "registerSparkScanListenerForEvents",
    UnregisterSparkScanListenerForEvents = "unregisterSparkScanListenerForEvents",
    SetSparkScanModeEnabledState = "setSparkScanModeEnabledState",
    ResetSparkScanSession = "resetSparkScanSession",
    CreateSparkScanView = "createSparkScanView",
    DisposeSparkScanView = "disposeSparkScanView",
    UpdateSparkScanView = "updateSparkScanView",
    UpdateSparkScanMode = "updateSparkScanMode",
    ShowSparkScanView = "showSparkScanView",
    HideSparkScanView = "hideSparkScanView",
    AddSparkScanFeedbackDelegate = "addSparkScanFeedbackDelegate",
    RemoveSparkScanFeedbackDelegate = "removeSparkScanFeedbackDelegate",
    SubmitSparkScanFeedbackForBarcode = "submitSparkScanFeedbackForBarcode",
    ShowToast = "showToast",
    BarcodeFindSetItemList = "barcodeFindSetItemList",
    UpdateFindMode = "updateFindMode",
    BarcodeFindModeStart = "barcodeFindModeStart",
    BarcodeFindModePause = "barcodeFindModePause",
    BarcodeFindModeStop = "barcodeFindModeStop",
    SetBarcodeFindModeEnabledState = "setBarcodeFindModeEnabledState",
    setBarcodeFindTransformer = "setBarcodeFindTransformer",
    SubmitBarcodeFindTransformerResult = "submitBarcodeFindTransformerResult",
    RegisterBarcodeFindListener = "registerBarcodeFindListener",
    UnregisterBarcodeFindListener = "unregisterBarcodeFindListener",
    ShowFindView = "showFindView",
    HideFindView = "hideFindView",
    BarcodeFindViewOnResume = "barcodeFindViewOnResume",
    BarcodeFindViewStartSearching = "barcodeFindViewStartSearching",
    BarcodeFindViewPauseSearching = "barcodeFindViewPauseSearching",
    BarcodeFindViewStopSearching = "barcodeFindViewStopSearching",
    CreateFindView = "createFindView",
    UpdateFindView = "updateFindView",
    RegisterBarcodeFindViewListener = "registerBarcodeFindViewListener",
    UnregisterBarcodeFindViewListener = "unregisterBarcodeFindViewListener",
    BarcodeCountUpdateMode = "updateMode",
    ResetBarcodeCount = "resetBarcodeCount",
    RegisterBarcodeCountListener = "registerBarcodeCountListener",
    SetBarcodeCountModeEnabledState = "setBarcodeCountModeEnabledState",
    UnregisterBarcodeCountListener = "unregisterBarcodeCountListener",
    FinishBarcodeCountListenerOnScan = "finishBarcodeCountListenerOnScan",
    StartScanningPhase = "startScanningPhase",
    EndScanningPhase = "endScanningPhase",
    SetBarcodeCountCaptureList = "setBarcodeCountCaptureList",
    GetSpatialMap = "getSpatialMap",
    GetSpatialMapWithHints = "getSpatialMapWithHints",
    ResetBarcodeCountSession = "resetBarcodeCountSession",
    UpdateBarcodeCountView = "updateBarcodeCountView",
    CreateBarcodeCountView = "createBarcodeCountView",
    RegisterBarcodeCountViewUiListener = "registerBarcodeCountViewUiListener",
    UnregisterBarcodeCountViewUiListener = "unregisterBarcodeCountViewUiListener",
    RegisterBarcodeCountViewListener = "registerBarcodeCountViewListener",
    UnregisterBarcodeCountViewListener = "unregisterBarcodeCountViewListener",
    ClearBarcodeCountViewHighlights = "clearBarcodeCountViewHighlights",
    SetBarcodeCountViewPositionAndSize = "setBarcodeCountViewPositionAndSize",
    ShowBarcodeCountView = "showBarcodeCountView",
    HideBarcodeCountView = "hideBarcodeCountView",
    FinishBarcodeCountViewListenerBrushForRecognizedBarcode = "finishBarcodeCountViewListenerBrushForRecognizedBarcode",
    FinishBarcodeCountViewListenerBrushForRecognizedBarcodeNotInList = "finishBarcodeCountViewListenerBrushForRecognizedBarcodeNotInList",
    FinishBarcodeCountViewListenerOnBrushForUnrecognizedBarcode = "finishBarcodeCountViewListenerOnBrushForUnrecognizedBarcode"
}
