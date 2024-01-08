import UserEntity from "../../../../domain/entities/UserEntity";

export default interface ISearchUsersByUsernameUseCase {
    search(username: string): Promise<UserEntity>;
}