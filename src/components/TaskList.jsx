import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks } from '../features/tasks/taskSlice';
import TaskItem from './TaskItem';

export default function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const taskStatus = useSelector((state) => state.tasks.status);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(getTasks());
    }
  }, [taskStatus, dispatch]);

  let content;

  if (taskStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (taskStatus === 'succeeded') {
    content = (
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    );
  } else if (taskStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return <div>{content}</div>;
}
