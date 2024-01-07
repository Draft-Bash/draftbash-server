import UserIdentificationDTO from '../../../../../src/presentation/data-transfer-objects/users/UserIdentificationDTO';
import MockUsersRepository from './Mocks/MockUsersRepository';
import SearchUsersByUsernameUseCase from '../../../../../src/application/api-use-cases/users/queries/SearchUsersByUsernameUseCase';
import UserNotFoundByUsernameError from '../../../../../src/domain/exceptions/users/UserNotFoundByUsernameError';
import UserIdentification from '../../../../../src/presentation/data-transfer-objects/users/UserIdentificationDTO';

describe('SearchUsersByUsernameUseCase', () => {
    it('throws a UserNotFoundByUsernameError returning a list of users with similar usernames.', async () => {
        const mockUserRepository = new MockUsersRepository();
        const similarUsers: UserIdentificationDTO[] = [
            { userId: 2, username: 'testuser2', email: 'testuser2@email.com' },
            { userId: 3, username: 'testuser3', email: 'testuser3@email.com' },
        ];

        (mockUserRepository.getUserByUsername as jest.Mock).mockResolvedValueOnce(null);
        (mockUserRepository.getUsersLikeUsername as jest.Mock).mockResolvedValueOnce(similarUsers);

        const searchUsersByUsernameUseCase = new SearchUsersByUsernameUseCase(mockUserRepository);

        try {
            await searchUsersByUsernameUseCase.search('testuser');
            // If the above line doesn't throw an error, fail the test.
            fail('Expected UserNotFoundByUsernameError, but no error was thrown.');
        } catch (error) {
            expect(error).toBeInstanceOf(UserNotFoundByUsernameError);

            const userNotFoundError = error as UserNotFoundByUsernameError;
            expect(userNotFoundError.getSimilarUsernameUsers()).toEqual(similarUsers);
        }
    });

    it('returns a matching user and similar users when a match is found', async () => {
        const mockUserRepository = new MockUsersRepository();
        const similarUsers: UserIdentificationDTO[] = [
            { userId: 2, username: 'testuser2', email: 'testuser2@email.com' },
            { userId: 3, username: 'testuser3', email: 'testuser3@email.com' },
        ];
        const matchingUser: UserIdentificationDTO = {
            userId: 1,
            username: 'testuser',
            email: 'testuser@email.com',
        };

        (mockUserRepository.getUserByUsername as jest.Mock).mockResolvedValueOnce(matchingUser);
        (mockUserRepository.getUsersLikeUsername as jest.Mock).mockResolvedValueOnce(similarUsers);

        const searchUsersByUsernameUseCase = new SearchUsersByUsernameUseCase(mockUserRepository);
        const result: UserIdentification = await searchUsersByUsernameUseCase.search('testuser');

        expect(result).toEqual(matchingUser);
    });
});