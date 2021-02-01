import '../bea-a/index.js';
import '../bea-logo/index.js';

/**
 * Entry point element
 * @hideconstructor
 * @example
 * <bea-website-menu></bea-website-menu>
 */
window.customElements.define('bea-website-menu', class extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        :host {
          display: grid;
          grid-auto-flow: column;
          gap: 32px;
          position: relative;
          contain: content;
          justify-content: center;
          align-items: center;
        }

        bea-logo {
          width: 40px;
          height: 40px;
        }
      </style>
      <a href="#home"><bea-logo icon></bea-logo></a>
      <bea-a href="#principle">Principe</bea-a>
      <bea-a href="#trust">Confiance</bea-a>
      <bea-a href="#community">Communauté</bea-a>
    `;
  }
});
