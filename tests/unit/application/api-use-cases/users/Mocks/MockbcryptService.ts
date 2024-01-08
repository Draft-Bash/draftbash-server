/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/no-unused-vars */
import IbcryptService from '../../../../../../src/adapter-interfaces/authentication/IbcryptService';

export default class MockBcryptService implements IbcryptService {
    // Mock implementation
    compareSync(password: string, hashedPassword: string): boolean {
        return password === 'testPassword1' && hashedPassword === '1HashedPassword';
    }

    hashSync(password: string): string {
        return '1HashedPassword';
    }
}
