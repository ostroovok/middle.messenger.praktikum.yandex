export type ValidationCallback = (value: string) => boolean;
export type ValidationFieldScheme = (value: string) => string;

export type RefsType<T> = Record<string, T>;
export type FieldType = Record<string, string>;
export type NamedEntity = {
	id: number;
	value: string;
};
