export type LoginSubmitData = {
	login: string;
	password: string;
};

export type SignupUserSubmitData = {
	email: string;
	login: string;
	first_name: string;
	second_name: string;
	phone: string;
	password: string;
};

export type SignupUserResponseData = {
	id: number;
};
