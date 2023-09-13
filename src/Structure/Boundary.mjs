import { InstanceOf, throwError, TypeNumber } from './Utils.mjs';

export const isRealNumber = any => TypeNumber(any) && !isNaN(any) && isFinite(any);

class Boundary {
	constructor(number, inclusive) {
		this.number = number;
		this.inclusive = inclusive;
		Object.freeze(this);
	}

	get [Symbol.toStringTag]() {
		return 'RangeAxis::Boundary';
	}

	[Symbol.toPrimitive](hint) {
		if (hint === 'number') {
			return this.number;
		}

		throw new Error('RangeAxis::Boundary COULD only be treated as a number.');
	}
}

export const isBoundary = any => InstanceOf(any, Boundary);
export const isLikeBoundary = any => isRealNumber(any) || isBoundary(any);

export const INFINITY = Object.freeze({
	POSITIVE: new Boundary(Infinity, false),
	NEGATIVE: new Boundary(-Infinity, false),
});

export const Inclusive = number => new Boundary(number, true);
export const Exclusive = number => new Boundary(number, false);
export { Inclusive as I, Exclusive as E };

export const normalize = _boundary => {
	if (!isLikeBoundary(_boundary)) {
		throwError('Invalid _boundary, one "BoundaryLike" expected.');
	}

	return isBoundary(_boundary) ? _boundary : Inclusive(_boundary);
};
