'use strict';
const issueRegex = require('issue-regex');
const createHtmlElement = require('create-html-element');

const groupedIssueRegex = new RegExp(`(${issueRegex().source})`, 'g');

// Get `<a>` element as string
const linkify = (match, options) => {
	const fullReference = match.replace(/^#/, `${options.user}/${options.repo}#`);
	const [userRepo, issue] = fullReference.split('#');
	const href = `${options.baseUrl}/${userRepo}/issues/${issue}`;

	return createHtmlElement({
		name: 'a',
		attributes: Object.assign({href: ''}, options.attributes, {href}),
		value: match
	});
};

// Get DOM node from HTML
const domify = html => document.createRange().createContextualFragment(html);

const getAsString = (input, options) => {
	return input.replace(groupedIssueRegex, match => linkify(match, options));
};

const getAsDocumentFragment = (input, options) => {
	return input.split(groupedIssueRegex).reduce((frag, text, index) => {
		if (index % 2) { // URLs are always in odd positions
			frag.appendChild(domify(linkify(text, options)));
		} else if (text.length > 0) {
			frag.appendChild(document.createTextNode(text));
		}

		return frag;
	}, document.createDocumentFragment());
};

module.exports = (input, options) => {
	options = Object.assign({
		attributes: {},
		baseUrl: 'https://github.com',
		type: 'string'
	}, options);

	if (!(options.user && options.repo)) {
		throw new Error('Missing required `user` and `repo` options');
	}

	if (options.type === 'string') {
		return getAsString(input, options);
	}

	if (options.type === 'dom') {
		return getAsDocumentFragment(input, options);
	}

	throw new Error('The type option must be either dom or string');
};
