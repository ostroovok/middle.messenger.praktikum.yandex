import Block from 'src/core/Block';
import { default as ChatFeedTemplate } from './ChatFeed.hbs?raw';
import { connect } from 'src/store/utils';

type ChatFeedProps = {
	messages: unknown[];
	isMessagesExist: boolean;
};

class _ChatFeed extends Block {
	constructor(props: ChatFeedProps) {
		super({ ...props });
	}

	protected render() {
		return ChatFeedTemplate;
	}
}

export const ChatFeed = connect(state => ({
	messages: state.messages,
	isMessagesExist: state.messages.length !== 0,
}))(_ChatFeed as typeof Block);
