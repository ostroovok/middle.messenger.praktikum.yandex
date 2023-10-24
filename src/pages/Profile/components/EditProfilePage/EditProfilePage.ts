import Block from 'src/core/Block';
import { RefsType } from 'src/shared/types';
import { profileValidationScheme } from 'src/shared/validation';
import { default as EditProfilePageTemplate } from './EditProfilePage.hbs?raw';
import { Router } from 'src/core/Router/Router';
import { checkFields } from 'src/shared/utils/formUtils';
import { changeUser, changeUserAvatar } from 'src/services/UserService';
import { parseRequestError } from 'src/shared/api/utils/parseRequestError';
import { Routes } from 'src/shared/navigation/routes';
import { User } from 'src/shared/models/UserModels';
import { InputField } from 'src/components';

type EditProfilePageProps = {
	user: User;
};

export class EditProfilePage extends Block {
	private __router: Router;
	constructor(props: EditProfilePageProps) {
		const { user } = window.store.getState();
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
			onChangeAvatar: (event?: Event) => {
				const files = (event?.target as HTMLInputElement).files ?? [];
				if (files.length) {
					const file = files[0];
					changeUserAvatar(file).catch(err => {
						const errorText = parseRequestError(err);
						this.refs.errorText.setProps({ errorText });
					});
				}
			},
			user,
		});

		this.__router = new Router();
	}

	private getFields() {
		const refs = this.refs as RefsType<InputField>;
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
