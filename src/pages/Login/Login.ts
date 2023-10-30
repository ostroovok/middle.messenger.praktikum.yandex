import Block from 'src/core/Block/Block';
import { RefsType } from 'src/shared/types';
import { default as LoginTemplate } from './Login.hbs?raw';
import { Router } from 'src/core/Router/Router';
import { Routes } from 'src/shared/navigation/routes';
import { requiredField } from 'src/shared/validation';
import { login } from 'src/services/AuthService';
import { USER_LOGIN_VALID_ERROR, parseRequestError } from 'src/shared/api/utils/parseRequestError';
import { checkFields } from 'src/shared/utils/formUtils';
import { InputField } from 'src/components';

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
					const parsedError = parseRequestError(err);
					if (parsedError.reason === USER_LOGIN_VALID_ERROR) {
						this.__router.go(Routes.Chats);
					} else {
						this.refs.errorText.setProps({ errorText: parsedError.reason });
					}
				});
			},
			onRegister: (_: MouseEvent) => {
				this.__router.go(Routes.SignUp);
			},
		});

		this.__router = new Router();
	}

	private getFields() {
		const refs = this.refs as RefsType<InputField>;
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
