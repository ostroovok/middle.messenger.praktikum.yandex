import Block from 'src/core/Block/Block';
import { default as IconButtonTemplate } from './IconButton.hbs?raw';

type IconButtonProps = {
	className: string;
	type: string;
	icon: string;
	onClick: () => void;
};

export class IconButton extends Block {
	constructor(props: IconButtonProps) {
		super(props);
		this.props.events = {
			click: this.props.onClick as () => void,
		};
	}

	protected render(): string {
		return IconButtonTemplate;
	}
}
