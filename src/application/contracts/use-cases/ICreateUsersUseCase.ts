import UserCredentialsDTO from '../data-transfer-objects/users/UserCredentialsDTO';

export default interface ICreateUsersUseCase {
    execute(userCredentials: UserCredentialsDTO): Promise<string>;
}
