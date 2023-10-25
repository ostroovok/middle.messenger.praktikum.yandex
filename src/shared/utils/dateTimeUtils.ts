export const getTime = (date: Date) => {
	const time = date.getMinutes();
	const hours = date.getHours();
	const timeString = Number(time) >= 10 ? time : `0${time}`;
	const hoursString = Number(hours) >= 10 ? hours : `0${hours}`;
	return `${hoursString}:${timeString}`;
};

export const getFullDate = (date: Date) => {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	const dayString = Number(day) >= 10 ? day : `0${day}`;
	const monthString = Number(month) >= 10 ? month : `0${month}`;
	return `${dayString}.${monthString}.${year}`;
};

export const getDateOrTime = (date: Date) => {
	const now = new Date();
	const isTime =
		date.getDate() === now.getDate() &&
		date.getMonth() === now.getMonth() &&
		date.getFullYear() === now.getFullYear();
	return isTime ? getTime(date) : getFullDate(date);
};
