import Block from '../../core/Block';
import { ValidationCallback } from '../../shared/types';

type ProfileInputFieldProps = {
	name: string;
	label: string;
	value: string;
	disabled: boolean;
	validate: ValidationCallback;
};

export class ProfileInputField extends Block {
	constructor(props: ProfileInputFieldProps) {
		super(props);
	}

	public value() {
		return this.refs.inputField.value();
	}

	protected render(): string {
		const { disabled, label, name, value = '' } = this.props as ProfileInputFieldProps;
		return `
            {{{ InputField
                name="${name}" 
                label="${label}"
                type="text"
                value="${value}"
                ref="inputField"
                disabled=${disabled}
				validate=validate
                labelClassName="editable-field__container" 
                inputClassName="editable-field__input"
            }}}
        `;
	}
}
