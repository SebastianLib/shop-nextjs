"use server"
import { revalidatePath} from "next/cache";
import { prisma } from "./prisma";
import { CartParams } from "../utils";

export const handleCart = async (userId: string, productId: string) => {
    
try {
    const cart = await prisma.shoppingCart.findFirst({
        where: {
            userId: userId,
            sold: false
        }
    });
    
    if(!cart) throw new Error("unauthorized")
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
         await prisma.shoppingCartItem.create({
            data: {
                productId: productId,
                quantity: 1,
                shoppingCartId: cart.id
            }
        })
    }
} catch (error) {
    console.log(error)
} 
}

export const getAnonymousCart = () => {
    const cart = localStorage.getItem('cart');
    if(cart){
        return cart
    }else{
        const anonymousCart = {
            id: "232423",
            userId: "FDSFsdfsdf",
            sold: false,
            items: [],
        }
        localStorage.setItem('cart', JSON.stringify(anonymousCart));
        return anonymousCart
    }
}

export const getCart = async (userId: string) => {
    try {
        const cart = await prisma.shoppingCart.findFirst({
            where: {
                userId,
                sold: false
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        if(cart){
           const {quantity, totalPrice} = changeQuantityAndPrice(cart)

            const cartWithQuantity = cart
                ? { ...cart, quantity: quantity || 0, totalPrice: totalPrice || 0 }
                : undefined;
    
            return cartWithQuantity;
        }
        else{
            await prisma.shoppingCart.create({
                data: {
                    userId: userId,
                }
            })
            const cart = await prisma.shoppingCart.findFirst({
                where: {
                    userId,
                    sold: false
                },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                },
            });

            const {quantity, totalPrice} = changeQuantityAndPrice(cart!)
            const cartWithQuantity = cart
                ? { ...cart, quantity: quantity || 0, totalPrice: totalPrice || 0 }
                : undefined;
    
            return cartWithQuantity;
        }
        
    } catch (error) {
        console.error("error loading products:", error);
    }
}

const changeQuantityAndPrice = (cart:CartParams ) => {
    const quantity = cart?.items.reduce(
        (accumulator, currentValue) => accumulator + currentValue.quantity, 0
    );
    const totalPrice = cart?.items.reduce(
        (accumulator, currentValue) =>
            accumulator + (currentValue.product?.price || 0) * currentValue.quantity,
        0
    );
    return {quantity, totalPrice}
}

export const removeCartItem = async (itemId: string) => {
    try {
        await prisma.shoppingCartItem.delete({
            where: { id: itemId }
        })
    } catch (error) {
        console.error("error while deleting item:", error);
    }

    revalidatePath("/cart")
}

export const changeQuantityCartItem = async (id: string, quantity: number) => {
    
    try {
        await prisma.shoppingCartItem.update({
            where: { id },
            data: { quantity: quantity }
        })
    } catch (error) {
        console.error("error while update item:", error);
    }
    revalidatePath("/cart")
}