import Block from 'src/core/Block';
import { default as ContactCardTemplate } from './ContactCard.hbs?raw';
import { ChatType, GetChatUsersResponse } from 'src/shared/models/ChatModels';
import { getChatUsers } from 'src/services/ChatsService';
import { openChat } from 'src/services/MessagesService';
import { getDateOrTime } from 'src/shared/utils/dateTimeUtils';

type ContactCardProps = ChatType & {
	sendByMe: boolean;
};

export class ContactCard extends Block {
	constructor(props: ContactCardProps) {
		const state = window.store.getState();
		const date = props.last_message ? new Date(props.last_message.time) : null;
		const dateTime = date ? getDateOrTime(date) : '';
		super({
			...props,
			sendByMe: props.last_message?.user?.login === state.user?.login,
			currentSelected: state.activeChat?.id === props.id,
			dateTime,
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
				openChat();
			},
		};
	}

	protected render(): string {
		return ContactCardTemplate;
	}
}
