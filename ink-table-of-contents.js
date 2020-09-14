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

  static pageNumber(element) {
    const page = element.closest('div[class~="pagedjs_page"]')

    if (page && page.getAttribute('data-page-number')) {
      return page.getAttribute('data-page-number')
    } else {
      console.error(`[<ink-table-of-contents>] Could not find page for reference ${element.id} in document`)
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
    const pageNumbers = titles.map(InkTableOfContents.pageNumber)

    const headersRange =
      titles
        .map((el) => el.tagName)
        .map((h) => /H(\d{1})/.exec(h))
        .filter((re) => re)
        .map((re) => re[1])
        .map((strInt) => parseInt(strInt))

    const titlesWithLevelAndPageNumbers =
      headersRange
        .map((level, i) => [titles[i], level, pageNumbers[i]])

    const highestLevel = Math.min(...headersRange) + parseInt(this.depth) - 1

    const boundedTitlesWithLevel =
      titlesWithLevelAndPageNumbers
        .filter((entry) => entry[1] <= highestLevel)

    return html`
      <table id="table-of-contents">
        ${boundedTitlesWithLevel.map((tl) => this.renderEntry(tl[0], tl[1], tl[2]))}
      <table>
    `
  }

  renderEntry(el, level, pageNumber) {
    return html`
      <tr class="entry level-${level}">
        <td><a href="#${el.id}">${el.innerHTML}</a></td>
        <td><a href="#${el.id}">Page ${pageNumber}</a></td>
      </tr>`
  }

}

customElements.define(InkTableOfContents.is, InkTableOfContents)
