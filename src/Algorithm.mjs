import * as Union from './Union.mjs';
import * as Intersection from './Intersection.mjs';
import * as Difference from './Difference.mjs';
import { RangeAxisComparator } from './Comparator.mjs';

export class RangeAxisAlgorithm {
	#comparator = new RangeAxisComparator();

	setTolerance(value) {
		this.#comparator = value;
	}

	union(A, B) {
		return Union.operator(A, B, this.#comparator);
	}

	intersection(A, B) {
		return Intersection.operator(A, B, this.#comparator);
	}

	difference(A, B) {
		return Difference.operator(A, B, this.#comparator);
	}
}
