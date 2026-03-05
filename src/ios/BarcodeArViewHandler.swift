/*
 * This file is part of the Scandit Data Capture SDK
 *
 * Copyright (C) 2025- Scandit AG. All rights reserved.
 */

import ScanditBarcodeCapture
import WebKit

class BarcodeArViewHandler {
    let webView: WKWebView

    var barcodeArView: BarcodeArView? {
        didSet {
            resetConstraints()
            update()
        }
    }

    var containerView: UIView?

    private var top: NSLayoutConstraint?
    private var left: NSLayoutConstraint?
    private var width: NSLayoutConstraint?
    private var height: NSLayoutConstraint?

    private var position = CGPoint.zero
    private var size = CGSize.zero
    private var shouldBeUnderWebView = false

    private var constraints: [NSLayoutConstraint] {
        [top, left, width, height].compactMap { $0 }
    }

    init(relativeTo webView: WKWebView) {
        self.webView = webView

    }

    func createContainerView() -> UIView {
        let containerView = UIView(frame: .zero)
        containerView.translatesAutoresizingMaskIntoConstraints = false

        self.containerView = containerView
        return containerView
    }

    /// Update the constraints that set the position and size of the capture view,
    /// based on a JSON passed in as the argument to a Cordova command.
    ///
    /// If the view does not exist yet, the position and size are stored and will be applied to the view
    /// when it's created (and the constraints object is updated with the new view).
    ///
    /// - Parameter positionAndSizeJSON: The JSON passed to the Cordova command
    func updatePositionAndSize(fromJSON positionAndSizeJSON: ViewPositionAndSizeJSON) {
        position = positionAndSizeJSON.position
        size = positionAndSizeJSON.size
        shouldBeUnderWebView = positionAndSizeJSON.shouldBeUnderWebView
        update()
    }

    private func update() {
        updateConstraints()
        updatePosition()
    }

    private func resetConstraints() {
        NSLayoutConstraint.deactivate(constraints)
        top = nil
        left = nil
        width = nil
        height = nil
    }

    private func updateConstraints() {
        guard let containerView = containerView
        else {
            assert(true, "barcodeArView or containerView is not set")
            return
        }

        let topConstant = position.y + webView.adjustedContentInset.top
        let leftConstant = position.x + webView.adjustedContentInset.left

        if let top = top {
            top.constant = topConstant
        } else {
            top = containerView.topAnchor.constraint(equalTo: webView.topAnchor, constant: topConstant)
            top?.isActive = true
        }

        if let left = left {
            left.constant = leftConstant
        } else {
            left = containerView.leadingAnchor.constraint(equalTo: webView.leadingAnchor, constant: leftConstant)
            left?.isActive = true
        }

        width?.isActive = false
        if size.width == 0 {
            // Default to full screen if width not set
            self.width = containerView.widthAnchor.constraint(equalTo: webView.widthAnchor)
        } else {
            self.width = containerView.widthAnchor.constraint(equalToConstant: size.width)
        }

        self.width?.isActive = true

        height?.isActive = false
        if size.height == 0 {
            self.height = containerView.heightAnchor.constraint(equalTo: webView.heightAnchor)
        } else {
            self.height = containerView.heightAnchor.constraint(equalToConstant: size.height)
        }
        self.height?.isActive = true

        containerView.superview?.layoutIfNeeded()
    }

    private func updatePosition() {
        guard let containerView = containerView
        else {
            assert(true, "containerView is not set")
            return
        }

        if shouldBeUnderWebView {
            #if swift(>=5.0)
            webView.sendSubviewToBack(containerView)
            #else
            webView.sendSubview(toBack: containerView)
            #endif
        } else {
            #if swift(>=5.0)
            webView.bringSubviewToFront(containerView)
            // barcodeArView.superview?.bringSubviewToFront(barcodeArView)
            #else
            webView.bringSubview(toFront: containerView)
            #endif
        }
    }
}
