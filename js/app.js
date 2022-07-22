(() => {
    var __webpack_modules__ = {
        364: function(module) {
            /*!
 * TagCloud.js v2.2.0
 * Copyright (c) 2016-2021 @ Cong Min
 * MIT License - https://github.com/mcc108/TagCloud
 */
            (function(global, factory) {
                true ? module.exports = factory() : 0;
            })(0, (function() {
                "use strict";
                function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
                }
                function _defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                function _createClass(Constructor, protoProps, staticProps) {
                    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) _defineProperties(Constructor, staticProps);
                    return Constructor;
                }
                function _defineProperty(obj, key, value) {
                    if (key in obj) Object.defineProperty(obj, key, {
                        value,
                        enumerable: true,
                        configurable: true,
                        writable: true
                    }); else obj[key] = value;
                    return obj;
                }
                function _extends() {
                    _extends = Object.assign || function(target) {
                        for (var i = 1; i < arguments.length; i++) {
                            var source = arguments[i];
                            for (var key in source) if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
                        }
                        return target;
                    };
                    return _extends.apply(this, arguments);
                }
                function ownKeys(object, enumerableOnly) {
                    var keys = Object.keys(object);
                    if (Object.getOwnPropertySymbols) {
                        var symbols = Object.getOwnPropertySymbols(object);
                        if (enumerableOnly) symbols = symbols.filter((function(sym) {
                            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
                        }));
                        keys.push.apply(keys, symbols);
                    }
                    return keys;
                }
                function _objectSpread2(target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = null != arguments[i] ? arguments[i] : {};
                        if (i % 2) ownKeys(Object(source), true).forEach((function(key) {
                            _defineProperty(target, key, source[key]);
                        })); else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); else ownKeys(Object(source)).forEach((function(key) {
                            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
                        }));
                    }
                    return target;
                }
                var TagCloud = function() {
                    function TagCloud() {
                        var container = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document.body;
                        var texts = arguments.length > 1 ? arguments[1] : void 0;
                        var options = arguments.length > 2 ? arguments[2] : void 0;
                        _classCallCheck(this, TagCloud);
                        var self = this;
                        if (!container || 1 !== container.nodeType) return new Error("Incorrect element type");
                        self.$container = container;
                        self.texts = texts || [];
                        self.config = _objectSpread2(_objectSpread2({}, TagCloud._defaultConfig), options || {});
                        self.radius = self.config.radius;
                        self.depth = 2 * self.radius;
                        self.size = 1.5 * self.radius;
                        self.maxSpeed = 1.5 * TagCloud._getMaxSpeed(self.config.maxSpeed);
                        self.initSpeed = 1.5 * TagCloud._getInitSpeed(self.config.initSpeed);
                        self.direction = self.config.direction;
                        self.keep = self.config.keep;
                        self.paused = false;
                        self._createElment();
                        self._init();
                        TagCloud.list.push({
                            el: self.$el,
                            container,
                            instance: self
                        });
                    }
                    _createClass(TagCloud, [ {
                        key: "_createElment",
                        value: function _createElment() {
                            var self = this;
                            var $el = document.createElement("div");
                            $el.className = self.config.containerClass;
                            if (self.config.useContainerInlineStyles) {
                                $el.style.position = "relative";
                                $el.style.width = "".concat(2 * self.radius, "px");
                                $el.style.height = "".concat(2 * self.radius, "px");
                            }
                            self.items = [];
                            self.texts.forEach((function(text, index) {
                                var item = self._createTextItem(text, index);
                                $el.appendChild(item.el);
                                self.items.push(item);
                            }));
                            self.$container.appendChild($el);
                            self.$el = $el;
                        }
                    }, {
                        key: "_createTextItem",
                        value: function _createTextItem(text) {
                            var index = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                            var self = this;
                            var itemEl = document.createElement("span");
                            itemEl.className = self.config.itemClass;
                            if (self.config.useItemInlineStyles) {
                                itemEl.style.willChange = "transform, opacity, filter";
                                itemEl.style.position = "absolute";
                                itemEl.style.top = "50%";
                                itemEl.style.left = "50%";
                                itemEl.style.zIndex = index + 1;
                                itemEl.style.filter = "alpha(opacity=0)";
                                itemEl.style.opacity = 0;
                                var transformOrigin = "50% 50%";
                                itemEl.style.WebkitTransformOrigin = transformOrigin;
                                itemEl.style.MozTransformOrigin = transformOrigin;
                                itemEl.style.OTransformOrigin = transformOrigin;
                                itemEl.style.transformOrigin = transformOrigin;
                                var transform = "translate3d(-50%, -50%, 0) scale(1)";
                                itemEl.style.WebkitTransform = transform;
                                itemEl.style.MozTransform = transform;
                                itemEl.style.OTransform = transform;
                                itemEl.style.transform = transform;
                            }
                            itemEl.innerText = text;
                            return _objectSpread2({
                                el: itemEl
                            }, self._computePosition(index));
                        }
                    }, {
                        key: "_computePosition",
                        value: function _computePosition(index) {
                            var random = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : false;
                            var self = this;
                            var textsLength = self.texts.length;
                            if (random) index = Math.floor(Math.random() * (textsLength + 1));
                            var phi = Math.acos(-1 + (2 * index + 1) / textsLength);
                            var theta = Math.sqrt((textsLength + 1) * Math.PI) * phi;
                            return {
                                x: self.size * Math.cos(theta) * Math.sin(phi) / 2,
                                y: self.size * Math.sin(theta) * Math.sin(phi) / 2,
                                z: self.size * Math.cos(phi) / 2
                            };
                        }
                    }, {
                        key: "_requestInterval",
                        value: function _requestInterval(fn, delay) {
                            var requestAnimFrame = (function() {
                                return window.requestAnimationFrame;
                            } || function(callback, element) {
                                window.setTimeout(callback, 1e3 / 60);
                            })();
                            var start = (new Date).getTime();
                            var handle = {};
                            function loop() {
                                handle.value = requestAnimFrame(loop);
                                var current = (new Date).getTime(), delta = current - start;
                                if (delta >= delay) {
                                    fn.call();
                                    start = (new Date).getTime();
                                }
                            }
                            handle.value = requestAnimFrame(loop);
                            return handle;
                        }
                    }, {
                        key: "_init",
                        value: function _init() {
                            var self = this;
                            self.active = false;
                            self.mouseX0 = self.initSpeed * Math.sin(self.direction * (Math.PI / 180));
                            self.mouseY0 = -self.initSpeed * Math.cos(self.direction * (Math.PI / 180));
                            self.mouseX = self.mouseX0;
                            self.mouseY = self.mouseY0;
                            TagCloud._on(self.$el, "mouseover", (function() {
                                self.active = true;
                            }));
                            TagCloud._on(self.$el, "mouseout", (function() {
                                self.active = false;
                            }));
                            TagCloud._on(self.keep ? window : self.$el, "mousemove", (function(ev) {
                                ev = ev || window.event;
                                var rect = self.$el.getBoundingClientRect();
                                self.mouseX = (ev.clientX - (rect.left + rect.width / 2)) / 1.5;
                                self.mouseY = (ev.clientY - (rect.top + rect.height / 2)) / 1.5;
                            }));
                            self._next();
                            self.interval = self._requestInterval((function() {
                                self._next.call(self);
                            }), 10);
                        }
                    }, {
                        key: "_next",
                        value: function _next() {
                            var self = this;
                            if (self.paused) return;
                            if (!self.keep && !self.active) {
                                self.mouseX = Math.abs(self.mouseX - self.mouseX0) < 1 ? self.mouseX0 : (self.mouseX + self.mouseX0) / 2;
                                self.mouseY = Math.abs(self.mouseY - self.mouseY0) < 1 ? self.mouseY0 : (self.mouseY + self.mouseY0) / 2;
                            }
                            var a = -Math.min(Math.max(-self.mouseY, -self.size), self.size) / self.radius * self.maxSpeed;
                            var b = Math.min(Math.max(-self.mouseX, -self.size), self.size) / self.radius * self.maxSpeed;
                            if (Math.abs(a) <= .01 && Math.abs(b) <= .01) return;
                            var l = Math.PI / 180;
                            var sc = [ Math.sin(a * l), Math.cos(a * l), Math.sin(b * l), Math.cos(b * l) ];
                            self.items.forEach((function(item) {
                                var rx1 = item.x;
                                var ry1 = item.y * sc[1] + item.z * -sc[0];
                                var rz1 = item.y * sc[0] + item.z * sc[1];
                                var rx2 = rx1 * sc[3] + rz1 * sc[2];
                                var ry2 = ry1;
                                var rz2 = rz1 * sc[3] - rx1 * sc[2];
                                var per = 2 * self.depth / (2 * self.depth + rz2);
                                item.x = rx2;
                                item.y = ry2;
                                item.z = rz2;
                                item.scale = per.toFixed(3);
                                var alpha = per * per - .25;
                                alpha = (alpha > 1 ? 1 : alpha).toFixed(3);
                                var itemEl = item.el;
                                var left = (item.x - itemEl.offsetWidth / 2).toFixed(2);
                                var top = (item.y - itemEl.offsetHeight / 2).toFixed(2);
                                var transform = "translate3d(".concat(left, "px, ").concat(top, "px, 0) scale(").concat(item.scale, ")");
                                itemEl.style.WebkitTransform = transform;
                                itemEl.style.MozTransform = transform;
                                itemEl.style.OTransform = transform;
                                itemEl.style.transform = transform;
                                itemEl.style.filter = "alpha(opacity=".concat(100 * alpha, ")");
                                itemEl.style.opacity = alpha;
                            }));
                        }
                    }, {
                        key: "update",
                        value: function update(texts) {
                            var self = this;
                            self.texts = texts || [];
                            self.texts.forEach((function(text, index) {
                                var item = self.items[index];
                                if (!item) {
                                    item = self._createTextItem(text, index);
                                    _extends(item, self._computePosition(index, true));
                                    self.$el.appendChild(item.el);
                                    self.items.push(item);
                                }
                                item.el.innerText = text;
                            }));
                            var textsLength = self.texts.length;
                            var itemsLength = self.items.length;
                            if (textsLength < itemsLength) {
                                var removeList = self.items.splice(textsLength, itemsLength - textsLength);
                                removeList.forEach((function(item) {
                                    self.$el.removeChild(item.el);
                                }));
                            }
                        }
                    }, {
                        key: "destroy",
                        value: function destroy() {
                            var self = this;
                            self.interval = null;
                            var index = TagCloud.list.findIndex((function(e) {
                                return e.el === self.$el;
                            }));
                            if (-1 !== index) TagCloud.list.splice(index, 1);
                            if (self.$container && self.$el) self.$container.removeChild(self.$el);
                        }
                    }, {
                        key: "pause",
                        value: function pause() {
                            var self = this;
                            self.paused = true;
                        }
                    }, {
                        key: "resume",
                        value: function resume() {
                            var self = this;
                            self.paused = false;
                        }
                    } ], [ {
                        key: "_on",
                        value: function _on(el, ev, handler, cap) {
                            if (el.addEventListener) el.addEventListener(ev, handler, cap); else if (el.attachEvent) el.attachEvent("on".concat(ev), handler); else el["on".concat(ev)] = handler;
                        }
                    } ]);
                    return TagCloud;
                }();
                TagCloud.list = [];
                TagCloud._defaultConfig = {
                    radius: 100,
                    maxSpeed: "normal",
                    initSpeed: "normal",
                    direction: 135,
                    keep: true,
                    useContainerInlineStyles: true,
                    useItemInlineStyles: true,
                    containerClass: "tagcloud",
                    itemClass: "tagcloud--item"
                };
                TagCloud._getMaxSpeed = function(name) {
                    return {
                        slow: .5,
                        normal: 1,
                        fast: 2
                    }[name] || 1;
                };
                TagCloud._getInitSpeed = function(name) {
                    return {
                        slow: 16,
                        normal: 32,
                        fast: 80
                    }[name] || 32;
                };
                var index = function(els, texts, options) {
                    if ("string" === typeof els) els = document.querySelectorAll(els);
                    if (!els.forEach) els = [ els ];
                    var instances = [];
                    els.forEach((function(el) {
                        if (el) instances.push(new TagCloud(el, texts, options));
                    }));
                    return instances.length <= 1 ? instances[0] : instances;
                };
                return index;
            }));
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (void 0 !== cachedModule) return cachedModule.exports;
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        "use strict";
        function isWebp() {
            function testWebP(callback) {
                let webP = new Image;
                webP.onload = webP.onerror = function() {
                    callback(2 == webP.height);
                };
                webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
            }
            testWebP((function(support) {
                let className = true === support ? "webp" : "no-webp";
                document.documentElement.classList.add(className);
            }));
        }
        let addWindowScrollEvent = false;
        setTimeout((() => {
            if (addWindowScrollEvent) {
                let windowScroll = new Event("windowScroll");
                window.addEventListener("scroll", (function(e) {
                    document.dispatchEvent(windowScroll);
                }));
            }
        }), 0);
        var TagCloud = __webpack_require__(364);
        let mouseX, mouseY, posX, posY, clientX, clientY;
        document.addEventListener("DOMContentLoaded", (() => {
            const cursor = document.querySelector("#cursor");
            document.querySelector("#aura");
            document.body.addEventListener("mousemove", (e => {
                clientX = e.pageX;
                clientY = e.pageY;
                mouseCoords(e);
            }));
            mouseX = 0, mouseY = 0, posX = 0, posY = 0;
            function mouseCoords(e) {
                mouseX = e.pageX;
                mouseY = e.pageY;
            }
            function animOnScroll() {
                const animationItems = Array.from(document.querySelectorAll("[data-animation]"));
                animationItems.push(document.querySelector(".about-canvas"));
                animationItems.push(document.querySelector(".background-canvas"));
                for (let i = 0; i < animationItems.length; i++) {
                    const animItem = animationItems[i];
                    const animItemHeight = animItem.offsetHeight;
                    let animItemOffset = offset(animItem).top;
                    const animStart = 4;
                    let animItemPoint = window.innerHeight - animItemHeight / animStart;
                    if (animItemHeight > window.innerHeight) {
                        console.log(window.innerHeight - window.innerHeight / animStart);
                        animItemPoint = window.innerHeight - window.innerHeight / animStart;
                    }
                    const thisAnimation = animItem.dataset.animation;
                    if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
                        if ("canvas" === animItem.localName) animItem.classList.add("active");
                        if ("sphere" === animItem.dataset.animation) {
                            animItem.classList.add("active");
                            animItem.dataset.animation = "hide";
                        }
                        if (animItem.dataset.animation) {
                            if ("item" === animItem.dataset.animation) setTimeout((() => {
                                animItem.classList.add("active");
                            }), 250 * parseInt(animItem.dataset.timeout));
                            if ("form" === animItem.dataset.animation) {
                                animItem.classList.add("active");
                                continue;
                            }
                            if ("title" === animItem.dataset.animation) {
                                textAnimation(animItem.classList[0], true);
                                animItem.dataset.animation = "hide";
                                continue;
                            }
                            if ("button" === animItem.dataset.animation) {
                                setTimeout((() => {
                                    animItem.classList.add("active");
                                }), 2e3);
                                animItem.dataset.animation = "hide";
                                continue;
                            }
                            if ("subtitle" === animItem.dataset.animation) {
                                animItem.classList.add("active");
                                continue;
                            }
                            if (animItem.dataset.animation.includes("progress")) {
                                progressAnimation(animItem);
                                continue;
                            }
                        }
                    } else if (thisAnimation) if ("hide" === animItem.dataset.animation) continue; else {
                        animItem.dataset.animItem = thisAnimation;
                        animItem.classList.remove("active");
                        if (animItem.dataset.animation.includes("progress")) progressAnimation(animItem, true);
                        if ("button" === animItem.dataset.animation) animItem.classList.remove("active");
                        if ("cirkle" === animItem.dataset.animation) animItem.classList.remove("active");
                    }
                    function offset(el) {
                        const rect = el.getBoundingClientRect(), scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                        return {
                            top: rect.top + scrollTop,
                            left: rect.left + scrollLeft
                        };
                    }
                }
            }
            function initPreloader() {
                const preloader = document.querySelector(".preloader");
                setTimeout((() => {
                    preloader.style.display = "none";
                    document.documentElement.classList.remove("lock");
                    cursor.style.display = "block";
                    backgroundAnimation();
                    animationCirkle();
                }), 1500);
            }
            initPreloader();
            setTimeout((() => {
                window.addEventListener("scroll", animOnScroll);
                animOnScroll();
            }), 1600);
        }));
        function textAnimation(selector, move = false) {
            const mainText = document.querySelectorAll(`.${selector}`);
            const spansArray = new Array;
            for (let i = 0; i < mainText.length; i++) {
                const textItem = mainText[i];
                textItem.innerHTML = textItem.textContent.replace(/\S/g, "<span>$&</span>");
                const textSpans = textItem.querySelectorAll("span");
                for (let i = 0; i < textSpans.length; i++) {
                    const span = textSpans[i];
                    span.setAttribute("anim-span", true);
                    span.style.opacity = 0;
                    spansArray.push(span);
                    span.addEventListener("mouseover", (e => {
                        const thisSpan = e.target;
                        thisSpan.classList.add("active");
                    }));
                    span.addEventListener("mouseout", (e => {
                        const thisSpan = e.target;
                        setTimeout((() => {
                            thisSpan.classList.remove("active");
                        }), 600);
                    }));
                }
            }
            if (move) for (let i = 0; i < spansArray.length; i++) setTimeout((() => {
                spansArray[i].style.opacity = 1;
                spansArray[i].classList.add("active");
                setTimeout((() => {
                    spansArray[i].classList.remove("active");
                }), 600);
            }), 100 * i - .8 * i);
        }
        let fromMain = true;
        function backgroundAnimation() {
            const main = document.querySelector(".main");
            let canvas = document.createElement("canvas"), ctx = canvas.getContext("2d"), w = canvas.width = document.documentElement.clientWidth, h = canvas.height = document.documentElement.clientHeight, particles = new Array, properties = {
                bgColor: "rgba(17,17,19,1)",
                particleColor: "rgba(255,40,40,1)",
                particleRadius: 3,
                particleCount: 60,
                particleSpeed: .5,
                lineLength: 150,
                particleLife: 6
            };
            canvas.classList.add("background-canvas");
            setTimeout((() => {
                canvas.classList.add("active");
            }), 100);
            const chanceNumber = [ -1, 1 ];
            class Particle {
                constructor() {
                    this.x = fromMain ? Math.random() * w : mouseX + (100 * Math.random() + 1) * chanceNumber[Math.round(Math.random())];
                    this.y = fromMain ? Math.random() * h : mouseY + (100 * Math.random() + 1) * chanceNumber[Math.round(Math.random())];
                    this.speedX = Math.random() * (2 * properties.particleSpeed - properties.particleSpeed);
                    this.speedY = Math.random() * (2 * properties.particleSpeed - properties.particleSpeed);
                    this.life = Math.random() * properties.particleLife * 60;
                }
                position() {
                    this.x + this.speedX > w && this.speedX > 0 || this.x + this.speedX < 0 && this.speedX < 0 ? this.speedX *= -1 : this.speedX;
                    this.y + this.speedY > h && this.speedY > 0 || this.y + this.speedY < 0 && this.speedY < 0 ? this.speedY *= -1 : this.speedY;
                    this.x += this.speedX;
                    this.y += this.speedY;
                }
                reDraw() {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, properties.particleRadius, 0, 2 * Math.PI);
                    ctx.closePath();
                    ctx.fillStyle = properties.particleColor;
                    ctx.fill();
                }
                reCalculateLife() {
                    if (this.life < 1) {
                        this.x = !fromMain ? Math.random() * w : mouseX + (100 * Math.random() + 1) * chanceNumber[Math.round(Math.random())];
                        this.y = !fromMain ? Math.random() * h : mouseY + (100 * Math.random() + 1) * chanceNumber[Math.round(Math.random())];
                        this.speedX = Math.random() * (2 * properties.particleSpeed - properties.particleSpeed);
                        this.speedY = Math.random() * (2 * properties.particleSpeed - properties.particleSpeed);
                        this.life = Math.random() * properties.particleLife * 60;
                    }
                    this.life--;
                }
            }
            function redrawBackground() {
                ctx.fillStyle = properties.bgColor;
                ctx.fillRect(0, 0, w, h);
            }
            function drawLines() {
                let x1, x2, y1, y2, length, opacity;
                for (let particleOne of particles) for (let particleTwo of particles) {
                    x1 = particleOne.x;
                    x2 = particleTwo.x;
                    y1 = particleOne.y;
                    y2 = particleTwo.y;
                    length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                    opacity = 1 - length / properties.lineLength;
                    if (length < properties.lineLength) {
                        ctx.lineWidth = "0.5";
                        ctx.strokeStyle = `rgba(255,40,40,${opacity})`;
                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.closePath();
                        ctx.stroke();
                    }
                }
            }
            function reDrawParticles() {
                for (let particle of particles) {
                    particle.reCalculateLife();
                    particle.position();
                    particle.reDraw();
                }
            }
            function loop() {
                redrawBackground();
                reDrawParticles();
                drawLines();
                requestAnimationFrame(loop);
            }
            function init() {
                particles = new Array;
                properties.particleCount = document.documentElement.clientWidth < 991.98 ? 40 : 80;
                for (let i = 0; i < properties.particleCount; i++) particles.push(new Particle);
                loop();
            }
            window.addEventListener("resize", (() => {
                w = canvas.width = document.documentElement.clientWidth, h = canvas.height = document.documentElement.clientHeight;
            }));
            init();
            function setPos(e) {
                fromMain = true;
                mouseX = e.pageX;
                mouseY = e.pageX;
            }
            function delPos() {
                fromMain = false;
            }
            main.addEventListener("mousemove", setPos);
            main.addEventListener("mouseout", delPos);
            let divTimeout, x = 0, y = 0, showed = false;
            main.onmousemove = function(e) {
                x = e.clientX;
                y = e.clientY;
            };
            setInterval((function() {
                if (0 == x && 0 == y) {
                    fromMain = false;
                    if (!showed) {
                        divTimeout = setTimeout((function() {}), 2e3);
                        showed = true;
                    }
                } else {
                    clearTimeout(divTimeout);
                    showed = false;
                    fromMain = false;
                }
                x = 0;
                y = 0;
            }), 100);
            document.body.append(canvas);
        }
        function animationCirkle() {
            const aboutCirkle = document.querySelector(".about__cirkle");
            const cnv = document.createElement(`canvas`);
            const ctx = cnv.getContext(`2d`);
            cnv.classList.add("about-canvas");
            cnv.setAttribute("data-animation", "cirkle");
            let ringRadius;
            let centerX = 0;
            let centerY = 0;
            function init() {
                cnv.width = aboutCirkle.clientWidth;
                cnv.height = aboutCirkle.clientWidth;
                ringRadius = cnv.width / 2 - 40;
                centerX = cnv.width / 2;
                centerY = cnv.height / 2;
            }
            init();
            const numberOfRings = 3;
            const ringRadiusOffset = 7;
            const waveOffset = 15;
            const colors = [ `#FF0000`, `#ff004c`, `#c50d28` ];
            let startAngle = 0;
            let angle = 1;
            cnv.addEventListener("mouseover", (() => {
                angle = 5;
            }));
            cnv.addEventListener("mouseout", (() => {
                angle = 1;
            }));
            function updateRings() {
                for (let i = 0; i < numberOfRings; i++) {
                    let radius = i * ringRadiusOffset + ringRadius;
                    let offsetAngle = i * waveOffset * Math.PI / 180;
                    drawRing(radius, colors[i], offsetAngle);
                }
                startAngle >= 360 ? startAngle = 0 : startAngle += angle;
            }
            const maxWavesAmplitude = 20;
            const numberOfWaves = 10;
            function drawRing(radius, color, offsetAngle) {
                ctx.strokeStyle = color;
                ctx.lineWidth = 9;
                ctx.beginPath();
                for (let j = -180; j < 180; j++) {
                    let currentAngle = (j + startAngle) * Math.PI / 180;
                    let displacement = 0;
                    let now = Math.abs(j);
                    if (now > 70) displacement = (now - 70) / 70;
                    if (displacement >= 1) displacement = 1;
                    let waveAmplitude = radius + displacement * Math.sin((currentAngle + offsetAngle) * numberOfWaves) * maxWavesAmplitude;
                    let x = centerX + Math.cos(currentAngle) * waveAmplitude;
                    let y = centerY + Math.sin(currentAngle) * waveAmplitude;
                    j > -180 ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
                }
                ctx.closePath();
                ctx.stroke();
            }
            function loop() {
                cnv.width |= 0;
                updateRings();
                requestAnimationFrame(loop);
            }
            loop();
            window.addEventListener(`resize`, init);
            aboutCirkle.append(cnv);
        }
        function progressAnimation(bar, hide = false) {
            const barElement = bar.children[0];
            if (barElement) {
                barElement.classList.add("progress");
                barElement.style.maxWidth = bar.dataset.animation.substr(bar.dataset.animation.indexOf(":") + 1);
                if (hide) {
                    barElement.classList.remove("progress");
                    barElement.style.mainText = 0;
                }
            }
        }
        const portfolioItems = document.querySelectorAll(".portfolio__item");
        portfolioItems.forEach((portfolioItem => {
            portfolioItem.style.height = portfolioItem.offsetWidth + "px";
        }));
        window.addEventListener("resize", (() => {
            portfolioItems.forEach((portfolioItem => {
                portfolioItem.style.height = portfolioItem.offsetWidth + "px";
            }));
        }));
        const decorItems = document.querySelectorAll("[data-form]");
        decorItems.forEach((decorItem => {
            const decorInput = decorItem.querySelector("input") || decorItem.querySelector("textarea");
            if (decorInput) {
                decorInput.addEventListener("focus", (e => {
                    decorItem.classList.add("active");
                    e.stopImmediatePropagation();
                }));
                decorInput.addEventListener("blur", (e => {
                    decorItem.classList.remove("active");
                    e.stopImmediatePropagation();
                }));
            }
        }));
        const texts = [ "HTML", "CSS", "JavaScript", "Node Js", "SCSS", "SASS", "npm", "Git", "GSAP", "ES6/ES6", "Webpack", "Gulp", "BEM", "Bootstrap", "jQuerry", "Python", "C++", "JSON" ];
        const startWidth = document.documentElement.offsetWidth;
        let sphereRadius;
        if (startWidth < 992) sphereRadius = document.documentElement.offsetWidth / 2.5; else sphereRadius = .8 * document.documentElement.offsetWidth / 3.3 > 464 ? 464 : .8 * document.documentElement.offsetWidth / 3.3;
        new TagCloud(".sphere", texts, {
            radius: sphereRadius,
            initSpeed: "fast",
            maxSpedd: "fast",
            keep: false
        });
        window.addEventListener("resize", (() => {
            let sphereRadius;
            const startWidth = document.documentElement.offsetWidth;
            if (startWidth < 992) sphereRadius = document.documentElement.offsetWidth / 2.5; else sphereRadius = .8 * document.documentElement.offsetWidth / 3.3 > 464 ? 464 : .8 * document.documentElement.offsetWidth / 3.3;
            document.querySelector(".sphere")?.remove();
            const contactsContainer = document.querySelector(".contacts__container");
            const newSphere = document.createElement("div");
            newSphere.classList.add("sphere");
            newSphere.setAttribute("data-animation", "sphere");
            newSphere.classList.add("active");
            contactsContainer.append(newSphere);
            new TagCloud(".sphere", texts, {
                radius: sphereRadius,
                initSpeed: "fast",
                maxSpedd: "fast",
                keep: false
            });
        }));
        window["FLS"] = true;
        isWebp();
    })();
})();