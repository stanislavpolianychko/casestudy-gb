abstract class AppConfig {
  public static apiBaseUrl: string | undefined;

  /**
   * Loads the configuration values from the environment variables.
   * If a required environment variable is not set, it logs an error message and exits the process.
   */
  public static load(): void {
    // Load the person base API URL from the environment variable
    const apiBaseUrl: string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      console.error('Person base API URL is not set');
      process.exit(1);
    }
    this.apiBaseUrl = apiBaseUrl;
  }
}

export default AppConfig;
