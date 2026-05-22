import type { CellContext } from "@tanstack/react-table";
import { STATUSES, type Worker } from "./Types";
import type React from "react";
import { useState } from "react";

function StatusCell({ getValue, row, column, table }: CellContext<Worker, string | null>) {

    const initialValue = getValue();
    const [value, setValue] = useState<string | null>(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value === "" ? null : e.target.value;
        setValue(newValue);
        table.options.meta?.updateData(row.index, column.id, e.target.value)
    }

    return (
        <select value={value ?? ""} onChange={onChange} className="py-2 px-3 w-2/3 border rounded-xl appearance-none cursor-pointer">
            <option className="bg-cyan-950 text-white" value={""}>None</option>
            {STATUSES.map(status => <option className="bg-cyan-950 text-white" key={status} value={status}>{status}</option>)}
        </select>
    )
}

export default StatusCell;