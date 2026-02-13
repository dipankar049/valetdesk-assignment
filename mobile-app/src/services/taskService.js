import axios from "axios";
import BASE_URL from "../../config";

export const fetchTasks = async () => {
  const response = await axios.get(`${BASE_URL}/items`);
  return response.data;
};

export const fetchTaskById = async (taskId) => {
  return axios.get(`${BASE_URL}/items/${taskId}`);
};

export const createTask = async ({ title, description, details }) => {
  const response = await axios.post(`${BASE_URL}/items`, {
    title,
    description,
    details,
  });
  return response.data;
};