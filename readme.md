# linkify-issues

> Linkify GitHub issue references

## Install

```sh
npm install linkify-issues
```

## Usage

```js
import {linkifyIssuesToHtml} from 'linkify-issues';

linkifyIssuesToHtml('Fixes #143 and avajs/ava#1023', {
	user: 'sindresorhus',
	repository: 'dofle',
	attributes: {
		class: 'unicorn',
		multiple: ['a', 'b'],
		number: 1,
		exclude: false,
		include: true
	}
});
//=> 'Fixes <a href="https://github.com/sindresorhus/dofle/issues/143" class="unicorn" multiple="a b" number="1" include>#143</a> and <a href="https://github.com/avajs/ava/issues/1023" class="unicorn" multiple="a b" number="1" include>avajs/ava#1023</a>'
```

```js
import {linkifyIssuesToMarkdown} from 'linkify-issues';

linkifyIssuesToMarkdown('Fixes #143 and avajs/ava#1023', {
	user: 'sindresorhus',
	repository: 'dofle'
});
//=> 'Fixes [#143](https://github.com/sindresorhus/dofle/issues/143) and [avajs/ava#1023](https://github.com/avajs/ava/issues/1023)'
```

```js
import {linkifyIssuesToDom} from 'linkify-issues';

const fragment = linkifyIssuesToDom('See #143', {
	user: 'sindresorhus',
	repository: 'dofle',
	attributes: {
		class: 'unicorn',
	}
});

document.body.appendChild(fragment);
```

## API

### linkifyIssuesToHtml(string, options)

Returns an HTML string like `'See <a href="https://github.com/sindresorhus/dofle/issues/143">#143</a>'`.

#### string

Type: `string`

A string with issue references to linkify.

#### options

Type: `object`

##### user

**Required**\
Type: `string`

GitHub user.

##### repository

**Required**\
Type: `string`

GitHub repository.

##### attributes

Type: `object`

HTML attributes to add to the link.

##### baseUrl

Type: `string`\
Default: `'https://github.com'`

The base URL.

##### additionalPrefix

Type: `string | undefined`\
Default: `'GH-'`

Additional reference prefix to support. It can be set to `undefined` to disable the default.

```js
linkifyIssuesToHtml('Will not linkify GH-123', {
	user: 'sindresorhus',
	repository: 'dofle',
	additionalPrefix: undefined
});
// => 'Will not linkify GH-123'
```

```js
linkifyIssuesToHtml('Will link SOUP:235 but not GH-123', {
	user: 'sindresorhus',
	repository: 'dofle',
	additionalPrefix: 'SOUP:'
});
// => 'Will link <a href="https://github.com/sindresorhus/dofle/issues/235">SOUP:235</a> but not GH-123'
```

> [!NOTE]
> The prefix is added unescaped to the regex, keep it simple.

### linkifyIssuesToMarkdown(string, options)

Returns a Markdown string like `'See [#143](https://github.com/sindresorhus/dofle/issues/143)'`.

#### string

Type: `string`

A string with issue references to linkify.

#### options

See [options](#options) above.

### linkifyIssuesToDom(string, options)

Returns a `DocumentFragment` ready to be appended in a DOM safely, like `DocumentFragment(TextNode('See '), HTMLAnchorElement('#143'))`.

This only works in the browser.

#### options

See [options](#options) above.

## Related

- [issue-regex](https://github.com/sindresorhus/issue-regex) - Regular expression for matching issue references
- [linkify-urls](https://github.com/sindresorhus/linkify-urls) - Linkify URLs in text
