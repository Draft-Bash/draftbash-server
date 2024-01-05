import UserCredentialsDTO from '../../data-transfer-objects/users/UserCredentialsDTO';

export default interface ICreateUsersUseCase {
    create(userCredentials: UserCredentialsDTO): Promise<string>;
}
