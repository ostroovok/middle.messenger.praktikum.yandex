import Block from 'src/core/Block';
import { default as AddUserTemplate } from './AddUser.hbs?raw';

export class AddUser extends Block {
	constructor() {
		super({
			onClick: () => {
				window.store.set({
					isOpenDialogAddUserToChat: true,
					isChatPopoverOpened: false,
				});
			},
		});
	}

	protected render() {
		return AddUserTemplate;
	}
}
