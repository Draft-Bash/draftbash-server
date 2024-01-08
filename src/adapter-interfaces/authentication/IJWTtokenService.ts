import UserEntity from "../../domain/entities/UserEntity";
import UserResponse from "../../presentation/data-transfer-objects/users/UserResponse";

export default interface IJWTtokenService {
    sign(userToken: UserEntity): string;
    verify(token: string): UserResponse;
}
