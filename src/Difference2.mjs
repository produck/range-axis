import * as Utils from './Utils.mjs';

const TOP = 0, FROM = 0, TO = 1;

export const operator = Utils.defineOperator((A, B, Result) => {
	let a = A[TOP], b = B[TOP];

	while (A.length > 0) {
		if (B.length === 0) {
			return Result.push(...A);
		}

		if (b[FROM] > a[TO]) {
			Result.push(A.shift());
		} else while (B.length > 0 && A.length > 0 && b[FROM] < a[TO]) {
			if (b[FROM] > a[FROM]) {
				Result.push([a[FROM], b[FROM]]);
			}

			if (b[TO] > a[FROM] && b[TO] < a[TO]) {
				a[FROM] = b[TO];
			}

			if (b[TO] < a[TO]) {
				B.shift();
			}

			if (b[TO] > a[TO]) {
				A.shift();
			}

			a = A[TOP], b = B[TOP];
		}
	}
});
