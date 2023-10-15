import Block from 'src/core/Block';
import ModalTemplate from './AddChatModal.hbs?raw';
import { connect } from 'src/store/utils';
import { requiredField } from 'src/shared/validation';
import { createChat } from 'src/services/ChatsService';
import { RefsType } from 'src/shared/types';
import { checkFields } from 'src/shared/utils/formUtils';
import { parseRequestError } from 'src/shared/api/utils/parseRequestError';

type AddChatModalProps = {
	isOpenDialogChat: boolean;
	title?: string;
	onOk?: () => void;
	onCancel?: () => void;
};

class _AddChatModal extends Block {
	constructor(props: AddChatModalProps) {
		super({
			...props,
			validate: {
				title: requiredField,
			},
			onOk: () => {
				if (!this.validateFields()) {
					return;
				}
				const fields = this.getFields();
				createChat({
					title: fields.title.toString(),
				}).catch(err => {
					const errorText = parseRequestError(err);
					this.refs.errorText.setProps({ errorText });
				});
				window.store.set({
					isOpenDialogChat: false,
				});
			},
			onCancel: () => {
				window.store.set({
					isOpenDialogChat: false,
				});
			},
		});
	}

	private getFields() {
		const refs = this.refs as RefsType;
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

export const AddChatModal = connect(state => ({ isOpenDialogChat: state.isOpenDialogChat }))(
	_AddChatModal as typeof Block,
);
