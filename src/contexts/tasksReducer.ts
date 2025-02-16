import { nanoid } from "nanoid";

import { TaskAction, TaskState } from "../types";

export const tasksReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case "ADD_TASK": {
      const { status } = action.payload;
      return {
        ...state,
        [status]: [...state[status], { id: nanoid(), ...action.payload }],
      };
    }

    case "EDIT_TASK": {
      const { id, status } = action.payload;
      const editTaskIndex = state[status].findIndex((task) => task.id === id);
      if (editTaskIndex === -1) return state;

      const updatedTasks = [...state[status]];
      updatedTasks[editTaskIndex] = action.payload;

      return {
        ...state,
        [status]: updatedTasks,
      };
    }

    case "DELETE_TASK": {
      const { taskId, status } = action.payload;
      return {
        ...state,
        [status]: state[status].filter((task) => task.id !== taskId),
      };
    }

    case "MOVE_TASK": {
      const { taskId, fromStatus, toStatus } = action.payload;
      const taskToMove = state[fromStatus].find((task) => task.id === taskId);
      if (!taskToMove) return state;

      return {
        ...state,
        [fromStatus]: state[fromStatus].filter((task) => task.id !== taskId),
        [toStatus]: [...state[toStatus], { ...taskToMove, status: toStatus }],
      };
    }

    case "REORDER_TASKS": {
      const { status, draggedTaskId, targetTaskId } = action.payload;
      const tasks = state[status];

      const draggedIndex = tasks.findIndex((task) => task.id === draggedTaskId);
      const targetIndex = tasks.findIndex((task) => task.id === targetTaskId);

      if (draggedIndex === -1 || targetIndex === -1) return state;

      const updatedTasks = [...tasks];
      const [movedTask] = updatedTasks.splice(draggedIndex, 1);
      updatedTasks.splice(targetIndex, 0, movedTask);

      return {
        ...state,
        [status]: updatedTasks,
      };
    }

    case "SET_TASKS":
      return action.payload;

    default:
      return state;
  }
};
