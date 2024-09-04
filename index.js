import issueRegex from 'issue-regex';
import createHtmlElement from 'create-html-element';

const groupedIssueRegex = new RegExp(`(${issueRegex().source})`, 'g');
const issueRegexGroups = new RegExp(groupedIssueRegex.source + '|').exec('').length; // Number of capturing groups in regex

function parseOptions(options) {
	if (!(options?.user && options?.repository)) {
		throw new Error('Missing required `user` and `repository` options');
	}

	return {
		attributes: {},
		baseUrl: 'https://github.com',
		...options,
	};
}

// Get `<a>` element as string
const linkify = (reference, options) => {
	const {
		organization = options.user,
		// Optional repository isn't actually supported by the regex:
		// https://github.com/sindresorhus/issue-regex/issues/17
		repository = options.repository,
		issueNumber,
	} = issueRegex().exec(reference).groups;

	const href = `${options.baseUrl}/${organization}/${repository}/issues/${issueNumber}`;

	return createHtmlElement({
		name: 'a',
		// First `href` is needed for the `href` attribute to be the first attribute on the `a` tag
		attributes: {
			href: '',
			...options.attributes,
			href, // eslint-disable-line no-dupe-keys
		},
		text: reference,
	});
};

// Get DOM node from HTML
const domify = html => document.createRange().createContextualFragment(html);

export function linkifyIssuesToHtml(string, options) {
	options = parseOptions(options);
	return string.replace(groupedIssueRegex, match => linkify(match, options));
}

export function linkifyIssuesToDom(string, options) {
	options = parseOptions(options);
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
}
