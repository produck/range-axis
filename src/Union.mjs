export const operator = (A, B, Result, C) => {
	const merged = [...A, ...B].sort((a, b) => {
		if (C.lt(a.from.number, b.from.number)) {
			return -1;
		} else if (C.gt(a.from.number, b.from.number)) {
			return 1;
		} else if (C.lt(a.to.number, b.to.number)) {
			return -1;
		} else if (C.gt(a.to.number, b.to.number)) {
			return 1;
		} else {
			return 0;
		}
	});

	let [from, to] = merged.shift();

	while(merged.length > 0) {
		const range = merged.shift();

		if (range[0] > to) {
			Result.push([from, to]);
			from = range[0];
		}

		if (range[1] > to) {
			to = range[1];
		}
	}

	Result.push([from, to]);
};
