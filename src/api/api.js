/* eslint-disable no-console */
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiRequest = async (method, endpoint, data) => {
  try {
    const response = await apiClient({
      method,
      url: endpoint,
      data,
    });

    return response.data;
  } catch (error) {
    console.error('API request error:', error.response || error.message);
    throw new Error(
      error.response?.data?.message || error.message || 'Something went wrong'
    );
  }
};

const fetchTasks = () => {
  return apiRequest('GET', '/tasks');
};

const createTask = (task) => {
  return apiRequest('POST', '/tasks', task);
};

const updateTask = (id, updateData) => {
  return apiRequest('PUT', `/tasks/${id}`, updateData);
};

const deleteTask = (id) => {
  return apiRequest('DELETE', `/tasks/${id}`);
};

export { fetchTasks, createTask, updateTask, deleteTask };
