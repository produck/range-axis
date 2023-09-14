import * as assert from 'node:assert/strict';
import { describe, it } from 'mocha';

import * as Axis from '../../src/Structure/Axis.mjs';
import * as Boundary from '../../src/Structure/Boundary.mjs';

describe.only('::Structure::Axis', function () {
	describe('::isAxis()', function () {
		it('should get true.', function () {
			assert.equal(Axis.isAxis(Axis.normalize([])), true);
		});

		it('should get false.', function () {
			assert.equal(Axis.isAxis(1), false);
			assert.equal(Axis.isAxis({}), false);
		});
	});

	describe('::isLikeAxis()', function () {
		it('should get true.', function () {
			assert.equal(Axis.isLikeAxis(Axis.normalize([])), true);
			assert.equal(Axis.isLikeAxis([]), true);
			assert.equal(Axis.isLikeAxis([1]), true);
		});

		it('should get false.', function () {
			assert.equal(Axis.isLikeAxis(1), false);
			assert.equal(Axis.isLikeAxis([null]), false);
		});
	});

	describe('::normalize()', function () {
		it('should get an axis.', function () {
			Axis.normalize([]);
			Axis.normalize([Boundary.INFINITY.NEGATIVE, 1]);
		});

		it('should get itself if has been an axis.', function () {
			const axis = Axis.normalize([]);

			assert.equal(Axis.normalize(axis), axis);
		});

		it('should throw if not like axis.', function () {
			assert.throws(() => Axis.normalize(null), {
				name: 'TypeError',
				message: 'Invalid _axis, one "AxisLike" expected.',
			});
		});

		it('should throw if [[1, 2], [1, 3]].', function () {
			assert.throws(() => Axis.normalize([[1, 2], [1, 3]]), {
				name: 'Error',
				message: 'A "from" number should not less than the last "to".',
			});
		});

		it('should throw if [[1, 2], [1, 3]].', function () {
			assert.throws(() => Axis.normalize([[1, 2], [2, 3]]), {
				name: 'Error',
				message: 'A "from" and the last "to" cannot be inclusive or not.',
			});
		});
	});

	describe('::Axis', function () {
		describe('.size', function () {
			it('should be a number.', function () {
				assert.equal(Axis.normalize([]).size, 0);
				assert.equal(Axis.normalize([[1, 2]]).size, 1);
			});
		});

		describe('.<Symbol.toStringTag>', function () {
			const axis = Axis.normalize([]);

			assert.equal(axis.toString(), '[object RangeAxis::Axis]');
		});

		describe('.<Symbol.iterator>', function () {
			it('should clone a axis.', function () {
				const axis = Axis.normalize([[1, 2]]);
				const clone = Axis.normalize([...axis]);

				assert.notEqual(axis, clone);
				assert.equal(clone.size, 1);
			});
		});
	});
});
