import { Table } from "@/components/tables/vault";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vault | Cloud Storage",
};

export default function Vault({ params }: { params: { folders: [] } }) {

  return <Table folders={params.folders} />;
}
