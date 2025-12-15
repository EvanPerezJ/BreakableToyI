import * as React from "react";
import type { Row } from "@tanstack/react-table";
import type { Product } from "@/types/product"; // Usar el tipo global
import { productService } from "@/services/productService"; // Servicio directo para update
import { useProducts } from "@/hooks/useProducts"; // Hook para refrescar y borrar

import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose,
} from '@/components/ui/dialog';

// Asegúrate de que las rutas a estos componentes sean correctas
import ProductName from '../Dialog/ProductName';
import Price from '../Dialog/Price';
import { ProductCategory } from '../Dialog/ProductCategory';
import Stock from '../Dialog/Stock';
import ExpiryDate from '../Dialog/ExpiryDate';

export default function ProductDD({ row }: { row: Row<Product> }) {
  const { deleteProduct, refreshProducts } = useProducts();
  const [openDialog, setOpenDialog] = React.useState(false);

  // Estados locales del formulario
  const [id] = React.useState(row.original.id);
  const [productName, setName] = React.useState(row.original.name);
  const [category, setCategory] = React.useState(row.original.category);
  const [unitPrice, setPrice] = React.useState(row.original.price);
  const [stock, setStock] = React.useState(row.original.stock);
  const [expDate, setExpiryDate] = React.useState(row.original.expiryDate);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
        await deleteProduct(id); // Esto ya refresca la lista en el ContextProvider
    }
  };

  const handleUpdate = async () => {
    try {
        await productService.update(id, {
            name: productName,
            category,
            price: unitPrice,
            stock,
            expiryDate: expDate,
            inStock: stock > 0
        });
        setOpenDialog(false);
        refreshProducts(); // Importante: recargar la tabla
    } catch (error) {
        console.error("Error updating product:", error);
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
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpenDialog(true)} className="gap-2 cursor-pointer">
            <FaRegEdit /> Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDelete} className="gap-2 text-red-600 cursor-pointer">
            <MdOutlineDelete className="text-lg" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Modify the product details below.</DialogDescription>
          </DialogHeader>
          <Separator className="my-2" />
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <ProductName value={productName} onChange={setName} />
              <ProductCategory value={category} onChange={setCategory} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Price value={unitPrice} onChange={setPrice} />
              <Stock value={stock} onChange={setStock} />
              <ExpiryDate value={expDate} onChange={setExpiryDate} />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleUpdate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}