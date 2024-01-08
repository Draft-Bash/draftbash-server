export default class BadRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'BadRequestError';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}