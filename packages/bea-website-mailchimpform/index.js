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
    align-items: center;
  }

  form {
    display: contents;
  }

  input {
    padding: 15px 25px;
    font-size: 16px;
    border: none;
    border-radius: 100px;
    color: var(--color-black);
    box-sizing: border-box;
  }
  
  input::placeholder {
    color: var(--color-black);
    opacity: .3;
  }

  input:focus {
    outline: none;
    box-shadow: inset 0 0 0 1px var(--color-grey);
  }

  bea-website-button {
    padding: 20px 40px;
  }
</style>
<form action="https://gives.us8.list-manage.com/subscribe/post?u=9478a676a23e73e9922afc992&amp;id=9e77fea305"
  method="post" target="_blank" novalidate>
  <input type="email" value="" name="EMAIL" placeholder="Entrez votre adresse email">
  <input type="submit" style="display: none;">
  <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
  <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text"
      name="b_9478a676a23e73e9922afc992_9e77fea305" tabindex="-1" value=""></div>
  <bea-website-button>S'inscrire</bea-website-button>
</form>`;

    const submitButton = this.shadowRoot.querySelector('bea-website-button');
    const form = this.shadowRoot.querySelector('form');

    submitButton.addEventListener('click', () => {
      this.dispatchEvent(new Event('submit', {
        bubbles: true,
      }));
      form.submit();
    });

    form.addEventListener('submit', (event) => {
      this.dispatchEvent(new Event('submit', event));
    });
  }
});
