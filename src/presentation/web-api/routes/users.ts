import express, { Request, Response } from 'express';
import BcryptService from '../../../infrastructure/authentication/BcryptService';
import UsersRepository from '../../../infrastructure/persistence/repositories/UsersRepository';
import CreateUsersUseCase from '../../../application/api-use-cases/users/commands/CreateUsersUseCase';
import JWTtokenService from '../../../infrastructure/authentication/JWTtokenService';
import CreateUsersController from '../controllers/users/CreateUsersController';
import SearchUsersByUsernameController from '../controllers/users/SearchUsersByUsernameController';
import SearchUsersByUsernameUseCase from '../../../application/api-use-cases/users/queries/SearchUsersByUsernameUseCase';
import LoginUsersUseCase from '../../../application/api-use-cases/users/queries/LoginUsersUseCase';
import LoginUsersController from '../controllers/users/LoginUsersController';
import ValidateJWTtokensUseCase from '../../../application/api-use-cases/users/queries/ValidateJWTtokensUseCase';
import ValidateJWTtokensController from '../controllers/users/ValidateJWTtokensController';

const usersRouter = express.Router();

const usersRepository = new UsersRepository();
const jwtTokenService = new JWTtokenService();
const bcryptService = new BcryptService();

const searchUsersByUsernameUseCase = new SearchUsersByUsernameUseCase(usersRepository);
const createUsersUseCase = new CreateUsersUseCase(usersRepository, jwtTokenService, bcryptService);
const loginUsersUseCase = new LoginUsersUseCase(usersRepository, jwtTokenService, bcryptService);
const validateJWTtokensUseCase = new ValidateJWTtokensUseCase(jwtTokenService);

const createUsersController = new CreateUsersController(createUsersUseCase);
const searchUsersByUsernameController = new SearchUsersByUsernameController(searchUsersByUsernameUseCase);
const loginUsersController = new LoginUsersController(loginUsersUseCase);
const validateJWTtokensController = new ValidateJWTtokensController(validateJWTtokensUseCase);

usersRouter
    .route('/')
    .post((request: Request, response: Response) => createUsersController.createUser(request, response))
    .get((request: Request, response: Response) =>
        searchUsersByUsernameController.searchUsersByUsername(request, response),
    );

usersRouter
    .route('/authentication-tokens')
    .post((request: Request, response: Response) => loginUsersController.loginUser(request, response))
    .get((request: Request, response: Response) => validateJWTtokensController.validateJWTtoken(request, response));

export default usersRouter;
