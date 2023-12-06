import ScanditBarcodeCapture

fileprivate extension Brush {
    var asDefaults: ScanditCaptureCoreDefaults.BrushDefaults {
        return ScanditCaptureCoreDefaults.BrushDefaults.from(self)
    }
}

// MARK: - Barcode Capture overlays with styles explicitly set.
fileprivate extension BarcodeCaptureOverlay {
    static var defaultStyle: BarcodeCaptureOverlayStyle {
        return BarcodeCaptureOverlayStyle.legacy
    }
}

fileprivate extension BarcodeTrackingBasicOverlay {
    static var defaultStyle: BarcodeTrackingBasicOverlayStyle {
        return BarcodeTrackingBasicOverlayStyle.legacy
    }
}

fileprivate extension BarcodeSelectionBasicOverlay {
    static var defaultStyle: BarcodeSelectionBasicOverlayStyle {
        return BarcodeSelectionBasicOverlayStyle.frame
    }
}

struct ScanditBarcodeCaptureDefaults: Encodable {
    typealias CameraSettingsDefaults = ScanditCaptureCoreDefaults.CameraSettingsDefaults

    struct BarcodeCaptureOverlayDefaults: Encodable {
        let defaultStyle: String
        let defaultBrush: ScanditCaptureCoreDefaults.BrushDefaults
        let styles: [String: [String: ScanditCaptureCoreDefaults.BrushDefaults]]

        enum CodingKeys: String, CodingKey {
            case defaultStyle
            case defaultBrush = "DefaultBrush"
            case styles
        }
    }

    struct BarcodeTrackingBasicOverlayDefaults: Encodable {
        let defaultStyle: String
        let defaultBrush: ScanditCaptureCoreDefaults.BrushDefaults
        let styles: [String: [String: ScanditCaptureCoreDefaults.BrushDefaults]]

        enum CodingKeys: String, CodingKey {
            case defaultStyle
            case defaultBrush = "DefaultBrush"
            case styles
        }
    }

    struct BarcodeSelectionBasicOverlayDefaults: Encodable {
        let defaultStyle: String
        let defaultTrackedBrush: ScanditCaptureCoreDefaults.BrushDefaults
        let defaultAimedBrush: ScanditCaptureCoreDefaults.BrushDefaults
        let defaultSelectedBrush: ScanditCaptureCoreDefaults.BrushDefaults
        let defaultSelectingBrush: ScanditCaptureCoreDefaults.BrushDefaults
        let styles: [String: [String: ScanditCaptureCoreDefaults.BrushDefaults]]

        enum CodingKeys: String, CodingKey {
            case defaultStyle
            case defaultTrackedBrush = "DefaultTrackedBrush"
            case defaultAimedBrush = "DefaultAimedBrush"
            case defaultSelectedBrush = "DefaultSelectedBrush"
            case defaultSelectingBrush = "DefaultSelectingBrush"
            case styles
        }
    }

    struct BarcodeCaptureSettingsDefaults: Encodable {
        let codeDuplicateFilter: Int
    }

    struct BarcodeSelectionSettingsDefaults: Encodable {
        let codeDuplicateFilter: Int
        let singleBarcodeAutoDetection: Bool
        let selectionType: String
    }

    struct BarcodeSelectionTapSelectionDefaults: Encodable {
        let defaultFreezeBehaviour: String
        let defaultTapBehaviour: String
    }

    struct BarcodeSelectionAimerSelectionDefaults: Encodable {
        let defaultSelectionStrategy: String
    }

    struct BarcodeCaptureDefaultsContainer: Encodable {
        let barcodeCaptureOverlay: BarcodeCaptureOverlayDefaults
        let barcodeCaptureSettings: BarcodeCaptureSettingsDefaults
        let recommendedCameraSettings: CameraSettingsDefaults

        enum CodingKeys: String, CodingKey {
            case barcodeCaptureOverlay = "BarcodeCaptureOverlay"
            case barcodeCaptureSettings = "BarcodeCaptureSettings"
            case recommendedCameraSettings = "RecommendedCameraSettings"
        }
    }

    struct BarcodeTrackingDefaultsContainer: Encodable {
        let barcodeTrackingBasicOverlay: BarcodeTrackingBasicOverlayDefaults
        let recommendedCameraSettings: CameraSettingsDefaults

        enum CodingKeys: String, CodingKey {
            case barcodeTrackingBasicOverlay = "BarcodeTrackingBasicOverlay"
            case recommendedCameraSettings = "RecommendedCameraSettings"
        }
    }

    struct BarcodeSelectionDefaultsContainer: Encodable {
        let recommendedCameraSettings: CameraSettingsDefaults
        let feedback: String
        let barcodeSelectionSettings: BarcodeSelectionSettingsDefaults
        let barcodeSelectionTapSelection: BarcodeSelectionTapSelectionDefaults
        let barcodeSelectionAimerSelection: BarcodeSelectionAimerSelectionDefaults
        let barcodeSelectionBasicOverlay: BarcodeSelectionBasicOverlayDefaults

        enum CodingKeys: String, CodingKey {
            case recommendedCameraSettings = "RecommendedCameraSettings"
            case feedback
            case barcodeSelectionSettings = "BarcodeSelectionSettings"
            case barcodeSelectionTapSelection = "BarcodeSelectionTapSelection"
            case barcodeSelectionAimerSelection = "BarcodeSelectionAimerSelection"
            case barcodeSelectionBasicOverlay = "BarcodeSelectionBasicOverlay"
        }
    }

    typealias SymbologySettingsDefaults = [String: String]
    typealias SymbologyDescriptionsDefaults = [String]
    typealias CompositeTypeDescriptionsDefaults = [String]

    let barcodeCapture: BarcodeCaptureDefaultsContainer
    let barcodeTracking: BarcodeTrackingDefaultsContainer
    let barcodeSelection: BarcodeSelectionDefaultsContainer
    let symbologySettings: SymbologySettingsDefaults
    let symbologyDescriptions: SymbologyDescriptionsDefaults
    let compositeTypeDescriptions: CompositeTypeDescriptionsDefaults

    init() {
        self.barcodeCapture = BarcodeCaptureDefaultsContainer()
        self.barcodeTracking = BarcodeTrackingDefaultsContainer()
        self.barcodeSelection = BarcodeSelectionDefaultsContainer()
        self.symbologySettings = SymbologySettingsDefaults.fromDefaultSettings()
        self.symbologyDescriptions = SymbologyDescription.all.map { $0.jsonString }
        self.compositeTypeDescriptions = CompositeTypeDescription.all.map { $0.jsonString }
    }

    enum CodingKeys: String, CodingKey {
        case barcodeCapture = "BarcodeCapture"
        case barcodeTracking = "BarcodeTracking"
        case barcodeSelection = "BarcodeSelection"
        case symbologySettings = "SymbologySettings"
        case symbologyDescriptions = "SymbologyDescriptions"
        case compositeTypeDescriptions = "CompositeTypeDescriptions"
    }
}

extension ScanditBarcodeCaptureDefaults.BarcodeCaptureDefaultsContainer {
    init() {
        barcodeCaptureOverlay = ScanditBarcodeCaptureDefaults.BarcodeCaptureOverlayDefaults()
        barcodeCaptureSettings = ScanditBarcodeCaptureDefaults.BarcodeCaptureSettingsDefaults()
        recommendedCameraSettings = ScanditCaptureCoreDefaults
            .CameraSettingsDefaults.from(BarcodeCapture.recommendedCameraSettings)
    }
}

extension ScanditBarcodeCaptureDefaults.BarcodeTrackingDefaultsContainer {
    init() {
        barcodeTrackingBasicOverlay = ScanditBarcodeCaptureDefaults.BarcodeTrackingBasicOverlayDefaults()
        recommendedCameraSettings = ScanditCaptureCoreDefaults
            .CameraSettingsDefaults.from(BarcodeTracking.recommendedCameraSettings)
    }
}

extension ScanditBarcodeCaptureDefaults.BarcodeSelectionDefaultsContainer {
    init() {
        recommendedCameraSettings = ScanditCaptureCoreDefaults
            .CameraSettingsDefaults.from(BarcodeSelection.recommendedCameraSettings)
        feedback = BarcodeSelectionFeedback.default.jsonString
        barcodeSelectionSettings = ScanditBarcodeCaptureDefaults.BarcodeSelectionSettingsDefaults()
        barcodeSelectionTapSelection = ScanditBarcodeCaptureDefaults.BarcodeSelectionTapSelectionDefaults()
        barcodeSelectionAimerSelection = ScanditBarcodeCaptureDefaults.BarcodeSelectionAimerSelectionDefaults()
        barcodeSelectionBasicOverlay = ScanditBarcodeCaptureDefaults.BarcodeSelectionBasicOverlayDefaults()
    }
}

extension ScanditBarcodeCaptureDefaults.BarcodeCaptureOverlayDefaults {
    init() {
        let style = BarcodeCaptureOverlay.defaultStyle
        defaultBrush = BarcodeCaptureOverlay.defaultBrush(forStyle: style).asDefaults
        defaultStyle = style.jsonString
        styles = [
            BarcodeCaptureOverlayStyle.legacy.jsonString: [
                "DefaultBrush": BarcodeCaptureOverlay.defaultBrush(forStyle: BarcodeCaptureOverlayStyle.legacy).asDefaults
            ],
            BarcodeCaptureOverlayStyle.frame.jsonString: [
                "DefaultBrush": BarcodeCaptureOverlay.defaultBrush(forStyle: BarcodeCaptureOverlayStyle.frame).asDefaults
            ]
        ]
    }
}

extension ScanditBarcodeCaptureDefaults.BarcodeTrackingBasicOverlayDefaults {
    init() {
        let style = BarcodeTrackingBasicOverlay.defaultStyle
        defaultBrush = BarcodeTrackingBasicOverlay.defaultBrush(forStyle: style).asDefaults
        defaultStyle = style.jsonString
        styles = [
            BarcodeTrackingBasicOverlayStyle.legacy.jsonString: [
                "DefaultBrush":  BarcodeTrackingBasicOverlay.defaultBrush(forStyle: BarcodeTrackingBasicOverlayStyle.legacy).asDefaults
            ],
            BarcodeTrackingBasicOverlayStyle.frame.jsonString: [
                "DefaultBrush": BarcodeTrackingBasicOverlay.defaultBrush(forStyle: BarcodeTrackingBasicOverlayStyle.frame).asDefaults
            ],
            BarcodeTrackingBasicOverlayStyle.dot.jsonString: [
                "DefaultBrush": BarcodeTrackingBasicOverlay.defaultBrush(forStyle: BarcodeTrackingBasicOverlayStyle.dot).asDefaults
            ]
        ]
    }
}

extension ScanditBarcodeCaptureDefaults.BarcodeSelectionBasicOverlayDefaults {

    init() {
        defaultTrackedBrush = BarcodeSelectionBasicOverlay.defaultTrackedBrush(forStyle: BarcodeSelectionBasicOverlay.defaultStyle).asDefaults
        defaultAimedBrush = BarcodeSelectionBasicOverlay.defaultAimedBrush(forStyle: BarcodeSelectionBasicOverlay.defaultStyle).asDefaults
        defaultSelectedBrush = BarcodeSelectionBasicOverlay.defaultSelectedBrush(forStyle: BarcodeSelectionBasicOverlay.defaultStyle).asDefaults
        defaultSelectingBrush = BarcodeSelectionBasicOverlay.defaultSelectingBrush(forStyle: BarcodeSelectionBasicOverlay.defaultStyle).asDefaults
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
                let settings = settings.settings(for: symbologyDescription.symbology)
                result[symbologyDescription.identifier] = settings.jsonString
            })
    }
}
