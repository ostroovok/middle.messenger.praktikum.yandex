import EventBus, { Listener } from './EventBus';
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';

export type BlockProps = Record<string, unknown | Block<BlockProps>> & {
	events?: Record<string, () => void>;
} & object;

type RootChildren = {
	component: Block<BlockProps>;
	embed(fragment: DocumentFragment): void;
};
type ContextAndStubsType = BlockProps & { __refs: BlockProps } & {
	__children?: RootChildren[];
};

// Нельзя создавать экземпляр данного класса
class Block<T extends BlockProps = BlockProps> {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};

	public id = nanoid(6);
	protected props: BlockProps;
	protected refs: Record<string, Block> = {};
	public children: Record<string, Block>;
	private eventBus: () => EventBus;
	private _element: HTMLElement | null = null;

	/** JSDoc
	 * @param {string} tagName
	 * @param {Object} props
	 *
	 * @returns {void}
	 */
	constructor(propsWithChildren: T = {} as T) {
		const eventBus = new EventBus();

		const { props, children } = this._getChildrenAndProps(propsWithChildren);

		this.children = children;
		this.props = this._makePropsProxy(props);

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);

		eventBus.emit(Block.EVENTS.INIT);
	}

	_getChildrenAndProps(childrenAndProps: BlockProps) {
		const props: Record<string, unknown> = {};
		const children: Record<string, Block> = {};

		Object.entries(childrenAndProps).forEach(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value;
			} else {
				props[key] = value;
			}
		});

		return { props, children };
	}

	_addEvents() {
		const { events = {} } = this.props as { events: Record<string, () => void> };

		Object.keys(events).forEach(eventName => {
			this._element?.addEventListener(eventName, events[eventName]);
		});
	}

	_removeEvents() {
		const { events = {} } = this.props;

		Object.keys(events).forEach(eventName => {
			this._element?.removeEventListener(eventName, events[eventName]);
		});
	}

	_registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as Listener<unknown[]>);
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _init() {
		this.init();

		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	protected init() {}

	_componentDidMount() {
		this.componentDidMount();
	}

	componentDidMount() {}

	public dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);

		Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
	}

	private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
		if (this.componentDidUpdate(oldProps, newProps)) {
			this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
		}
	}

	protected shouldComponentUpdate(oldProps: BlockProps, newProps: BlockProps) {
		return oldProps !== newProps;
	}

	protected componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
		return this.shouldComponentUpdate(oldProps, newProps);
	}

	setProps = (nextProps: BlockProps) => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	get element() {
		return this._element;
	}

	private _render() {
		const fragment = this.compile(this.render(), this.props);

		const newElement = fragment.firstElementChild as HTMLElement;

		this._removeEvents();

		if (this._element) {
			this._element.replaceWith(newElement);
		}

		this._element = newElement;

		this._addEvents();
	}

	private compile(template: string, context: BlockProps) {
		const contextAndStubs: ContextAndStubsType = { ...context, __refs: this.refs };

		const html = Handlebars.compile(template)(contextAndStubs);

		const temp = document.createElement('template');

		temp.innerHTML = html;

		contextAndStubs.__children?.forEach(({ embed }: RootChildren) => {
			embed(temp.content);
		});

		return temp.content;
	}

	private _componentWillUnmount() {
		this.componentWillUnmount();
		this._removeEvents();
	}

	protected componentWillUnmount() {}

	unmount() {
		// this._componentWillUnmount();
	}

	protected render(): string {
		return '';
	}

	getContent() {
		return this.element;
	}

	_makePropsProxy(props: BlockProps) {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const self = this;

		return new Proxy(props, {
			get(target, prop: string) {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target, prop: string, value) {
				const oldTarget = { ...target };

				target[prop] = value;

				self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
				return true;
			},
			deleteProperty() {
				throw new Error('Нет доступа');
			},
		});
	}

	_createDocumentElement(tagName: string) {
		return document.createElement(tagName);
	}

	_setDisplay(value: string) {
		const content = this.getContent();
		if (content) {
			content.style.display = value;
		}
	}

	show() {
		this._setDisplay('block');
	}

	hide() {
		this._setDisplay('none');
	}
}

export default Block;
