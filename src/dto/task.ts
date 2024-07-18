interface Task {
  isComplete: boolean;
  name: string;
  description: string;
  tag: string;
  id: string;
  userId: string;
  priority: number;
}

export default Task;
