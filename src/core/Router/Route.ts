import Block, { BlockProps } from '../Block';

const render = (query: string, component: Block) => {
    //const root = document.querySelector(query);
    const root = document.getElementById(query);
    if(root) {
        root.innerHTML = '';
        const componentContent = component.getContent();
        componentContent && root.append(componentContent);
    }
}

const isEqual = (lhs?: string | null, rhs?: string | null) => lhs === rhs;
  

export class Route {
    private _pathname: string | null = null;
    private _blockClass: typeof Block | null = null;
    private _block: Block | null = null;
    private _props?: BlockProps;

    constructor(pathname: string, view: typeof Block, props?: BlockProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.unmount();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (/*!this._block && */this._blockClass) {
            this._block = new this._blockClass(this._props);
            render('root', this._block);
            return;
        }
        if(this._block) {
            render('root', this._block);
        }
    }
}