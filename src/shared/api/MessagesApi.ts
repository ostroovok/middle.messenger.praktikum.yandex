import { KEEP_ALIVE_DELAY, WAIT_CONNECTION_DELAY, WebSocketHost } from './utils/constants';

type MessagesApiProps = {
	userId: number;
	chatId: number;
	token: string;
	callback: (messages: unknown[]) => void;
};

enum MessagesEvents {
	Open = 'open',
	NewMessage = 'message',
	Close = 'close',
	Error = 'error',
}

export enum MessagesTypes {
	GetOldMessages = 'get old',
	Message = 'message',
	Error = 'error',
}

enum SocketReadyState {
	Connecting,
	Open,
	Closing,
	Closed,
}

export class MessagesApi {
	private _chatId?: number;
	private _userId?: number;
	private _token?: string;

	private socket?: WebSocket;
	private connectionKeepAlive?: NodeJS.Timeout;
	private _onNewMessageCallback?: MessagesApiProps['callback'];
	public static instance: MessagesApi | null = null;

	constructor(props: MessagesApiProps) {
		if (MessagesApi.instance && MessagesApi.instance.shouldResetInstance(props)) {
			MessagesApi.instance.closeConnection();
		} else if (MessagesApi.instance) {
			return MessagesApi.instance;
		}
		const { chatId, token, userId, callback } = props;

		this._chatId = chatId;
		this._onNewMessageCallback = callback;
		this._token = token;
		this._userId = userId;

		this.socket = new WebSocket(`${WebSocketHost}/chats/${userId}/${chatId}/${token}`);
		this.connectionKeepAlive = setInterval(() => {
			this.socket?.send('');
		}, KEEP_ALIVE_DELAY);
		this.open();
		this.setNewMessagesListener();
		this.setCloseListener();
		this.setErrorListener();
		this._onNewMessageCallback = callback;

		MessagesApi.instance = this;
	}

	private open() {
		this.socket?.addEventListener(MessagesEvents.Open, () => {
			this.getOldMessages();
			console.log('соединение открыто');
		});
	}

	private setNewMessagesListener() {
		this.socket?.addEventListener(MessagesEvents.NewMessage, event => {
			const messages = JSON.parse(event.data);
			this._onNewMessageCallback?.(Array.isArray(messages) ? messages : [messages]);
		});
	}

	private setErrorListener() {
		this.socket?.addEventListener(MessagesEvents.Error, event => {
			console.log('ERROR', event);
		});
	}

	private setCloseListener() {
		this.socket?.addEventListener(MessagesEvents.Close, () => {
			clearInterval(this.connectionKeepAlive);
			console.log('соединение закрыто');
		});
	}

	private getOldMessages() {
		this.sendMessage('', MessagesTypes.GetOldMessages);
	}

	private _closeConnection() {
		this.socket?.close();
	}

	private waitConnection(callback: () => void, delay: number = WAIT_CONNECTION_DELAY) {
		if (this.socket?.readyState === SocketReadyState.Open) {
			callback();
		} else {
			setTimeout(() => {
				this.waitConnection(callback, delay);
			}, delay);
		}
	}

	shouldResetInstance(newProps: MessagesApiProps) {
		const { chatId, token, userId } = newProps;
		return this._chatId !== chatId || this._token !== token || this._userId !== userId;
	}

	closeConnection() {
		this._closeConnection();
	}

	sendMessage(message: string, type: string = MessagesTypes.Message) {
		this.waitConnection(() => {
			this.socket?.send(JSON.stringify({ content: message, type }));
		});
	}

	getApi() {
		return MessagesApi.instance;
	}
}
