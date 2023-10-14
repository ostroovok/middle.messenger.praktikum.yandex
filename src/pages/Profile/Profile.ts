import Block from 'src/core/Block';
import { default as ProfileTemplate } from './Profile.hbs?raw';
import { Router } from 'src/core/Router/Router';
import { Routes } from 'src/shared/navigation/routes';
import { connect } from 'src/store/utils';
import { User } from 'src/shared/models/UserModels';

type ProfileProps = {
	user: User;
};

class _Profile extends Block {
	private __router: Router;
	constructor(props: ProfileProps) {
		super({
			...props,
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
				this.__router.go(Routes.Chats);
			},
		});
		this.__router = new Router();
	}

	protected render(): string {
		return ProfileTemplate;
	}
}

export const Profile = connect(state => ({ user: state.user }))(_Profile as typeof Block);
