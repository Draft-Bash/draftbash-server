import * as Bcrypt from 'bcryptjs';
import IbcryptService from '../../../application/contracts/services/authentication/IbcryptService';

export default class BcryptService implements IbcryptService {

    private readonly bcrypt: typeof Bcrypt;

    constructor() {
        this.bcrypt = Bcrypt;
    }

    hashSync(password: string): string {
        const saltRounds = 10;
        const salt = this.bcrypt.genSaltSync(saltRounds);
        const bcryptPassword = this.bcrypt.hashSync(password, salt);
        return bcryptPassword;
    }

    compareSync(password: string, hashedPassword: string): boolean {
        return this.bcrypt.compareSync(password, hashedPassword);
    }
}
