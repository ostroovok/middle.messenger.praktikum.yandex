import Block from 'src/core/Block';
import { default as ErrorTemplate } from './Error.hbs?raw';

type ErrorProps = {
	title: string;
	subTitle: string;
};

export class Error extends Block {
	constructor(props: ErrorProps) {
		super(props);
	}

	protected render(): string {
		return ErrorTemplate;
	}
}
