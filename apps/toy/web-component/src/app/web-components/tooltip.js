class Tooltip extends HTMLElement {

  constructor() {
    super();
    this._tooltipContainer = null;
    this.attachShadow({ mode: 'open' });

    // const tipTmpl = document.querySelector('#tooltip-tmpl');
    // load shadowDom from external template
    // this.shadowRoot.append(tipTmpl.content.cloneNode(true));

    this.shadowRoot.innerHTML = `
      <style>
        :host(.active) {
          background: salmon;
        }

        :host(*) {
          background: var(--color-primary, wheat);
        }

        :host-context(.special-div) {
          background: dodgerblue;
        }

        ::slotted(*) {
          color: black;
          border-bottom: 3px dashed grey;
        }
      </style>
      <span>
        <span>*</span>
        <slot><span>default text</span></slot>
      </span>
    `;
  }

  connectedCallback() {
    this.style.position = 'relative';
    this._tipText = this.getAttribute('text') ?? 'some tip';

    this.addEventListener('mouseenter', this._addTooltip.bind(this));
    this.addEventListener('mouseleave', this._removeTooltip.bind(this));
  }

  disconnectedCallback() {
    console.log('disconnect')
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log({name, oldVal, newVal});

    if (oldVal === newVal) return;
    if (name === 'text') {
      this._tipText = newVal;
    }
  }

  static get observedAttributes() {
    return ['text'];
  }

  _addTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tipText;
    this._tooltipContainer.style.backgroundColor = 'black';
    this._tooltipContainer.style.color = 'white';
    this._tooltipContainer.style.position = 'absolute';
    this._tooltipContainer.style.padding = '25px 45px';
    this._tooltipContainer.style.zIndex = '10';

    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _removeTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }


}

customElements.define('ze-tooltip', Tooltip);
