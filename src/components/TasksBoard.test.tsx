import { vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";

import TasksBoard from "./TasksBoard";

import { TaskState } from "../types";

const { tasks, moveTask, reorderTasks } = vi.hoisted(() => {
  const taskState: TaskState = {
    Pending: [
      {
        id: "1",
        title: "Task 1",
        description: "Task Description 1",
        status: "Pending",
      },
    ],
    "In Progress": [
      {
        id: "2",
        title: "Task 2",
        description: "Task Description 2",
        status: "In Progress",
      },
    ],
    Complete: [
      {
        id: "3",
        title: "Task 3",
        description: "Task Description 3",
        status: "Complete",
      },
      {
        id: "4",
        title: "Task 4",
        description: "Task Description 4",
        status: "Complete",
      },
    ],
  };

  return { tasks: taskState, moveTask: vi.fn(), reorderTasks: vi.fn() };
});

vi.mock("../hooks/useTasks", () => {
  return {
    useTasks: () => ({
      tasks,
      moveTask,
      reorderTasks,
    }),
  };
});

test("TasksBoard handles moving tasks between different TasksContainer", () => {
  const { getByText } = render(<TasksBoard />);

  const taskCard = getByText("Task 1");

  fireEvent.dragStart(taskCard);
  fireEvent.drop(getByText("In Progress"));
  expect(moveTask).toHaveBeenCalledWith("1", "Pending", "In Progress");
});

test("TasksBoard handles reordering tasks inside TasksContainer", () => {
  const { getByText } = render(<TasksBoard />);

  const taskCard = getByText("Task 4");

  fireEvent.dragStart(taskCard);
  fireEvent.dragOver(getByText("Task 3"));
  fireEvent.drop(getByText("Task 3"));
  expect(reorderTasks).toHaveBeenCalledWith("Complete", "4", "3");
});
