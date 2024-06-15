/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/tasks/taskSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
