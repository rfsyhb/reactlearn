import React from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

export default function HomePage() {
  return (
    <div>
      <h1>Todo List</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}
