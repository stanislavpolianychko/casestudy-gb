import axios from 'axios';
import Config from '@/config';

class ApiClient {
  private static apiClient = axios.create();

  static async get<T>(path: string, params?: any): Promise<T> {
    const response = await this.apiClient.get<T>(Config.apiBaseUrl + path, {
      params,
    });
    return response.data;
  }

  static async post<T>(path: string, data?: any): Promise<T> {
    const response = await this.apiClient.post<T>(
      Config.apiBaseUrl + path,
      data,
    );
    return response.data;
  }

  static async put<T>(path: string, data?: any): Promise<T> {
    const response = await this.apiClient.put<T>(
      Config.apiBaseUrl + path,
      data,
    );
    return response.data;
  }

  static async delete<T>(path: string): Promise<T> {
    const response = await this.apiClient.delete<T>(Config.apiBaseUrl + path);
    return response.data;
  }
}

export default ApiClient;
