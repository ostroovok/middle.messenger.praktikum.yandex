import Block from 'src/core/Block';
import { logFormData } from 'src/shared/logFormData';
import { RefsType } from 'src/shared/types';
import { passwordValidation } from 'src/shared/validation';
import { default as ChangePasswordPageTemplate } from './ChangePasswordPage.hbs?raw';

export class ChangePasswordPage extends Block {
	constructor() {
		super({
			validate: {
				newPassword: (value: string) =>
					passwordValidation(value)
						? ''
						: 'Пароль должен содержать 8-40 символов, не менне одной заглавной буквы и одной цифры',
			},
			onSubmit: (event: MouseEvent) => logFormData(this.refs as RefsType, event),
		});
	}

	protected render(): string {
		return ChangePasswordPageTemplate;
	}
}
