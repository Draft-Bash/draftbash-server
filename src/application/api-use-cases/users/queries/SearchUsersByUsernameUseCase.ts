import IUsersRepository from '../../../contracts/repositories/IUsersRepository';
import ISearchUsersByUsernameUseCase from '../../../contracts/use-cases/ISearchUsersByUsernameUseCase';
import UserIdentification from '../../../contracts/data-transfer-objects/users/UserIdentification';
import UserNotFoundByUsernameError from '../../../../domain/exceptions/users/UserNotFoundByUsernameError';

export default class SearchUsersByUsernameUseCase implements ISearchUsersByUsernameUseCase {
    private userRepository: IUsersRepository;

    constructor(userRepository: IUsersRepository) {
        this.userRepository = userRepository;
    }

    async search(username: string): Promise<UserIdentification> {
        const matchingUser = await this.userRepository.getUserByUsername(username);

        if (matchingUser != null) {
            return matchingUser;
        }

        const similarUsers: UserIdentification[] = await this.userRepository.getUsersLikeUsername(username);
        throw new UserNotFoundByUsernameError(similarUsers, 'UserNotFoundByUsernameError');
    }
}
