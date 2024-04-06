import { User, UserJwt } from "@app/shared";
import { NewUserDTO } from "../dtos/new-user.dto";
import { ExistingUserDTO } from "../dtos/existing-user.dto";

export interface AuthServiceInterface {
  findByEmail(existingUser: Readonly<ExistingUserDTO>): Promise<void>;
  hashPassword(password: string): Promise<string>;
  validateUser(email: string, password: string): Promise<User>;
  register(newUser: Readonly<NewUserDTO>): Promise<User>;
  login(existingUser: Readonly<ExistingUserDTO>): Promise<{
    token: string;
    user: User;
  }>;
  verifyJwt(jwt: string): Promise<{ user: User; exp: number }>;
  getUserFromHeader(jwt: string): Promise<UserJwt>;
}
