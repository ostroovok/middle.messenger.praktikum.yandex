enum METHODS {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

type HeadersType = Record<string, string>;

type RequestDataType = Record<string, unknown>;

type HttpRequestOptions = {
	method: METHODS;
	headers: HeadersType;
	data: RequestDataType;
	timeout?: number;
};

type MethodType = (url: string, options: HttpRequestOptions) => Promise<unknown>;
type RequestMethodType = (
	url: string,
	options: HttpRequestOptions,
	timeout?: number
) => Promise<unknown>;

function queryStringify(data: RequestDataType) {
	if (typeof data !== 'object') {
		throw new Error('Data must be object');
	}

	const keys = Object.keys(data);
	return keys.reduce((result, key, index) => {
		return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
	}, '?');
}

export class HTTPTransport {
	get: MethodType = (url, options) => {
		return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
	};

	post: MethodType = (url, options) => {
		return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
	};

	put: MethodType = (url, options) => {
		return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
	};

	delete: MethodType = (url, options) => {
		return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
	};

	request: RequestMethodType = (url, options, timeout = 5000) => {
		const { headers = {}, method, data } = options;

		return new Promise(function (resolve, reject) {
			if (!method) {
				reject('No method');
				return;
			}

			const xhr = new XMLHttpRequest();
			const isGetMethodType = method === METHODS.GET;

			xhr.open(method, isGetMethodType && !!data ? `${url}${queryStringify(data)}` : url);

			Object.keys(headers).forEach(key => {
				xhr.setRequestHeader(key, headers[key]);
			});

			xhr.onload = function () {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;

			xhr.timeout = timeout;
			xhr.ontimeout = reject;

			if (isGetMethodType || !data) {
				xhr.send();
			} else {
				const stringifyData = JSON.stringify(data);
				xhr.send(stringifyData);
			}
		});
	}
}
