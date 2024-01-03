import { Request, Response } from 'express';
import ISearchUsersByUsernameUseCase from '../../../interfaces/use-cases/ISearchUsersByUsernameUseCase';
import UserNotFoundByUsernameError from '../../../domain/exceptions/users/UserNotFoundByUsernameError';

export default class SearchUsersByUsernameController {
    private readonly searchUsersByUsernameUseCase: ISearchUsersByUsernameUseCase;

    constructor(createUserUseCase: ISearchUsersByUsernameUseCase) {
        this.searchUsersByUsernameUseCase = createUserUseCase;
    }

    async searchUsersByUsername(req: Request, res: Response) {
        try {
            const searchedUsername: string = req.query.searched_username as string;

            const userWithMatchingUsername: string = await this.searchUsersByUsernameUseCase.search(searchedUsername);

            res.status(200).send(userWithMatchingUsername);
        } catch (error: unknown) {
            if (error instanceof UserNotFoundByUsernameError) {
                res.status(404).send({
                    error: error.message,
                    similarUsernameUsers: error.getSimilarUsernameUsers(),
                });
            }
            else if (error instanceof Error) {
                res.status(500).send({ error: error.message });
            } else {
                res.status(500).send({ error: 'An unknown error occurred.' });
            }
        }
    }
}
