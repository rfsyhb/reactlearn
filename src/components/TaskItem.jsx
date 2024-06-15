import React from 'react';
import { useDispatch } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { toggleTaskStatus, removeTask } from '../features/tasks/taskSlice';

export default function TaskItem({ task }) {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(
      toggleTaskStatus({ id: task.id, updates: { completed: !task.completed } })
    );
  };

  const handleDelete = () => {
    dispatch(removeTask(task.id));
  };

  return (
    <li className={`p-2 ${task.completed ? 'line-through' : ''}`}>
      <span
        role="button"
        tabIndex="0"
        onClick={handleToggle}
        onKeyDown={handleToggle}
        className="cursor-pointer"
      >
        {task.text}
      </span>
      <button
        type="button"
        onClick={handleDelete}
        className="ml-4 text-red-500"
      >
        <FaTrashAlt />
      </button>
    </li>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};
