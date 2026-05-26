import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";
import columns from "./columns"
import Filters from "./Filters";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ArrowUpDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { User } from "./Types";

function WorkerTable() {

    const { data, isLoading, error } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await fetch("https://dummyjson.com/users?limit=100");
            return res.json() as Promise<{ users: User[] }>;
        }
    })
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState({
        pageSize: 10,
        pageIndex: 0
    })


    const table = useReactTable({
        data: data?.users ?? [],
        columns,
        state: {
            columnFilters,
            pagination
        },
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: setPagination,
        columnResizeMode: "onChange",
    });

    console.log(data);

    if (isLoading) return <div>Data is fetching...</div>;
    if (error) return <div>Error occured while fetching data</div>;

    return (
        <>
            <div className="max-w-full overflow-x-auto">
                <div className="flex gap-6 pb-4 pt-1 w-3/4">
                    <Filters setColumnFilters={setColumnFilters} />
                </div>
                <table style={{ tableLayout: "fixed", width: table.getTotalSize() }} >
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => <th className="relative border py-3" key={header.id} style={{ width: header.getSize() }}>
                                <div className="flex justify-center items-center gap-2">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getCanSort() && <ArrowUpDown className="hover:cursor-pointer" size={18} onClick={header.column.getToggleSortingHandler()} />}
                                    <span className="absolute left-2">
                                        {
                                            {
                                                asc: <ArrowUp size={18} />,
                                                desc: <ArrowDown size={18} />
                                            }[header.column.getIsSorted() as "asc" | "desc"]
                                        }
                                    </span>
                                </div>
                                <div
                                    className={`resizer ${header.column.getIsResizing() ? "isResizing" : ""}`}
                                    onMouseDown={header.getResizeHandler()}
                                    onTouchStart={header.getResizeHandler()}
                                />
                            </th>)}
                        </tr>)}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => <tr key={row.id}>
                            {row.getVisibleCells().map(cell => <td className="border py-3" key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>)}
                        </tr>)}
                    </tbody>
                </table>

            </div>
            <br />
            <div className="flex items-center gap-3">
                <div className="flex">
                    <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} className="p-1 border rounded-l-md hover:cursor-pointer"><ArrowLeft size={18} /></button>
                    <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} className="p-1 border rounded-r-md hover:cursor-pointer"><ArrowRight size={18} /></button>
                </div>
                <span className="text-left">
                    Page{" "}
                    {table.getState().pagination.pageIndex + 1}
                    {" "}of{" "}
                    {table.getPageCount()}
                </span>
                <div className="pl-5 flex gap-5">
                    {table.getAllColumns().map(col => (
                        <label key={col.id} className="flex gap-1 items-center">
                            <input type="checkbox" checked={col.getIsVisible()} onChange={col.getToggleVisibilityHandler()} />
                            {col.columnDef.header as string}
                        </label>
                    ))}
                </div>
            </div>

        </>
    )

}

export default WorkerTable;