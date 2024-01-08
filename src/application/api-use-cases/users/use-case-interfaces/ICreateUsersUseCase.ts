import CreateUserRequest from '../../../../presentation/data-transfer-objects/users/CreateUserRequest';

export default interface ICreateUsersUseCase {
    create(createUserRequest: CreateUserRequest): Promise<string>;
}
