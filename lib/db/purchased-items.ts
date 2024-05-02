"use server"
import { prisma } from "./prisma";

export const getPurchasedItems = async (userId: string) => {

    try {

        const purchasedItems = prisma.shoppingCart.findMany({
            where: {
                userId,
                sold: true,
            },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                size: true,
                                category: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                id: "desc"
            },
        })

        return purchasedItems
    } catch (error) {
        console.error("error loading products:", error);
    }
}

export async function getBestsellers() {
    try {
        const purchasedItems = await prisma.shoppingCartItem.groupBy({
            by: "productId",
            _sum:{quantity: true},
              orderBy:{
                _sum:{
                    quantity: "desc"
                }
              },
              take: 7,
        },)
        
        const values = purchasedItems.map(item => item.productId)

        const products = await prisma.product.findMany({
            where:{
                id: { in: values}
            }
        })
        return products
    } catch (error) {
        console.error("error loading bestsellers:", error);
        throw error;
    }
}
