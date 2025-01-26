import { Card } from "@/components/ui/Card";

import { prisma } from "@/lib/utils";
import { InputTask } from "./_components/InputTask";

export default async function Home() {
  const tasks = await prisma.task.findMany();

  return (
    <div>
      Ini Todolist
      <InputTask />
      {tasks.map((task) => {
        return (
          <Card key={task.id}>
            <h1>{task.title}</h1>
          </Card>
        );
      })}
    </div>
  );
}
