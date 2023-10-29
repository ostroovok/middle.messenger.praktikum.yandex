import Block from 'src/core/Block/Block';
import { ValidationCallback } from 'src/shared/types';
import { default as ProfileInputFieldTemplate } from './ProfileInputField.hbs?raw';
import { InputField } from '..';

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
		return (this.refs.inputField as InputField).value();
	}

	protected render(): string {
		return ProfileInputFieldTemplate;
	}
}
