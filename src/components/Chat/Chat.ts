import Block from 'src/core/Block';
import { logFormData } from 'src/shared/logFormData';
import { RefsType } from 'src/shared/types';
import { default as ChatTemplate } from './Chat.hbs?raw';

export class Chat extends Block {
	constructor() {
		super({
			validate: {
				message: (value: string) => value.length === 0,
			},
			onSend: (event: MouseEvent) => logFormData(this.refs as RefsType, event),
		});
	}

	protected render(): string {
		return ChatTemplate;
	}
}
