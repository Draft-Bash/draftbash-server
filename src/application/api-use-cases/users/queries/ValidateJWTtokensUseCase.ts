import IJWTtokenService from '../../../../adapter-interfaces/authentication/IJWTtokenService';
import IValidateJWTtokensUseCase from '../use-case-interfaces/IValidateJWTtokensUseCase';
import UserResponse from '../../../../presentation/data-transfer-objects/users/UserResponse';

export default class ValidateJWTtokensUseCase implements IValidateJWTtokensUseCase {
    private readonly jwtTokenService: IJWTtokenService;

    constructor(jwtTokenService: IJWTtokenService) {
        this.jwtTokenService = jwtTokenService;
    }

    /**
     * Validates a JWT token and returns user identification information.
     * @param {string} jwtToken - The JWT token to be validated.
     * @throws {InvalidJWTtokenError} Throws an error if the JWT token is invalid.
     * @returns {Promise<UserResponse>} A promise that resolves to user identification information.
     */
    public async validateJWTtoken(jwtToken: string): Promise<UserResponse> {
        // Verifies the JWT token. If the verification fails, an InvalidJWTtokenError is thrown.
        const user: UserResponse = this.jwtTokenService.verify(jwtToken);
        return user;
    }
}