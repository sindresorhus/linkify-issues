import issueRegex from 'issue-regex';
import createHtmlElement from 'create-html-element';

/**
Generates a new regex that can be used with `String#split`. The resulting array will include the whole match, rather than dropping it.
*/
function prepareRegexForSplit(regex) {
	return new RegExp(`(${regex.source})`, regex.flags);
}

/**
Count the number of capturing groups in a regex.
*/
function countRegexGroups(regex) {
	return new RegExp(regex.source + '|').exec('').length;
}

function applyDefaults(options) {
	if (!(options?.user && options?.repository)) {
		throw new Error('Missing required `user` and `repository` options');
	}

	return {
		baseUrl: 'https://github.com',
		additionalPrefix: 'GH-',
		...options,
	};
}

// Generate URL for issue reference
const generateIssueUrl = (groups, options) => {
	const {
		organization = options.user,
		repository = options.repository,
		issueNumber,
	} = groups;

	return `${options.baseUrl}/${organization}/${repository}/issues/${issueNumber}`;
};

// Get HTML link as string
const linkifyToHtml = (reference, groups, options) => {
	const href = generateIssueUrl(groups, options);

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

// Get Markdown link as string
const linkifyToMarkdown = (reference, groups, options) => {
	const href = generateIssueUrl(groups, options);

	return `[${reference}](${href})`;
};

// Get DOM node from HTML
const domify = html => document.createRange().createContextualFragment(html);

export function linkifyIssuesToHtml(string, options) {
	options = applyDefaults(options);

	const regex = issueRegex(options);
	return string.replace(regex, (reference, ...matchData) => linkifyToHtml(reference, matchData.at(-1), options));
}

export function linkifyIssuesToDom(string, options) {
	options = applyDefaults(options);

	const regex = prepareRegexForSplit(issueRegex(options));
	const parts = string.split(regex);
	// `parts` is an array that looks like:
	// [
	// 	'Fixes ',                               // Initial string, or ''
	// 	'user#123', 'user', undefined, '#123',  // Reference + capture groups
	// 	' and ',                                // repeat
	// 	'foo/repo#3', 'foo', 'repo', '#3',      // repeat
	// 	'.',                                    // closing string, or ''
	// ]

	const groupsCount = countRegexGroups(regex);
	const fragment = document.createDocumentFragment();

	// Iterate the array "one full match" at a time
	for (let index = 0; index < parts.length - 1; index += groupsCount) {
		// Non-matching string before each reference, or ''
		fragment.append(parts[index]);

		const reference = parts[index + 1];
		const groups = {
			organization: parts[index + 2],
			repository: parts[index + 3],
			issueNumber: parts[index + 4],
		};

		fragment.append(domify(linkifyToHtml(reference, groups, options)));
	}

	// Closing string
	fragment.append(parts.at(-1));

	return fragment;
}

export function linkifyIssuesToMarkdown(string, options) {
	options = applyDefaults(options);

	const regex = issueRegex(options);
	return string.replace(regex, (reference, ...matchData) => linkifyToMarkdown(reference, matchData.at(-1), options));
}
