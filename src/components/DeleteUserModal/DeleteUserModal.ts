import Block from 'src/core/Block';
import ModalTemplate from './DeleteUserModal.hbs?raw';
import { connect } from 'src/store/utils';
import { requiredField } from 'src/shared/validation';
import { RefsType } from 'src/shared/types';
import { checkFields } from 'src/shared/utils/formUtils';
import { parseRequestError } from 'src/shared/api/utils/parseRequestError';
import { deleteUserFromChat, getChatUsers } from 'src/services/ChatsService';
import { ChatUser, GetChatUsersResponse } from 'src/shared/models/ChatModels';
import { SelectField } from '..';

type DeleteUserModalProps = {
	isOpenDialogChat: boolean;
	chatUsers: ChatUser[];
	userToDelete: number[];
	title?: string;
	onOk?: () => void;
	onCancel?: () => void;
};

class _DeleteUserModal extends Block {
	constructor(props: DeleteUserModalProps) {
		super({
			...props,
			validate: {
				userId: requiredField,
			},
			onOk: () => {
				const { activeChat } = window.store.getState();
				if (!this.validateFields() || !activeChat) {
					return;
				}
				const fields = this.getFields();
				deleteUserFromChat({
					users: [Number(fields.userId)],
					chatId: activeChat.id,
				})
					.then(() => {
						getChatUsers({ chatId: activeChat.id }).then(users => {
							window.store?.set({
								activeChatUsers: users as GetChatUsersResponse,
							});
						});
					})
					.catch(err => {
						const errorText = parseRequestError(err);
						this.refs.errorText.setProps({ errorText });
					});
				window.store.set({
					isOpenDialogRemoveUserFromChat: false,
				});
			},
			onCancel: () => {
				window.store.set({
					isOpenDialogRemoveUserFromChat: false,
				});
			},
		});
	}

	private getFields() {
		const refs = this.refs as RefsType<SelectField>;
		return {
			userId: refs.userId.value(),
		};
	}

	private validateFields() {
		const fields = this.getFields();
		return checkFields(fields);
	}

	protected render() {
		return ModalTemplate;
	}
}

export const DeleteUserModal = connect(state => ({
	isOpenDialogRemoveUserFromChat: state.isOpenDialogRemoveUserFromChat,
	chatUsers: state.activeChatUsers
		.filter(user => user.role !== 'admin')
		.map(user => ({ id: user.id, label: user.first_name })),
}))(_DeleteUserModal as typeof Block);
