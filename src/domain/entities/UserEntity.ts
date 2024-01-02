import { z, ZodError } from 'zod';

const UserEntitySchema = z.object({
    userId: z.string().optional(),
    username: z
        .string()
        .min(3, 'Username must be at least 3 characters long.')
        .max(15, 'Username must be at most 15 characters long.'),
    email: z.string().email('Invalid email.'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long.')
        .max(30, 'Password must be at most 30 characters long.')
        .refine((value) => /[A-Z]/.test(value), {
            message: 'Password must contain at least one capital letter.',
        })
        .refine((value) => /[0-9]/.test(value), {
            message: 'Password must contain at least one number.',
        }),
});

type UserEntityProps = z.infer<typeof UserEntitySchema>;

export default class UserEntity {
    private readonly userId: string | null;

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
                throw new Error(errorMessage);
            } else {
                throw error;
            }
        }
    }

    getUserId(): string | null {
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
