import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";
import defaultData from "./data"
import columns from "./columns"
import Filters from "./Filters";
import FilterPopover from "./FilterPopover";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ArrowUpDown } from "lucide-react";

function WorkerTable() {

    const [data, setData] = useState(() => [...defaultData]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState({
        pageSize: 3,
        pageIndex: 0
    })

    const table = useReactTable({
        data,
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
        meta: {
            updateData: (rowIndex: number, columnId: string, value: string | Date | null) =>
                setData(prev =>
                    prev.map((row, index) => {
                        return index === rowIndex ? {
                            ...prev[rowIndex],
                            [columnId]: value,
                        } : row
                    }))
        }
    });

    console.log(data);

    return (
        <>
            <div className="max-w-full overflow-x-auto">
                <div className="flex gap-6 pb-4 pt-1 w-3/4">
                    <Filters setColumnFilters={setColumnFilters} />
                    <FilterPopover columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
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
                            {row.getVisibleCells().map(cell => <td className="cell" key={cell.id}>
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
            </div>

        </>
    )

}

export default WorkerTable;