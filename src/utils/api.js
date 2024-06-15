import axios from 'axios';

const BASE_URL = 'https://666d2bf37a3738f7cacbadeb.mockapi.io/api/v1';

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

    const responseData = response.data;

    if (responseData.status !== 'success') {
      throw new Error(responseData.message);
    }

    return responseData;
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
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
