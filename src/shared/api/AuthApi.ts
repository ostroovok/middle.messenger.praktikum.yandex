import { HttpTransport } from './HttpTransoprt';
import { LoginDto, RegisterUserDto, UserProfileDto } from './models';

const authApi = new HttpTransport('/auth');

export class AuthApi {
	async signup(data: RegisterUserDto): Promise<RegisterUserDto | Error> {
		return authApi.post('/signup', {
			headers: { 'Content-Type': 'application/json' },
			data,
		});
	}

	async login(data: LoginDto): Promise<void | Error> {
		return authApi.post('/signin', {
			headers: { 'Content-Type': 'application/json' },
			data,
		});
	}

	async logout(): Promise<void | Error> {
		return authApi.post('/logout');
	}

	async getCurrentUser(): Promise<UserProfileDto | Error> {
		return authApi.get('/user');
	}
}
