import { PolymerElement, html } from '../@polymer/polymer/polymer-element.js'
import { beforeNextRender } from '../@polymer/polymer/lib/utils/render-status.js'

class InkPageCrossReference extends PolymerElement {

  static get template() {
    return html`
    <style>
      :host {
        display: inline;
      }
    </style>

    <a href="#{{ref}}">{{pageReference}}</a>`
  }

  static get is() { return 'ink-page-xref' }

  static get properties() {
    return {
      ref: String,
      pageReference: String
    }
  }

  connectedCallback() {
    super.connectedCallback()

    beforeNextRender(this, () => {
      const element = document.getElementById(this.ref)
      const page = element.closest('div[class~="pagedjs_page"]')

      if (page && page.getAttribute('data-page-number')) {
        const number = page.getAttribute('data-page-number')
        this.pageReference = number
      } else {
        console.error('[ink-page-xref] Could not find page for reference "' + this.ref + '" in document')
      }
    })
  }

}

customElements.define(InkPageCrossReference.is, InkPageCrossReference)
