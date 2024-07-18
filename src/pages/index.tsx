import { Box, Button, Grid, Paper } from '@mui/material';
import TaskList from '@/components/TaskList';
import Task from '@/dto/task';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskDetailView from '@/components/TaskDetailView';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [openCreate, setOpenCreate] = useState(false); // Add this line
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

  const handleCreateOpen = () => {
    // Add this function
    setOpenCreate(true);
  };

  const handleCreateClose = () => {
    // Add this function
    setOpenCreate(false);
  };

  return (
    <Grid container direction="column" style={{ minHeight: '100vh' }}>
      <Grid item>
        <Header userInfo={user} />
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        style={{ flexGrow: 1 }}
      >
        <Paper elevation={0} style={{ padding: '2rem' }}>
          <Button onClick={handleCreateOpen}>Create</Button>
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
          </Box>
          <TaskDetailView
            task={{
              isComplete: false,
              name: '',
              description: '',
              tags: '',
              dueDate: 0,
              id: '',
              userId: '',
            }}
            open={openCreate}
            onClose={handleCreateClose}
          />
        </Paper>
      </Grid>
      <Grid item>
        <Footer />
      </Grid>
    </Grid>
  );
}
