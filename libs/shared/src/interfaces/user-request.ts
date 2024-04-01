export interface UserRequest extends Request {
  user?: {
    id: string;
    name: string;
    username: string;
    phone: number;
    email: string;
  }
}
