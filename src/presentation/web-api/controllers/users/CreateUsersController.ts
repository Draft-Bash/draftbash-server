import { Request, Response } from 'express';
import ICreateUsersUseCase from '../../../../application/api-use-cases/users/use-case-interfaces/ICreateUsersUseCase';
import UserUniqueViolationError from '../../../../domain/exceptions/users/UserAlreadyExistsError';
import BadRequestError from '../../../../domain/exceptions/BadRequestError';
import CreateUserRequest from '../../../data-transfer-objects/users/CreateUserRequest';

// Receives HTTP request, calls use case, and sends HTTP response.
export default class CreateUsersController {
    private readonly createUsersUsecase: ICreateUsersUseCase;

    constructor(createUserUseCase: ICreateUsersUseCase) {
        this.createUsersUsecase = createUserUseCase;
    }

    async createUser(req: Request, res: Response) {
        try {
            const createUserRequest: CreateUserRequest = req.body;
            const userJwtAuthorizationToken: string = await this.createUsersUsecase.create(createUserRequest);
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
