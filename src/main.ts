import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import Block from './core/Block';
import './global.scss';
import { registerComponent } from './core/resgiterComponent';

const pages: { [key: string]: [typeof Block, context: any] } = {
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

Handlebars.registerPartial('Form', Components.Form);
Handlebars.registerPartial('Layout', Components.Layout);
Handlebars.registerPartial('Sider', Components.Sider);
Handlebars.registerPartial('ContactList', Components.ContactList);

registerComponent('Input', Components.Input);
registerComponent('InputField', Components.InputField);
registerComponent('Button', Components.Button);
registerComponent('ErrorLine', Components.ErrorLine);
registerComponent('ContactCard', Components.ContactCard);
registerComponent('IconButton', Components.IconButton);
registerComponent('Avatar', Components.Avatar);
registerComponent('ProfileInputField', Components.ProfileInputField);

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
