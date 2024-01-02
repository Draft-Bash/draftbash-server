/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/no-unused-vars */
import IUserRepository from '../../../../../src/domain/repositories/IUsersRepository';
import UserCredentialsDTO from '../../../../../src/application/contracts/data-transfer-objects/users/UserCredentialsDTO';
import UserIdentificationDTO from '../../../../../src/application/contracts/data-transfer-objects/users/UserIdentificationDTO';

export default class MockUserRepository implements IUserRepository {
    getUsersLikeUsername: jest.Mock<Promise<UserIdentificationDTO[]>, [string]> = jest.fn(
        async (username: string) => [],
    );

    getUserByUsernameOrEmail: jest.Mock<Promise<UserIdentificationDTO | null>, [string, string]> =
        jest.fn(async (username: string, email: string) => null);

    updateUserPassword: jest.Mock<Promise<void>, [number, string]> = jest.fn(
        async (userId: number, password: string) => {},
    );

    getUsersByUsername: jest.Mock<Promise<UserIdentificationDTO[]>, [string]> = jest.fn(
        async (username: string) => [],
    );

    getUsersByEmail: jest.Mock<Promise<UserIdentificationDTO[]>, [string]> = jest.fn(
        async (email: string) => [],
    );

    async insertUser(userCredentials: UserCredentialsDTO): Promise<UserIdentificationDTO> {
        return {
            userId: 1,
            username: userCredentials.username,
            email: userCredentials.email,
        };
    }
}
