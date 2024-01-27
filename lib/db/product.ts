"use server"
import { prisma } from "./prisma";
export interface ProductParams{
  id?: string;
  userId: string;
  name: string;
  categoryName: string;
  image: string;
  description: string;
  price: number;
  gender: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
export async function createProduct({ ...newProduct }: ProductParams) {
    const {name, categoryName, description, price, image, userId, gender} = newProduct
    try {
      const product = await prisma.product.create({
        data: {
            name,
            categoryName: categoryName,
            description,
            price,
            image,
            userId,
            gender,
            createdAt: new Date(),
        },
      });
      return product
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }

  export async function getAllProducts() {

    try {
      const products = await prisma.product.findMany();
      return {
        products
      };
    } catch (error) {
      console.error("error loading products:", error);
      throw error;
    }
  }
