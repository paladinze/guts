class Modal extends HTMLElement {

  constructor() {
    super();

    this.showModal = false;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
       <style>
        #backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
        }
        #modal {
          position: fixed;
          width: 500px;
          height: 500px;
          left: 50%;
          transform: translate(-50%, -50%);
          background: wheat;

          display: flex;
          flex-direction: column;
          padding: 30px;
        }

        .body {
          padding: 20px 0;
          font-size: 16px;
        }

        .button-close {
          font-size: 18px;
          padding: 20px;
        }

        :host {
          display: none;
        }

        :host([open]) {
          display: block;
        }
       </style>

       <div id='modal-container'>
         <div id='backdrop'></div>
         <div id='modal'>
            <header>
              <slot name='title'>Modal title</slot>
            </header>
            <section class='body'>
              <slot name='content'>
              </slot>
            </section>

            <section class='actions'>
              <button class='button-close'>close</button>
            </section>
          </div>
        </div>
    `;
  }

  connectedCallback() {
    // const titleAttr = this.getAttribute('title');

    // const titleEl = this.shadowRoot.querySelector('#modal > h1');
    // titleEl.textContent = titleAttr;

    const closeButton = this.shadowRoot.querySelector('.button-close');
    closeButton.addEventListener('click', (event) => {
      this.close()
      const closeEvent = new Event('close', {
        bubbles: true,
        composed: true,
      })
      event.target.dispatchEvent(closeEvent)
    })

  }

  static get observedAttributes() { // (3)
    return ['open'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log({ name, oldVal, newVal });

    if (name === 'open') {
      this.showModal = this.hasAttribute('open');
    }
  }

  open() {
    this.setAttribute('open', '');
  }

  close() {
    if (this.hasAttribute('open')) {
      this.removeAttribute('open');
    }
  }
}

window.customElements.define('ze-modal', Modal);
