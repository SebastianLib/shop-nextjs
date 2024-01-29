"use server"

import { prisma } from "./prisma";

export const handleCart = async (userId: string, productId: string) => {

    let cart = await prisma.shoppingCart.findUnique({
        where: {
            userId: userId,
        }
    });

    if (!cart) {
        cart = await prisma.shoppingCart.create({
            data: {
                userId: userId,
            }
        })

    }

    const cartItem = await prisma.shoppingCartItem.findFirst({
        where: {
            productId: productId,
            shoppingCartId: cart.id
        }
    })

    if (cartItem) {
        await prisma.shoppingCartItem.update({
            where: {
                id: cartItem.id
            },
            data: {
                quantity: {
                    increment: 1
                }
            }
        })

    } else {
        const newCartItem = await prisma.shoppingCartItem.create({
            data: {
                productId: productId,
                quantity: 1,
                shoppingCartId: cart.id
            }
        })
    }

}

export const getCart = async(userId:string) => {
try {
    const cart = await prisma.shoppingCart.findUnique({
        where: {
            userId
        },
        include:{
            items: true
        }
    });
    return cart
} catch (error) {
    console.error("error loading products:", error);
}
}