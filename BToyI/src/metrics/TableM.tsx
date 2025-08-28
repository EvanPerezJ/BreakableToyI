import { columnsMetrics } from "./ColumnsM";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import type { Metrics } from "./ColumnsM";

interface TableMProps {
  data: Metrics[];
  loading: boolean;
  error: string | null;
  refetch?: () => void; // <-- opcional
}

export default function TableM({ data, loading, error, refetch }: TableMProps) {
  const table = useReactTable({
    data,
    columns: columnsMetrics,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div>Loading metrics...</div>;
  if (error) return (
    <div>
      Error: {error}
      {refetch && (
        <button onClick={refetch} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
          Reintentar
        </button>
      )}
    </div>
  );

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}