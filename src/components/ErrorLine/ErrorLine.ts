import Block from 'src/core/Block/Block';
import { default as ErrorLineTemplate } from './ErrorLine.hbs?raw';

export class ErrorLine extends Block {
	protected render(): string {
		return ErrorLineTemplate;
	}
}
