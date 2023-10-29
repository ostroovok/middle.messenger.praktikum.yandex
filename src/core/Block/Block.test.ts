/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import Sinon from 'sinon';
import Block, { BlockProps } from './Block';

describe('Block tests', () => {
	const TEST_ID = 'testId';
	const getComponent = (props?: BlockProps) => {
		class TestComponent extends Block {
			constructor(props?: BlockProps) {
				super(props);
			}

			protected render() {
				return `<div id="${TEST_ID}">{{test}}</div>`;
			}
		}

		return new TestComponent(props);
	};

	describe('Set Block props & events', () => {
		it('Block must set props', () => {
			const testData = 'test';
			const component = getComponent({ test: testData });
			const componentContent = component.getContent();
			const rerenderedComponent = componentContent?.querySelector(`#${TEST_ID}`);
			expect(rerenderedComponent?.innerHTML).to.eq(testData);
		});
		it('Block must set eventListeners', () => {
			const componentEvent = Sinon.stub();
			const component = getComponent({
				events: {
					click: componentEvent,
				},
			});
			component.getContent()?.click();
			expect(componentEvent.called).to.be.true;
		});
	});

	describe('Block content getters', () => {
		it('Block must get element by call of element getter', () => {
			const component = getComponent();
			const { element } = component;
			expect(element).to.not.null;
		});
		it('Block must get content by call of getContent func', () => {
			const component = getComponent();
			const componentContent = component.getContent();
			expect(componentContent?.innerHTML).to.not.eq('');
		});
	});

	describe('Block lifecycle', () => {
		it('Block must re-render after props had changed', () => {
			const testData = 'data';
			const component = getComponent({ test: testData });
			component.setProps({ test: 'newData' });
			const componentContent = component.getContent();
			const rerenderedComponent = componentContent?.querySelector(`#${TEST_ID}`);
			expect(rerenderedComponent?.innerHTML).to.not.eq(testData);
		});
        // TODO: Реализовать тесты 
		it('Block must call didMount-func after mounted to DOM', () => {});
		it('Block must call willUnmount-func before unmount from DOM', () => {});
	});

	describe('Block display', () => {
		it('Block must show', () => {
			const component = getComponent();
			const componentContent = component.getContent();

			component.show();
			expect(componentContent?.style.display).to.eq('block');
		});
		it('Block must hide', () => {
			const component = getComponent();
			const componentContent = component.getContent();

			component.show();
			expect(componentContent?.style.display).to.eq('none');
		});
	});
});
