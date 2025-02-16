import { loadTasksFromLocalStore, saveTasksToLocalStore } from "./localStore";

import { TaskState } from "../types";
import { initialTaskState } from "../constants";

describe("localStore utils", () => {
  const testTasks: TaskState = {
    Pending: [{ id: "1", title: "Task 1", status: "Pending" }],
    "In Progress": [{ id: "2", title: "Task 2", status: "In Progress" }],
    Complete: [{ id: "3", title: "Task 3", status: "Complete" }],
  };

  beforeEach(() => {
    localStorage.clear();
  });

  test("loadTasksFromLocalStore returns initial tasks if no tasks are stored", () => {
    const tasks = loadTasksFromLocalStore(initialTaskState);
    expect(tasks).toEqual(initialTaskState);
  });

  test("loadTasksFromLocalStore returns stored tasks", () => {
    localStorage.setItem("tasks", JSON.stringify(testTasks));
    const tasks = loadTasksFromLocalStore(initialTaskState);
    expect(tasks).toEqual(testTasks);
  });

  test("saveTasksToLocalStore stores tasks", () => {
    saveTasksToLocalStore(testTasks);
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    expect(storedTasks).toEqual(testTasks);
  });
});
