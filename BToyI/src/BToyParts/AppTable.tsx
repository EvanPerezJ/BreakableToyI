import { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TableP } from '../products/TableP';
import { fetchProducts } from '../products/productData';
import { columns } from '../products/columns';
import type { Product } from '../products/columns';

export default function AppTable() {
    const [products, setProducts] = useState<Product[]>([]);
    const [page] = useState(1);
    const [size] = useState(10);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        fetchProducts(page, size).then((data) => {
            setProducts(data.products);
            setTotalProducts(data.totalProducts);
        });
    }, [page, size]);

    return (
        <Card className="py-4 mt-12 flex flex-col shadow-none border-none">
            <CardHeader className="flex p-2">
                <div className="flex w-full justify-between items-center">
                    <div>
                        <CardTitle className="font-bold text-[23px]">
                            Products
                        </CardTitle>
                        <p className="text-sm text-slate-600">
                            {totalProducts} products
                        </p>
                    </div>
                    <Button>
                        Add Product
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <TableP data={products} columns={columns} />
            </CardContent>
        </Card>
    );
}