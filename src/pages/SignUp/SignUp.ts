import Block from 'src/core/Block';
import { logFormData } from 'src/shared/logFormData';
import { RefsType } from 'src/shared/types';
import { profileValidationScheme } from 'src/shared/validation';
import { default as SignUpTemplate } from './SignUp.hbs?raw';

export class SignUp extends Block {
	constructor() {
		super({
			validate: profileValidationScheme,
			onSignUp: (event: MouseEvent) => logFormData(this.refs as RefsType, event),
		});
	}

	protected render(): string {
		return SignUpTemplate;
	}
}
