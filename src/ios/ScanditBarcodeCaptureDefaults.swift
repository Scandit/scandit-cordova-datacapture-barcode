import ScanditBarcodeCapture

struct ScanditBarcodeCaptureDefaults: Encodable {
    typealias CameraSettingsDefaults = ScanditCaptureCoreDefaults.CameraSettingsDefaults

    struct BarcodeCaptureOverlayDefaults: Encodable {
        let DefaultBrush: ScanditCaptureCoreDefaults.BrushDefaults
    }

    struct BarcodeTrackingBasicOverlayDefaults: Encodable {
        let DefaultBrush: ScanditCaptureCoreDefaults.BrushDefaults
    }

    struct BarcodeCaptureSettingsDefaults: Encodable {
        let codeDuplicateFilter: Int
    }

    struct SparkCaptureSettingsDefaults: Encodable {
        let codeDuplicateFilter: Int
        let locationSelection: String?
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

    struct SparkCaptureDefaultsContainer: Encodable {
        let feedback: String
        let SparkCaptureSettings: SparkCaptureSettingsDefaults
    }

    typealias SymbologySettingsDefaults = [String: String]
    typealias SymbologyDescriptionsDefaults = [String]
    typealias CompositeTypeDescriptionsDefaults = [String]

    let BarcodeCapture: BarcodeCaptureDefaultsContainer
    let BarcodeTracking: BarcodeTrackingDefaultsContainer
    let SparkCapture: SparkCaptureDefaultsContainer
    let SymbologySettings: SymbologySettingsDefaults
    let SymbologyDescriptions: SymbologyDescriptionsDefaults
    let CompositeTypeDescriptions: CompositeTypeDescriptionsDefaults

    init(barcodeCaptureSettings: BarcodeCaptureSettings,
         sparkCaptureSettings: SparkCaptureSettings,
         overlay: BarcodeCaptureOverlay,
         basicTrackingOverlay: BarcodeTrackingBasicOverlay) {
        self.BarcodeCapture = BarcodeCaptureDefaultsContainer.from(barcodeCaptureSettings, overlay)
        self.BarcodeTracking = BarcodeTrackingDefaultsContainer.from(basicTrackingOverlay)
        self.SparkCapture = SparkCaptureDefaultsContainer.from(sparkCaptureSettings)
        self.SymbologySettings = SymbologySettingsDefaults.from(barcodeCaptureSettings)
        self.SymbologyDescriptions = SymbologyDescription.all.map { $0.jsonString }
        self.CompositeTypeDescriptions = CompositeTypeDescription.all.map { $0.jsonString }
    }
}

extension ScanditBarcodeCaptureDefaults.BarcodeCaptureDefaultsContainer {
    static func from(_ settings: BarcodeCaptureSettings, _ overlay: BarcodeCaptureOverlay)
    -> ScanditBarcodeCaptureDefaults.BarcodeCaptureDefaultsContainer {
        let barcodeCaptureOverlay = ScanditBarcodeCaptureDefaults.BarcodeCaptureOverlayDefaults.from(overlay)
        let barcodeCaptureSettings = ScanditBarcodeCaptureDefaults.BarcodeCaptureSettingsDefaults.from(settings)
        let cameraSettings = ScanditCaptureCoreDefaults
            .CameraSettingsDefaults.from(BarcodeCapture.recommendedCameraSettings)
        return ScanditBarcodeCaptureDefaults
            .BarcodeCaptureDefaultsContainer(BarcodeCaptureOverlay: barcodeCaptureOverlay,
                                             BarcodeCaptureSettings: barcodeCaptureSettings,
                                             RecommendedCameraSettings: cameraSettings)
    }
}

extension ScanditBarcodeCaptureDefaults.BarcodeTrackingDefaultsContainer {
    static func from(_ basicOverlay: BarcodeTrackingBasicOverlay)
    -> ScanditBarcodeCaptureDefaults.BarcodeTrackingDefaultsContainer {
        let barcodeTrackingOverlay = ScanditBarcodeCaptureDefaults
            .BarcodeTrackingBasicOverlayDefaults.from(basicOverlay)
        let cameraSettings = ScanditCaptureCoreDefaults
            .CameraSettingsDefaults.from(BarcodeTracking.recommendedCameraSettings)
        return ScanditBarcodeCaptureDefaults.BarcodeTrackingDefaultsContainer(
            BarcodeTrackingBasicOverlay: barcodeTrackingOverlay, RecommendedCameraSettings: cameraSettings)
    }
}

extension ScanditBarcodeCaptureDefaults.SparkCaptureDefaultsContainer {
    static func from(_ settings: SparkCaptureSettings)
    -> ScanditBarcodeCaptureDefaults.SparkCaptureDefaultsContainer {
        let sparkCaptureSettings = ScanditBarcodeCaptureDefaults.SparkCaptureSettingsDefaults.from(settings)
        return ScanditBarcodeCaptureDefaults
            .SparkCaptureDefaultsContainer(feedback: SparkCaptureFeedback.default.jsonString,
                                           SparkCaptureSettings: sparkCaptureSettings)
    }
}

extension ScanditBarcodeCaptureDefaults.BarcodeCaptureOverlayDefaults {
    static func from(_ overlay: BarcodeCaptureOverlay)
    -> ScanditBarcodeCaptureDefaults.BarcodeCaptureOverlayDefaults {
        let brush = ScanditCaptureCoreDefaults.BrushDefaults.from(BarcodeCaptureOverlay.defaultBrush)
        return ScanditBarcodeCaptureDefaults.BarcodeCaptureOverlayDefaults(DefaultBrush: brush)
    }
}

extension ScanditBarcodeCaptureDefaults.BarcodeTrackingBasicOverlayDefaults {
    static func from(_ basicOverlay: BarcodeTrackingBasicOverlay)
    -> ScanditBarcodeCaptureDefaults.BarcodeTrackingBasicOverlayDefaults {
        let brush = ScanditCaptureCoreDefaults.BrushDefaults.from(BarcodeTrackingBasicOverlay.defaultBrush)
        return ScanditBarcodeCaptureDefaults.BarcodeTrackingBasicOverlayDefaults(DefaultBrush: brush)
    }
}

extension ScanditBarcodeCaptureDefaults.BarcodeCaptureSettingsDefaults {
    static func from(_ settings: BarcodeCaptureSettings) ->
    ScanditBarcodeCaptureDefaults.BarcodeCaptureSettingsDefaults {
        return ScanditBarcodeCaptureDefaults
            .BarcodeCaptureSettingsDefaults(codeDuplicateFilter: Int(settings.codeDuplicateFilter * 1000))
    }
}

extension ScanditBarcodeCaptureDefaults.SparkCaptureSettingsDefaults {
    static func from(_ settings: SparkCaptureSettings) ->
    ScanditBarcodeCaptureDefaults.SparkCaptureSettingsDefaults {
        return ScanditBarcodeCaptureDefaults
            .SparkCaptureSettingsDefaults(codeDuplicateFilter: Int(settings.codeDuplicateFilter * 1000),
                                          locationSelection: settings.locationSelection?.jsonString)
    }
}

extension ScanditBarcodeCaptureDefaults.SymbologySettingsDefaults {
    static func from(_ settings: BarcodeCaptureSettings) -> ScanditBarcodeCaptureDefaults.SymbologySettingsDefaults {
        return SymbologyDescription.all.reduce(
            into: [String: String](), {(result, symbologyDescription) in
                let symbology = SymbologyDescription.symbology(fromIdentifier: symbologyDescription.identifier)
                let settings = settings.settings(for: symbology)
                result[symbologyDescription.identifier] = settings.jsonString
            })
    }
}
