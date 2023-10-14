export type UserProfile = {
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
};

export type User = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	phone: string;
	login: string;
	avatar: string | null;
	email: string;
};

export type UserPasswordSubmitData = {
	oldPassword: string;
	newPassword: string;
};
