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
      titles: Array
    }
  }

  connectedCallback() {
    super.connectedCallback()

    window.PagedConfig = {
      before: this.createTableOfContents({
        content: window.document.querySelector(this.ref),
        titleElements: JSON.parse(this.titles)
      })
    }
  }

  createTableOfContents(config) {
    const content = config.content;
    const titleElements = config.titleElements;

    let tocElementDiv = this.shadowRoot;
    let tocUl = document.createElement("ul");
    tocUl.id = "list-toc-generated";
    tocElementDiv.appendChild(tocUl);

    // add class to all title elements
    let tocElementNbr = 0;
    for(var i= 0; i < titleElements.length; i++){

      let titleHierarchy = i + 1;
      let titleElement = content.querySelectorAll(titleElements[i]);


      titleElement.forEach(function(element) {

          // add classes to the element
          element.classList.add("title-element");
          element.setAttribute("data-title-level", titleHierarchy);

          // add id if doesn't exist
          tocElementNbr++;
          const idElement = element.id;
          if(idElement == ''){
              element.id = 'title-element-' + tocElementNbr;
          }
          let newIdElement = element.id;

      });

    }

    // create toc list
    let tocElements = content.querySelectorAll(".title-element");

    for(var i= 0; i < tocElements.length; i++){
        let tocElement = tocElements[i];

        let tocNewLi = document.createElement("li");

        // Add class for the hierarcy of toc
        tocNewLi.classList.add("toc-element");
        tocNewLi.classList.add("toc-element-level-" + tocElement.dataset.titleLevel);

        // Keep class of title elements
        let classTocElement = tocElement.classList;
        for(var n= 0; n < classTocElement.length; n++){
            if(classTocElement[n] != "title-element"){
                tocNewLi.classList.add(classTocElement[n]);
            }
        }

        // Create the element
        tocNewLi.innerHTML = '<a href="#' + tocElement.id + '">' + tocElement.innerHTML + '</a>';
        tocUl.appendChild(tocNewLi);
    }

  }

}

customElements.define(InkTableOfContents.is, InkTableOfContents)
