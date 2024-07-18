import { Box, Button, Grid, Paper } from '@mui/material';
import TaskList from '@/components/TaskList';
import Task from '@/dto/task';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CreateTaskButton from '@/components/CreateTaskButton';
import PaginationNavbar from '@/components/PagginationNavBar';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(undefined);

  const fetchTasks = async (userId: number, page: number) => {
    const response = await axios.get<Task[]>(
      `https://669798f302f3150fb66e44ba.mockapi.io/api/v1/users/${userId}/tasks?limit=10&page=${page}`,
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
      setUser(user);
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
    <>
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        style={{ flexGrow: 1 }}
        sx={{
          width: {
            xs: '99%',
            sm: '80%', // 80% screen width on desktop
          },
          mx: 'auto', // center the grid
        }}
      >
        <Paper elevation={0} style={{ padding: '1rem', width: '100%' }}>
          <CreateTaskButton />
          <TaskList tasks={tasks} />
          <PaginationNavbar
            page={page}
            hasNextPage={tasks.length > 0}
            onPreviousPage={previousPage}
            onNextPage={nextPage}
          />
        </Paper>
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </>
  );
}
