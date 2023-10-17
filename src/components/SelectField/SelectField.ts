import Block from 'src/core/Block';
import { NamedEntity, ValidationCallback } from 'src/shared/types';
import { default as SelectFieldTemplate } from './SelectField.hbs?raw';

export type SelectFieldProps = {
	options: NamedEntity[];
	validate: ValidationCallback;
	placeholder: string;
	label: string;
};

export class SelectField extends Block {
	constructor(props: SelectFieldProps) {
		super({
			...props,
			onBlur: () => this.validate(),
		});
	}

	public value() {
		if (!this.validate()) {
			return false;
		}
		return ((this.refs.select as SelectField)?.element as HTMLInputElement).value;
	}

	private validate() {
		const { showError } = this.props;
		const { value } = (this.refs.select as SelectField)?.element as HTMLSelectElement;
		const errorText = (this.props as SelectFieldProps).validate?.(value);
		if (errorText) {
			showError && this.refs.errorLine.setProps({ errorText });
			return false;
		}
		showError && this.refs.errorLine.setProps({ errorText: undefined });
		return true;
	}

	protected render() {
		return SelectFieldTemplate;
	}
}
