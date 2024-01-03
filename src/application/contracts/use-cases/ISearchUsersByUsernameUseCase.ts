
import UserSearchResult from "../data-transfer-objects/users/UserSearchResultDTO";

export default interface ISearchUsersByUsernameUseCase {
    search(username: string): Promise<UserIdentification>;
}