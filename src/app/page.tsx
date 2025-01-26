// import { TaskList } from "@/components/TaskList";
import { InputTask } from "./_components/InputTask";
import { Header } from "@/components/sharedUI/Header";
import { TaskList } from "./_components/TaskList";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4 md:p-8">
      <Header />
      <div className="w-full max-w-2xl space-y-8 mt-12">
        <InputTask />
        <TaskList />
      </div>
    </main>
  );
}
