"use client";

import React, { useState } from "react";
import type { Task, SubTask } from "@/types/task";
import { prisma } from "@/lib/prisma";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { createSubtask } from "@/lib/action";
import { boolean } from "zod";

interface TaskCardProps {
  task: {
    id: string;
    subtask: Array<{ id: string; title: string; isCompleted: boolean }>;
  };
  isActive: boolean;
}

export default async function SubTasksList({ task, isActive }: TaskCardProps) {
  const [input, setInput] = useState("");

  const handleCreateSubtask = async (formData: FormData) => {
    const title = formData.get("subtask") as string;
    setInput("");
    await createSubtask({ taskId: task.id, title });
  }; // kayaknya bisa divalidasi pake zod kan?

  const subTasks: SubTask[] = await prisma.subtask.findMany();
  const [newSubtask, setNewSubtask] = useState("");

  const handleAddSubtask = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newSubtask.trim()) {
      onAddSubtask(task.id, newSubtask.trim());
      setNewSubtask("");
    }
  };

  return (
    <div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2">
          {task.subtask.map((subtask) => (
            <div
              key={subtask.id}
              className="flex items-center justify-between p-2 text-sm bg-gray-50 rounded-md animate-fade-in"
            >
              <div className="flex items-center flex-1">
                <Checkbox
                  checked={subtask.completed}
                  onCheckedChange={() =>
                    onToggleSubtaskComplete(task.id, subtask.id)
                  }
                  className="mr-2"
                />
              </div>
            </div>
          ))}
          <form>
            {/* must refactor this */}
            <input
              type="text"
              placeholder="Add sub task"
              className="w-full p-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              onKeyDown={handleAddSubtask}
              onClick={(e) => e.stopPropagation()}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
