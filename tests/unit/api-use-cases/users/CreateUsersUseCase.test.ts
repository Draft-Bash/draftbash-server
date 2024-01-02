/* eslint-disable @typescript-eslint/no-unused-vars */
import UserUniqueViolationError from '../../../../src/domain/exceptions/users/UserUniqueViolationError';
import IUserRepository from '../../../../src/domain/repositories/IUsersRepository';
import UserCredentialsDTO from '../../../../src/application/contracts/data-transfer-objects/users/UserCredentialsDTO';
import IJWTtokenService from '../../../../src/application/contracts/services/authentication/IJWTtokenService';
import IbcryptService from '../../../../src/application/contracts/services/authentication/IbcryptService';
import MockbcryptService from './Mocks/MockbcryptService';
import MockJWTtokenService from './Mocks/MockJWTtokenService';
import MockUserRepository from './Mocks/MockUserRepository';
import CreateUsersUseCase from '../../../../src/application/api-use-cases/users/commands/CreateUsersUseCase';

describe('CreateUserUseCase', () => {
    it('creates a user successfully', async () => {
        const mockUserRepository = new MockUserRepository() as IUserRepository;
        const mockJwtTokenService = new MockJWTtokenService() as IJWTtokenService;
        const mockBcryptService = new MockbcryptService() as IbcryptService;

        const createUserUseCase = new CreateUsersUseCase(
            mockUserRepository,
            mockJwtTokenService,
            mockBcryptService,
        );

        const credentials: UserCredentialsDTO = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword',
        };

        const result: string = await createUserUseCase.execute(credentials);

        expect(result).toBe('mockToken');
    });

    it('throws UserUniqueViolationError when username is not unique', async () => {
        const mockUserRepository = new MockUserRepository() as IUserRepository;
        const mockJwtTokenService = new MockJWTtokenService() as IJWTtokenService;
        const mockBcryptService = new MockbcryptService() as IbcryptService;

        // Simulate non-unique username
        (mockUserRepository.getUsersByUsername as jest.Mock).mockResolvedValueOnce([
            { userId: 1, username: 'testuser', email: 'test@example.com' },
        ]);

        const createUserUseCase = new CreateUsersUseCase(
            mockUserRepository,
            mockJwtTokenService,
            mockBcryptService,
        );

        const credentials: UserCredentialsDTO = {
            username: 'testuser',
            email: 'notDuplicate@example.com',
            password: 'testpassword',
        };

        await expect(createUserUseCase.execute(credentials)).rejects.toThrow(
            UserUniqueViolationError,
        );
    });

    it('throws UserUniqueViolationError when email is not unique', async () => {
        const mockUserRepository = new MockUserRepository() as IUserRepository;
        const mockJwtTokenService = new MockJWTtokenService() as IJWTtokenService;
        const mockBcryptService = new MockbcryptService() as IbcryptService;

        // Simulate non-unique email
        (mockUserRepository.getUsersByUsername as jest.Mock).mockResolvedValueOnce([
            { userId: 1, username: 'testuser', email: 'test@example.com' },
        ]);

        const createUserUseCase = new CreateUsersUseCase(
            mockUserRepository,
            mockJwtTokenService,
            mockBcryptService,
        );

        const credentials: UserCredentialsDTO = {
            username: 'notDuplicatedUser',
            email: 'test@example.com',
            password: 'testpassword',
        };

        await expect(createUserUseCase.execute(credentials)).rejects.toThrow(
            UserUniqueViolationError,
        );
    });
});
