import Block from 'src/core/Block/Block';
import ModalTemplate from './DeleteChatModal.hbs?raw';
import { connect } from 'src/store/utils';
import { requiredField } from 'src/shared/validation';
import { parseRequestError } from 'src/shared/api/utils/parseRequestError';
import { deleteChat, getChats } from 'src/services/ChatsService';
import { ChatUser, ChatsList } from 'src/shared/models/ChatModels';

type DeleteChatModalProps = {
	isOpenDialogChat: boolean;
	chatUsers: ChatUser[];
	userToDelete: number[];
	title?: string;
	onOk?: () => void;
	onCancel?: () => void;
};

class _DeleteChatModal extends Block {
	constructor(props: DeleteChatModalProps) {
		super({
			...props,
			validate: {
				userId: requiredField,
			},
			onOk: () => {
				const { activeChat } = window.store.getState();
				if (!activeChat) {
					this.refs.errorText.setProps({ errorText: 'Невозможно совершить действие' });
					return;
				}
				deleteChat({
					chatId: activeChat.id,
				})
					.then(() => {
						getChats().then(chats => {
							window.store?.set({
								chats: chats as ChatsList,
								activeChat: undefined,
							});
						});
						window.store?.set({
							isOpenDialogDeleteChat: false,
						});
					})
					.catch(err => {
						const errorText = parseRequestError(err);
						this.refs.errorText.setProps({ errorText });
					});
			},
			onCancel: () => {
				window.store.set({
					isOpenDialogDeleteChat: false,
				});
			},
		});
	}

	protected render() {
		return ModalTemplate;
	}
}

export const DeleteChatModal = connect(state => ({
	isOpenDialogDeleteChat: state.isOpenDialogDeleteChat,
}))(_DeleteChatModal as typeof Block);
