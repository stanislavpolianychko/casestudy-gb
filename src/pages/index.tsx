import { Box } from '@mui/material';
import AppSurface from '@/components/AppSurface';
import Header from '@/components/Header';
import TaskList from '@/components/TaskList';
import Task from '@/dto/task';
import { useEffect, useState } from 'react';
import axios from 'axios';
import User from '@/dto/user';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async (userId: number) => {
    const response = await axios.get<Task[]>(
      `https://669798f302f3150fb66e44ba.mockapi.io/api/v1/users/${userId}/tasks`,
    );
    setTasks(response.data);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.id) {
      fetchTasks(user.id);
    } else {
      window.location.href = '/login';
    }
  }, []);

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
          <p>created by @staspolianychko</p>
        </Box>
      </AppSurface>
    </Box>
  );
}
