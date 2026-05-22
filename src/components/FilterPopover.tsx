import { useState, type Dispatch, type SetStateAction } from "react";
import { STATUSES } from "./Types";
import type { ColumnFiltersState } from "@tanstack/react-table";

type FilterPopoverType = {
    columnFilters: ColumnFiltersState,
    setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>
}

function FilterPopover({ columnFilters, setColumnFilters }: FilterPopoverType) {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const selectedStatuses = columnFilters.find(f => f.id === "status")?.value as string[] ?? [];

    function onChange(status: string) {
        const isSelected = selectedStatuses.includes(status);
        const newStatuses = isSelected
            ? selectedStatuses.filter(s => s !== status)
            : [...selectedStatuses, status];

        setColumnFilters(prev => [
            ...prev.filter(f => f.id !== "status"), 
            ...(newStatuses.length ? [{ id: "status", value: newStatuses }] : [])
        ]);
    }

    return (
        <div className="relative w-full flex ">
            <button type="button" onClick={() => setIsOpen(prev => !prev)} className="hover:cursor-pointer border py-1 px-2 rounded-lg">Status filter</button>
            {isOpen &&
                <div className="absolute top-0 left-30 bg-cyan-950 px-4 py-1.5 z-10 flex gap-4 rounded-md">
                    {STATUSES.map(status => <label className="bg-cyan-950 text-white border-r pr-4 last:border-none" key={status}>
                        <input type="checkbox" className="mr-2"
                            checked={selectedStatuses.includes(status)}
                            onChange={() => onChange(status)} />
                        {status}
                    </label>)}
                </div>}
        </div>
    )
}

export default FilterPopover;