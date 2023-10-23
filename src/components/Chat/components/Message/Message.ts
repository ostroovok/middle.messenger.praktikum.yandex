import Block from 'src/core/Block';
import { default as MessageTemplate } from './Message.hbs?raw';
import { getCurrentUser } from 'src/services/AuthService';
import { User } from 'src/shared/models/UserModels';
import { getFullDate, getTime, isNow } from 'src/shared/utils/dateTimeUtils';

type MessageProps = {
	text: string;
	userId: number;
	time: string;
};

export class Message extends Block {
	constructor(props: MessageProps) {
		const { user } = window.store.getState();
		const date = new Date(props.time);
		const messageDate = isNow(date) ? getTime(date) : getFullDate(date);
		const isUserSender = user?.id === props.userId;
		super({ ...props, isUserSender, time: messageDate });
	}

	protected render(): string {
		return MessageTemplate;
	}
}
