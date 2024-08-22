"use client";

import { useVaultContext } from "@/store/vault/hook";

import { DataTableRow } from "./data-table-row";
import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/packages/ui/src/components/table";


export function DataTable({ teamId }: { teamId: string }) {
  const data = useVaultContext((s) => s.data);

  console.log("data", data);

  return (
    <Table>
      <TableHeader className="border-0 z-50">
        <TableRow>
          <TableHead className="w-[60%]">Name</TableHead>
          <TableHead className="w-[15%]">Created at</TableHead>
          <TableHead className="w-full">Last modified at</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border-l-0 border-r-0">
        {data?.map((row) => (
          <DataTableRow key={row.name} data={row} teamId={teamId} />
        ))}
      </TableBody>
    </Table>
  );
}
