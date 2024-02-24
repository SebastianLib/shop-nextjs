"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { createCategory } from "@/lib/db/category";
import { createSize } from "@/lib/db/size";
import { useRouter } from "next/navigation";

interface CreateAlertProps{
  type: string
}

const CreateAlert = ({type}:CreateAlertProps) => {
    const [newItem, setnewItem] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const addNewItem = async() => {
        try {
          if(newItem.length == 0) return setError(`${type} name is too short`);
          setLoading(true);
          setOpenModal(true);
          if(type === "category"){
            await createCategory(newItem);
          }else{
            await createSize(newItem);
          }
        } catch (error) {
          setError("Something went wrong...");
        } finally{
          router.refresh();
          setOpenModal(false)
          setLoading(false);
        }
    }

  return (
    <AlertDialog open={openModal}>
    <AlertDialogTrigger className="bg-violet-600 px-4 py-2 text-white rounded-full" onClick={()=>{setOpenModal(true), setError("")}}>Create {type}</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Add new {type}
        </AlertDialogTitle>
        <AlertDialogDescription>
        <Input type="text" placeholder="Category name"
        className="input-field mt-3" 
        onChange={(e)=>setnewItem(e.target.value)}
        />
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter className="flex items-center">
        <AlertDialogCancel onClick={()=>setOpenModal(false)}>Cancel</AlertDialogCancel>
        <AlertDialogAction className="bg-violet-600 mt-2" onClick={addNewItem}>{loading ? `Adding new ${type}...`: "Continue"}</AlertDialogAction>
      </AlertDialogFooter>
      {error && <p>{error}</p>}
    </AlertDialogContent>
  </AlertDialog>
  
  )
}

export default CreateAlert