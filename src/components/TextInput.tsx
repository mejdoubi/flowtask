import { ChangeEvent } from "react";

interface TextInputProps {
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label: string;
  error?: string;
  isTextarea?: boolean;
  maxLength?: number;
  className?: string;
}

const TextInput = ({
  id,
  label,
  error,
  isTextarea = false,
  className = "",
  ...otherProps
}: TextInputProps) => {
  return (
    <div className={className}>
      <label className="block font-bold text-text-primary" htmlFor={id}>
        {label}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          data-testid={id}
          className={`w-full h-36 p-2 border rounded text-text-primary ${
            error ? "border-danger" : "border-border"
          }`}
          {...otherProps}
        />
      ) : (
        <input
          id={id}
          data-testid={id}
          type="text"
          className={`w-full p-2 border rounded text-text-primary ${
            error ? "border-danger" : "border-border"
          }`}
          {...otherProps}
        />
      )}
      {error && <p className="text-danger text-sm">{error}</p>}
    </div>
  );
};

export default TextInput;
