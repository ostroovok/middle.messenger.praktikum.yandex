import { AuthApi } from '../../../shared/api/AuthApi';
import { Routes } from 'src/shared/navigation/routes';
import { User } from 'src/shared/models/UserModels';

const authApi = new AuthApi();

const getPermissions = async (): Promise<{ redirectAllowed: boolean; logoutIsNeeded: boolean }> => {
	const { user: stateUserData } = window.store?.getState();
	const currentUserResponse = await authApi.getCurrentUser().catch(() => undefined);

	if (!stateUserData) {
		return { redirectAllowed: false, logoutIsNeeded: !currentUserResponse ? false : true };
	}
	if (currentUserResponse && (currentUserResponse as User)?.id !== stateUserData.id) {
		return { redirectAllowed: false, logoutIsNeeded: true };
	}

	return { redirectAllowed: true, logoutIsNeeded: false };
};

export const checkPermissionsToRedirect = async (pathname: string) => {
	const permissions = await getPermissions();

	const isAuthPath = [Routes.Login, Routes.SignUp].find(r => r === pathname) !== undefined;

	if (isAuthPath) {
		return pathname;
	}

	if (!permissions.redirectAllowed) {
		permissions.logoutIsNeeded && (await authApi.logout().catch());
		return Routes.Login;
	}

	if (isAuthPath) {
		return Routes.Chats;
	}

	if (pathname === '') {
		return Routes.Login;
	}

	return pathname;
};
