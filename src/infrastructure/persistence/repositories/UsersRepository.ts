/* eslint-disable @typescript-eslint/no-explicit-any */
import DatabaseConnection from '../DatabaseConnection';
import IUserRepository from '../../../interfaces/repositories/IUsersRepository';
import UserIdentificationDTO from '../../../interfaces/data-transfer-objects/users/UserIdentificationDTO';
import UserCredentialsDTO from '../../../interfaces/data-transfer-objects/users/UserCredentialsDTO';

export default class UsersRepository implements IUserRepository {
    private db: DatabaseConnection;

    constructor() {
        this.db = new DatabaseConnection();
    }

    async getUsersLikeUsername(username: string): Promise<UserIdentificationDTO[]> {
        const users = await this.db.query(`SELECT * FROM users WHERE username ILIKE $1 LIMIT 10`, [
            `${username}%`,
        ]);
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
        await this.db.query(
            `UPDATE users SET password = $1 WHERE user_id = $2;`,
            [password, userId],
        );
    }

    async getUserByUsernameOrEmail(
        username: string,
        email: string,
    ): Promise<UserIdentificationDTO | null> {
        const user = await this.db.query(
            `SELECT username, email, password 
            FROM users 
            WHERE username = $1 OR email = $2 LIMIT 1`,
            [username, email],
        );
        if (user.length === 0) {
            return null;
        }
        return Object.freeze({
            userId: user[0].user_id,
            username: user[0].username,
            email: user[0].email,
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
