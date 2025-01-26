"use client";
import { motion } from "framer-motion";
import { SubTask } from "@/types/task";
import { Input } from "@/components/ui/Input";
import { createSubtask, toggleSubtaskCompletion } from "@/lib/actions";
import { useState, useTransition } from "react";
import { Checkbox } from "@/components/ui/Checkbox";

export function SubTasksList({
  taskId,
  subtasks,
  isVisible,
}: {
  taskId: string;
  subtasks: SubTask[];
  isVisible: boolean;
}) {
  const [input, setInput] = useState("");
  const [optimisticSubtasks, setOptimisticSubtasks] = useState(subtasks);
  const [isPending, startTransition] = useTransition();

  const handleSubtaskToggle = (subtaskId: string, currentState: boolean) => {
    setOptimisticSubtasks((prev) =>
      prev.map((sub) =>
        sub.id === subtaskId ? { ...sub, isCompleted: !currentState } : sub
      )
    );

    startTransition(async () => {
      const result = await toggleSubtaskCompletion(subtaskId, currentState);
      if (!result?.success) {
        setOptimisticSubtasks((prev) =>
          prev.map((sub) =>
            sub.id === subtaskId ? { ...sub, isCompleted: currentState } : sub
          )
        );
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newSubtask = {
      id: Date.now().toString(),
      title: input,
      taskId,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setOptimisticSubtasks((prev) => [...prev, newSubtask]);

    startTransition(async () => {
      const formData = new FormData();
      formData.append("title", input);
      formData.append("taskId", taskId);

      const result = await createSubtask(formData);
      if (!result?.success) {
        setOptimisticSubtasks((prev) =>
          prev.filter((t) => t.id !== newSubtask.id)
        );
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        height: isVisible ? "auto" : 0,
      }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden"
    >
      <div className="mt-2 pl-7 space-y-2">
        {/* Move form to top */}

        {/* Subtasks list */}
        {optimisticSubtasks.map((subtask) => (
          <div
            key={subtask.id}
            className="flex items-center gap-2 text-sm p-2 hover:bg-gray-50 rounded"
          >
            <Checkbox
              checked={subtask.isCompleted}
              className="w-4 h-4"
              onCheckedChange={() =>
                handleSubtaskToggle(subtask.id, subtask.isCompleted)
              }
              disabled={isPending}
            />
            <span
              className={
                subtask.isCompleted ? "line-through text-gray-400" : ""
              }
            >
              {subtask.title}
            </span>
          </div>
        ))}
        <form onSubmit={handleSubmit} className="mb-2">
          <Input
            placeholder="Add sub task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-8 text-sm mb-4"
            autoFocus={isVisible}
          />
        </form>
      </div>
    </motion.div>
  );
}
