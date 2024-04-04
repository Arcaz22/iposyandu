export interface UserRequest extends Request {
  user?: {
    id: string;
    name: string;
    username: string;
    phone: string;
    email: string;
  }
}
