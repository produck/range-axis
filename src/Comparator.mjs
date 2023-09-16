export class RangeAxisComparator {
	tolerance = 0.000001;

	constructor() {
		this.eq = (x, y) => {
			const value = x - y;

			return -this.tolerance < value && value < this.tolerance;
		};

		this.eq0 = x => -this.tolerance < x && x < this.tolerance;
		this.gt = (x, y) => x - y > this.tolerance;
		this.ge = (x, y) => x - y > -this.tolerance;
		this.lt = (x, y) => x - y < -this.tolerance;
		this.le = (x, y) => x - y < this.tolerance;
	}
}
