import Block from 'src/core/Block';
import { noop } from 'src/shared/utils';
import { default as ButtonTemplate } from './Button.hbs?raw';

type ButtonProps = {
	type: 'primary' | 'link';
	label: string;
	navTo: string;
	className: string;
	onClick: () => void;
}

export class Button extends Block {
	constructor(props: ButtonProps) {
		super(props);
		this.props.events = {
			click: this.props.onClick || noop,
		};
	}

	protected render(): string {
		return ButtonTemplate;
	}
}
