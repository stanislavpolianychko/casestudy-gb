import { Grid } from '@mui/material';
import TaskList from '@/components/TaskList';
import Task from '@/dto/task';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CreateTaskButton from '@/components/CreateTaskButton';
import PaginationNavbar from '@/components/PagginationNavBar';
import User from '@/dto/user';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const fetchTasks = async (
    userId: string,
    page: number,
    tag: string | null,
  ) => {
    let url = `https://669798f302f3150fb66e44ba.mockapi.io/api/v1/users/${userId}/tasks?limit=9&page=${page}&sortBy=priority&order=desc`;
    if (tag) {
      url += `&tag=${tag}`;
    }
    console.log('url', url);
    try {
      const response = await axios.get(url);
      if (response.status == 200) {
        if (response.data.length === 0 && page > 1) {
          setPage(page - 1);
          return;
        }
        setTasks(response.data);
      } else {
        setTasks([]);
      }
    } catch (error) {
      setTasks([]);
      console.error('Failed to fetch tasks:', error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setCurrentUser(user);
    if (user && user.id) {
      console.log('user', selectedTag);
      fetchTasks(user.id, page, selectedTag);
    } else {
      window.location.href = '/login';
    }
  }, [selectedTag, page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <Grid
      item
      container
      direction="column"
      style={{ flexGrow: 1, overflow: 'auto', margin: '0 20px' }}
    >
      <CreateTaskButton
        onTagChange={(tag) => fetchTasks(currentUser!.id, 1, tag)}
        onCreate={() => fetchTasks(currentUser!.id, 1, selectedTag)}
      />
      <TaskList
        onTaskUpdate={() => fetchTasks(currentUser!.id, 1, selectedTag)}
        tasks={tasks}
      />
      <PaginationNavbar
        page={page}
        hasNextPage={tasks.length > 0}
        onPreviousPage={previousPage}
        onNextPage={nextPage}
      />
    </Grid>
  );
}
