/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/no-unused-vars */
import InvalidJWTtokenError from '../../../../../../src/domain/exceptions/users/InvalidJWTtokenError';
import UserIdentificationDTO from '../../../../../../src/presentation/data-transfer-objects/users/UserIdentificationDTO';
import IJWTtokenService from '../../../../../../src/adapter-interfaces/authentication/IJWTtokenService';

export default class MockJwtTokenService implements IJWTtokenService {
    // Mock implementation
    sign(data: unknown): string {
        return 'mockToken';
    }

    verify(token: string): UserIdentificationDTO{
        if (token === 'mockToken') {
            return {
                userId: 1,
                username: 'testuser',
                email: 'test@example.com',
            };
        }
        throw new InvalidJWTtokenError("InvalidJWTtokenError");
    }
}
