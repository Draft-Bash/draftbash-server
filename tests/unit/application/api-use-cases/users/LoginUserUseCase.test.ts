import LoginUsersUseCase from '../../../../../src/application/api-use-cases/users/queries/LoginUsersUseCase';
import UserEntity from '../../../../../src/domain/entities/UserEntity';
import InvalidUserCredentialsError from '../../../../../src/domain/exceptions/users/InvalidUserCredentialsError';
import UserCredentials from '../../../../../src/domain/value-objects/users/UserCredentials';
import MockJWTtokenService from './Mocks/MockJWTtokenService';
import MockUsersRepository from './Mocks/MockUsersRepository';
import MockbcryptService from './Mocks/MockbcryptService';

describe('LoginUserUseCaseTest', () => {
    it('throws InvalidUserCredentialsError when username or email does not exist', async () => {
        const mockUserRepository = new MockUsersRepository();
        const mockJwtTokenService = new MockJWTtokenService();
        const mockBcryptService = new MockbcryptService();

        const loginUserUseCaseTest = new LoginUsersUseCase(mockUserRepository, mockJwtTokenService, mockBcryptService);

        (mockUserRepository.getUserByUsernameOrEmail as jest.Mock).mockResolvedValueOnce(null);

        await expect(loginUserUseCaseTest.loginUser('wrongUsername', 'testpassword')).rejects.toThrow(
            InvalidUserCredentialsError,
        );
    });

    it('throws InvalidUserCredentialsError when the password for a valid username/email is incorrect', async () => {
        const mockUserRepository = new MockUsersRepository();
        const mockJwtTokenService = new MockJWTtokenService();
        const mockBcryptService = new MockbcryptService();

        const loginUserUseCaseTest = new LoginUsersUseCase(mockUserRepository, mockJwtTokenService, mockBcryptService);

        (mockUserRepository.getUserByUsernameOrEmail as jest.Mock).mockResolvedValueOnce(
            new UserEntity(
                1,
                new UserCredentials({
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'testPassword1!',
                }),
            ),
        );

        await expect(loginUserUseCaseTest.loginUser('testuser', 'incorrectPassword1')).rejects.toThrow(
            InvalidUserCredentialsError,
        );
    });

    it('returns a jwt token string when the password for the user is correct', async () => {
        const mockUserRepository = new MockUsersRepository();
        const mockJwtTokenService = new MockJWTtokenService();
        const mockBcryptService = new MockbcryptService();

        const loginUserUseCaseTest = new LoginUsersUseCase(mockUserRepository, mockJwtTokenService, mockBcryptService);

        (mockUserRepository.getUserByUsernameOrEmail as jest.Mock).mockResolvedValueOnce(
            new UserEntity(
                1,
                new UserCredentials({
                    username: 'testuser',
                    email: 'test@example.com',
                    password: '1HashedPassword',
                }),
            ),
        );

        const result: string = await loginUserUseCaseTest.loginUser('testuser', 'testPassword1');

        await expect(result).toEqual('mockToken');
    });
});
