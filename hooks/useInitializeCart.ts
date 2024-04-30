

export const useInitializeCart = (userId?:string | null | undefined) => {
  const cartData = typeof window !== 'undefined' ? localStorage.getItem("cart") : null;
    if (cartData) {
      const parsedCartData = JSON.parse(cartData);
      if(userId === parsedCartData.userId){
        return(parsedCartData);
      }
      if(parsedCartData.userId === null){
        return({...parsedCartData, userId: userId || null})
      }
      else{
        return({
            userId: userId || null,
            items: [],
            quantity: 0,
            totalPrice: 0,
            sold: false,
          });
      }
    } else {
      return({
        userId: userId || null,
        items: [],
        quantity: 0,
        totalPrice: 0,
        sold: false,
      });
    }
  };