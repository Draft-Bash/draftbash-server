export default class InvalidJWTtokenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidUserCredentialsError';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}