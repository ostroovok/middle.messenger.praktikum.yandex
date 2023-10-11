import Block from 'src/core/Block';
import {RefsType } from 'src/shared/types';
import { profileValidationScheme, secondPasswordValidation } from 'src/shared/validation';
import { default as SignUpTemplate } from './SignUp.hbs?raw';
import { Routes } from 'src/shared/navigation/routes';
import { Router } from 'src/core/Router/Router';
import { checkFields } from 'src/shared/utils/formUtils';
import { signup } from 'src/services/AuthService';
import { parseRequestError } from 'src/shared/api/parseRequestError';

export class SignUp extends Block {
	private __router: Router;
	constructor() {
		super({
			validate: {
				...profileValidationScheme,
				secondPassword: (value: string) => {
					const secondValue = (this.refs as RefsType).password.value();
					if (checkFields({ secondValue: secondValue })) {
						return secondPasswordValidation(value, String(secondValue));
					}
				},
			},
			onLogin: (_: MouseEvent) => {
				this.__router.go(Routes.Login);
			},
			onSignUp: () => {
				if (!this.validateFields()) {
					return;
				}
				const fields = this.getFields();
				signup({
					email: fields.email.toString(),
					first_name: fields.first_name.toString(),
					login: fields.login.toString(),
					password: fields.password.toString(),
					phone: fields.phone.toString(),
					second_name: fields.second_name.toString(),
				}).catch(err => {
					const errorText = parseRequestError(err);
					this.refs.errorText.setProps({ errorText });
				});
			},
		});

		this.__router = new Router();
	}

	private getFields() {
		const refs = this.refs as RefsType;
		return {
			email: refs.email.value(),
			login: refs.login.value(),
			first_name: refs.first_name.value(),
			second_name: refs.second_name.value(),
			phone: refs.phone.value(),
			password: refs.password.value(),
		};
	}

	private validateFields() {
		const fields = this.getFields();
		return checkFields(fields);
	}

	protected render(): string {
		return SignUpTemplate;
	}
}
