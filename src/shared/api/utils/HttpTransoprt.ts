import { ApiUrl, DEFAULT_TIMEOUT, METHODS, OK_STATUS_KEY, OK_STATUS_NUMBER } from './constants';
import { queryStringify } from './queryStringify';
import { HttpRequestOptions } from './types';

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

	request = <TResponse = unknown>(
		uri: string,
		options: HttpRequestOptions,
		timeout = DEFAULT_TIMEOUT,
	) => {
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

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.timeout = timeout;
			xhr.ontimeout = reject;
			xhr.withCredentials = true;

			xhr.onload = function () {
				if (xhr.status !== OK_STATUS_NUMBER) {
					reject(xhr.responseText);
				}
				if (xhr.response === OK_STATUS_KEY) {
					resolve(xhr.response as TResponse);
				} else {
					resolve(JSON.parse(xhr.response) as TResponse);
				}
			};

			if (isGetMethodType || !data) {
				xhr.send();
			} else {
				const requestData = data instanceof FormData ? data : JSON.stringify(data);
				xhr.send(requestData);
			}
		});
	};
}
