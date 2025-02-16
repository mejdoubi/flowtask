import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

import EditTaskDialog from "./EditTaskDialog";
import DeleteTaskDialog from "./DeleteTaskDialog";
import { useTasks } from "../hooks/useTasks";

import { Task } from "../types";

interface TaskActionsProps {
  task: Task;
}

const TaskActionButtons = ({ task }: TaskActionsProps) => {
  const { editTask, deleteTask } = useTasks();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { id, status } = task;

  return (
    <>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100">
        <button onClick={() => setIsEditOpen(true)}>
          <PencilSquareIcon className="w-6 h-6 text-primary transform transition-transform hover:scale-105" />
        </button>
        <button onClick={() => setIsDeleteOpen(true)}>
          <TrashIcon className="w-6 h-6 text-danger transform transition-transform hover:scale-105" />
        </button>
      </div>

      {isEditOpen && (
        <EditTaskDialog
          isOpen={isEditOpen}
          task={task}
          onClose={() => setIsEditOpen(false)}
          onSave={(updatedTask) => {
            editTask({ ...task, ...updatedTask });
            setIsEditOpen(false);
          }}
        />
      )}

      {isDeleteOpen && (
        <DeleteTaskDialog
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onDelete={() => {
            deleteTask(id, status);
            setIsDeleteOpen(false);
          }}
        />
      )}
    </>
  );
};

export default TaskActionButtons;
