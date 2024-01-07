import UserIdentificationDTO from "../../../../presentation/data-transfer-objects/users/UserIdentificationDTO";

export default interface IValidateJWTtokensUseCase {
    validateJWTtoken(jwtToken: string): Promise<UserIdentificationDTO>;
}