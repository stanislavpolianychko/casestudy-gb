import Task from '@/dto/task';
import ApiClient from '@/api';
import AppConfig from '@/config';

abstract class TasksService {
  public static async getTasks(
    page: number,
    tag?: string,
    userId?: number,
  ): Promise<Task[] | null> {
    if (!userId) {
      return null;
    }

    const params: { [key: string]: string | number } = {
      limit: AppConfig.taskSortingOrder,
      page: page,
      sortBy: AppConfig.sortTasksBy,
      order: AppConfig.taskSortingOrder,
    };

    if (tag) {
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
  public static async updateTask(task?: Task): Promise<void> {
    if (!task) {
      return;
    }
    try {
      await ApiClient.put(`users/${task.userId}/tasks/${task.id}`, task);
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
      return await ApiClient.post(`users/${userId}/tasks`, task);
    } catch (error) {
      console.error('Failed to create task:', error);
      throw error;
    }
  }
}

export default TasksService;
