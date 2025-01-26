"use client";

import { Button } from "@/components/ui/Button";
import { deleteTask } from "@/lib/actions";
import { useTransition } from "react";

export const DeleteButton = ({
  taskId,
  isVisible,
}: {
  taskId: string;
  isVisible: boolean;
}) => {
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
        className={` transition-opacity ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {isPending ? "Deleting ...." : "🗑️"}
      </Button>
    </form>
  );
};
