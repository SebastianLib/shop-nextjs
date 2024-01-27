"use server"
import { revalidatePath } from "next/cache";
import { prisma } from "./prisma"

interface CreateCategoryParams {
  newCategory: string;
  path: string;
}

export async function createCategory({ newCategory, path }: CreateCategoryParams) {
  try {
    const newUser = await prisma.category.create({
      data: {
        name: newCategory,
      },
    });
    revalidatePath(path)
    return {
      newUser
    };
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}

export async function getCategories() {

  try {
    const categories = await prisma.category.findMany();
    return {
      categories
    };
  } catch (error) {
    console.error("error loading categories:", error);
    throw error;
  }
}