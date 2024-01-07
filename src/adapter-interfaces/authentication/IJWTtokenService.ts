import UserIdentificationDTO from "../../presentation/data-transfer-objects/users/UserIdentificationDTO";

export default interface IJWTtokenService {
    sign(userToken: UserIdentificationDTO): string;
    verify(token: string): UserIdentificationDTO;
}
