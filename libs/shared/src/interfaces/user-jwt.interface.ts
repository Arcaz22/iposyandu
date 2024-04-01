import { UserRequest } from "./user-request";

export interface UserJwt extends UserRequest {
  iat: number;
  exp: number;
}
