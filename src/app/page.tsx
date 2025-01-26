import { prisma } from "@/lib/prisma";
import { InputTask } from "./_components/InputTask";
// import TaskCard from "@/components/features/task/TaskList";
import { Header } from "@/components/sharedUI/Header";

export default async function Home() {
  const tasks = await prisma.task.findMany();

  return (
    <main className="items-center justify-center flex flex-col h-screen">
      <Header />
      <div className="flex flex-col ">
        <InputTask />
        {/* <TaskCard /> */}
      </div>
    </main>
  );
}
