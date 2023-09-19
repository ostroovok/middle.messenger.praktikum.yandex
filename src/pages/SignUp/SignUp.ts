import Block from '../../core/Block';
import {
	profileValidationScheme,
} from '../../shared/validation';

export class SignUp extends Block {
	constructor() {
		super({
			validate: profileValidationScheme,
			onSignUp: (event: InputEvent) => {
				event.preventDefault();
				const email = this.refs.email.value();
				const login = this.refs.login.value();
				const firstName = this.refs.firstName.value();
				const secondName = this.refs.secondName.value();
				const phone = this.refs.phone.value();
				const password = this.refs.password.value();

				console.log({
					email,
					login,
					firstName,
					secondName,
					phone,
					password,
				});
			},
		});
	}

	protected render(): string {
		return `
        <div class="sign-up">
            {{#> Layout}}
                {{#> Form className="sign-up__form" overlayClassName="sign-up__form-overlay" title="Регистрация"}}
                    <div>
                        {{{ InputField ref="email" name="email" label="Почта" type="email" overlayClassName="" validate=validate.email}}}
                        {{{ InputField ref="login"  name="login" label="Логин" type="text" className="" validate=validate.login}}}
                        {{{ InputField ref="firstName"  name="firstName" label="Имя" type="text" className="" validate=validate.firstName}}}
                        {{{ InputField ref="secondName"  name="secondName" label="Фамилия" type="text" className="" validate=validate.secondName}}}
                        {{{ InputField ref="phone"  name="phone" label="Телефон" type="text" className="" validate=validate.phone}}}
                        {{{ InputField ref="password"  name="password" label="Пароль" type="text" className="" validate=validate.password}}}
                        {{{ InputField  ref="secondPassword" label="Пароль (ещё раз)" type="text" className="" validate=validate.password}}}
                    </div>
                    <div class="sign-up__action-buttons">
                        {{{ Button label="Зарегистрироваться" type="primary" navTo="chats" onClick=onSignUp className=""}}}
                        {{{ Button label="Войти" type="link" navTo="login" className=""}}}
                    </div>
                {{/Form}}
            {{/Layout}}
        </div>
        `;
	}
}
