import { Routes } from 'src/shared/navigation/routes';
import Block, { BlockProps } from '../Block';
import { Route } from './Route';
import { checkPermissionsToRedirect } from './utils/checkPermissionsToRedirect';

export class Router {
	public static __instance: Router | null = null;

	private routes: Route[] = [];
	private history: History | null = null;
	private _currentRoute: Route | null = null;

	constructor() {
		if (Router.__instance) {
			return Router.__instance;
		}
		this.history = window.history;
		this._currentRoute = null;
		Router.__instance = this;
	}

	use(pathname: string, routeComponent: typeof Block, props?: BlockProps) {
		const route = new Route(pathname, routeComponent, props);
		this.routes.push(route);
		return this;
	}

	start() {
		window.onpopstate = event => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			this._onRoute((event as any)?.currentTarget?.location?.pathname);
		};
		this._onRoute(window.location.pathname);
	}

	_onRoute(pathname: string) {
		checkPermissionsToRedirect(pathname)
			.then(newPath => {
				if (pathname !== newPath) {
					this.history?.pushState({}, '', pathname);
				}
				const route = this.getRoute(newPath);
				if (route !== this._currentRoute && this._currentRoute && this._currentRoute.leave) {
					this._currentRoute.leave();
				}

				this._currentRoute = route ?? null;
				route?.render();
			})
			.catch(() => {
				this.history?.back();
			});
	}

	go(pathname: string) {
		this.history?.pushState({}, '', pathname);
		this._onRoute(pathname);
	}

	back() {
		this.history?.back();
	}

	forward() {
		this.history?.forward();
	}

	getRoute(pathname: string) {
		return (
			this.routes.find(route => route.match(pathname)) ??
			this.routes.find(route => route.match(Routes.Error404))
		);
	}
}
