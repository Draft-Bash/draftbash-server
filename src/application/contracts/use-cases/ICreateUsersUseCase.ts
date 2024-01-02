import { UserCredentialsDTO } from "../data-transfer-objects/users/UserCredentialsDTO";

export interface ICreateUsersUseCase {
    execute(userCredentials: UserCredentialsDTO): Promise<string>;
}
