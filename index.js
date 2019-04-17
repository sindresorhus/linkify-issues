'use strict';
const issueRegex = require('issue-regex');
const createHtmlElement = require('create-html-element');

const groupedIssueRegex = new RegExp(`(${issueRegex().source})`, 'g');

// Get `<a>` element as string
const linkify = (match, options) => {
	const fullReference = match.replace(/^#/, `${options.user}/${options.repository}#`);
	const [userRepository, issue] = fullReference.split('#');
	const href = `${options.baseUrl}/${userRepository}/issues/${issue}`;

	return createHtmlElement({
		name: 'a',
		// First `href` is needed for the `href` attribute to be the first attribute on the `a` tag
		attributes: {href: '', ...options.attributes, href}, // eslint-disable-line no-dupe-keys
		text: match
	});
};

// Get DOM node from HTML
const domify = html => document.createRange().createContextualFragment(html);

const getAsString = (text, options) => {
	return text.replace(groupedIssueRegex, match => linkify(match, options));
};

const getAsDocumentFragment = (text, options) => {
	return text.split(groupedIssueRegex).reduce((fragment, text, index) => {
		if (index % 2) { // URLs are always in odd positions
			fragment.append(domify(linkify(text, options)));
		} else if (text.length > 0) {
			fragment.append(document.createTextNode(text));
		}

		return fragment;
	}, document.createDocumentFragment());
};

module.exports = (text, options) => {
	options = {
		attributes: {},
		baseUrl: 'https://github.com',
		type: 'string',
		...options
	};

	if (!(options.user && options.repository)) {
		throw new Error('Missing required `user` and `repository` options');
	}

	if (options.type === 'string') {
		return getAsString(text, options);
	}

	if (options.type === 'dom') {
		return getAsDocumentFragment(text, options);
	}

	throw new Error('The type option must be either dom or string');
};
