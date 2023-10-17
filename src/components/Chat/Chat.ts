import Block from 'src/core/Block';
import { logFormData } from 'src/shared/utils/logFormData';
import { RefsType } from 'src/shared/types';
import { default as ChatTemplate } from './Chat.hbs?raw';
import { connect, initStore } from 'src/store/utils';
import { ChatType } from 'src/shared/models/ChatModels';
import { InputField } from '..';

type ChatProps = {
	activeChat: ChatType;
};

class _Chat extends Block {
	constructor(props: ChatProps) {
		initStore();
		super({
			...props,
			validate: {
				message: (value: string) => value.length === 0,
			},
			onSend: (event: MouseEvent) => logFormData(this.refs as RefsType<InputField>, event),
		});
	}

	protected render(): string {
		return ChatTemplate;
	}
}

export const Chat = connect(state => ({
	activeChat: state.activeChat,
}))(_Chat as typeof Block);
