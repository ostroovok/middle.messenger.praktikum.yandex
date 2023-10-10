import { ApiUrl } from './constants';

export enum METHODS {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

type HeadersType = Record<string, string>;

type RequestDataType = Record<string, unknown>;

type HttpRequestOptions = {
	method?: METHODS;
	headers?: HeadersType;
	data?: RequestDataType;
	timeout?: number;
};

const DEFAULT_TIMEOUT = 5000;


function queryStringify(data: RequestDataType) {
	if (typeof data !== 'object') {
		throw new Error('Data must be object');
	}

	const keys = Object.keys(data);
	return keys.reduce(
		(result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`,
		'?',
	);
}

export class HttpTransport {
	private __requestUrl: string = '';

	constructor(path: string) {
		this.__requestUrl = `${ApiUrl}${path}`;
	}

	get = <TResponse>(url: string, options?: HttpRequestOptions) =>
		this.request<TResponse>(url, { ...options, method: METHODS.GET }, options?.timeout);

	post = <TResponse>(url: string, options?: HttpRequestOptions) =>
		this.request<TResponse>(url, { ...options, method: METHODS.POST }, options?.timeout);

	put = <TResponse>(url: string, options?: HttpRequestOptions) =>
		this.request<TResponse>(url, { ...options, method: METHODS.PUT }, options?.timeout);

	delete = <TResponse>(url: string, options?: HttpRequestOptions) =>
		this.request<TResponse>(url, { ...options, method: METHODS.DELETE }, options?.timeout);

	request = <TResponse = unknown>(uri: string, options: HttpRequestOptions, timeout = 5000) => {
		const { headers = {}, method, data } = options;

		return new Promise<TResponse>((resolve, reject) => {
			if (!method) {
				reject('No method');
				return;
			}

			const xhr = new XMLHttpRequest();
			const isGetMethodType = method === METHODS.GET;

			xhr.open(
				method,
				isGetMethodType && !!data
					? `${this.__requestUrl}${uri}${queryStringify(data)}`
					: `${this.__requestUrl}${uri}`,
			);

			if (headers && typeof headers === 'object') {
				Object.entries(headers).forEach(([key, value]) => {
					xhr.setRequestHeader(key, value);
				});
			}

			xhr.onload = function () {
				if (xhr.status !== 200) {
					reject(xhr.responseText);
				}
				if (xhr.response === 'OK') {
					resolve(xhr.response as TResponse);
				} else {
					resolve(JSON.parse(xhr.response) as TResponse);
				}
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.timeout = timeout;
			xhr.ontimeout = reject;
			xhr.withCredentials = true;

			if (isGetMethodType || !data) {
				xhr.send();
			} else {
				const requestData = data instanceof FormData ? data : JSON.stringify(data);
				xhr.send(requestData);
			}
		});
	};
}
