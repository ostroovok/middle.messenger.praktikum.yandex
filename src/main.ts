import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import './global.scss';
import { registerComponent } from './core/resgiterComponent';

const pages = {
	login: Pages.LoginPage,
	// signUp: [Pages.SignUp],
	// chats: [Pages.Chats],
	// notFound: [
	// 	Pages.Error,
	// 	{
	// 		title: '404',
	// 		subTitle: 'Не туда попали',
	// 	},
	// ],
	// serverError: [
	// 	Pages.Error,
	// 	{
	// 		title: '500',
	// 		subTitle: 'Мы уже фиксим',
	// 	},
	// ],
	// profile: [Pages.Profile],
	// editProfile: [Pages.EditProfilePage],
	// changePassword: [Pages.ChangePasswordPage],
};

Handlebars.registerPartial('Form', Components.Form);
// Handlebars.registerPartial('ListCat', Components.ListCat);
// Handlebars.registerPartial('CatCard', Components.CatCard);

registerComponent('Input', Components.Input);
registerComponent('InputField', Components.InputField);
registerComponent('Button', Components.Button);
// registerComponent('Input', Components.Input);
// registerComponent('ErrorLine', Components.ErrorLine);

function navigate(page: string) {
	const app = document.getElementById('root');

	//@ts-ignore
	const Component = pages[page];
	const component = new Component();
	app?.append(component.getContent()!);
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
