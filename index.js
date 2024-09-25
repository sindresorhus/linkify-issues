import issueRegex from 'issue-regex';
import createHtmlElement from 'create-html-element';

function createRegex(options) {
	return issueRegex({additionalPrefix: 'GH-', ...options});
}

function prepareRegexForSplit(regex) {
	// By wrapping the regex in a group, `.split` will include the match in the split array, rather than dropping it
	return new RegExp(`(${regex.source})`, 'g');
}

/** Count the number of capturing groups in a regex */
function countRegexGroups(regex) {
	return new RegExp(regex.source + '|').exec('').length;
}

function validateOptions(options) {
	if (!(options?.user && options?.repository)) {
		throw new Error('Missing required `user` and `repository` options');
	}
}

// Get `<a>` element as string
const linkify = (reference, regex, options) => {
	// Reset global regex index
	regex.lastIndex = 0;

	const {
		organization = options.user,
		// Optional repository isn't actually supported by the regex:
		// https://github.com/sindresorhus/issue-regex/issues/17
		repository = options.repository,
		issueNumber,
	} = regex.exec(reference).groups;

	const href = `${options.baseUrl ?? 'https://github.com'}/${organization}/${repository}/issues/${issueNumber}`;

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
	validateOptions(options);

	const regex = createRegex(options);
	return string.replace(regex, match => linkify(match, regex, options));
}

export function linkifyIssuesToDom(string, options) {
	validateOptions(options);

	const regex = prepareRegexForSplit(createRegex(options));
	const parts = string.split(regex);

	const groupsCount = countRegexGroups(regex);
	const fragment = document.createDocumentFragment();

	for (const [index, text] of parts.entries()) {
		if (index % groupsCount === 1) { // At position `groupsCount` n + 1 is the issue
			fragment.append(domify(linkify(text, regex, options)));
		} else if (index % groupsCount === 0 && text.length > 0) { // At position `groupsCount` n + 0 is what doesn't match the regex
			fragment.append(text);
		}
	}

	return fragment;
}
