import Block from 'src/core/Block/Block';
import { NamedEntity } from 'src/shared/types';
import { default as SelectTemplate } from './Select.hbs?raw';
import { noop } from 'src/shared/utils/noop';

export type SelectProps = {
	options: NamedEntity[];
	placeholder: string;
	onBlur: () => void;
};

export class Select extends Block {
	constructor(props: SelectProps) {
		super({
			...props,
			events: {
				blur: props.onBlur || noop,
			},
		});
	}

	protected render() {
		return SelectTemplate;
	}
}
