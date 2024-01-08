import MockUsersRepository from './Mocks/MockUsersRepository';
import SearchUsersByUsernameUseCase from '../../../../../src/application/api-use-cases/users/queries/SearchUsersByUsernameUseCase';
import UserNotFoundByUsernameError from '../../../../../src/domain/exceptions/users/UserNotFoundByUsernameError';
import UserEntity from '../../../../../src/domain/entities/UserEntity';
import UserCredentials from '../../../../../src/domain/value-objects/users/UserCredentials';

describe('SearchUsersByUsernameUseCase', () => {
    it('throws a UserNotFoundByUsernameError returning a list of users with similar usernames.', async () => {
        const mockUserRepository = new MockUsersRepository();
        const similarUsernames: string[] = ['testuser2', 'testuser3'];

        (mockUserRepository.getUserByUsername as jest.Mock).mockResolvedValueOnce(null);
        (mockUserRepository.getUsernamesLikeUsername as jest.Mock).mockResolvedValueOnce(similarUsernames);

        const searchUsersByUsernameUseCase = new SearchUsersByUsernameUseCase(mockUserRepository);

        try {
            await searchUsersByUsernameUseCase.search('testuser');
            // If the above line doesn't throw an error, fail the test.
            fail('Expected UserNotFoundByUsernameError, but no error was thrown.');
        } catch (error) {
            expect(error).toBeInstanceOf(UserNotFoundByUsernameError);

            const userNotFoundError = error as UserNotFoundByUsernameError;
            expect(userNotFoundError.getSimilarUsernameUsers()).toEqual(similarUsernames);
        }
    });

    it('returns a matching user and similar users when a match is found', async () => {
        const mockUserRepository = new MockUsersRepository();
        const similarUsernames: string[] = ['testuser2', 'testuser3'];

        const matchingUser = new UserEntity(
            1,
            new UserCredentials({
                username: 'testuser',
                email: 'test@example.com',
                password: 'testPassword1',
            }),
        );

        (mockUserRepository.getUserByUsername as jest.Mock).mockResolvedValueOnce(matchingUser);
        (mockUserRepository.getUsernamesLikeUsername as jest.Mock).mockResolvedValueOnce(similarUsernames);

        const searchUsersByUsernameUseCase = new SearchUsersByUsernameUseCase(mockUserRepository);
        const result: UserEntity = await searchUsersByUsernameUseCase.search('testuser');

        expect(result.getUserId).toEqual(matchingUser.getUserId);
    });
});