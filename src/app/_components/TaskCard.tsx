import { Card } from "@/components/ui/Card";
import React from "react";
import type { Task } from "@/types/task";
import { prisma } from "@/lib/prisma";
import { DeleteButton } from "./DeleteButton";

export default async function TaskCard({ tasks }) {
  const tasks: Task[] = await prisma.task.findMany();

  return (
    <Card
      key={tasks.id}
      className="hover:bg-slate-50 flex justify-between items-center"
    >
      <div className="flex items-center gap-2">
        {/* <Checkbox checked={task.completed} /> */}
        <h1>{tasks.title}</h1>
      </div>

      <DeleteButton taskId={tasks.id} />
    </Card>
  );
}
