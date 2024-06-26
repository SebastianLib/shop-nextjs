"use server"
import { getCategoryId } from "./category";
import { prisma } from "./prisma";
import { getSizeId } from "./size";
import { CreateProductParams, GetProductsParams } from "@/types/types";


export async function createProduct(newProduct: CreateProductParams) {
  try {
    const product = await prisma.product.create({
      data: {
        ...newProduct,
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
      take: 7,
      orderBy: {
        id: 'desc',
      }
    });
    return products
  } catch (error) {
    console.error("error loading products:", error);
    throw error;
  }
}

export async function getProducts({ gender, params, actualPage, skip }: GetProductsParams) {

  const { search, category, sort, size } = params

  let sizeId
  if (size) {
    sizeId = await getSizeId(size)
  }
  let categoryId
  if (category) {
    categoryId = await getCategoryId(category)
  }

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
    categoryId?: string;
    name?: { contains: string; mode: any };
    sizeId?: string
  } = {
    categoryId: categoryId,
    sizeId: sizeId,
  };

  if (search) {
    whereCondition.name = { contains: search, mode: "insensitive" };
  }


  try {
    
    if (gender) {
      const totalProducts = await prisma.product.count(
        {where: {
          ...whereCondition, OR: [
            {
              gender: gender
            },
            { gender: "Both" },
          ],
        },}
      )
      const products = await prisma.product.findMany(
        {
          where: {
            ...whereCondition, OR: [
              {
                gender: gender
              },
              { gender: "Both" },
            ],
          },
          orderBy: orderBy,
          skip: actualPage * skip,
          take: skip
        }
      );
      
      return {
        products,
        totalProducts
      };
    } else {
      const totalProducts = await prisma.product.count(
        {where: whereCondition}
      )
      const products = await prisma.product.findMany(
        {
          where: { ...whereCondition },
          orderBy: orderBy,
          skip: actualPage * skip,
          take: skip
        }
      );
      return {
        products,
        totalProducts
      };
    }
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
        },
        include: {
          size: true
        }
      }
    );
    return product
  } catch (error) {
    console.error("error loading products:", error);
    throw error;
  }
}
