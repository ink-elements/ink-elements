import { LitElement, html, css } from 'lit-element'

class InkPageReference extends LitElement {

  static get styles() {
    return css`
    :host {
      display: inline;
    }`
  }

  static get is() { return 'ink-page-ref' }

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
  }

}

customElements.define(InkPageReference.is, InkPageReference)
