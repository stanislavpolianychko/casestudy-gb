abstract class AppConfig {
  public static apiBaseUrl: string | undefined;
  public static userLocalStorageKey: string = 'user';
  public static themeLocalStorageKey: string = 'theme';
  public static tasksPageItemsLimit: number = 9;
  public static sortTasksBy: string = 'priority';
  public static taskSortingOrder: string = 'desc';
  public static maxNicknameLength: number = 5;
  public static taskPriorityMax: number = 10;
  public static taskPriorityMin: number = 1;
  public static taskPriorityStep: number = 1;
  /**
   * Loads the configuration values from the environment variables.
   * If a required environment variable is not set, it logs an error message and exits the process.
   */
  public static load(): void {
    const apiBaseUrl: string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      console.error('NEXT_PUBLIC_API_BASE_URL is not set in your .env file.');
      process.exit(1);
    }
    this.apiBaseUrl = apiBaseUrl;
  }
}

export default AppConfig;
