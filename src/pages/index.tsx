import { Box, Button } from '@mui/material';
import AppSurface from '@/components/AppSurface';
import Header from '@/components/Header';
import TaskList from '@/components/TaskList';
import Task from '@/dto/task';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1); // Add this line

  const fetchTasks = async (userId: number, page: number) => {
    const response = await axios.get<Task[]>(
      `https://669798f302f3150fb66e44ba.mockapi.io/api/v1/users/${userId}/tasks?limit=10&page=${page}`, // Use page parameter
    );
    if (response.data.length === 0) {
      setPage(page - 1);
      return;
    }
    setTasks(response.data);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.id) {
      fetchTasks(user.id, page);
    } else {
      window.location.href = '/login';
    }
  }, [page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background:
          'linear-gradient(45deg, rgba(173, 216, 230, 0.8), rgba(255, 235, 205, 0.8), rgba(173, 216, 230, 0.8))',
      }}
    >
      <AppSurface>
        <Header title={'My app'}></Header>
        <TaskList tasks={tasks} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Button onClick={previousPage}>Previous</Button>
          <Button onClick={nextPage}>Next</Button>
          <p>created by @staspolianychko</p>
        </Box>
      </AppSurface>
    </Box>
  );
}
