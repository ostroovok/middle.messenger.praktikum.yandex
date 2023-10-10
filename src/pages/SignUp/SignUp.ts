import Block from 'src/core/Block';
import { logFormData } from 'src/shared/utils/logFormData';
import { RefsType } from 'src/shared/types';
import { profileValidationScheme } from 'src/shared/validation';
import { default as SignUpTemplate } from './SignUp.hbs?raw';
import { Routes } from 'src/shared/navigation/routes';
import { Router } from 'src/core/Router/Router';

export class SignUp extends Block {
	private __router: Router;
	constructor() {
		super({
			validate: profileValidationScheme,
			onLogin: (_: MouseEvent) => {
				this.__router.go(Routes.Login);
			},
			onSignUp: (event: MouseEvent) => {
				logFormData(this.refs as RefsType, event);
				this.__router.go(Routes.Chats);
			},
		});

		this.__router = new Router();
	}

	protected render(): string {
		return SignUpTemplate;
	}
}
