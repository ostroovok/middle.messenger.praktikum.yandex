import Block from '../../core/Block';

type LoginProps = {};

export class Login extends Block {
	constructor(props: LoginProps) {
		super({
			...props,
			validate: {
				login: (value: string) =>
					value.length < 3 && value.length !== 0 ? `Length of login should not be less 3 letters.` : '',
			},
			onLogin: (event: InputEvent) => {
				event.preventDefault();
				const login = this.refs.login.value();
				const password = this.refs.password.value();

				console.log({
					login,
					password,
				});
			},
		});
	}

	protected render(): string {
		return `
			<div class="login-page">
				{{#> Layout}}
					{{#> Form className="login-page__form" overlayClassName="login-page__form-overlay" title="Вход"}}
						<div>
							{{{ InputField placeholder="example@yandex.ru" ref="login" name="login" label="Логин" validate=validate.login }}}
							{{{ InputField name="password" ref="password" name="password" label="Пароль" }}}
						</div>
						<div class="login-page__action-buttons">
							{{{ Button label="Войти" type="primary" navTo="chats" onClick=onLogin className=""}}}
							{{{ Button label="Нет аккаунта?" type="link" navTo="signUp" className=""}}}
						</div
					{{/Form}}
				{{/Layout}}
			</div>
        `;
	}
}
