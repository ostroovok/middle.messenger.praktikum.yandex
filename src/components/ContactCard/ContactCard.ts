import Block from 'src/core/Block';
import { default as ContactCardTemplate } from './ContactCard.hbs?raw';
import { ChatType } from 'src/shared/models/ChatModels';

type ContactCardProps = ChatType & {
	sendByMe: boolean;
	// currentSelected: boolean;
};

export class ContactCard extends Block {
	constructor(props: ContactCardProps) {
		const state = window.store.getState();
		super({
			...props,
			sendByMe: props.last_message?.user?.login === state.user?.login,
			currentSelected: state.selectedChat?.id === props.id,
		});
		this.props.events = {
			click: () => {
				window.store.set({
					selectedChat: props,
				});
			},
		};
	}

	protected render(): string {
		return ContactCardTemplate;
	}
}
