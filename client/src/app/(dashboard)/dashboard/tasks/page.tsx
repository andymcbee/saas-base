"use client";

import { Payment } from "./columns";
import { TasksTable } from "./_components/tasks-table";

export default function DemoPage() {
  const data: Payment[] = [
    {
      id: "7aaaa28ed52f",
      amount: 1200,
      status: "success",
      email: "m@example.com",
    },
    {
      id: "72saasds8ed52f",
      amount: 1100,
      status: "processing",
      email: "mssss@example.com",
    },
    {
      id: "7aaaa28ed52f",
      amount: 1300,
      status: "success",
      email: "2323m@example.com",
    },
    {
      id: "72asas8ed52f",
      amount: 2100,
      status: "pending",
      email: "zzzzm@example.com",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <TasksTable data={data} />
    </div>
  );
}
