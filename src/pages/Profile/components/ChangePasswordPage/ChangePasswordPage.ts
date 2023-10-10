import Block from 'src/core/Block';
import { logFormData } from 'src/shared/utils/logFormData';
import { RefsType } from 'src/shared/types';
import { profileValidationScheme } from 'src/shared/validation';
import { default as ChangePasswordPageTemplate } from './ChangePasswordPage.hbs?raw';
import { Router } from 'src/core/Router/Router';
import { Routes } from 'src/shared/navigation/routes';

export class ChangePasswordPage extends Block {
	private __router: Router;
	constructor() {
		super({
			validate: {
				newPassword: profileValidationScheme.password,
			},
			onSubmit: (event: MouseEvent) => {
				logFormData(this.refs as RefsType, event);
				this.__router.go(Routes.Profile);
			},
			goBack: () => {
				this.__router.back();
			},
		});

		this.__router = new Router();
	}

	protected render(): string {
		return ChangePasswordPageTemplate;
	}
}
