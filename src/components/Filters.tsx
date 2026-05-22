import type { ColumnFiltersState } from "@tanstack/react-table";
import { useRef, type Dispatch, type SetStateAction } from "react";

type FilterProps = {
    setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>
}

function Filters({ setColumnFilters }: FilterProps) {

    const filterRef = useRef<HTMLInputElement>(null);

    function onFilterChange(id: string, value: string) {
        setColumnFilters(prev => [...prev.filter(f => f.id !== id), { id, value }]);
    }

    return <div className="flex gap-2">
        <input type="text" placeholder="Task name" className="rounded-lg border py-1 px-2 mx-0.5" ref={filterRef} />
        <button type="button" onClick={() => onFilterChange("task", filterRef.current?.value ?? "")}
            className="border-white border px-3 py-1 hover:cursor-pointer rounded-lg text-gray-400 hover:text-white">Find</button>
    </div>
}

export default Filters;