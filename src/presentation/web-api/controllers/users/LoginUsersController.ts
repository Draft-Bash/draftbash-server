import { Request, Response } from 'express';
import InvalidUserCredentialsError from '../../../../domain/exceptions/users/InvalidUserCredentialsError';
import ILoginUsersUseCase from '../../../../application/api-use-cases/users/use-case-interfaces/ILoginUsersUseCase';

export default class LoginUsersController {
    private readonly loginUsersUseCase: ILoginUsersUseCase;

    constructor(loginUsersUseCase: ILoginUsersUseCase) {
        this.loginUsersUseCase = loginUsersUseCase;
    }

    async loginUser(req: Request, res: Response) {
        try {
            const usernameOrEmail: string = req.body.usernameOrEmail as string;
            const password: string = req.body.password as string;

            const jwtAuthorizationToken: string = await this.loginUsersUseCase.loginUser(usernameOrEmail, password);

            res.status(200).send(jwtAuthorizationToken);
        } catch (error: unknown) {
            if (error instanceof InvalidUserCredentialsError) {
                res.status(401).send({ error: error.message });
            } else if (error instanceof Error) {
                res.status(500).send({ error: error.message });
            } else {
                res.status(500).send({ error: 'An unknown error occurred.' });
            }
        }
    }
}
