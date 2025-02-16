import { useState } from "react";

import TaskActionButtons from "./TaskActionButtons";

import { Task } from "../types";

interface TaskCardProps {
  task: Task;
  onDragStart: (taskId: string) => void;
  onDrop: () => void;
}

const TaskCard = ({ task, onDragStart, onDrop }: TaskCardProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const { title, description } = task;

  return (
    <div className="relative">
      {isDragging && (
        <div className="absolute bg-white inset-0 border-2 border-dashed border-primary rounded-lg" />
      )}
      <div
        className={`relative bg-white p-3 rounded-lg shadow cursor-pointer group ${
          isDragging ? "opacity-50" : ""
        }`}
        draggable
        onDragStart={() => {
          setIsDragging(true);
          onDragStart(task.id);
        }}
        onDragEnd={() => setIsDragging(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onDrop();
        }}
      >
        <div
          className="absolute left-0 top-0 w-1 border-l-4 border-primary"
          style={{ height: "40%", top: "20%" }}
        />
        <div className="relative pb-1 flex justify-between items-center">
          <h3 className="font-bold text-text-primary break-words overflow-hidden">
            {title}
          </h3>

          <TaskActionButtons task={task} />
        </div>

        {description && (
          <p className="relative text-sm text-text-primary break-words overflow-hidden">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
