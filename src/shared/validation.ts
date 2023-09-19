import { ValidationCallback, ValidationFieldScheme } from './types';

const testForRegExp = (value: string, regexpPattern: RegExp) => {
	const regexp = new RegExp(regexpPattern);
	return regexp.test(value);
};

export const loginValidation: ValidationCallback = (value: string) =>
	testForRegExp(value, /^[A-Za-z0-9_-]{3,20}$/);

export const passwordValidation: ValidationCallback = (value: string) =>
	testForRegExp(value, /^(?=.*[A-Z])(?=.*\d).{8,40}$/);

export const emailValidation: ValidationCallback = (value: string) =>
	testForRegExp(value, /^[a-zA-Z0-9-_]+@[a-zA-Z]+\.[a-zA-Z]+$/);

export const nameValidation: ValidationCallback = (value: string) =>
	testForRegExp(value, /^[A-ZА-Я][a-zA-Zа-яА-Я]*$/);

export const phoneValidation: ValidationCallback = (value: string) =>
	testForRegExp(value, /^(\+)?\d{10,15}$/);

export const profileValidationScheme: { [key: string]: ValidationFieldScheme } = {
	login: (value: string) =>
		loginValidation(value)
			? ''
			: 'Логин должен содержать 3-20 символов латиницы, не содержать пробелов или спецсимволов кроме: - _',
	password: (value: string) =>
		passwordValidation(value)
			? ''
			: 'Пароль должен содержать 8-40 символов, не менне одной заглавной буквы и одной цифры',
	email: (value: string) => (emailValidation(value) ? '' : 'Введена почта неверного формата'),
	firstName: (value: string) => (nameValidation(value) ? '' : 'Должно начинаться с заглавной буквы'),
	secondName: (value: string) =>
		nameValidation(value) ? '' : 'Должно начинаться с заглавной буквы',
	phone: (value: string) => (phoneValidation(value) ? '' : 'Введен телефон неверного формата'),
};
