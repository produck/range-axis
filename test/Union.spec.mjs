import * as assert from 'node:assert';
import { describe, it } from 'mocha';
import * as RangeAxis from '../src/index.mjs';

const { stringify } = JSON;

describe('::Union()', function () {
	[{
		a: [[0, 2], [5, 7]],
		b: [[1, 6]],
		r: [[0, 7]],
	}, {
		a: [[0, 2], [5, 7]],
		b: [[3, 4]],
		r: [[0, 2], [3, 4], [5, 7]],
	}, {
		a: [],
		b: [],
		r: [],
	}, {
		a: [[1, 2]],
		b: [],
		r: [[1, 2]],
	}, {
		a: [[1, 1], [2, 3]],
		b: [[1, 6]],
		r: [[1, 6]],
	}, {
		a: [[3, 3], [6, 6]],
		b: [[1, 1]],
		r: [[1, 1], [3, 3], [6, 6]],
	}].slice(0).forEach(question => {
		const { a, b, r } = question;

		it(`should ${stringify(a)}∪${stringify(b)}=${stringify(r)}.`, function () {
			assert.deepEqual(RangeAxis.Union(a, b), r);
		});
	});
});
