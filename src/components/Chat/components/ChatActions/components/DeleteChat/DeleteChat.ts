import Block from 'src/core/Block';
import { default as DeleteChatTemplate } from './DeleteChat.hbs?raw';

export class DeleteChat extends Block {
	constructor() {
		super({
			onClick: () => {
				window.store.set({
					isOpenDialogDeleteChat: true,
					isChatPopoverOpened: false,
				});
			},
		});
	}

	protected render() {
		return DeleteChatTemplate;
	}
}
