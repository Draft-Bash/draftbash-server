import IUsersRepository from '../../../../interfaces/repositories/IUsersRepository';
import ISearchUsersByUsernameUseCase from '../../../../interfaces/use-cases/users/ISearchUsersByUsernameUseCase';
import UserNotFoundByUsernameError from '../../../../domain/exceptions/users/UserNotFoundByUsernameError';
import UserIdentificationDTO from '../../../../interfaces/data-transfer-objects/users/UserIdentificationDTO';

export default class SearchUsersByUsernameUseCase implements ISearchUsersByUsernameUseCase {
    private userRepository: IUsersRepository;

    /**
     * Constructor for the CreateUsersUseCase.
     * @constructor
     * @param {IUsersRepository} userRepository - The repository for accessing user data.
     */
    constructor(userRepository: IUsersRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Searches for a user by username and returns their identification details.
     * If no exact match is found, it throws an error, containing a list of similar users with similar usernames.
     * @async
     * @param {string} username - The username to search for.
     * @returns {Promise<UserIdentificationDTO>} The identification details of the matching user.
     * @throws {UserNotFoundByUsernameError} Thrown when no exact match is found, providing similar users.
     */
    async search(username: string): Promise<UserIdentificationDTO> {
        const matchingUser: UserIdentificationDTO | null = await this.userRepository.getUserByUsername(username);

        if (matchingUser != null) {
            return matchingUser;
        }

        const similarUsers: UserIdentificationDTO[] = await this.userRepository.getUsersLikeUsername(username);

        throw new UserNotFoundByUsernameError(similarUsers, 'UserNotFoundByUsernameError');
    }
}
