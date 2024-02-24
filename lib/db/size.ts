"use server"
import { prisma } from "./prisma";

export async function getSizes() {
    try {
      const sizes = await prisma.size.findMany();
      return sizes
    } catch (error) {
      console.error("error loading sizes:", error);
      throw error;
    }
  }

export async function getSizeId(size:string) {
    try {
      const selectedSize = await prisma.size.findUnique({
        where:{
          size: size
        },
      });

      return selectedSize?.id
    } catch (error) {
      console.error("error loading sizes:", error);
      throw error;
    }
  }

  export async function createSize(newItem:string) {
    try {
      const newUser = await prisma.size.create({
        data: {
          size: newItem,
          createdAt: new Date(),
        },
      });
      return {
        newUser
      };
    } catch (error) {
      console.error("Error creating size:", error);
      throw error;
    }
  }