import {expectType} from 'tsd';
import linkifyIssues = require('.');

expectType<string>(
	linkifyIssues('Fixes #143 and avajs/ava#1023', {
		user: 'sindresorhus',
		repository: 'dofle'
	})
);
expectType<string>(
	linkifyIssues('Fixes #143 and avajs/ava#1023', {
		user: 'sindresorhus',
		repository: 'dofle',
		attributes: {
			class: 'unicorn',
			multiple: ['a', 'b'],
			number: 1,
			exclude: false,
			include: true
		}
	})
);
expectType<string>(
	linkifyIssues('Fixes #143 and avajs/ava#1023', {
		user: 'sindresorhus',
		repository: 'dofle',
		type: 'string'
	})
);

const fragment = linkifyIssues('Fixes #143 and avajs/ava#1023', {
	user: 'sindresorhus',
	repository: 'dofle',
	type: 'dom'
});

expectType<DocumentFragment>(fragment);
document.body.appendChild(fragment);
