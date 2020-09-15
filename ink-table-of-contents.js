import { LitElement, html, css } from 'lit-element'

export class InkTableOfContents extends LitElement {

  static get styles() {
    return css`
      table#table-of-contents {
        display: flex;
        flex-direction: column;
      }

      table#table-of-contents tr {
        display: flex;
        justify-content: space-between;
      }

      table#table-of-contents tr td.spacing {
        flex-grow: 2;

        background-image: radial-gradient(circle, currentcolor 1px, transparent 1px);
        background-position-y: bottom;
        background-size: 1ex 3px;
        background-repeat: repeat-x;
        height: 1em;
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

    const contents = Array.from(window.document.querySelectorAll(this.ref))
    const titles = contents.map(findHeaders).flat()
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
    if (!el.id) el.id = Math.random().toString(36).substring(7)
    return html`
      <tr class="entry level-${level}">
        <td class="title"><a href="#${el.id}">${el.innerHTML}</a></td>
        <td class="spacing"></td>
        <td class="page-number"><a href="#${el.id}">${pageNumber}</a></td>
      </tr>`
  }

}

customElements.define(InkTableOfContents.is, InkTableOfContents)
