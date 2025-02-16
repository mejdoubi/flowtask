import Dialog from "./Dialog";

interface DeleteTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteTaskDialog = ({
  isOpen,
  onClose,
  onDelete,
}: DeleteTaskDialogProps) => {
  if (!isOpen) return null;

  return (
    <Dialog
      title="Delete Task"
      actionLabel="Delete"
      isDanger
      isOpen={isOpen}
      onClose={onClose}
      onAction={onDelete}
    >
      <p>Are you sure you want to delete this task?</p>
    </Dialog>
  );
};

export default DeleteTaskDialog;
