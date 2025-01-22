import { Card } from "@/components/ui/Card";

import { prisma } from "@/utils/prisma";

export default async function Home() {
  const tasks = await prisma.task.findMany();

  async function addNewTask(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;

    await prisma.task.create({ data: { title } });
  }

  return (
    <div>
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
