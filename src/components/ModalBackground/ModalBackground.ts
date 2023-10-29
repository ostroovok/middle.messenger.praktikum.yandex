import Block from 'src/core/Block/Block';
import { default as ModalBackgroundTemplate } from './ModalBackground.hbs?raw';

type ModalBackgroundProps = {
	onClick: (event?: Event) => void;
	className?: string;
};

export class ModalBackground extends Block {
	constructor(props: ModalBackgroundProps) {
		super(props);
		this.props.events = {
			click: (event?: Event) => {
				event?.stopPropagation?.();
				(this.props as ModalBackgroundProps).onClick(event);
			},
		};
	}

	protected render() {
		return ModalBackgroundTemplate;
	}
}
