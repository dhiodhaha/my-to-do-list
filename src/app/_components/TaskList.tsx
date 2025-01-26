"use client";
import { useState, useEffect } from "react";
import { TaskCard } from "./TaskCard";
import { Task } from "@/types/task";

export function TaskList({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const handleTaskClick = (taskId: string) => {
    setActiveTaskId((prev) => (prev === taskId ? null : taskId));
  };

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  return (
    <div className="space-y-2 w-full">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          isActive={activeTaskId === task.id}
          onClick={() => handleTaskClick(task.id)}
        />
      ))}
    </div>
  );
}
