export default class UserUniqueViolationError extends Error {

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}