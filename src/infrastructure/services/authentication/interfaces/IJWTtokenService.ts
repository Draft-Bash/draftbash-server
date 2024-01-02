import { UserIdentificationDTO } from "../../../../application/contracts/data-transfer-objects/users/UserIdentificationDTO";

export interface IJWTtokenService {
    sign(userToken: UserIdentificationDTO, options?: unknown): string;
    verify(token: string): UserIdentificationDTO | null;
}
