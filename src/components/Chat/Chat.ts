import Block from '../../core/Block';
import { default as ChatTemplate } from './Chat.hbs?raw';

type ChatProps = {};

export class Chat extends Block {
	constructor(props: ChatProps) {
		super({
			...props,
			validate: {
				message: (value: string) => value.length === 0,
			},
			send: (event: InputEvent) => {
				event.preventDefault();
				const message = this.refs.message.value();

				console.log({
					message,
				});
			},
		});
	}

	protected render(): string {
		return ChatTemplate;
	}
}
