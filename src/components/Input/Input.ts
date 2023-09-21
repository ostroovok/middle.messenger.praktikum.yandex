import Block from '../../core/Block';
import { noop } from '../../shared/utils';
import { default as InputTemplate } from './Input.hbs?raw';

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
