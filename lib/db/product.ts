"use server"
import { prisma } from "./prisma";
interface CreateProductParams{
    name: string;
    category: string;
    description: string;
    price: number;
    image: string;
    userId: string;
    gender: string;
}
export async function createProduct({ ...newProduct }: CreateProductParams) {
    const {name, category, description, price, image, userId, gender} = newProduct
    try {
      const product = await prisma.product.create({
        data: {
            name,
            categoryName: category,
            description,
            price,
            image,
            userId,
            gender
        },
      });
      return product
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }
