"use server";

import { prisma } from "@/lib/utils";
import { z } from "zod";

const InputSchema = z.object({});

async function createTask(formData: FormData) {
  const title = formData.get("title") as string;

  await prisma.task.create({ data: { title } });
}

async function updateTask(formData: FormData) {}

async function deleteTask(formData: FormData) {}

async function createSubTask(formData: FormData) {}

async function updateSubTask(formData: FormData) {}

async function deleteSubTask(formData: FormData) {}
