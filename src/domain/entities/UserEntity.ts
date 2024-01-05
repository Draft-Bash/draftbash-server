import { z, ZodError } from 'zod';
import BadRequestError from '../exceptions/BadRequestError';

const UserEntitySchema = z.object({
    userId: z.number().optional(),
    username: z
        .string()
        .min(3, 'Username must be at least 3 characters long.')
        .max(15, 'Username must be at most 15 characters long.'),
    email: z.string().email('Invalid email.'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long.')
        .refine((value) => /[A-Z]/.test(value), {
            message: 'Password must contain at least one capital letter.',
        })
        .refine((value) => /[0-9]/.test(value), {
            message: 'Password must contain at least one number.',
        }),
});

type UserEntityProps = z.infer<typeof UserEntitySchema>;

export default class UserEntity {
    private readonly userId: number | null;

    private readonly username: string;

    private readonly email: string;

    private readonly password: string;

    constructor(data: UserEntityProps) {
        try {
            const validatedData = UserEntitySchema.parse(data);
            this.userId = validatedData.userId ?? null;
            this.username = validatedData.username;
            this.email = validatedData.email;
            this.password = validatedData.password;
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessage = `Validation failed: ${error.errors
                    .map((err) => err.message)
                    .join(', ')}`;
                throw new BadRequestError(errorMessage);
            } else {
                throw error;
            }
        }
    }

    getUserId(): number | null {
        return this.userId;
    }

    getUsername(): string {
        return this.username;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }
}
