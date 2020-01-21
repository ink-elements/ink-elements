import { LitElement, html, css } from 'lit-element'

class InkPageCrossReference extends LitElement {

  static get styles() {
    return css`
    :host {
      display: inline;
    }`
  }

  static get is() { return 'ink-page-xref' }

  static get properties() {
    return {
      ref: String,
      pageReference: String
    }
  }

  render() {
    return html`<a href="#${this.ref}">${this.pageReference}</a>`
  }

  connectedCallback() {
    super.connectedCallback()
    const inkDocument = document.querySelector('ink-doc')
    if (inkDocument) inkDocument.addEventListener('paged-doc', this.__onPagedDocument.bind(this))
  }

  __onPagedDocument(event) {
    this.__updateReference(event.flow.pagesArea)
  }

  __updateReference(content) {
    const element = content.querySelector(`#${this.ref}`)
    const page = element.closest('div[class~="pagedjs_page"]')

    if (page && page.getAttribute('data-page-number')) {
      const number = page.getAttribute('data-page-number')
      this.pageReference = number
    } else {
      console.error('[<ink-page-xref>] Could not find page for reference "' + this.ref + '" in document')
    }
  }
}

customElements.define(InkPageCrossReference.is, InkPageCrossReference)
