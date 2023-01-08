class SuperA extends HTMLAnchorElement {

  connectedCallback() {
    this.addEventListener('click', (event) => {
      if (!confirm('Are you prepared to leave?')) {
        event.preventDefault();
      }
    })
  }
}

window.customElements.define('super-a', SuperA, { extends: 'a' });
