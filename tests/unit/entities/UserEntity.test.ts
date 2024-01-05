import UserEntity from '../../../src/domain/entities/UserEntity';

describe('UserEntity', () => {
    it('requires a username with at least 3 characters', () => {
        expect(
            () =>
                new UserEntity({
                    username: 'ed',
                    password: 'testPassword1',
                    email: 'test@gmail.com',
                }),
        ).toThrow('Validation failed: Username must be at least 3 characters long.');
    });

    it('requires a username with at most 15 characters', () => {
        expect(
            () =>
                new UserEntity({
                    username: 'thiUsernameIsLongerThan16Characters',
                    password: 'testPassword1',
                    email: 'test@gmail.com',
                }),
        ).toThrow('Validation failed: Username must be at most 15 characters long.');
    });

    it('requires a password with at least 8 characters', () => {
        expect(
            () =>
                new UserEntity({
                    username: 'validUsername',
                    password: '1Tiny',
                    email: 'test@gmail.com',
                }),
        ).toThrow('Validation failed: Password must be at least 8 characters long.');
    });

    it('requires a password with at least one capital letter', () => {
        expect(
            () =>
                new UserEntity({
                    username: 'validUsername',
                    password: 'nocapitalspassword',
                    email: 'test@gmail.com',
                }),
        ).toThrow('Validation failed: Password must contain at least one capital letter.');
    });

    it('requires a password with at least one number', () => {
        expect(
            () =>
                new UserEntity({
                    username: 'validUsername',
                    password: 'noNumbersPassword',
                    email: 'test@gmail.com',
                }),
        ).toThrow('Validation failed: Password must contain at least one number.');
    });

    it('requires a valid email', () => {
        expect(
            () =>
                new UserEntity({
                    username: 'validUsername',
                    password: '1ValidPassword',
                    email: 'invalidEmail',
                }),
        ).toThrow('Validation failed: Invalid email.');
    });
});
