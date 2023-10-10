import { InputField } from '../components';

export type ValidationCallback = (value: string) => boolean;
export type ValidationFieldScheme = (value: string) => string;

export type RefsType = Record<string, InputField>;
