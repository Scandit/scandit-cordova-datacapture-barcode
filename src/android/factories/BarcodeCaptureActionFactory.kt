/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2019- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.barcode.factories

import com.scandit.datacapture.cordova.barcode.actions.*
import com.scandit.datacapture.cordova.core.actions.Action
import com.scandit.datacapture.cordova.core.errors.InvalidActionNameError
import com.scandit.datacapture.cordova.core.factories.ActionFactory
import com.scandit.datacapture.cordova.core.utils.CordovaEventEmitter
import com.scandit.datacapture.frameworks.barcode.BarcodeModule
import com.scandit.datacapture.frameworks.barcode.capture.BarcodeCaptureModule
import com.scandit.datacapture.frameworks.barcode.selection.BarcodeSelectionModule
import com.scandit.datacapture.frameworks.barcode.tracking.BarcodeTrackingModule

class BarcodeCaptureActionFactory(
    private val barcodeModule: BarcodeModule,
    private val barcodeCaptureModule: BarcodeCaptureModule,
    private val barcodeTrackingModule: BarcodeTrackingModule,
    private val barcodeSelectionModule: BarcodeSelectionModule,
    private val eventEmitter: CordovaEventEmitter
) : ActionFactory {

    private val availableActions: Map<String, Action> by lazy {
        mapOf(
            INJECT_DEFAULTS to createActionInjectDefaults(),
            SUBSCRIBE_BARCODE_CAPTURE to createActionSubscribeBarcodeCapture(),
            SUBSCRIBE_BARCODE_TRACKING to createActionSubscribeBarcodeTracking(),
            SUBSCRIBE_BARCODE_SELECTION to createActionSubscribeBarcodeSelection(),
            ACTION_GET_COUNT_FOR_BARCODE_IN_BARCODE_SELECTION_SESSION to
                createActionGetCountForBarcodeInBarcodeSelectionSession(),
            ACTION_RESET_BARCODE_CAPTURE_SESSION to createActionResetBarcodeCaptureSession(),
            ACTION_RESET_BARCODE_TRACKING_SESSION to createActionResetBarcodeTrackingSession(),
            ACTION_RESET_BARCODE_SELECTION_SESSION to createActionResetBarcodeSelectionSession(),
            ACTION_RESET_BARCODE_SELECTION to createActionResetBarcodeSelection(),
            ACTION_UNFREEZE_CAMERA_IN_BARCODE_SELECTION to
                createActionUnfreezeCameraInBarcodeSelection(),
            SUBSCRIBE_BASIC_OVERLAY_LISTENER to createActionSubscribeBasicOverlay(),
            SUBSCRIBE_ADVANCED_OVERLAY_LISTENER to createActionSubscribeAdvancedOverlay(),
            SET_BRUSH_FOR_TRACKED_BARCODE to createActionSetBrushForTrackedBarcode(),
            CLEAR_TRACKED_BARCODE_BRUSHES to createActionClearTrackedBarcodeBrushes(),
            SET_VIEW_FOR_TRACKED_BARCODE to createActionSetViewForTrackedBarcode(),
            SET_OFFSET_FOR_TRACKED_BARCODE to createActionSetOffsetForTrackedBarcode(),
            SET_ANCHOR_FOR_TRACKED_BARCODE to createActionSetAnchorForTrackedBarcode(),
            CLEAR_TRACKED_BARCODE_VIEWS to createActionClearTrackedBarcodeViews(),

            FINISH_BARCODE_CAPTURE_DID_UPDATE_SESSION to ActionFinishBarcodeCaptureSessionUpdate(
                barcodeCaptureModule
            ),
            FINISH_BARCODE_CAPTURE_DID_CAPTURE to ActionFinishBarcodeCaptureDidScan(
                barcodeCaptureModule
            ),
            FINISH_BARCODE_SELECTION_DID_UPDATE_SELECTION to
                ActionFinishBarcodeSelectionDidUpdateSelection(barcodeSelectionModule),
            FINISH_BARCODE_SELECTION_DID_UPDATE_SESSION to
                ActionFinishBarcodeSelectionDidUpdateSession(barcodeSelectionModule),
            FINISH_BARCODE_TRACKING_DID_UPDATE_SESSION to
                ActionFinishBarcodeTrackingDidUpdateSession(barcodeTrackingModule),
        )
    }

    @Throws(InvalidActionNameError::class)
    override fun provideAction(actionName: String): Action =
        availableActions[actionName] ?: throw InvalidActionNameError(actionName)

    override fun canBeRunWithoutCameraPermission(actionName: String): Boolean = true

    private fun createActionInjectDefaults(): Action = ActionInjectDefaults(
        barcodeModule, barcodeCaptureModule, barcodeTrackingModule, barcodeSelectionModule
    )

    private fun createActionSubscribeBarcodeCapture(): Action = ActionSubscribeBarcodeCapture(
        barcodeCaptureModule, eventEmitter
    )

    private fun createActionSubscribeBarcodeTracking(): Action = ActionSubscribeBarcodeTracking(
        barcodeTrackingModule, eventEmitter
    )

    private fun createActionSubscribeBarcodeSelection(): Action = ActionSubscribeBarcodeSelection(
        barcodeSelectionModule, eventEmitter
    )

    private fun createActionSubscribeBasicOverlay(): Action = ActionSubscribeBasicOverlay(
        barcodeTrackingModule, eventEmitter
    )

    private fun createActionSubscribeAdvancedOverlay(): Action = ActionSubscribeAdvancedOverlay(
        barcodeTrackingModule, eventEmitter
    )

    private fun createActionSetBrushForTrackedBarcode(): Action = ActionSetBrushForTrackedBarcode(
        barcodeTrackingModule
    )

    private fun createActionClearTrackedBarcodeBrushes(): Action = ActionClearTrackedBarcodeBrushes(
        barcodeTrackingModule
    )

    private fun createActionSetViewForTrackedBarcode(): Action = ActionSetViewForTrackedBarcode(
        barcodeTrackingModule
    )

    private fun createActionSetOffsetForTrackedBarcode(): Action = ActionSetOffsetForTrackedBarcode(
        barcodeTrackingModule
    )

    private fun createActionSetAnchorForTrackedBarcode(): Action = ActionSetAnchorForTrackedBarcode(
        barcodeTrackingModule
    )

    private fun createActionClearTrackedBarcodeViews(): Action = ActionClearTrackedBarcodeViews(
        barcodeTrackingModule
    )

    private fun createActionResetBarcodeSelection(): Action = ActionResetBarcodeSelection(
        barcodeSelectionModule
    )

    private fun createActionGetCountForBarcodeInBarcodeSelectionSession(): Action =
        ActionGetCountForBarcodeInBarcodeSelectionSession(
            barcodeSelectionModule
        )

    private fun createActionResetBarcodeCaptureSession(): Action = ActionResetBarcodeCaptureSession(
        barcodeCaptureModule
    )

    private fun createActionResetBarcodeTrackingSession(): Action =
        ActionResetBarcodeTrackingSession(
            barcodeTrackingModule
        )

    private fun createActionResetBarcodeSelectionSession(): Action =
        ActionResetBarcodeSelectionSession(
            barcodeSelectionModule
        )

    private fun createActionUnfreezeCameraInBarcodeSelection(): Action =
        ActionUnfreezeCameraInBarcodeSelection(
            barcodeSelectionModule
        )

    companion object {
        private const val INJECT_DEFAULTS = "getDefaults"
        private const val SUBSCRIBE_BARCODE_CAPTURE = "subscribeBarcodeCaptureListener"
        private const val SUBSCRIBE_BARCODE_TRACKING = "subscribeBarcodeTrackingListener"
        private const val SUBSCRIBE_BARCODE_SELECTION = "subscribeBarcodeSelectionListener"

        private const val FINISH_BARCODE_CAPTURE_DID_UPDATE_SESSION =
            "finishBarcodeCaptureDidUpdateSession"
        private const val FINISH_BARCODE_CAPTURE_DID_CAPTURE = "finishBarcodeCaptureDidScan"

        private const val FINISH_BARCODE_SELECTION_DID_UPDATE_SELECTION =
            "finishBarcodeSelectionDidUpdateSelection"
        private const val FINISH_BARCODE_SELECTION_DID_UPDATE_SESSION =
            "finishBarcodeSelectionDidUpdateSession"

        private const val FINISH_BARCODE_TRACKING_DID_UPDATE_SESSION =
            "finishBarcodeTrackingDidUpdateSession"

        private const val SUBSCRIBE_BASIC_OVERLAY_LISTENER =
            "subscribeBarcodeTrackingBasicOverlayListener"
        private const val SET_BRUSH_FOR_TRACKED_BARCODE = "setBrushForTrackedBarcode"
        private const val CLEAR_TRACKED_BARCODE_BRUSHES = "clearTrackedBarcodeBrushes"

        private const val SUBSCRIBE_ADVANCED_OVERLAY_LISTENER =
            "subscribeBarcodeTrackingAdvancedOverlayListener"
        const val SET_VIEW_FOR_TRACKED_BARCODE = "setViewForTrackedBarcode"
        const val SET_OFFSET_FOR_TRACKED_BARCODE = "setOffsetForTrackedBarcode"
        const val SET_ANCHOR_FOR_TRACKED_BARCODE = "setAnchorForTrackedBarcode"
        const val CLEAR_TRACKED_BARCODE_VIEWS = "clearTrackedBarcodeViews"

        const val ACTION_GET_COUNT_FOR_BARCODE_IN_BARCODE_SELECTION_SESSION =
            "getCountForBarcodeInBarcodeSelectionSession"
        const val ACTION_RESET_BARCODE_CAPTURE_SESSION = "resetBarcodeCaptureSession"
        const val ACTION_RESET_BARCODE_TRACKING_SESSION = "resetBarcodeTrackingSession"
        const val ACTION_RESET_BARCODE_SELECTION_SESSION = "resetBarcodeSelectionSession"
        const val ACTION_RESET_BARCODE_SELECTION = "resetBarcodeSelection"
        const val ACTION_UNFREEZE_CAMERA_IN_BARCODE_SELECTION = "unfreezeCameraInBarcodeSelection"
    }
}
