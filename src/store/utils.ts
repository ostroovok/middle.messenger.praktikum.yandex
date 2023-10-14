import isEqual from 'src/shared/utils/isEqual';
import Block from '../core/Block';
import { Store, StoreEvents } from './store';
import { State } from './types';

export const createStore = () => {
	if (window.store) return;
	const initState: State = {
		error: null,
		user: null,
		isOpenDialogChat: false,
		chats: [],
	};

	window.store = new Store<State>(initState);
};

export const connect = (mapStateToProps: (state: State) => Partial<State>) => {
	if (!window.store) createStore();
	return function <P extends object>(Component: typeof Block) {
		return class extends Component {
			private onChangeStoreCallback: () => void;
			constructor(props: P) {
				const { store } = window;

				// сохраняем начальное состояние
				let state = mapStateToProps(store.getState());

				super({ ...props, ...state });

				this.onChangeStoreCallback = () => {
					if (!store) return;

					// при обновлении получаем новое состояние
					const newState = mapStateToProps(store.getState());

					// если что-то из используемых данных поменялось, обновляем компонент
					if (!isEqual(state, newState)) {
						this.setProps({ ...newState });
					}

					// не забываем сохранить новое состояние
					state = newState;
					console.log(state);
				};

				// подписываемся на событие
				store.on(StoreEvents.Updated, this.onChangeStoreCallback);
			}

			componentWillUnmount() {
				super.componentWillUnmount();
				window.store?.off(StoreEvents.Updated, this.onChangeStoreCallback);
			}
		};
	};
};
