import { getCategories } from "@/lib/db/category";
import { getSizes } from "@/lib/db/size";
import FormComponent from "./_components/ComponentForm";

const CreatePage= async() => {
  const categoriesData = await getCategories();
const sizesData = await getSizes();
  return (
    <FormComponent categories={categoriesData} sizes={sizesData}/>
  )
}

export default CreatePage