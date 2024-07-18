import React, { useState } from 'react';
import Task from '@/dto/task';
import axios from 'axios';
import CustomCheckbox from '@/components/CompleteTaskButton';
import TaskModalView from '@/components/TaskModalView';

interface TaskListItemProps {
  task: Task;
  onUpdate: () => void;
}

const TaskListItem: React.FC<TaskListItemProps> = ({ task, onUpdate }) => {
  const [isCompleted, setIsCompleted] = useState(task.isComplete);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'readonly' | 'edit'>('readonly');

  const handleOpen = (mode: 'readonly' | 'edit') => {
    setMode(mode);
    setOpen(true);
  };

  const handleEdit = async (updatedTask: Partial<Task>) => {
    try {
      const response = await axios.put(
        `https://669798f302f3150fb66e44ba.mockapi.io/api/v1/users/${task.userId}/tasks/${task.id}`,
        updatedTask,
      );
      console.log('Task updated successfully:', response.data);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
    onUpdate();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckboxChange = async (newIsCompleted: boolean) => {
    task.isComplete = newIsCompleted;
    await axios.put(
      `https://669798f302f3150fb66e44ba.mockapi.io/api/v1/users/${task.userId}/tasks/${task.id}`,
      task,
    );
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://669798f302f3150fb66e44ba.mockapi.io/api/v1/users/${task.userId}/tasks/${task.id}`,
      );

      if (response.status === 404) {
        console.log('Task not found, unable to delete');
      } else {
        console.log('Task deleted successfully');
      }
      onUpdate();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        marginBottom: '10px',
        // backgroundColor: 'rgba(224, 224, 224, 0.35)', // #E0E0E0 with 35% transparency
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <CustomCheckbox
          initialChecked={isCompleted}
          onCheckedChange={handleCheckboxChange}
        />
        {task.name}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '30px' }}>
        <img
          src={'/edit-icon.svg'}
          style={{ width: '20px', height: '20px' }}
          onClick={() => handleOpen('edit')}
        />
        <img
          src={'/delete-icon.svg'}
          style={{ width: '20px', height: '20px' }}
          onClick={() => handleDelete()}
        />
        <img
          src={'/3-dots-vertical-icon.svg'}
          style={{ width: '20px', height: '20px' }}
          onClick={() => handleOpen('readonly')}
        />
      </div>
      <TaskModalView
        mode={mode}
        onSubmit={handleEdit}
        onClose={handleClose}
        isOpen={open}
        task={task}
      />
    </div>
  );
};

export default TaskListItem;
