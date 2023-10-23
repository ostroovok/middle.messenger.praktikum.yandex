import Block from 'src/core/Block';
import { default as ContactCardTemplate } from './ContactCard.hbs?raw';
import { ChatType, GetChatUsersResponse } from 'src/shared/models/ChatModels';
import { getChatUsers } from 'src/services/ChatsService';
import { closeChat, openChat } from 'src/services/MessagesService';
import { connect } from 'src/store/utils';

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
			currentSelected: state.activeChat?.id === props.id,
		});
		this.props.events = {
			click: () => {
				getChatUsers({ chatId: props.id }).then(users => {
					window.store?.set({
						activeChatUsers: users as GetChatUsersResponse,
					});
				});
				window.store.set({
					activeChat: props,
				});
				// closeChat();
				openChat();
			},
		};
	}

	protected render(): string {
		return ContactCardTemplate;
	}
}


