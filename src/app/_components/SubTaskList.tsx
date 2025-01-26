"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { createSubtask } from "@/lib/actions";

export const SubTasksList = ({
  taskId,
  subtasks,
}: {
  taskId: string;
  subtasks: Array<{ id: string; title: string; isCompleted: boolean }>;
}) => {
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const formData = new FormData();
    formData.append("title", input);
    formData.append("taskId", taskId);

    await createSubtask(formData);
    setInput("");
  };

  return (
    <div className="space-y-2">
      {subtasks.map((subtask) => (
        <div
          key={subtask.id}
          className="flex items-center p-2 text-sm bg-gray-50 rounded-md"
        >
          <Checkbox checked={subtask.isCompleted} className="mr-2" />
          <span>{subtask.title}</span>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Add sub task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 text-sm border rounded-md"
        />
      </form>
    </div>
  );
};
