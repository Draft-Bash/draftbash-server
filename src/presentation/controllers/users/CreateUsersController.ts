import { Request, Response } from 'express';
import UserCredentialsDTO from '../../../interfaces/data-transfer-objects/users/UserCredentialsDTO';
import ICreateUsersUseCase from '../../../interfaces/use-cases/users/ICreateUsersUseCase';
import UserUniqueViolationError from '../../../domain/exceptions/users/UserAlreadyExistsError';
import BadRequestError from '../../../domain/exceptions/BadRequestError';

// Receives HTTP request, calls use case, and sends HTTP response.
export default class CreateUsersController {
    private readonly createUsersUsecase: ICreateUsersUseCase;

    constructor(createUserUseCase: ICreateUsersUseCase) {
        this.createUsersUsecase = createUserUseCase;
    }

    async createUser(req: Request, res: Response) {
        try {
            const userCredentials: UserCredentialsDTO = req.body;
            const userJwtAuthorizationToken: string = await this.createUsersUsecase.create(userCredentials);
            res.status(201).send(userJwtAuthorizationToken);
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error instanceof UserUniqueViolationError) {
                    res.status(409).send({
                        error: error.message,
                        isUsernameUnique: error.getIsUsernameUnique(),
                        isEmailUnique: error.getIsEmailUnique(),
                    });
                } else if (error instanceof BadRequestError) {
                    res.status(400).send({ error: error.message });
                } else {
                    res.status(500).send({ error: error.message });
                }
            } else {
                res.status(500).send({ error: 'An unknown error occurred.' });
            }
        }
    }
}
