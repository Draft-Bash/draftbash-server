import UserIdentificationDTO from "../../../../presentation/data-transfer-objects/users/UserIdentificationDTO";


export default interface ISearchUsersByUsernameUseCase {
    search(username: string): Promise<UserIdentificationDTO>;
}