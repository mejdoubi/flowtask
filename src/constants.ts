import { nanoid } from "nanoid";

import { TaskState } from "./types";

export const initialTaskState: TaskState = {
  Pending: [
    {
      id: nanoid(),
      title: "Deploy App",
      description: "Deploy to production server",
      status: "Pending",
    },
    {
      id: nanoid(),
      title: "Write Documentation",
      description:
        "Create comprehensive documentation for the app, including setup instructions, API references, and user guides.",
      status: "Pending",
    },
  ],
  "In Progress": [
    {
      id: nanoid(),
      title: "Implement Authentication",
      description:
        "Develop user authentication and authorization mechanisms using JWT tokens and OAuth.",
      status: "In Progress",
    },
    {
      id: nanoid(),
      title: "Design UI",
      description: "Create wireframes for the app",
      status: "In Progress",
    },
  ],
  Complete: [
    {
      id: nanoid(),
      title: "Setup Backend",
      description: "Configure API endpoints",
      status: "Complete",
    },
    {
      id: nanoid(),
      title: "Research Competitors",
      description:
        "Analyze the features and design of competitor apps to identify strengths and weaknesses.",
      status: "Complete",
    },
  ],
};
