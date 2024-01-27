"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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
import Alert from "./Alert";
import { useEffect, useState } from "react";
import { getCategories } from "@/lib/db/category";
import { Textarea } from "@/components/ui/textarea";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { createProduct } from "@/lib/db/product";
import { useUser } from "@clerk/nextjs";
import { gender } from "@/lib/utils";
import { useRouter } from 'next/navigation'
import { Bounce, toast } from "react-toastify";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  categoryName: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  price: z.number(),
  gender: z.string(),
});

interface CategoryProps {
  id: string;
  name: string;
}

const CreatePage = () => {
  const [categories, setCategories] = useState<CategoryProps[]>();
  const [image, setImage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [statusNewProduct, setStatusNewProduct] = useState<boolean>(false);
  const router = useRouter();
  const { user } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      categoryName: "",
      description: "",
      price: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!image || !user?.id) return;

    const newProduct = { ...values, image, userId: user?.id };
    try {
      setStatusNewProduct(true)
      await createProduct(newProduct);
      setStatusNewProduct(false)
      toast.success('The product has been added!');
      router.push("/");
    } catch (error: any) {
      setStatusNewProduct(false)
      throw new Error(error)
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData?.categories);
        setLoading(false);

      } catch (error:any) {
        throw new Error(error)
      }
    };

    fetchCategories();
  }, []);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-spin"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
      </div>
    );
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
                      <Alert />
                    </div>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
              
            )}
          />
          <div className="flex gap-4 flex-col">
          
          <div className="h-48 mx-auto w-40 bg-gray-100 border border-gray-400 rounded-xl flex items-center justify-center cursor-pointer">
            {image ? (
              <Image
                alt="image"
                src={image}
                width={200}
                height={200}
                className="w-full h-full object-center object-contain"
              />
            ) : (
              <h2 className="text-gray-500">Product image</h2>
            )}
          </div>
            <div>
              <UploadButton
                endpoint="imageUploader"
                appearance={{
                  button: {
                    background: "#f9fafb",
                    color: "#000",
                    border: "1px solid #CDCDCD",
                    width: "100%",
                    borderRadius: "25px",
                    padding: "27px",
                    marginTop: "7px"
                  },
                }}
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  // console.log("Files: ", res);
                  setImage(res[0].url);
                }}
              />
            </div>
          </div>

          </div>

          <Button
            className="px-4 py-7 rounded-full text-xl md:col-span-2"
            type="submit"
            disabled={statusNewProduct}
          >
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default CreatePage;
