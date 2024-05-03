"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { createProduct } from "@/lib/db/product";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Category, Size } from "@prisma/client";
import UploadImage from "./UploadImage";
import DescriptionForm from "./DescriptionForm";
import NameForm from "./NameForm";
import SelectForm from "./SelectForm";
import PriceForm from "./PriceForm";
import SelectGenderForm from "./SelectGenderForm";
import PageLayout from "@/components/shared/PageLayout";
import { CreateProductSchema, CreateProductSchemaType } from "@/schemas/createProduct";
import { gender } from "@/constants/gender";

interface FormComponentProps {
  categories: Category[];
  sizes: Size[];
}

const FormComponent = ({ categories, sizes }: FormComponentProps) => {
  const [image, setImage] = useState<string>();
  const [statusNewProduct, setStatusNewProduct] = useState<boolean>(false);
  const router = useRouter();
  const { user } = useUser();
  const form = useForm<CreateProductSchemaType>({
    resolver: zodResolver(CreateProductSchema),
  });

  async function onSubmit(values: z.infer<typeof CreateProductSchema>) {
    if (!image || !user) return;

    const newProduct = { ...values, image, userId: user?.id };

    try {
      setStatusNewProduct(true);
      await createProduct(newProduct);
      toast.success("The product has been added!");
      router.push("/");
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setStatusNewProduct(false);
    }
  }

  return (
    <PageLayout>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-semibold">Create Product</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 w-full"
          >
            <div className="flex flex-col gap-4">
              <NameForm form={form} />
              <DescriptionForm form={form} />
              <SelectGenderForm form={form} values={gender} />
              <PriceForm form={form} />
            </div>

            <div className="flex flex-col gap-4">
              <SelectForm form={form} values={sizes} type="size" />
              <SelectForm form={form} values={categories} type="category" />
              <UploadImage image={image} setImage={setImage} />
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
      </div>
    </PageLayout>
  );
};

export default FormComponent;
