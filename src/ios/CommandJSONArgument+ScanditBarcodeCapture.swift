import ScanditCaptureCore

struct BrushAndTrackedBarcodeJSON: CommandJSONArgument {
    enum CodingKeys: String, CodingKey {
        case trackedBarcodeIdentifier
        case sessionFrameSequenceID
        case brushJSONString = "brush"
    }

    let brushJSONString: String?
    let trackedBarcodeIdentifier: String
    let sessionFrameSequenceID: String?

    var brush: Brush? {
        guard let jsonString = brushJSONString else {
            return nil
        }

        return Brush(jsonString: jsonString)
    }
}

struct ViewAndTrackedBarcodeJSON: CommandJSONArgument {
    let viewJson: TrackedBarcodeView.JSON?
    let trackedBarcodeIdentifier: Int?
    let sessionFrameSequenceID: Int?
    let dataCaptureViewId: Int?
}

struct AnchorAndTrackedBarcodeJSON: CommandJSONArgument {
    let anchor: String?
    let trackedBarcodeIdentifier: String
    let sessionFrameSequenceID: String?
}

struct OffsetAndTrackedBarcodeJSON: CommandJSONArgument {
    let offset: String?
    let trackedBarcodeID: String
    let sessionFrameSequenceID: String?
}
