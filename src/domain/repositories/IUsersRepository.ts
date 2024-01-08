import UserEntity from '../entities/UserEntity';
import UserCredentials from '../value-objects/users/UserCredentials';

export default interface IUserRepository {
    getUsernamesLikeUsername(username: string): Promise<string[]>;
    insertUser(userCredentials: UserCredentials): Promise<UserEntity>;
    getUserByUsername(username: string): Promise<UserEntity | null>;
    getUserByEmail(username: string): Promise<UserEntity | null>;
    getUserByUsernameOrEmail(usernameOrEmail: string): Promise<UserEntity | null>;
}
