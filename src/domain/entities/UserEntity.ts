import UserCredentials from "../value-objects/users/UserCredentials";

export default class User {
  private userId: number;

  private credentials: UserCredentials;

  constructor(userId: number, credentials: UserCredentials) {
    this.userId = userId;
    this.credentials = credentials;
  }

  getUserId(): number {
    return this.userId;
  }

  getUsername(): string {
    return this.credentials.getUsername();
  }

  getEmail(): string {
    return this.credentials.getEmail();
  }

  getPassword(): string {
    return this.credentials.getPassword();
  }
}