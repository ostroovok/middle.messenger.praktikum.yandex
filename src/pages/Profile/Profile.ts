import Block from 'src/core/Block';
import { default as ProfileTemplate } from './Profile.hbs?raw';
import { Router } from 'src/core/Router/Router';
import { Routes } from 'src/shared/navigation/routes';

export class Profile extends Block {
	private __router: Router;
	constructor() {
		super({
			onEditProfile: () => {
				this.__router.go(Routes.EditProfile);
			},
			onChangePassword: () => {
				this.__router.go(Routes.EditProfilePassword);
			},
			onLogout: () => {
				this.__router.go(Routes.Login);
			},
			goBack: () => {
				this.__router.back();
			},
		});
		this.__router = new Router();
	}

	protected render(): string {
		return ProfileTemplate;
	}
}
