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