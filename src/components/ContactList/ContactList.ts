import Block from 'src/core/Block/Block';
import ContactListTemplate from './ContactList.hbs?raw';
import { ChatType, ChatsList } from 'src/shared/models/ChatModels';
import { connect } from 'src/store/utils';

type ContactListProps = {
	chats: ChatsList;
	activeChat?: ChatType;
};

class _ContactList extends Block {
	constructor(props: ContactListProps) {
		super(props);
	}

	protected render() {
		return ContactListTemplate;
	}
}

export const ContactList = connect(state => ({
	chats: state.chats,
	activeChat: state.activeChat,
	messages: state.messages
}))(_ContactList as typeof Block);
