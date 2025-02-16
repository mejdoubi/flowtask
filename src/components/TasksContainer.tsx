import TaskCard from "./TaskCard";

import { Task, TaskStatus } from "../types";

interface TaskContainerProps {
  status: TaskStatus;
  tasks: Task[];
  handleDragStart: (task: Task) => void;
  handleDrop: (status: TaskStatus, targetTaskId?: string) => void;
}

const TasksContainer = ({
  status,
  tasks,
  handleDragStart,
  handleDrop,
}: TaskContainerProps) => {
  return (
    <div
      className="w-1/3 bg-white p-6 rounded-lg shadow"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleDrop(status);
      }}
    >
      <h2 className="text-lg font-semibold mb-3 text-center text-text-primary uppercase">
        {status}
      </h2>
      <hr className="mb-3 border-border" />
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDragStart={() => handleDragStart(task)}
            onDrop={() => handleDrop(task.status, task.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TasksContainer;
