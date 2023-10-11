import Block from 'src/core/Block';
import { RefsType } from 'src/shared/types';
import { default as LoginTemplate } from './Login.hbs?raw';
import { Router } from 'src/core/Router/Router';
import { Routes } from 'src/shared/navigation/routes';
import { requiredField } from 'src/shared/validation';
import { login } from 'src/services/AuthService';
import { parseRequestError } from 'src/shared/api/parseRequestError';
import { checkFields } from 'src/shared/utils/formUtils';

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
				const fields = this.getFields();
				login({
					login: fields.login.toString(),
					password: fields.password.toString(),
				}).catch(err => {
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
		const fields = this.getFields();
		return checkFields(fields);
	}

	protected render(): string {
		return LoginTemplate;
	}
}
