"use server"

import { revalidatePath } from "next/cache";
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
          userId,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    const quantity = cart?.items.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity, 0
      );

      const totalPrice = cart?.items.reduce(
        (accumulator, currentValue) =>
          accumulator + (currentValue.product?.price || 0) * currentValue.quantity,
        0
      );

      const cartWithQuantity = cart
      ? { ...cart, quantity: quantity || 0, totalPrice: totalPrice || 0  }
      : undefined;

    return cartWithQuantity;
} catch (error) {
    console.error("error loading products:", error);
}
}

export const removeCartItem = async(itemId: string) =>{
try {
 await prisma.shoppingCartItem.delete({
        where: {id:itemId}
    })
    revalidatePath("/cart")
} catch (error) {
    console.error("error while deleting item:", error);
}
}