const { isFinite, isNaN } = Number;

export class RangeAxisComparator {
	#tolerance = 0.000001;

	get tolerance() {
		return this.#tolerance;
	}

	set tolerance(value) {
		if (typeof value !== 'number' || isNaN(value) || isFinite(value)) {
			throw new TypeError('Invalid ".tolerance", one "numeric" expected.');
		}

		this.#tolerance = value;
	}

	eq0(x) {
		return -this.#tolerance < x && x < this.#tolerance;
	}

	eq(x, y) {
		const value = x - y;

		return -this.#tolerance < value && value < this.#tolerance;
	}

	gt(x, y) {
		return x - y > this.#tolerance;
	}

	ge(x, y) {
		return x - y > this.#tolerance;
	}

	lt(x, y) {
		return x - y < -this.#tolerance;
	}

	le(x, y) {
		return x - y < this.#tolerance;
	}
}
