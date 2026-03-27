const Task = require("../models/Task");

// GET all tasks (only tasks created by or assigned to current user)
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [{ createdBy: req.user.id }, { assignedTo: req.user.id }],
    }).populate("createdBy", "name email");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE task (createdBy = current user)
exports.createTask = async (req, res) => {
  try {
    const { title, status, assignedTo } = req.body;
    const task = await Task.create({
      title,
      status,
      createdBy: req.user.id,
      assignedTo: assignedTo || null,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE task (only if created by or assigned to current user)
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      $or: [{ createdBy: req.user.id }, { assignedTo: req.user.id }],
    });
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = req.body.title || task.title;
    task.status = req.body.status || task.status;
    task.assignedTo = req.body.assignedTo || task.assignedTo;
    await task.save();

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE task (only if created by current user)
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      $or: [{ createdBy: req.user.id }, { assignedTo: req.user.id }],
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    //  Use deleteOne instead of remove
    await Task.deleteOne({ _id: task._id });

    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};