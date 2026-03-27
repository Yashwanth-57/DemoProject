const express = require("express");
const protect = require("../middlewares/authmiddleware");
const { getTasks, createTask, updateTask, deleteTask } = require("../controller/taskController");
const router = express.Router();

// All routes protected
router.use(protect);

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;