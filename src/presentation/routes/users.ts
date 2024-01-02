import express, { Request, Response } from 'express';
import BcryptService from '../../infrastructure/services/authentication/BcryptService';
import UsersRepository from '../../infrastructure/persistence/repositories/UsersRepository';
import CreateUsersUseCase from '../../application/api-use-cases/users/commands/CreateUsersUseCase';
import JWTtokenService from '../../infrastructure/services/authentication/JWTtokenService';
import UsersController from '../controllers/UsersController';

const usersRouter = express.Router();
const createUsersUseCase = new CreateUsersUseCase(
    new UsersRepository(),
    new JWTtokenService(),
    new BcryptService(),
);
const usersController = new UsersController(createUsersUseCase);

usersRouter
    .route('/')
    .post((request: Request, response: Response) => usersController.createUser(request, response));

export default usersRouter;
