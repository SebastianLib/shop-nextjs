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

interface SelectGenderFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  values: {name: string}[];
}

const SelectGenderForm = ({ form, values }: SelectGenderFormProps) => {
  return (
    <FormField
      control={form.control}
      name="gender"
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange}>
            <FormControl className="bg-gray-50 px-4 py-7 rounded-full text-lg text-gray-500">
              <SelectTrigger>
                <SelectValue placeholder="select gender" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
                {values.map((value)=>(
                    <SelectItem key={value.name} value={value.name}>{value.name}</SelectItem>
                ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectGenderForm;
