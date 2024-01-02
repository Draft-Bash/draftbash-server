import { Request, Response } from 'express';
import { UserCredentialsDTO } from '../../application/contracts/data-transfer-objects/users/UserCredentialsDTO';
import { ICreateUsersUseCase } from '../../application/contracts/use-cases/ICreateUsersUseCase';
import { UserUniqueViolationError } from '../../domain/exceptions/users/UserUniqueViolationError';

export default class UsersController {
    private readonly createUserUseCase: ICreateUsersUseCase;

    constructor(createUserUseCase: ICreateUsersUseCase) {
        this.createUserUseCase = createUserUseCase;
    }

    createUser = async (req: Request, res: Response) => {
        try {
            const createUserRequest: UserCredentialsDTO = req.body;
            const result: string = await this.createUserUseCase.execute(createUserRequest);
            const createdUserResponse: string = result;
            res.status(201).send(createdUserResponse);
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error instanceof UserUniqueViolationError) {
                    res.status(409).send({ error: error.message });
                } else {
                    res.status(500).send({ error: error.message });
                }
            } else {
                res.status(500).send({ error: 'An unknown error occurred.' });
            }
        }
    };
}
