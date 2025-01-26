import { prisma } from "@/lib/utils";
import { InputTask } from "./_components/InputTask";
import TaskCard from "@/components/features/task/TaskCard";

export default async function Home() {
  const tasks = await prisma.task.findMany();

  return (
    <div>
      Ini Todolist
      <InputTask />
      <TaskCard />
    </div>
  );
}
