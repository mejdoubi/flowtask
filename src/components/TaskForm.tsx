import { ChangeEvent, FormEvent, useState } from "react";

import Dialog from "./Dialog";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";

import { DialogProps } from "./Dialog";
import { Task, TaskStatus } from "../types";

interface TaskFormProps
  extends Omit<DialogProps, "onAction" | "children" | "isDanger"> {
  task?: Task;
  onSave: (task: Omit<Task, "id">) => void;
}

type FormErors = {
  title: string;
  description: string;
};

const TaskForm = ({
  title: formTitle,
  actionLabel,
  isOpen,
  task,
  onClose,
  onSave,
}: TaskFormProps) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState<TaskStatus>(task?.status || "Pending");
  const [errors, setErrors] = useState<FormErors>({
    title: "",
    description: "",
  });

  if (!isOpen) return null;

  const validateForm = (
    e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const values = {
      title: e?.target.id === "task-title-input" ? e.target.value : title,
      description:
        e?.target.id === "task-description-input"
          ? e.target.value
          : description,
    };

    const newErrors = { title: "", description: "" };

    if (values.title.length === 0) {
      newErrors.title = "Title is required";
    } else if (values.title.length > 50)
      newErrors.title = "Title must be less than 50 characters";

    if (values.description.length > 250)
      newErrors.description = "Description must be less than 250 characters";

    setErrors(newErrors);
    return !newErrors.title && !newErrors.description;
  };

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (validateForm()) {
      onSave({ title, description, status });
    }
  };

  return (
    <Dialog
      title={formTitle}
      isOpen={isOpen}
      onClose={onClose}
      onAction={handleSubmit}
      actionLabel={actionLabel}
      isActionDisabled={!!errors.title || !!errors.description}
    >
      <form onSubmit={handleSubmit}>
        <TextInput
          id="task-title-input"
          value={title}
          onChange={(e) => {
            validateForm(e);
            setTitle(e.target.value);
          }}
          label="Title"
          error={errors.title}
          maxLength={50}
          className="mb-3"
        />
        <TextInput
          id="task-description-input"
          value={description}
          onChange={(e) => {
            validateForm(e);
            setDescription(e.target.value);
          }}
          label="Description"
          error={errors.description}
          isTextarea
          maxLength={250}
          className="mb-3"
        />
        <SelectInput
          id="task-status-select"
          value={status}
          onChange={(value) => setStatus(value as TaskStatus)}
          options={[
            { value: "Pending", label: "Pending" },
            { value: "In Progress", label: "In Progress" },
            { value: "Complete", label: "Complete" },
          ]}
          label="Status"
          className="mb-3"
        />
      </form>
    </Dialog>
  );
};

export default TaskForm;
