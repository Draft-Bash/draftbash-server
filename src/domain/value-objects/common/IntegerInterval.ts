import BadRequestError from "../../exceptions/BadRequestError";

export default class IntegerInterval {
    private readonly lowerBound: number;

    private readonly upperBound: number;

    private readonly value: number;

    constructor(value: number, lowerBound: number, upperBound: number) {
        this.validateBounds(lowerBound, upperBound);
        this.lowerBound = lowerBound;
        this.upperBound = upperBound;
        this.value = value;
    }

    private validateBounds(lowerBound: number, upperBound: number): void {
        if (!Number.isInteger(lowerBound) || !Number.isInteger(upperBound) || lowerBound > upperBound) {
            throw new BadRequestError('Invalid interval bounds');
        }
    }

    getValue(): number {
        return this.value;
    }
}
