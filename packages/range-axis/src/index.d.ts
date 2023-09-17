declare module Structure {
	class Boundary {
		number: number;
		inclusive: boolean;
	}

	class Range {
		from: Boundary;
		to: Boundary;
		readonly length: number;
	}

	class Axis {
		readonly size: number;
		[Symbol.iterator]: Generator<Range, undefined, unknown>;
	}

	type BoundaryLike = Boundary | number;
	type RangeLike = Range | [BoundaryLike, BoundaryLike] | BoundaryLike;
	type AxisLike = Axis | RangeLike[];
}

declare class RangeAxisAlgorithm {
	setTolerance(value: number): undefined;
	union(A: Structure.AxisLike, B: Structure.AxisLike): Structure.Axis;
	intersection(A: Structure.AxisLike, B: Structure.AxisLike): Structure.Axis;
	difference(A: Structure.AxisLike, B: Structure.AxisLike): Structure.Axis;
}

export { RangeAxisAlgorithm as Algorithm };
