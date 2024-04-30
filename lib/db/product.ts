"use server"
import { useParams } from "next/navigation";
import { getCategoryId } from "./category";
import { prisma } from "./prisma";
import { getSizeId } from "./size";

export interface ProductParams {
  id?: string;
  userId: string;
  name: string;
  categoryId: string;
  image: string;
  description: string;
  price: number;
  gender: string;
  sizeId: string
}
export async function createProduct( newProduct : ProductParams) {
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
      take: 10,
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

interface GetProductsParams {
  gender: string,
  params: {
    search: string | null,
    category: string | null,
    sort: string | null,
    size: string | null
  },
  actualPage: number,
  skip: number
}

export async function getProducts({gender, params, actualPage, skip}:GetProductsParams) {
  const { search, category, sort, size } = params
    
  let sizeId
    if(size){
      sizeId = await getSizeId(size)
    }
  let categoryId
    if(category){
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
    gender: string;
    categoryId?: string;
    name?: { contains: string; mode: any };
    sizeId?: string
  } = {
    gender: gender,
  };
  if (categoryId) {
    whereCondition.categoryId = categoryId;
  }
  if (search) {
    whereCondition.name = { contains: search, mode: "insensitive" };
  }
  if (sizeId) {
    whereCondition.sizeId = sizeId;
  }

  try {
    const totalProducts = await prisma.product.count(
      { where: whereCondition }
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
        },
        include:{
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
