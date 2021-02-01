import AnimationTickerElement from '../../@damienmortini/element-animation-ticker/index.js';
import '../../@damienmortini/element-glslcanvas/index.js';
import Color from '../../@damienmortini/core/math/Color.js';
import Vector2 from '../../@damienmortini/core/math/Vector2.js';

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
    display: block;
    position: relative;
    width: 218px;
    height: 84px;
    color: #6091FF;
    touch-action: none;
  }

  damo-glslcanvas {
    position: absolute;
    width: calc(100% + ${HOVER_MARGIN * 2}px);
    height: calc(100% + ${HOVER_MARGIN * 2}px);
    top: -${HOVER_MARGIN}px;
    left: -${HOVER_MARGIN}px;
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
</style>
<damo-glslcanvas></damo-glslcanvas>
<!-- <svg width="218" height="84" viewBox="0 0 218 84" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M0 29.9373C0 15.9659 10.6496 4.35013 24.4408 3.27898C80.7305 -1.09299 137.27 -1.09299 193.559 3.27898C207.35 4.35013 218 15.9659 218 29.9372V54.0627C218 68.0341 207.35 79.6499 193.559 80.721C137.27 85.093 80.7305 85.093 24.4408 80.721C10.6496 79.6499 0 68.0341 0 54.0628V29.9373Z" />
</svg> -->`;

    this._glslCanvas = this.shadowRoot.querySelector('damo-glslcanvas');
    this._glslCanvas.shader = {
      uniforms: {
        color: Color.styleToRGBA(getComputedStyle(this).color),
      },
      fragmentChunks: [
        ['start', `
          uniform vec4 color;
          uniform vec2 pointerPosition;
        `],
        ['end', `
          vec2 boxSize = (glslCanvasSize - ${HOVER_MARGIN.toFixed(1)} * 2.);
          vec2 marginSizeRatio = glslCanvasSize / boxSize;
          vec2 aspectRatio = vec2(boxSize.x / boxSize.y, 1.);

          float pointerDistance = max(0., 1. - distance(vPosition * aspectRatio * marginSizeRatio, pointerPosition * aspectRatio * marginSizeRatio) * .5);

          vec2 boxPosition = vPosition;
          boxPosition *= marginSizeRatio;
          boxPosition.y *= 1. + -(cos(boxPosition.x * 1.67) * .5 + .5) * .2;
          boxPosition.x *= aspectRatio.x;
          boxPosition *= 1. - pointerDistance * .2;
          vec2 size = vec2(aspectRatio.x, .8);
          vec4 borderRadius = vec4(.55);
          borderRadius.xy = (boxPosition.x > 0.0) ? borderRadius.xy : borderRadius.zw;
          borderRadius.x = (boxPosition.y > 0.0) ? borderRadius.x : borderRadius.y;
          vec2 q = abs(boxPosition) - size + borderRadius.x;
          float df = min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - borderRadius.x;

          float aa = 1. / min(glslCanvasSize.x, glslCanvasSize.y) * 2.;
          float opacity = 1. - smoothstep(-aa, 0., df);
          fragColor = vec4(color.rgb, opacity * color.a);
          // fragColor = vec4(vec3(pointerDistance), 1.);
        `],
      ],
    };

    this._pointerPosition = new Vector2();

    let boundingClientRect;
    this._glslCanvas.addEventListener('pointerenter', (event) => {
      boundingClientRect = this._glslCanvas.getBoundingClientRect();
    });

    this._glslCanvas.addEventListener('pointermove', (event) => {
      this._pointerPosition.x = (event.clientX - boundingClientRect.x) / boundingClientRect.width * 2 - 1;
      this._pointerPosition.y = -((event.clientY - boundingClientRect.y) / boundingClientRect.height * 2 - 1);
    });
  }

  update() {
    this._glslCanvas.draw({
      uniforms: {
        pointerPosition: this._pointerPosition,
      },
    });
  }
});
