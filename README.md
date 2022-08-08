# Generate Table Of Contents HTML

A package for creating table of contents in HTML using vanilla.js
<br />
See [online demo](https://jsfiddle.net/masyoudi/et71wsg4/60/)

## Installation

```
npm install toc-parser --save
```

## Usage

Define `data-toc` on your html.

```HTML
<div id="table-of-contents"></div>
<div class="content">
  <div data-toc="1">Title 1</div>
  <p>Example paragraph</p>
  <div data-toc="2">Sub Title 1.1</div>
  <p>Example paragraph</p>
  <div data-toc="3">Sub Title 1.1.1</div>
  <p>Example paragraph</p>
  <div data-toc="1">Title 2</div>
  <p>Example paragraph</p>
  <div data-toc="1">Title 3</div>
  <div data-toc="2">Sub Title 3.1</div>
  <div data-toc="3">Sub Title 3.1.1</div>
  <p>Example paragraph</p>
</div>
```

Initialize the `TOCParser`

Using CommonJS

```JS
const { TOCParser } = require('toc-parser');
```

Using ES6

```JS
import TOCParser from 'toc-parser';
```

```JS
let options = {
  target: "#table-of-contents",
  customClass: {
    ol: 'ol-class',
    li: 'li-class',
    a: 'a-class'
  }
}
let toc = new TOCParser(".content", options);
toc.render();
```

- `".content"` {String} - The selector of HTML content do you want to generate table of contents
- `options` {Object} - Is an object which can contains:

| Options         | Description                                                                                                                |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **target**      | The selector of target to placing table of contents                                                                        |
| **customClass** | Is an object which can contain the keys `ol`, `li` and `a`<br/>This is useful to customize class on tag `ol`, `li` and `a` |

<br/>
Available functions

| Functions    | Description                                             |
| ------------ | ------------------------------------------------------- |
| **render()** | Function to render table of contents to specific target |
| **parse()**  | Function to get the HTML string                         |
