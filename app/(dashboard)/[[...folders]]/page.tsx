import { Table } from "@/components/tables/vault";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vault | Midday",
};

export default function Vault({ params }: { params: { folders: [] } }) {

  return <Table folders={params.folders} />;
}
