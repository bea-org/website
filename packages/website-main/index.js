import '../website-menu/index.js';

/**
 * Entry point element
 * @hideconstructor
 * @example
 * <bea-website-main></bea-website-main>
 */
window.customElements.define('bea-website-main', class extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' }).innerHTML = `<style>
  :host {
    display: block;
    position: relative;
    contain: content;
    font-family: sans-serif;
  }

  bea-website-menu {
    position: absolute;
    top: 32px;
    left: 80px;
    z-index: 1;
  }

  #bubble {
    position: absolute;
    right: 0;
  }
</style>
<bea-website-menu></bea-website-menu>
<svg id="bubble" width="839" height="800" viewBox="0 0 839 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="725" cy="394" r="725" fill="#C9DAFF" />
</svg>`;
  }
});
