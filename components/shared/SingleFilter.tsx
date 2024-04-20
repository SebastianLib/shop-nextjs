// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Category, Size } from "@prisma/client";

// interface SingleFilter{
//     data: Category[] | Size[],
//     handleSearchParams: (name:string, value:string) => void,
//     type: "category" | "size" | ""
// }

// const SingleFilter = ({data, handleSearchParams, type}:SingleFilter) => {
//   return (
//     <Select onValueChange={(value) => handleSearchParams("category", value)}>
//       <SelectTrigger className="w-[180px]">
//         <SelectValue placeholder="Category" />
//       </SelectTrigger>
//       <SelectContent>
//         <SelectItem value="all">All</SelectItem>
//         {data?.map((item) => (
//           <SelectItem key={item.id} value={item.name}>
//             {item.name}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   );
// };

// export default SingleFilter;
