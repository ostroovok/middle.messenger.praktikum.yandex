import Block from '../../core/Block';

export class LoginPage extends Block {
	constructor() {
		super({
			validate: {
				login: (value: string) =>
					value.length < 3 && value.length !== 0 ? `Length of login should not be less 3 letters.` : '',
			},
			onLogin: (event: InputEvent) => {
				console.log(this.refs);

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
							{{{ InputField placeholder="example@yandex.ru" ref="login" name="login" labelText="Логин" }}}
							{{{ InputField name="password" labelText="Пароль" ref="password" name="password"}}}
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

// <div class="container">
//                 {{#> FormAuth}}
//                     {{{ InputField label="Login" ref="login" validate=validate.login }}}
//                     {{{ InputField label="Password" ref="password" }}}
//                     {{{ Button label="Sign in" type="primary" page="list" onClick=onLogin }}}
//                     {{{ Button label="Sign up" type="link" }}}
//                 {{/FormAuth}}
//             </div>
