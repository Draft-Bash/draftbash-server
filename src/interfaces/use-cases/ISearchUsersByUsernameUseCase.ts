
import UserSearchResult from "../../../interfaces/data-transfer-objects/users/UserSearchResultDTO";

export default interface ISearchUsersByUsernameUseCase {
    search(username: string): Promise<UserIdentification>;
}