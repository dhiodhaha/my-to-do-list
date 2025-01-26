"use client";
import { useState, useRef, useEffect, useTransition } from "react";
import { DeleteButton } from "./DeleteButton";
import { Task } from "@/types/task";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/Checkbox";
import { SubTasksList } from "./SubTaskList";
import { toggleTaskCompletion } from "@/lib/actions";

export function TaskCard({
  task,
  isActive,
  onClick,
}: {
  task: Task;
  isActive: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition(); // Add this line
  const [isChecked, setIsChecked] = useState(task.isCompleted);

  const handleToggleComplete = () => {
    setIsChecked(!isChecked);
    startTransition(async () => {
      const result = await toggleTaskCompletion(task.id, task.isCompleted);
      await toggleTaskCompletion(task.id, task.isCompleted);
      if (!result?.success) setIsChecked(task.isCompleted);
    });
  };

  const handleTitleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest("button")) {
      onClick();
    }
  };

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        className={`p-4 rounded-lg shadow-sm border transition-all duration-300 ${
          isActive
            ? "bg-white ring-2 ring-blue-500"
            : "bg-gray-50 hover:bg-white"
        }`}
      >
        <div className="flex items-center justify-between">
          <div
            ref={titleRef}
            className="flex-1 flex items-center gap-2 cursor-pointer"
            onClick={handleTitleClick}
          >
            <Checkbox
              className="w-5 h-5"
              checked={isChecked}
              onCheckedChange={handleToggleComplete}
              disabled={isPending}
            />
            <span
              className={`text-lg ${
                isChecked ? "line-through text-gray-400" : ""
              }`}
            >
              {task.title}
            </span>
          </div>

          <DeleteButton taskId={task.id} isVisible={isHovered} />
        </div>

        <SubTasksList
          taskId={task.id}
          subtasks={task.subtask}
          isVisible={isActive}
        />
      </div>
    </motion.div>
  );
}
