"use client"
interface PaginationPositionProps{
  actualPage: number,
  totalProductsPages: number,
}

export const paginationPosition = ({actualPage, totalProductsPages}:PaginationPositionProps)=>{
  const numberOfItems = 3;  
  const actualPaginationPosition: {value:number | null}[] = []  

  if (actualPage && totalProductsPages) {
        for (let i = 0; i < numberOfItems; i++) {
          if (
            (actualPage === 1 && i === 0) ||
            i + (actualPage - 1) > totalProductsPages
          ) {
            actualPaginationPosition.push({ value: null });
          } else {
            actualPaginationPosition.push({ value: i + (actualPage - 1) });
          }
        }
      }
      
      return actualPaginationPosition;
}