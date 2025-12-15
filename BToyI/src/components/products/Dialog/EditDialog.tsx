import * as React from "react";
import { Button } from '@/components/ui/button';
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { FaPlus } from "react-icons/fa"; 
import { useProducts } from '@/hooks/useProducts';
import { productService } from "@/services/productService";

// IMPORTANTE: Asegúrate que estos componentes existen en esta ruta. Si no, ajusta la ruta.
import ProductName from '../Dialog//ProductName';
import Price from '../Dialog/Price';
import { ProductCategory } from '../Dialog/ProductCategory';
import Stock from '../Dialog/Stock';
import ExpiryDate from '../Dialog/ExpiryDate';

export default function AddProductDialog() {
    const { refreshProducts } = useProducts();
    const [open, setOpen] = React.useState(false);

    const [productName, setName] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [unitPrice, setPrice] = React.useState(0);
    const [stock, setStock] = React.useState(0);
    const [expDate, setExpiryDate] = React.useState('');

    const handleCreate = async () => {
        try {
            await productService.create({
                name: productName,
                category,
                price: unitPrice, // Ajustado a los nombres del backend/service
                stock,
                expiryDate: expDate,
                inStock: stock > 0
            });
            await refreshProducts();
            setOpen(false);
            // Reset
            setName(''); setCategory(''); setPrice(0); setStock(0); setExpiryDate('');
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <FaPlus className="mr-2" /> Add Product
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[600px]'>
                <DialogHeader>
                    <DialogTitle>Add Product</DialogTitle>
                    <DialogDescription>Fill in the form to add a new product</DialogDescription>
                </DialogHeader>
                <Separator />
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-2 gap-4'>
                        <ProductName value={productName} onChange={setName}/>
                        <ProductCategory value={category} onChange={setCategory}/>
                    </div>
                    <div className='grid grid-cols-3 gap-4'>
                        <Price value={unitPrice} onChange={setPrice}/>
                        <Stock value={stock} onChange={setStock}/>
                        <ExpiryDate value={expDate} onChange={setExpiryDate} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant='destructive'>Cancel</Button></DialogClose>
                    <Button onClick={handleCreate}>Save Product</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}