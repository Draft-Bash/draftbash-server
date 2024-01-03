import UserIdentificationDTO from "../../../interfaces/data-transfer-objects/users/UserIdentificationDTO";

export default class UserNotFoundByUsernameError extends Error {
    private readonly similarUsernameUsers: UserIdentificationDTO[];

    constructor(similarUsernameUsers: UserIdentificationDTO[], message?: string) {
        super(message);
        this.name = 'UserNotFoundByUsernameError';
        this.similarUsernameUsers = similarUsernameUsers;

        Object.setPrototypeOf(this, new.target.prototype);
    }

    public getSimilarUsernameUsers(): UserIdentificationDTO[] {
        return this.similarUsernameUsers;
    }
}
