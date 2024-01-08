import * as Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import IJWTtokenService from '../../adapter-interfaces/authentication/IJWTtokenService';
import InvalidJWTtokenError from '../../domain/exceptions/users/InvalidJWTtokenError';
import UserEntity from '../../domain/entities/UserEntity';
import UserResponse from '../../presentation/data-transfer-objects/users/UserResponse';

dotenv.config();

export default class JWTtokenService implements IJWTtokenService {
    private readonly secret: string;

    private readonly jwt: typeof Jwt;

    constructor() {
        this.secret = process.env.JWT_SECRET as string;
        this.jwt = Jwt;
    }

    sign(user: UserEntity): string {
        const jwtToken: string = this.jwt.sign(
            {
                userId: user.getUserId(),
                username: user.getUsername(),
                email: user.getEmail(),
            },
            this.secret,
            { expiresIn: '2hr' },
        );
        return jwtToken;
    }

    verify(jwtToken: string): UserResponse {
        try {
            const user: UserResponse = this.jwt.verify(jwtToken, this.secret) as UserResponse;
            return user;
        } catch (error: unknown) {
            throw new InvalidJWTtokenError("InvalidJWTtokenError");
        }
    }
}
