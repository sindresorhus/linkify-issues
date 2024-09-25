import test from 'ava';
import jsdom from 'jsdom';
import {linkifyIssuesToHtml, linkifyIssuesToDom} from './index.js';

const dom = new jsdom.JSDOM();
globalThis.window = dom.window;
globalThis.document = dom.window.document;

/** Get HTML from DOM node */
function html(dom) {
	const element = document.createElement('div');
	element.append(dom);
	return element.innerHTML;
}

for (const [name, linkify] of Object.entries({
	linkifyIssuesToHtml,
	linkifyIssuesToDom: (...arguments_) => `DocumentFragment: ${html(linkifyIssuesToDom(...arguments_))}`,
})) {
	test(name + ': main', t => {
		t.snapshot(
			linkify('Fixes #143 and avajs/ava#1023', {user: 'sindresorhus', repository: 'dofle'}),
		);
	});

	test(name + ': references across forks', t => {
		t.snapshot(
			linkify('Upstreamed from forkuser#143', {user: 'sindresorhus', repository: 'dofle'}),
		);
	});

	test(name + ': escapes user input', t => {
		t.snapshot(
			linkify('See #1', {
				user: '<script></script>',
				repository: 'x',
				attributes: {
					class: '<script></script>',
				},
			}),
		);
	});

	test(name + ': attributes option', t => {
		t.snapshot(
			linkify('See avajs/ava#1023', {
				user: 'x',
				repository: 'x',
				attributes: {
					class: 'unicorn',
					target: '_blank',
				},
			}),
		);
	});

	test(name + ': baseUrl option', t => {
		t.snapshot(
			linkify('Fixes avajs/ava#1023', {
				user: 'x',
				repository: 'x',
				baseUrl: '',
			}),
		);
	});

	test(name + ': prefix option', t => {
		t.snapshot(
			linkify('How about BRO:420', {
				user: 'x',
				repository: 'x',
				prefix: 'BRO:',
			}),
		);
	});

	test(name + ': unset prefix option', t => {
		t.snapshot(
			linkify('GH-747 is a model airplane', {
				user: 'x',
				repository: 'x',
				prefix: '',
			}),
		);
	});
}

// Tracked in
// https://github.com/sindresorhus/linkify-issues/issues/16
// https://github.com/sindresorhus/issue-regex/issues/17
test.failing('support user#number', t => {
	t.is(
		linkifyIssuesToHtml('Upstreamed from forkuser#143', {
			user: 'sindresorhus',
			repository: 'dofle',
		}),
		'Upstreamed from <a href="https://github.com/forkuser/dofle/issues/143">forkuser#143</a>',
	);
});
