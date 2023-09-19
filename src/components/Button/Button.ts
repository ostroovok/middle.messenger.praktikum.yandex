import Block from '../../core/Block';
import { noop } from '../../shared/utils';

interface ButtonProps {
	type: 'primary' | 'link';
	label: string;
	navTo: string;
	className: string;
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
		const { type, label, navTo, className } = this.props;
		return `
            <button 
			type="button" 
			class="button button__${type} ${className}" 
			${navTo ? `page="${navTo}"` : ''}>
				${label}
            </button>
        `;
	}
}
