import Handlebars from 'handlebars';
import * as Components from './components';
import * as Partials from './partials';
import Block from './core/Block';
import './global.scss';
import { registerComponent } from './core/resgiterComponent';
import { registerRoutes } from './shared/navigation/registerRoutes';
import { State } from './store/types';
import { Store } from './store/store';
import { createStore } from './store/utils';

declare global {
	interface Window {
		store: Store<State>;
	}
}

Handlebars.registerPartial('Form', Partials.Form);
Handlebars.registerPartial('Layout', Partials.Layout);
Handlebars.registerPartial('Sider', Partials.Sider);
Handlebars.registerPartial('Modal', Partials.Modal);

Object.entries(Components).forEach(([key, source]) => {
	registerComponent(key, source as typeof Block);
});

registerRoutes();
createStore();
