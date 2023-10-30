export interface AuthenticationService {
  login(username: string, password: string): Promise<string>;
  logout(token: string): Promise<void>;
}