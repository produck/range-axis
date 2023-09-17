import * as assert from 'node:assert/strict';
import { describe, it } from 'mocha';

import * as Boundary from '../../src/Structure/Boundary.mjs';

describe('::Structure::Boundary', function () {
	describe('::isHyperRealNumber()', function () {
		it('should be true.', function () {
			assert.equal(Boundary.isHyperRealNumber(1), true);
			assert.equal(Boundary.isHyperRealNumber(-1), true);
			assert.equal(Boundary.isHyperRealNumber(-0.1), true);
			assert.equal(Boundary.isHyperRealNumber(Infinity), true);
		});

		it('should be false.', function () {
			assert.equal(Boundary.isHyperRealNumber(NaN), false);
			assert.equal(Boundary.isHyperRealNumber('0'), false);
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

	describe('::isLikeBoundary()', function () {
		it('should be true.', function () {
			assert.ok(Boundary.isLikeBoundary(Boundary.INFINITY.NEGATIVE));
			assert.ok(Boundary.isLikeBoundary(Boundary.INFINITY.POSITIVE));
			assert.ok(Boundary.isLikeBoundary(Boundary.Inclusive(0)));
			assert.ok(Boundary.isLikeBoundary(Boundary.Exclusive(0)));
			assert.ok(Boundary.isLikeBoundary(1));
			assert.ok(Boundary.isLikeBoundary(-1));
			assert.ok(Boundary.isLikeBoundary(Infinity));
		});

		it('should be false.', function () {
			assert.equal(Boundary.isLikeBoundary({}), false);
			assert.equal(Boundary.isLikeBoundary('a'), false);
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

	describe('::normalize()', function () {
		it('should from a boundary.', function () {
			assert.equal(
				Boundary.normalize(Boundary.INFINITY.POSITIVE),
				Boundary.INFINITY.POSITIVE,
			);

			assert.equal(Boundary.normalize(Infinity), Boundary.INFINITY.POSITIVE);
			assert.equal(Boundary.normalize(-Infinity), Boundary.INFINITY.NEGATIVE);
		});

		it('should from a number.', function () {
			const boundary = Boundary.normalize(1);

			assert.equal(boundary.number, 1);
			assert.equal(boundary.inclusive, true);
			assert.equal(+boundary, 1);
			assert.ok(0 < boundary && boundary < 2);
		});

		it('should throw if bad _boundary.', function () {
			const expected = {
				name: 'TypeError',
				message: 'Invalid _boundary, one "BoundaryLike" expected.',
			};

			assert.throws(() => Boundary.normalize(null), expected);
			assert.throws(() => Boundary.normalize({}), expected);
			assert.throws(() => Boundary.normalize(''), expected);
		});
	});

	describe('::Boundary()', function () {
		describe('.<Symbol.toStringTag>', function () {
			it('should get string tag.', function () {
				assert.equal(Boundary.INFINITY.NEGATIVE.toString(), '[object RangeAxis::Boundary]');
			});
		});

		describe('.<Symbol.toPrimitive>', function() {
			const boundary = Boundary.Inclusive(1);

			it('should compare to a number.', function () {
				assert.ok(0 < boundary && boundary < 2);
			});

			it('should throw if use like string.', function () {
				assert.throws(() => '' + boundary, {
					name: 'Error',
					message: 'RangeAxis::Boundary COULD only be treated as a number.',
				});
			});
		});
	});
});
