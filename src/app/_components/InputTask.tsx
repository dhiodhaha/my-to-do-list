"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import React, { useTransition, useRef } from "react";
import { createTask } from "@/lib/actions";

export const InputTask = () => {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await createTask(formData);

      if (result.success) {
        formRef.current?.reset();
      }
    });
  };

  return (
    <form ref={formRef} action={handleSubmit} className="flex gap-4 p-2 ">
      <Input
        placeholder="Add task"
        name="title"
        onKeyDown={handleKeyDown}
        disabled={isPending}
        required
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? "🔃" : "📩"}
      </Button>
    </form>
  );
};
