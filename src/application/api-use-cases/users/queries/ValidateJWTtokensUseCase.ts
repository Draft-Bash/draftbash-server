import UserIdentificationDTO from '../../../../interfaces/data-transfer-objects/users/UserIdentificationDTO';
import IJWTtokenService from '../../../../interfaces/services/authentication/IJWTtokenService';
import IValidateJWTtokensUseCase from '../../../../interfaces/use-cases/users/IValidateJWTtokensUseCase';

export default class ValidateJWTtokensUseCase implements IValidateJWTtokensUseCase {
    private readonly jwtTokenService: IJWTtokenService;

    constructor(jwtTokenService: IJWTtokenService) {
        this.jwtTokenService = jwtTokenService;
    }

    /**
     * Validates a JWT token and returns user identification information.
     * @param {string} jwtToken - The JWT token to be validated.
     * @throws {InvalidJWTtokenError} Throws an error if the JWT token is invalid.
     * @returns {Promise<UserIdentificationDTO>} A promise that resolves to user identification information.
     */
    public async validateJWTtoken(jwtToken: string): Promise<UserIdentificationDTO> {
        // Verifies the JWT token. If the verification fails, an InvalidJWTtokenError is thrown.
        const user: UserIdentificationDTO = this.jwtTokenService.verify(jwtToken);
        return user;
    }
}