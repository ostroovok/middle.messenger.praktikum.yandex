import Block from 'src/core/Block/Block';
import ModalTemplate from './AddUserModal.hbs?raw';
import { connect } from 'src/store/utils';
import { requiredField } from 'src/shared/validation';
import { addUserToChat, getChatUsers } from 'src/services/ChatsService';
import { RefsType } from 'src/shared/types';
import { checkFields } from 'src/shared/utils/formUtils';
import { parseRequestError } from 'src/shared/api/utils/parseRequestError';
import { GetChatUsersResponse } from 'src/shared/models/ChatModels';
import { InputField } from '..';

type AddUserModalProps = {
	isOpenDialogChat: boolean;
	title?: string;
	onOk?: () => void;
	onCancel?: () => void;
};

class _AddUserModal extends Block {
	constructor(props: AddUserModalProps) {
		super({
			...props,
			validate: {
				title: requiredField,
			},
			onOk: () => {
				const { activeChat } = window.store.getState();
				if (!this.validateFields() || !activeChat) {
					return;
				}
				const fields = this.getFields();

				addUserToChat({
					userLogin: fields.title.toString(),
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
					isOpenDialogAddUserToChat: false,
				});
			},
			onCancel: () => {
				window.store.set({
					isOpenDialogAddUserToChat: false,
				});
			},
		});
	}

	private getFields() {
		const refs = this.refs as RefsType<InputField>;
		return {
			title: refs.title.value(),
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

export const AddUserModal = connect(state => ({
	isOpenDialogAddUserToChat: state.isOpenDialogAddUserToChat,
}))(_AddUserModal as typeof Block);
