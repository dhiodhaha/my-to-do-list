import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import React from "react";

export const InputForm = () => {
  return (
    <form className="flex gap-4 p-2">
      <Input placeholder="Add task" required />
      <Button>Submit Task</Button>
    </form>
  );
};
