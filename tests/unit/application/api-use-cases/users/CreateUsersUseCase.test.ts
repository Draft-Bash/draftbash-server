/* eslint-disable @typescript-eslint/no-unused-vars */
import UserUniqueViolationError from '../../../../../src/domain/exceptions/users/UserAlreadyExistsError';
import MockbcryptService from './Mocks/MockbcryptService';
import MockJWTtokenService from './Mocks/MockJWTtokenService';
import MockUsersRepository from './Mocks/MockUsersRepository';
import CreateUsersUseCase from '../../../../../src/application/api-use-cases/users/commands/CreateUsersUseCase';
import CreateUserRequest from '../../../../../src/presentation/data-transfer-objects/users/CreateUserRequest';
import UserEntity from '../../../../../src/domain/entities/UserEntity';
import UserCredentials from '../../../../../src/domain/value-objects/users/UserCredentials';

describe('CreateUserUseCase', () => {
    it('creates a user successfully', async () => {
        const mockUserRepository = new MockUsersRepository();
        const mockJwtTokenService = new MockJWTtokenService();
        const mockBcryptService = new MockbcryptService();

        const createUserUseCase = new CreateUsersUseCase(
            mockUserRepository,
            mockJwtTokenService,
            mockBcryptService,
        );

        const createUserRequest: CreateUserRequest = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'testPassword1!',
        };

        const result: string = await createUserUseCase.create(createUserRequest);

        expect(result).toBe('mockToken');
    });

    it('throws UserUniqueViolationError when username is not unique', async () => {
        const mockUserRepository = new MockUsersRepository();
        const mockJwtTokenService = new MockJWTtokenService();
        const mockBcryptService = new MockbcryptService();

        // Simulate non-unique username
        (mockUserRepository.getUserByUsername as jest.Mock).mockResolvedValueOnce(
            new UserEntity(
                1,
                new UserCredentials({
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'testPassword1!',
                }),
            ),
        );

        const createUserUseCase = new CreateUsersUseCase(mockUserRepository, mockJwtTokenService, mockBcryptService);

        const credentials: CreateUserRequest = {
            username: 'testuser',
            email: 'notDuplicate@example.com',
            password: 'testPassword1!',
        };

        await expect(createUserUseCase.create(credentials)).rejects.toThrow(UserUniqueViolationError);
    });

    it('throws UserUniqueViolationError when email is not unique', async () => {
        const mockUserRepository = new MockUsersRepository();
        const mockJwtTokenService = new MockJWTtokenService();
        const mockBcryptService = new MockbcryptService();

        (mockUserRepository.getUserByUsername as jest.Mock).mockResolvedValueOnce(
            new UserEntity(
                1,
                new UserCredentials({
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'testPassword1!',
                }),
            ),
        );

        const createUserUseCase = new CreateUsersUseCase(
            mockUserRepository,
            mockJwtTokenService,
            mockBcryptService,
        );

        const credentials: CreateUserRequest = {
            username: 'differentUser',
            email: 'test@example.com',
            password: 'testPassword1!',
        };

        await expect(createUserUseCase.create(credentials)).rejects.toThrow(
            UserUniqueViolationError
        );
    });
});
