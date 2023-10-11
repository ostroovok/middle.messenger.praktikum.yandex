import { Router } from 'src/core/Router/Router';
import { AuthApi } from 'src/shared/api/AuthApi';
import { LoginDto, RegisterUserDto } from 'src/shared/api/models';
import { Routes } from 'src/shared/navigation/routes';

const authApi = new AuthApi();
const router = new Router();

export const getCurrentUser = async () => {
	const currentUser = authApi.getCurrentUser();
	return currentUser;
};

export const login = async (data: LoginDto) => {
	await authApi.login(data);
	const currentUser = await getCurrentUser();
	// window.store?.set({
	//     currentUser
	// });
	router.go(Routes.Chats);
};

export const signup = async (data: RegisterUserDto) => {
	const userId = await authApi.signup(data);
	if (userId) {
		// TODO: store
		router.go(Routes.Chats);
	}
};

export const logout = async () => {
	await authApi.logout();
	// window.store?.set({
	//     currentUser: undefined
	// })
	router.go(Routes.Login);
};
