import { RangeAxisComparator } from './Comparator.mjs';
import { Axis } from './Structure/index.mjs';

const ASC = (a, b) => a.from.number - b.from.number;

export class RangeAxisAlgorithm {
	#COMP = new RangeAxisComparator();

	setTolerance(value) {
		if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
			throw new TypeError('Invalid ".value", one "numeric" expected.');
		}

		this.#COMP.tolerance = value;
	}

	union(A, B, R) {
		if (A.length === 0 || B.length === 0) {
			return R.push(...A, ...B);
		}

		const { gt, ge } = this.#COMP;
		const merged = [...A, ...B].sort(ASC);

		for (let i = 0; i < merged.length;) {
			let to = merged[i].to, j = i + 1;

			for (; j < merged.length && ge(to.number, merged[j].from.number); j++) {
				if (gt(merged[j].to.number, to.number)) {
					to = merged[j].to;
				}
			}

			R.push([merged[i].from, to]);
			i = j;
		}
	}

	intersection(A, B, R) {
		const { gt, le, lt, eq } = this.#COMP;

		for (let i = 0, j = 0; i < A.length && j < B.length;) {
			const a = A[i], b = B[j];
			const from = gt(a.from.number, b.from.number) ? a.from : b.from;
			const to = le(a.to.number, b.to.number) ? a.to : b.to;

			if (
				lt(from.number, to.number) ||
				(eq(from.number, to.number) && from.inclusive && to.inclusive)
			) {
				R.push([from, to]);
			}

			a.to === to ? i++ : j++;
		}
	}

	difference(A, B, R) {
		for (let i = 0, j = 0; i < A.length; i++) {
			let { from, to } = A[i];

			while (j < B.length) {
				const b = B[j];

				if (from.number < b.from.number && b.from.number < to.number) {
					R.push([from, b.from]);
				}

				if (b.to.number < to.number) {
					if (b.to.number > from.number) {
						from = b.to;
					}

					j++;
				}

				if (b.to.number > to.number) {
					break;
				}
			}

			if (j === B.length || B[j].from.number >= to.number) {
				R.push([from, to]);
			}
		}
	}

	constructor() {
		Object.freeze(this);
	}
}

for (const methodName of ['union', 'intersection', 'difference']) {
	const _method = RangeAxisAlgorithm.prototype[methodName];

	RangeAxisAlgorithm.prototype[methodName] = function (...args) {
		const [A, B] = args.slice(0, 2).map(Axis.normalize);
		const Result = [];

		if (A.size > 0 || B.size > 0) {
			_method.call(this, [...A], [...B], Result);
		}

		return Axis.normalize(Result);
	};
}
