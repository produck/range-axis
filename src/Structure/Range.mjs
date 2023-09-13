import * as Boundary from './Boundary.mjs';
import { InstanceOf, throwError } from './Utils.mjs';

class Range {
	constructor(from, to = from) {
		this.from = from;
		this.to = to;
		Object.freeze(this);
	}

	get length() {
		return this.to - this.from;
	}

	get [Symbol.toStringTag]() {
		return 'RangeAxis::Range';
	}

	[Symbol.toPrimitive](hint) {
		if (hint === 'string') {
			const spanList = [];

			spanList.push(this.from.inclusive ? '[' : '(');
			spanList.push(this.from.number);
			spanList.push(', ');
			spanList.push(this.to.number);
			spanList.push(this.to.inclusive ? ']' : ')');

			return spanList.join('');
		}

		throw new Error('RangeAxis::Range COULD only be treated as a string.');
	}
}

export const isRange = any => InstanceOf(any, Range);

export const isLikeRange = any => {
	if (isRange(any)) {
		return true;
	}

	if (Array.isArray(any)) {
		if (any.length !== 2) {
			return false;
		}

		if (!any.every(Boundary.isLikeBoundary)) {
			return false;
		}

		return true;
	}

	return Boundary.isLikeBoundary(any);
};

export const normalize = _range => {
	if (!isLikeRange(_range)) {
		throwError('Invalid _range, one "RangeLike" expected.');
	}

	if (isRange(_range)) {
		return _range;
	} else if (Array.isArray(_range)) {
		const [from, to] = _range.map(Boundary.normalize);

		if (from > to) {
			throw new Error('A "from.number" should <= its "to.number".');
		}

		if (from === to && from.inclusive === to.inclusive) {
			throw new Error('It should be both inclusive or not if their number are equal.');
		}

		return new Range(from, to);
	} else {
		return new Range(Boundary.normalize(_range));
	}
};
