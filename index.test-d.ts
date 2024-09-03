import {expectType} from 'tsd';
import {linkifyIssuesToHtml, linkifyIssuesToDom} from './index.js';

expectType<string>(
	linkifyIssuesToHtml('Fixes #143 and avajs/ava#1023', {
		user: 'sindresorhus',
		repository: 'dofle',
	}),
);
expectType<string>(
	linkifyIssuesToHtml('Fixes #143 and avajs/ava#1023', {
		user: 'sindresorhus',
		repository: 'dofle',
		attributes: {
			class: 'unicorn',
			multiple: ['a', 'b'],
			number: 1,
			exclude: false,
			include: true,
		},
	}),
);
expectType<string>(
	linkifyIssuesToHtml('Fixes #143 and avajs/ava#1023', {
		user: 'sindresorhus',
		repository: 'dofle',
	}),
);

const fragment = linkifyIssuesToDom('Fixes #143 and avajs/ava#1023', {
	user: 'sindresorhus',
	repository: 'dofle',
});

expectType<DocumentFragment>(fragment);
document.body.append(fragment);
