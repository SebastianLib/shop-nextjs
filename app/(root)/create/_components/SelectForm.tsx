import React from "react";
import { UseFormReturn } from "react-hook-form";
import { formSchema } from "./ComponentForm";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, Size } from "@prisma/client";
import CreateAlert from "./CreateAlert";

interface SelectFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  values: Category[] | Size[] | { name: string }[];
  type: "categoryName" | "size" | "gender";
}

const SelectForm = ({ form, values, type }: SelectFormProps) => {
  return (
    <FormField
      control={form.control}
      name={type === "size" ? "sizeId": type}
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange}>
            <FormControl className="bg-gray-50 px-4 py-7 rounded-full text-lg text-gray-500">
              <SelectTrigger>
                <SelectValue
                  placeholder={`Select ${
                    type === "categoryName" ? "category" : type
                  }`}
                />
              </SelectTrigger>
            </FormControl>
            {type === "gender" || type === "categoryName" ? (
              <SelectContent>
                {values?.map(
                  (value) =>
                    "name" in value && (
                      <SelectItem
                        key={value.name}
                        className="py-4"
                        value={value.name}
                      >
                        {value.name}
                      </SelectItem>
                    )
                )}
                {type === "categoryName" && (
                  <div className="ml-6 my-2">
                    <CreateAlert type={type} />
                  </div>
                )}
              </SelectContent>
            ) : (
              <SelectContent>
                {values?.map(
                  (value) =>
                    "size" in value && (
                      <SelectItem
                        key={value.size}
                        className="py-4"
                        value={value.id}
                      >
                        {value.size}
                      </SelectItem>
                    )
                )}
                <div className="ml-6 my-2">
                  <CreateAlert type={type} />
                </div>
              </SelectContent>
            )}
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectForm;
