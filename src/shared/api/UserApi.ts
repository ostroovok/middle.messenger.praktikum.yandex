import { HttpTransport } from './HttpTransoprt';
import { UserDataDto, UserPasswordDto, UserProfileDto } from './models';

const userApi = new HttpTransport('/user');

export class UserApi {
	async changeProfileData(data: UserProfileDto): Promise<UserDataDto | Error> {
		return userApi.put('/profile', {
			headers: { 'Content-Type': 'application/json' },
			data,
		});
	}

	async changePassword(data: UserPasswordDto): Promise<void | Error> {
		return userApi.put('/password', { headers: { 'Content-Type': 'application/json' }, data });
	}

	async changeAvatar(file: File): Promise<UserDataDto | Error> {
		const data = new FormData();
		data.append('avatar', file);
		return userApi.put('/profile/avatar', { data });
	}
}
