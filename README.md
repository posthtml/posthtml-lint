# posthtml-lint <img align="right" width="220" height="200" title="PostHTML logo" src="http://posthtml.github.io/posthtml/logo.svg">

[![NPM][npm]][npm-url]
[![Deps][deps]][deps-url]
[![Build][build]][build-badge]
[![Coverage][codecov-shield]][codecov]

`posthtml-lint` is a [PostHTML](https://github.com/posthtml/posthtml) plugin to lint static markup.

Currently supported rules include `no-duplicate-ids`, `no-duplicate-tags`, `no-empty-tags` and `no-missing-attributes`.

### [Changelog](CHANGELOG.md)

**Before:**

```html
<head>
  <title>Title</title>
  <title>Title</title>
</head>
<body>
  <a>Link</a>
</body>
```

**After:**

```bash
# Output printed to the terminal
There are ...
```

## Install

```bash
yarn add -D posthtml-lint
# OR
npm i posthtml-lint
```

## Usage

```js
const fs = require('fs');
const posthtml = require('posthtml');
const { lint } = require('posthtml-lint');

const html = fs.readFileSync('./index.html');

posthtml()
  .use(lint())
  .process(html)
  .then(result => fs.writeFileSync('./after.html', result.html));
```

### Options

| Name                  | Kind                       | Description                                                                   |
| --------------------- | -------------------------- | ----------------------------------------------------------------------------- |
| `noDuplicateIds`      | `boolean` (default `true`) | Disallow duplicate ids                                                        |
| `noDuplicateTags`     | `boolean` (default `true`) | Disallow duplicate occurrences of the `html`, `head`, `title` and `body` tags |
| `noEmptyTags`         | `boolean` (default `true`) | Disallow empty tags for tags that are not self-closing                        |
| `noMissingAttributes` | `boolean` (default `true`) | Disallow tags with missing required attributes.                               |

### Contributing

See [PostHTML Guidelines](https://github.com/posthtml/posthtml/tree/master/docs) and [contribution guide](CONTRIBUTING.md).

### License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/posthtml-lint.svg?color=blue
[npm-url]: https://npmjs.com/package/posthtml-lint
[deps]: https://david-dm.org/metonym/posthtml-lint.svg
[deps-url]: https://david-dm.org/metonym/posthtml-lint
[build]: https://travis-ci.com/metonym/posthtml-lint.svg?branch=master
[build-badge]: https://travis-ci.com/metonym/posthtml-lint
[codecov]: https://codecov.io/gh/metonym/posthtml-lint
[codecov-shield]: https://img.shields.io/codecov/c/github/metonym/posthtml-lint.svg
