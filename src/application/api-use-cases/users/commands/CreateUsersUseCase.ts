import IJWTtokenService from '../../../../adapter-interfaces/authentication/IJWTtokenService';
import UserUniqueViolationError from '../../../../domain/exceptions/users/UserAlreadyExistsError';
import IUsersRepository from '../../../../domain/repositories/IUsersRepository';
import IbcryptService from '../../../../adapter-interfaces/authentication/IbcryptService';
import ICreateUsersUseCase from '../use-case-interfaces/ICreateUsersUseCase';
import UserCredentials from '../../../../domain/value-objects/users/UserCredentials';
import CreateUserRequest from '../../../../presentation/data-transfer-objects/users/CreateUserRequest';
import UserEntity from '../../../../domain/entities/UserEntity';

// Handles user registration business logic.
export default class CreateUsersUseCase implements ICreateUsersUseCase {
    private readonly userRepository: IUsersRepository;

    private readonly jwtTokenService: IJWTtokenService;

    private readonly bcryptService: IbcryptService;

    /**
     * Constructor for the CreateUsersUseCase.
     * @param {IUsersRepository} userRepository - Central class containing all database methods for the users table.
     * @param {IJWTtokenService} jwtTokenService - Class containing methods for signing and verifying JWT tokens.
     * @param {IbcryptService} bcryptService - Class containing methods for hashing and comparing passwords.
     */
    constructor(userRepository: IUsersRepository, jwtTokenService: IJWTtokenService, bcryptService: IbcryptService) {
        this.userRepository = userRepository;
        this.jwtTokenService = jwtTokenService;
        this.bcryptService = bcryptService;
    }

    /**
     * Creates a new user with the provided credentials.
     * @async
     * @param {CreateUserRequest} credentials - User credentials for registration.
     * @returns {Promise<string>} A JWT token representing the newly created user.
     * @throws {UserAlreadyExistsError} Thrown when attempting to register a user with an existing username or email.
     * @throws {BadRequestError} Thrown by UserEntity when the credentials fail basic validation, such as password length.
     */
    async create(createUserRequest: CreateUserRequest): Promise<string> {
        // Checks if the username or email already exists in the database.
        const isUsernameUnique: boolean = (await this.userRepository.getUserByUsername(createUserRequest.username)) == null;
        const isEmailUnique: boolean = (await this.userRepository.getUserByEmail(createUserRequest.email)) == null;

        if (!isUsernameUnique || !isEmailUnique) {
            throw new UserUniqueViolationError(isUsernameUnique, isEmailUnique, 'UserUniqueViolationError');
        }

        // Hashes the user's password with bcrypt.
        const bcryptPassword: string = this.bcryptService.hashSync(createUserRequest.password);

        // Creates a new user credentials object, which applies basic validation checks on the credentials.
        const userCredentials = new UserCredentials({
            username: createUserRequest.username,
            email: createUserRequest.email,
            password: bcryptPassword,
        });

        // Inserts the user into the database. That user is then returned back.
        const createdUser: UserEntity = await this.userRepository.insertUser(userCredentials);

        /* 
        Signs and returns a signed JWT token with an expiration date. 
        Used for immediate authorization after a user is created.
        */
        const jwtToken: string = this.jwtTokenService.sign(createdUser);
        return jwtToken;
    }
}
