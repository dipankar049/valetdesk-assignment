import {
    createTask,
  getAllTasks,
  getTaskById,
} from "../data/tasks.js";

const getTasks = (req, res) => {
  try {
    const tasks = getAllTasks();

    res.status(200).json({
        success: true,
        message: "Tasks fetched successfully",
        data: {
            tasks,
        }
    });

  } catch (error) {
    console.error("Error fetching tasks:", error);

    res.status(500).json({
        success: false,
        message: "Internal server error",
    });
  }
};

const getTask = (req, res) => {
  try {
    const taskId = req.params.id;

    const task = getTaskById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task fetched successfully",
      data: task,
    });

  } catch (error) {
    console.error("Error fetching task:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const createNewTask = (req, res) => {
  try {
    const { title, description, details } = req.body;

    // validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const newTask = createTask({
      title,
      description,
      details
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: newTask,
    });

  } catch (error) {
    console.error("Error creating task:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { 
    getTasks,
    getTask,
    createNewTask,
};