import { LitElement, html, css } from 'lit-element'

class InkTableOfContents extends LitElement {

  static get styles() {
    return css`
      #table-of-contents {
        display: table;
      }

      ul#table-of-contents {
        padding-left: 0;
        list-style: outside none none;
      }
    `
  }

  static get is() { return 'ink-table-of-contents' }

  static get properties() {
    return {
      ref: String,
      depth: Number
    }
  }

  connectedCallback() {
    super.connectedCallback()

    const hook = this.updateTableOfContents.bind(this)
    window.PagedPolyfill.hooks.afterPreview.hooks = [hook]
  }

  updateTableOfContents(pages) {
    this.requestUpdate()
  }

  render() {
    const findHeaders = (el) => Array.from(el.querySelectorAll('h1,h2,h3,h4,h5,h6'))

    const contents = window.document.querySelectorAll(this.ref)
    const titles = Array.from(contents).map(findHeaders).flat()

    return html`
      <ul id="table-of-contents">
        ${titles.map((node) => html`<li><a href="#${node.id}">${node.innerHTML}</a></li>`)}
      <ul>
    `
  }

}

customElements.define(InkTableOfContents.is, InkTableOfContents)
