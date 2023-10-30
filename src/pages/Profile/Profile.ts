import Block from 'src/core/Block/Block';
import { default as ProfileTemplate } from './Profile.hbs?raw';
import { Router } from 'src/core/Router/Router';
import { Routes } from 'src/shared/navigation/routes';
import { connect } from 'src/store/utils';
import { User } from 'src/shared/models/UserModels';
import { logout } from 'src/services/AuthService';

type ProfileProps = {
	user: User;
};

class _Profile extends Block {
	private __router: Router;
	constructor(props: ProfileProps) {
		super({
			...props,
			onEditProfile: (event: MouseEvent) => {
				event.preventDefault();
				this.__router.go(Routes.EditProfile);
			},
			onChangePassword: (event: MouseEvent) => {
				event.preventDefault();
				this.__router.go(Routes.EditProfilePassword);
			},
			onLogout: (event: MouseEvent) => {
				event.preventDefault();
				logout().then(() => {
					this.__router.go(Routes.Login);
				});
			},
			goBack: (event: MouseEvent) => {
				event.preventDefault();
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
