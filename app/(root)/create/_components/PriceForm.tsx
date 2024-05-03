import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { CreateProductSchema } from '@/schemas/createProduct'

const PriceForm = ({ form }: { form: UseFormReturn<z.infer<typeof CreateProductSchema>> }) => {
  return (
    <FormField
    control={form.control}
    name="price"
    render={({ field }) => (
      <FormItem className="w-full">
        <FormControl>
          <Input
            type="number"
            className="bg-gray-50 px-4 py-7 rounded-full text-xl"
            placeholder="price"
            {...field}
            onChange={(e) => {
              const numericValue = parseFloat(e.target.value);
              field.onChange(numericValue);
            }}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  )
}

export default PriceForm