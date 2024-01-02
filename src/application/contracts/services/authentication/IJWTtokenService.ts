import { UserIdentificationDTO } from "../../data-transfer-objects/users/UserIdentificationDTO";

export default interface IJWTtokenService {
    sign(userToken: UserIdentificationDTO, options?: unknown): string;
    verify(token: string): UserIdentificationDTO | null;
}
