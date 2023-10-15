import Block from 'src/core/Block';
import { default as FooterTemplate } from './Footer.hbs?raw';

export class Footer extends Block {
	constructor() {
		super();
	}

	protected render() {
		return FooterTemplate;
	}
}
