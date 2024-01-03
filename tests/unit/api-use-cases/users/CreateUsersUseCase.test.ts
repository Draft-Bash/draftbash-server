/* eslint-disable @typescript-eslint/no-unused-vars */
import UserUniqueViolationError from '../../../../src/domain/exceptions/users/UserUniqueViolationError';
import IUserRepository from '../../../../src/application/contracts/repositories/IUsersRepository';
import UserCredentials from '../../../../src/application/contracts/data-transfer-objects/users/UserCredentials';
import IJWTtokenService from '../../../../src/application/contracts/services/authentication/IJWTtokenService';
import IbcryptService from '../../../../src/application/contracts/services/authentication/IbcryptService';
import MockbcryptService from './Mocks/MockbcryptService';
import MockJWTtokenService from './Mocks/MockJWTtokenService';
import MockUsersRepository from './Mocks/MockUsersRepository';
import CreateUsersUseCase from '../../../../src/application/api-use-cases/users/commands/CreateUsersUseCase';

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

        const credentials: UserCredentials = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'testPassword1!',
        };

        const result: string = await createUserUseCase.create(credentials);

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

        const credentials: UserCredentials = {
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

        const credentials: UserCredentials = {
            username: 'differentUser',
            email: 'test@example.com',
            password: 'testPassword1!',
        };

        await expect(createUserUseCase.create(credentials)).rejects.toThrow(
            UserUniqueViolationError
        );
    });
});
