import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import AddTaskDialog from "./AddTaskDialog";

const Header = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <header className="bg-primary text-white p-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">FlowTask</h1>
      <button
        onClick={() => setOpen(true)}
        className="bg-white text-primary px-4 py-2 rounded-lg shadow transform transition-transform hover:scale-105 flex items-center gap-2"
      >
        <PlusIcon className="w-5 h-5 font-bold" />
        New Task
      </button>

      <AddTaskDialog isOpen={isOpen} onClose={() => setOpen(false)} />
    </header>
  );
};

export default Header;
