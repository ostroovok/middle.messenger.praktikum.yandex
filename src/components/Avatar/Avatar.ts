import Block from '../../core/Block';

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
		const { className, imageSrc, label, name } = this.props as AvatarProps;
		return `
        <button class="avatar ${className}" type="button">
            <img src=${imageSrc} />
            {{#if disabled}}
            {{else}}
                <label for="${name}" class="avatar__overlay">
                    <span class="avatar__label">${label}</span>
                    <input name="${name}" type="file" class="avatar__input"/>
                </label>
            {{/if}}
        </button>
        `;
	}
}
