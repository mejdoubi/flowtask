import { vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";

import TaskCard from "./TaskCard";

import { Task } from "../types";

test("TaskCard handles drag and drop events", () => {
  const onDragStart = vi.fn();
  const onDrop = vi.fn();
  const task: Task = {
    id: "1",
    title: "Task 1",
    description: "Task Description 1",
    status: "Pending",
  };

  const { getByText } = render(
    <TaskCard task={task} onDragStart={onDragStart} onDrop={onDrop} />
  );

  const taskCard = getByText("Task 1");
  fireEvent.dragStart(taskCard);
  expect(onDragStart).toHaveBeenCalledWith("1");

  fireEvent.drop(taskCard);
  expect(onDrop).toHaveBeenCalled();
});
