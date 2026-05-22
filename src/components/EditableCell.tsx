import type { CellContext } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import type { Worker } from "./Types";

function EditableCell({ getValue, row, column, table }: CellContext<Worker, string>) {

    const initialValue = getValue();
    const [value, setValue] = useState<string>(initialValue);

    const onBlur = () => {
        table.options.meta?.updateData(row.index, column.id, value)
    }

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <input value={value} onChange={e => setValue(e.target.value)} className="px-2 py-1 w-9/10" onBlur={onBlur} />
    )
}

export default EditableCell;