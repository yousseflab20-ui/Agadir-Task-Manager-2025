import Task from "../models/TaskModel.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { user_id: req.userId } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createTask = async (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("User ID:", req.userId);

  try {
    const { title, description, due_date } = req.body;
    const task = await Task.create({
      title,
      description,
      due_date,
      user_id: req.userId,
      status: "pending",
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, due_date, status } = req.body;
    const task = await Task.findOne({ where: { id, user_id: req.userId } });
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.update({ title, description, due_date, status });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, user_id: req.userId } });
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.destroy();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const markDone = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { id, user_id: req.userId } });
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.update({ status: "done" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
