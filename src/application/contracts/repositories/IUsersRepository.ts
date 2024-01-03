import UserCredentialsDTO from '../data-transfer-objects/users/UserCredentials';
import UserIdentificationDTO from '../data-transfer-objects/users/UserIdentification';

export default interface IUserRepository {
    getUsersLikeUsername(username: string): Promise<UserIdentificationDTO[]>;
    insertUser(userCredentials: UserCredentialsDTO): Promise<UserIdentificationDTO>;
    getUserByUsername(username: string): Promise<UserIdentificationDTO | null>;
    getUserByEmail(username: string): Promise<UserIdentificationDTO | null>;
    getUserByUsernameOrEmail(username: string, email: string): Promise<UserIdentificationDTO | null>;
}
