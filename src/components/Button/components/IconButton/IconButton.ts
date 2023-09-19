import Block from '../../../../core/Block';

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
	}

	protected render(): string {
		const { className, imageSrc, navTo, type } = this.props as IconButtonProps;

		return `
        <button 
        class="icon-button ${className}" 
        type="${type}" 
        page="${navTo}">
            <img src="${imageSrc}">
        </button>`;
	}
}
