import Block from 'src/core/Block';
import { default as AvatarTemplate } from './Avatar.hbs?raw';
import { changeUserAvatar } from 'src/services/UserService';
import { parseRequestError } from 'src/shared/api/utils/parseRequestError';
import { getResourcesApiUrl } from 'src/shared/api/utils/constants';

type AvatarProps = {
	label: string;
	name: string;
	className: string;
	imageSrc: string;
	disabled: boolean;
};

export class Avatar extends Block {
	constructor(props: AvatarProps) {
		super({
			...props,
			imageSrc: getResourcesApiUrl(props.imageSrc),
		});

		this.props.events = {
			change: event => {
				const files = (event?.target as HTMLInputElement).files ?? [];
				if (files.length) {
					const file = files[0];
					changeUserAvatar(file).catch(err => {
						const errorText = parseRequestError(err);
						this.refs.errorText.setProps({ errorText });
					});
				}
			},
		};
	}

	protected render(): string {
		return AvatarTemplate;
	}
}
