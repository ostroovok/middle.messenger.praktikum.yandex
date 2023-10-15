import Block from 'src/core/Block';
import { default as MessageTemplate } from './Message.hbs?raw';
import { getCurrentUser } from 'src/services/AuthService';
import { User } from 'src/shared/models/UserModels';

type MessageProps = {
	text: string;
	userId: number;
	time: string;
};

export class Message extends Block {
	constructor(props: MessageProps) {
		super({ ...props });
		getCurrentUser().then(currentUser => {
			this.setProps({
				isUserSender: (currentUser as User).id === props.userId,
			});
		});
	}

	protected render(): string {
		return MessageTemplate;
	}
}
