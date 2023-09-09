import * as Utils from './Utils.mjs';

const TOP = 0, FROM = 0, TO = 1;

export const operator = Utils.defineOperator((A, B, Result) => {
	while (A.length > 0) {
		if (B.length === 0) { // 无可减
			return Result.push(...A.splice(0));
		}

		let [from, to] = A[TOP];

		if (B[TOP][FROM] > to) { // B完全领先
			Result.push(A[TOP]);
			A.shift();
			continue;
		}

		while (B.length > 0 && B[TOP][FROM] < to) { // B尚未领先
			if (B[TOP][FROM] < from) {
				if (B[TOP][TO] < from) {
					B.shift();
				} else if (B[TOP][TO] > from && B[TOP][TO] < to) {
					from = B[TOP][TO];
					A[TOP][FROM] = from, A[TOP][TO] = to;
					B.shift();
				} else if (B[TOP][TO] > to) {
					A.shift();
					break;
				}
			} else if (B[TOP][FROM] > from) {
				Result.push([from, B[TOP][FROM]]);

				if (B[TOP][TO] < to) {
					from = B[TOP][TO];
					A[TOP][FROM] = from, A[TOP][TO] = to;
					B.shift();
				} else if (B[TOP][TO] > to) {
					A.shift();
					break;
				}
			}
		}
	}
});
