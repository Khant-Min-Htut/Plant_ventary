"use client";

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
import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";
import { Combobox } from "./ui/combo-box";
import { Textarea } from "./ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { useState } from "react";
import { createPlant } from "@/actions/plant.action";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";

export default function CreateDialog() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stock: 1,
    price: 1,
    category: "",
    userId: "",
    imageUrl: "",
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newPlant = await createPlant(formData);
      console.log("Plant created:", newPlant);
      toast.success("Plant created successfully");
    } catch (error) {
      console.log("Error creating plant", error);
      toast.error("Failed to create!");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="default"
          className="ml-auto font-bold flex items-center gap-2"
        >
          <Sprout className="w-4 h-4" />
          <span className="select-none">Add Plant</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent
        className="
    w-[90vw]
    max-w-md sm:max-w-xl md:max-w-2xl
    rounded-2xl
    p-4 sm:p-6
    bg-background
    flex flex-col
    max-h-[95vh]
    h-[90vh] sm:h-auto
    scrollbar-hide
    overflow-y-auto
    md:overflow-visible
   
    "
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg md:text-xl">
            Add a Plant
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm md:text-base">
            Fill out the form below to add a new plant to your inventory.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name" className="text-sm font-medium">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="category" className="text-sm font-medium">
                Category
              </Label>
              <Combobox
                value={formData.category}
                onChange={(val) => handleChange("category", val)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Type your message here..."
              rows={3}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="stock" className="text-sm font-medium">
                Stock
              </Label>
              <Input
                id="stock"
                type="number"
                placeholder="Enter stock quantity"
                value={formData.stock}
                onChange={(e) => handleChange("stock", Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="price" className="text-sm font-medium">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => handleChange("price", Number(e.target.value))}
              />
            </div>
          </div>

          <div className="pt-2">
            <Label className="text-sm font-medium mb-2 block">
              Upload Image
            </Label>
            <ImageUpload
              endpoint="postImage"
              value={formData.imageUrl}
              onChange={(url) => handleChange("imageUrl", url)}
            />
          </div>

          <AlertDialogFooter className="pt-3 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <AlertDialogCancel className="w-full sm:w-auto">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction type="submit" className="w-full sm:w-auto">
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
