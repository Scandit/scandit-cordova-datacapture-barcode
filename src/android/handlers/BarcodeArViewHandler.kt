/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2025- Scandit AG. All rights reserved.
 */

package com.scandit.datacapture.cordova.barcode.handlers

import android.app.Activity
import android.graphics.Color
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.annotation.UiThread
import androidx.appcompat.app.AppCompatActivity
import com.scandit.datacapture.cordova.core.data.ResizeAndMoveInfo
import com.scandit.datacapture.cordova.core.utils.pxFromDp
import com.scandit.datacapture.cordova.core.utils.removeFromParent
import com.scandit.datacapture.frameworks.core.utils.DefaultMainThread
import com.scandit.datacapture.frameworks.core.utils.MainThread
import java.lang.ref.WeakReference
import java.util.concurrent.ConcurrentHashMap

class BarcodeArViewHandler(
    private val mainThread: MainThread = DefaultMainThread.getInstance()
) {
    private val containers: MutableMap<Int, WeakReference<FrameLayout>> = ConcurrentHashMap()
    private val containerVisibility: MutableMap<Int, Boolean> = ConcurrentHashMap()

    // Single ResizeAndMoveInfo for the handler (not per-view, matching iOS)
    private var resizeInfo: ResizeAndMoveInfo = ResizeAndMoveInfo(
        top = 0f,
        left = 0f,
        width = 0f,
        height = 0f,
        shouldBeUnderWebView = false
    )

    private var webViewReference: WeakReference<View>? = null
    private var activityRef: WeakReference<AppCompatActivity>? = null

    private val webView: View?
        get() = webViewReference?.get()

    fun prepareContainer(): FrameLayout {
        return FrameLayout(
            this.activityRef?.get()
                ?: error("Plugin not initialized")
        )
    }

    fun addBarcodeArViewContainer(viewId: Int, container: FrameLayout) {
        if (containers.containsKey(viewId)) {
            val existingContainer = containers.remove(viewId)?.get()
            if (existingContainer != null) {
                removeView(existingContainer)
            }
        }

        containers[viewId] = WeakReference(container)
        containerVisibility[viewId] = true

        addContainer(
            viewId,
            container,
            activityRef?.get()
                ?: error("Plugin not initialized")
        )
    }

    fun attachWebView(webView: View, activity: AppCompatActivity) {
        if (this.webView != webView) {
            webViewReference = WeakReference(webView)
            activityRef = WeakReference(activity)
            mainThread.runOnMainThread {
                webView.bringToFront()
                webView.setBackgroundColor(Color.TRANSPARENT)
            }
        }
    }

    fun setResizeAndMoveInfo(info: ResizeAndMoveInfo) {
        resizeInfo = info
        mainThread.runOnMainThread {
            // Re-render all containers with the new info
            containers.forEach { (viewId, containerRef) ->
                containerRef.get()?.let { container ->
                    renderNoAnimate(
                        container,
                        containerVisibility[viewId] == true
                    )
                }
            }
        }
    }

    fun disposeContainer(viewId: Int) {
        mainThread.runOnMainThread {
            containers.remove(viewId)?.get()?.also {
                removeView(it)
            }
        }

        containerVisibility.remove(viewId)

        if (containers.isEmpty()) {
            mainThread.runOnMainThread {
                setWebViewVisible()
            }
        }
    }

    private fun addContainer(
        viewId: Int,
        container: FrameLayout,
        activity: Activity
    ) {
        mainThread.runOnMainThread {
            activity.addContentView(
                container,
                ViewGroup.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.MATCH_PARENT
                )
            )
            renderNoAnimate(container, containerVisibility[viewId] == true)
        }
    }

    private fun removeView(view: View) {
        mainThread.runOnMainThread {
            view.removeFromParent()
        }
    }

    @UiThread
    private fun renderNoAnimate(container: FrameLayout, isVisible: Boolean) {
        container.post {
            container.visibility = if (isVisible) View.VISIBLE else View.GONE
            container.x = resizeInfo.left.pxFromDp()
            container.y = resizeInfo.top.pxFromDp()
            container.layoutParams.apply {
                // If width/height are 0, use MATCH_PARENT for full screen
                width = if (resizeInfo.width == 0f) {
                    ViewGroup.LayoutParams.MATCH_PARENT
                } else {
                    resizeInfo.width.pxFromDp().toInt()
                }
                height = if (resizeInfo.height == 0f) {
                    ViewGroup.LayoutParams.MATCH_PARENT
                } else {
                    resizeInfo.height.pxFromDp().toInt()
                }
            }

            if (resizeInfo.shouldBeUnderWebView) {
                webView?.bringToFront()
                (webView?.parent as? View)?.translationZ = 1F
            } else {
                container.bringToFront()
                (webView?.parent as? View)?.translationZ = -1F
            }
            container.requestLayout()
        }
    }

    private fun setWebViewVisible() {
        webView?.bringToFront()
        (webView?.parent as View).translationZ = 1F
    }

    fun disposeAll() {
        mainThread.runOnMainThread {
            for (viewId in containers.keys) {
                disposeContainer(viewId)
            }

            webViewReference = null
        }
    }
}
