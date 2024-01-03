import { Request, Response } from 'express';
import UserCredentialsDTO from '../../../application/contracts/data-transfer-objects/users/UserCredentials';
import ICreateUsersUseCase from '../../../application/contracts/use-cases/ICreateUsersUseCase';
import UserUniqueViolationError from '../../../domain/exceptions/users/UserUniqueViolationError';
import BadRequestError from '../../../domain/exceptions/BadRequestError';

export default class CreateUsersController {
    private readonly createUsersUsecase: ICreateUsersUseCase;

    constructor(createUserUseCase: ICreateUsersUseCase) {
        this.createUsersUsecase = createUserUseCase;
    }

    async createUser(req: Request, res: Response) {
        try {
            const userCreationCredentials: UserCredentialsDTO = req.body;
            const createdUserJwtAuthorizationToken: string =
                await this.createUsersUsecase.create(userCreationCredentials);
            res.status(201).send(createdUserJwtAuthorizationToken);
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
