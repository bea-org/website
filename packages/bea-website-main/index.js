import '../bea-font/index.js';

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
  @import "./node_modules/@bea-org/bea-color/index.css";

  :host {
    display: block;
    position: relative;
    contain: content;
    font-family: 'Mulish', sans-serif;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  bea-website-menu,
  #header {
    position: absolute;
    top: 40px;
    left: 80px;
    z-index: 1;
  }

  #header {
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    gap: 20px;
  }

  bea-logo {
    width: 40px;
    height: 40px;
  }

  #comingsoon {
    color: var(--bea-color-blue);
  }

  bea-website-home {
    height: 100vh;
  }
</style>
<div id="header">
  <bea-logo icon></bea-logo>
  <div id="comingsoon">Coming soon...</div>
</div>
<!-- <bea-website-menu></bea-website-menu> -->
<bea-website-home></bea-website-home>`;
  }
});
