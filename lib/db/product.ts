"use server"
import { prisma } from "./prisma";

export interface ProductParams {
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
  const { name, categoryName, description, price, image, userId, gender } = newProduct
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

export async function getLatestProducts() {

  try {
    const products = await prisma.product.findMany({
      take: 10,
      orderBy: {
        id: 'desc',
      }
    });
    return {
      products
    };
  } catch (error) {
    console.error("error loading products:", error);
    throw error;
  }
}

export async function getProducts(gender: string, params: { search: string | null; category: string | null }) {
  const {search, category} = params
  const whereCondition:{
    gender: string;
    categoryName?: string;
    name?: { contains: string; mode:any}
  } = {
    gender: gender,
  };
  if (category) {
    whereCondition.categoryName = category;
  }
  if (search) {
    whereCondition.name = { contains: search, mode: "insensitive" };
  }

  console.log(whereCondition);
  
  try {
    const products = await prisma.product.findMany(
      {
        where: whereCondition
      }
    );
    return {
      products
    };
  } catch (error) {
    console.error("error loading products:", error);
    throw error;
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique(
      {
        where: {
          id
        }
      }
    );
    return {
      product
    };
  } catch (error) {
    console.error("error loading products:", error);
    throw error;
  }
}
