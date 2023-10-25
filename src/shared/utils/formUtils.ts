export const isValidValue = (value?: boolean | string) => !!value && typeof value !== 'boolean';

export const isNoEmpty = (value?: string | null) => !!value && !!value.length;

export const checkFields = (fields: object) =>
	Object.values(fields).some(value => {
		if (isValidValue(value)) {
			return true;
		}
		return false;
	});
