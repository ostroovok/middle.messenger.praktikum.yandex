import * as Pages from 'src/pages';
import Block from 'src/core/Block/Block';
import { Routes } from './routes';
import { Router } from 'src/core/Router/Router';
import { ErrorProps } from 'src/pages/Error';

export const registerRoutes = () => {
	const router = new Router();

	router
		.use(Routes.Default, Pages.Login as typeof Block)
		.use(Routes.Login, Pages.Login as typeof Block)
		.use(Routes.SignUp, Pages.SignUp as typeof Block)
		.use(Routes.Chats, Pages.Chats as typeof Block)
		.use(Routes.Profile, Pages.Profile as typeof Block)
		.use(Routes.EditProfile, Pages.EditProfilePage as typeof Block)
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
