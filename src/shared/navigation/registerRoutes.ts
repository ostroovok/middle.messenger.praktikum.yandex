import * as Pages from 'src/pages';
import Block from 'src/core/Block';
import { Routes } from './routes';
import { Router } from 'src/core/Router/Router';
import { ErrorProps } from 'src/pages/Error';

export const registerRoutes = () => {
	const router = new Router();

	router
		.use(Routes.Default, Pages.Login)
		.use(Routes.Login, Pages.Login)
		.use(Routes.SignUp, Pages.SignUp)
		.use(Routes.Chats, Pages.Chats)
		.use(Routes.Profile, Pages.Profile)
		.use(Routes.EditProfile, Pages.EditProfilePage)
		.use(Routes.EditProfilePassword, Pages.ChangePasswordPage)
		.use(
			Routes.Error404,
			Pages.Error as typeof Block,
			{
				title: '404',
				subTitle: 'Не туда попали',
			} as ErrorProps,
		)
		.use(Routes.Error500, Pages.Error as typeof Block, {
			title: '500',
			subTitle: 'Мы уже фиксим',
		})
		.start();
};
