import * as Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserIdentificationDTO from '../../../interfaces/data-transfer-objects/users/UserIdentificationDTO';
import IJWTtokenService from '../../../interfaces/services/authentication/IJWTtokenService';

dotenv.config();

export default class JWTtokenService implements IJWTtokenService {
    private readonly secret: string;

    private readonly jwt: typeof Jwt;

    constructor() {
        this.secret = process.env.JWT_SECRET as string;
        this.jwt = Jwt;
    }

    sign(credentials: UserIdentificationDTO): string {
        const jwtToken: string = this.jwt.sign(
            {
                userId: credentials.userId,
                username: credentials.username,
                email: credentials.email,
            },
            this.secret,
            { expiresIn: '2hr' },
        );
        return jwtToken;
    }

    verify(jwtToken: string): UserIdentificationDTO | null {
        const userToken: UserIdentificationDTO = this.jwt.verify(
            jwtToken,
            this.secret,
        ) as UserIdentificationDTO;
        if (userToken) {
            return userToken;
        }
        return null;
    }
}
