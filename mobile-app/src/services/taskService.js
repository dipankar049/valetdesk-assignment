import axios from "axios";
import BASE_URL from "../../config";

export const fetchTasks = async () => {
  const response = await axios.get(`${BASE_URL}/items`);
  return response.data;
};