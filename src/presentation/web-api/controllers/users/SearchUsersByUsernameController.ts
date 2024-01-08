import { Request, Response } from 'express';
import ISearchUsersByUsernameUseCase from '../../../../application/api-use-cases/users/use-case-interfaces/ISearchUsersByUsernameUseCase';
import UserNotFoundByUsernameError from '../../../../domain/exceptions/users/UserNotFoundByUsernameError';
import UserEntity from '../../../../domain/entities/UserEntity';
import UserResponse from '../../../data-transfer-objects/users/UserResponse';

export default class SearchUsersByUsernameController {
    private readonly searchUsersByUsernameUseCase: ISearchUsersByUsernameUseCase;

    constructor(createUserUseCase: ISearchUsersByUsernameUseCase) {
        this.searchUsersByUsernameUseCase = createUserUseCase;
    }

    async searchUsersByUsername(req: Request, res: Response) {
        try {
            const searchedUsername: string = req.query.searched_username as string;

            const matchedUser: UserEntity = await this.searchUsersByUsernameUseCase.search(searchedUsername);

            const userResponse: UserResponse = {
                userId: matchedUser.getUserId(),
                username: matchedUser.getUsername(),
                email: matchedUser.getEmail()
            }

            res.status(200).send(userResponse);
        } catch (error: unknown) {
            if (error instanceof UserNotFoundByUsernameError) {
                res.status(404).send({
                    error: error.message,
                    similarUsernameUsers: error.getSimilarUsernameUsers(),
                });
            } else if (error instanceof Error) {
                res.status(500).send({ error: error.message });
            } else {
                res.status(500).send({ error: 'An unknown error occurred.' });
            }
        }
    }
}