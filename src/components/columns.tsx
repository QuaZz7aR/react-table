import { createColumnHelper } from "@tanstack/react-table";
import type { User } from "./Types";

const columnHelper = createColumnHelper<User>();

const columns = [

    columnHelper.accessor('id', {
        header: "ID",
        cell: info => info.getValue(),
        minSize: 120,
        size: 120,
    }),

    columnHelper.accessor('firstName', {
        header: "First Name",
        cell: info => info.getValue(),
        minSize: 180,
        size: 300,
    }),

    columnHelper.accessor("lastName", {
        header: "Last Name",
        cell: info => info.getValue(),
        minSize: 180,
        size: 300,
    }),

    columnHelper.accessor("email", {
        header: "Email",
        cell: info => info.getValue(),
        minSize: 300,
        size: 300,
    }),

    columnHelper.accessor("age", {
        header: "Age",
        cell: info => info.getValue(),
        minSize: 120,
        size: 120,
    }),

    columnHelper.accessor(row => row.company.department, {
        id: "department",
        header: "Department",
        cell: info => info.getValue(),
        minSize: 300,
        size: 300,
    }),

    columnHelper.accessor(row => row.company.title, {
        id: "title",
        header: "Title",
        cell: info => info.getValue(),
        minSize: 300,
        size: 300,
    }),

    columnHelper.accessor("role", {
        header: "Role",
        cell: info => info.getValue(),
        minSize: 300,
        size: 300,
    }),
]

export default columns;