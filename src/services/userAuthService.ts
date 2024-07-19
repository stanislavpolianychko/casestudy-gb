import User from '@/dto/user';
import ApiClient from '@/api';

/**
 * UserAuthService is a service class that provides methods for user authentication.
 */
abstract class UserAuthService {
  /**
   * Fetches a user by their nickname.
   * @param nickname - The nickname of the user.
   * @returns The user object if found, null otherwise.
   */
  private static async getUserByNickname(
    nickname: string,
  ): Promise<User | null> {
    try {
      const users = await ApiClient.get<User[]>(`/users?nickname=${nickname}`);
      if (users?.length === 0) {
        return null;
      }
      return users[0];
    } catch (error) {
      console.log(`User not found: ${error}`);
      return null;
    }
  }

  /**
   * Creates a new user with the given nickname.
   * @param nickname - The nickname of the user to be created.
   * @returns The created user object if successful, null otherwise.
   */
  private static async createUser(nickname: string): Promise<User | null> {
    try {
      return ApiClient.post<User>('/users', { nickname });
    } catch (error) {
      console.log(`Error creating user: ${error}`);
      return null;
    }
  }

  /**
   * Logs in a user with the given nickname. If the user does not exist, a new user is created.
   * @param nickname - The nickname of the user to log in.
   * @returns The logged in user object if successful, null otherwise.
   */
  public static async login(nickname: string): Promise<User | null> {
    let user = await this.getUserByNickname(nickname);
    if (!user) {
      user = await this.createUser(nickname);
    }
    return user;
  }
}

export default UserAuthService;
