import Block from 'src/core/Block';
import { logFormData } from 'src/shared/utils/logFormData';
import { RefsType } from 'src/shared/types';
import { default as ChatTemplate } from './Chat.hbs?raw';
import { connect, createStore } from 'src/store/utils';
import { ChatType } from 'src/shared/models/ChatModels';

type ChatProps = {
	selectedChat: ChatType;
};

class _Chat extends Block {
	constructor(props: ChatProps) {
		createStore();
		super({
			...props,
			validate: {
				message: (value: string) => value.length === 0,
			},
			onSend: (event: MouseEvent) => logFormData(this.refs as RefsType, event),
		});
	}

	protected render(): string {
		return ChatTemplate;
	}
}

export const Chat = connect(state => ({
	selectedChat: state.selectedChat,
}))(_Chat as typeof Block);
