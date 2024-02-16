import axios from "./axios";

//get all tasks
export const getTasksRequest = () => axios.get("/tasks");
//get one task
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`);
// add tasks
export const createTaskRequest = (task) => axios.post("/tasks", task);
//update tasks
export const updateTaskRequest = (id, task) => axios.put(`/tasks/${id}`, task);
//delete tasks
export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`);
