import { User, UserJwt } from "@app/shared";
import { NewUserDTO } from "../dtos/new-user.dto";
import { ExistingUserDTO } from "../dtos/existing-user.dto";

export interface AuthServiceInterface {
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
  hashPassword(password: string): Promise<string>;
  register(newUser: Readonly<NewUserDTO>): Promise<User>;
  doesPasswordMatch(password: string, hashedPassword: string): Promise<boolean>;
  validateUser(email: string, password: string): Promise<User>;
  login(existingUser: Readonly<ExistingUserDTO>): Promise<{
    token: string;
    user: User;
  }>;
  verifyJwt(jwt: string): Promise<{ user: User; exp: number }>;
  getUserFromHeader(jwt: string): Promise<UserJwt>;
}
