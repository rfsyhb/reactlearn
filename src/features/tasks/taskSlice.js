/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks, createTask, updateTask, deleteTask } from '../../api/api';

const getTasks = createAsyncThunk('tasks/getTasks', async () => {
  const response = await fetchTasks();
  return response;
});

const addNewTask = createAsyncThunk('tasks/addNewTask', async (task) => {
  const response = await createTask(task);
  return response;
});

const toggleTaskStatus = createAsyncThunk(
  'tasks/toggleTaskStatus',
  async ({ id, updateData }) => {
    const response = await updateTask(id, updateData);
    return response;
  }
);

const removeTask = createAsyncThunk('tasks/removeTask', async (id) => {
  await deleteTask(id);
  return id;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(toggleTaskStatus.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        state.tasks[index] = action.payload;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
