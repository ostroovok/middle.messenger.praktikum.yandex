import Block from 'src/core/Block';
import { default as MessageTemplate } from './Message.hbs?raw';
import { getDateOrTime } from 'src/shared/utils/dateTimeUtils';

type MessageProps = {
	text: string;
	userId: number;
	time: string;
};

export class Message extends Block {
	constructor(props: MessageProps) {
		const { user } = window.store.getState();
		const date = new Date(props.time);
		const messageDate = getDateOrTime(date);
		const isUserSender = user?.id === props.userId;
		let senderName = '';
		if (!isUserSender) {
			const { activeChatUsers } = window.store.getState();
			const user = activeChatUsers.find(user => user.id === props.userId);
			senderName = `${user?.first_name} ${user?.second_name}`;
		}
		super({ ...props, isUserSender, time: messageDate, senderName });
	}

	protected render(): string {
		return MessageTemplate;
	}
}
