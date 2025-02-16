import { createContext } from "react";

import { Task, TaskState, TaskStatus } from "../types";

export interface TasksContextType {
  tasks: TaskState;
  addTask: (task: Omit<Task, "id">) => void;
  editTask: (task: Task) => void;
  deleteTask: (taskId: string, status: TaskStatus) => void;
  moveTask: (
    taskId: string,
    fromStatus: TaskStatus,
    toStatus: TaskStatus
  ) => void;
  reorderTasks: (
    status: TaskStatus,
    draggedTaskId: string,
    targetTaskId: string
  ) => void;
}

export const TasksContext = createContext<TasksContextType>(
  {} as TasksContextType
);
