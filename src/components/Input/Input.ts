import Block from '../../core/Block';
import { noop } from '../../shared/utils';

export type InputProps = {
	name?: string;
	inputClassName?: string;
	placeholder?: string;
	type?: string;
	disabled?: boolean;
	value?: string | number;
	onBlur: () => {};
};

export class Input extends Block {
	constructor(props: InputProps) {
		super({
			...props,
			events: {
				blur: props.onBlur || noop,
			},
		});
	}

	protected render(): string {
		const { disabled, inputClassName, name, placeholder = '', type, value } = this.props as InputProps;

		const disabledAttr = disabled ? 'disabled="disabled"' : '';
		const valueAttr = value ? `value="${value}"` : '';

		return `
			<input
				ref="input"
				class="input__element ${inputClassName}"
				placeholder="${placeholder}"
				name="${name}"
				type="${type}"
				${valueAttr}
				${disabledAttr}
			/>
        `;
	}
}
