import test from 'ava';
import m from '.';

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
