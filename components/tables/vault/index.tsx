// @ts-nocheck
import { Breadcrumbs } from "@/components/breadcrumbs";

import { VaultProvider } from "@/store/vault/provider";
import { CreateFolderButton } from "./create-folder-button";
import { DataTable } from "./data-table";
import { EmptyTable } from "./empty-table";
import { UploadButton } from "./upload-button";
import { UploadZone } from "./upload-zone";
import { VaultActivity } from "@/components/vault-activity";
import { getUser, getVault } from "@/packages/supabase/src/queries/cached-queries";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import ToastButton from "./toast-button";


export async function Table({ folders }) {
  const path = folders?.join("/");

  const { data } = await getVault({
    path: path && decodeURIComponent(path),
    userId: ""
  });


  const { data: userData } = await getUser()

  return (
    <div>
      <VaultProvider data={data}>
        {/* <VaultActivity /> */}

        <div className="flex justify-between items-center h-[32px] mt-6">
          <Breadcrumbs folders={folders} />
          <div className="flex space-x-2">
            {/* <CreateFolderButton /> */}
            <UploadButton />
          </div>
        </div>

        <div className="mt-6 h-[calc(100vh-400px)] border overflow-scroll relative">
          <UploadZone>
            <DataTable teamId={userData.id} />
            {data.length === 0 && <EmptyTable type={path} />}
          </UploadZone>
        </div>
      </VaultProvider>
    </div>
  );
}
