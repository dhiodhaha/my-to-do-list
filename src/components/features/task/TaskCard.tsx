import { DeleteButton } from "@/app/_components/DeleteButton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { prisma } from "@/lib/utils";
import React from "react";

export default async function TaskCard() {
  const tasks = await prisma.task.findMany();

  return (
    <div>
      {tasks.map((task) => {
        return (
          <Card
            key={task.id}
            className="hover:bg-slate-50 flex justify-between"
          >
            <h1>{task.title}</h1> <DeleteButton taskId={task.id} />
          </Card>
        );
      })}
    </div>
  );
}
