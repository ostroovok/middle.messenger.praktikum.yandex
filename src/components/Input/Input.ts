import Block from 'src/core/Block/Block';
import { noop } from 'src/shared/utils/noop';
import { default as InputTemplate } from './Input.hbs?raw';

export type InputProps = {
	name?: string;
	inputClassName?: string;
	placeholder?: string;
	type?: string;
	disabled?: boolean;
	value?: string | number;
	onBlur: () => void;
};

export class Input extends Block {
	constructor(props: InputProps) {
		const { placeholder = '', ...restProps } = props;
		super({
			placeholder,
			...restProps,
			events: {
				blur: props.onBlur || noop,
			},
		});
	}

	protected render(): string {
		return InputTemplate;
	}
}
