import issueRegex from 'issue-regex';
import createHtmlElement from 'create-html-element';

const groupedIssueRegex = new RegExp(`(${issueRegex().source})`, 'g');

// Get `<a>` element as string
const linkify = (match, options) => {
	const fullReference = match.replace(/^#/, `${options.user}/${options.repository}#`);
	const [userRepository, issue] = fullReference.split('#');
	const href = `${options.baseUrl}/${userRepository}/issues/${issue}`;

	return createHtmlElement({
		name: 'a',
		// First `href` is needed for the `href` attribute to be the first attribute on the `a` tag
		attributes: {
			href: '',
			...options.attributes,
			href, // eslint-disable-line no-dupe-keys
		},
		text: match,
	});
};

// Get DOM node from HTML
const domify = html => document.createRange().createContextualFragment(html);

const getAsString = (string, options) => string.replace(groupedIssueRegex, match => linkify(match, options));

const getAsDocumentFragment = (string, options) => {
	const fragment = document.createDocumentFragment();
	const parts = string.split(groupedIssueRegex);

	for (const [index, text] of parts.entries()) {
		if (index % 5 === 1) { // Issues are always first in capturing group
			fragment.append(domify(linkify(text, options)));
		} else if (index % 5 === 0 && text.length > 0) { // Text is always in split position
			fragment.append(text);
		}
	}

	return fragment;
};

export default function linkifyIssues(string, options) {
	options = {
		attributes: {},
		baseUrl: 'https://github.com',
		type: 'string',
		...options,
	};

	if (!(options.user && options.repository)) {
		throw new Error('Missing required `user` and `repository` options');
	}

	if (options.type === 'string') {
		return getAsString(string, options);
	}

	if (options.type === 'dom') {
		return getAsDocumentFragment(string, options);
	}

	throw new TypeError('The `type` option must be either `dom` or `string`');
}
