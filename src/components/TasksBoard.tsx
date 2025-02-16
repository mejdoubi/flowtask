import { useMemo, useState } from "react";

import TaskContainer from "./TasksContainer";
import { useTasks } from "../hooks/useTasks";

import { Task, TaskStatus } from "../types";

const TasksBoard = () => {
  const { tasks, moveTask, reorderTasks } = useTasks();
  const memoizedTaskEntries = useMemo(() => Object.entries(tasks), [tasks]);

  const [draggedTask, setDraggedTask] = useState<{
    id: string;
    fromStatus: TaskStatus;
  } | null>(null);

  const handleDragStart = (task: Task) => {
    setDraggedTask({ id: task.id, fromStatus: task.status });
  };

  const handleDrop = (status: TaskStatus, targetTaskId?: string) => {
    if (!draggedTask) return;

    if (draggedTask.fromStatus !== status) {
      moveTask(draggedTask.id, draggedTask.fromStatus, status);
    } else if (targetTaskId) {
      reorderTasks(status, draggedTask.id, targetTaskId);
    }

    setDraggedTask(null);
  };

  return (
    <>
      {memoizedTaskEntries.map(([status, taskList]) => (
        <TaskContainer
          key={status}
          status={status as TaskStatus}
          tasks={taskList}
          handleDragStart={handleDragStart}
          handleDrop={handleDrop}
        />
      ))}
    </>
  );
};

export default TasksBoard;
