# Ink Elements

Custom elements for publishing documents via HTML and CSS.

## Demo

[Check it live!](http://rgladwell.github.io/ink-elements)

## Install

Install the component:

```sh
$ npm install ink-elements --save
```

Or [download as ZIP](https://github.com/rgladwell/ink-elements/archive/master.zip).

## Usage

1. Import polyfill:

```html
<script src="node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
```

2. Import custom element:

```html
<script type="module" src="node_modules/ink-elements/ink-doc.js"></script>
```

3. Start using it!

```html
<ink-doc>
  <ink-page>
    <h1>Title</h2>
  </ink-page>
  <ink-page>
    <h1>Chapter 1</h2>
  </ink-page>
</ink-doc>
```

## Development

In order to run, test and modify this project locally you'll need to follow these steps:

1.  Install pre-requisites for Polymer CLI (git, npm, Node.js).

    [Full instructions are on the Polymer website.](https://www.polymer-project.org/3.0/docs/tools/polymer-cli).

2.  Install Polymer CLI:

        npm install -g polymer-cli@next

    [Full instructions are on the Polymer website.](https://www.polymer-project.org/3.0/docs/tools/polymer-cli).

3.  Clone this repo:

        git clone https://github.com/rgladwell/ink-elements.git

4.  Change directory to the top-level project folder and install project dependencies:

        cd ink-elements
        npm install

5.  To preview your element, run the Polymer development server from the top-level project folder:

        polymer serve --open

## License

[MIT License](http://opensource.org/licenses/MIT)
