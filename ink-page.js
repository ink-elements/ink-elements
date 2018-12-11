import { PolymerElement, html } from '../@polymer/polymer/polymer-element.js';

class InkPage extends PolymerElement {

  static get template() {
    return html`
    <style>
      :host {
        page-break-inside: avoid;
        display: block;
        background: white;
        box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
        width: 21cm;
        height: 29.68cm;
        margin: 1cm auto;
        padding: 1cm;
        overflow: hidden;
        position: relative;
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
      };

      @media print {
        :host {
          margin: 0;
          box-shadow: none;
        }

        :host a {
          color: black;
          text-decoration: none;
        }
      }
    </style>

    <slot></slot>`;
  }

  static get is() { return 'ink-page'; }

  static get properties() {
    return {
      page: Number
    };
  }
}

customElements.define(InkPage.is, InkPage);
