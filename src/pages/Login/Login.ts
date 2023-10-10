import Block from 'src/core/Block';
import { RefsType } from 'src/shared/types';
import { default as LoginTemplate } from './Login.hbs?raw';
import { Router } from 'src/core/Router/Router';
import { Routes } from 'src/shared/navigation/routes';
import { isNoEmpty, requiredField } from 'src/shared/validation';
import { login } from 'src/services/AuthService';
import { parseRequestError } from 'src/shared/api/parseRequestError';

export class Login extends Block {
	private __router: Router;

	constructor() {
		super({
			validate: {
				login: requiredField,
				password: requiredField,
			},
			onLogin: () => {
				if (!this.validateFields()) {
					return;
				}
				const { login: loginField, password: passwordField } = this.getFields();
				login({ login: loginField, password: passwordField }).catch(err => {
					const errorText = parseRequestError(err);
					this.refs.errorText.setProps({ errorText });
				});
			},
			onRegister: (_: MouseEvent) => {
				this.__router.go(Routes.SignUp);
			},
		});

		this.__router = new Router();
	}

	private getFields() {
		const refs = this.refs as RefsType;
		return {
			login: refs.login.value(),
			password: refs.password.value(),
		};
	}

	private validateFields() {
		const { login, password } = this.getFields();
		return isNoEmpty(login) && isNoEmpty(password);
	}

	protected render(): string {
		return LoginTemplate;
	}
}
