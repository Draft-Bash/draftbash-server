import BadRequestError from "../BadRequestError";

export default class InvalidUserCredentialsError extends BadRequestError {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidUserCredentialsError';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}