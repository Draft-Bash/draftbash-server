/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

interface IDatabaseConnection {
    query(sql: string, params?: unknown[]): Promise<any>;
}

export default class DatabaseConnection implements IDatabaseConnection {
    private client: Pool;

    constructor() {
        const connectionString = process.env.DATABASE_URL;
        this.client = new Pool({ connectionString });
    }

    async query(sql: string, params?: unknown[]): Promise<any> {
        const result = await this.client.query(sql, params);
        return result.rows;
    }
}
