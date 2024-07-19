import PaginationNavbar from '@/components/paggination/PagginationNavBar';
import CreateTaskButton from '@/components/CreateTaskButton';
import TasksService from '@/services/tasksService';
import TagsSelect from '@/components/TagsSelect';
import TaskList from '@/components/TaskList';
import Paths from '@/enums/paths';
import AppConfig from '@/config';
import Tags from '@/enums/tags';
import Task from '@/dto/task';
import User from '@/dto/user';
import { Box, Grid } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

const styles = {
  grid: {
    flexGrow: 1,
    overflow: 'auto',
    margin: '0 20px',
  },
  box: {
    margin: '1rem 0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagsSelect: {
    width: { xs: '90%', md: '50%' },
  },
};

/**
 * Home page component.
 * This component fetches and displays tasks, handles pagination and task updates.
 * It also manages the selected tag and current user state.
 */
function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState<string>(Tags.None);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Fetch tasks from the API and update the tasks state.
  const fetchTasks = useCallback(
    async (page: number, tag: string, userId: string) => {
      try {
        const fetchedTasks = await TasksService.getTasks(page, tag, userId);
        if (fetchedTasks) {
          setTasks(fetchedTasks);
        } else if (page > 1) {
          setPage(page - 1);
        }
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        setTasks([]);
        console.error('Failed to fetch tasks:', error);
      }
    },
    [],
  );

  useEffect(() => {
    if (!currentUser) {
      getUserFromLocalStorage();
    }
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    } else {
      window.location.href = Paths.Login;
    }
    if (currentUser && currentUser.id) {
      fetchTasks(page, selectedTag, currentUser.id).then(() => {
        console.log('Tasks updated');
      });
    } else {
      window.location.href = Paths.Login;
    }
  }, [selectedTag, page, currentUser, fetchTasks]);

  const getUserFromLocalStorage = () => {
    const user = localStorage.getItem(AppConfig.userLocalStorageKey);
    if (user) {
      setCurrentUser(JSON.parse(user));
    } else {
      window.location.href = Paths.Login;
    }
  };

  // force tasks list update from the API
  const handleTasksUpdate = useCallback(() => {
    if (currentUser && currentUser.id) {
      fetchTasks(1, selectedTag, currentUser.id).then(() => {
        console.log('Tasks updated');
      });
    }
  }, [selectedTag, currentUser, fetchTasks]);

  // Update the selectedTag state when the tag is changed.
  const handleTagChange = useCallback(
    (tag: string) => {
      setSelectedTag(tag);
    },
    [currentUser, fetchTasks],
  );

  // Increment the page state to go to the next page of tasks.
  const nextPage = () => {
    setPage(page + 1);
  };

  // Decrement the page state to go to the previous page of tasks.
  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <Grid item container direction="column" style={styles.grid}>
      <Box sx={styles.box}>
        <TagsSelect
          disabled={false}
          selectedTag={selectedTag}
          onTagChange={handleTagChange}
          sx={styles.tagsSelect}
        />
        <CreateTaskButton onCreate={handleTasksUpdate} />
      </Box>
      <TaskList onTaskUpdate={handleTasksUpdate} tasks={tasks} />
      <PaginationNavbar
        page={page}
        hasNextPage={tasks.length > 0}
        onPreviousPage={previousPage}
        onNextPage={nextPage}
      />
    </Grid>
  );
}

export default Home;
