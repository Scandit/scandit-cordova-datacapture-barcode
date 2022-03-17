import ScanditBarcodeCapture

fileprivate extension Brush {
    var asDefaults: ScanditCaptureCoreDefaults.BrushDefaults {
        return ScanditCaptureCoreDefaults.BrushDefaults.from(self)
    }
}

fileprivate extension BarcodeCaptureOverlay {
    static var defaultStyle: BarcodeCaptureOverlayStyle {
        return BarcodeCaptureOverlay(barcodeCapture:
                                        BarcodeCapture(context: nil, settings: BarcodeCaptureSettings())).style
    }
}

fileprivate extension BarcodeTrackingBasicOverlay {
    static var defaultStyle: BarcodeTrackingBasicOverlayStyle {
        return BarcodeTrackingBasicOverlay(barcodeTracking:
                                            BarcodeTracking(context: nil, settings: BarcodeTrackingSettings())).style
    }
}

fileprivate extension BarcodeSelectionBasicOverlay {
    static var defaultStyle: BarcodeSelectionBasicOverlayStyle {
        return BarcodeSelectionBasicOverlay(barcodeSelection:
                                                BarcodeSelection(context: nil,
                                                                 settings: BarcodeSelectionSettings())).style
    }
}

struct ScanditBarcodeCaptureDefaults: Encodable {
    typealias CameraSettingsDefaults = ScanditCaptureCoreDefaults.CameraSettingsDefaults

    struct BarcodeCaptureOverlayDefaults: Encodable {
        let defaultStyle: String
        let DefaultBrush: ScanditCaptureCoreDefaults.BrushDefaults
        let styles: [String: [String: ScanditCaptureCoreDefaults.BrushDefaults]]
    }

    struct BarcodeTrackingBasicOverlayDefaults: Encodable {
        let defaultStyle: String
        let DefaultBrush: ScanditCaptureCoreDefaults.BrushDefaults
        let styles: [String: [String: ScanditCaptureCoreDefaults.BrushDefaults]]
    }

    struct BarcodeSelectionBasicOverlayDefaults: Encodable {
        let defaultStyle: String
        let DefaultTrackedBrush: ScanditCaptureCoreDefaults.BrushDefaults
        let DefaultAimedBrush: ScanditCaptureCoreDefaults.BrushDefaults
        let DefaultSelectedBrush: ScanditCaptureCoreDefaults.BrushDefaults
        let DefaultSelectingBrush: ScanditCaptureCoreDefaults.BrushDefaults
        let styles: [String: [String: ScanditCaptureCoreDefaults.BrushDefaults]]
    }

    struct BarcodeCaptureSettingsDefaults: Encodable {
        let codeDuplicateFilter: Int
    }

    struct BarcodeSelectionSettingsDefaults: Encodable {
        let codeDuplicateFilter: Int
        let singleBarcodeAutoDetection: Bool
        let selectionType: String
    }

    struct SparkCaptureSettingsDefaults: Encodable {
        let codeDuplicateFilter: Int
        let locationSelection: String?
    }

    struct BarcodeSelectionTapSelectionDefaults: Encodable {
        let defaultFreezeBehaviour: String
        let defaultTapBehaviour: String
    }

    struct BarcodeSelectionAimerSelectionDefaults: Encodable {
        let defaultSelectionStrategy: String
    }

    struct BarcodeCaptureDefaultsContainer: Encodable {
        let BarcodeCaptureOverlay: BarcodeCaptureOverlayDefaults
        let BarcodeCaptureSettings: BarcodeCaptureSettingsDefaults
        let RecommendedCameraSettings: CameraSettingsDefaults
    }

    struct BarcodeTrackingDefaultsContainer: Encodable {
        let BarcodeTrackingBasicOverlay: BarcodeTrackingBasicOverlayDefaults
        let RecommendedCameraSettings: CameraSettingsDefaults
    }

    struct BarcodeSelectionDefaultsContainer: Encodable {
        let RecommendedCameraSettings: CameraSettingsDefaults
        let feedback: String
        let BarcodeSelectionSettings: BarcodeSelectionSettingsDefaults
        let BarcodeSelectionTapSelection: BarcodeSelectionTapSelectionDefaults
        let BarcodeSelectionAimerSelection: BarcodeSelectionAimerSelectionDefaults
        let BarcodeSelectionBasicOverlay: BarcodeSelectionBasicOverlayDefaults
    }

    struct SparkCaptureDefaultsContainer: Encodable {
        let feedback: String
        let SparkCaptureSettings: SparkCaptureSettingsDefaults
    }

    typealias SymbologySettingsDefaults = [String: String]
    typealias SymbologyDescriptionsDefaults = [String]
    typealias CompositeTypeDescriptionsDefaults = [String]

    let BarcodeCapture: BarcodeCaptureDefaultsContainer
    let BarcodeTracking: BarcodeTrackingDefaultsContainer
    let BarcodeSelection: BarcodeSelectionDefaultsContainer
    let SparkCapture: SparkCaptureDefaultsContainer
    let SymbologySettings: SymbologySettingsDefaults
    let SymbologyDescriptions: SymbologyDescriptionsDefaults
    let CompositeTypeDescriptions: CompositeTypeDescriptionsDefaults

    init() {
        self.BarcodeCapture = BarcodeCaptureDefaultsContainer()
        self.BarcodeTracking = BarcodeTrackingDefaultsContainer()
        self.BarcodeSelection = BarcodeSelectionDefaultsContainer()
        self.SparkCapture = SparkCaptureDefaultsContainer()
        self.SymbologySettings = SymbologySettingsDefaults.fromDefaultSettings()
        self.SymbologyDescriptions = SymbologyDescription.all.map { $0.jsonString }
        self.CompositeTypeDescriptions = CompositeTypeDescription.all.map { $0.jsonString }
    }
}

extension ScanditBarcodeCaptureDefaults.BarcodeCaptureDefaultsContainer {
    init() {
        BarcodeCaptureOverlay = ScanditBarcodeCaptureDefaults.BarcodeCaptureOverlayDefaults()
        BarcodeCaptureSettings = ScanditBarcodeCaptureDefaults.BarcodeCaptureSettingsDefaults()
        RecommendedCameraSettings = ScanditCaptureCoreDefaults
            .CameraSettingsDefaults.from(BarcodeCapture.recommendedCameraSettings)
    }
}

extension ScanditBarcodeCaptureDefaults.BarcodeTrackingDefaultsContainer {
    init() {
        BarcodeTrackingBasicOverlay = ScanditBarcodeCaptureDefaults.BarcodeTrackingBasicOverlayDefaults()
        RecommendedCameraSettings = ScanditCaptureCoreDefaults
            .CameraSettingsDefaults.from(BarcodeTracking.recommendedCameraSettings)
    }
}

extension ScanditBarcodeCaptureDefaults.BarcodeSelectionDefaultsContainer {
    init() {
        RecommendedCameraSettings = ScanditCaptureCoreDefaults
            .CameraSettingsDefaults.from(BarcodeSelection.recommendedCameraSettings)
        feedback = BarcodeSelectionFeedback.default.jsonString
        BarcodeSelectionSettings = ScanditBarcodeCaptureDefaults.BarcodeSelectionSettingsDefaults()
        BarcodeSelectionTapSelection = ScanditBarcodeCaptureDefaults.BarcodeSelectionTapSelectionDefaults()
        BarcodeSelectionAimerSelection = ScanditBarcodeCaptureDefaults.BarcodeSelectionAimerSelectionDefaults()
        BarcodeSelectionBasicOverlay = ScanditBarcodeCaptureDefaults.BarcodeSelectionBasicOverlayDefaults()
    }
}

extension ScanditBarcodeCaptureDefaults.SparkCaptureDefaultsContainer {
    init() {
        SparkCaptureSettings = ScanditBarcodeCaptureDefaults.SparkCaptureSettingsDefaults()
        feedback = SparkCaptureFeedback.default.jsonString
    }
}

extension ScanditBarcodeCaptureDefaults.BarcodeCaptureOverlayDefaults {
    init() {
        DefaultBrush = BarcodeCaptureOverlay.defaultBrush.asDefaults
        defaultStyle = BarcodeCaptureOverlay.defaultStyle.jsonString
        styles = [
            BarcodeCaptureOverlayStyle.legacy.jsonString: [
                "DefaultBrush": ScanditCaptureCoreDefaults.BrushDefaults.from(
                    BarcodeCaptureOverlay(
                        barcodeCapture: BarcodeCapture(
                        context: nil,
                        settings: BarcodeCaptureSettings()),
                    with: BarcodeCaptureOverlayStyle.legacy
                ).brush)
            ],
            BarcodeCaptureOverlayStyle.frame.jsonString: [
                "DefaultBrush": ScanditCaptureCoreDefaults.BrushDefaults.from(
                    BarcodeCaptureOverlay(
                        barcodeCapture: BarcodeCapture(
                        context: nil,
                        settings: BarcodeCaptureSettings()),
                    with: BarcodeCaptureOverlayStyle.frame
                ).brush)
            ]
        ]
    }
}

extension ScanditBarcodeCaptureDefaults.BarcodeTrackingBasicOverlayDefaults {
    init() {
        DefaultBrush = BarcodeTrackingBasicOverlay.defaultBrush.asDefaults
        defaultStyle = BarcodeTrackingBasicOverlay.defaultStyle.jsonString
        styles = [
            BarcodeTrackingBasicOverlayStyle.legacy.jsonString: [
                "DefaultBrush": ScanditCaptureCoreDefaults.BrushDefaults.from(
                    BarcodeTrackingBasicOverlay(
                        barcodeTracking: BarcodeTracking(
                        context: nil,
                        settings: BarcodeTrackingSettings()),
                    with: BarcodeTrackingBasicOverlayStyle.legacy
                ).brush ?? BarcodeTrackingBasicOverlay.defaultBrush)
            ],
            BarcodeTrackingBasicOverlayStyle.frame.jsonString: [
                "DefaultBrush": ScanditCaptureCoreDefaults.BrushDefaults.from(
                    BarcodeTrackingBasicOverlay(
                        barcodeTracking: BarcodeTracking(
                        context: nil,
                        settings: BarcodeTrackingSettings()),
                    with: BarcodeTrackingBasicOverlayStyle.frame
                ).brush ?? BarcodeTrackingBasicOverlay.defaultBrush)
            ],
            BarcodeTrackingBasicOverlayStyle.dot.jsonString: [
                "DefaultBrush": ScanditCaptureCoreDefaults.BrushDefaults.from(
                    BarcodeTrackingBasicOverlay(
                        barcodeTracking: BarcodeTracking(
                        context: nil,
                        settings: BarcodeTrackingSettings()),
                    with: BarcodeTrackingBasicOverlayStyle.dot
                ).brush ?? BarcodeTrackingBasicOverlay.defaultBrush)
            ]
        ]
    }
}

extension ScanditBarcodeCaptureDefaults.BarcodeSelectionBasicOverlayDefaults {

    init() {
        DefaultTrackedBrush = BarcodeSelectionBasicOverlay.defaultTrackedBrush(forStyle: BarcodeSelectionBasicOverlay.defaultStyle).asDefaults
        DefaultAimedBrush = BarcodeSelectionBasicOverlay.defaultAimedBrush(forStyle: BarcodeSelectionBasicOverlay.defaultStyle).asDefaults
        DefaultSelectedBrush = BarcodeSelectionBasicOverlay.defaultSelectedBrush(forStyle: BarcodeSelectionBasicOverlay.defaultStyle).asDefaults
        DefaultSelectingBrush = BarcodeSelectionBasicOverlay.defaultSelectingBrush(forStyle: BarcodeSelectionBasicOverlay.defaultStyle).asDefaults
        defaultStyle = BarcodeSelectionBasicOverlay.defaultStyle.jsonString
        styles = [
            BarcodeSelectionBasicOverlayStyle.dot.jsonString: [
                "DefaultTrackedBrush": ScanditCaptureCoreDefaults.BrushDefaults.from(
                    BarcodeSelectionBasicOverlay.defaultTrackedBrush(forStyle: .dot)
                ),
                "DefaultAimedBrush": ScanditCaptureCoreDefaults.BrushDefaults.from(
                    BarcodeSelectionBasicOverlay.defaultAimedBrush(forStyle: .dot)
                ),
                "DefaultSelectedBrush": ScanditCaptureCoreDefaults.BrushDefaults.from(
                    BarcodeSelectionBasicOverlay.defaultSelectedBrush(forStyle: .dot)
                ),
                "DefaultSelectingBrush": ScanditCaptureCoreDefaults.BrushDefaults.from(
                    BarcodeSelectionBasicOverlay.defaultSelectingBrush(forStyle: .dot)
                ),
            ],
            BarcodeSelectionBasicOverlayStyle.frame.jsonString: [
                "DefaultTrackedBrush": ScanditCaptureCoreDefaults.BrushDefaults.from(
                    BarcodeSelectionBasicOverlay.defaultTrackedBrush(forStyle: .frame)
                ),
                "DefaultAimedBrush": ScanditCaptureCoreDefaults.BrushDefaults.from(
                    BarcodeSelectionBasicOverlay.defaultAimedBrush(forStyle: .frame)
                ),
                "DefaultSelectedBrush": ScanditCaptureCoreDefaults.BrushDefaults.from(
                    BarcodeSelectionBasicOverlay.defaultSelectedBrush(forStyle: .frame)
                ),
                "DefaultSelectingBrush": ScanditCaptureCoreDefaults.BrushDefaults.from(
                    BarcodeSelectionBasicOverlay.defaultSelectingBrush(forStyle: .frame)
                ),
            ]
        ]
    }
}

extension ScanditBarcodeCaptureDefaults.BarcodeCaptureSettingsDefaults {
    init() {
        let settings = BarcodeCaptureSettings()
        codeDuplicateFilter = Int(settings.codeDuplicateFilter * 1000)
    }
}

extension ScanditBarcodeCaptureDefaults.SparkCaptureSettingsDefaults {
    init() {
        let settings = SparkCaptureSettings()
        codeDuplicateFilter = Int(settings.codeDuplicateFilter * 1000)
        locationSelection = settings.locationSelection?.jsonString
    }
}

extension ScanditBarcodeCaptureDefaults.BarcodeSelectionSettingsDefaults {
    init() {
        let settings = BarcodeSelectionSettings()
        codeDuplicateFilter = Int(settings.codeDuplicateFilter * 1000)
        singleBarcodeAutoDetection = settings.singleBarcodeAutoDetection
        selectionType = settings.selectionType.jsonString
    }
}

extension ScanditBarcodeCaptureDefaults.BarcodeSelectionTapSelectionDefaults {
    init() {
        let tapSelection = BarcodeSelectionTapSelection()
        defaultTapBehaviour = tapSelection.tapBehavior.jsonString
        defaultFreezeBehaviour = tapSelection.freezeBehavior.jsonString
    }
}

extension ScanditBarcodeCaptureDefaults.BarcodeSelectionAimerSelectionDefaults {
    init() {
        defaultSelectionStrategy = BarcodeSelectionAimerSelection().selectionStrategy.jsonString
    }
}

extension ScanditBarcodeCaptureDefaults.SymbologySettingsDefaults {
    static func fromDefaultSettings() -> ScanditBarcodeCaptureDefaults.SymbologySettingsDefaults {
        let settings = BarcodeCaptureSettings()
        return SymbologyDescription.all.reduce(
            into: [String: String](), {(result, symbologyDescription) in
                let symbology = SymbologyDescription.symbology(fromIdentifier: symbologyDescription.identifier)
                let settings = settings.settings(for: symbology)
                result[symbologyDescription.identifier] = settings.jsonString
            })
    }
}
