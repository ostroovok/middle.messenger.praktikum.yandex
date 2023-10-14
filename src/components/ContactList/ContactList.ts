import Block from 'src/core/Block';
import ContactListTemplate from './ContactList.hbs?raw';
import { ChatsList } from 'src/shared/models/ChatModels';

type ContactListProps = {
	chats: ChatsList;
};

export class ContactList extends Block {
	constructor(props: ContactListProps) {
		super({
			...props,
		});
		console.log(props.chats);
	}

	protected render() {
		return ContactListTemplate;
	}
}
