import { ReactNode, useMemo, useReducer, useEffect } from "react";

import { TasksContext } from "./TasksContext";
import { tasksReducer } from "./tasksReducer";
import { Task, TaskStatus } from "../types";
import { initialTaskState } from "../constants";
import {
  loadTasksFromLocalStore,
  saveTasksToLocalStore,
} from "../utils/localStore";

interface TaskProviderProps {
  children: ReactNode;
}

export const TasksProvider = ({ children }: TaskProviderProps) => {
  const [taskState, dispatch] = useReducer(
    tasksReducer,
    initialTaskState,
    loadTasksFromLocalStore
  );

  useEffect(() => {
    saveTasksToLocalStore(taskState);
  }, [taskState]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "tasks" && e.newValue) {
        dispatch({
          type: "SET_TASKS",
          payload: JSON.parse(e.newValue),
        });
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const addTask = (task: Omit<Task, "id">) => {
    dispatch({ type: "ADD_TASK", payload: task });
  };

  const editTask = (task: Task) => {
    dispatch({ type: "EDIT_TASK", payload: task });
  };

  const deleteTask = (taskId: string, status: TaskStatus) => {
    dispatch({ type: "DELETE_TASK", payload: { taskId, status } });
  };

  const moveTask = (
    taskId: string,
    fromStatus: TaskStatus,
    toStatus: TaskStatus
  ) => {
    dispatch({ type: "MOVE_TASK", payload: { taskId, fromStatus, toStatus } });
  };

  const reorderTasks = (
    status: TaskStatus,
    draggedTaskId: string,
    targetTaskId: string
  ) => {
    dispatch({
      type: "REORDER_TASKS",
      payload: { status, draggedTaskId, targetTaskId },
    });
  };

  const contextValue = useMemo(
    () => ({
      tasks: taskState,
      addTask,
      editTask,
      deleteTask,
      moveTask,
      reorderTasks,
    }),
    [taskState]
  );

  return <TasksContext value={contextValue}>{children}</TasksContext>;
};
