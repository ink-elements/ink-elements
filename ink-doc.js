import { LitElement, html, css } from 'lit-element'
import './ink-page.js'
import './ink-page-ref.js'

class InkDocument extends LitElement {

  static get styles() {
    return css`
    @page {
      size: A4
    }`
  }

  static get is() { return 'ink-doc' }

  render() {
    return html`<div><slot></slot></div>`
  }

  connectedCallback() {
    super.connectedCallback()
    const pages = this.querySelectorAll('ink-page')

    pages.forEach(function(page, index) {
      var pageNumber = index + 1
      page.setAttribute('number', pageNumber)
    })

    const pagedDoc = new CustomEvent('paged-doc', {})
    this.dispatchEvent(pagedDoc)
  }

}

customElements.define(InkDocument.is, InkDocument)
