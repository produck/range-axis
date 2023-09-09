import * as Utils from './Utils.mjs';

const TOP = 0, FROM = 0, TO = 1;

export const operator = Utils.defineOperator((A, B, Result) => {
	while (A.length > 0) {
		if (B.length === 0) {
			return Result.push(...A);
		}

		if (B[TOP][FROM] > A[TOP][TO]) {
			Result.push(A.shift());
		} else while (B.length > 0 && A.length > 0 && B[TOP][FROM] < A[TOP][TO]) {
			const [from, to] = B[TOP];

			if (to < A[TOP][TO]) {
				B.shift();
			}

			if (from > A[TOP][FROM]) {
				Result.push([A[TOP][FROM], from]);
			}

			if (to > A[TOP][FROM] && to < A[TOP][TO]) {
				A[TOP][FROM] = to;
			}

			if (to > A[TOP][TO]) {
				A.shift();
			}
		}
	}
});
