/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserUniqueViolationError } from '../../../../../src/domain/exceptions/users/UserUniqueViolationError';
import { IUserRepository } from '../../../../../src/domain/repositories/IUsersRepository';
import { UserCredentialsDTO } from '../../../../../src/application/contracts/data-transfer-objects/users/UserCredentialsDTO';
import { IJWTtokenService } from '../../../../../src/infra/services/authentication/interfaces/IJWTtokenService';
import { IbcryptService } from '../../../../../src/infra/services/authentication/interfaces/IbcryptService';
import { CreateUserUseCase } from '../../../../../src/application/api-use-cases/users/commands/CreateUsersUseCase';
import { UserIdentificationDTO } from '../../../../../src/application/contracts/data-transfer-objects/users/UserIdentificationDTO';
import {
    MockBcryptService,
    MockJwtTokenService,
    MockUserRepository,
} from '../Mocks';

describe('CreateUserUseCase', () => {
    it('creates a user successfully', async () => {
        const mockUserRepository = new MockUserRepository() as IUserRepository;
        const mockJwtTokenService =
            new MockJwtTokenService() as IJWTtokenService;
        const mockBcryptService = new MockBcryptService() as IbcryptService;

        const createUserUseCase = new CreateUserUseCase(
            mockUserRepository,
            mockJwtTokenService,
            mockBcryptService,
        );

        const credentials: UserCredentialsDTO = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword',
        };

        const result = await createUserUseCase.createUser(credentials);

        expect(result).toBe('mockToken');
    });

    it('throws UserUniqueViolationError when username is not unique', async () => {
        const mockUserRepository = new MockUserRepository() as IUserRepository;
        const mockJwtTokenService =
            new MockJwtTokenService() as IJWTtokenService;
        const mockBcryptService = new MockBcryptService() as IbcryptService;

        // Simulate non-unique username
        (
            mockUserRepository.getUsersByUsername as jest.Mock
        ).mockResolvedValueOnce([
            { userId: 1, username: 'testuser', email: 'test@example.com' },
        ]);

        const createUserUseCase = new CreateUserUseCase(
            mockUserRepository,
            mockJwtTokenService,
            mockBcryptService,
        );

        const credentials: UserCredentialsDTO = {
            username: 'testuser',
            email: 'notDuplicate@example.com',
            password: 'testpassword',
        };

        await expect(createUserUseCase.createUser(credentials)).rejects.toThrow(
            UserUniqueViolationError,
        );
    });

    it('throws UserUniqueViolationError when email is not unique', async () => {
        const mockUserRepository = new MockUserRepository() as IUserRepository;
        const mockJwtTokenService =
            new MockJwtTokenService() as IJWTtokenService;
        const mockBcryptService = new MockBcryptService() as IbcryptService;

        // Simulate non-unique email
        (
            mockUserRepository.getUsersByUsername as jest.Mock
        ).mockResolvedValueOnce([
            { userId: 1, username: 'testuser', email: 'test@example.com' },
        ]);

        const createUserUseCase = new CreateUserUseCase(
            mockUserRepository,
            mockJwtTokenService,
            mockBcryptService,
        );

        const credentials: UserCredentialsDTO = {
            username: 'notDuplicatedUser',
            email: 'test@example.com',
            password: 'testpassword',
        };

        await expect(createUserUseCase.createUser(credentials)).rejects.toThrow(
            UserUniqueViolationError,
        );
    });
});
