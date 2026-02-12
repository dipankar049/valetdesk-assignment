import {
  getAllTasks,
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

export { getTasks };