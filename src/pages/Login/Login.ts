import Block from 'src/core/Block';
import { logFormData } from 'src/shared/logFormData';
import { RefsType } from 'src/shared/types';
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
			onLogin: (event: MouseEvent) => logFormData(this.refs as RefsType, event)
		});
	}

	protected render(): string {
		return LoginTemplate;
	}
}
