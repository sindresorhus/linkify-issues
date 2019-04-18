# linkify-issues [![Build Status](https://travis-ci.org/sindresorhus/linkify-issues.svg?branch=master)](https://travis-ci.org/sindresorhus/linkify-issues)

> Linkify GitHub issue references


## Install

```
$ npm install linkify-issues
```


## Usage

```js
const linkifyIssues = require('linkify-issues');

linkifyIssues('Fixes #143 and avajs/ava#1023', {
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

const fragment = linkifyUrls('See #143', {
	user: 'sindresorhus',
	repository: 'dofle',
	type: 'dom',
	attributes: {
		class: 'unicorn',
	}
});
document.body.appendChild(fragment);
```


## API

### linkifyIssues(text, [options])

#### text

Type: `string`

Text with issue references to linkify.

#### options

Type: `object`

##### user

Type: `string`

GitHub user.

##### repository

Type: `string`

GitHub repository.

##### attributes

Type: `object`

HTML attributes to add to the link.

##### baseUrl

Type: `string`<br>
Default: `'https://github.com'`

Base URL.

##### type

Type: `string`<br>
Values: `'string'` `'dom'`<br>
Default: `'string'`

Format of the generated content.

`'string'` will return it as a flat string like `'See <a href="https://github.com/sindresorhus/dofle/issue/143">#143</a>'`.

`'dom'` will return it as a `DocumentFragment` ready to be appended in a DOM safely, like `DocumentFragment(TextNode('See '), HTMLAnchorElement('#143'))`. This type only works in the browser.


## Related

- [issue-regex](https://github.com/sindresorhus/issue-regex) - Regular expression for matching issue references
- [linkify-urls](https://github.com/sindresorhus/linkify-urls) - Linkify URLs in text


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
