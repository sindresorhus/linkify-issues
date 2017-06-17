'use strict';
const issueRegex = require('issue-regex');
const createHtmlElement = require('create-html-element');

module.exports = (input, options) => {
	options = Object.assign({
		attributes: {},
		baseUrl: 'https://github.com'
	}, options);

	if (!(options.user && options.repo)) {
		throw new Error('Missing required `user` and `repo` options');
	}

	return input.replace(issueRegex(), match => {
		let url = `${options.baseUrl}/`;
		if (match.includes('/')) {
			const parts = match.split('#');
			url += `${parts[0]}/issues/${parts[1]}`;
		} else {
			url += `${options.user}/${options.repo}/issues/${match.slice(1)}`;
		}

		return createHtmlElement({
			name: 'a',
			attributes: Object.assign({href: ''}, options.attributes, {href: url}),
			value: match
		});
	});
};
