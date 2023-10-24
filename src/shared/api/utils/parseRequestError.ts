type RequestError = {
	reason?: string;
};

export const USER_LOGIN_VALID_ERROR = 'User already in system';

export const parseRequestError = (error: string): RequestError => {
	const errText = JSON.parse(error);
	return errText;
};
