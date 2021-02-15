import '../bea-website-backgroundcircle/index.js';
import '../bea-website-button/index.js';
import '../bea-website-mailchimpform/index.js';

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
    line-height: 1;
    font-family: Pangram;
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
    filter: drop-shadow(40px 30px 30px #6B7F9933);
    animation-duration: 3s;
    animation-name: float;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-direction: alternate;
  }

  #left {
    color: var(--color-blue);
    display: grid;
    align-items: center;
    justify-items: center;
  }

  #text {
    font-weight: 700;
    font-size: 96px;
    white-space: nowrap;
  }

  #text span:nth-of-type(2),
  #text span:nth-of-type(3) {
    display: block;
  }

  #text span:nth-of-type(2),
  #text span:nth-of-type(4) {
    color: var(--color-darkblue);
  }

  #text span:nth-of-type(3) {
    color: var(--color-green);
  }

  #text span:nth-of-type(5) {
    display: inline;
    color: var(--color-blue);
  }

  #emailform {
    display: grid;
    background-color: var(--color-ivory);
    border-radius: 25px;
    padding: 50px 45px;
    gap: 45px;
    position: absolute;
    bottom: 25px;
    margin: auto;
    left: 0;
    right: 0;
    width: 560px;
    box-shadow: 40px 30px 30px #6b7f9933;
  }

  #emailform #title {
    font-size: 32px;
    color: #001A70;
    font-weight: 700;
  }

  #emailform #closebutton {
    position: absolute;
    top: 25px;
    right: 25px;
    cursor: pointer;
  }

  bea-website-button {
    position: absolute;
    font-size: 22px;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
  }

  @keyframes float {
    0% {
      transform: translateY(10px);
    }

    100% {
      transform: translateY(-10px);
    }
  }
</style>
<bea-website-backgroundcircle></bea-website-backgroundcircle>
<div id="left">
  <div id="text">
    <span>Béa</span>
    <span>le don</span>
    <span>(enfin !)</span>
    <span>facile</span><span>.</span>
  </div>
</div>
<div id="right">
  <img id="phone" src="node_modules/@bea-org/bea-website-home/phone.svg">
</div>
<bea-website-button>Reste informé(e) !</bea-website-button>
<section id="emailform">
  <div id="closebutton">X</div>
  <div id="title">Me tenir informé(e)</div>
  <bea-website-mailchimpform></bea-website-mailchimpform>
</section>`;
  }
});
