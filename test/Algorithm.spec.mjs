import * as assert from 'node:assert/strict';
import { describe, it } from 'mocha';

import { RangeAxisAlgorithm } from '../src/Algorithm.mjs';
import { Boundary, Range } from '../src/Structure/index.mjs';

const { stringify: _t } = JSON;

describe('::Algorithm', function () {
	it('should create an algorithm.', function () {
		new RangeAxisAlgorithm();
	});

	describe('.setTolerance()', function () {
		it('should ok.', function () {
			const algorithm = new RangeAxisAlgorithm();

			algorithm.setTolerance(0.000000001);
		});

		it('should throw if bad value.', function () {
			assert.throws(() => new RangeAxisAlgorithm().setTolerance(), {
				name: 'TypeError',
				message: 'Invalid ".value", one "numeric" expected.',
			});
		});
	});

	describe('.union()', function () {
		const algorithm = new RangeAxisAlgorithm();

		[{
			a: [],
			b: [],
			r: [],
		}, {
			a: [[1, 2]],
			b: [],
			r: [[1, 2]],
		}, {
			a: [[1, 2]],
			b: [[3, 4]],
			r: [[1, 2], [3, 4]],
		}, {
			a: [[1, 3]],
			b: [[2, 4]],
			r: [[1, 4]],
		}, {
			a: [[0, 2], [5, 7]],
			b: [[1, 6]],
			r: [[0, 7]],
		}, {
			a: [[0, 2], [5, 7]],
			b: [[3, 4]],
			r: [[0, 2], [3, 4], [5, 7]],
		}, {
			a: [[0, 2], [5, 7]],
			b: [[6, 8]],
			r: [[0, 2], [5, 8]],
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

			it(`should ${_t(a)}∪${_t(b)}=${_t(r)}.`, function () {
				assert.deepEqual([...algorithm.union(a, b)], r.map(Range.normalize));
			});

			it(`should ${_t(b)}∪${_t(a)}=${_t(r)}.`, function () {
				assert.deepEqual([...algorithm.union(b, a)], r.map(Range.normalize));
			});
		});
	});

	describe.only('.intersection()', function () {
		const algorithm = new RangeAxisAlgorithm();

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
		}, {
			a: [[-Infinity, Infinity]],
			b: [[0, 10]],
			r: [[0, 10]],
		}, {
			a: [[0, Boundary.E(1)]],
			b: [[1, 2]],
			r: [],
		}].slice(0).forEach(question => {
			const { a, b, r } = question;

			it(`should ${_t(a)}∩${_t(b)}=${_t(r)}.`, function () {
				assert.deepEqual([...algorithm.intersection(a, b)], r.map(Range.normalize));
			});

			it(`should ${_t(b)}∩${_t(a)}=${_t(r)}.`, function () {
				assert.deepEqual([...algorithm.intersection(b, a)], r.map(Range.normalize));
			});
		});
	});

	describe('.difference()', function () {
		const algorithm = new RangeAxisAlgorithm();

		[{
			a: [],
			b: [],
			r: [],
			s: [],
		}, {
			a: [[1, 10]],
			b: [],
			r: [[1, 10]],
			s: [],
		}, {
			a: [[0, 10]],
			b: [[1, 2], [5, 6]],
			r: [[0, 1], [2, 5], [6, 10]],
			s: [],
		}, {
			a: [[0, 3]],
			b: [[5, 8]],
			r: [[0, 3]],
			s: [[5, 8]],
		}, {
			a: [[3, 5]],
			b: [[0, 8]],
			r: [],
			s: [[0, 3], [5, 8]],
		}, {
			a: [[0, 5]],
			b: [[4, 8]],
			r: [[0, 4]],
			s: [[5, 8]],
		}, {
			a: [[0, 5], [7, 9]],
			b: [[4, 6]],
			r: [[0, 4], [7, 9]],
			s: [[5, 6]],
		}, {
			a: [[0, 10]],
			b: [[4, 8]],
			r: [[0, 4], [8, 10]],
			s: [],
		}, {
			a: [[5, 10]],
			b: [[4, 8]],
			r: [[8, 10]],
			s: [],
		}, {
			a: [[0, 2], [3, 4], [5, 7]],
			b: [[1, 6], [8, 10]],
			r: [[0, 1], [6, 7]],
			s: [[2, 3], [4, 5], [8, 10]],
		}].slice(6, 7).forEach(question => {
			const { a, b, r, s } = question;

			it(`should ${_t(a)}-${_t(b)}=${_t(r)}.`, function () {
				assert.deepEqual([...algorithm.difference(a, b)], r.map(Range.normalize));
			});

			it(`should ${_t(b)}-${_t(a)}=${_t(s)}.`, function () {
				assert.deepEqual([...algorithm.difference(b, a)], s.map(Range.normalize));
			});
		});
	});
});
