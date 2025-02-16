import TaskForm from "./TaskForm";
import { useTasks } from "../hooks/useTasks";

interface AddTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTaskDialog = ({ isOpen, onClose }: AddTaskDialogProps) => {
  const { addTask } = useTasks();

  if (!isOpen) return null;

  return (
    <TaskForm
      title="New Task"
      actionLabel="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSave={(task) => {
        addTask(task);
        onClose();
      }}
    />
  );
};

export default AddTaskDialog;
