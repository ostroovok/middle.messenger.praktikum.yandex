import Block from '../../core/Block';
import { ValidationCallback } from '../../shared/types';
import { default as ProfileInputFieldTemplate } from './ProfileInputField.hbs?raw';

type ProfileInputFieldProps = {
	name: string;
	label: string;
	value: string;
	disabled: boolean;
	validate: ValidationCallback;
};

export class ProfileInputField extends Block {
	constructor(props: ProfileInputFieldProps) {
		const { value = '', ...restProps } = props;
		super({
			value,
			...restProps,
		});
	}

	public value() {
		return this.refs.inputField.value();
	}

	protected render(): string {
		return ProfileInputFieldTemplate;
	}
}
