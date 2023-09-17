import { InstanceOf, throwError } from './Utils.mjs';
import * as Range from './Range.mjs';
import * as Boundary from '../../src/Structure/Boundary.mjs';

export class Axis {
	#sequence = [];

	constructor(...args) {
		this.#sequence.push(...args);
		Object.freeze(this);
		Object.freeze(this.#sequence);
	}

	get size() {
		return this.#sequence.length;
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

		let _to = Boundary.INFINITY.NEGATIVE;

		for (const range of sequence) {
			const { from, to } = range;

			if (from.number < _to.number) {
				throw new Error('A "from" number should not less than the last "to".');
			}

			if (from.number === _to.number && from.inclusive && _to.inclusive) {
				throw new Error('A "from" and the last "to" cannot be inclusive or not.');
			}

			_to = to;
		}

		return new Axis(...sequence);
	}
};
