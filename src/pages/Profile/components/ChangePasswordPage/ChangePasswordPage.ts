import Block from 'src/core/Block';
import { RefsType } from 'src/shared/types';
import { profileValidationScheme } from 'src/shared/validation';
import { default as ChangePasswordPageTemplate } from './ChangePasswordPage.hbs?raw';
import { Router } from 'src/core/Router/Router';
import { Routes } from 'src/shared/navigation/routes';
import { checkFields } from 'src/shared/utils/formUtils';
import { changeUserPassword } from 'src/services/UserService';
import { parseRequestError } from 'src/shared/api/utils/parseRequestError';
import { UserPasswordSubmitData } from 'src/shared/models/UserModels';

export class ChangePasswordPage extends Block {
	private __router: Router;
	constructor() {
		super({
			validate: {
				newPassword: profileValidationScheme.password,
			},
			goBack: () => {
				this.__router.go(Routes.Profile);
			},
			onSubmit: () => {
				if (!this.validateFields()) {
					return;
				}
				const fields = this.getFields();
				changeUserPassword(fields).catch(err => {
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
			newPassword: refs.newPassword.value(),
			oldPassword: refs.oldPassword.value(),
		} as UserPasswordSubmitData;
	}

	private validateFields() {
		const fields = this.getFields();
		return checkFields(fields);
	}

	protected render(): string {
		return ChangePasswordPageTemplate;
	}
}
