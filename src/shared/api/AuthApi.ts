import { SignupUserSubmitData, LoginSubmitData, SignupUserResponseData } from '../models/AuthModels';
import { User } from '../models/UserModels';
import { HttpTransport } from './utils/HttpTransoprt/HttpTransoprt';

const authApi = new HttpTransport('/auth');

export class AuthApi {
	async signup(data: SignupUserSubmitData): Promise<SignupUserResponseData | Error> {
		return authApi.post('/signup', {
			headers: { 'Content-Type': 'application/json' },
			data,
		});
	}

	async login(data: LoginSubmitData): Promise<void | Error> {
		return authApi.post('/signin', {
			headers: { 'Content-Type': 'application/json' },
			data,
		});
	}

	async logout(): Promise<void | Error> {
		return authApi.post('/logout');
	}

	async getCurrentUser(): Promise<User | Error> {
		return authApi.get('/user');
	}
}
