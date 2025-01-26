"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Shared schemas
const taskSchema = z.object({
  title: z.string().trim().min(1, "Title cannot be empty"),
});

const idSchema = z.string().cuid();

// Response handler
const handleResponse = async (
  operation: () => Promise<any>,
  successMessage: string
) => {
  try {
    const result = await operation();
    revalidatePath("/");
    return { success: true, message: successMessage, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: "Operation failed" };
  }
};

// Task Actions
export const createTask = async (formData: FormData) => {
  const rawData = { title: formData.get("title") };
  const validatedData = taskSchema.parse(rawData);
  return handleResponse(
    () => prisma.task.create({ data: validatedData }),
    "Task created successfully"
  );
};

export const deleteTask = async (formData: FormData) => {
  const taskId = idSchema.parse(formData.get("id"));
  return handleResponse(
    () => prisma.task.delete({ where: { id: taskId } }),
    "Task deleted successfully"
  );
};

// Subtask Actions
const subtaskSchema = taskSchema.extend({
  taskId: idSchema,
});

// actions.ts (Update createSubtask action)
export async function createSubtask(formData: FormData) {
  try {
    const rawData = {
      title: formData.get("title"),
      taskId: formData.get("taskId"),
    };
    const validatedData = subtaskSchema.parse(rawData);

    await prisma.subtask.create({
      data: { ...validatedData, isCompleted: false },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    // Handle errors
  }
}

// actions.ts (Add this new action)
export async function toggleTaskCompletion(taskId: string, completed: boolean) {
  try {
    await prisma.task.update({
      where: { id: taskId },
      data: { isCompleted: !completed },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update task" };
  }
}

export const toggleSubtaskCompletion = async (
  subtaskId: string,
  isCompleted: boolean
) => {
  try {
    await prisma.subtask.update({
      where: { id: subtaskId },
      data: { isCompleted: !isCompleted },
    });
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update subtask" };
  }
};
