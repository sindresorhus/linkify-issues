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
	*/
	readonly additionalPrefix?: string | undefined;
};

/**
Linkify GitHub issue references, returns an HTML string.

@param string - A string with issue references to linkify

@returns An HTML string like `'See <a href="https://github.com/sindresorhus/dofle/issue/143">#143</a>'`.

@example
```
import linkifyIssues from 'linkify-issues';

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
```
*/
export function linkifyIssuesToHtml(
	string: string,
	options?: Options
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
	options?: Options
): DocumentFragment;

export {HTMLAttributes} from 'create-html-element';
