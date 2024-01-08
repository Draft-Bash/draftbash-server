import CreateUserRequest from "../../../presentation/data-transfer-objects/users/CreateUserRequest";
import BadRequestError from "../../exceptions/BadRequestError";
import InvalidUserCredentialsError from "../../exceptions/users/InvalidUserCredentialsError";

export default class UserCredentials {
    private readonly username: string;

    private readonly email: string ;

    private readonly password: string;

    constructor(credentials: CreateUserRequest) {
        if (credentials.username === undefined || credentials.email === undefined || credentials.password === undefined) {
            throw new BadRequestError('Invalid user credentials.');
        }

        this.username = credentials.username;
        this.email = credentials.email;
        this.password = credentials.password;

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (credentials.username.length < 3 || credentials.username.length > 15) {
            throw new InvalidUserCredentialsError('Username must be between 3 and 15 characters long.');
        }

        if (!emailRegex.test(credentials.email)) {
            throw new InvalidUserCredentialsError('Invalid email.');
        }

        if (credentials.password.length < 8) {
            throw new InvalidUserCredentialsError('Password must be at least 8 characters long.');
        }

        if (!/[A-Z]/.test(credentials.password)) {
            throw new InvalidUserCredentialsError('Password must contain at least one capital letter.');
        }

        if (!/[0-9]/.test(credentials.password)) {
            throw new InvalidUserCredentialsError('Password must contain at least one number.');
        }
    }

    getUsername(): string {
        return this.username;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }
}