/// <reference lib="dom"/>

declare namespace linkifyIssues {
	interface Options {
		/**
		GitHub user.
		*/
		user: string;

		/**
		GitHub repository.
		*/
		repository: string;

		/**
		HTML attributes to add to the link.
		*/
		attributes?: {
			[attributeName: string]: string | number | boolean | readonly string[];
		};

		/**
		Base URL.

		@default 'https://github.com'
		*/
		baseUrl?: string;

		/**
		Format of the generated content.

		`'string'` will return it as a flat string like `'See <a href="https://github.com/sindresorhus/dofle/issue/143">#143</a>'`.

		`'dom'` will return it as a `DocumentFragment` ready to be appended in a DOM safely, like `DocumentFragment(TextNode('See '), HTMLAnchorElement('#143'))`. This type only works in the browser.

		@default 'string'
		*/
		type?: 'string' | 'dom';
	}

	interface TypeDomOptions extends Options {
		type: 'dom';
	}
}

/**
Linkify GitHub issue references.

@param string - String with issue references to linkify.

@example
```
import linkifyIssues = require('linkify-issues');

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
declare function linkifyIssues(
	string: string,
	options: linkifyIssues.TypeDomOptions
): DocumentFragment;
declare function linkifyIssues(
	string: string,
	options?: linkifyIssues.Options
): string;

export = linkifyIssues;
