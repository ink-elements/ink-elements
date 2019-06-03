import { PolymerElement, html } from '../@polymer/polymer/polymer-element.js'
import { Previewer } from '../pagedjs/dist/paged.esm.js'

class PagedDocument extends Event {
  constructor(name, flow) {
    super(name)
    this.flow = flow
  }
}

class InkDocument extends PolymerElement {

  static get template() {
    return html`
    <style>
      @page {
        size: A4
      }

      #document {
        display: none;
      }
    </style>

    <div id="document">
      <slot></slot>
    </div>`
  }

  static get is() { return 'ink-doc' }

  ready() {
    super.ready()
    const paged = new Previewer()
    paged.preview(document.querySelector('ink-doc').innerHTML).then((flow) => {
      this.dispatchEvent(new PagedDocument('paged-doc', flow))
    })

  }

}

customElements.define(InkDocument.is, InkDocument)
