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
const linkify = (reference, groups, options) => {
	const {
		organization = options.user,
		// Optional repository isn't actually supported by the regex:
		// https://github.com/sindresorhus/issue-regex/issues/17
		repository = options.repository,
		issueNumber,
	} = groups;

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
	return string.replace(regex, (reference, ...matchData) => linkify(reference, matchData.at(-1), options));
}

export function linkifyIssuesToDom(string, options) {
	validateOptions(options);

	const regex = prepareRegexForSplit(createRegex(options));
	const parts = string.split(regex);

	const groupsCount = countRegexGroups(regex);
	const fragment = document.createDocumentFragment();

	for (let index = 0; index < parts.length - 1; index += groupsCount) {
		fragment.append(parts[index]);

		const reference = parts[index + 1];
		const groups = {
			organization: parts[index + 2],
			repository: parts[index + 3],
			issueNumber: parts[index + 4],
		};

		fragment.append(domify(linkify(reference, groups, options)));
	}

	// Last lone string
	fragment.append(parts.at(-1));

	return fragment;
}
