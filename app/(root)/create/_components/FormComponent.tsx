"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { createProduct } from "@/lib/db/product";
import { useUser } from "@clerk/nextjs";
import { CategoryProps, gender } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Category, Size } from "@prisma/client";
import CreateAlert from "./CreateAlert";
import UploadImage from "./UploadImage";

interface FormComponentProps{
    categories: Category[],
    sizes: Size[]
}

const formSchema = z.object({
  name: z.string().min(2).max(50),
  categoryName: z.string().min(2).max(50),
  size: z.string().min(2).max(50),
  description: z.string().min(2).max(500),
  price: z.number(),
  gender: z.string(),
});

const FormComponent = ({categories, sizes}:FormComponentProps) => {
  const [image, setImage] = useState<string>();
  const [statusNewProduct, setStatusNewProduct] = useState<boolean>(false);
  const router = useRouter();
  const { user } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      categoryName: "",
      description: "",
      size: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!image || !user) return;

    const newProduct = { ...values, image, userId: user?.id };
    try {
      setStatusNewProduct(true);
      await createProduct(newProduct);
      toast.success("The product has been added!");
      router.push("/");
    } catch (error: any) {
      throw new Error(error);
    }finally{
      setStatusNewProduct(false)
    }
  }

  return (
    <section className="flex flex-col items-center mt-40 container">
      <h1 className="text-4xl font-semibold">Create Product</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 w-full"
        >
          <div className="flex flex-col gap-4">
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
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="bg-gray-50 px-4 py-7 rounded-full text-lg text-gray-500">
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {gender?.map((gender) => (
                        <SelectItem
                          key={gender.name}
                          className="py-4"
                          value={gender.name}
                        >
                          {gender.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          </div>

          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="bg-gray-50 px-4 py-7 rounded-full text-lg text-gray-500">
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem
                          key={category.id}
                          className="py-4"
                          value={category.name}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                      <div className="ml-6 my-2">
                        <CreateAlert
                          type="category"
                        />
                      </div>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="bg-gray-50 px-4 py-7 rounded-full text-lg text-gray-500">
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes?.map((item) => (
                        <SelectItem
                          key={item.id}
                          className="py-4"
                          value={item.id}
                        >
                          {item.size}
                        </SelectItem>
                      ))}
                      <div className="ml-6 my-2">
                        <CreateAlert
                          type="size"
                        />
                      </div>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          <UploadImage image={image} setImage={setImage}/>
          </div>

          <Button
            className="px-4 py-7 rounded-full text-xl md:col-span-2"
            type="submit"
            variant="main"
            disabled={statusNewProduct}
          >
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default FormComponent;
