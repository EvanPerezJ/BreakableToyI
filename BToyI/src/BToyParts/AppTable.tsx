import { useEffect, useState } from "react";
import { TableP } from '../products/TableP';
import { fetchProducts } from '../products/productData';
import { columns } from '../products/columns';
import type { Product } from '../products/columns';

export default function AppTable() {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchProducts(page).then((data) => {
            setProducts(data.products);
            setTotalPages(data.totalPages);
        });
    }, [page]);

    return (
        <TableP
            data={products}
            columns={columns}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
        />
    );
}