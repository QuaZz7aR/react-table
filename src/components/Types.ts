import type { RowData } from "@tanstack/react-table"

export type Worker = {
  task: string
  status: "On Deck" | "In Progress" | "Testing" | "Deployed" | null
  due: Date | null | string
  notes: string
}

export const STATUSES: string[] = ["On Deck", "In Progress", "Testing", "Deployed"]


declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: string | Date | null) => void
  }
}