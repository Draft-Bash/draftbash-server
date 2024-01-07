import UserEntity from '../value-objects/users/UserEntity';
import UserCredentialsDTO from '../../presentation/data-transfer-objects/users/UserCredentialsDTO';
import UserIdentificationDTO from '../../presentation/data-transfer-objects/users/UserIdentificationDTO';

export default interface IUserRepository {
    getUsersLikeUsername(username: string): Promise<UserIdentificationDTO[]>;
    insertUser(userCredentials: UserCredentialsDTO): Promise<UserIdentificationDTO>;
    getUserByUsername(username: string): Promise<UserIdentificationDTO | null>;
    getUserByEmail(username: string): Promise<UserIdentificationDTO | null>;
    getUserByUsernameOrEmail(usernameOrEmail: string): Promise<UserEntity | null>;
}
