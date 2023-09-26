import issueRegex from 'issue-regex';
import createHtmlElement from 'create-html-element';

const groupedIssueRegex = new RegExp(`(${issueRegex().source})`, 'g');
const issueRegexGroups = new RegExp(groupedIssueRegex.source + '|').exec('').length; // Number of capturing groups in regex

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
	const parts = string.split(groupedIssueRegex); // All regex groups appear in the split string

	for (const [index, text] of parts.entries()) {
		if (index % issueRegexGroups === 1) { // At position issueRegexGroups n + 1 is the issue
			fragment.append(domify(linkify(text, options)));
		} else if (index % issueRegexGroups === 0 && text.length > 0) { // At position issueRegexGroups n + 0 is what doesn't match the regex
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
