import { PolymerElement, html } from '../@polymer/polymer/polymer-element.js';
import './ink-page.js';
import './ink-page-ref.js';

class InkDocument extends PolymerElement {

  static get template() {
    return html`
    <style>
      @media print {
        @page {
          size: A4;
        }
      }
    </style>

    <slot></slot>`;
  }

  static get is() { return 'ink-doc'; }

  ready() {
    var pages = this.querySelectorAll('ink-page');

    pages.forEach(function(page, index) {
      var pageNumber = index + 1;
      page.setAttribute('number', pageNumber);
    });
  }

}

customElements.define(InkDocument.is, InkDocument);
