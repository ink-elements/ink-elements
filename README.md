# Ink Elements

Custom elements for publishing documents via HTML and CSS.

## Demo

[Check it live!](http://rgladwell.github.io/ink-elements)

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install ink-elements --save
```

Or [download as ZIP](https://github.com/rgladwell/ink-elements/archive/master.zip).

## Usage

1. Import polyfill:

    ```html
    <script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
    ```

2. Import custom element:

    ```html
    <link rel="import" href="bower_components/rgladwell/ink-doc.html">
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

In order to run it locally you'll need to fetch some dependencies and a basic server setup.

1. Install [bower](http://bower.io/) & [polyserve](https://npmjs.com/polyserve):

    ```sh
    $ npm install -g bower polyserve
    ```

2. Install local dependencies:

    ```sh
    $ bower install
    ```

3. Start development server and open `http://localhost:8080/components/ink-elements/`.

    ```sh
    $ polyserve
    ```

## License

[MIT License](http://opensource.org/licenses/MIT)
