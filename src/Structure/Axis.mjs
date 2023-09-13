import { InstanceOf, throwError } from './Utils.mjs';
import * as Range from './Range.mjs';

export class Axis {
	#sequence = [];

	constructor(...args) {
		this.#sequence.push(...args);
		Object.freeze(this);
		Object.freeze(this.#sequence);
	}

	*[Symbol.iterator]() {
		for (const range of this.#sequence) {
			yield range;
		}
	}

	get [Symbol.toStringTag]() {
		return 'RangeAxis::Axis';
	}
}

export const isAxis = any => InstanceOf(any, Axis);

export const isLikeAxis = any => {
	return isAxis(any) || (Array.isArray(any) && any.every(Range.isLikeRange));
};

export const normalize = _axis => {
	if (!isLikeAxis(_axis)) {
		throwError('Invalid _axis, one "AxisLike" expected.');
	}


	if (isAxis(_axis)) {
		return _axis;
	} else {
		const sequence = _axis.map(Range.normalize);

		let lastTo = -Infinity;

		for (const range of sequence) {
			if (range.from < lastTo) {

			}

			if (range.from === lastTo) {

			}

			lastTo = range.to;
		}
	}
};
