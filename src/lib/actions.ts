"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Shared schemas
const taskSchema = z.object({
  title: z.string().trim().min(1, "Title cannot be empty"),
});

const idSchema = z.string().cuid();

const subtaskSchema = taskSchema.extend({
  taskId: idSchema,
});

// Response handler
const handleResponse = async <T>(
  operation: () => Promise<T>,
  successMessage: string
): Promise<{
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  status?: number;
}> => {
  try {
    const result = await operation();
    revalidatePath("/");
    return { success: true, message: successMessage, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: "Operation failed", status: 500 };
  }
};

// Helper function to parse and validate form data
const parseAndValidate = <T>(schema: z.ZodSchema<T>, data: unknown) => {
  return schema.parse(data);
};

// Task Actions
export const createTask = async (formData: FormData) => {
  const rawData = { title: formData.get("title") };
  try {
    const validatedData = parseAndValidate(taskSchema, rawData);
    return await handleResponse(
      () => prisma.task.create({ data: validatedData }),
      "Task created successfully"
    );
  } catch (error) {
    console.error("Creation error:", error);
    return { success: false, error: "Failed to create task", status: 500 };
  }
};

export const deleteTask = async (formData: FormData) => {
  const taskId = formData.get("id");
  try {
    const validatedId = parseAndValidate(idSchema, taskId);
    return await handleResponse(
      () =>
        prisma.task.delete({
          where: { id: validatedId },
          include: { subtask: true },
        }),
      "Task deleted successfully"
    );
  } catch (error) {
    console.error("Creation error:", error);
    return { success: false, error: "Failed to delete task", status: 500 };
  }
};

// Subtask Actions
export const createSubtask = async (formData: FormData) => {
  const rawData = {
    title: formData.get("title"),
    taskId: formData.get("taskId"),
  };
  try {
    const validatedData = parseAndValidate(subtaskSchema, rawData);
    return await handleResponse(
      () =>
        prisma.subtask.create({
          data: { ...validatedData, isCompleted: false },
        }),
      "Subtask created successfully"
    );
  } catch (error) {
    console.error("Creation error:", error);
    return { success: false, error: "Failed to create subtask", status: 500 };
  }
};

export const toggleTaskCompletion = async (
  taskId: string,
  completed: boolean
) => {
  try {
    const validatedId = parseAndValidate(idSchema, taskId);
    return await handleResponse(
      () =>
        prisma.task.update({
          where: { id: validatedId },
          data: { isCompleted: !completed },
        }),
      "Task completion toggled successfully"
    );
  } catch (error) {
    console.error("Creation error:", error);
    return {
      success: false,
      error: "Failed to toggle task completion",
      status: 500,
    };
  }
};

export const toggleSubtaskCompletion = async (
  subtaskId: string,
  isCompleted: boolean
) => {
  try {
    const validatedId = parseAndValidate(idSchema, subtaskId);
    return await handleResponse(
      () =>
        prisma.subtask.update({
          where: { id: validatedId },
          data: { isCompleted: !isCompleted },
        }),
      "Subtask completion toggled successfully"
    );
  } catch (error) {
    console.error("Creation error:", error);
    return {
      success: false,
      error: "Failed to toggle subtask completion",
      status: 500,
    };
  }
};
