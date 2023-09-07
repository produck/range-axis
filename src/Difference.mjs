import * as Utils from './Utils.mjs';

/**
 * A: |-------|  |--------|   |---|
 * B:     |--------| |--|   |-------|
 * R: |---|        |-|  |-|
 */
export const operator = Utils.defineOperator((A, B, Result) => {
	const a = [], b = [], need = [true, true];

	if (A.length === 0) {
		return;
	}

	while (A.length > 0 && B.length > 0) {
		if (need[0]) {
			[a[0], a[1]] = A.shift();
			need[0] = false;
		}

		if (need[1]) {
			[b[0], b[1]] = B.shift();
			need[1] = false;
		}

		if (a[1] < b[0]) {
			// A: |--|
			// B:      |-------|
			Result.push([...a]);
			need[0] = true;
		} else if (a[0] > b[1]) {
			// A:           |--|
			// B: |-------|
			need[1] = true;

			if (B.length === 0) {
				Result.push([...a]);
			}
		} else if (a[0] > b[0] && a[1] < b[1]) {
			// A:   |--|
			// B: |-------|
			need[0] = true;
		} else if (a[0] < b[0] && a[1] < b[1]) {
			// A: |----|
			// B:    |-----|
			Result.push([a[0], b[0]]);
			need[0] = true;
		} else if (a[0] < b[0] && a[1] > b[1]) {
			// A: |-------------|
			// B:    |-----|
			Result.push([a[0], b[0]]);
			a[0] = b[1];

			if (B.length === 0) {
				Result.push([...a]);
			}
		} else if (a[0] > b[0] && a[1] > b[1]) {
			// A:        |------|
			// B:    |-----|
			Result.push([b[1], a[1]]);
			a[0] = b[1];
		}
	}

	if (A.length > 0) {
		Result.push(...A);
	}
});
