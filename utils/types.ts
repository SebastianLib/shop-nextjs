import { Product} from "@prisma/client";

  export interface CartProps {
    userId?: string | null;
    items:
       {
          product: Product;
          productId: string;
          quantity: number;
        }[]
    quantity?: number;
    totalPrice?: number;
    sold: false;
  }
  
  