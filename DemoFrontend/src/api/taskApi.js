import axiosInstance from "./axios";

// GET all tasks
export const getTasks = async () => {
  const res = await axiosInstance.get("/tasks");
  return res.data;
};

// CREATE task
export const createTask = async (taskData) => {
  const res = await axiosInstance.post("/tasks", taskData);
  return res.data;
};

// UPDATE task
export const updateTask = async (id, taskData) => {
  const res = await axiosInstance.put(`/tasks/${id}`, taskData);
  return res.data;
};

// DELETE task
export const deleteTask = async (id) => {
  const res = await axiosInstance.delete(`/tasks/${id}`);
  return res.data;
};