import UserIdentificationDTO from "../../data-transfer-objects/users/UserIdentificationDTO";

export default interface IValidateJWTtokensUseCase {
    validateJWTtoken(jwtToken: string): Promise<UserIdentificationDTO>;
}