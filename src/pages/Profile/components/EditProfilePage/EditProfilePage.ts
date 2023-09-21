import Block from '../../../../core/Block';
import { profileValidationScheme } from '../../../../shared/validation';
import { default as EditProfilePageTemplate } from './EditProfilePage.hbs?raw';

type EditProfilePageProps = {};

export class EditProfilePage extends Block {
	constructor(props: EditProfilePageProps) {
		super({
			...props,
			validate: profileValidationScheme,
			onSubmit: (event: InputEvent) => {
				event.preventDefault();
				const email = this.refs.email.value();
				const login = this.refs.login.value();
				const first_name = this.refs.first_name.value();
				const second_name = this.refs.second_name.value();
				const display_name = this.refs.display_name.value();
				const phone = this.refs.phone.value();

				console.log({
					email,
					login,
					first_name,
					second_name,
					display_name,
					phone,
				});
			},
		});
	}

	protected render(): string {
		return EditProfilePageTemplate;
	}
}
