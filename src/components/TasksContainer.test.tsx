import { vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";

import TasksContainer from "./TasksContainer";

import { Task } from "../types";

test("TasksContainer handles drag and drop events", () => {
  const handleDragStart = vi.fn();
  const handleDrop = vi.fn();
  const tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "Task Description 1",
      status: "Pending",
    },
    {
      id: "2",
      title: "Task 2",
      description: "Task Description 2",
      status: "Pending",
    },
  ];

  const { getByText } = render(
    <TasksContainer
      status="Pending"
      tasks={tasks}
      handleDragStart={handleDragStart}
      handleDrop={handleDrop}
    />
  );

  const taskCard = getByText("Task 1");
  fireEvent.dragStart(taskCard);
  expect(handleDragStart).toHaveBeenCalledWith(tasks[0]);

  fireEvent.drop(taskCard);
  expect(handleDrop).toHaveBeenCalledWith("Pending", "1");
});
