/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { Block } from 'src/core/Block';
import { Router } from './Router';
import Sinon from 'sinon';
import { BlockProps } from '../Block/Block';

describe('Router tests', () => {
	const HOST = 'http://localhost:3000';
	const TEST_ROUTER_PATH = 'testURL';

	const getComponent = () => {
		class TestComponent extends Block {
			constructor(props?: BlockProps) {
				super(props);
			}

			protected render() {
				return `<div title="test">test block</div>`;
			}
		}

		return TestComponent;
	};

	const getRouter = () => new Router();

	describe('router lifecycle', () => {
		it('router must start', () => {
			const onRouteStub = Sinon.stub();
			const router = getRouter();

			router._onRoute = onRouteStub;
			router.start();
			expect(onRouteStub.calledOnce).to.be.true;
		});
		it('router must have only one instance', () => {
			const firstRouter = getRouter();
			const secondRouter = getRouter();

			expect(firstRouter).to.eq(secondRouter);
		});
	});

	describe('router routes', () => {
		it('router must add new routes', () => {
			const router = getRouter();
			const testComponent = getComponent();
			const spy = Sinon.spy(router, 'use');

			router.use(TEST_ROUTER_PATH, testComponent as typeof Block);
			expect(spy.called).to.be.true;
		});
		it('router must to get existing routes', () => {
			const router = getRouter();
			const testRoute = router.getRoute(TEST_ROUTER_PATH);
			expect(testRoute).to.not.undefined;
		});
	});

	describe('router steps', () => {
		it('router must go to existing route', () => {
			const router = getRouter();
			router.go(TEST_ROUTER_PATH);
			expect(window.location.href).to.eq(`${HOST}/${TEST_ROUTER_PATH}`);
		});
		it('router must go back', () => {
			const spy = Sinon.spy(window.history, 'back');
			const router = getRouter();
			router.back();
			expect(spy.called).to.be.true;
		});
		it('router must go forward', () => {
			const spy = Sinon.spy(window.history, 'forward');
			const router = getRouter();
			router.forward();
			expect(spy.called).to.be.true;
		});
	});
});
