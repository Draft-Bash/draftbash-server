/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/no-unused-vars */
import IbcryptService from '../../../../../src/interfaces/services/authentication/IbcryptService';

export default class MockBcryptService implements IbcryptService {
    // Mock implementation
    compareSync(password: string, hashedPassword: string): boolean {
        return password === 'testpassword' && hashedPassword === '1HashedPassword';
    }

    hashSync(password: string): string {
        return 'mockHashedPassword';
    }
}
