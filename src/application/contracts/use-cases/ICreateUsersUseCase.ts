import UserCredentialsDTO from '../data-transfer-objects/users/UserCredentials';

export default interface ICreateUsersUseCase {
    create(userCredentials: UserCredentialsDTO): Promise<string>;
}
