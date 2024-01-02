export default interface IbcryptService {
    hashSync(password: string): string;
    compareSync(password: string, hashedPassword: string): boolean;
}
