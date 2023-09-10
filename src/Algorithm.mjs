import * as Operator from './Operator.mjs';
import { RangeAxisComparator } from './Comparator.mjs';
import * as Union from './Union.mjs';
import * as Intersection from './Intersection.mjs';
import * as Difference from './Difference.mjs';

export class RangeAxisAlgorithm {
	#comparator = new RangeAxisComparator();

	setTolerance(value) {
		if (typeof value !== 'number' || isNaN(value) || isFinite(value)) {
			throw new TypeError('Invalid ".value", one "numeric" expected.');
		}

		this.#comparator = value;
	}

	union = Operator.define(Union.operator, this.#comparator);
	intersection = Operator.define(Intersection.operator, this.#comparator);
	difference = Operator.define(Difference.operator, this.#comparator);

	constructor() {
		Object.freeze(this);
	}
}
