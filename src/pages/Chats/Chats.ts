import Block from 'src/core/Block';
import { default as ChatsTemplate } from './Chats.hbs?raw';


export class Chats extends Block {
	constructor() {
		super();
	}

	protected render(): string {
		return ChatsTemplate;
	}
}
