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

	/**
	The format of the generated content.

	`'string'` will return it as a flat string like `'See <a href="https://github.com/sindresorhus/dofle/issue/143">#143</a>'`.

	`'dom'` will return it as a `DocumentFragment` ready to be appended in a DOM safely, like `DocumentFragment(TextNode('See '), HTMLAnchorElement('#143'))`. This type only works in the browser.

	@default 'string'
	*/
	readonly type?: 'string' | 'dom';
}

export interface TypeDomOptions extends Options {
	readonly type: 'dom';
}

/**
Linkify GitHub issue references.

@param string - A string with issue references to linkify.

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
*/
export default function linkifyIssues(
	string: string,
	options: TypeDomOptions
): DocumentFragment;
export default function linkifyIssues(
	string: string,
	options?: Options
): string;

export {HTMLAttributes} from 'create-html-element';
