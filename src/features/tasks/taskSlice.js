/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks, createTask, updateTask, deleteTask } from '../../api/api';

// Thunks untuk API
export const getTasks = createAsyncThunk('tasks/getTasks', async () => {
  const response = await fetchTasks();
  return response;
});

export const addNewTask = createAsyncThunk('tasks/addNewTask', async (task) => {
  const response = await createTask(task);
  return response;
});

export const toggleTaskStatus = createAsyncThunk(
  'tasks/toggleTaskStatus',
  async ({ id, updates }) => {
    const response = await updateTask(id, updates);
    return response;
  }
);

export const removeTask = createAsyncThunk('tasks/removeTask', async (id) => {
  await deleteTask(id);
  return id;
});

// Slice untuk state dan reducer
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
      .addCase(getTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
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
