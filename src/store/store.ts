import EventBus from 'src/core/EventBus';

export enum StoreEvents {
	Updated = 'Updated',
}

export class Store<State extends Record<string, unknown>> extends EventBus {
	private _state: State = {} as State;

	constructor(initialState: State) {
		super();
		this._state = initialState;
		this.set(initialState);
	}

	public getState() {
		return this._state;
	}

	public set(newState: Partial<State>) {
		const prevState = { ...this._state };
		this._state = { ...this._state, ...newState };
		this.emit(StoreEvents.Updated, prevState, newState);
	}
}
