import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import columns from "./columns"
import Filters from "./Filters";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ArrowUpDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { User } from "./Types";

function WorkerTable() {

    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("");
    const [role, setRole] = useState("");

    const { data: rawData, isLoading, isFetching, error } = useQuery({
        queryKey: ["users", search, department, role],
        queryFn: async () => {
            const url = search
                ? `https://dummyjson.com/users/search?q=${search}&limit=100`
                : `https://dummyjson.com/users?limit=100`;

            const res = await fetch(url);
            return res.json() as Promise<{ users: User[] }>;
        },
        placeholderData: previousData => previousData
    })

    const { data: allData } = useQuery({
        queryKey: ["all-users"],
        queryFn: async () => {
            const res = await fetch(`https://dummyjson.com/users?limit=100`);
            return res.json() as Promise<{ users: User[] }>;
        },
        staleTime: Infinity
    })

    const departments = useMemo(() => {
        if (!allData?.users) return [];
        return [... new Set(allData.users.map(user => user.company.department))].sort()
    }, [allData])

    const roles = useMemo(() => {
        if (!allData?.users) return [];
        return [... new Set(allData.users.map(user => user.role))].sort()
    }, [allData])

    const filteredUsers = useMemo(() => {
        if (!rawData?.users) return [];
        return rawData.users.filter(user => {
            if (department && user.company.department !== department) return false;
            if (role && user.role !== role) return false;
            return true;
        })
    }, [rawData, department, role])

    const [pagination, setPagination] = useState({
        pageSize: 10,
        pageIndex: 0
    })

    const table = useReactTable({
        data: filteredUsers ?? [],
        columns,
        state: {
            pagination
        },
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: setPagination,
        columnResizeMode: "onChange"
    });

    if (isLoading) return <div>Data is fetching...</div>;
    if (error) return <div>Error occured while fetching data</div>;

    return (
        <>
            <div className="flex gap-6 pb-4 pt-1 w-3/4 items-center">
                <Filters search={search} setSearch={setSearch} departments={departments}
                    setDepartment={setDepartment} roles={roles} setRole={setRole} />
                {isFetching && <span className="text-gray-400 text-sm">Updating...</span>}
            </div>
            <div className="max-w-full overflow-x-auto">
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
                    <button disabled={!table.getCanPreviousPage()} type="button" onClick={() => table.previousPage()}
                        className="p-1 border rounded-l-md hover:cursor-pointer"><ArrowLeft size={18} /></button>
                    <button disabled={!table.getCanNextPage()} type="button" onClick={() => table.nextPage()}
                        className="p-1 border rounded-r-md hover:cursor-pointer"><ArrowRight size={18} /></button>
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