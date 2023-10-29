import Block from 'src/core/Block/Block';
import { default as ChatPopoverTemplate } from './ChatPopover.hbs?raw';
import { connect } from 'src/store/utils';

type ChatPopoverProps = {
	isChatPopoverOpened: boolean;
};

class _ChatPopover extends Block {
	constructor(props: ChatPopoverProps) {
		super({
			...props,
			onCancel: () => {
				window.store.set({
					isChatPopoverOpened: false,
				});
			},
		});
	}

	protected render() {
		return ChatPopoverTemplate;
	}
}

export const ChatPopover = connect(state => ({ isChatPopoverOpened: state.isChatPopoverOpened }))(
	_ChatPopover as typeof Block,
);
