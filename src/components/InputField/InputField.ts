import Block from 'src/core/Block';
import { ValidationCallback } from 'src/shared/types';
import { InputProps } from '../Input/Input';
import { default as InputFieldTemplate } from './InputField.hbs?raw';

type InputFieldProps = InputProps & {
	labelClassName?: string;
	label?: string;
	validate: ValidationCallback;
	showError: boolean;
};

export class InputField extends Block {
	constructor(props: InputFieldProps) {
		const { showError = true, ...restProps } = props;
		super({
			showError,
			...restProps,
			onBlur: () => this.validate(),
		});
	}
	public value() {
		if (!this.validate()) {
			return false;
		}
		return ((this.refs.input as InputField)?.element as HTMLInputElement).value;
	}

	private validate() {
		const { showError } = this.props;
		const { value } = (this.refs.input as InputField)?.element as HTMLInputElement;
		const errorText = (this.props as InputFieldProps).validate?.(value);
		if (errorText) {
			showError && this.refs.errorLine.setProps({ errorText });
			return false;
		}
		showError && this.refs.errorLine.setProps({ errorText: undefined });
		return true;
	}

	protected render(): string {
		return InputFieldTemplate;
	}
}
