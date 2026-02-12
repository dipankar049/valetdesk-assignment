// In-memory tasks storage

let tasks = [];


// get all tasks
export const getAllTasks = () => {
  return tasks;
};


// get task by id
export const getTaskById = (id) => {
  return tasks.find(task => task.id === Number(id));
};


// create new task
export const createTask = ({ title, description, details }) => {

  const newTask = {
    id: Date.now(),
    title,
    description,
    details,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);

  return newTask;
};