import Block from '../../../../core/Block';
import { passwordValidation } from '../../../../shared/validation';
import { default as ChangePasswordPageTemplate } from './ChangePasswordPage.hbs?raw';

type ChangePasswordPageProps = {};

export class ChangePasswordPage extends Block {
	constructor(props: ChangePasswordPageProps) {
		super({
			...props,
            validate: {
                newPassword: (value: string) => passwordValidation(value) ? '' : 'Пароль должен содержать 8-40 символов, не менне одной заглавной буквы и одной цифры'
            },
			onSubmit: (event: InputEvent) => {
				event.preventDefault();
				const oldPassword = this.refs.oldPassword.value();
				const newPassword = this.refs.newPassword.value();

				console.log({
					oldPassword,
					newPassword,
				});
			},
		});
	}

	protected render(): string {
		return ChangePasswordPageTemplate;
	}
}
