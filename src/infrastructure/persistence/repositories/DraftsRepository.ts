import DatabaseConnection from "../DatabaseConnection";

export default class UsersRepository {
    private db: DatabaseConnection;

    constructor() {
        this.db = new DatabaseConnection();
    }

    async insertMockDraft(): Promise<number> {
        const draftId: number = await this.db.query(`SELECT username FROM users WHERE username ILIKE $1 LIMIT 10`, [`${username}%`]);
    }
}
