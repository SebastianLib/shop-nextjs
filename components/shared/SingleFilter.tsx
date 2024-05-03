import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OtherFiltersProps } from "@/types/types";
import { Category, Size } from "@prisma/client";

interface SingleFilter {
  data: Category[] | Size[] | OtherFiltersProps[];
  handleSearchParams: (name: string, value: string) => void;
  type: "category" | "size" | "sort";
}

const SingleFilter = ({ data, handleSearchParams, type }: SingleFilter) => {
    
  return (
    <Select onValueChange={(value) => handleSearchParams(type, value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={type} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {data?.map((item) => {
          if (type === "category" || type === "sort") {
            return (
              <SelectItem key={item.id} value={(item as Category | OtherFiltersProps).name}>
                {(item as Category | OtherFiltersProps).name}
              </SelectItem>
            );
          } else {
            return (
              <SelectItem key={item.id} value={(item as Size).size}>
                {(item as Size).size}
              </SelectItem>
            );
          }
        })}
      </SelectContent>
    </Select>
  );
};

export default SingleFilter;
