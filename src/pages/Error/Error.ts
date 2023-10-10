import Block from 'src/core/Block';
import { default as ErrorTemplate } from './Error.hbs?raw';
import { Router } from 'src/core/Router/Router';

export type ErrorProps = {
	title: string;
	subTitle: string;
};

export class Error extends Block {
	private __router: Router;
	constructor(props: ErrorProps) {
		super({
			...props,
			goBack: () => {
				this.__router.back();
			},
		});

		this.__router = new Router();
	}

	protected render(): string {
		return ErrorTemplate;
	}
}
