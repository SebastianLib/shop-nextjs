import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { stripe } from "@/utils/stripe";
import { Product, ShoppingCartItem } from "@prisma/client";

interface StripeProductParams{
    productId: string,
    quantity: number
}

export async function POST(
  req: Request,
) {
  try {
    const user = await currentUser();
    const { cart } = await req.json();

    let line_items:Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const products:StripeProductParams[] = [];

    
      cart?.items.forEach((item: ShoppingCartItem & {product: Product})=>{
        line_items.push({
          quantity: item.quantity,
          price_data: {
            currency: "USD",
            product_data: {
              name: item.product.name,
            },
            unit_amount: Math.round(item.product.price! * 100),
          }
        });
  
        products.push({
          productId: item.productId,
          quantity: item.quantity,
        });
      })
    
    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let stripeCustomer = await prisma.stripeCustomer.findUnique({
        where: {
          userId: user.id,
        },
        select: {
          stripeCustomerId: true,
        }
      });

      if (!stripeCustomer) {
        const customer = await stripe.customers.create({
          email: user.emailAddresses[0].emailAddress,
        });
  
        stripeCustomer = await prisma.stripeCustomer.create({
          data: {
            userId: user.id,
            stripeCustomerId: customer.id,
          }
        });
      }

      const session = await stripe.checkout.sessions.create({
        customer: stripeCustomer.stripeCustomerId,
        line_items,
        mode: 'payment',
        success_url: process.env.NEXT_PUBLIC_APP_URL +`/completed?success=1`,
        cancel_url: process.env.NEXT_PUBLIC_APP_URL +`/completed?canceled=1`,
        metadata: {
          cartId: cart.id,
          userId: user.id,
        }
      });
      
    return NextResponse.json({url: session.url});
  } catch (error) {
    console.log("[PRODUCT_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}