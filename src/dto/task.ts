interface Task {
  isComplete: boolean;
  name: string;
  description: string;
  tags: string;
  dueDate: number;
  id: string;
  userId: string;
}

export default Task;
