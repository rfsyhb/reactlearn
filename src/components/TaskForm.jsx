import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewTask } from '../features/tasks/taskSlice';

function TaskForm() {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      dispatch(addNewTask({ text: task, completed: false }));
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task"
        className="border p-2"
      />
    </form>
  );
}

export default TaskForm;
