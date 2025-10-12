"use client";
import { Search } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { clsx } from "clsx";
import { useState } from "react";
import { getPlants } from "@/actions/plant.action";
import { Combobox } from "./ui/combo-box";

type Plants = Awaited<ReturnType<typeof getPlants>>;

interface InventaryTableProps {
  plants: Plants;
}

export function InventaryTable({ plants }: InventaryTableProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlants = plants?.userPlants?.filter(
    (plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || plant.category === selectedCategory)
  );

  return (
    <div className="w-full ">
      <div className="flex items-center gap-2 py-4">
        <div className="relative max-w--sm w-full">
          <Input
            placeholder="Filter plants..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <Combobox
          value={selectedCategory}
          onChange={(val) => setSelectedCategory(val)}
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plant ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPlants?.map((plant) => (
            <TableRow key={plant.id}>
              <TableCell>{plant.id}</TableCell>
              <TableCell>{plant.name}</TableCell>
              <TableCell>{plant.category}</TableCell>
              <TableCell>{plant.price}</TableCell>
              <TableCell className="font-bold">{plant.stock}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-4">
                  <h1>Edit Button</h1>
                  <h1>Delete </h1>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
