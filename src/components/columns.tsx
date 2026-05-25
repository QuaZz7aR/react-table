import { createColumnHelper } from "@tanstack/react-table";
import type { User } from "./Types";

const columnHelper = createColumnHelper<User>();

const columns = [

    columnHelper.accessor('id', {
        header: () => <span>ID</span>,
        cell: info => info.getValue(),
        minSize: 120,
        size: 120,
    }),

    columnHelper.accessor('firstName', {
        header: () => <span>First Name</span>,
        cell: info => info.getValue(),
        minSize: 180,
        size: 300,
    }),

    columnHelper.accessor("lastName", {
        header: () => <span>Last Name</span>,
        cell: info => info.getValue(),
        minSize: 180,
        size: 300,
    }),

    columnHelper.accessor("email", {
        header: () => <span>Email</span>,
        cell: info => info.getValue(),
        minSize: 300,
        size: 300,
    }),

    columnHelper.accessor("age", {
        header: () => <span>Age</span>,
        cell: info => info.getValue(),
        minSize: 120,
        size: 120,
    }),

    columnHelper.accessor("department", {
        header: () => <span>Department</span>,
        cell: info => info.getValue(),
        minSize: 300,
        size: 300,
    }),

    columnHelper.accessor("role", {
        header: () => <span>Role</span>,
        cell: info => info.getValue(),
        minSize: 300,
        size: 300,
    }),
]

export default columns;