import axios from 'axios';
import Config from '@/config';

/**
 * ApiClient class for making HTTP requests
 */
class ApiClient {
  private static apiClient = axios.create();

  /**
   * GET request
   * @param {string} path - The path of the request
   * @param {any} params - The parameters of the request
   * @returns {Promise<T>} - The response data
   */
  static async get<T>(path: string, params?: any): Promise<T> {
    const response = await this.apiClient.get<T>(Config.apiBaseUrl + path, {
      params,
    });
    return response.data;
  }

  /**
   * POST request
   * @param {string} path - The path of the request
   * @param {any} data - The data to be sent with the request
   * @returns {Promise<T>} - The response data
   */
  static async post<T>(path: string, data?: any): Promise<T> {
    const response = await this.apiClient.post<T>(
      Config.apiBaseUrl + path,
      data,
    );
    return response.data;
  }

  /**
   * PUT request
   * @param {string} path - The path of the request
   * @param {any} data - The data to be sent with the request
   * @returns {Promise<T>} - The response data
   */
  static async put<T>(path: string, data?: any): Promise<T> {
    const response = await this.apiClient.put<T>(
      Config.apiBaseUrl + path,
      data,
    );
    return response.data;
  }

  /**
   * DELETE request
   * @param {string} path - The path of the request
   * @returns {Promise<T>} - The response data
   */
  static async delete<T>(path: string): Promise<T> {
    const response = await this.apiClient.delete<T>(Config.apiBaseUrl + path);
    return response.data;
  }
}

export default ApiClient;
