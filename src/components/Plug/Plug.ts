import Block from 'src/core/Block/Block';
import { default as PlugTemplate } from './Plug.hbs?raw';

type PlugProps = {
	text: string;
	className?: string;
};

export class Plug extends Block {
	constructor(props: PlugProps) {
		super(props);
	}

	protected render(): string {
		return PlugTemplate;
	}
}
