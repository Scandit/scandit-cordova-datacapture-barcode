import ScanditBarcodeCapture

extension ScanditBarcodeCapture: BarcodeTrackingDeserializerDelegate {
    func barcodeTrackingDeserializer(_ deserializer: BarcodeTrackingDeserializer,
                                     didFinishDeserializingMode mode: BarcodeTracking,
                                     from jsonValue: JSONValue) {
        let JSONString = jsonValue.jsonString()

        guard let data = JSONString.data(using: .utf8),
            let jsonObject = try? JSONSerialization.jsonObject(with: data),
            let json = jsonObject as? [String: Any],
            let enabled = json["enabled"] as? Bool else {
                return
        }
        mode.isEnabled = enabled

        mode.addListener(self)
    }

    func barcodeTrackingDeserializer(_ deserializer: BarcodeTrackingDeserializer,
                                     didStartDeserializingMode mode: BarcodeTracking,
                                     from jsonValue: JSONValue) {
        // Empty on purpose
    }

    func barcodeTrackingDeserializer(_ deserializer: BarcodeTrackingDeserializer,
                                     didStartDeserializingSettings settings: BarcodeTrackingSettings,
                                     from jsonValue: JSONValue) {
        // Empty on purpose
    }

    func barcodeTrackingDeserializer(_ deserializer: BarcodeTrackingDeserializer,
                                     didFinishDeserializingSettings settings: BarcodeTrackingSettings,
                                     from jsonValue: JSONValue) {
        // Empty on purpose
    }

    func barcodeTrackingDeserializer(_ deserializer: BarcodeTrackingDeserializer,
                                     didStartDeserializingBasicOverlay overlay: BarcodeTrackingBasicOverlay,
                                     from jsonValue: JSONValue) {
        callbackLocks.releaseAll()

        overlay.delegate = self
        barcodeTrackingBasicOverlay = overlay
    }

    func barcodeTrackingDeserializer(_ deserializer: BarcodeTrackingDeserializer,
                                     didFinishDeserializingBasicOverlay overlay: BarcodeTrackingBasicOverlay,
                                     from jsonValue: JSONValue) {
        // Empty on purpose
    }

    func barcodeTrackingDeserializer(_ deserializer: BarcodeTrackingDeserializer,
                                     didStartDeserializingAdvancedOverlay overlay: BarcodeTrackingAdvancedOverlay,
                                     from jsonValue: JSONValue) {
        callbackLocks.releaseAll()

        overlay.delegate = self
        barcodeTrackingAdvancedOverlay = overlay
    }

    func barcodeTrackingDeserializer(_ deserializer: BarcodeTrackingDeserializer,
                                     didFinishDeserializingAdvancedOverlay overlay: BarcodeTrackingAdvancedOverlay,
                                     from jsonValue: JSONValue) {
        // Empty on purpose
    }
}
