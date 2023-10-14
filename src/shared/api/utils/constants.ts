export const ApiUrl = 'https://ya-praktikum.tech/api/v2';
export const DEFAULT_TIMEOUT = 5000;
export const OK_STATUS_NUMBER = 200;
export const OK_STATUS_KEY = 'OK';

export const getResourcesApiUrl = (path: string) => `${ApiUrl}/resources/${path}`;

export enum METHODS {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}
