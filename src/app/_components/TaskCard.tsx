"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { DeleteButton } from "./DeleteButton";
import { SubTasksList } from "./SubTaskList";

export const TaskCard = ({
  task,
}: {
  task: {
    id: string;
    title: string;
    subtask: Array<{ id: string; title: string; isCompleted: boolean }>;
  };
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Card
      className="hover:bg-slate-50 p-4 mb-2 cursor-pointer"
      onClick={() => setIsActive(!isActive)}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="font-medium">{task.title}</h2>
        </div>
        <DeleteButton taskId={task.id} />
      </div>

      <div className={`mt-2 ${isActive ? "block" : "hidden"}`}>
        <SubTasksList taskId={task.id} subtasks={task.subtask} />
      </div>
    </Card>
  );
};
