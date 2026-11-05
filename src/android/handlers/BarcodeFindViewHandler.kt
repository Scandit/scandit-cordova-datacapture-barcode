/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2023- Scandit AG. All rights reserved.
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
import com.scandit.datacapture.cordova.core.utils.bringContainerToFront
import com.scandit.datacapture.cordova.core.utils.pxFromDp
import com.scandit.datacapture.cordova.core.utils.removeFromParent
import com.scandit.datacapture.frameworks.core.utils.DefaultMainThread
import com.scandit.datacapture.frameworks.core.utils.MainThread
import java.lang.ref.WeakReference
import java.util.concurrent.ConcurrentHashMap

class BarcodeFindViewHandler(
    private val mainThread: MainThread = DefaultMainThread.getInstance()
) {
    private val containers: MutableMap<Int, WeakReference<FrameLayout>> = ConcurrentHashMap()
    private val containerVisibility: MutableMap<Int, Boolean> = ConcurrentHashMap()
    private var latestInfo: ResizeAndMoveInfo = ResizeAndMoveInfo(0f, 0f, 600f, 600f, false)

    private var webViewReference: WeakReference<View>? = null
    private var activityRef: WeakReference<AppCompatActivity>? = null

    private val webView: View?
        get() = webViewReference?.get()

    fun setResizeAndMoveInfo(info: ResizeAndMoveInfo) {
        latestInfo = info
        render()
    }

    private fun render() {
        for ((viewId, containerRef) in containers) {
            containerRef.get()?.let { container ->
                val isVisible = containerVisibility[viewId] ?: true
                renderNoAnimate(container, isVisible)
            }
        }
    }

    fun prepareContainer(): FrameLayout {
        return FrameLayout(
            this.activityRef?.get()
                ?: error("Plugin not initialized")
        )
    }

    fun addBarcodeFindViewContainer(viewId: Int, container: FrameLayout) {
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
                // Bring the WebView's content-frame container to the front. On
                // cordova-android 15+ webView.bringToFront() alone is ineffective because
                // the WebView is wrapped in an intermediate rootLayout.
                webView.bringContainerToFront()
                webView.setBackgroundColor(Color.TRANSPARENT)
            }
        }
    }

    fun setVisible(viewId: Int) {
        mainThread.runOnMainThread {
            containerVisibility[viewId] = true
            renderNoAnimate(
                containers[viewId]?.get() ?: return@runOnMainThread,
                containerVisibility[viewId] == true
            )
        }
    }

    fun setInvisible(viewId: Int) {
        mainThread.runOnMainThread {
            containerVisibility[viewId] = false
            renderNoAnimate(
                containers[viewId]?.get() ?: return@runOnMainThread,
                containerVisibility[viewId] == true
            )
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

    fun disposeAll() {
        mainThread.runOnMainThread {
            for (viewId in containers.keys) {
                disposeContainer(viewId)
            }

            disposeCurrentWebView()
        }
    }

    private fun disposeCurrentWebView() {
        webViewReference = null
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
                    latestInfo.width.pxFromDp(activity).toInt(),
                    latestInfo.height.pxFromDp(activity).toInt()
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
            val context = container.context
            container.visibility = if (isVisible) View.VISIBLE else View.GONE
            container.x = latestInfo.left.pxFromDp(context)
            container.y = latestInfo.top.pxFromDp(context)
            container.layoutParams.apply {
                width = latestInfo.width.pxFromDp(context).toInt()
                height = latestInfo.height.pxFromDp(context).toInt()
            }

            if (latestInfo.shouldBeUnderWebView) {
                webView?.let {
                    it.bringToFront()
                    (it.parent as View).translationZ = 1F
                }
            } else {
                if (isVisible) {
                    container.bringToFront()
                    webView?.let {
                        (it.parent as View).translationZ = -1F
                    }
                } else {
                    setWebViewVisible()
                }
            }
            container.requestLayout()
        }
    }

    private fun setWebViewVisible() {
        webView?.bringToFront()
        (webView?.parent as View).translationZ = 1F
    }
}
