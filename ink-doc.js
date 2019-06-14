import { LitElement, html, css } from 'lit-element'
import { Previewer } from '../pagedjs/dist/paged.esm.js'

class PagedDocument extends Event {
  constructor(name, flow) {
    super(name)
    this.flow = flow
  }
}

class InkDocument extends LitElement {

  static get styles() {
    return css`
    @page {
      size: A4
    }

    #document {
      display: none;
    }`
  }

  static get is() { return 'ink-doc' }

  render() {
    return html`
    <div id="document">
      <slot></slot>
    </div>`
  }

  connectedCallback() {
    super.connectedCallback()
    const paged = new Previewer()
    paged.preview(document.querySelector('ink-doc').innerHTML).then((flow) => {
      this.dispatchEvent(new PagedDocument('paged-doc', flow))
    })

  }

}

customElements.define(InkDocument.is, InkDocument)
