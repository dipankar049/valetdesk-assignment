// In-memory tasks storage

let tasks = [
  // {
  //   id: 1,
  //   title: "Complete assignment",
  //   description: "Finish ValetDesk React Native assignment",
  //   details: "This task involves implementing the list, detail, and create task screens in React Native. Ensure proper API integration, error handling, and clean UI styling. Reusable components should be used wherever possible to keep the code organized and maintainable.",
  //   createdAt: new Date().toISOString()
  // },
];


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