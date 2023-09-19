import Block from '../../../../core/Block';
import { passwordValidation } from '../../../../shared/validation';

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
		return `
        <div class="change-password-page">
            {{#> Sider }}
                {{{ IconButton navTo="profile" imageSrc="/src/assets/images/arrow-blue.svg" className="change-password-page__back-button"}}}
            {{/Sider}}
            {{#> Layout className="change-password-page__container"}}
                {{#> Form className="change-password-page__form-container" overlayClassName="change-password-page__form-overlay"}}
                    <div class="change-password-page__form-data">
                    <div class="change-password-page__avatar">
                        {{{ Avatar 
                            imageSrc="/src/assets/images/unknown-image.svg" 
                            label="Поменять аватар" 
                            name="avatar" 
                            className="" 
                            disabled=true
                        }}}
                    </div>
                    <div class="change-password-page__fields">
                        {{{ ProfileInputField ref="oldPassword" name="oldPassword" label="Старый пароль"  type="password" }}}
                        {{{ ProfileInputField ref="newPassword" name="newPassword" label="Новый пароль" type="password" validate=validate.newPassword}}}
                        {{{ ProfileInputField ref="newPasswordRepeat" label="Повторите новый пароль" type="password" validate=validate.newPassword}}}
                    </div>
                    </div>
                    <div class="change-password-page__actions">
                        {{{ Button label="Сохранить" navTo="profile" type="primary" className="change-password-page__action-button" onClick=onSubmit }}}
                    </div>
                {{/Form}}
            {{/Layout}}
        </div>
        `;
	}
}
