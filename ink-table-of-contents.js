import { LitElement, html, css } from 'lit-element'

class InkTableOfContents extends LitElement {

  static get styles() {
    return css`
    `
  }

  static get is() { return 'ink-table-of-contents' }

  static get properties() {
    return {
      ref: String,
      depth: Number
    }
  }

  render() {
    const content = window.document.querySelectorAll(this.ref)
    console.log(content)
    const titles = Array.from(content[0].querySelectorAll('h1,h2,h3,h4,h5,h6'))

    return html`
      <ul>
        ${titles.map((node) => html`<li><a href="#${node.id}">${node.innerHTML}</a></li>`)}
      <ul>
    `
  }

}

customElements.define(InkTableOfContents.is, InkTableOfContents)
