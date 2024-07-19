import Task from '@/dto/task';
import ApiClient from '@/api';
import AppConfig from '@/config';
import Tags from '@/enums/tags';

/**
 * TasksService is a service class for managing tasks.
 * @class
 */
abstract class TasksService {
  /**
   * Fetches tasks from the API.
   * @param {number} page - The page number.
   * @param {string} [tag] - The tag to filter tasks by.
   * @param {number} [userId] - The user ID to fetch tasks for.
   * @returns {Promise<Task[] | null>} - A promise that resolves to an array of tasks or null.
   */
  public static async getTasks(
    page: number,
    tag?: string,
    userId?: string,
  ): Promise<Task[] | null> {
    if (!userId) {
      return null;
    }

    const params: { [key: string]: string | number } = {
      limit: AppConfig.tasksPageItemsLimit,
      page: page,
      sortBy: AppConfig.sortTasksBy,
      order: AppConfig.taskSortingOrder,
    };

    if (tag && tag !== Tags.None) {
      params['tag'] = tag;
    }

    try {
      const response = await ApiClient.get<Task[]>(
        `users/${userId}/tasks`,
        params,
      );
      if (response.length === 0) {
        return null;
      }
      return response;
    } catch (error) {
      console.log(`Failed to fetch tasks: ${error}`);
      return null;
    }
  }

  /**
   * Updates a task.
   * @param task - The task to update.
   * @returns A promise that resolves when the task has been updated.
   */
  public static async updateTask(task?: Partial<Task>): Promise<void> {
    if (!task) {
      return;
    }
    try {
      await ApiClient.put(`/users/${task.userId}/tasks/${task.id}`, task);
    } catch (error) {
      console.error(`Failed to update task: ${error}`);
    }
  }

  /**
   * Updates the isComplete property of a task.
   * @param task - The task to update.
   * @returns A promise that resolves when the task has been updated.
   */
  public static async updateTaskIsComplete(task: Task): Promise<void> {
    try {
      task.isComplete = !task.isComplete;
      await this.updateTask(task);
    } catch (error) {
      console.error(`Failed to update task: ${error}`);
    }
  }

  /**
   * Deletes a task.
   * @param task - The task to delete.
   * @returns A promise that resolves when the task has been deleted.
   */
  public static async deleteTask(task: Task): Promise<void> {
    try {
      await ApiClient.delete(`users/${task.userId}/tasks/${task.id}`);
    } catch (error) {
      console.error(`Failed to delete task: ${error}`);
      throw error;
    }
  }

  /**
   * Creates a new task.
   * @param task - The task to create.
   * @param userId - The ID of the user to create the task for.
   * @returns A promise that resolves when the task has been created.
   */
  public static async createTask(
    task: Partial<Task>,
    userId: string,
  ): Promise<Task> {
    try {
      console.log('Creating task:', task);
      return await ApiClient.post(`users/${userId}/tasks`, task);
    } catch (error) {
      console.error('Failed to create task:', error);
      throw error;
    }
  }
}

export default TasksService;
