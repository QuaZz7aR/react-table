import { createColumnHelper } from "@tanstack/react-table";
import type { Worker } from "./Types";
import EditableCell from "./EditableCell";
import StatusCell from "./StatusCell";
import DateCell from "./DateCell";

const columnHelper = createColumnHelper<Worker>();

const columns = [

    columnHelper.accessor('task', {
        header: () => <span>Task</span>,
        cell: EditableCell,
        minSize: 280,
        size: 325,
    }),

    columnHelper.accessor('status', {
        header: () => <span>Status</span>,
        cell: StatusCell,
        minSize: 180,
        size: 300,
        enableSorting: false,
        filterFn: (row, columnId, filteredValue: string[]) => {
            return filteredValue.includes(row.getValue(columnId))
        }
    }),

    columnHelper.accessor("due", {
        header: () => <span>Due Date</span>,
        cell: DateCell,
        minSize: 290,
        size: 300,
    }),

    columnHelper.accessor("notes", {
        header: () => <span>Notes</span>,
        cell: EditableCell,
        enableSorting: false,
        minSize: 300,
        size: 300,
    }),
]

export default columns;