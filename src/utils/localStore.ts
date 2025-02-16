import { TaskState } from "../types";

export const loadTasksFromLocalStore = (initialTaskState: TaskState) => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : initialTaskState;
};

export const saveTasksToLocalStore = (taskState: TaskState) => {
  localStorage.setItem("tasks", JSON.stringify(taskState));
};
