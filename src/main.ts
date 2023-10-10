import Handlebars from 'handlebars';
import * as Components from './components';
import * as Partials from './partials';
import Block from './core/Block';
import './global.scss';
import { registerComponent } from './core/resgiterComponent';
import { registerRoutes } from './shared/navigation/registerRoutes';

Handlebars.registerPartial('Form', Partials.Form);
Handlebars.registerPartial('Layout', Partials.Layout);
Handlebars.registerPartial('Sider', Partials.Sider);
Handlebars.registerPartial('ContactList', Partials.ContactList);

Object.entries(Components).forEach(([key, source]) => {
	registerComponent(key, source as typeof Block);
});

// function navigate(page: keyof typeof pages) {
// 	const container = document.getElementById('root');
// 	const [Component, context] = pages[page];
// 	const component = new Component(context);

// 	const content = component.getContent();

// 	content && container?.replaceChildren(content);
// }

// document.addEventListener('DOMContentLoaded', () => navigate('login'));

registerRoutes();
