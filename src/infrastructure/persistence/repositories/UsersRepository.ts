/* eslint-disable @typescript-eslint/no-explicit-any */
import DatabaseConnection from '../DatabaseConnection';
import IUserRepository from '../../../domain/repositories/IUsersRepository';
import UserIdentificationDTO from '../../../presentation/data-transfer-objects/users/UserIdentificationDTO';
import UserCredentialsDTO from '../../../presentation/data-transfer-objects/users/UserCredentialsDTO';
import UserEntity from '../../../domain/value-objects/users/UserEntity';

export default class UsersRepository implements IUserRepository {
    private db: DatabaseConnection;

    constructor() {
        this.db = new DatabaseConnection();
    }

    async getUsersLikeUsername(username: string): Promise<UserIdentificationDTO[]> {
        const users = await this.db.query(`SELECT * FROM users WHERE username ILIKE $1 LIMIT 10`, [`${username}%`]);
        const usersDTO: UserIdentificationDTO[] = users.map((user: any) =>
            Object.freeze({
                userId: user.user_id,
                username: user.username,
                email: user.email,
            }),
        );
        return usersDTO;
    }

    async updateUserPassword(userId: number, password: string): Promise<void> {
        await this.db.query(`UPDATE users SET password = $1 WHERE user_id = $2;`, [password, userId]);
    }

    async getUserByUsernameOrEmail(usernameOrEmail: string): Promise<UserEntity | null> {
        const user = await this.db.query(
            `SELECT username, email, password 
            FROM users 
            WHERE username = $1 OR email = $1 LIMIT 1`,
            [usernameOrEmail],
        );
        if (user.length === 0) {
            return null;
        }

        return new UserEntity({
            userId: user[0].user_id,
            username: user[0].username,
            email: user[0].email,
            password: user[0].password,
        });
    }

    async getUserByEmail(email: string): Promise<UserIdentificationDTO | null> {
        const user = await this.db.query(`SELECT * FROM users WHERE email = $1 LIMIT 1`, [email]);
        if (user.length === 0) {
            return null;
        }
        return Object.freeze({
            userId: user[0].user_id,
            username: user[0].username,
            email: user[0].email,
        });
    }

    async getUserByUsername(username: string): Promise<UserIdentificationDTO | null> {
        const user = await this.db.query(`SELECT * FROM users WHERE username = $1 LIMIT 1`, [username]);
        if (user.length === 0) {
            return null;
        }

        return Object.freeze({
            userId: user[0].user_id,
            username: user[0].username,
            email: user[0].email,
        });
    }

    async insertUser(userCredentials: UserCredentialsDTO): Promise<UserIdentificationDTO> {
        const user = await this.db.query(
            `INSERT INTO users (username, email, password) 
                VALUES ($1, $2, $3)
                RETURNING user_id, username, email`,
            [userCredentials.username, userCredentials.email, userCredentials.password],
        );
        return Object.freeze({
            userId: user.user_id,
            username: user.username,
            email: user.email,
        });
    }
}
