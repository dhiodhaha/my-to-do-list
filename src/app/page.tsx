import { prisma } from "@/lib/utils";
import { InputTask } from "./_components/InputTask";
import TaskCard from "@/components/features/task/TaskCard";
import { Header } from "@/components/sharedUI/Header";

export default async function Home() {
  const tasks = await prisma.task.findMany();

  return (
    <main className="items-center justify-center flex flex-col h-screen">
      <Header />
      <div className="flex flex-col ">
        <InputTask />
        <TaskCard />
      </div>
    </main>
  );
}
