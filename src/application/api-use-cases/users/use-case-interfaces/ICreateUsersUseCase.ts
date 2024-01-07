import UserCredentialsDTO from '../../../../presentation/data-transfer-objects/users/UserCredentialsDTO';

export default interface ICreateUsersUseCase {
    create(userCredentials: UserCredentialsDTO): Promise<string>;
}
