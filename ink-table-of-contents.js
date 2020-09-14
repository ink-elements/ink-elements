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

  updateTableOfContents() {
    this.requestUpdate()
  }

  render() {
    const findHeaders = (el) => Array.from(el.querySelectorAll('h1,h2,h3,h4,h5,h6'))

    const contents = window.document.querySelectorAll(this.ref)
    const titles = Array.from(contents).map(findHeaders).flat()

    const headersRange =
      titles
        .map((el) => el.tagName)
        .map((h) => /H(\d{1})/.exec(h))
        .filter((re) => re)
        .map((re) => re[1])
        .map((strInt) => parseInt(strInt))

    const titlesWithLevel =
      headersRange
        .map((level, i) => [titles[i], level])

    const highestLevel = Math.min(...headersRange) + parseInt(this.depth) - 1

    const boundedTitlesWithLevel =
      titlesWithLevel
        .filter((entry) => entry[1] <= highestLevel)

    return html`
      <ul id="table-of-contents">
        ${boundedTitlesWithLevel.map((tl) => this.renderEntry(tl[0], tl[1]))}
      <ul>
    `
  }

  renderEntry(el, level) {
    return html`<li class="entry level-${level}"><a href="#${el.id}">${el.innerHTML}</a></li>`
  }

}

customElements.define(InkTableOfContents.is, InkTableOfContents)
