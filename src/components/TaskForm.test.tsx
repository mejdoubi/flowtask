import { vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";

import TaskForm from "./TaskForm";
import { Task } from "../types";

test("TaskForm handles form submission", () => {
  const task: Omit<Task, "id"> = {
    title: "Task 1",
    description: "Task Description 1",
    status: "Pending",
  };

  const onClose = vi.fn();
  const onSave = vi.fn();

  const { getByTestId, getByText } = render(
    <TaskForm
      title="New Task"
      actionLabel="Save"
      isOpen={true}
      onClose={onClose}
      onSave={onSave}
    />
  );

  fireEvent.change(getByTestId("task-title-input"), {
    target: { value: task.title },
  });
  fireEvent.change(getByTestId("task-description-input"), {
    target: { value: task.description },
  });
  fireEvent.change(getByTestId("task-status-select"), {
    target: { value: task.status },
  });
  fireEvent.click(getByText("Save"));

  expect(onSave).toHaveBeenCalledWith({
    title: task.title,
    description: task.description,
    status: task.status,
  });
});
