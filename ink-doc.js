import { LitElement, html, css } from 'lit-element'
import './ink-page.js'
import './ink-page-xref.js'

class InkDocument extends LitElement {

  static get styles() {
    return css`
    @page {
      size: A4
    }`
  }

  static get is() { return 'ink-doc' }

  constructor() {
    super()
    this._pageCount = 0
  }

  render() {
    return html`<div><slot></slot></div>`
  }

  connectedCallback() {
    super.connectedCallback()
    const doc = this
    const pages = doc.querySelectorAll('ink-page')

    pages.forEach(function(page, index) {
      if (page.id.trim().toLowerCase() !== 'cover') {
        doc._pageCount++
        page.setAttribute('number', doc._pageCount)
      }
    })

    const pagedDoc = new CustomEvent('paged-doc', {})
    this.dispatchEvent(pagedDoc)
  }

}

customElements.define(InkDocument.is, InkDocument)
