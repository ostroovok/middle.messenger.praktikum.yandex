import Block from 'src/core/Block';
import { default as ChatTemplate } from './Chat.hbs?raw';
import { connect } from 'src/store/utils';
import { ChatType } from 'src/shared/models/ChatModels';

type ChatProps = {
	activeChat: ChatType;
};

class _Chat extends Block {
	constructor(props: ChatProps) {
		super({
			...props,
			validate: {
				message: (value: string) => value.length === 0,
			},
		});
	}

	protected render(): string {
		return ChatTemplate;
	}
}

export const Chat = connect(state => ({
	activeChat: state.activeChat,
}))(_Chat as typeof Block);
