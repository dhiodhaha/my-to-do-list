import { DeleteButton } from "@/app/_components/DeleteButton";
import { Card } from "@/components/ui/Card";
import { prisma } from "@/lib/utils";
import React from "react";

import { Subtask, Task } from "@/types/task";
import { Checkbox } from "@/components/ui/Checkbox";

export default async function TaskCard() {
  const tasks: Task[] = await prisma.task.findMany();
  const subTask: Subtask[] = await prisma.subtask.findMany();

  return (
    <div>
      {tasks.map((task) => {
        return (
          <Card
            key={task.id}
            className="hover:bg-slate-50 flex justify-between items-center"
          >
            <div className="flex items-center gap-2">
              <Checkbox checked={task.completed} />
              <h1>{task.title}</h1>
            </div>
            <DeleteButton taskId={task.id} />
          </Card>
        );
      })}
    </div>
  );
}
