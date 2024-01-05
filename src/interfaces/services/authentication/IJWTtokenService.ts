import UserIdentificationDTO from "../../data-transfer-objects/users/UserIdentificationDTO";

export default interface IJWTtokenService {
    sign(userToken: UserIdentificationDTO): string;
    verify(token: string): UserIdentificationDTO;
}
