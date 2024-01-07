import UserCredentials from "./UserCredentials";

export default class User {
  private userId: number;

  private credentials: UserCredentials;

  constructor(userId: number, credentials: UserCredentials) {
    this.userId = userId;
    this.credentials = credentials;
  }
}