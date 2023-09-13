import * as assert from 'node:assert/strict';
import { describe, it } from 'mocha';

import * as Range from '../../src/Structure/Range.mjs';
import * as Boundary from '../../src/Structure/Boundary.mjs';

describe.only('::Structure::Range', function () {
	describe('::isRange()', function () {
		it('should get true.', function () {
			const range = Range.normalize([1, 2]);

			assert.equal(Range.isRange(range), true);
		});

		it('should get false.', function () {
			assert.equal(Range.isRange({}), false);
		});
	});

	describe('::isLikeRange()', function () {
		it('should get true.', function () {
			assert.equal(Range.isLikeRange([1, 2]), true);
			assert.equal(Range.isLikeRange(Range.normalize([1, 2])), true);
			assert.equal(Range.isLikeRange(1), true);
		});

		it('should get false.', function () {
			assert.equal(Range.isLikeRange({}), false);
			assert.equal(Range.isLikeRange([1, 2, 3]), false);
			assert.equal(Range.isLikeRange([null, 2]), false);
			assert.equal(Range.isLikeRange(Infinity), false);
			assert.equal(Range.isLikeRange([Boundary.INFINITY.POSITIVE, 1]), false);
			assert.equal(Range.isLikeRange([1, Boundary.INFINITY.NEGATIVE]), false);
		});
	});

	describe('::normalize()', function () {
		it('should get a Range.', function () {
			Range.normalize(1);
			Range.normalize([1, Boundary.INFINITY.POSITIVE]);
			Range.normalize([1, 2]);
		});

		it('should get range if it has been range.', function () {
			const range = Range.normalize([1, 2]);

			assert.equal(Range.normalize(range), range);
		});

		it('should throw if not range like.', function () {
			assert.throws(() => Range.normalize([]), {
				name: 'TypeError',
				message: 'Invalid _range, one "RangeLike" expected.',
			});
		});

		it('should throw if from > to.', function () {
			assert.throws(() => Range.normalize([2, 1]), {
				name: 'Error',
				message: 'A "from.number" should <= its "to.number".',
			});
		});

		it('should throw if from > to.', function () {
			const open = Boundary.Exclusive(1);
			const close = Boundary.Inclusive(1);

			assert.throws(() => Range.normalize([open, close]), {
				name: 'Error',
				message: 'It should be both inclusive or not if their number are equal.',
			});
		});
	});

	describe('::Range', function () {
		describe('.length', function () {
			it('should be 0', function () {
				const range = Range.normalize(1);

				assert.equal(range.length, 0);
			});
		});

		describe('::<Symbol.toStringTag>', function () {
			it('should get string tag', function () {
				const range = Range.normalize(1);

				assert.equal(range.toString(), '[object RangeAxis::Range]');
			});
		});

		describe('::<Symbol.toPrimitive>', function () {
			it('should get string representation.', function () {
				for (const question of [{
					range: [Boundary.E(1), 2],
					result: '(1, 2]',
				}, {
					range: [1, Boundary.INFINITY.POSITIVE],
					result: '[1, Infinity)',
				}]) {
					const range = Range.normalize(question.range);

					assert.equal(`${range}`, question.result);
				}
			});

			it('should throw if use as other primitive.', function () {
				const range = Range.normalize(1);

				assert.throws(() => 0 > range, {
					name: 'Error',
					message: 'RangeAxis::Range COULD only be treated as a string.',
				});
			});
		});
	});
});
