import * as Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserIdentificationDTO from '../../../interfaces/data-transfer-objects/users/UserIdentificationDTO';
import IJWTtokenService from '../../../interfaces/services/authentication/IJWTtokenService';
import InvalidJWTtokenError from '../../../domain/exceptions/users/InvalidJWTtokenError';

dotenv.config();

export default class JWTtokenService implements IJWTtokenService {
    private readonly secret: string;

    private readonly jwt: typeof Jwt;

    constructor() {
        this.secret = process.env.JWT_SECRET as string;
        this.jwt = Jwt;
    }

    sign(user: UserIdentificationDTO): string {
        const jwtToken: string = this.jwt.sign(
            {
                userId: user.userId,
                username: user.username,
                email: user.email,
            },
            this.secret,
            { expiresIn: '2hr' },
        );
        return jwtToken;
    }

    verify(jwtToken: string): UserIdentificationDTO {
        try {
            const user: UserIdentificationDTO = this.jwt.verify(jwtToken, this.secret) as UserIdentificationDTO;
            return user;
        } catch (error: unknown) {
            throw new InvalidJWTtokenError("InvalidJWTtokenError");
        }
    }
}
