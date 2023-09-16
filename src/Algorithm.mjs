import { RangeAxisComparator } from './Comparator.mjs';
import { Axis, Boundary } from './Structure/index.mjs';

export class RangeAxisAlgorithm {
	#COMP = new RangeAxisComparator();

	setTolerance(value) {
		if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
			throw new TypeError('Invalid ".value", one "numeric" expected.');
		}

		this.#COMP.tolerance = value;
	}

	#sort(list) {
		return list.sort((a, b) => {
			if (this.#COMP.eq(a.from.number, b.from.numberb)) {
				if (this.#COMP.eq(a.to.number, b.to.number)) {
					return 0;
				}

				return a.to.number - b.to.number;
			}

			return a.from.number - b.from.number;
		});
	}

	union(A, B, R) {
		const merged = this.#sort([...A, ...B]);
		let { from, to } = merged.shift();

		while (merged.length > 0) {
			const range = merged.shift();

			if (this.#COMP.gt(range.from.number, to.number)) {
				R.push([from, to]);
				from = range.from;
			}

			if (this.#COMP.gt(range.to.number, to.number)) {
				to = range.to;
			}
		}

		R.push([from, to]);
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
		if (A.length === 0) {
			return;
		}

		let from = A[0].from;

		while (A.length > 0) {
			if (B.length === 0) {
				return R.push([from, A.shift().to], ...A);
			}

			from = A[0].from;

			if (B[0].from.number >= A[0].to.number) {
				R.push(A.shift());
			}

			while (B.length > 0 && A.length > 0 && B[0].from.number < A[0].to.number) {
				if (B[0].from > from) {
					R.push([from, B[0].from]);
				}

				if (B[0].to > from && B[0].to < A[0].to) {
					from = B[0].to;
				}

				(B[0].to <= A[0].to ? B : A).shift();
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
