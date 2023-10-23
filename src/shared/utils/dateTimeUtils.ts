export const isNow = (date: Date) => {
	const now = new Date();
	return (
		date.getDate() === now.getDate() &&
		date.getMonth() === now.getMonth() &&
		date.getFullYear() === now.getFullYear()
	);
};

export const getTime = (date: Date) => `${date.getHours()}:${date.getMinutes()}`;

export const getFullDate = (date: Date) =>
	`${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
