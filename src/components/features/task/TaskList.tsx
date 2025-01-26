import React, { useState } from "react";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  subtask: Subtask[];
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

const [newTaskTitle, setNewTasktitle] = useState("");

const handleAddTask = () => {
  if (e.key === "Enter" && newTaskTitle.trim()) {
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
    };
  }
};
export default function TaskList() {
  return <div>TaskList</div>;
}
