/* eslint-disable @typescript-eslint/ban-types */
export type LoginDto = {
	login: string;
	password: string;
};

export type RegisterUserDto = {
	email: string;
	login: string;
	first_name: string;
	second_name: string;
	phone: string;
	password: string;
};

export type UserProfileDto = {
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
};

export type UserDataDto = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	phone: string;
	login: string;
	avatar: string;
	email: string;
};

export type UserPasswordDto = {
	oldPassword: string;
	newPassword: string;
};
