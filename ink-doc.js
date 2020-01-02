import { LitElement, html, css } from 'lit-element'
import './ink-page-xref.js'
import { Previewer } from '../pagedjs/dist/paged.esm.js'

class PagedDocument extends CustomEvent {
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
    }`
  }

  static get is() { return 'ink-doc' }

  render() {
    return html`
    <div id="document">
    </div>`
  }

  get shadowDocument() {
    return this.shadowRoot.getElementById('document')
  }

  connectedCallback() {
    super.connectedCallback()
    const paged = new Previewer()
    const stylesheets = Array.from(document.styleSheets).map(css => css.href)

    paged.preview(document.querySelector('ink-doc').innerHTML, stylesheets, this.shadowDocument).then((flow) => {
      document.querySelector('ink-doc').remove()
      this.dispatchEvent(new PagedDocument('paged-doc', flow))
    })
  }

}

customElements.define(InkDocument.is, InkDocument)
