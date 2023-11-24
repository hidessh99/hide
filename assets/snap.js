!(function (e) {
    function t(i) {
        if (n[i]) return n[i].exports;
        var o = (n[i] = { i: i, l: !1, exports: {} });
        return e[i].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
    }
    var n = {};
    (t.m = e),
        (t.c = n),
        (t.i = function (e) {
            return e;
        }),
        (t.d = function (e, n, i) {
            t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: i });
        }),
        (t.n = function (e) {
            var n =
                e && e.__esModule
                    ? function () {
                          return e.default;
                      }
                    : function () {
                          return e;
                      };
            return t.d(n, "a", n), n;
        }),
        (t.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (t.p = ""),
        t((t.s = 2));
})([
    function (e, t, n) {
        "use strict";
        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }
        function o(e) {
            return (e.indexOf(w) > -1 || e.indexOf("veritrans.co.id") > -1) && (e.indexOf("snap.js") > -1 || e.indexOf("snap.min.js") > -1);
        }
        function r() {
            try {
                if (window.performance && window.performance.getEntries) {
                    for (var e = window.performance.getEntries(), t = null, n = 0; n < e.length; n++) {
                        if (o(e[n].name)) {
                            t = e[n];
                            break;
                        }
                    }
                    if (t) return t.duration;
                }
            } catch (e) {}
            return null;
        }
        function a(e, t, n, i) {
            return function () {
                if (-1 === n.indexOf(k)) throw new Error("snap." + e + " is not allowed to be called in this state. Invalid state transition from " + k + " to " + i);
                var o = t.apply(null, arguments);
                return (k = i), o;
            };
        }
        function s(e) {
            if (e.origin === w) {
                var t = e.data;
                switch (t.event) {
                    case "hide":
                        _.isVisible() && O.onClose && O.onClose(), P.hide();
                        break;
                    case "queryToken":
                        x && (_.postMessage({ event: "token", token: x, scriptLoadDuration: r(), snapPayStartedAt: E, options: l(O) }), _.show(), (k = v));
                        break;
                    case "deeplink":
                        var n = t.data;
                        n && window.location.replace(n);
                        break;
                    case "result":
                        var i = t.data,
                            o = String(i.status_code);
                        try {
                            
                        } catch (e) {
                            console.error(e);
                        }
                        P.hide();
                        break;
                    case "debug":
                        break;
                    default:
                        throw new Error("Invalid event data: " + t.event);
                }
            }
        }
        function d(e) {
            return function (t, n) {
                var i = void 0 === n ? "undefined" : f(n);
                if (e !== i) throw new Error(t + " should be of type " + e);
                return !0;
            };
        }
        function c(e, t) {
            if (!e) throw new Error(t + " is required");
        }
        function u(e) {
            for (var t in e)
                if (e.hasOwnProperty(t)) {
                    if (!S[t]) throw new Error("Unsupported option " + t);
                    var n = S[t];
                    n(t, e[t]);
                }
        }
        function l(e) {
            var t = {};
            for (var n in e) "function" != typeof e[n] && (t[n] = e[n]);
            return t;
        }
        var f =
                "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                    ? function (e) {
                          return typeof e;
                      }
                    : function (e) {
                          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                      },
            h = (function () {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n];
                        (i.enumerable = i.enumerable || !1), (i.configurable = !0), "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
                    }
                }
                return function (t, n, i) {
                    return n && e(t.prototype, n), i && e(t, i), t;
                };
            })(),
            p = n(1),
            y = (function (e) {
                return e && e.__esModule ? e : { default: e };
            })(p);
        window.location.origin || (window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : ""));
        var w = y.default.snap_host,
            m = y.default.root_path,
            b = void 0,
            g = (function () {
                function e(t) {
                    i(this, e);
                    var n = w + m + "/v1/pay?origin_host=" + window.location.origin + "&digest=278a115045f8dfd0ffd700d3081907726d17d2bc6d6f4eac991a2f39d638869f" + (t ? "&client_key=" + t : "") + "#/",
                        o = document.createElement("iframe");
                    (o.src = n),
                        (o.id = "snap-midtrans"),
                        (o.style.cssText = "display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 999999; border: 0;"),
                        (this.pageUrl = n),
                        (this.clientKey = t),
                        (this.iframe = o),
                        (this.attached = !1);
                }
                return (
                    h(
                        e,
                        [
                            {
                                key: "goHome",
                                value: function () {
                                    return (this.iframe.src = this.pageUrl), this.ensureAttached(), this;
                                },
                            },
                            {
                                key: "postMessage",
                                value: function (e) {
                                    return this.ensureAttached(), this.iframe.contentWindow.postMessage(e, w), this;
                                },
                            },
                            {
                                key: "hide",
                                value: function () {
                                    return (this.iframe.style.display = "none"), e.setParentStyle(!1), this.goHome(), this.detach(), this;
                                },
                            },
                            {
                                key: "show",
                                value: function () {
                                    return this.ensureAttached(), (this.iframe.style.display = "block"), e.setParentStyle(!0), this;
                                },
                            },
                            {
                                key: "isVisible",
                                value: function () {
                                    return "none" !== this.iframe.style.display;
                                },
                            },
                            {
                                key: "ensureAttached",
                                value: function () {
                                    this.attached || this.attach();
                                },
                            },
                            {
                                key: "attach",
                                value: function () {
                                    this.attached ||
                                        !document.body ||
                                        ("interactive" !== document.readyState && "complete" !== document.readyState) ||
                                        ((this.iframe.name = "popup_" + +new Date()), document.body.appendChild(this.iframe), (this.attached = !0));
                                },
                            },
                            {
                                key: "detach",
                                value: function () {
                                    this.attached && (this.iframe.parentNode.removeChild(this.iframe), (this.attached = !1));
                                },
                            },
                        ],
                        [
                            {
                                key: "setParentStyle",
                                value: function (t) {
                                    t
                                        ? (b ||
                                              (b = {
                                                  position: e.isMobile() ? document.body.style.position : null,
                                                  overflow: document.body.style.overflow,
                                                  width: document.body.style.width,
                                                  height: document.body.style.height,
                                                  pageXOffset: window.pageXOffset,
                                                  pageYOffset: window.pageYOffset,
                                              }),
                                          (document.body.style.overflow = "hidden"),
                                          (document.body.style.width = "100vw"),
                                          (document.body.style.height = "100vh"),
                                          e.isMobile() && (document.body.style.position = "fixed"),
                                          window.scroll(0, 0))
                                        : b &&
                                          (e.isMobile() && (document.body.style.position = b.position),
                                          (document.body.style.overflow = b.overflow),
                                          (document.body.style.width = b.width),
                                          (document.body.style.height = b.height),
                                          window.scroll(b.pageXOffset, b.pageYOffset));
                                },
                            },
                            {
                                key: "isMobile",
                                value: function () {
                                    return window.innerWidth < 568;
                                },
                            },
                        ]
                    ),
                    e
                );
            })(),
            v = "PopupInView",
            k = "unInitialized",
            _ = void 0,
            x = void 0,
            E = void 0,
            O = {},
            S = {
                onSuccess: d("function"),
                onPending: d("function"),
                onError: d("function"),
                onClose: d("function"),
                skipOrderSummary: d("boolean"),
                autoCloseDelay: d("number"),
                language: d("string"),
                enabledPayments: (function (e) {
                    return function (t, n) {
                        if ("[object Array]" !== Object.prototype.toString.call(n)) throw new Error(t + " should be an array of " + e);
                        return (
                            n.forEach(function (n) {
                                var i = void 0 === n ? "undefined" : f(n);
                                if (e !== i) throw new Error(t + " should be an array of " + e);
                            }),
                            !0
                        );
                    };
                })("string"),
                skipCustomerDetails: d("boolean"),
                showOrderId: d("boolean"),
                isDemoMode: d("boolean"),
                creditCardNumber: d("string"),
                creditCardCvv: d("string"),
                creditCardExpiry: d("string"),
                customerEmail: d("string"),
                customerPhone: d("string"),
                uiMode: d("string"),
                gopayMode: d("string"),
                selectedPaymentType: d("string"),
            },
            P = {
                show: a(
                    "show",
                    function () {
                        _.show();
                    },
                    ["initialized"],
                    "loading"
                ),
                hide: a(
                    "hide",
                    function () {
                        _.hide(), (x = null);
                    },
                    ["initialized", "loading", v],
                    "initialized"
                ),
                init: a(
                    "init",
                    function (e) {
                        e ||
                            console.log(),
                            (_ = new g(e)),
                            _.attach(),
                            window.addEventListener("message", s, !1);
                    },
                    ["unInitialized"],
                    "initialized"
                ),
                pay: a(
                    "pay",
                    function (e, t) {
                        c(e, "snapToken"), (O = t || {}), u(O), (x = e), (E = +new Date()), _.attach(), _.attached && _.goHome().postMessage({ event: "notify" });
                    },
                    ["initialized", "loading"],
                    v
                ),
                reset: a(
                    "reset",
                    function () {
                        _ && (_.detach(), (_ = null)), window.removeEventListener("message", s, !1), (b = void 0), (x = null);
                    },
                    ["initialized", "unInitialized", "loading", v],
                    "unInitialized"
                ),
            },
            C = (function () {
                for (var e = void 0, t = document.getElementsByTagName("script"), n = 0; n < t.length; n++) {
                    o(t[n].src) && (e = t[n]);
                }
                return e;
            })(),
            M = (C && C.getAttribute("data-client-key")) || "";
        P.init(M),
            (function e() {
                "complete" === document.readyState ? _ && _.attach() : setTimeout(e, 100);
            })(),
            (window.snap = P);
    },
    function (e, t) {
        e.exports = {
            snap_host: "https://app.midtrans.com",
            root_path: "/snap",
            asset_host: "//d2f3dnusg0rbp7.cloudfront.net",
            asset_path: "/assets",
            environment: "production",
            raygun_api_key: "38Cck3PO+wThRZrAZ+hCzA==",
            mixpanel_key: "84ed63a9507c49b373945b13633b8a0c",
            free_mixpanel_key: "4e3a8e10cb012c970cfc8b6d94abc570",
            papi_host: "https://api.midtrans.com",
            exbin_host: "https://api.midtrans.com",
        };
    },
    function (e, t, n) {
        e.exports = n(0);
    },
]);
