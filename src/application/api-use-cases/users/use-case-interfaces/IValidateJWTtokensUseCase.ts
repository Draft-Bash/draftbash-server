import UserResponse from "../../../../presentation/data-transfer-objects/users/UserResponse";

export default interface IValidateJWTtokensUseCase {
    validateJWTtoken(jwtToken: string): Promise<UserResponse>;
}