"use server";

import { prisma } from "@/lib/utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const taskSchema = z.object({
  title: z.string().trim().min(1, "Title cannot be empty"),
});

export async function createTask(formData: FormData) {
  try {
    const rawData = { title: formData.get("title") };
    const validateData = taskSchema.parse(rawData);
    const createTask = await prisma.task.create({ data: validateData });
    revalidatePath("/");
    return {
      success: true,
      data: createTask,
      status: 201,
      message: "Task created succesfully",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message, status: 400 };
    }
    return { success: false, error: "Failed to create task", status: 500 };
  }
}

async function updateTask(formData: FormData) {}

export async function deleteTask(formData: FormData) {
  try {
    const taskId = formData.get("id");
    const validateTaskId = z.string().cuid().parse(taskId);

    const deletedTask = await prisma.task.delete({
      where: { id: validateTaskId },
    });
    revalidatePath("/");

    return {
      success: true,
      message: "Task deleted successfully",
      status: 200,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid task ID", status: 400 };
    }

    return { success: false, error: "Failed to delete task", status: 500 };
  }
}

type createSubstaskAction = {
  taskId: string;
  title: string;
  subtaskId?: string;
  isCompleted: boolean;
};

export async function createSubtask({
  taskId,
  title,
}: // subtaskId,
// isCompleted,
createSubstaskAction) {
  try {
    await prisma.subtask.create({
      data: { title, taskId, isCompleted: false },
    });
    revalidatePath("/");
  } catch (error) {}
}

async function updateSubTask(formData: FormData) {}

async function deleteSubTask(formData: FormData) {}

async function toogleComplete() {}
