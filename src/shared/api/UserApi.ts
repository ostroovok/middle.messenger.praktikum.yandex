import { UserProfile, User, UserPasswordSubmitData } from '../models/UserModels';
import { HttpTransport } from './utils/HttpTransoprt';

const userApi = new HttpTransport('/user');

export class UserApi {
	async changeProfileData(data: UserProfile): Promise<User | Error> {
		return userApi.put('/profile', {
			headers: { 'Content-Type': 'application/json' },
			data,
		});
	}

	async changePassword(data: UserPasswordSubmitData): Promise<void | Error> {
		return userApi.put('/password', { headers: { 'Content-Type': 'application/json' }, data });
	}

	async changeAvatar(file: File): Promise<User | Error> {
		const data = new FormData();
		data.append('avatar', file);
		return userApi.put('/profile/avatar', { data });
	}
}
