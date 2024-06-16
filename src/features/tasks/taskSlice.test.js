/**
 *  npm i vitest
 *  set vite.config.js
 *  sett package.json
 */

import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi } from 'vitest';
import taskReducer, {
  getTasks,
  addNewTask,
  toggleTaskStatus,
  removeTask,
} from './taskSlice';
import { fetchTasks, createTask, updateTask, deleteTask } from '../../api/api';

vi.mock('../../api/api', () => ({
  fetchTasks: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
  deleteTask: vi.fn(),
}));

describe('task slice', () => {
  const initialState = {
    tasks: [],
    status: 'idle',
    error: null,
  };

  it('should handle initial state', () => {
    expect(taskReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle getTasks', async () => {
    const tasks = [{ id: 1, title: 'Test Task ' }];
    fetchTasks.mockResolvedValueOnce(tasks);

    const store = configureStore({
      reducer: {
        tasks: taskReducer,
      },
    });

    await store.dispatch(getTasks());

    const state = store.getState();
    expect(state.tasks.tasks).toEqual(tasks);
    expect(state.tasks.status).toBe('succeeded');
  });

  it('should handle addNewTask', async () => {
    const newTask = { id: 1, ttile: 'New Task' };
    createTask.mockResolvedValueOnce(newTask);

    const store = configureStore({
      reducer: {
        tasks: taskReducer,
      },
    });

    await store.dispatch(addNewTask(newTask));

    const state = store.getState();
    expect(state.tasks.tasks).toContainEqual(newTask);
  });

  it('should handle toggleTaskStatus', async () => {
    const updatedTask = { id: 1, title: 'Updated Task', completed: true };
    updateTask.mockResolvedValueOnce(updatedTask);

    const store = configureStore({
      reducer: {
        tasks: taskReducer,
      },
    });

    const initialStateWithTasks = {
      tasks: [{ id: 1, title: 'Initial Task', completed: false }],
      status: 'idle',
      error: null,
    };

    store.dispatch({
      type: 'tasks/getTasks/fulfilled',
      payload: initialStateWithTasks.tasks,
    });

    await store.dispatch(
      toggleTaskStatus({ id: 1, updates: { completed: true } })
    );

    const state = store.getState();
    expect(state.tasks.tasks).toContainEqual(updatedTask);
  });

  it('should handle removeTask', async () => {
    deleteTask.mockResolvedValueOnce();

    const store = configureStore({
      reducer: {
        tasks: taskReducer,
      },
    });

    const initialStateWithTasks = {
      tasks: [{ id: 1, title: 'Task to be deleted' }],
      status: 'idle',
      error: null,
    };

    store.dispatch({
      type: 'tasks/getTasks/fulfilled',
      payload: initialStateWithTasks.tasks,
    });

    await store.dispatch(removeTask(1));

    const state = store.getState();
    expect(state.tasks.tasks).toEqual([]);
  });
});
