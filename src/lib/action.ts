"use server";

import { prisma } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const taskSchema = z.object({
  title: z.string().trim().min(1, "Title cannot be empty"),
});

export async function createTask(formData: FormData) {
  try {
    revalidatePath("/");
    const rawData = { title: formData.get("title") };

    const validateData = taskSchema.parse(rawData);

    const task = await prisma.task.create({ data: validateData });

    return {
      success: true,
      data: task,
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

async function deleteTask(formData: FormData) {}

async function createSubTask(formData: FormData) {}

async function updateSubTask(formData: FormData) {}

async function deleteSubTask(formData: FormData) {}

async function toogleComplete() {}
