import * as assert from 'node:assert';
import { describe, it } from 'mocha';
import * as RangeAxis from '../src/index.mjs';

const { stringify } = JSON;

describe('::Difference()', function () {
	[{
		a: [],
		b: [],
		r: [],
	}, {
		a: [[1, 10]],
		b: [],
		r: [[1, 10]],
	}, {
		a: [],
		b: [[1, 10]],
		r: [],
	}, {
		a: [[0, 10]],
		b: [[1, 2], [5, 6]],
		r: [[0, 1], [2, 5], [6, 10]],
	}, {
		a: [[0, 3]],
		b: [[5, 8]],
		r: [[0, 3]],
	}, {
		a: [[5, 8]],
		b: [[0, 3]],
		r: [[5, 8]],
	}, {
		a: [[3, 5]],
		b: [[0, 8]],
		r: [],
	}, {
		a: [[0, 5]],
		b: [[4, 8]],
		r: [[0, 4]],
	}, {
		a: [[0, 5], [7, 9]],
		b: [[4, 6]],
		r: [[0, 4], [7, 9]],
	}, {
		a: [[0, 10]],
		b: [[4, 8]],
		r: [[0, 4], [8, 10]],
	}, {
		a: [[5, 10]],
		b: [[4, 8]],
		r: [[8, 10]],
	}, {
		a: [[0, 2], [3, 4], [5, 7]],
		b: [[1, 6], [8, 10]],
		r: [[0, 1], [6, 7]],
	}].slice(0).forEach(question => {
		const { a, b, r } = question;

		const clone = {
			a: [...a.map(range => [...range])],
			b: [...b.map(range => [...range])],
		};

		it(`should ${stringify(a)}-${stringify(b)}=${stringify(r)}.`, function () {
			assert.deepEqual(a, clone.a);
			assert.deepEqual(b, clone.b);
			assert.deepEqual(RangeAxis.Difference(a, b), r);
		});
	});
});
