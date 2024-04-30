export const countQuantityAndPrice = (cartData:any) => {
    const totalQuantity = cartData?.items?.reduce(
        (accumulator:any, currentValue:any) => accumulator + currentValue.quantity,
        0,
      );
    
    const totalPrice = cartData?.items?.reduce(
        (accumulator:any, currentValue:any) => accumulator + currentValue.product.price * currentValue.quantity,
        0,
      );

      return {totalQuantity, totalPrice}
}