import Block from 'src/core/Block';
import { default as FooterTemplate } from './Footer.hbs?raw';
import { InputField } from 'src/components';
import { RefsType } from 'src/shared/types';
import { checkFields } from 'src/shared/utils/formUtils';
import { sendMessage } from 'src/services/MessagesService';

export class Footer extends Block {
	constructor() {
		super({
			onSend: (event: SubmitEvent) => {
				event.preventDefault();
				if (!this.validateFields()) {
					return;
				}
				const fields = this.getFields();
				sendMessage(fields.message.toString());
				this.clearFields();
			},
		});
	}

	private getFields() {
		const refs = this.refs as RefsType<InputField>;
		return {
			message: refs.message.value(),
		};
	}

	private clearFields() {
		const refs = this.refs as RefsType<InputField>;
		refs.message.clear();
	}

	private validateFields() {
		const fields = this.getFields();
		return checkFields(fields);
	}

	protected render() {
		return FooterTemplate;
	}
}
