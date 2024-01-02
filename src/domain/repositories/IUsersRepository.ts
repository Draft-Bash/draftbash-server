import { UserCredentialsDTO } from "../../application/contracts/data-transfer-objects/users/UserCredentialsDTO";
import { UserIdentificationDTO } from "../../application/contracts/data-transfer-objects/users/UserIdentificationDTO";

export interface IUserRepository {
    getUsersLikeUsername(username: string): Promise<UserIdentificationDTO[]>;
    insertUser(userCredentials: UserCredentialsDTO): Promise<UserIdentificationDTO>;
    getUsersByUsername(username: string): Promise<UserIdentificationDTO[]>;
    getUsersByEmail(username: string): Promise<UserIdentificationDTO[]>;
    getUserByUsernameOrEmail(
        username: string,
        email: string,
    ): Promise<UserIdentificationDTO | null>;
    updateUserPassword(userId: number, password: string): Promise<void>;
}