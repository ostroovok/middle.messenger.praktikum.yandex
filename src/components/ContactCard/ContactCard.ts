import Block from 'src/core/Block';
import { default as ContactCardTemplate } from './ContactCard.hbs?raw';


type ContactCardProps = {
	avatarUrl: string;
	contactName: string;
	lastMessagePreview: string;
	lastMessagetime: string;
	unreadMessages: number;
	sendByUser: boolean;
};

export class ContactCard extends Block {
	constructor(props: ContactCardProps) {
		super(props);
	}

	protected render(): string {
		return ContactCardTemplate;
	}
}
