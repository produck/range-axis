const TOP = 0, FROM = 0, TO = 1;

export const operator = (A, B, Result) => {
	while (A.length > 0) {
		if (B.length === 0) {
			return Result.push(...A);
		}

		if (B[TOP][FROM] >= A[TOP][TO]) {
			Result.push(A.shift());
		}

		while (B.length > 0 && A.length > 0 && B[TOP][FROM] < A[TOP][TO]) {
			if (B[TOP][FROM] > A[TOP][FROM]) {
				Result.push([A[TOP][FROM], B[TOP][FROM]]);
			}

			if (B[TOP][TO] > A[TOP][FROM] && B[TOP][TO] < A[TOP][TO]) {
				A[TOP][FROM] = B[TOP][TO];
			}

			(B[TOP][TO] <= A[TOP][TO] ? B : A).shift();
		}
	}
};
