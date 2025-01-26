"use client";

import { Button } from "@/components/ui/Button";
import { deleteTask } from "@/lib/action";
import { useTransition } from "react";

export const DeleteButton = ({ taskId }: { taskId: string }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.set("id", taskId);
      await deleteTask(formData);
    });
  };

  return (
    <form action={handleDelete}>
      <input type="hidden" name="id" value={taskId} />
      <Button
        type="submit"
        variant="destructive"
        disabled={isPending}
        aria-label="Delete task"
      >
        {isPending ? "Deleting ...." : "Delete"}
      </Button>
    </form>
  );
};
