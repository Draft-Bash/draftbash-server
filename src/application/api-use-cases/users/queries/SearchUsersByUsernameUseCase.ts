import IUsersRepository from '../../../../interfaces/repositories/IUsersRepository';
import ISearchUsersByUsernameUseCase from '../../../../interfaces/use-cases/ISearchUsersByUsernameUseCase';
import UserNotFoundByUsernameError from '../../../../domain/exceptions/users/UserNotFoundByUsernameError';
import UserIdentificationDTO from '../../../../interfaces/data-transfer-objects/users/UserIdentificationDTO';

export default class SearchUsersByUsernameUseCase implements ISearchUsersByUsernameUseCase {
    private userRepository: IUsersRepository;

    constructor(userRepository: IUsersRepository) {
        this.userRepository = userRepository;
    }

    async search(username: string): Promise<UserIdentificationDTO> {
        const matchingUser = await this.userRepository.getUserByUsername(username);

        if (matchingUser != null) {
            return matchingUser;
        }

        const similarUsers: UserIdentificationDTO[] = await this.userRepository.getUsersLikeUsername(username);
        throw new UserNotFoundByUsernameError(similarUsers, 'UserNotFoundByUsernameError');
    }
}
