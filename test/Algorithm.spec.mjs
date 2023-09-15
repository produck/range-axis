import * as assert from 'node:assert/strict';
import { describe, it } from 'mocha';

import { RangeAxisAlgorithm } from '../src/Algorithm.mjs';
import { Range } from '../src/Structure/index.mjs';

const { stringify } = JSON;

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

	describe.only('.union()', function () {
		const algorithm = new RangeAxisAlgorithm();

		[{
			a: [[1, 2]],
			b: [],
			r: [[1, 2]],
		}, {
			a: [],
			b: [],
			r: [],
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
		// }, {
		// 	a: [[1, 1], [2, 3]],
		// 	b: [[1, 6]],
		// 	r: [[1, 6]],
		// }, {
		// 	a: [[3, 3], [6, 6]],
		// 	b: [[1, 1]],
		// 	r: [[1, 1], [3, 3], [6, 6]],
		}].slice(6, 7).forEach(question => {
			const { a, b, r } = question;

			it.only(`should ${stringify(a)}∪${stringify(b)}=${stringify(r)}.`, function () {
				assert.deepEqual([...algorithm.union(a, b)], r.map(Range.normalize));
			});

			it(`should ${stringify(b)}∪${stringify(a)}=${stringify(r)}.`, function () {
				assert.deepEqual([...algorithm.union(b, a)], r.map(Range.normalize));
			});
		});
	});

	describe('.intersection()', function () {

	});

	describe('.difference()', function () {

	});
});
