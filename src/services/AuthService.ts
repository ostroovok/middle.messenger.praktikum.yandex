import { Router } from 'src/core/Router/Router';
import { AuthApi } from 'src/shared/api/AuthApi';
import { LoginSubmitData, SignupUserSubmitData, SignupUserResponseData } from 'src/shared/models/AuthModels';
import { User } from 'src/shared/models/UserModels';
import { Routes } from 'src/shared/navigation/routes';

const authApi = new AuthApi();
const router = new Router();

export const getCurrentUser = async () => {
	const currentUser = authApi.getCurrentUser();
	return currentUser;
};

export const login = async (data: LoginSubmitData) => {
	await authApi.login(data);
	const currentUser = await getCurrentUser();
	if (!currentUser) return;
	window.store.set({
		user: currentUser as User,
	});
	router.go(Routes.Chats);
};

export const signup = async (data: SignupUserSubmitData) => {
	const userId = await authApi.signup(data);
	if (userId) {
		window.store.set({
			user: {
				avatar: '',
				display_name: '',
				email: data.email,
				first_name: data.first_name,
				id: (userId as SignupUserResponseData).id,
				login: data.login,
				phone: data.phone,
				second_name: data.second_name,
			},
		});
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
