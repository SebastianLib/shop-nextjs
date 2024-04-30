"use server"
import { Product } from "@prisma/client";
import { prisma } from "./prisma";
interface CartProps {
    userId?: string | null;
    items:
    | {
        product: Product;
        productId: string;
        quantity: number;
    }[]
    | [];
    quantity?: number;
    totalPrice?: number;
    sold: false;
}

export const createNewCart = async (data: CartProps) => {
    const { userId, items, sold } = data
    if (!userId) return
    try {
        const cart = await prisma.shoppingCart.create({
            data: {
                userId: userId,
                sold: sold,
            },
        })
        items.forEach(async (item) => {
            const newItem = await prisma.shoppingCartItem.create({
                data: {
                    shoppingCartId: cart.id,
                    quantity: item.quantity,
                    productId: item.productId,
                },
            })
        })
        const currentCart = await prisma.shoppingCart.findUnique({
            where: {
                id: cart.id
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
            }
        })
        return currentCart
    }
    catch (error) {
        console.error("error loading products:", error);
    }
}
