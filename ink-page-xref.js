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
    if (inkDocument) inkDocument.addEventListener('paged-doc', this._onPagedDocument.bind(this))
  }

  _onPagedDocument(event) {
    this._updateReference(event.flow.pagesArea)
  }

  _updateReference(content) {
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
