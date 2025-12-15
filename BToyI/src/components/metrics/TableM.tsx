import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button"; // Usamos el botón de ShadCN
import { AlertCircle } from "lucide-react"; // Opcional: Icono para el error

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  error: string | null;
  refetch?: () => void;
}

export function TableM<TData, TValue>({
  columns,
  data,
  error,
  refetch,
}: DataTableProps<TData, TValue>) {
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // 1. Mejor manejo visual del Error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-6 border rounded-md bg-destructive/10 text-destructive">
        <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-5 w-5" />
            <span className="font-semibold">Error cargando métricas</span>
        </div>
        <p className="text-sm mb-4">{error}</p>
        {refetch && (
          <Button 
            variant="outline" 
            onClick={refetch}
            className="border-destructive/50 hover:bg-destructive/20"
          >
            Reintentar
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead 
                    key={header.id} 
                    className="bg-primary text-primary-foreground text-center text-lg font-semibold h-12"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="hover:bg-muted/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-center text-lg py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            // 2. Manejo del estado "Sin Datos" (Empty State)
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No hay métricas disponibles.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}