import TaskForm from "./TaskForm";

import { Task } from "../types";

interface EditTaskDialogProps {
  isOpen: boolean;
  task: Task;
  onClose: () => void;
  onSave: (task: Omit<Task, "id">) => void;
}

const EditTaskDialog = ({
  isOpen,
  task,
  onClose,
  onSave,
}: EditTaskDialogProps) => {
  if (!isOpen) return null;

  return (
    <TaskForm
      title="Edit Task"
      actionLabel="Save"
      isOpen={isOpen}
      task={task}
      onClose={onClose}
      onSave={onSave}
    />
  );
};

export default EditTaskDialog;
