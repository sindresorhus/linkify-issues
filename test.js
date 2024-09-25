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
			linkify('Fixes #143 and avajs/ava#1023; closes GH-2', {user: 'sindresorhus', repository: 'dofle'}),
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

	test(name + ': additionalPrefix option', t => {
		t.snapshot(
			linkify('How about BRO:420', {
				user: 'x',
				repository: 'x',
				additionalPrefix: 'BRO:',
			}),
		);
	});

	test(name + ': unset additionalPrefix option', t => {
		t.snapshot(
			linkify('GH-747 is a model airplane', {
				user: 'x',
				repository: 'x',
				additionalPrefix: '',
			}),
		);
		t.snapshot(
			linkify('GH-747 is a model airplane', {
				user: 'x',
				repository: 'x',
				additionalPrefix: undefined,
			}),
		);
	});
}
