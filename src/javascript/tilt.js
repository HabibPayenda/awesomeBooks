/* eslint-disable no-unused-vars */
/* eslint-disable no-throw-literal */
/* eslint-disable new-cap */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-return-assign */
/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
const VanillaTilt = (function () {
  class t {
    constructor(e, i = {}) { if (!(e instanceof Node)) throw `Can't initialize VanillaTilt because ${e} is not a Node.`; this.width = null, this.height = null, this.clientWidth = null, this.clientHeight = null, this.left = null, this.top = null, this.gammazero = null, this.betazero = null, this.lastgammazero = null, this.lastbetazero = null, this.transitionTimeout = null, this.updateCall = null, this.event = null, this.updateBind = this.update.bind(this), this.resetBind = this.reset.bind(this), this.element = e, this.settings = this.extendSettings(i), this.reverse = this.settings.reverse ? -1 : 1, this.resetToStart = t.isSettingTrue(this.settings['reset-to-start']), this.glare = t.isSettingTrue(this.settings.glare), this.glarePrerender = t.isSettingTrue(this.settings['glare-prerender']), this.fullPageListening = t.isSettingTrue(this.settings['full-page-listening']), this.gyroscope = t.isSettingTrue(this.settings.gyroscope), this.gyroscopeSamples = this.settings.gyroscopeSamples, this.elementListener = this.getElementListener(), this.glare && this.prepareGlare(), this.fullPageListening && this.updateClientSize(), this.addEventListeners(), this.reset(), !1 === this.resetToStart && (this.settings.startX = 0, this.settings.startY = 0); }

    static isSettingTrue(t) { return t === '' || !0 === t || t === 1; }

    getElementListener() { if (this.fullPageListening) return window.document; if (typeof this.settings['mouse-event-element'] === 'string') { const t = document.querySelector(this.settings['mouse-event-element']); if (t) return t; } return this.settings['mouse-event-element'] instanceof Node ? this.settings['mouse-event-element'] : this.element; }

    addEventListeners() { this.onMouseEnterBind = this.onMouseEnter.bind(this), this.onMouseMoveBind = this.onMouseMove.bind(this), this.onMouseLeaveBind = this.onMouseLeave.bind(this), this.onWindowResizeBind = this.onWindowResize.bind(this), this.onDeviceOrientationBind = this.onDeviceOrientation.bind(this), this.elementListener.addEventListener('mouseenter', this.onMouseEnterBind), this.elementListener.addEventListener('mouseleave', this.onMouseLeaveBind), this.elementListener.addEventListener('mousemove', this.onMouseMoveBind), (this.glare || this.fullPageListening) && window.addEventListener('resize', this.onWindowResizeBind), this.gyroscope && window.addEventListener('deviceorientation', this.onDeviceOrientationBind); }

    removeEventListeners() { this.elementListener.removeEventListener('mouseenter', this.onMouseEnterBind), this.elementListener.removeEventListener('mouseleave', this.onMouseLeaveBind), this.elementListener.removeEventListener('mousemove', this.onMouseMoveBind), this.gyroscope && window.removeEventListener('deviceorientation', this.onDeviceOrientationBind), (this.glare || this.fullPageListening) && window.removeEventListener('resize', this.onWindowResizeBind); }

    destroy() { clearTimeout(this.transitionTimeout), this.updateCall !== null && cancelAnimationFrame(this.updateCall), this.reset(), this.removeEventListeners(), this.element.vanillaTilt = null, delete this.element.vanillaTilt, this.element = null; }

    onDeviceOrientation(t) {
      if (t.gamma === null || t.beta === null) return; this.updateElementPosition(), this.gyroscopeSamples > 0 && (this.lastgammazero = this.gammazero, this.lastbetazero = this.betazero, this.gammazero === null ? (this.gammazero = t.gamma, this.betazero = t.beta) : (this.gammazero = (t.gamma + this.lastgammazero) / 2, this.betazero = (t.beta + this.lastbetazero) / 2), this.gyroscopeSamples -= 1); const e = this.settings.gyroscopeMaxAngleX - this.settings.gyroscopeMinAngleX; const i = this.settings.gyroscopeMaxAngleY - this.settings.gyroscopeMinAngleY; const s = e / this.width; const n = i / this.height; const l = (t.gamma - (this.settings.gyroscopeMinAngleX + this.gammazero)) / s; const
        a = (t.beta - (this.settings.gyroscopeMinAngleY + this.betazero)) / n; this.updateCall !== null && cancelAnimationFrame(this.updateCall), this.event = { clientX: l + this.left, clientY: a + this.top }, this.updateCall = requestAnimationFrame(this.updateBind);
    }

    onMouseEnter() { this.updateElementPosition(), this.element.style.willChange = 'transform', this.setTransition(); }

    onMouseMove(t) { this.updateCall !== null && cancelAnimationFrame(this.updateCall), this.event = t, this.updateCall = requestAnimationFrame(this.updateBind); }

    onMouseLeave() { this.setTransition(), this.settings.reset && requestAnimationFrame(this.resetBind); }

    reset() { this.onMouseEnter(), this.fullPageListening ? this.event = { clientX: (this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.clientWidth, clientY: (this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.clientHeight } : this.event = { clientX: this.left + (this.settings.startX + this.settings.max) / (2 * this.settings.max) * this.width, clientY: this.top + (this.settings.startY + this.settings.max) / (2 * this.settings.max) * this.height }; const t = this.settings.scale; this.settings.scale = 1, this.update(), this.settings.scale = t, this.resetGlare(); }

    resetGlare() { this.glare && (this.glareElement.style.transform = 'rotate(180deg) translate(-50%, -50%)', this.glareElement.style.opacity = '0'); }

    getValues() {
      let t; let
        e; return this.fullPageListening ? (t = this.event.clientX / this.clientWidth, e = this.event.clientY / this.clientHeight) : (t = (this.event.clientX - this.left) / this.width, e = (this.event.clientY - this.top) / this.height), t = Math.min(Math.max(t, 0), 1), e = Math.min(Math.max(e, 0), 1), {
        tiltX: (this.reverse * (this.settings.max - t * this.settings.max * 2)).toFixed(2), tiltY: (this.reverse * (e * this.settings.max * 2 - this.settings.max)).toFixed(2), percentageX: 100 * t, percentageY: 100 * e, angle: Math.atan2(this.event.clientX - (this.left + this.width / 2), -(this.event.clientY - (this.top + this.height / 2))) * (180 / Math.PI),
      };
    }

    updateElementPosition() { const t = this.element.getBoundingClientRect(); this.width = this.element.offsetWidth, this.height = this.element.offsetHeight, this.left = t.left, this.top = t.top; }

    update() { const t = this.getValues(); this.element.style.transform = `perspective(${this.settings.perspective}px) rotateX(${this.settings.axis === 'x' ? 0 : t.tiltY}deg) rotateY(${this.settings.axis === 'y' ? 0 : t.tiltX}deg) scale3d(${this.settings.scale}, ${this.settings.scale}, ${this.settings.scale})`, this.glare && (this.glareElement.style.transform = `rotate(${t.angle}deg) translate(-50%, -50%)`, this.glareElement.style.opacity = `${t.percentageY * this.settings['max-glare'] / 100}`), this.element.dispatchEvent(new CustomEvent('tiltChange', { detail: t })), this.updateCall = null; }

    prepareGlare() {
      if (!this.glarePrerender) { const t = document.createElement('div'); t.classList.add('js-tilt-glare'); const e = document.createElement('div'); e.classList.add('js-tilt-glare-inner'), t.appendChild(e), this.element.appendChild(t); } this.glareElementWrapper = this.element.querySelector('.js-tilt-glare'), this.glareElement = this.element.querySelector('.js-tilt-glare-inner'), this.glarePrerender || (Object.assign(this.glareElementWrapper.style, {
        position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', overflow: 'hidden', 'pointer-events': 'none', 'border-radius': 'inherit',
      }), Object.assign(this.glareElement.style, {
        position: 'absolute', top: '50%', left: '50%', 'pointer-events': 'none', 'background-image': 'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)', transform: 'rotate(180deg) translate(-50%, -50%)', 'transform-origin': '0% 0%', opacity: '0',
      }), this.updateGlareSize());
    }

    updateGlareSize() { if (this.glare) { const t = 2 * (this.element.offsetWidth > this.element.offsetHeight ? this.element.offsetWidth : this.element.offsetHeight); Object.assign(this.glareElement.style, { width: `${t}px`, height: `${t}px` }); } }

    updateClientSize() { this.clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, this.clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; }

    onWindowResize() { this.updateGlareSize(), this.updateClientSize(); }

    setTransition() { clearTimeout(this.transitionTimeout), this.element.style.transition = `${this.settings.speed}ms ${this.settings.easing}`, this.glare && (this.glareElement.style.transition = `opacity ${this.settings.speed}ms ${this.settings.easing}`), this.transitionTimeout = setTimeout(() => { this.element.style.transition = '', this.glare && (this.glareElement.style.transition = ''); }, this.settings.speed); }

    extendSettings(t) {
      const e = {
        reverse: !1, max: 15, startX: 0, startY: 0, perspective: 1e3, easing: 'cubic-bezier(.03,.98,.52,.99)', scale: 1, speed: 300, transition: !0, axis: null, glare: !1, 'max-glare': 1, 'glare-prerender': !1, 'full-page-listening': !1, 'mouse-event-element': null, reset: !0, 'reset-to-start': !0, gyroscope: !0, gyroscopeMinAngleX: -45, gyroscopeMaxAngleX: 45, gyroscopeMinAngleY: -45, gyroscopeMaxAngleY: 45, gyroscopeSamples: 10,
      }; const
        i = {}; for (const s in e) if (s in t) i[s] = t[s]; else if (this.element.hasAttribute(`data-tilt-${s}`)) { const t = this.element.getAttribute(`data-tilt-${s}`); try { i[s] = JSON.parse(t); } catch (e) { i[s] = t; } } else i[s] = e[s]; return i;
    }

    static init(e, i) { e instanceof Node && (e = [e]), e instanceof NodeList && (e = [].slice.call(e)), e instanceof Array && e.forEach((e) => { 'vanillaTilt' in e || (e.vanillaTilt = new t(e, i)); }); }
  } return typeof document !== 'undefined' && (window.VanillaTilt = t, t.init(document.querySelectorAll('[data-tilt]'))), t;
}());
