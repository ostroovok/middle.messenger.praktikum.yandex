import Block from 'src/core/Block';
import { noop } from 'src/shared/utils';
import { default as IconButtonTemplate } from './IconButton.hbs?raw';

type IconButtonProps = {
	className: string;
	type: string;
	navTo: string;
	icon: string;
	onClick: () => void;
};

export class IconButton extends Block {
	constructor(props: IconButtonProps) {
		super(props);
		this.props.events = {
			click: this.props.onClick || noop,
		};
	}

	protected render(): string {
		return IconButtonTemplate;
	}
}
