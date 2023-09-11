import * as assert from 'node:assert/strict';
import { describe, it } from 'mocha';

import * as Boundary from '../src/Structure/Boundary.mjs';

describe.only('::Structure', function () {
	describe('::Boundary', function () {
		describe('::assertRealNumber()', function () {
			it('should pass.', function () {
				Boundary.isRealNumber(1);
				Boundary.isRealNumber(-1);
				Boundary.isRealNumber(-0.11);
			});

			it('should throw.', function () {
				const expected = {
					name: 'TypeError',
					message: 'Invalid number, one numeric expected.',
				};

				assert.throws(() => Boundary.assertRealNumber(), expected);
				assert.throws(() => Boundary.assertRealNumber('1'), expected);
				assert.throws(() => Boundary.assertRealNumber(NaN), expected);
				assert.throws(() => Boundary.assertRealNumber(Infinity), expected);
			});
		});

		describe('::isRealNumber()', function () {
			it('should be true.', function () {
				assert.equal(Boundary.isRealNumber(1), true);
				assert.equal(Boundary.isRealNumber(-1), true);
				assert.equal(Boundary.isRealNumber(-0.1), true);
			});

			it('should be false.', function () {
				assert.equal(Boundary.isRealNumber(NaN), false);
				assert.equal(Boundary.isRealNumber(Infinity), false);
				assert.equal(Boundary.isRealNumber('0'), false);
			});
		});

		describe('::isBoundary()', function () {
			it('should be true.', function () {
				assert.equal(Boundary.isBoundary(Boundary.INFINITY.NEGATIVE), true);
				assert.equal(Boundary.isBoundary(Boundary.INFINITY.POSITIVE), true);
				assert.equal(Boundary.isBoundary(Boundary.Inclusive(0)), true);
				assert.equal(Boundary.isBoundary(Boundary.Exclusive(0)), true);
			});

			it('should be false.', function () {
				assert.equal(Boundary.isBoundary({}), false);
				assert.equal(Boundary.isBoundary(1), false);
			});
		});

		describe('::assertBoundary()', function () {
			it('should pass.', function () {
				Boundary.assertBoundary(Boundary.INFINITY.NEGATIVE);
				Boundary.assertBoundary(Boundary.Inclusive(1));
			});

			it('should throw if not object.', function () {
				assert.throws(() => Boundary.assertBoundary(1), {
					name: 'TypeError',
					message: 'It SHOULD be a frozen object.',
				});
			});

			it('should throw if not fronzen object.', function () {
				assert.throws(() => Boundary.assertBoundary({}), {
					name: 'TypeError',
					message: 'It SHOULD be a frozen object.',
				});
			});

			it('should throw if bad properties.', function () {
				assert.throws(() => Boundary.assertBoundary(Object.freeze({
					foo: 'bar',
				})), {
					name: 'TypeError',
					message: 'There SHOLD be only 2 properties: `.number`, `.inclusive`.',
				});
			});

			it('should throw if bad properties.', function () {
				assert.throws(() => Boundary.assertBoundary(Object.freeze({
					number: 1,
				})), {
					name: 'TypeError',
					message: 'There SHOLD be only 2 properties: `.number`, `.inclusive`.',
				});
			});

			it('should throw if bad .number.', function () {
				assert.throws(() => Boundary.assertBoundary(Object.freeze({
					number: '1',
					inclusive: false,
				})), {
					name: 'TypeError',
					message: 'The `.number` MUST be a numeric.',
				});
			});

			it('should throw if bad .inclusive.', function () {
				assert.throws(() => Boundary.assertBoundary(Object.freeze({
					number: 1,
					inclusive: 1,
				})), {
					name: 'TypeError',
					message: 'The `.inclusive` MUST be a boolean.',
				});
			});
		});

		describe('::Inclusive()', function () {
			it('should create a Boundary', function () {
				const boundary = Boundary.Inclusive(0);

				assert.ok(Object.isFrozen(boundary));
				assert.equal(boundary.number, 0);
				assert.equal(boundary.inclusive, true);
			});
		});

		describe('::Exclusive()', function () {
			it('should create a Boundary', function () {
				const boundary = Boundary.Exclusive(0);

				assert.ok(Object.isFrozen(boundary));
				assert.equal(boundary.number, 0);
				assert.equal(boundary.inclusive, false);
			});
		});

		describe('::isLikeBoundary', function () {
			it('should be true.', function () {
				assert.ok(Boundary.isLikeBoundary(Boundary.INFINITY.NEGATIVE));
				assert.ok(Boundary.isLikeBoundary(Boundary.INFINITY.POSITIVE));
				assert.ok(Boundary.isLikeBoundary(Boundary.Inclusive(0)));
				assert.ok(Boundary.isLikeBoundary(Boundary.Exclusive(0)));
				assert.ok(Boundary.isLikeBoundary(1));
				assert.ok(Boundary.isLikeBoundary(-1));
			});

			it('should be false.', function () {
				assert.equal(Boundary.isBoundary({}), false);
				assert.equal(Boundary.isBoundary('a'), false);
				assert.equal(Boundary.isBoundary(Infinity), false);
			});
		});

		describe('::normalize()', function () {
			it('should from a boundary.', function () {
				assert.equal(
					Boundary.normalize(Boundary.INFINITY.POSITIVE),
					Boundary.INFINITY.POSITIVE,
				);
			});

			it('should from a number.', function () {
				assert.deepEqual(Boundary.normalize(1), {
					number: 1,
					inclusive: false,
				});
			});
		});
	});

	describe('::Range', function () {

	});

	describe('::Axis', function () {

	});
});
