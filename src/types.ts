export type TaskStatus = "Pending" | "In Progress" | "Complete";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
}

export type TaskState<T extends string = TaskStatus> = Record<T, Task[]>;

export type TaskAction =
  | { type: "ADD_TASK"; payload: Omit<Task, "id"> }
  | { type: "EDIT_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: { taskId: string; status: TaskStatus } }
  | {
      type: "MOVE_TASK";
      payload: { taskId: string; fromStatus: TaskStatus; toStatus: TaskStatus };
    }
  | {
      type: "REORDER_TASKS";
      payload: {
        status: TaskStatus;
        draggedTaskId: string;
        targetTaskId: string;
      };
    }
  | { type: "SET_TASKS"; payload: TaskState };
