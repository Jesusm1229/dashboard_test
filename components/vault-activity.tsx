/* import { getUser } from "@midday/supabase/cached-queries";
import { getVaultActivityQuery } from "@midday/supabase/queries";
import { createClient } from "@midday/supabase/server";
import { Icons } from "@midday/ui/icons"; */
import { createClient } from "@/packages/supabase/src/client/server";
import { getVaultActivityQuery } from "@/packages/supabase/src/queries";
import { getUser } from "@/packages/supabase/src/queries/cached-queries";
import { Icons } from "@/components/ui/components/icons";
import Link from "next/link";
import { VaultPreview } from "./vault-preview";



// TODO: Translate
/* const defaultFolders = [
  { id: "inbox", name: "Inbox" },
  { id: "exports", name: "Exports" },
  { id: "imports", name: "Imports" },
  { id: "transactions", name: "Transactions" },
];
 */
export async function VaultActivity() {
  const supabase = createClient({ db: { schema: "storage" } });
  const { data: userData } = await getUser();

  const { data: storageData } = await getVaultActivityQuery(
    supabase,
    userData.id
  );

  const files = storageData
    ?.filter((file) => file.path_tokens.pop() !== ".emptyFolderPlaceholder")
    .map((file) => {
      const filename = file.name.split("/").at(-1);

      return {
        id: file.id,
        name: file.name,
        path: [...file.path_tokens, filename],
        size: file.metadata.size,
        mimetype: file.metadata.mimetype,
        createdAt: file.created_at,
      };
    });

  return (
    <div className="mt-6 mb-10">
      <span className="text-sm font-medium">Recent activity</span>

      <div className="flex space-x-20 mt-6 overflow-auto w-full md:w-[calc(100vw-130px)] scrollbar-hide">
        {files?.map((file) => {
          return <VaultPreview key={file.id} file={file} />;
        })}


      </div>
    </div>
  );
}
