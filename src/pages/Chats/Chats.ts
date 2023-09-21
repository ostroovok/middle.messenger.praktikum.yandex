import Block from '../../core/Block';
import { default as ChatsTemplate } from './Chats.hbs?raw';

type ChatsProps = {};

export class Chats extends Block {
	constructor(props: ChatsProps) {
		super(props);
	}

	protected render(): string {
		return ChatsTemplate;
	}
}
