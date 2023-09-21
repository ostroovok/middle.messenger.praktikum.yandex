import Handlebars from 'handlebars';
import * as Components from './components';
import * as Partials from './partials';
import * as Pages from './pages';
import Block from './core/Block';
import './global.scss';
import { registerComponent } from './core/resgiterComponent';

const pages: { [key: string]: [typeof Block<Record<string, unknown>>, context: any] } = {
	login: [Pages.Login, {}],
	signUp: [Pages.SignUp, {}],
	chats: [Pages.Chats, {}],
	notFound: [
		Pages.Error,
		{
			title: '404',
			subTitle: 'Не туда попали',
		},
	],
	serverError: [
		Pages.Error,
		{
			title: '500',
			subTitle: 'Мы уже фиксим',
		},
	],
	profile: [Pages.Profile, {}],
	editProfile: [Pages.EditProfilePage, {}],
	changePassword: [Pages.ChangePasswordPage, {}],
};

Handlebars.registerPartial('Form', Partials.Form);
Handlebars.registerPartial('Layout', Partials.Layout);
Handlebars.registerPartial('Sider', Partials.Sider);
Handlebars.registerPartial('ContactList', Partials.ContactList);

Object.entries(Components).forEach(([key, source]) => {
	registerComponent(key, source as typeof Block);
});

function navigate(page: keyof typeof pages) {
	const container = document.getElementById('root');
	const [Component, context] = pages[page];
	const component = new Component(context);

	container?.replaceChildren(component.getContent()!);
}

document.addEventListener('DOMContentLoaded', () => navigate('login'));

document.addEventListener('click', e => {
	//@ts-ignore
	const page = e.target.getAttribute('page');
	if (page) {
		navigate(page);

		e.preventDefault();
		e.stopImmediatePropagation();
	}
});
