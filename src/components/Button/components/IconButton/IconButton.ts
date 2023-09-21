import Block from '../../../../core/Block';
import { noop } from '../../../../shared/utils';
import { default as IconButtonTemplate } from './IconButton.hbs?raw';

type IconButtonProps = {
	className: string;
	type: string;
	navTo: string;
	imageSrc: string;
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
