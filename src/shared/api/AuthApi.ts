import { HttpTransport } from './HttpTransoprt';
import { LoginDto, RegisterUserDto, UserProfileDto } from './models';

const authApi = new HttpTransport('/auth');

/**
 * API авторизации/аутентификации
 */
export default class AuthApi {
	/**
	 * Запрос на регистрацию пользователя
	 */
	async register(data: RegisterUserDto): Promise<RegisterUserDto | Error> {
		return authApi.post('/signup', {
			headers: { 'Content-Type': 'application/json' },
			data,
		});
	}

	/**
	 * Запрос на вход
	 */
	async login(data: LoginDto): Promise<void | Error> {
		return authApi.post('/signin', {
			headers: { 'Content-Type': 'application/json' },
			data,
		});
	}

	/**
	 * Запрос на выход
	 */
	async logout(): Promise<void | Error> {
		return authApi.post('/logout');
	}

	/**
	 * Запрос на получение текущего пользователя
	 */
	async getCurrentUser(): Promise<UserProfileDto | Error> {
		return authApi.get('/user');
	}
}
