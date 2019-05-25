# Ink Elements [![Build Status](https://travis-ci.org/ink-elements/ink-elements.svg?branch=master)](https://travis-ci.org/ink-elements/ink-elements)

Custom elements for publishing documents via HTML and CSS. Requires use of [paged.js](https://www.pagedmedia.org/paged-js/) Paged Media polyfill.

## Demo

[Check it live!](http://ink-elements.github.io/ink-elements)

## Install

Install the component:

```sh
$ npm install ink-elements --save
```

Or [download as ZIP](https://github.com/ink-elements/ink-elements/archive/master.zip).

## Usage

1. Import polyfills:

```html
<script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>
<script src="node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
```

2. Import custom element:

```html
<script type="module" src="node_modules/ink-elements/ink-page-ref.js"></script>
```

3. Start using it!

```html
<p>See page <ink-page-ref ref="html-id"></ink-page-ref> for more information.</p>;
```

## Development

In order to run, test and modify this project locally you'll need to follow these steps:

1.  Install pre-requisites for Polymer CLI (git, npm, Node.js).

    [Full instructions are on the Polymer website.](https://www.polymer-project.org/3.0/docs/tools/polymer-cli).

2.  Install Polymer CLI:

        npm install -g polymer-cli@next

    [Full instructions are on the Polymer website.](https://www.polymer-project.org/3.0/docs/tools/polymer-cli).

3.  Clone this repo:

        git clone https://github.com/ink-elements/ink-elements.git

4.  Change directory to the top-level project folder and install project dependencies:

        cd ink-elements
        npm install

5.  To preview your element, run the Polymer development server from the top-level project folder:

        polymer serve --open

6.  To verify code style run:

        yarn build

## License

[MIT License](http://opensource.org/licenses/MIT)
