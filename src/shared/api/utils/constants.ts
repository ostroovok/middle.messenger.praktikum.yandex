export const ApiUrl = 'https://ya-praktikum.tech/api/v2';
export const WebSocketHost = 'wss://ya-praktikum.tech/ws';

export const DEFAULT_TIMEOUT = 5000;
export const KEEP_ALIVE_DELAY = 50000;
export const WAIT_CONNECTION_DELAY = 1000;
export const OK_STATUS_NUMBER = 200;
export const OK_STATUS_KEY = 'OK';

export const getResourcesApiUrl = (path: string) => `${ApiUrl}/resources/${path}`;

export enum METHODS {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}
