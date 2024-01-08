export default interface ILoginUsersUseCase {
    loginUser(usernameOrEmail: string, password: string): Promise<string>;
}