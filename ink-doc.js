import { LitElement, html, css } from 'lit-element'
import './ink-page-xref.js'
import { Previewer } from 'pagedjs/dist/paged.esm.js'

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

    const customElements = document.querySelector('html-import')
    customElements.addEventListener('wc-ready', this.pageDocument)
  }

  pageDocument() {
    console.log('pageDocument()')
    const paged = new Previewer()
    const stylesheets = Array.from(document.styleSheets).map(css => css.href)

    const html = document.querySelector('ink-doc').innerHTML
    paged.preview(html, stylesheets, this.shadowDocument).then((flow) => {
      this.dispatchEvent(new PagedDocument('paged-doc', flow))
    })
  }

}

customElements.define(InkDocument.is, InkDocument)
