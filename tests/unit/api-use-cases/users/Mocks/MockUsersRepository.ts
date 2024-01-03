/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/no-unused-vars */
import UserCredentials from '../../../../../src/application/contracts/data-transfer-objects/users/UserCredentials';
import UserIdentification from '../../../../../src/application/contracts/data-transfer-objects/users/UserIdentification';
import IUserRepository from '../../../../../src/application/contracts/repositories/IUsersRepository';

export default class MockUsersRepository implements IUserRepository {
    getUsersLikeUsername: jest.Mock<Promise<UserIdentification[]>, [string]> = jest.fn(
        async (username: string) => [],
    );

    getUserByUsernameOrEmail: jest.Mock<Promise<UserIdentification | null>, [string, string]> =jest.fn(
        async (username: string, email: string) => null
    );

    getUserByUsername: jest.Mock<Promise<UserIdentification | null>, [string]> = jest.fn(
        async (username: string) => null,
    );

    getUserByEmail: jest.Mock<Promise<UserIdentification | null>, [string]> = jest.fn(
        async (email: string) => null,
    );

    async insertUser(userCredentials: UserCredentials): Promise<UserIdentification> {
        return {
            userId: 1,
            username: userCredentials.username,
            email: userCredentials.email,
        };
    }
}
