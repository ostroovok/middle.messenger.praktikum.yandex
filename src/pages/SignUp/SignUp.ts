import Block from '../../core/Block';
import {
	profileValidationScheme,
} from '../../shared/validation';
import { default as SignUpTemplate } from './SignUp.hbs?raw';

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
		return SignUpTemplate;
	}
}
