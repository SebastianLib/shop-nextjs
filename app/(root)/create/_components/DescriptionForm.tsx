import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { CreateProductSchema } from "@/schemas/createProduct";

const DescriptionForm = ({
  form,
}: {
  form: UseFormReturn<z.infer<typeof CreateProductSchema>>;
}) => {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormControl className="bg-gray-50 px-4 pb-[59px] rounded-2xl text-lg text-gray-500">
            <Textarea
              placeholder="Add some informations about this product"
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DescriptionForm;
