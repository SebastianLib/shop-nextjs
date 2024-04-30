export const useFilterParams = ({searchParams}:any) =>{
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const size = searchParams.get("size");
    const sort = searchParams.get("sort");
    const params = { search, category, sort, size };
    return params
}