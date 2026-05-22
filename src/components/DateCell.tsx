import type { CellContext } from "@tanstack/react-table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import type { Worker } from "./Types";
import { X } from "lucide-react";

function DateCell({ getValue, row, column, table }: CellContext<Worker, Date | null>) {
    const date = getValue();

    return <div className="flex items-center gap-3 w-4/5 mx-auto">
        <DatePicker className=" bg-mauve-800 px-2 py-1 rounded-lg cursor-pointer text-center"
            dateFormat="MMM d"
            selected={date}
            onChange={(date: string | Date | null) => table.options.meta?.updateData(row.index, column.id, date)}
        />
        {date && <X className="hover: cursor-pointer" onClick={() => table.options.meta?.updateData(row.index, column.id, null)} size={16} />}
    </div>
}

export default DateCell;