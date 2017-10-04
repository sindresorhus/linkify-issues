import test from 'ava';
import jsdom from 'jsdom';
import m from '.';

const dom = new jsdom.JSDOM();
global.window = dom.window;
global.document = dom.window.document;

// Ponyfill until this is in:
// https://github.com/tmpvar/jsdom/issues/317
document.createRange = () => ({
	createContextualFragment(html) {
		const el = document.createElement('template');
		el.innerHTML = html;
		return el.content;
	}
});

// Get DOM node from HTML
const domify = html => document.createRange().createContextualFragment(html);

// Get HTML from DOM node
const html = dom => {
	const el = document.createElement('div');
	el.appendChild(dom);
	return el.innerHTML;
};

test('main', t => {
	t.is(
		m('Fixes #143 and avajs/ava#1023', {user: 'sindresorhus', repo: 'dofle'}),
		'Fixes <a href="https://github.com/sindresorhus/dofle/issues/143">#143</a> and <a href="https://github.com/avajs/ava/issues/1023">avajs/ava#1023</a>'
	);
});

test('escapes user input', t => {
	t.is(
		m('See #1', {
			user: '<script></script>',
			repo: 'x',
			attributes: {
				class: '<script></script>'
			}
		}),
		'See <a href="https://github.com/&lt;script&gt;&lt;/script&gt;/x/issues/1" class="&lt;script&gt;&lt;/script&gt;">#1</a>'
	);
});

test('attributes option', t => {
	t.is(
		m('See avajs/ava#1023', {
			user: 'x',
			repo: 'x',
			attributes: {
				class: 'unicorn',
				target: '_blank'
			}
		}),
		'See <a href="https://github.com/avajs/ava/issues/1023" class="unicorn" target="_blank">avajs/ava#1023</a>'
	);
});

test('baseUrl option', t => {
	t.is(
		m('Fixes avajs/ava#1023', {
			user: 'x',
			repo: 'x',
			baseUrl: ''
		}),
		'Fixes <a href="/avajs/ava/issues/1023">avajs/ava#1023</a>'
	);
});

test('DocumentFragment support', t => {
	t.is(
		html(m('See #1', {
			user: '<script></script>',
			repo: 'x',
			baseUrl: '',
			type: 'dom',
			attributes: {
				class: '<script></script>'
			}
		})),
		html(domify('See <a href="/&lt;script&gt;&lt;/script&gt;/x/issues/1" class="&lt;script&gt;&lt;/script&gt;">#1</a>'))
	);
});
