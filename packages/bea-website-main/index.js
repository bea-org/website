import '../bea-website-menu/index.js';
import '../bea-website-home/index.js';

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
    font-family: 'Mulish', sans-serif;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  bea-website-menu {
    position: absolute;
    top: 32px;
    left: 80px;
    z-index: 1;
  }

  bea-website-home {
    height: 100vh;
  }
</style>
<bea-website-menu></bea-website-menu>
<bea-website-home></bea-website-home>`;
  }
});
