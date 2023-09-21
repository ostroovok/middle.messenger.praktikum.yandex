import Block from '../../core/Block';
import { default as AvatarTemplate } from './Avatar.hbs?raw';

type AvatarProps = {
	label: string;
	name: string;
	className: string;
	imageSrc: string;
	disabled: boolean;
};

export class Avatar extends Block {
	constructor(props: AvatarProps) {
		super(props);
	}

	protected render(): string {
		return AvatarTemplate;
	}
}
