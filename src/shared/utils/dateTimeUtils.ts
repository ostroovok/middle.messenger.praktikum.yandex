export const isNow = (date: Date) => {
	const now = new Date();
	return (
		date.getDate() === now.getDate() &&
		date.getMonth() === now.getMonth() &&
		date.getFullYear() === now.getFullYear()
	);
};

export const getTime = (date: Date) => {
	const timeString = Number(date.getMinutes()) > 10 ? date.getMinutes() : `0${date.getMinutes()}`;
	const hoursString = Number(date.getHours()) > 10 ? date.getHours() : `0${date.getHours()}`;
	return `${hoursString}:${timeString}`;
};

export const getFullDate = (date: Date) =>
	`${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`;
