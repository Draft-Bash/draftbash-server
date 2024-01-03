/* eslint-disable @typescript-eslint/no-unused-vars */
import UserUniqueViolationError from '../../../../src/domain/exceptions/users/UserUniqueViolationError';
import IUserRepository from '../../../../src/interfaces/repositories/IUsersRepository';
import IJWTtokenService from '../../../../src/interfaces/services/authentication/IJWTtokenService';
import IbcryptService from '../../../../src/interfaces/services/authentication/IbcryptService';
import MockbcryptService from './Mocks/MockbcryptService';
import MockJWTtokenService from './Mocks/MockJWTtokenService';
import MockUsersRepository from './Mocks/MockUsersRepository';
import CreateUsersUseCase from '../../../../src/application/api-use-cases/users/commands/CreateUsersUseCase';
import UserCredentialsDTO from '../../../../src/interfaces/data-transfer-objects/users/UserCredentialsDTO';

describe('CreateUserUseCase', () => {
    it('creates a user successfully', async () => {
        const mockUserRepository = new MockUsersRepository() as IUserRepository;
        const mockJwtTokenService = new MockJWTtokenService() as IJWTtokenService;
        const mockBcryptService = new MockbcryptService() as IbcryptService;

        const createUserUseCase = new CreateUsersUseCase(
            mockUserRepository,
            mockJwtTokenService,
            mockBcryptService,
        );

        const userCredentials: UserCredentialsDTO = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'testPassword1!',
        };

        const result: string = await createUserUseCase.create(userCredentials);

        expect(result).toBe('mockToken');
    });

    it('throws UserUniqueViolationError when username is not unique', async () => {
        const mockUserRepository = new MockUsersRepository() as IUserRepository;
        const mockJwtTokenService = new MockJWTtokenService() as IJWTtokenService;
        const mockBcryptService = new MockbcryptService() as IbcryptService;

        // Simulate non-unique username
        (mockUserRepository.getUserByUsername as jest.Mock).mockResolvedValueOnce(
            { userId: 1, username: 'testuser', email: 'test@example.com' },
        );

        const createUserUseCase = new CreateUsersUseCase(
            mockUserRepository,
            mockJwtTokenService,
            mockBcryptService,
        );

        const credentials: UserCredentialsDTO = {
            username: 'testuser',
            email: 'notDuplicate@example.com',
            password: 'testPassword1!',
        };

        await expect(createUserUseCase.create(credentials)).rejects.toThrow(
            UserUniqueViolationError
        );
    });

    it('throws UserUniqueViolationError when email is not unique', async () => {
        const mockUserRepository = new MockUsersRepository() as IUserRepository;
        const mockJwtTokenService = new MockJWTtokenService() as IJWTtokenService;
        const mockBcryptService = new MockbcryptService() as IbcryptService;

        // Simulate non-unique email
        (mockUserRepository.getUserByUsername as jest.Mock).mockResolvedValueOnce(
            { userId: 1, username: 'testuser', email: 'test@example.com' },
        );

        const createUserUseCase = new CreateUsersUseCase(
            mockUserRepository,
            mockJwtTokenService,
            mockBcryptService,
        );

        const credentials: UserCredentialsDTO = {
            username: 'differentUser',
            email: 'test@example.com',
            password: 'testPassword1!',
        };

        await expect(createUserUseCase.create(credentials)).rejects.toThrow(
            UserUniqueViolationError
        );
    });
});
