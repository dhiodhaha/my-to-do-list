import { prisma } from "@/lib/prisma";
import { TaskCard } from "./TaskCard";

export const TaskList = async () => {
  const tasks = await prisma.task.findMany({
    include: { subtask: true },
    // orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};
