import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { formSchema } from './ComponentForm'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'

const NameForm = ({ form }: { form: UseFormReturn<z.infer<typeof formSchema>> }) => {
  return (
    <FormField
    control={form.control}
    name="name"
    render={({ field }) => (
      <FormItem className="w-full">
        <FormControl>
          <Input
            className="bg-gray-50 px-4 py-7 rounded-full text-xl"
            placeholder="name"
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  )
}

export default NameForm