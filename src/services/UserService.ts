import { UserDataDto, UserPasswordDto } from 'src/shared/api/models';
import { UserApi } from 'src/shared/api/UserApi';
import { Router } from 'src/core/Router/Router';
import { Routes } from 'src/shared/navigation/routes';

const userApi = new UserApi();
const router = new Router();

export const changeUser = async (data: UserDataDto) => {
	const newUserData = await userApi.changeProfileData(data);
	// TODO: set in store
	router.go(Routes.Profile);
};
export const changeUserPassword = async (data: UserPasswordDto) => {
	await userApi.changePassword(data);
	router.go(Routes.Profile);
};

export const changeUserAvatar = async (data: File) => {
	const newUserData = await userApi.changeAvatar(data);
    // TODO: set in store
};
