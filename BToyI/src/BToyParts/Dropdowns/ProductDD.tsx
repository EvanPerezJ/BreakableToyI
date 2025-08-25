import type { Row } from "@tanstack/react-table";
import type { Product } from "../../products/columns.tsx";

import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export default function ProductDD({ row }: { row: Row<Product> }) {
    console.log(row);

    const menuItems = [
        {icon: <FaRegEdit />, label: 'Edit', className:""},
        {separator: true},
        {icon: <MdOutlineDelete className="text-lg"/>, label: 'Delete', className:"text-red-600"}
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
                {menuItems.map((item, index)=>
                    item.separator ? (
                        <DropdownMenuSeparator key={index}/>
                    ) : (
                        <DropdownMenuItem key={index} className={`flex items-center gap-1 p-[10px] ${item.className}`}>
                            {item.icon}
                            <span>{item.label}</span>
                        </DropdownMenuItem>
                    )
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}