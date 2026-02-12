import express from "express";
import {
    createNewTask,
    getTask,
    getTasks,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", createNewTask);

export default router;