import express, { Request, Response } from 'express';
import BcryptService from '../../infrastructure/services/authentication/BcryptService';
import UsersRepository from '../../infrastructure/persistence/repositories/UsersRepository';
import CreateUsersUseCase from '../../application/api-use-cases/users/commands/CreateUsersUseCase';
import JWTtokenService from '../../infrastructure/services/authentication/JWTtokenService';
import CreateUsersController from '../controllers/users/CreateUsersController';
import SearchUsersByUsernameController from '../controllers/users/SearchUsersByUsernameController';
import SearchUsersByUsernameUseCase from '../../application/api-use-cases/users/queries/SearchUsersByUsernameUseCase';

const usersRouter = express.Router();

const usersRepository = new UsersRepository();
const jwtTokenService = new JWTtokenService();
const bcryptService = new BcryptService();

const searchUsersByUsernameUseCase = new SearchUsersByUsernameUseCase(usersRepository);
const createUsersUseCase = new CreateUsersUseCase(usersRepository, jwtTokenService, bcryptService);

const createUsersController = new CreateUsersController(createUsersUseCase);
const searchUsersByUsernameController = new SearchUsersByUsernameController(searchUsersByUsernameUseCase);

usersRouter
    .route('/')
    .post((request: Request, response: Response) =>
        createUsersController.createUser(request, response),
    ).get((request: Request, response: Response) =>
        searchUsersByUsernameController.searchUsersByUsername(request, response),
    );

export default usersRouter;
