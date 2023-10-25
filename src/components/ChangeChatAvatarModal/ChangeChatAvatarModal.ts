import Block from 'src/core/Block';
import { connect } from 'src/store/utils';
import { default as ChangeChatAvatarModalTemplate } from './ChangeChatAvatarModal.hbs?raw';
import { changeChatAvatar, getChats } from 'src/services/ChatsService';
import { parseRequestError } from 'src/shared/api/utils/parseRequestError';
import { ChatType, ChatsList } from 'src/shared/models/ChatModels';

type ChangeChatAvatarModalProps = {
	onOk: () => void;
	onCancel: () => void;
	isChangeChatAvatarDialogOpen: boolean;
};

class _ChangeChatAvatarModal extends Block {
	constructor(props: ChangeChatAvatarModalProps) {
		super({
			...props,
			onOk: (event?: Event) => {
				const files = (event?.target as HTMLInputElement).files ?? [];
				const { activeChat } = window.store.getState();
				if (files.length && !!activeChat) {
					const file = files[0];
					changeChatAvatar({ file, chatId: activeChat.id })
						.then(result => {
							window.store.set({
								activeChat: result as ChatType,
								isChangeChatAvatarDialogOpen: false,
							});
							getChats().then(chats => {
								window.store.set({
									chats: chats as ChatsList,
								});
							});
						})
						.catch(err => {
							const errorText = parseRequestError(err);
							this.refs.errorText.setProps({ errorText });
						});
				}
			},
			onCancel: () => {
				window.store.set({
					isChangeChatAvatarDialogOpen: false,
				});
			},
		});
	}

	protected render() {
		return ChangeChatAvatarModalTemplate;
	}
}

export const ChangeChatAvatarModal = connect(state => ({
	isChangeChatAvatarDialogOpen: state.isChangeChatAvatarDialogOpen,
	activeChat: state.activeChat,
}))(_ChangeChatAvatarModal as typeof Block);
