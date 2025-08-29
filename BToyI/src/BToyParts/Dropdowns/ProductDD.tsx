import type { Row } from "@tanstack/react-table";
import type { Product } from "../../products/columns.tsx";

import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    //DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';

import { Separator } from '@/components/ui/separator';

import ProductName from '../ProductDialog/components2/ProductName';
import Price from '../ProductDialog/components2/Price';
import {ProductCategory} from '../ProductDialog/components2/ProductCategory';
import Stock from '../ProductDialog/components2/Stock';
import ExpiryDate from '../ProductDialog/components2/ExpiryDate';
import { useProductActions } from '@/products/productData';
//import { useProducts } from '@/products/productData';
import * as React from "react";







export default function ProductDD({ row }: { row: Row<Product> }) {
  const { updateProduct, getProductById, deleteProduct} = useProductActions();

  const [id] = React.useState(row.original.id);
  const [productName, setName] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [unitPrice, setPrice] = React.useState(0.0);
  const [stock, setStock] = React.useState(0);
  const [expDate, setExpiryDate] = React.useState('');
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = async () => {
    try {
      const product = await getProductById(id);
      setName(product.productName ?? '');
      setCategory(product.category ?? '');
      setPrice(product.unitPrice ?? 0.0);
      setStock(product.stock ?? 0);
      setExpiryDate(normalizeDate(product.expDate));
      setOpenDialog(true);
      console.log(product);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            className="flex items-center gap-1 p-[10px]"
            onClick={handleOpenDialog}
          >
            <FaRegEdit />
            <span>Edit</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          
          <DropdownMenuItem
            className="flex items-center gap-1 p-[10px] text-red-600"

            onClick={
              () => {
                const confirmed = window.confirm("Are you sure you want to delete this product?");
                if (confirmed) {
                  deleteProduct(id)
                    .then(() => console.log("Producto eliminado correctamente"))
                    .catch((error) => console.error("Error al eliminar producto:", error));
                }
              }
            }
          >
            <MdOutlineDelete className="text-lg" />
            <span>Delete</span>
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="p-7 px-8">
          <DialogHeader>
            <DialogTitle className="text-[22px]">Edit Product</DialogTitle>
            <DialogDescription>
              Modify the product details below
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <div className="flex flex-col gap-2 mt-1">
            <div className="grid grid-cols-2 gap-7">
              <ProductName value={productName} onChange={setName} />
              <ProductCategory value={category} onChange={setCategory} />
            </div>

            <div className="mt-3 grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-lg:gap-1 max-sm:grid-cols-1">
              <Price value={unitPrice} onChange={setPrice} />
              <Stock value={stock} onChange={setStock} />
              <ExpiryDate value={expDate} onChange={setExpiryDate} />
            </div>
          </div>
          <DialogFooter className="mt-9 mb-4 flex items-center gap-4">
            <DialogClose asChild>
              <Button variant="destructive" className="h-11 px-11">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="h-11 px-11"
              onClick={async () => {
                const today = new Date().toISOString().split('T')[0];
                const product = {
                  id,
                  productName,
                  unitPrice,
                  category,
                  expDate,
                  stock,
                  inStock: stock > 0,
                  createdDate: today,
                  modifiedDate: today,
                };

                try {
                  await updateProduct(id,product);
                  console.log("Producto agregado correctamente");
                  setOpenDialog(false);
                } catch (error) {
                  console.error("Error al agregar producto:", error);
                }
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function normalizeDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ''; // fecha inválida
  return date.toISOString().split('T')[0]; // devuelve YYYY-MM-DD
}