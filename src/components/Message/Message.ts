import Block from 'src/core/Block';
import { default as MessageTemplate } from './Message.hbs?raw';

type MessageProps = {
	text: string;
	isUserSender: boolean;
	time: string;
};

export class Message extends Block {
	constructor(props: MessageProps) {
		super(props);
	}

	protected render(): string {
		return MessageTemplate;
	}
}
