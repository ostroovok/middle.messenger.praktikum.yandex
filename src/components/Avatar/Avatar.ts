import Block from 'src/core/Block/Block';
import { default as AvatarTemplate } from './Avatar.hbs?raw';
import { getResourcesApiUrl } from 'src/shared/api/utils/constants';

type AvatarProps = {
	label: string;
	name: string;
	className: string;
	imageSrc: string;
	disabled: boolean;
	onChange: (event?: Event) => void;
};

export class Avatar extends Block {
	constructor(props: AvatarProps) {
		super({
			...props,
			imageSrc: props.imageSrc ? getResourcesApiUrl(props.imageSrc) : undefined,
		});

		this.props.events = {
			change: this.props.onChange as AvatarProps['onChange'],
		};
	}

	protected render(): string {
		return AvatarTemplate;
	}
}
