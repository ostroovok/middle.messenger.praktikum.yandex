import { UserApi } from 'src/shared/api/UserApi';
import { Router } from 'src/core/Router/Router';
import { Routes } from 'src/shared/navigation/routes';
import { User, UserPasswordSubmitData } from 'src/shared/models/UserModels';

const userApi = new UserApi();
const router = new Router();

export const changeUser = async (data: User) => {
	const newUserData = await userApi.changeProfileData(data);
	if (!newUserData) return;
	window.store.set({
		user: newUserData as User,
	});
	router.go(Routes.Profile);
};
export const changeUserPassword = async (data: UserPasswordSubmitData) => {
	await userApi.changePassword(data);
	router.go(Routes.Profile);
};

export const changeUserAvatar = async (data: File) => {
	const newUserData = await userApi.changeAvatar(data);
	// TODO: set in store
};
