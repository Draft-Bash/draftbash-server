import UserEntity from '../../../../domain/entities/UserEntity';
import InvalidUserCredentialsError from '../../../../domain/exceptions/users/InvalidUserCredentialsError';
import IUsersRepository from '../../../../interfaces/repositories/IUsersRepository';
import IJWTtokenService from '../../../../interfaces/services/authentication/IJWTtokenService';
import IbcryptService from '../../../../interfaces/services/authentication/IbcryptService';
import ILoginUsersUseCase from '../../../../interfaces/use-cases/users/ILoginUsersUseCase';


// Handles user login business logic.
export default class LoginUsersUseCase implements ILoginUsersUseCase {
    private readonly usersRepository: IUsersRepository;

    private readonly jwtTokenService: IJWTtokenService;

    private readonly bcryptService: IbcryptService;

    /**
     * Constructor for the CreateUsersUseCase.
     * @param {IUsersRepository} userRepository - Central class containing all database methods for the users table.
     * @param {IJWTtokenService} jwtTokenService - Class containing methods for signing and verifying JWT tokens.
     * @param {IbcryptService} bcryptService - Class containing methods for hashing and comparing passwords.
     */
    constructor(usersRepository: IUsersRepository, jwtTokenService: IJWTtokenService, bcryptService: IbcryptService) {
        this.usersRepository = usersRepository;
        this.jwtTokenService = jwtTokenService;
        this.bcryptService = bcryptService;
    }

    /**
     * Method to handle user login and generate a JWT token upon successful authentication.
     * @async
     * @param {string} usernameOrEmail - The username or email provided during login.
     * @param {string} password - The password provided during login.
     * @return {Promise<string>} A Promise that resolves to the generated JWT token.
     * @throws {InvalidUserCredentialsError} Thrown when the provided credentials are invalid.
     */
    public async loginUser(usernameOrEmail: string, password: string): Promise<string> {
        const user: UserEntity | null = await this.usersRepository.getUserByUsernameOrEmail(usernameOrEmail);

        if (user === null) {
            throw new InvalidUserCredentialsError('InvalidUserCredentialsError');
        }

        // Compares the provided password with the hashed password stored in the database.
        const isPasswordCorrect: boolean = this.bcryptService.compareSync(password, user.getPassword());

        if (!isPasswordCorrect) {
            throw new InvalidUserCredentialsError('InvalidUserCredentialsError');
        }

        // Generate a JWT authorization token for the authenticated user.
        const jwtToken: string = this.jwtTokenService.sign({
            userId: user.getUserId() as unknown as number,
            username: user.getUsername(),
            email: user.getEmail(),
        });

        // Return the generated JWT token.
        return jwtToken;
    }
}