import IJWTtokenService from '../../../../adapter-interfaces/authentication/IJWTtokenService';
import UserUniqueViolationError from '../../../../domain/exceptions/users/UserAlreadyExistsError';
import IUsersRepository from '../../../../domain/repositories/IUsersRepository';
import IbcryptService from '../../../../adapter-interfaces/authentication/IbcryptService';
import UserEntity from '../../../../domain/value-objects/users/UserEntity';
import ICreateUsersUseCase from '../use-case-interfaces/ICreateUsersUseCase';
import UserCredentialsDTO from '../../../../presentation/data-transfer-objects/users/UserCredentialsDTO';
import UserIdentificationDTO from '../../../../presentation/data-transfer-objects/users/UserIdentificationDTO';

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
     * @param {UserCredentialsDTO} credentials - User credentials for registration.
     * @returns {Promise<string>} A JWT token representing the newly created user.
     * @throws {UserAlreadyExistsError} Thrown when attempting to register a user with an existing username or email.
     * @throws {BadRequestError} Thrown by UserEntity when the credentials fail basic validation, such as password length.
     */
    async create(credentials: UserCredentialsDTO): Promise<string> {
        // Creates a new user entity, which applies basic validation checks on the credentials, such as username length.
        const user: UserEntity = new UserEntity(credentials);

        // Checks if the username or email already exists in the database.
        const isUsernameUnique: boolean = (await this.userRepository.getUserByUsername(credentials.username)) == null;
        const isEmailUnique: boolean = (await this.userRepository.getUserByEmail(credentials.email)) == null;

        if (!isUsernameUnique || !isEmailUnique) {
            throw new UserUniqueViolationError(isUsernameUnique, isEmailUnique, 'UserUniqueViolationError');
        }

        // Hashes the user's password with bcrypt.
        const bcryptPassword: string = this.bcryptService.hashSync(user.getPassword());

        // Inserts the user into the database. That user is then returned back.
        const createdUser: UserIdentificationDTO = await this.userRepository.insertUser({
            username: user.getUsername(),
            email: user.getEmail(),
            password: bcryptPassword,
        });

        /* 
        Signs and returns a signed JWT token with an expiration date. 
        Used for immediate authorization after a user is created.
        */
        const jwtToken: string = this.jwtTokenService.sign(createdUser);
        return jwtToken;
    }
}
