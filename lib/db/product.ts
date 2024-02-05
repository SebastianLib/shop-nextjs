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

export async function getAllProducts(actualPage: number, skip: number) {

  try {
    const totalProducts = await prisma.product.count()

    const products = await prisma.product.findMany({
      skip: actualPage * skip,
      take: skip
    });
    return {
      products,
      totalProducts
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

export async function getProducts(gender: string, params: { search: string | null, category: string | null, sort: string | null }, actualPage: number, skip: number) {
  const { search, category, sort } = params

  interface OrderBy {
    [key: string]: string;
  }

  const orderBy: OrderBy = {};


  if (sort === "asc" || sort === "desc") {
    orderBy["price"] = sort
  }
  if (sort === "latest" || sort === "oldest") {
    const value = sort === "latest" ? "asc" : "desc";
    orderBy["id"] = value
  }

  const whereCondition: {
    gender: string;
    categoryName?: string;
    name?: { contains: string; mode: any }
  } = {
    gender: gender,
  };
  if (category) {
    whereCondition.categoryName = category;
  }
  if (search) {
    whereCondition.name = { contains: search, mode: "insensitive" };
  }

  try {
    const totalProducts = await prisma.product.count(
      {where: whereCondition}
    )
    const products = await prisma.product.findMany(
      {
        where: whereCondition,
        orderBy: orderBy,
        skip: actualPage * skip,
        take: skip
      }
    );
    return {
      products,
      totalProducts
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
