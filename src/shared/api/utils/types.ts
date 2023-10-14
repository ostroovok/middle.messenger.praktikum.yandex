import { METHODS } from "./constants";

export type PlainObject<T = unknown> = {
	[k in string]: T;
};

export type HeadersType = Record<string, string>;

export type RequestDataType = object;

export type HttpRequestOptions = {
	method?: METHODS;
	headers?: HeadersType;
	data?: RequestDataType;
	timeout?: number;
};