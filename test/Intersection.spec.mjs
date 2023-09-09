import * as assert from 'node:assert';
import { describe, it } from 'mocha';
import * as RangeAxis from '../src/index.mjs';

const { stringify } = JSON;

describe('::Intersection()', function () {
	[{
		a: [[0, 2], [5, 7]],
		b: [[1, 6]],
		r: [[1, 2], [5, 6]],
	}, {
		a: [[0, 2], [3, 4], [5, 7]],
		b: [[1, 6], [8, 10]],
		r: [[1, 2], [3, 4], [5, 6]],
	}, {
		a: [[0, 2], [5, 7]],
		b: [[3, 4]],
		r: [],
	}, {
		a: [],
		b: [],
		r: [],
	}, {
		a: [[1, 100]],
		b: [],
		r: [],
	}, {
		a: [[1, 1], [2, 3]],
		b: [[1, 6]],
		r: [[1, 1], [2, 3]],
	}, {
		a: [[3, 3], [6, 6]],
		b: [[1, 1]],
		r: [],
	}].slice(0).forEach(question => {
		const { a, b, r } = question;

		it(`should ${stringify(a)}∩${stringify(b)}=${stringify(r)}.`, function () {
			assert.deepEqual(RangeAxis.Intersection(a, b), r);
		});
	});
});
