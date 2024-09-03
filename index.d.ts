import {HTMLAttributes} from 'create-html-element';

export interface Options {
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
}

/**
Linkify GitHub issue references.

@param string - A string with issue references to linkify, returns an HTML string.

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

@example
```
import {linkifyIssuesToDom} from 'linkify-issues';

const fragment = linkifyUrls('See #143', {
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
