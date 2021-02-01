/**
 * Entry point element
 * @hideconstructor
 * @example
 * <bea-website-backgroundcircle></bea-website-backgroundcircle>
 */
window.customElements.define('bea-website-backgroundcircle', class extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' }).innerHTML = `<style>
  :host {
    display: block;
    position: relative;
    width: 100px;
    height: 100px;
    color: #C9DAFF;
  }

  svg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    will-change: transform;
    animation-duration: 10s;
    animation-name: breath;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-direction: alternate;
  }

  circle {
    fill: currentColor;
  }

  @keyframes breath {
    0% {
      transform: scale(.98);
    }

    100% {
      transform: scale(1.02);
    }
  }
</style>
<svg id="bubble" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="50" />
</svg>`;
  }
});
