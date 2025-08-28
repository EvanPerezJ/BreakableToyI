import {Button} from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';

import { Separator } from '@/components/ui/separator';

import ProductName from './components2/ProductName';
import Price from './components2/Price';
import {ProductCategory} from './components2/ProductCategory';
import Stock from './components2/Stock';
import ExpiryDate from './components2/ExpiryDate';
import { useProductActions } from '@/products/productData';
import * as React from "react";


export default function ProductDialog(){
    const {
            addProduct
        } = useProductActions();

    
    const [name, setName] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [stock, setStock] = React.useState(0);
    const [expiryDate, setExpiryDate] = React.useState('');



    return(
        <Dialog>
            <DialogTrigger>
                <Button className='h-10'>Add Product</Button>
            </DialogTrigger>
            <DialogContent className='p-7 px-8'>
                <DialogHeader>
                    <DialogTitle className='text-[22px]'>Add Product</DialogTitle>
                    <DialogDescription>
                        Fill in the form to add a new product
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className='flex flex-col gap-2 mt-1'>
                    <div className='grid grid-cols-2 gap-7'>
                        <ProductName value={name} onChange={setName}/>
                        <ProductCategory value={category} onChange={setCategory}/>
                    </div>

                    <div className='mt-3 grid grid-cols-3 gap-7 max-lg:grid-cols-2 max-lg:gap-1 max-sm:grid-cols-1'>
                        <Price value={price} onChange={setPrice}/>
                        <Stock value={stock} onChange={setStock}/>
                        <ExpiryDate value={expiryDate} onChange={setExpiryDate} />
                    </div>
                </div>
                <DialogFooter className='mt-9 mb-4 flex items-center gap-4'>
                    <DialogClose>
                        <Button asChild variant={'destructive'} className='h-11 px-11'>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        className='h-11 px-11'
                        onClick={async () => {
                            const today = new Date().toISOString().split('T')[0];

                            const product = {
                            name,
                            price,
                            category,
                            expiryDate,
                            stock,
                            inStock: stock > 0,
                            createdDate: today,
                            modifiedDate: today,
                            };

                            try {
                            await addProduct(product);
                            console.log("Producto agregado correctamente");
                            } catch (error) {
                            console.error("Error al agregar producto:", error);
                            }
                        }}
                    >
                        Add Product
                    </Button>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}