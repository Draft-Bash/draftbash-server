/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/no-unused-vars */
import UserEntity from '../../../../../../src/domain/entities/UserEntity';
import UserIdentificationDTO from '../../../../../../src/presentation/data-transfer-objects/users/UserIdentificationDTO';
import IUserRepository from '../../../../../../src/domain/repositories/IUsersRepository';
import UserCredentials from '../../../../../../src/domain/value-objects/users/UserCredentials';


export default class MockUsersRepository implements IUserRepository {
    getUsernamesLikeUsername: jest.Mock<Promise<string[]>, [string]> = jest.fn(
        async (username: string) => [],
    );

    getUserByUsernameOrEmail: jest.Mock<Promise<UserEntity | null>, [string]> =jest.fn(
        async (usernameOrEmail: string) => null
    );

    getUserByUsername: jest.Mock<Promise<UserEntity| null>, [string]> = jest.fn(
        async (username: string) => null,
    );

    getUserByEmail: jest.Mock<Promise<UserEntity | null>, [string]> = jest.fn(
        async (email: string) => null,
    );

    async insertUser(userCredentials: UserCredentials): Promise<UserEntity> {
        return new UserEntity(
            1,
            new UserCredentials({
                username: userCredentials.getUsername(),
                email: userCredentials.getEmail(),
                password: userCredentials.getPassword(),
            })
        )
    }
}
