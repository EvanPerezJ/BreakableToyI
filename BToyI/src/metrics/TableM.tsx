import { useMetrics } from "./MetricsData";
import { columnsMetrics } from "./ColumnsM";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";

export default function TableM() {
  const { metrics, loading, error } = useMetrics();

  const table = useReactTable({
    data: metrics,
    columns: columnsMetrics,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div>Loading metrics...</div>;
  if (error) return <div>Error: {error}</div>;

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