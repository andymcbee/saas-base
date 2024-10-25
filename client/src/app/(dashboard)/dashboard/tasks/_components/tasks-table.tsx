import { DataTable } from "@/components/data-table/data-table";

import React from "react";
import { getColumns } from "./tasks-table-columns";
import { Payment } from "./tasks-table-columns";
import { useDataTable } from "@/hooks/use-data-table";

export function TasksTable({ data }: { data: Payment[] }) {
  const columns = React.useMemo(() => getColumns(), []);

  /*   const filterFields: DataTableFilterField<Payment>[] = [
    {
      id: "email",
      label: "Email",
      placeholder: "Filter emails...",
    },
    {
      id: "status",
      label: "Status",
      options: TASK_CONSTANTS.tasks.status.enumValues.map((status) => ({
        label: status[0]?.toUpperCase() + status.slice(1),
        value: status,
      })),
    },
  ]; */

  const { table } = useDataTable({
    data,
    columns,
    pageCount: -1,
    initialState: {},
  });

  return <DataTable table={table} />;
}
