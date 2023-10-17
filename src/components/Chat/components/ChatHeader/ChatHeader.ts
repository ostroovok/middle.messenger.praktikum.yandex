import Block from 'src/core/Block';
import { default as ChatHeaderTemplate } from './ChatHeader.hbs?raw';

type ChatHeaderProps = {
	title: string;
	avatar: string;
};

export class ChatHeader extends Block {
	constructor(props: ChatHeaderProps) {
		super({
			...props,
			onActionsClick: () => {
				window.store.set({
					isChatPopoverOpened: true,
				});
			},
		});
	}

	protected render(): string {
		return ChatHeaderTemplate;
	}
}
