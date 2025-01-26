import TaskCard from "@/app/_components/TaskCard";
import { prisma } from "@/lib/utils";
import { Task } from "@/types/task";

export default async function TaskList() {
  const tasks: Task[] = await prisma.task.findMany();

  return (
    <div>
      {tasks.map((task) => {
        return <TaskCard />;
      })}
    </div>
  );
}
