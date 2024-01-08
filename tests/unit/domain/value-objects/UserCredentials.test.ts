import UserCredentials from '../../../../src/domain/value-objects/users/UserCredentials';
import InvalidUserCredentialsError from '../../../../src/domain/exceptions/users/InvalidUserCredentialsError';


describe('UserCredentials', () => {
    it('should create UserCredentials instance with valid credentials', () => {
        const validCredentials = {
            username: 'john_doe',
            email: 'john.doe@example.com',
            password: 'StrongP@ss1',
        };

        const userCredentials = new UserCredentials(validCredentials);

        expect(userCredentials).toBeInstanceOf(UserCredentials);
        expect(userCredentials).toHaveProperty('username', validCredentials.username);
        expect(userCredentials).toHaveProperty('email', validCredentials.email);
        expect(userCredentials).toHaveProperty('password', validCredentials.password);
    });

    it('should throw InvalidUserCredentialsError for short username', () => {
        const invalidCredentials = {
            username: 'ab',
            email: 'john.doe@example.com',
            password: 'StrongP@ss1',
        };

        expect(() => new UserCredentials(invalidCredentials)).toThrow(InvalidUserCredentialsError);
    });

    it('should throw InvalidUserCredentialsError for invalid email', () => {
        const invalidCredentials = {
            username: 'john_doe',
            email: 'invalid-email',
            password: 'StrongP@ss1',
        };

        expect(() => new UserCredentials(invalidCredentials)).toThrow(InvalidUserCredentialsError);
    });

    it('should throw InvalidUserCredentialsError for short password', () => {
        const invalidCredentials = {
            username: 'john_doe',
            email: 'john.doe@example.com',
            password: 'WeakP@ss',
        };

        expect(() => new UserCredentials(invalidCredentials)).toThrow(InvalidUserCredentialsError);
    });

    it('should throw InvalidUserCredentialsError for password without a capital letter', () => {
        const invalidCredentials = {
            username: 'john_doe',
            email: 'john.doe@example.com',
            password: 'weakp@ss1',
        };

        expect(() => new UserCredentials(invalidCredentials)).toThrow(InvalidUserCredentialsError);
    });

    it('should throw InvalidUserCredentialsError for password without a number', () => {
        const invalidCredentials = {
            username: 'john_doe',
            email: 'john.doe@example.com',
            password: 'WeakPassword',
        };

        expect(() => new UserCredentials(invalidCredentials)).toThrow(InvalidUserCredentialsError);
    });
});
