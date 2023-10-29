import Block from 'src/core/Block/Block';
import { default as ChangeAvatarTemplate } from './ChangeAvatar.hbs?raw';

export class ChangeAvatar extends Block {
	constructor() {
		super({
			onClick: () => {
				window.store.set({
					isChangeChatAvatarDialogOpen: true,
					isChatPopoverOpened: false,
				});
			},
		});
	}

	protected render() {
		return ChangeAvatarTemplate;
	}
}
