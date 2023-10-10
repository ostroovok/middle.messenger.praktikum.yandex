import Block from 'src/core/Block';
import { default as ChatsTemplate } from './Chats.hbs?raw';
import { Router } from 'src/core/Router/Router';
import { Routes } from 'src/shared/navigation/routes';

export class Chats extends Block {
	private __router: Router;
	constructor() {
		super({
			createChat: () => {},
			openProfile: (_: MouseEvent) => {
				this.__router.go(Routes.Profile);
			},
		});

		this.__router = new Router();
	}

	protected render(): string {
		return ChatsTemplate;
	}
}
