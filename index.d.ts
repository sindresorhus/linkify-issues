import {type HTMLAttributes} from 'create-html-element';

export type Options = {
	/**
	GitHub user.
	*/
	readonly user: string;

	/**
	GitHub repository.
	*/
	readonly repository: string;

	/**
	HTML attributes to add to the link.
	*/
	readonly attributes?: HTMLAttributes;

	/**
	The base URL.

	@default 'https://github.com'
	*/
	readonly baseUrl?: string;

	/**
	Additional reference prefix to support. It can be set to `undefined` to disable the default.

	@default 'GH-'

	@example
	```
	linkifyIssuesToHtml('Will not linkify GH-123', {
		user: 'sindresorhus',
		repository: 'dofle',
		additionalPrefix: undefined
	});
	// => 'Will not linkify GH-123'
	```

	@example
	```
	linkifyIssuesToHtml('Will link SOUP:235 but not GH-123', {
		user: 'sindresorhus',
		repository: 'dofle',
		additionalPrefix: 'SOUP:'
	});
	// => 'Will link <a href="https://github.com/sindresorhus/dofle/issues/235">SOUP:235</a> but not GH-123'
	```

	- Note: The prefix is added unescaped to the regex, keep it simple.
	*/
	readonly additionalPrefix?: string | undefined;
};

/**
Linkify GitHub issue references, returns an HTML string.

@param string - A string with issue references to linkify

@returns An HTML string like `'See <a href="https://github.com/sindresorhus/dofle/issues/143">#143</a>'`.

@example
```
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
*/
export function linkifyIssuesToHtml(
	string: string,
	options: Options
): string;

/**
Linkify GitHub issue references, returns a `DocumentFragment`.

@param string - A string with issue references to linkify.

@returns A `DocumentFragment` ready to be appended in a DOM safely, like `DocumentFragment(TextNode('See '), HTMLAnchorElement('#143'))`. This type only works in the browser.

@example
```
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
*/
export function linkifyIssuesToDom(
	string: string,
	options: Options
): DocumentFragment;

/**
Linkify GitHub issue references, returns a Markdown string.

@param string - A string with issue references to linkify.

@returns A Markdown string like `'See [#143](https://github.com/sindresorhus/dofle/issues/143)'`.

@example
```
import {linkifyIssuesToMarkdown} from 'linkify-issues';

linkifyIssuesToMarkdown('Fixes #143 and avajs/ava#1023', {
	user: 'sindresorhus',
	repository: 'dofle'
});
//=> 'Fixes [#143](https://github.com/sindresorhus/dofle/issues/143) and [avajs/ava#1023](https://github.com/avajs/ava/issues/1023)'
```
*/
export function linkifyIssuesToMarkdown(
	string: string,
	options: Options
): string;

export {HTMLAttributes} from 'create-html-element';
