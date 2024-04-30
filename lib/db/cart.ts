"use server"
import { Product } from "@prisma/client";
import { prisma } from "./prisma";
import { CartWithProducts } from "@/utils/types";


// export const getCart = async (userId: string | null) => {
//     if (!userId) return null
//     let cart: CartWithProducts | null

//     try {
//         cart = await prisma.shoppingCart.findFirst({
//             where: {
//                 userId,
//                 sold: false
//             },
//             include: {
//                 items: {
//                     include: {
//                         product: true,
//                     },
//                 },
//             },
//         });
//         if (!cart) {
//             cart = await prisma.shoppingCart.create({
//                 data: {
//                     userId: userId,
//                 },
//                 include: {
//                     items: {
//                         include: {
//                             product: true,
//                         },
//                     },
//                 },
//             })
//         }
//         const { quantity, totalPrice } = changeQuantityAndPrice(cart)
//         return { ...cart, quantity: quantity || 0, totalPrice: totalPrice || 0 }

//     } catch (error) {
//         console.error("error loading products:", error);
//     }
// }

// export const handleCart = async (userId: string, productId: string) => {

//     try {
//         const cart = await getCart(userId)

//         if (!cart) throw new Error("unauthorized")
//         const cartItem = await prisma.shoppingCartItem.findFirst({
//             where: {
//                 productId: productId,
//                 shoppingCartId: cart.id
//             }
//         })

//         if (cartItem) {
//             await prisma.shoppingCartItem.update({
//                 where: {
//                     id: cartItem.id
//                 },
//                 data: {
//                     quantity: {
//                         increment: 1
//                     }
//                 }
//             })
//         } else {
//             await prisma.shoppingCartItem.create({
//                 data: {
//                     productId: productId,
//                     quantity: 1,
//                     shoppingCartId: cart.id
//                 }
//             })
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// export const changeQuantityAndPrice = (cart: CartWithProducts) => {
//     const quantity = cart?.items.reduce(
//         (accumulator, currentValue) => accumulator + currentValue.quantity, 0
//     );
//     const totalPrice = cart?.items.reduce(
//         (accumulator, currentValue) =>
//             accumulator + (currentValue.product?.price || 0) * currentValue.quantity,
//         0
//     );

//     return { quantity, totalPrice }
// }


// export const removeCartItem = async (itemId: string) => {
//     try {
//         await prisma.shoppingCartItem.delete({
//             where: { id: itemId }
//         })
//         return
//     } catch (error) {
//         console.error("error while deleting item:", error);
//     }

// }

// export const changeQuantityCartItem = async (id: string, quantity: number) => {

//     try {
//         await prisma.shoppingCartItem.update({
//             where: { id },
//             data: { quantity: quantity }
//         })
//         return quantity
//     } catch (error) {
//         console.error("error while update item:", error);
//     }
// }
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
