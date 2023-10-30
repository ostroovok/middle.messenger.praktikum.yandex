/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import Sinon from 'sinon';
import { HttpTransport } from './HttpTransoprt';
import { ApiUrl, METHODS } from '../constants';

describe('HttpTransport service tests', () => {
	const TEST_URL = '/test';
	let http: HttpTransport;
	let xhr: Sinon.SinonFakeXMLHttpRequestStatic;
	let _request: Sinon.SinonFakeXMLHttpRequest[];

	beforeEach(() => {
		http = new HttpTransport(TEST_URL);
		xhr = Sinon.useFakeXMLHttpRequest();
		xhr.onCreate = xhr => {
			_request.push(xhr);
		};
		_request = [];
	});

	afterEach(() => {
		Sinon.restore();
		_request = [];
	});

	describe('Path', () => {
		it('Must set correct path', async () => {
			const testPath = '/testPath';
			const request = Sinon.stub(http, 'request').resolves();
			await http.get(testPath);
			expect(request.calledWithMatch(testPath, { method: METHODS.GET })).to.be.true;
		});
	});

	describe('Data transform into query', () => {
		it('Must create query from simple object', () => {
			const testPath = '/testPath';
			const testData = {
				vol1: 1,
				vol2: '123',
			};
			const expected = `${ApiUrl}${TEST_URL}${testPath}?vol1=1&vol2=123`;
			http.get(testPath, { data: testData });
			expect(_request[0]?.url).to.equal(expected);
		});
		it('Must create query from object', () => {
			const testPath = '/testPath';
			const testData = {
				vol1: {
					vol11: 123,
					vol12: ['asd'],
				},
				vol2: '123',
			};
			const expected = `${ApiUrl}${TEST_URL}${testPath}?vol1[vol11]=123&vol1[vol12][0]=asd&vol2=123`;
			http.get(testPath, { data: testData });
			expect(_request[0]?.url).to.equal(expected);
		});
	});

	describe('Check general methods', () => {
		it('GET requests must go', async () => {
			const request = Sinon.stub(http, 'get').resolves();
			await http.get('');
			expect(request.called).to.be.true;
		});
		it('POST requests must go', async () => {
			const request = Sinon.stub(http, 'post').resolves();
			await http.post('');
			expect(request.called).to.be.true;
		});
		it('PUT requests must go', async () => {
			const request = Sinon.stub(http, 'put').resolves();
			await http.put('');
			expect(request.called).to.be.true;
		});
		it('DELETE requests must go', async () => {
			const request = Sinon.stub(http, 'delete').resolves();
			await http.delete('');
			expect(request.called).to.be.true;
		});
	});
});
