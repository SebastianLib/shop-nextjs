import { Product } from "@prisma/client";

export interface CreateProductParams {
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

  export interface GetProductsParams {
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
  
  export interface ChangeQuantityProps {
    quantity: number;
    id: string;
  }
  

  export interface ShoppingCartProps {
    cart: CartProps | undefined;
    setCart: React.Dispatch<React.SetStateAction<CartProps | undefined>>;
    addProduct: (product: Product) => void;
    changeQuantity: ({ quantity, id }: ChangeQuantityProps) => void;
    removeProduct: (itemId: string) => void;
  }

  export interface OtherFiltersProps{
    id: number,
    name: string,
    value: string 
  }