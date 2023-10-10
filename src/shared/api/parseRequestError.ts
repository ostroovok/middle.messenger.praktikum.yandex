type RequestError = {
	reason?: string;
};

export const parseRequestError = (error: string): RequestError => {
	const errText = JSON.parse(error);
	return errText.reason;
};
