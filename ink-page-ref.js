import { PolymerElement, html } from '../@polymer/polymer/polymer-element.js'
import { beforeNextRender } from '../@polymer/polymer/lib/utils/render-status.js'

class InkPageReference extends PolymerElement {

  static get template() {
    return html`
    <style>
      :host {
        display: inline;
      }
    </style>

    <a href="#{{ref}}">{{pageReference}}</a>`
  }

  static get is() { return 'ink-page-ref' }

  static get properties() {
    return {
      ref: String,
      pageReference: String
    }
  }

  connectedCallback() {
    super.connectedCallback()

    beforeNextRender(this, () => {
      function findParent(element, name) {
        if (element.tagName.toLowerCase() === name.toLowerCase()) return element
        else return findParent(element.parentNode, name)
      }

      const element = document.getElementById(this.ref)
      const page = findParent(element, 'ink-page')

      if (page && page.getAttribute('number')) {
        const number = page.getAttribute('number')
        this.pageReference = number
      } else {
        console.error('[ink-page-ref] Could not find page for reference "' + this.ref + '" in document')
      }
    })
  }

}

customElements.define(InkPageReference.is, InkPageReference)
