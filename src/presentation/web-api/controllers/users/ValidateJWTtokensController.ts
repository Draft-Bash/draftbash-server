import { Request, Response } from 'express';
import UserIdentificationDTO from '../../../data-transfer-objects/users/UserIdentificationDTO';
import IValidateJWTtokensUseCase from '../../../../application/api-use-cases/users/use-case-interfaces/IValidateJWTtokensUseCase';
import InvalidJWTtokenError from '../../../../domain/exceptions/users/InvalidJWTtokenError';

export default class ValidateJWTtokensController {
    private readonly validateJWTtokenUseCase: IValidateJWTtokensUseCase;

    constructor(validateJWTtokenUseCase: IValidateJWTtokensUseCase) {
        this.validateJWTtokenUseCase = validateJWTtokenUseCase;
    }

    async validateJWTtoken(req: Request, res: Response) {
        try {
            const authorizationHeader: string | undefined = req.headers.authorization;
            if (authorizationHeader === undefined) {
                res.status(401).json({ error: 'Unauthorized: Token is missing' });
            }
            else {
                const jwtToken: string = authorizationHeader.split(' ')[1];
                const validatedUser: UserIdentificationDTO =
                await this.validateJWTtokenUseCase.validateJWTtoken(jwtToken);
                res.status(200).send(validatedUser);
            }
        } catch (error: unknown) {
            if (error instanceof InvalidJWTtokenError) {
                res.status(403).send({ error: error.message });
            } else if (error instanceof Error) {
                res.status(500).send({ error: error.message });
            } else {
                res.status(500).send({ error: 'An unknown error occurred.' });
            }
        }
    }
}
