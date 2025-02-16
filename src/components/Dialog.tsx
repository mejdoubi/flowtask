import { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export interface DialogProps {
  title: string;
  actionLabel: string;
  isDanger?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
  isActionDisabled?: boolean;
  children: ReactNode;
}

const Dialog = ({
  title,
  actionLabel,
  isDanger = false,
  isOpen,
  onClose,
  onAction,
  isActionDisabled = false,
  children,
}: DialogProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center p-4 z-100 pointer-events-auto"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            className={`text-lg font-bold ${
              isDanger ? "text-danger" : "text-primary"
            }`}
          >
            {title}
          </h2>
          <button type="button" onClick={onClose}>
            <XMarkIcon
              className={`h-5 w-5 font-bold ${
                isDanger ? "text-danger" : "text-primary"
              }`}
            />
          </button>
        </div>
        {children}
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-cancel text-white rounded"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onAction}
            disabled={isActionDisabled}
            className={`px-4 py-2 rounded ${
              isDanger ? "bg-danger text-white" : "bg-primary text-white"
            }`}
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
