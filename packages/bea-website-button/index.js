import AnimationTickerElement from '../../@damienmortini/element-animation-ticker/index.js';
import '../../@damienmortini/element-glslcanvas/index.js';
import Color from '../../@damienmortini/core/math/Color.js';
import Vector2 from '../../@damienmortini/core/math/Vector2.js';
import Easing from '../../@damienmortini/core/math/Easing.js';
import { animate } from '../../@damienmortini/core/util/Animation.js';

const HOVER_MARGIN = 100;

/**
 * Entry point element
 * @hideconstructor
 * @example
 * <bea-website-button></bea-website-button>
 */
window.customElements.define('bea-website-button', class extends AnimationTickerElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' }).innerHTML = `<style>
  :host {
    --background-color: #6091FF;
    font-family: Pangram, sans-serif;
    font-weight: 700;
    display: grid;
    align-content: center;
    justify-content: center;
    position: relative;
    padding: 30px;
    color: white;
    touch-action: none;
    cursor: pointer;
  }

  damo-glslcanvas {
    position: absolute;
    pointer-events: none;
    width: calc(100% + var(--hover-margin) * 2);
    height: calc(100% + var(--hover-margin) * 2);
    top: calc(var(--hover-margin) * -1);
    left: calc(var(--hover-margin) * -1);
  }

  svg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: .5;
  }

  path {
    fill: red;
  }

  slot {
    position: relative;
    display: block;
    pointer-events: none;
  }

  #focusable {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
  }
</style>
<damo-glslcanvas></damo-glslcanvas>
<a href="javascript:;" id="focusable"></a>
<slot>Button</slot>
<!-- <svg width="218" height="84" viewBox="0 0 218 84" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M0 29.9373C0 15.9659 10.6496 4.35013 24.4408 3.27898C80.7305 -1.09299 137.27 -1.09299 193.559 3.27898C207.35 4.35013 218 15.9659 218 29.9372V54.0627C218 68.0341 207.35 79.6499 193.559 80.721C137.27 85.093 80.7305 85.093 24.4408 80.721C10.6496 79.6499 0 68.0341 0 54.0628V29.9373Z" />
</svg> -->`;

    this._focusable = this.shadowRoot.querySelector('#focusable');

    this._pointerPosition = new Vector2();
    this._pointerPositionEased = new Vector2();
    this._pointerHover = 0;

    this._glslCanvas = this.shadowRoot.querySelector('damo-glslcanvas');
    this._glslCanvas.style.setProperty('--hover-margin', `${HOVER_MARGIN}px`);
    this._glslCanvas.shader = {
      uniforms: {
        color: Color.styleToRGBA(getComputedStyle(this).getPropertyValue('--background-color')),
      },
      fragmentChunks: [
        ['start', `
          uniform vec4 color;
          uniform vec2 pointerPosition;
          uniform float pointerHover;
        `],
        ['end', `
          vec2 boxSize = (glslCanvasSize - ${HOVER_MARGIN.toFixed(1)} * 2.);
          vec2 marginSizeRatio = glslCanvasSize / boxSize;
          vec2 aspectRatio = vec2(boxSize.x / boxSize.y, 1.);

          float pointerDistance = max(0., 1. - distance(vPosition * aspectRatio * marginSizeRatio, pointerPosition * aspectRatio * marginSizeRatio) * .3);
          pointerDistance = smoothstep(0., 1., pointerDistance);
          if(pointerPosition.x == 0. && pointerPosition.y == 0. ) pointerDistance = 0.;

          vec2 boxPosition = vPosition;
          boxPosition *= marginSizeRatio;
          boxPosition.y *= 1. + -(cos(boxPosition.x * 1.67) * .5 + .5) * .2;
          boxPosition.x *= aspectRatio.x;
          // boxPosition *= 1. - pointerDistance * .3;
          vec2 size = vec2(aspectRatio.x, .8);
          vec4 borderRadius = vec4(.55);
          borderRadius.xy = (boxPosition.x > 0.0) ? borderRadius.xy : borderRadius.zw;
          borderRadius.x = (boxPosition.y > 0.0) ? borderRadius.x : borderRadius.y;
          vec2 q = abs(boxPosition) - size + borderRadius.x;
          float df = min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - borderRadius.x;
          df -= pointerDistance * .2;
          df -= cos((1. - pointerHover) * (1. - pointerDistance) * 8.) * (1. - pointerHover) * .1 * smoothstep(0., .1, pointerHover);

          float aa = 1. / min(glslCanvasSize.x, glslCanvasSize.y) * 4.;
          float opacity = 1. - smoothstep(-aa, 0., df);
          fragColor = vec4(color.rgb, opacity * color.a);
          // fragColor = vec4(vec3(df), 1.);
          // fragColor = vec4(vec3(pointerDistance), 1.);
        `],
      ],
    };

    let canvasBoundingClientRect;
    new ResizeObserver(() => canvasBoundingClientRect = this._glslCanvas.getBoundingClientRect()).observe(this);
    window.addEventListener('resize', () => canvasBoundingClientRect = this._glslCanvas.getBoundingClientRect());

    this._pointerHovering = false;
    this.addEventListener('pointerenter', (event) => {
      canvasBoundingClientRect = this._glslCanvas.getBoundingClientRect();
      this._pointerHovering = true;
      animate(this, {
        _pointerHover: 1,
      }, {
        duration: 600,
        easing: (x) => Easing.powerInOut(x),
      });
    });

    this.addEventListener('pointerleave', (event) => {
      this._pointerHovering = false;
    });

    window.addEventListener('pointermove', (event) => {
      if (!canvasBoundingClientRect) return;
      this._pointerPosition.x = (event.clientX - canvasBoundingClientRect.x) / canvasBoundingClientRect.width * 2 - 1;
      this._pointerPosition.y = -((event.clientY - canvasBoundingClientRect.y) / canvasBoundingClientRect.height * 2 - 1);
    });
  }

  focus() {
    this._focusable.focus();
  }

  update() {
    if (!this._pointerHovering) this._pointerHover += -this._pointerHover * .2;
    this._pointerPositionEased.lerp(this._pointerPosition, .2);
    this._glslCanvas.draw({
      uniforms: {
        pointerHover: this._pointerHover,
        pointerPosition: this._pointerPositionEased,
      },
    });
  }
});
