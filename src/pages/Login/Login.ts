import Block from '../../core/Block';
import { default as LoginTemplate } from './Login.hbs?raw';

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
		return LoginTemplate;
	}
}
