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
import { usePathname } from "next/navigation";

const CreateAlert = () => {
  const path = usePathname();
    const [newCategory, setNewCategory] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const addNewCategory = async() => {
        try {
          if(newCategory.length == 0) return setError("category name is too short");
          setLoading(true);
          setOpenModal(true);
          await createCategory({newCategory, path});
          setOpenModal(false)
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setError("Something went wrong...");
        } 
    }

  return (
    <AlertDialog open={openModal}>
    <AlertDialogTrigger className="bg-violet-600 px-4 py-2 text-white rounded-full" onClick={()=>{setOpenModal(true), setError("")}}>Create category</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Add new category
        </AlertDialogTitle>
        <AlertDialogDescription>
        <Input type="text" placeholder="Category name"
        className="input-field mt-3" 
        onChange={(e)=>setNewCategory(e.target.value)}
        />
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
          <AlertDialogCancel onClick={()=>setOpenModal(false)}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={addNewCategory}>{loading ? "Adding new cateogry...": "Continue"}</AlertDialogAction>
      </AlertDialogFooter>
      {error && <p>{error}</p>}
    </AlertDialogContent>
  </AlertDialog>
  
  )
}

export default CreateAlert