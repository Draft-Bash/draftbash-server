import UserIdentificationDTO from "../../data-transfer-objects/users/UserIdentificationDTO";


export default interface ISearchUsersByUsernameUseCase {
    search(username: string): Promise<UserIdentificationDTO>;
}