import { tasksReducer } from "./tasksReducer";
import { Task, TaskState, TaskAction } from "../types";

describe("tasksReducer", () => {
  const initialState: TaskState = {
    Pending: [],
    "In Progress": [],
    Complete: [],
  };

  it("should add a task", () => {
    const newTask: Omit<Task, "id"> = {
      title: "New Task",
      description: "Task description",
      status: "Pending",
    };

    const action: TaskAction = {
      type: "ADD_TASK",
      payload: newTask,
    };

    const state = tasksReducer(initialState, action);
    expect(state.Pending).toHaveLength(1);
    expect(state.Pending[0].id).toBeDefined();
    expect(state.Pending[0].title).toBe(newTask.title);
    expect(state.Pending[0].description).toBe(newTask.description);
    expect(state.Pending[0].status).toBe(newTask.status);
  });

  it("should edit a task", () => {
    const oldTask: Task = {
      id: "1",
      title: "Old Task",
      description: "Task description",
      status: "Pending",
    };

    const updatedTask: Task = {
      ...oldTask,
      title: "Updated Task",
    };

    const stateWithTask: TaskState = {
      ...initialState,
      Pending: [oldTask],
    };

    const action: TaskAction = {
      type: "EDIT_TASK",
      payload: updatedTask,
    };

    const state = tasksReducer(stateWithTask, action);
    expect(state.Pending[0].title).toBe(updatedTask.title);
    expect(state.Pending[0].description).toBe(updatedTask.description);
  });

  it("should delete a task", () => {
    const taskToDelete: Task = {
      id: "1",
      title: "Task to delete",
      status: "Pending",
    };

    const stateWithTask: TaskState = {
      ...initialState,
      Pending: [taskToDelete],
    };

    const action: TaskAction = {
      type: "DELETE_TASK",
      payload: { taskId: "1", status: "Pending" },
    };

    const state = tasksReducer(stateWithTask, action);
    expect(state.Pending).toHaveLength(0);
  });

  it("should move a task", () => {
    const taskToMove: Task = {
      id: "1",
      title: "Task to move",
      status: "Pending",
    };

    const stateWithTask: TaskState = {
      ...initialState,
      Pending: [taskToMove],
    };

    const action: TaskAction = {
      type: "MOVE_TASK",
      payload: { taskId: "1", fromStatus: "Pending", toStatus: "In Progress" },
    };

    const state = tasksReducer(stateWithTask, action);
    expect(state.Pending).toHaveLength(0);
    expect(state["In Progress"]).toHaveLength(1);
    expect(state["In Progress"][0].title).toBe(taskToMove.title);
  });

  it("should reorder tasks", () => {
    const pendingTasks: Task[] = [
      { id: "1", title: "Task 1", status: "Pending" },
      { id: "2", title: "Task 2", status: "Pending" },
    ];

    const stateWithTasks: TaskState = {
      ...initialState,
      Pending: pendingTasks,
    };

    const action: TaskAction = {
      type: "REORDER_TASKS",
      payload: { status: "Pending", draggedTaskId: "1", targetTaskId: "2" },
    };

    const state = tasksReducer(stateWithTasks, action);
    expect(state.Pending[0].id).toBe("2");
    expect(state.Pending[1].id).toBe("1");
  });

  it("should set tasks", () => {
    const newTasks: TaskState = {
      Pending: [{ id: "1", title: "Task 1", status: "Pending" }],
      "In Progress": [{ id: "2", title: "Task 2", status: "In Progress" }],
      Complete: [{ id: "3", title: "Task 3", status: "Complete" }],
    };

    const action: TaskAction = {
      type: "SET_TASKS",
      payload: newTasks,
    };

    const state = tasksReducer(initialState, action);
    expect(state).toEqual(newTasks);
  });
});
