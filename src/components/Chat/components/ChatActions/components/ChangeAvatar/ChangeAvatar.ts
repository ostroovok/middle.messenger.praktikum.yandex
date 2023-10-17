import Block from 'src/core/Block';
import { default as ChangeAvatarTemplate } from './ChangeAvatar.hbs?raw';

export class ChangeAvatar extends Block {
	constructor() {
		super({
			onClick: () => {},
		});
	}

	protected render() {
		return ChangeAvatarTemplate;
	}
}
