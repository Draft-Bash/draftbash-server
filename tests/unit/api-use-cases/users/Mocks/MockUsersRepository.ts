/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/no-unused-vars */
import UserEntity from '../../../../../src/domain/entities/UserEntity';
import UserCredentials from '../../../../../src/interfaces/data-transfer-objects/users/UserCredentialsDTO';
import UserIdentificationDTO from '../../../../../src/interfaces/data-transfer-objects/users/UserIdentificationDTO';
import IUserRepository from '../../../../../src/interfaces/repositories/IUsersRepository';

export default class MockUsersRepository implements IUserRepository {
    getUsersLikeUsername: jest.Mock<Promise<UserIdentificationDTO[]>, [string]> = jest.fn(
        async (username: string) => [],
    );

    getUserByUsernameOrEmail: jest.Mock<Promise<UserEntity | null>, [string]> =jest.fn(
        async (usernameOrEmail: string) => null
    );

    getUserByUsername: jest.Mock<Promise<UserIdentificationDTO | null>, [string]> = jest.fn(
        async (username: string) => null,
    );

    getUserByEmail: jest.Mock<Promise<UserIdentificationDTO | null>, [string]> = jest.fn(
        async (email: string) => null,
    );

    async insertUser(userCredentials: UserCredentials): Promise<UserIdentificationDTO> {
        return {
            userId: 1,
            username: userCredentials.username,
            email: userCredentials.email,
        };
    }
}
