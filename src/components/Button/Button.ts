import Block from '../../core/Block';
import { noop } from '../../shared/utils';
import { default as ButtonTemplate } from './Button.hbs?raw';

interface ButtonProps {
	type: 'primary' | 'link';
	label: string;
	navTo: string;
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
		const { type, label, navTo } = this.props;
		return `
            <button type="button" class="button button__${type}" ${navTo ? `page="${navTo}"` : ''}>
                ${label}
            </button>
        `;
	}
}
