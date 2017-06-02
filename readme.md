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
	repo: 'dofle',
	attributes: {
		class: 'unicorn'
	}
});
//=> 'Fixes <a href="https://github.com/sindresorhus/dofle/issues/143" class="unicorn">#143</a> and <a href="https://github.com/avajs/ava/issues/1023" class="unicorn">avajs/ava#1023</a>'
```


## API

### linkifyIssues(input, [options])

#### input

Type: `string`

Text with issue references to linkify.

#### options

Type: `Object`

##### user

Type: `string`

GitHub user.

##### repo

Type: `string`

GitHub repo.

##### attributes

Type: `Object`

HTML attributes to add to the link.


## Related

- [issue-regex](https://github.com/sindresorhus/issue-regex) - Regular expression for matching issue references
- [linkify-urls](https://github.com/sindresorhus/linkify-urls) - Linkify URLs in text


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
