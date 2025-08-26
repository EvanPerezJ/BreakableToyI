import {Badge} from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { IoClose } from "react-icons/io5";
import { AvalilabilityDD } from "../BToyParts/Dropdowns/AvailabilityDD";
import { CategoryDD } from "../BToyParts/Dropdowns/CategoryDD";
import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import type{
  ColumnDef
} from "@tanstack/react-table"
 
import{
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    page: number
    totalPages: number
    setPage: (page: number) => void
}

export function TableP<TData, TValue>({
    columns,
    data,
    page,
    totalPages,
    setPage,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="">
            <div className="flex flex-col gap-3 mb-8 mt-6">
                <div className="flex justify-between items-center">
                    <Input placeholder="Search by name" className="max-w-sm h-10"/>
                    <div className="flex items-center gap-4">
                        <AvalilabilityDD/>
                        <CategoryDD/>
                    </div>
                </div>

                <FilterArea/>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="bg-primary text-primary-foreground"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {data.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between mt-5">
                <div className="flex gap-6 items-center">
                    <span className="text-sm text-gray-500">
                        Page {page} of {totalPages}
                    </span>
                    <div className="flex items-center space-x-2 justify-end py-4">
                        <Button variant="outline" size="sm" className="size-9 w-12"
                            onClick={() => setPage(1)}
                            disabled={page === 1}>
                            <BiFirstPage />
                        </Button>
                        <Button variant="outline" size="sm" className="size-9 w-12"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}>
                            <GrFormPrevious />
                        </Button>
                        <Button variant="outline" size="sm" className="size-9 w-12"
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}>
                            <GrFormNext />
                        </Button>
                        <Button variant="outline" size="sm" className="size-9 w-12"
                            onClick={() => setPage(totalPages)}
                            disabled={page === totalPages}>
                            <BiLastPage />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function FilterArea(){

    return(

        <div className="flex gap-3">
            {/* Availability */}
            <div className="border-dashed border rounded-sm p-1 flex gap-2 items-center px-2 text-sm">
                <span className="text-gray-600">Availability</span>
                <Separator orientation="vertical"/>
                <div className="flex items-center gap-2">
                    <Badge variant={"secondary"}>Item 1</Badge>
                    <Badge variant={"secondary"}>Item 1</Badge>
                </div>
            </div>


            {/* Category */}
            <div className="border-dashed border rounded-sm p-1 flex gap-2 items-center px-2 text-sm">
                <span className="text-gray-600">Category</span>
                <Separator orientation="vertical"/>
                <div className="flex items-center gap-2">
                    <Badge variant={"secondary"}>Item 1</Badge>
                    <Badge variant={"secondary"}>Item 1</Badge>
                </div>
            </div>

            <Button variant={"ghost"} className="p-1 px-2">
                <span>Reset</span>
                <IoClose/>
            </Button>

        </div>

    )

}