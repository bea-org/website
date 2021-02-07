import '../bea-website-backgroundcircle/index.js';
import '../bea-website-button/index.js';

/**
 * Entry point element
 * @hideconstructor
 * @example
 * <bea-website-home></bea-website-home>
 */
window.customElements.define('bea-website-home', class extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' }).innerHTML = `<style>
  :host {
    display: grid;
    position: relative;
    grid-template-columns: 1fr 1fr;
  }

  bea-website-backgroundcircle {
    position: absolute;
    left: calc(50% - 5vw);
    top: 50%;
    transform: translateY(-50%);
    width: 120vw;
    height: 120vw;
  }

  @media (max-aspect-ratio: 1/1) {
    bea-website-backgroundcircle {
      width: 120vh;
      height: 120vh;
    }
  }

  #right {
    display: grid;
    align-items: center;
    justify-content: center;
  }

  #phone {
    filter: drop-shadow(38.6px 28.95px 28.95px #6B7F9933);
    animation-duration: 3s;
    animation-name: float;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-direction: alternate;
  }

  bea-website-button {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
  }

  @keyframes float {
    0% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(-6px);
    }
  }
</style>
<bea-website-backgroundcircle></bea-website-backgroundcircle>
<div id="left"></div>
<div id="right">
  <img id="phone" src="node_modules/@bea-org/bea-website-home/phone.svg">
</div>
<bea-website-button>Reste informé !</bea-website-button>`;
  }
});
