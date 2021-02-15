import '../bea-website-button/index.js';

/**
 * Entry point element
 * @hideconstructor
 * @example
 * <bea-website-mailchimpform></bea-website-mailchimpform>
 */
window.customElements.define('bea-website-mailchimpform', class extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' }).innerHTML = `<style>
  :host {
    display: grid;
    position: relative;
    grid-template-columns: 1fr auto;
    gap: 25px;
  }

  form {
    display: contents;
  }

  bea-website-button {
    padding: 20px 40px;
  }
</style>
<form action="https://gives.us8.list-manage.com/subscribe/post?u=9478a676a23e73e9922afc992&amp;id=9e77fea305"
  method="post" target="_blank" novalidate>
  <input type="email" value="" name="EMAIL">
  <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
  <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text"
      name="b_9478a676a23e73e9922afc992_9e77fea305" tabindex="-1" value=""></div>
  <bea-website-button>S'inscrire</bea-website-button>
</form>`;
  }
});
