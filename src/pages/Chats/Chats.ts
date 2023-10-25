import Block from 'src/core/Block';
import { default as ChatsTemplate } from './Chats.hbs?raw';
import { Router } from 'src/core/Router/Router';
import { Routes } from 'src/shared/navigation/routes';
import { getChats } from 'src/services/ChatsService';
import { ChatsList } from 'src/shared/models/ChatModels';

type ChatsProps = {
	chatsList: ChatsList;
};

export class Chats extends Block {
	private __router: Router;
	constructor(props: ChatsProps) {
		super({
			...props,
			createChat: (event: MouseEvent) => {
				event.preventDefault();
				window.store.set({
					isOpenDialogAddChat: true,
				});
			},
			openProfile: (event: MouseEvent) => {
				event.preventDefault();
				this.__router.go(Routes.Profile);
			},
		});

		getChats().then(chats => {
			this.setProps({
				chatsList: chats,
			});
		});

		this.__router = new Router();
	}

	protected render(): string {
		return ChatsTemplate;
	}
}
