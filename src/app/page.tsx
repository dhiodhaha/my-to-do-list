import { prisma } from "@/lib/prisma";
import { TaskList } from "./_components/TaskList";
import { InputTask } from "./_components/InputTask";

export default async function Home() {
  const tasks = await prisma.task.findMany({
    include: { subtask: true },
    // orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="max-w-2xl mx-auto p-4">
      <InputTask />
      <TaskList initialTasks={tasks} />
    </main>
  );
}
