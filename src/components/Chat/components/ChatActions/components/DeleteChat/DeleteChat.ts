import Block from 'src/core/Block';
import { default as DeleteChatTemplate } from './DeleteChat.hbs?raw';

export class DeleteChat extends Block {
	constructor() {
		super({
			onClick: () => {},
		});
	}

	protected render() {
		return DeleteChatTemplate;
	}
}
