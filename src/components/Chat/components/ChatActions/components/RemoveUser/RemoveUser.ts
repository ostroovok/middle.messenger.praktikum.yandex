import Block from 'src/core/Block/Block';
import { default as RemoveUserTemplate } from './RemoveUser.hbs?raw';

export class RemoveUser extends Block {
	constructor() {
		super({
			onClick: () => {
				window.store.set({
					isOpenDialogRemoveUserFromChat: true,
					isChatPopoverOpened: false,
				});
			},
		});
	}

	protected render() {
		return RemoveUserTemplate;
	}
}
