import { RangeAxisComparator } from './Comparator.mjs';
import { Axis, Boundary } from './Structure/index.mjs';

export class RangeAxisAlgorithm {
	#comparator = new RangeAxisComparator();

	setTolerance(value) {
		if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
			throw new TypeError('Invalid ".value", one "numeric" expected.');
		}

		this.#comparator.tolerance = value;
	}

	LT(a, b) {
		return this.#comparator.lt(a, b);
	}

	union(A, B, Result) {
		if (A.length === 0 || B.length === 0) {
			return Result.push(...A, ...B);
		}

		const P = A[0].from.number < B[0].from.number ? A : B;
		const S = A === P ? B : A;
		let { from, to } = P[0];

		while (P.length > 0) {
			if (P[0].from.number > to.number) {
				Result.push([from, to]);
				from = P[0].from, to = P[0].to;
			} else if (P[0].to.number > to.number) {
				to = P[0].to;
			}

			while (S.length > 0 && P.length > 0) {
				if (S[0].from.number > to.number) {
					Result.push([from, to]);
					from = S[0].from, to = S[0].to;
				} else if (S[0].to.number > to.number) {
					to = S[0].to;
				}

				S.shift();
			}

			P.shift();
		}

		Result.push([from, to], ...P, ...S);
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
