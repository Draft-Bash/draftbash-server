/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/no-unused-vars */
import UserIdentificationDTO from '../../../../../src/application/contracts/data-transfer-objects/users/UserIdentification';
import IJWTtokenService from '../../../../../src/application/contracts/services/authentication/IJWTtokenService';

export default class MockJwtTokenService implements IJWTtokenService {
    // Mock implementation
    sign(data: unknown, options: unknown): string {
        return 'mockToken';
    }

    verify(token: string): UserIdentificationDTO | null {
        if (token === 'mockToken') {
            return {
                userId: 1,
                username: 'testuser',
                email: 'test@example.com',
            };
        }
        return null;
    }
}
