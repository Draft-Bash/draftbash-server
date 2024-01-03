import IJWTtokenService from '../../../contracts/services/authentication/IJWTtokenService';
import UserUniqueViolationError from '../../../../domain/exceptions/users/UserUniqueViolationError';
import IUsersRepository from '../../../contracts/repositories/IUsersRepository';
import UserCredentials from '../../../contracts/data-transfer-objects/users/UserCredentials';
import IbcryptService from '../../../contracts/services/authentication/IbcryptService';
import UserEntity from '../../../../domain/entities/UserEntity';
import ICreateUsersUseCase from '../../../contracts/use-cases/ICreateUsersUseCase';

export default class CreateUsersUseCase implements ICreateUsersUseCase {
    private readonly userRepository: IUsersRepository;

    private readonly jwtTokenService: IJWTtokenService;

    private readonly bcryptService: IbcryptService;

    constructor(
        userRepository: IUsersRepository,
        jwtTokenHandler: IJWTtokenService,
        passwordHandler: IbcryptService,
    ) {
        this.userRepository = userRepository;
        this.jwtTokenService = jwtTokenHandler;
        this.bcryptService = passwordHandler;
    }

    /**
     * Creates a user and returns a JWT authorization token
     * @throws {UserUniqueViolationError} If the username or email is not unique.
     */
    async create(credentials: UserCredentials): Promise<string> {
        const user: UserEntity = new UserEntity(credentials);

        const isUsernameUnique = await this.userRepository.getUserByUsername(credentials.username) == null;
        const isEmailUnique = await this.userRepository.getUserByEmail(credentials.email) == null;

        if (!isUsernameUnique || !isEmailUnique) {
            throw new UserUniqueViolationError(
                isUsernameUnique,
                isEmailUnique,
                'UserUniqueViolationError',
            );
        }

        // Hashes the user's password with bcrypt
        const bcryptPassword = this.bcryptService.hashSync(user.getPassword());

        // Inserts the user into the database. That user is then returned back.
        const createdUser = await this.userRepository.insertUser({
            username: user.getUsername(),
            email: user.getEmail(),
            password: bcryptPassword,
        });

        /* Returns a signed JWT token with an expiration date. 
        Used for immediate authorization after a user is created.
        */
        const jwtToken: string = this.jwtTokenService.sign(
            {
                userId: createdUser.userId,
                username: createdUser.username,
                email: createdUser.email,
            },
            { expiresIn: '2hr' },
        );

        return jwtToken;
    }
}
