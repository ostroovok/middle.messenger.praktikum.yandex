import Block from 'src/core/Block';
import ContactListTemplate from './ContactList.hbs?raw';
import { ChatsList } from 'src/shared/models/ChatModels';
import { connect } from 'src/store/utils';

type ContactListProps = {
	chats: ChatsList;
};

class _ContactList extends Block {
	constructor(props: ContactListProps) {
		super({
			...props,
		});
	}

	protected render() {
		return ContactListTemplate;
	}
}

export const ContactList = connect(state => ({
	chats: state.chats,
	selectedChat: state.selectedChat,
}))(_ContactList as typeof Block);
