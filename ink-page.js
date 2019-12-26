import { LitElement, html, css } from 'lit-element'

class InkPage extends LitElement {

  static get styles() {
    return css`
    :host {
      page-break-inside: avoid;
      display: block;
      background: white;
      box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
      width: 210mm;
      height: 296mm;
      margin: 1cm auto;
      padding: 1cm;
      overflow: hidden;
      position: relative;
    }

    :host(.content) {
      counter-increment: ink-page-number;
    }

    :host:after {
      content: "Page " counter(ink-page-number);
      margin-bottom: 1em;
      position: absolute;
      bottom: 1em;
      left: 0;
      text-align: center;
      width: 100%;
      font-size: smaller;
    }

    @media print {
      :host {
        margin: 0;
        box-shadow: none;
      }

      :host a {
        color: black;
        text-decoration: none;
      }
    }`
  }

  static get is() { return 'ink-page' }

  static get properties() {
    return {
      page: Number
    }
  }

  render() {
    return html`<slot></slot>`
  }

}

customElements.define(InkPage.is, InkPage)
