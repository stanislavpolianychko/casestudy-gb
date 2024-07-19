import Task from '@/dto/task';
import ApiClient from '@/api';

const pageItemsLimit = 9;
const sortBy = 'priority';
const sortingOrder = 'desc';

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
      limit: pageItemsLimit,
      page: page,
      sortBy: sortBy,
      order: sortingOrder,
    };

    if (tag) {
      params['tag'] = tag;
    }

    try {
      const response = await ApiClient.get<Task[]>(
        `users/${userId}/tasks`,
        params,
      );
      if (response.length === 0 && page > 1) {
        return null;
      }
      return response;
    } catch (error) {
      console.log(`Failed to fetch tasks: ${error}`);
      return null;
    }
  }
}

export default TasksService;
