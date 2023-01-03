class Tooltip extends HTMLElement {

  constructor() {
    super();
    this._tooltipContainer = null;
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.style.position = 'relative';
    this._tipText = this.getAttribute('text') ?? 'some tip';

    const span = document.createElement('span');
    span.textContent = '*';
    this.shadowRoot.appendChild(span);
    this.addEventListener('mouseenter', this._addTooltip.bind(this));
    this.addEventListener('mouseleave', this._removeTooltip.bind(this));
  }

  _addTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tipText;
    this._tooltipContainer.style.backgroundColor = 'black';
    this._tooltipContainer.style.color = 'white';
    this._tooltipContainer.style.position = 'absolute';
    this._tooltipContainer.style.padding = '25px 45px';

    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _removeTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }


}

customElements.define('ze-tooltip', Tooltip);
