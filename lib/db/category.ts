"use server"
import { prisma } from "./prisma"

export async function createCategory(newItem:string) {
  try {
    const newUser = await prisma.category.create({
      data: {
        name: newItem,
        createdAt: new Date(),
      },
    });
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
    return categories
  } catch (error) {
    console.error("error loading categories:", error);
    throw error;
  }
}