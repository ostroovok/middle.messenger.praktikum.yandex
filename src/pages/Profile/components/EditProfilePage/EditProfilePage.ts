import Block from 'src/core/Block';
import { RefsType } from 'src/shared/types';
import { profileValidationScheme } from 'src/shared/validation';
import { default as EditProfilePageTemplate } from './EditProfilePage.hbs?raw';
import { Router } from 'src/core/Router/Router';
import { checkFields } from 'src/shared/utils/formUtils';
import { changeUser } from 'src/services/UserService';
import { parseRequestError } from 'src/shared/api/utils/parseRequestError';
import { Routes } from 'src/shared/navigation/routes';
import { User } from 'src/shared/models/UserModels';
import { connect } from 'src/store/utils';

type EditProfilePageProps = {
	user: User;
};

class _EditProfilePage extends Block {
	private __router: Router;
	constructor(props: EditProfilePageProps) {
		super({
			...props,
			validate: profileValidationScheme,
			goBack: () => {
				this.__router.go(Routes.Profile);
			},
			onSubmit: () => {
				if (!this.validateFields()) {
					return;
				}
				const fields = this.getFields();
				changeUser(fields).catch(err => {
					const errorText = parseRequestError(err);
					this.refs.errorText.setProps({ errorText });
				});
			},
		});

		this.__router = new Router();
	}

	private getFields() {
		const refs = this.refs as RefsType;
		return {
			email: refs.email.value(),
			login: refs.login.value(),
			first_name: refs.first_name.value(),
			second_name: refs.second_name.value(),
			phone: refs.phone.value(),
			display_name: refs.display_name.value(),
		} as User;
	}

	private validateFields() {
		const fields = this.getFields();
		return checkFields(fields);
	}

	protected render(): string {
		return EditProfilePageTemplate;
	}
}

export const EditProfilePage = connect(state => ({ user: state.user }))(_EditProfilePage as typeof Block);
