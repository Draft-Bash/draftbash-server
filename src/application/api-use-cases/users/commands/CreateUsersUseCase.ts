import { IJWTtokenService } from '../../../../infrastructure/services/authentication/interfaces/IJWTtokenService';
import { ICreateUsersUseCase } from '../../../contracts/use-cases/ICreateUsersUseCase';
import { UserUniqueViolationError } from '../../../../domain/exceptions/users/UserUniqueViolationError';
import { IUserRepository } from '../../../../domain/repositories/IUsersRepository';
import { UserCredentialsDTO } from '../../../contracts/data-transfer-objects/users/UserCredentialsDTO';
import { IbcryptService } from '../../../../infrastructure/services/authentication/interfaces/IbcryptService';
import UserEntity from '../../../../domain/entities/UserEntity';

export default class CreateUsersUseCase implements ICreateUsersUseCase {
    private readonly userRepository: IUserRepository;

    private readonly jwtTokenService: IJWTtokenService;

    private readonly bcryptService: IbcryptService;

    constructor(
        userRepository: IUserRepository,
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
    async execute(credentials: UserCredentialsDTO): Promise<string> {
        const user: UserEntity = new UserEntity(credentials);

        const isUsernameUnique =
            (await this.userRepository.getUsersByUsername(credentials.username)).length === 0;
        const isEmailUnique =
            (await this.userRepository.getUsersByEmail(credentials.email)).length === 0;

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
